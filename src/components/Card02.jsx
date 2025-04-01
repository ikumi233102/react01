import React from 'react'; // Reactライブラリをインポート

export const Card = (props) => { // Cardコンポーネントを定義し、propsを引数として受け取る
    const cardStyle = { // カードのスタイルを定義
        border: '1px solid #ccc', // 枠線のスタイルを指定
        borderRadius: '8px', // 角を丸くする
        padding: '16px', // 内側の余白を指定
        maxWidth: '300px', // 最大幅を指定
        backgroundColor: 'yellow', // 背景色を黄色に設定
    };
    return (
        // 定義したスタイルを適用したdiv要素を返す
        <div style={cardStyle}> 
            {/* propsから受け取ったtitleを表示 */}
            <h3>{props.title}</h3> 
            {/* propsから受け取ったcontentを表示 */}
            <p>{props.content}</p> 
        </div>
    );
};

