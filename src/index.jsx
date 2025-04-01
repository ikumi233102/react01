// Reactライブラリをインポート
import React from 'react';
// ReactDOMライブラリをインポート（ReactアプリをDOMにレンダリングするために使用）
import ReactDOM from 'react-dom/client';
// Appコンポーネントを'./App01'ファイルからインポート
import {App} from './App01';

// 'root'というIDを持つDOM要素を取得し、Reactのルートを作成
const root = ReactDOM.createRoot(document.getElementById('root'));
// Appコンポーネントをルートにレンダリング
root.render(<App />);