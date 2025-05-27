const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 0番目のデータを返すエンドポイント
const data = ["A", "B", "C"];

app.get('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id, 10); // 文字列を数値に変換
  const message = data[id];
  
  if (message) {
    res.json({ message });
  } else {
    res.status(404).json({ error: "データが見つかりません" });
  }
});

app.listen(port, () => {
  console.log(`Node.js APIが http://localhost:${port} で起動中`);
});
