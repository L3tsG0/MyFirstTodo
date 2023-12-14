# MyFirstTodo
FastAPIで初めて作ったtodoアプリ

## 機能
以下の4つの機能があります．

- Todo一覧取得
- taskの作成
- taskのupdate
- taskの消去

## 始め方

```poetry init```で依存パッケージをインストール

```poetry shell```で仮想環境内に入る

ファイル内の一番上のディレクトリで```uvicorn app.main:api --reload```を実行

表示されたurlにアクセス．/docsを追加すると，かんたんなデモができる．
