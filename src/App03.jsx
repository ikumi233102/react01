import React from 'react';

export const App = () => {
  // JSXはJavaScriptの拡張構文
  const handleClick = () => {
    const firstItem = document.querySelector('ul li').textContent;
    document.querySelector('button').textContent = firstItem;
  };
  // 複数行記述するときは( )で囲む
  return (
    <>
      <h1>こんにちは</h1>
      <p>ヤッホー</p>
      <ul>
        <li>リンゴ</li>
        <li>バナナ</li>
        <li>オレンジ</li>         
      </ul>

      <button onClick={handleClick}>押してください</button>
    </>
  );
};
