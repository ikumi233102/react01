const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// HEX→RGB変換
function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length !== 6) return null;
  const bigint = parseInt(hex, 16);
  if (isNaN(bigint)) return null;
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

// RGBの順位
function rankRGB(rgb) {
  const channels = ['赤', '緑', '青'];
  const arr = channels.map((color, i) => ({ color, value: rgb[i] }));

  arr.sort((a, b) => b.value - a.value);

  const ranks = {};
  let currentRank = 1;
  let uniqueCount = 1;
  let lastValue = null;

  for (let i = 0; i < arr.length; i++) {
    const { color, value } = arr[i];

    if (value !== lastValue) {
      currentRank = uniqueCount;
    }
    ranks[color] = currentRank;
    lastValue = value;
    uniqueCount++;
  }

  return ranks;
}
function getColorNameFromHSV(h, s, v) {
    if (h < 30) return "Red";
    if (h < 90) return "Yellow";
    if (h < 150) return "Green";
    if (h < 210) return "Cyan";
    if (h < 270) return "Blue";
    return "Magenta";
}

// RGB→HSV変換
function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;

  let h = 0, s = 0, v = max;

  if (d !== 0) {
    s = max === 0 ? 0 : d / max;

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }

  return [Math.round(h), Math.round(s * 100), Math.round(v * 100)];
}

// HSVから色名を判定
function getColorName(h, s, v) {
  if (v < 10) return '黒';
  if (s < 10) {
    if (v > 90) return '白';
    return '灰色';
  }

  if (h < 15 || h >= 345) return '赤';
  if (h < 45) return '橙';
  if (h < 65) return '黄';
  if (h < 150) return '緑';
  if (h < 210) return '水色';
  if (h < 270) return '青';
  if (h < 330) return '紫';
  return '赤'; // fallback
}


// 色の修飾子

function getModifierFromRGB(r, g, b) {
  const [h, s, v] = rgbToHsv(r, g, b);

  if (v < 10) return 'なし';

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;
  const brightness = (r + g + b) / 3;

  let modifiers = [];

  // ベース色判定
  let baseColor = '';
  if (diff < 30) baseColor = '落ち着いた';
  else if (r === max) baseColor = '赤が強い';
  else if (g === max) baseColor = '緑が強い';
  else if (b === max) baseColor = '青が強い';

  if (baseColor) modifiers.push(baseColor);

  // 明るさ修飾子
  if (brightness < 80) modifiers.push('暗い');
  else if (brightness > 200) modifiers.push('明るい');

  // 彩度修飾子（HSVのs使う）
  if (s < 25) modifiers.push('くすんだ');
  else if (s > 75) modifiers.push('鮮やかな');

  // 色相ベースの修飾子（←ここをSが高い時だけ）
  if (s > 25) {
    if (h < 15 || h >= 345) modifiers.push('赤っぽい');
    else if (h < 45) modifiers.push('橙っぽい');
    else if (h < 65) modifiers.push('黄っぽい');
    else if (h < 150) modifiers.push('緑っぽい');
    else if (h < 210) modifiers.push('水色っぽい');
    else if (h < 270) modifiers.push('青っぽい');
    else if (h < 330) modifiers.push('紫っぽい');
  }


  if (modifiers.length === 1 && baseColor === '落ち着いた') {
    return 'なし';
  }

  if (modifiers.length === 0) {
    return 'なし';
  }

  return modifiers.join(' ');
}





// メインAPI
app.post('/api/rgb', (req, res) => {
  let rgb = [];
  let hex = undefined;

  if (req.body.hex) {
    let hex = req.body.hex;
    if (!hex.startsWith('#')) hex = '#' + hex;
    rgb = hexToRgb(hex);
    if (!rgb) return res.status(400).json({ error: '不正なHEX値です' });
  } else if (req.body.rgb) {
    rgb = req.body.rgb;
    if (!Array.isArray(rgb) || rgb.length !== 3) {
      return res.status(400).json({ error: 'RGBの形式が不正です' });
    }
  } else {
    return res.status(400).json({ error: 'HEXまたはRGBを指定してください' });
  }

  const [r, g, b] = rgb;
  const ranks = rankRGB([r, g, b]);
  const [h, s, v] = rgbToHsv(r, g, b);

  const colorName = getColorName(h, s, v);
  const modifier = getModifierFromRGB(r, g, b);

  res.json({
    rgb: { R: r, G: g, B: b },
    hex: hex,
    hsv: { H: h, S: s, V: v },
    ranks,
    colorName,
    modifier
  });
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server started on port 5000');
});

