import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

export const App = () => {
  const [hexInput, setHexInput] = useState('');
  const [r, setR] = useState('');
  const [g, setG] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [colorBox, setColorBox] = useState('');
  const [chartData, setChartData] = useState([]);

  const rgbToHex = (r, g, b) =>
    '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

  const generateRandomHex = () => {
    let result = '';
    const hexChars = '0123456789abcdef';
    for (let i = 0; i < 6; i++) {
      result += hexChars[Math.floor(Math.random() * 16)];
    }
    return result;
  };

  const handleHexSubmit = async () => {
    setError('');
    setResult('');

    if (!hexInput) {
      setError('HEXコードを入力してください');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/rgb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hex: hexInput })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'サーバーエラーが発生しました');

      const hexText = `HEX → ${rgbToHex(data.rgb.R, data.rgb.G, data.rgb.B)}`;
      const rgbText = `R:${data.rgb.R} G:${data.rgb.G} B:${data.rgb.B}`;
      const hsvText = `HSV → H:${data.hsv.H} S:${data.hsv.S} V:${data.hsv.V}`;
      const rankText = `順位 → 赤:${data.ranks.赤} 緑:${data.ranks.緑} 青:${data.ranks.青}`;
      const nameText = `色の名前 → ${data.colorName}`;
      const modifierText = `修飾子 → ${data.modifier}`;

      setResult(`${hexText}\n${rgbText}\n${hsvText}\n${rankText}\n${nameText}\n${modifierText}`);
      setColorBox(`#${hexInput.replace(/^#/, '')}`);

      setChartData([
        { name: 'R', value: data.rgb.R, fill: '#ff0000' },
        { name: 'G', value: data.rgb.G, fill: '#00ff00' },
        { name: 'B', value: data.rgb.B, fill: '#0000ff' }
      ]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRgbSubmit = async () => {
    setError('');
    setResult('');

    if (r === '' || g === '' || b === '') {
      setError('RGBのすべてを入力してください');
      return;
    }

    const rVal = Number(r), gVal = Number(g), bVal = Number(b);
    if ([rVal, gVal, bVal].some(n => isNaN(n) || n < 0 || n > 255)) {
      setError('RGBは0〜255の範囲で入力してください');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/rgb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rgb: [rVal, gVal, bVal] })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'サーバーエラーが発生しました');

      const hexText = `HEX → ${rgbToHex(data.rgb.R, data.rgb.G, data.rgb.B)}`;
      const rgbText = `R:${data.rgb.R} G:${data.rgb.G} B:${data.rgb.B}`;
      const hsvText = `HSV → H:${data.hsv.H} S:${data.hsv.S} V:${data.hsv.V}`;
      const rankText = `順位 → 赤:${data.ranks.赤} 緑:${data.ranks.緑} 青:${data.ranks.青}`;
      const nameText = `色の名前 → ${data.colorName}`;
      const modifierText = `修飾子 → ${data.modifier}`;

      setResult(`${hexText}\n${rgbText}\n${hsvText}\n${rankText}\n${nameText}\n${modifierText}`);
      setColorBox(`rgb(${rVal}, ${gVal}, ${bVal})`);

      setChartData([
        { name: 'R', value: data.rgb.R, fill: '#ff0000' },
        { name: 'G', value: data.rgb.G, fill: '#00ff00' },
        { name: 'B', value: data.rgb.B, fill: '#0000ff' }
      ]);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleRandomHex = () => {
    const randomHex = generateRandomHex();
    setHexInput(randomHex);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>色名判別ツール</h2>
      <button onClick={handleRandomHex} style={{ marginLeft: 5 }}>ランダムな色を生成</button>

      <div style={{ marginBottom: 10 }}>
        <label>HEX: </label>
        <input
          type="text"
          value={hexInput}
          onChange={e => {
            const value = e.target.value.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
            setHexInput(value);
          }}
          placeholder="例: ff0000"
        />
        <button onClick={handleHexSubmit} style={{ marginLeft: 5 }}>HEX送信</button>
      </div>

      <div>
        <label> R: </label>
        <input
          type="number"
          value={r}
          onChange={e => setR(e.target.value)}
          style={{ width: '50px' }}
          min="0"
          max="255"
        />
        <label> G: </label>
        <input
          type="number"
          value={g}
          onChange={e => setG(e.target.value)}
          style={{ width: '50px' }}
          min="0"
          max="255"
        />
        <label> B: </label>
        <input
          type="number"
          value={b}
          onChange={e => setB(e.target.value)}
          style={{ width: '50px' }}
          min="0"
          max="255"
        />

        <button onClick={handleRgbSubmit} style={{ marginLeft: 5 }}>RGB送信</button>
      </div>

      {/* 色表示ボックス */}
      {colorBox && (
        <div
          style={{
            width: 100,
            height: 100,
            backgroundColor: colorBox,
            border: '1px solid #000',
            marginTop: 10
          }}
        />
      )}

      {/* グラフ表示 */}
      {chartData.length > 0 && (
        <BarChart width={300} height={200} data={chartData} style={{ marginTop: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 255]} />
          <Tooltip />
          <Bar dataKey="value" isAnimationActive={false}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      )}

      {/* 結果表示 */}
      {result && (
        <pre style={{ whiteSpace: 'pre-wrap', marginTop: 10 }}>{result}</pre>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};
