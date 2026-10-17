# data/projects.json — 全文と逐次解説

> **役割:** 表示されるプロジェクト群のデータ。
> **入力:** 編集者が用意するJSON値。
> **出力:** Project配列。
> **設計意図:** 同じデータから一覧と個別ページを生成。

> **SHA-256:** `dfcdd2b923f2a8a45afa9fb3be7527c7ccbff8af3d6252869d58804c2ae173df`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```json
[
  {
    "id": 1,
    "slug": "foodie-finder",
    "title": "FoodieFinder",
    "subtitle": "A calmer way to explore nearby places",
    "summary": "A restaurant discovery interface with helpful filters and an uncluttered mobile layout.",
    "content": "FoodieFinder is a fictional demonstration project that explores how a restaurant discovery experience could be structured. Users can scan location cards, refine a result list, and compare a few useful details. The goal of the design exercise is to practice clear information hierarchy, stateful controls, and a mobile-first browsing flow.",
    "challenge": "Help users narrow a long list of places without losing the context of their search.",
    "approach": "Separate the filter state from visual presentation and prioritize readable result cards.",
    "outcome": "A frontend concept that demonstrates filter-driven UI and responsive layouts. This is sample work, not a deployed commercial product.",
    "stack": ["HTML", "CSS", "JavaScript"],
    "category": "Web App",
    "year": 2026,
    "date": "2026-04-10",
    "featured": true,
    "source": "",
    "demo": "",
    "visual": "finder"
  },
  {
    "id": 2,
    "slug": "budget-master",
    "title": "BudgetMaster",
    "subtitle": "Bring your budget into focus",
    "summary": "A personal finance dashboard concept with simple charts and straightforward categories.",
    "content": "BudgetMaster is a fictional user-interface case study. The concept turns a set of transactions into useful summaries so that a person can see where a budget is going. It illustrates the difference between raw data, computed metrics, and the visual layer used to present them.",
    "challenge": "Make financial numbers accessible without overwhelming a first-time visitor.",
    "approach": "Use a restrained visual hierarchy, category labels, and lightweight data transformation functions.",
    "outcome": "A prototype design demonstrating understandable data presentation; no real accounts or financial data are connected.",
    "stack": ["JavaScript", "JSON", "CSS"],
    "category": "Data UI",
    "year": 2026,
    "date": "2026-02-16",
    "featured": true,
    "source": "",
    "demo": "",
    "visual": "budget"
  },
  {
    "id": 3,
    "slug": "fit-track",
    "title": "FitTrack",
    "subtitle": "Small improvements, clearly measured",
    "summary": "A workout log interface that makes progress entries easy to scan and maintain.",
    "content": "FitTrack is a fictional product exercise based on a simple idea: recording regular activity should take less effort than the activity itself. The mock product uses lists, summary cards, and straightforward interactions, with particular attention to keyboard navigation and compact mobile layouts.",
    "challenge": "Represent repeated activity in a format that is quick to understand.",
    "approach": "Make recent logs and the next action prominent, with clear empty and loading states.",
    "outcome": "A UI concept illustrating interaction design and accessible information grouping.",
    "stack": ["HTML", "CSS", "Accessibility"],
    "category": "Web App",
    "year": 2025,
    "date": "2025-11-25",
    "featured": true,
    "source": "",
    "demo": "",
    "visual": "fitness"
  },
  {
    "id": 4,
    "slug": "code-collab",
    "title": "CodeCollab",
    "subtitle": "A shared space for better code reviews",
    "summary": "A collaborative review dashboard concept with comments, diff summaries, and status cues.",
    "content": "CodeCollab is a fictional interface study of peer review workflows. It demonstrates how related pieces of information can be grouped so a reader can move between changed files, comments, and review status without losing context.",
    "challenge": "Keep complex review information understandable across screen sizes.",
    "approach": "Use separate panels, semantic status labels, and an adaptive layout.",
    "outcome": "A static design study for team workflows, with no actual code-hosting integration.",
    "stack": ["UI Design", "JavaScript", "CSS"],
    "category": "Developer Tools",
    "year": 2025,
    "date": "2025-08-03",
    "featured": false,
    "source": "",
    "demo": "",
    "visual": "collab"
  },
  {
    "id": 5,
    "slug": "travel-planner",
    "title": "TravelPlanner",
    "subtitle": "A useful overview for your next trip",
    "summary": "A trip-planning concept with organized destinations, notes, and a simple itinerary.",
    "content": "TravelPlanner is a fictional case study showing how a compact itinerary could be organized as structured data. The concept focuses on a readable timeline, basic metadata, and flexible cards that work well on a small screen.",
    "challenge": "Show destination details and a multi-stop plan without clutter.",
    "approach": "Store itinerary data separately from page markup and render it through reusable components.",
    "outcome": "A sample interface intended for demonstration, not a live booking service.",
    "stack": ["JSON", "JavaScript", "Responsive CSS"],
    "category": "Data UI",
    "year": 2025,
    "date": "2025-05-14",
    "featured": false,
    "source": "",
    "demo": "",
    "visual": "travel"
  }
]
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L17

```json
[
  {
    "id": 1,
    "slug": "foodie-finder",
    "title": "FoodieFinder",
    "subtitle": "A calmer way to explore nearby places",
    "summary": "A restaurant discovery interface with helpful filters and an uncluttered mobile layout.",
    "content": "FoodieFinder is a fictional demonstration project that explores how a restaurant discovery experience could be structured. Users can scan location cards, refine a result list, and compare a few useful details. The goal of the design exercise is to practice clear information hierarchy, stateful controls, and a mobile-first browsing flow.",
    "challenge": "Help users narrow a long list of places without losing the context of their search.",
    "approach": "Separate the filter state from visual presentation and prioritize readable result cards.",
    "outcome": "A frontend concept that demonstrates filter-driven UI and responsive layouts. This is sample work, not a deployed commercial product.",
    "stack": ["HTML", "CSS", "JavaScript"],
    "category": "Web App",
    "year": 2026,
    "date": "2026-04-10",
    "featured": true,
    "source": "",
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `slug`はリンク先で対象プロジェクトを選択するための安定したURL識別子。
- `featured`がtrueの項目はホームのおすすめ候補になる。

### L18–L34

```json
    "demo": "",
    "visual": "finder"
  },
  {
    "id": 2,
    "slug": "budget-master",
    "title": "BudgetMaster",
    "subtitle": "Bring your budget into focus",
    "summary": "A personal finance dashboard concept with simple charts and straightforward categories.",
    "content": "BudgetMaster is a fictional user-interface case study. The concept turns a set of transactions into useful summaries so that a person can see where a budget is going. It illustrates the difference between raw data, computed metrics, and the visual layer used to present them.",
    "challenge": "Make financial numbers accessible without overwhelming a first-time visitor.",
    "approach": "Use a restrained visual hierarchy, category labels, and lightweight data transformation functions.",
    "outcome": "A prototype design demonstrating understandable data presentation; no real accounts or financial data are connected.",
    "stack": ["JavaScript", "JSON", "CSS"],
    "category": "Data UI",
    "year": 2026,
    "date": "2026-02-16",
```

- `slug`はリンク先で対象プロジェクトを選択するための安定したURL識別子。

### L35–L51

```json
    "featured": true,
    "source": "",
    "demo": "",
    "visual": "budget"
  },
  {
    "id": 3,
    "slug": "fit-track",
    "title": "FitTrack",
    "subtitle": "Small improvements, clearly measured",
    "summary": "A workout log interface that makes progress entries easy to scan and maintain.",
    "content": "FitTrack is a fictional product exercise based on a simple idea: recording regular activity should take less effort than the activity itself. The mock product uses lists, summary cards, and straightforward interactions, with particular attention to keyboard navigation and compact mobile layouts.",
    "challenge": "Represent repeated activity in a format that is quick to understand.",
    "approach": "Make recent logs and the next action prominent, with clear empty and loading states.",
    "outcome": "A UI concept illustrating interaction design and accessible information grouping.",
    "stack": ["HTML", "CSS", "Accessibility"],
    "category": "Web App",
```

- `slug`はリンク先で対象プロジェクトを選択するための安定したURL識別子。
- `featured`がtrueの項目はホームのおすすめ候補になる。

### L52–L68

```json
    "year": 2025,
    "date": "2025-11-25",
    "featured": true,
    "source": "",
    "demo": "",
    "visual": "fitness"
  },
  {
    "id": 4,
    "slug": "code-collab",
    "title": "CodeCollab",
    "subtitle": "A shared space for better code reviews",
    "summary": "A collaborative review dashboard concept with comments, diff summaries, and status cues.",
    "content": "CodeCollab is a fictional interface study of peer review workflows. It demonstrates how related pieces of information can be grouped so a reader can move between changed files, comments, and review status without losing context.",
    "challenge": "Keep complex review information understandable across screen sizes.",
    "approach": "Use separate panels, semantic status labels, and an adaptive layout.",
    "outcome": "A static design study for team workflows, with no actual code-hosting integration.",
```

- `slug`はリンク先で対象プロジェクトを選択するための安定したURL識別子。
- `featured`がtrueの項目はホームのおすすめ候補になる。

### L69–L85

```json
    "stack": ["UI Design", "JavaScript", "CSS"],
    "category": "Developer Tools",
    "year": 2025,
    "date": "2025-08-03",
    "featured": false,
    "source": "",
    "demo": "",
    "visual": "collab"
  },
  {
    "id": 5,
    "slug": "travel-planner",
    "title": "TravelPlanner",
    "subtitle": "A useful overview for your next trip",
    "summary": "A trip-planning concept with organized destinations, notes, and a simple itinerary.",
    "content": "TravelPlanner is a fictional case study showing how a compact itinerary could be organized as structured data. The concept focuses on a readable timeline, basic metadata, and flexible cards that work well on a small screen.",
    "challenge": "Show destination details and a multi-stop plan without clutter.",
```

- `slug`はリンク先で対象プロジェクトを選択するための安定したURL識別子。
- `featured`がtrueの項目はホームのおすすめ候補になる。

### L86–L97

```json
    "approach": "Store itinerary data separately from page markup and render it through reusable components.",
    "outcome": "A sample interface intended for demonstration, not a live booking service.",
    "stack": ["JSON", "JavaScript", "Responsive CSS"],
    "category": "Data UI",
    "year": 2025,
    "date": "2025-05-14",
    "featured": false,
    "source": "",
    "demo": "",
    "visual": "travel"
  }
]
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `featured`がtrueの項目はホームのおすすめ候補になる。

## 3. 主要な設計ポイントを深く理解する

### `id`/`slug`

内部識別とURL識別を分離。idは正の安全な整数、slugは重複しない小文字英数字とハイフン。

### `title`/`summary`/`content`

カード用タイトル・短い説明・詳細ページの本文を分離している。

### `challenge`/`approach`/`outcome`

問題・取り組み方・結果を独立した節にするためのフィールド。

### `category`/`stack`

カテゴリはフィルタ条件、stackは検索対象とタグ表示に使う。

### `featured`/`date`

ホームに表示するかどうかをfeaturedで指定し、dateで並べ替えを行う。

### `source`/`demo`/`visual`

空のURLはボタンに出さない。visualはCSSモックテーマ用。データはあくまで例示で実績を主張しない。

## 4. 入力から出力まで追跡する例

`search.value = "budget"`, `activeCategory = "All"`なら、全5件から`projectMatches`でBudgetMasterの1件を取り出し、DOMをそのカード1枚に置き換える。検索文字列を空にすると全件に戻る。

## 5. 自己確認ポイント

- このファイルは「表示されるプロジェクト群のデータ」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

