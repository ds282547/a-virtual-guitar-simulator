// /components/Guitar/GuitarCanvas.jsx
import React from 'react';
import useCanvas from '../../hooks/useCanvas';
import { draw } from './drawFunctions';
import { chords } from './chords'; // 引入和弦資料

const GuitarCanvas = ({ numStrings, numFrets, mode, selectedChord, onCanvasClick }) => {
  const { canvasRef, clearCanvas, drawRect, drawCircle, redraw } = useCanvas(
    (ctx) => {
      clearCanvas();
      draw(ctx, numStrings, numFrets);

      // 顯示和弦模式下，繪製和弦的紅點
      if (mode === 'chord' && chords[selectedChord]) {
        chords[selectedChord].forEach((fret, index) => {
          console.log(fret);
          const string = index + 1;
          const x = (ctx.canvas.width / (numFrets + 1)) * (fret - 0.5);
          const y = (ctx.canvas.height / (numStrings + 1)) * string;
          drawCircle(x, y, 10, 'black');
        });;
      }
    },
    {
      click: (event) => {
        if (mode === 'singleNote') {
          // 單音模式處理點擊事件
          const rect = canvasRef.current.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          const string = Math.floor((y / rect.height) * numStrings) + 1;
          const fret = Math.floor((x / rect.width) * numFrets);
          onCanvasClick(string, fret);
        }
      },
    }
  );

  return <canvas ref={canvasRef} width={800} height={300}/>;
};

export default GuitarCanvas;
