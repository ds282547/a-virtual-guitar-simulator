import { noteToFrequency } from "./noteToFrequency";

// /audio/audioManager.js
class AudioManager {
    constructor() {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.oscillators = Array.from({ length: 6 }, () => this.createOscillatorNode()); // 創建 6 個振盪器
      this.gainNodes = this.oscillators.map(() => this.createGainNode()); // 為每個振盪器創建 GainNode
      this.connectNodes();
    }
  
    // 創建振盪器節點
    createOscillatorNode() {
      const osc = this.audioContext.createOscillator();
      osc.type = 'triangle'; // 可以調整為其他波形類型，例如 'square', 'triangle', 'sawtooth'
      return osc;
    }
  
    // 創建音量控制節點
    createGainNode() {
      const gain = this.audioContext.createGain();
      gain.gain.value = 0; // 初始設為 0，播放時調整
      return gain;
    }
  
    // 連接振盪器到音量節點，然後到音頻輸出
    connectNodes() {
      this.oscillators.forEach((osc, index) => {
        osc.connect(this.gainNodes[index]);
        this.gainNodes[index].connect(this.audioContext.destination);
      });
    }
  
    // 播放和弦，根據選擇的和弦資料設定各弦的頻率和增益
    playChord(chord) {
      chord.forEach((fret , index) => {
        const string = index + 1;

        if (fret == -1){
            return;
        }
        const frequency = this.calculateFrequency(string, fret);
        const osc = this.oscillators[index];
        const gain = this.gainNodes[index];
        osc.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        gain.gain.setValueAtTime(0.2, this.audioContext.currentTime); // 設定音量
        const timeIndex = 6 - index;
        osc.start(this.audioContext.currentTime + timeIndex * 0.1); // 微小時間差模擬下刷
      });
  
      // 停止振盪器並重設
      setTimeout(() => {
        this.stopAllOscillators();
      }, 1300); // 持續播放 1 秒
    }
  
    // 計算頻率（根據弦和品位）
    calculateFrequency(string, fret) {
      const standardFrequencies = ['E5', 'B4', 'G4', 'D4', 'A3', 'E3'];
      const baseFreq = noteToFrequency(standardFrequencies[string - 1]);
      const frequency = baseFreq * Math.pow(2, fret / 12);
      return frequency;
    }
  
    // 停止所有振盪器
    stopAllOscillators() {
      this.oscillators.forEach((osc, index) => {
        const gain = this.gainNodes[index];
        gain.gain.setValueAtTime(0, this.audioContext.currentTime); // 靜音
        osc.stop(this.audioContext.currentTime + 0.1);
        this.oscillators[index] = this.createOscillatorNode(); // 重新創建振盪器
        this.connectNodes(); // 重新連接節點
      });
    }
  }
  
  export default new AudioManager();
  