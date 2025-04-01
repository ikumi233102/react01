import React from 'react';

export const App = () => {
  // ボタンがクリックされたときに実行される関数
  const handleClick = () => {
    // 最初のリスト項目のテキストを取得
    const firstItem = document.querySelector('ul li').textContent;
    // ボタンのテキストを最初のリスト項目のテキストに変更
    document.querySelector('button').textContent = firstItem;
  };

  // ボタンのスタイルを定義するオブジェクト
  const buttonStyle = {
    backgroundColor: 'yellow', // ボタンの背景色を黄色に設定
    fontSize: '18px',         // ボタンのフォントサイズを18pxに設定
  };

  return (
    <>
      <h1>こんにちは</h1>
      <p>ヤッホー</p>
      <ul>
        <li>リンゴ</li>
        <li>バナナ</li>
        <li>オレンジ</li>         
      </ul>
       {/* buttonStyleをstyle属性に渡す */}
      <button style={buttonStyle} onClick={handleClick}>押してください</button>
    </>
  );
};
