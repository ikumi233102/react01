// Reactライブラリをインポートします
import React from 'react';

// Cardコンポーネントをエクスポートします（propsとしてtitleとcontentを受け取ります）
export const Card = ({ title, content }) => {
    // JSXを返します（カードのデザインを定義）
    return (
        // カード全体のスタイルを設定します
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', maxWidth: '300px' }}>
            {/* カードのタイトルを表示します */}
            <h3>{title}</h3>
            {/* カードの内容を表示します */}
            <p>{content}</p>
        </div>
    );
};

