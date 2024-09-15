// /components/Guitar/drawFunctions.js
const fix = (val) => {
  return parseInt(val);
}

const drawFretboard = (ctx, numStrings = 6, numFrets = 12) => {

  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  console.log(ctx.imageSmoothingEnabled);
  console.log(width);
  // 繪製弦
  for (let i = 0; i < numStrings; i++) {
    const x = 0;
    const x2 = width;
    const y = parseInt((height / (numStrings + 1)) * (i + 1));
    const h = fix(height);
    ctx.fillRect(x, y, x2, 2);
  }

  const boardSpacing = height / (numStrings + 1);

  ctx.font = "18pt Arial";
  let mText = ctx.measureText("A");

  const fretWidth = width / (numFrets + 1);
  const textFixX = fretWidth / 2;
  const textFixY = mText.actualBoundingBoxAscent;
  const fretDrawIndices = [3,5,7,9,12,15,17];
  // 繪製品
  for (let i = 0; i <= numFrets; i++) {
    
    const x = fix(fretWidth * i);
    const y1 = fix(boardSpacing);
    const h = fix(height - boardSpacing*2 + 1);
    ctx.fillRect(x, y1, 2, h);

    // 繪製dot和文字
    if (fretDrawIndices.includes(i+1)){
      const textFret = (i+1).toString();
      const mText_2 = ctx.measureText(textFret);
      const textX = x + textFixX - mText_2.width / 2;
      ctx.fillText(textFret, textX, textFixY);
    }
  }
};
  
export const draw = (ctx, numStrings = 6, numFrets = 12) => {
  
  drawFretboard(ctx, numStrings, numFrets);
}

  