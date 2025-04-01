import React from 'react'; // Reactライブラリをインポート
import { Card } from './components/Card01'; // Cardコンポーネントを指定したパスからインポート

export const App = () => { // Appコンポーネントをエクスポート

  return ( // JSXを返す
    <>
      {/* Cardコンポーネントを使用し、タイトルとコンテンツを日本語で渡す */}
      <Card title="こんにちは" content="ヤッホー">
      </Card>
      {/* Cardコンポーネントを使用し、タイトルとコンテンツをイタリア語で渡す */}
      <Card title="Ciao" content="Ehi">
      </Card>
      {/* Cardコンポーネントを使用し、タイトルとコンテンツを英語で渡す */}
      <Card title="Hello" content="Hey">
      </Card>
    </>
  );
};
