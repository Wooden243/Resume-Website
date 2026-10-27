# assets/js/dom.js — 全文と逐次解説

> **役割:** 共通DOMコンポーネント。
> **入力:** Projectオブジェクト・属性・子要素。
> **出力:** DOMノード。
> **設計意図:** 文字の安全性（textContent）を一元管理。

> **SHA-256:** `e88709ead7bdd7f81d198bdeca243c37aab349f627ca1f0e7fdbf5546cbc84f0`（現行ソースとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
/** Small DOM builders. Text from JSON always uses textContent, not innerHTML. */
export function node(tag, options = {}, children = []) {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = String(options.text);
  if (options.attrs) {
    for (const [name, value] of Object.entries(options.attrs)) {
      if (value !== undefined && value !== null) element.setAttribute(name, String(value));
    }
  }
  for (const child of children) element.append(child);
  return element;
}

export function tag(text) {
  return node('span', {className: 'tag', text});
}

export function renderTags(tags, limit = 4) {
  return node('div', {className: 'tag-list'}, tags.slice(0, limit).map(tag));
}

export function visualForProject(project) {
  const theme = ['bandit', 'chatbot'].includes(project.visual) ? project.visual : 'generic';
  const wrapper = node('div', {className: `project-art art-${theme}`, attrs: {'aria-hidden': 'true'}});
  const window = node('div', {className: 'art-window'});
  const top = node('div', {className: 'art-top'}, [node('span'), node('span'), node('span')]);
  const content = node('div', {className: 'art-body'});
  if (theme === 'bandit') {
    content.append(node('div', {className: 'art-kicker', text: 'MULTI-ARMED BANDIT / RL'}));
    content.append(node('div', {className: 'art-main-number', text: 'ε-greedy'}));
    content.append(node('div', {className: 'art-code', text: 'Q ← Q + α(R − Q)'}));
    content.append(node('div', {className: 'art-foot', text: '10 arms · 9 settings · 5,000 runs each'}));
  } else if (theme === 'chatbot') {
    content.append(node('div', {className: 'art-kicker', text: 'FULL-STACK CHATBOT'}));
    content.append(node('div', {className: 'art-main-number', text: 'ChatBot'}));
    content.append(node('div', {className: 'art-list'}, [
      node('span', {text: 'React → REST API'}),
      node('span', {text: 'FastAPI → OpenAI API'}),
      node('span', {text: 'SQLAlchemy → SQLite'})
    ]));
  } else {
    content.append(node('div', {className: 'art-kicker', text: 'SOFTWARE PROJECT'}));
    content.append(node('div', {className: 'art-main-number', text: project.title}));
  }
  window.append(top, content);
  wrapper.append(window);
  return wrapper;
}

export function projectCard(project, detailPrefix = 'projects/detail.html') {
  const a = node('a', {className: 'project-card', attrs: {href: `${detailPrefix}?slug=${encodeURIComponent(project.slug)}`, 'aria-label': `View ${project.title} project details`}});
  a.append(visualForProject(project));
  const body = node('div', {className: 'card-body'});
  body.append(node('div', {className: 'card-eyebrow', text: `${project.category}  /  ${project.year ?? '—'}`}));
  body.append(node('div', {className: 'card-heading'}, [
    node('h3', {text: project.title}), node('span', {className: 'card-arrow', text: '↗', attrs: {'aria-hidden':'true'}})
  ]));
  body.append(node('p', {text: project.summary}));
  body.append(renderTags(project.stack, 3));
  a.append(body);
  return a;
}

export function showError(container, message, retry) {
  const text = node('p', {className: 'error-text', text: message});
  const items = [text];
  if (retry) {
    const button = node('button', {className:'button button-outline button-small', text:'Retry', attrs:{type:'button'}});
    button.addEventListener('click', retry);
    items.push(button);
  }
  container.replaceChildren(node('div', {className:'status-panel', attrs:{role:'alert'}}, items));
}
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
/** Small DOM builders. Text from JSON always uses textContent, not innerHTML. */
export function node(tag, options = {}, children = []) {
  const element = document.createElement(tag);
  if (options.className) element.className = options.className;
  if (options.text !== undefined) element.textContent = String(options.text);
  if (options.attrs) {
    for (const [name, value] of Object.entries(options.attrs)) {
      if (value !== undefined && value !== null) element.setAttribute(name, String(value));
    }
  }
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `export`された定義は、他のモジュールから`import`して再利用できる。
- 値をテキストとして表示するため、文字列にHTMLタグ風の記述があっても解釈しない。

### L11–L20

```javascript
  for (const child of children) element.append(child);
  return element;
}

export function tag(text) {
  return node('span', {className: 'tag', text});
}

export function renderTags(tags, limit = 4) {
  return node('div', {className: 'tag-list'}, tags.slice(0, limit).map(tag));
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。
- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L21–L30

```javascript
}

export function visualForProject(project) {
  const theme = /^([a-z-]+)$/.test(project.visual ?? '') ? project.visual : 'generic';
  const wrapper = node('div', {className: `project-art art-${theme}`, attrs: {'aria-hidden': 'true'}});
  const window = node('div', {className: 'art-window'});
  const top = node('div', {className: 'art-top'}, [node('span'), node('span'), node('span')]);
  const content = node('div', {className: 'art-body'});
  if (theme === 'budget') {
    content.append(node('div', {className: 'art-kicker', text: 'MONTHLY OVERVIEW'}));
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L31–L40

```javascript
    content.append(node('div', {className: 'art-main-number', text: '¥ 24,820'}));
    content.append(node('div', {className: 'art-bars'}, [1,2,3,4,5,6,7].map(i => node('i', {attrs: {style: `--bar:${[48,75,62,94,56,84,67][i-1]}%`}}))));
  } else if (theme === 'fitness') {
    content.append(node('div', {className: 'art-kicker', text: 'TODAY’S ACTIVITY'}));
    content.append(node('div', {className: 'art-main-number', text: '08:42'}));
    content.append(node('div', {className: 'art-progress'}, [node('span')]));
    content.append(node('div', {className: 'art-foot', text: 'A little progress, every day.'}));
  } else if (theme === 'travel') {
    content.append(node('div', {className: 'art-kicker', text: 'YOUR ITINERARY'}));
    content.append(node('div', {className: 'art-main-number', text: '03 stops'}));
```

- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L41–L50

```javascript
    content.append(node('div', {className: 'art-list'}, ['Museum', 'Coffee stop', 'Riverside walk'].map(x => node('span', {text:x}))));
  } else if (theme === 'collab') {
    content.append(node('div', {className: 'art-kicker', text: 'REVIEW IN PROGRESS'}));
    content.append(node('div', {className: 'art-code', text: '+ const clearer = true;'}));
    content.append(node('div', {className: 'art-code muted', text: '- const clutter = false;'}));
    content.append(node('div', {className: 'art-foot', text: '3 files · 5 comments'}));
  } else {
    content.append(node('div', {className: 'art-kicker', text: 'DISCOVER NEAR YOU'}));
    content.append(node('div', {className: 'art-search', text: '⌕   Search local favorites'}));
    content.append(node('div', {className: 'art-list'}, ['Coffee & brunch', 'Small restaurants', 'Hidden gems'].map(x => node('span', {text:x}))));
```

- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。
- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L51–L60

```javascript
  }
  window.append(top, content);
  wrapper.append(window);
  return wrapper;
}

export function projectCard(project, detailPrefix = 'projects/detail.html') {
  const a = node('a', {className: 'project-card', attrs: {href: `${detailPrefix}?slug=${encodeURIComponent(project.slug)}`, 'aria-label': `View ${project.title} project details`}});
  a.append(visualForProject(project));
  const body = node('div', {className: 'card-body'});
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。
- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L61–L70

```javascript
  body.append(node('div', {className: 'card-eyebrow', text: `${project.category}  /  ${project.year ?? '—'}`}));
  body.append(node('div', {className: 'card-heading'}, [
    node('h3', {text: project.title}), node('span', {className: 'card-arrow', text: '↗', attrs: {'aria-hidden':'true'}})
  ]));
  body.append(node('p', {text: project.summary}));
  body.append(renderTags(project.stack, 3));
  a.append(body);
  return a;
}

```

- `return`はその関数の戻り値を決め、後続の式から使えるようにする。戻り値が`undefined`になる場合との違いに注意する。
- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L71–L80

```javascript
export function showError(container, message, retry) {
  const text = node('p', {className: 'error-text', text: message});
  const items = [text];
  if (retry) {
    const button = node('button', {className:'button button-outline button-small', text:'Retry', attrs:{type:'button'}});
    button.addEventListener('click', retry);
    items.push(button);
  }
  container.replaceChildren(node('div', {className:'status-panel', attrs:{role:'alert'}}, items));
}
```

- `export`された定義は、他のモジュールから`import`して再利用できる。
- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。
- イベント発生時に実行する関数を登録している。関数をその場で呼び出していない点に注意する。

## 3. 主要な設計ポイントを深く理解する

### `node(tag, options, children)`

document.createElementでHTML要素を生成し、className/textContent/属性/子要素を設定して返す。全サイトのDOM生成で繰り返すコードを隠す。

### `textContent`

JSON文字列をHTMLとして解釈させない。innerHTMLでの危険な文字列注入を避ける基本的な対策。

### `setAttribute`

aria-label, href, rel, style等の属性を設定する。attrsにはアプリ内で選んだ既知のキーだけ渡す。任意入力から属性名を組み立てない。

### `renderTags`

Array.slice(0,limit)で数を制限し、Array.map(tag)で個々の要素を作る。

### `visualForProject`

プロジェクトvisualの名前に対応するCSSテーマクラスを付け、実際の画像の代わりに装飾用のDOMを組み立てる。正規表現チェックに失敗したテーマはgenericになる。

### `projectCard`

カード全体をa要素とし、`encodeURIComponent(project.slug)`でクエリへ埋める。戻り値は表示可能なDOM要素1件。

### `showError`

エラーメッセージはrole=alertの要素内へ表示。retryが渡されればclickイベントを登録する。

## 4. 入力から出力まで追跡する例

例: `bash scripts/verify.sh`を実行すると、Node.jsの単体/静的構造テストとPython HTTPテストが順に走る。どれか一つでも失敗すれば非ゼロの終了コードで停止する。

## 5. 自己確認ポイント

- このファイルは「共通DOMコンポーネント」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

