// /hooks/useCanvas.js
import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * 自定義 Hook 用於初始化和管理 Canvas 的繪圖上下文
 * @param {Function} initialDrawFunction - 初始的繪圖函數，用於初始化繪製 Canvas 內容
 * @param {Object} [eventHandlers] - 事件處理函數的對象 { click: fn, mousemove: fn, mousedown: fn, mouseup: fn }
 * @returns {Object} - { canvasRef, clearCanvas, drawRect, drawCircle, redraw }
 */
const useCanvas = (initialDrawFunction, eventHandlers = {}) => {
  const canvasRef = useRef(null);
  const [redrawFlag, setRedrawFlag] = useState(false); // 用於觸發重新繪製的狀態

  // 清除畫布
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // 繪製矩形
  const drawRect = useCallback((x, y, width, height, color = 'black') => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.fillRect(x, y, width, height);
    }
  }, []);

  // 繪製圓形
  const drawCircle = useCallback((x, y, radius, color = 'black') => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  // 觸發重新繪製
  const redraw = () => setRedrawFlag((prev) => !prev);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 初次繪製
    initialDrawFunction(ctx);

    // 添加事件監聽
    const addEventListeners = () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        canvas.addEventListener(event, handler);
      });
    };

    // 移除事件監聽
    const removeEventListeners = () => {
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        canvas.removeEventListener(event, handler);
      });
    };

    addEventListeners();

    // 當 redrawFlag 變更時，重新繪製
    if (redrawFlag) {
      initialDrawFunction(ctx);
    }

    return () => {
      removeEventListeners();
    };
  }, [initialDrawFunction, eventHandlers, redrawFlag]);

  return { canvasRef, clearCanvas, drawRect, drawCircle, redraw };
};

export default useCanvas;
