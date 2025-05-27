import React, { useEffect, useState } from 'react';

export const App = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Node.jsのAPIにアクセス
    fetch('http://localhost:5000/api/data/1')
      .then(res => {
        // レスポンスのステータスがOKかチェック
        if (!res.ok) {
          throw new Error(`HTTPエラー! ステータス: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setMessage(data.message))
      .catch(err => setError("エラー: " + err.message));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>APIテスト</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>{message}</p>
    </div>
  );
};
