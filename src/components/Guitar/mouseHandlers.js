// /components/Guitar/mouseHandlers.js
export const handleMouseClick = (event, canvas) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const string = Math.floor((y / rect.height) * 6) + 1;
  const fret = Math.floor((x / rect.width) * 20);

  console.log(`Clicked on string ${string}, fret ${fret}`);
  // 在此添加音效播放或其他互動邏輯
};
