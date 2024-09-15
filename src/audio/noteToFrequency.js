// noteToFrequency.js
/**
 * 將音符（例如 "C5"）轉換為對應的頻率（Hz）
 * @param {string} note - 音符名稱（例如 "C5"）
 * @returns {number} - 對應的頻率
 */
export const noteToFrequency = (note) => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const A4 = 440; // A4 音符的頻率
    const octave = parseInt(note.slice(-1)); // 取得音符的八度數
    const key = note.slice(0, -1); // 取得音符（不含八度）
    
    // 找到音符在 A4 的上下位置差
    const n = notes.indexOf(key);
    const a4Position = notes.indexOf('A') + 4 * 12; // A4 的位置
    const notePosition = n + (octave * 12); // 計算目標音符的位置
  
    // 計算頻率
    const semitoneDifference = notePosition - a4Position;
    const frequency = A4 * Math.pow(2, semitoneDifference / 12);
    
    return frequency;
  }
  
