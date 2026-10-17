# data/profile.json — 全文と逐次解説

> **役割:** プロフィール・スキル・履歴書のデータ。
> **入力:** 編集者が用意するJSON値。
> **出力:** Profileオブジェクト。
> **設計意図:** デモ値であり事実の経歴ではない。

> **SHA-256:** `f39c35945a4207dfea1b74da7c8045120b990ab82530dd3f9401b7d82c222d44`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```json
{
  "displayName": "Your Name",
  "headline": "Building useful things for the web.",
  "role": "Web Developer · Portfolio template",
  "location": "Your location",
  "availability": "Demo portfolio — replace with your information",
  "introduction": "A lightweight, thoughtful portfolio template for showing projects, documenting decisions, and sharing a resume. Everything on this site is sample content ready to personalize.",
  "about": "I enjoy turning complicated problems into clear, approachable experiences. This template is built with semantic HTML, modern CSS, and dependency-free JavaScript. Replace this paragraph with an authentic introduction before publishing.",
  "email": "hello@example.com",
  "github": "",
  "linkedin": "",
  "skills": [
    {"group":"Front-end", "items":["HTML & accessibility", "CSS", "JavaScript", "Responsive layouts"]},
    {"group":"Back-end & data", "items":["HTTP & APIs", "Node.js", "Python", "JSON"]},
    {"group":"Workflow", "items":["Git", "Testing", "Documentation", "Deployment basics"]}
  ],
  "experience": [
    {"period":"20XX – Present", "position":"Your position / project role", "organization":"Your organization", "description":"Describe verified responsibilities and a concrete result. This is a placeholder, not a claim of employment."},
    {"period":"20XX – 20XX", "position":"Previous role or academic project", "organization":"Your team / organization", "description":"List what you actually built, the tools you used, and how you evaluated the outcome."}
  ],
  "education": "Your institution · Your program · Years",
  "resumeFile": "../assets/sample-resume.pdf"
}
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L12

```json
{
  "displayName": "Your Name",
  "headline": "Building useful things for the web.",
  "role": "Web Developer · Portfolio template",
  "location": "Your location",
  "availability": "Demo portfolio — replace with your information",
  "introduction": "A lightweight, thoughtful portfolio template for showing projects, documenting decisions, and sharing a resume. Everything on this site is sample content ready to personalize.",
  "about": "I enjoy turning complicated problems into clear, approachable experiences. This template is built with semantic HTML, modern CSS, and dependency-free JavaScript. Replace this paragraph with an authentic introduction before publishing.",
  "email": "hello@example.com",
  "github": "",
  "linkedin": "",
  "skills": [
```

- この行群は`profile.json`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

### L13–L23

```json
    {"group":"Front-end", "items":["HTML & accessibility", "CSS", "JavaScript", "Responsive layouts"]},
    {"group":"Back-end & data", "items":["HTTP & APIs", "Node.js", "Python", "JSON"]},
    {"group":"Workflow", "items":["Git", "Testing", "Documentation", "Deployment basics"]}
  ],
  "experience": [
    {"period":"20XX – Present", "position":"Your position / project role", "organization":"Your organization", "description":"Describe verified responsibilities and a concrete result. This is a placeholder, not a claim of employment."},
    {"period":"20XX – 20XX", "position":"Previous role or academic project", "organization":"Your team / organization", "description":"List what you actually built, the tools you used, and how you evaluated the outcome."}
  ],
  "education": "Your institution · Your program · Years",
  "resumeFile": "../assets/sample-resume.pdf"
}
```

- この行群は`profile.json`の役割の一部。変数・属性を前後の宣言と照合し、変更時にどの画面・処理へ影響するか追跡する。

## 3. 主要な設計ポイントを深く理解する

### `displayName`/`headline`/`introduction`

自己紹介テキストの構造。画面に実際に表示するフィールドと、今後利用可能なフィールドを分離。

### `skills`

group/itemsの配列。グループごとの見出しとタグに変換される。

### `experience`

period/position/organization/descriptionの配列。本人の実経歴を記載する時は裏付けのないサンプル行を削除。

### `resumeFile`

PDFリンク。JSONはPDFそのものを生成しないので、リンク先のPDFファイルも別途変更が必要。

## 4. 入力から出力まで追跡する例

例: `data/projects.json`で新しい一意slugを持つ1件を追加すると、一覧ページの次回読み込み時にカードが増え、同じslugをクエリに指定すれば共有の詳細ページにその内容が現れる。

## 5. 自己確認ポイント

- このファイルは「プロフィール・スキル・履歴書のデータ」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

