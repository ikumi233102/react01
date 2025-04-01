import React, { useState } from 'react'; // ReactとuseStateフックをインポート

export const App = () => { // Appコンポーネントを定義
  const [ramen, setRamen] = useState(null); // ラーメン情報を格納する状態を定義
  const [error, setError] = useState(null); // エラーメッセージを格納する状態を定義

  const fetchRamen = async () => { // ラーメン情報を取得する非同期関数を定義
    try {
      setError(null); // エラー状態をリセット
      setRamen(null); // ラーメン情報をリセット
      const response = await fetch( // APIからデータを取得
        'https://ramen-api.dev/shops/yoshimuraya'
      );
      if (!response.ok) { // レスポンスが正常でない場合
        throw new Error('Failed to fetch weather data'); // エラーをスロー
      }
      const data = await response.json(); // レスポンスをJSON形式に変換
      setRamen(data); // ラーメン情報を状態にセット
    } catch (err) { // エラーが発生した場合
      setError(err.message); // エラーメッセージを状態にセット
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}> {/* 中央揃えのスタイルを適用 */}
      <h1>吉村家の情報</h1> {/* タイトルを表示 */}
      <button onClick={fetchRamen}>ラーメン屋の情報取得</button> {/* ボタンをクリックするとfetchRamenを実行 */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* エラーがあれば赤文字で表示 */}
      {ramen && ( 
        <div>
          <h2>{ramen.shop.name}</h2> {/* ラーメン屋の名前を表示 */}
          <img src={ramen.shop.photos[0].url} alt="yoshimuraya" style={{ width: '50%' }} />
        </div>
      )}
    </div>
  );
};
