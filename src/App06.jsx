// ReactとuseStateフックをインポート
import React, { useState } from 'react'; 

// Appコンポーネントを定義
export const App = () => { 
  // 状態変数countとその更新関数setCountを初期値0で定義
  const [count, setCount] = useState(0); 

  // カウントを1増やす関数
  const handleIncrement = () => { 
    // countを現在の値+1に更新
    setCount(count + 1); 
  };

  const handleDecrement = () => { // カウントを1減らす関数
    setCount(count - 1); // countを現在の値-1に更新
  };

  return ( // JSXを返す
    <div style={{ textAlign: 'center', marginTop: '50px' }}> {/* 中央揃えと上部マージンを設定 */}
      <h1>Counter: {count}</h1> {/* 現在のカウントを表示 */}
      <button onClick={handleIncrement} style={{ marginRight: '10px' }}> {/* インクリメントボタン */}
        Increment
      </button>
      <button onClick={handleDecrement}>Decrement</button> {/* デクリメントボタン */}
    </div>
  );
};
