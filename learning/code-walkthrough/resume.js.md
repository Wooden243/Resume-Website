# assets/js/resume.js — 全文と逐次解説

> **役割:** JSONからスキル・経歴・学歴を生成。
> **入力:** profile.json。
> **出力:** ResumeページDOM。
> **設計意図:** PDF URLを同一オリジンで検証。

> **SHA-256:** `48dac5444f4900d26057b8e7afc189b88479d93294044107e9267f19ea32b987`（ZIPに入れた元ファイルとの整合性確認用）

## 1. 実装ソース全文（省略なし）

```javascript
import {loadProfile} from './data.js';
import {node, tag, showError} from './dom.js';
import {initSite} from './site.js';

initSite();
const outlet = document.getElementById('resume-dynamic');

async function renderResume() {
  try {
    const profile = await loadProfile();
    const pdfLink = document.getElementById('resume-download');
    if (pdfLink && typeof profile.resumeFile === 'string') {
      const parsed = new URL(profile.resumeFile, window.location.href);
      if (parsed.origin === window.location.origin && parsed.pathname.toLowerCase().endsWith('.pdf')) {
        pdfLink.href = parsed.href;
      }
    }
    const skills = node('section', {className:'resume-section'}, [node('h2', {text:'Skills & tools'})]);
    for (const group of profile.skills || []) {
      skills.append(node('div', {className:'skill-group'}, [
        node('h3', {text:group.group}),
        node('div', {className:'tag-list'}, (group.items || []).map(tag))
      ]));
    }
    const experience = node('section', {className:'resume-section'}, [node('h2', {text:'Experience & selected work'})]);
    for (const entry of profile.experience || []) {
      const item = node('article', {className:'experience-entry'}, [
        node('div', {className:'entry-date', text:entry.period}),
        node('div', {}, [
          node('h3', {text:entry.position}),
          node('p', {className:'entry-organization', text:entry.organization}),
          node('p', {text:entry.description})
        ])
      ]);
      experience.append(item);
    }
    const education = node('section', {className:'resume-section'}, [
      node('h2', {text:'Education'}), node('p', {text:profile.education})
    ]);
    outlet.replaceChildren(skills, experience, education);
  } catch (error) {
    console.error(error);
    showError(outlet, 'Resume details could not be loaded.', renderResume);
  }
}

renderResume();
```

## 2. 上から順番の行・ブロック解説

以下のL番号は上記実装の**実際の物理行番号**と対応する。説明は複数行で一つの役割を成す処理をひとまとまりにしている。

### L1–L10

```javascript
import {loadProfile} from './data.js';
import {node, tag, showError} from './dom.js';
import {initSite} from './site.js';

initSite();
const outlet = document.getElementById('resume-dynamic');

async function renderResume() {
  try {
    const profile = await loadProfile();
```

- `import`/`from`は外部モジュールの定義をこのファイルから利用する宣言。読み込みと名前の衝突を制御する。
- `await`はPromiseの解決を待って次の行に進む。ブラウザ全体の動作を停止させる同期ブロックではない。

### L11–L20

```javascript
    const pdfLink = document.getElementById('resume-download');
    if (pdfLink && typeof profile.resumeFile === 'string') {
      const parsed = new URL(profile.resumeFile, window.location.href);
      if (parsed.origin === window.location.origin && parsed.pathname.toLowerCase().endsWith('.pdf')) {
        pdfLink.href = parsed.href;
      }
    }
    const skills = node('section', {className:'resume-section'}, [node('h2', {text:'Skills & tools'})]);
    for (const group of profile.skills || []) {
      skills.append(node('div', {className:'skill-group'}, [
```

- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L21–L30

```javascript
        node('h3', {text:group.group}),
        node('div', {className:'tag-list'}, (group.items || []).map(tag))
      ]));
    }
    const experience = node('section', {className:'resume-section'}, [node('h2', {text:'Experience & selected work'})]);
    for (const entry of profile.experience || []) {
      const item = node('article', {className:'experience-entry'}, [
        node('div', {className:'entry-date', text:entry.period}),
        node('div', {}, [
          node('h3', {text:entry.position}),
```

- 配列の反復処理。mapは変換、filterは部分配列、findは最初の一致値、sortは並べ替えを担当する。

### L31–L40

```javascript
          node('p', {className:'entry-organization', text:entry.organization}),
          node('p', {text:entry.description})
        ])
      ]);
      experience.append(item);
    }
    const education = node('section', {className:'resume-section'}, [
      node('h2', {text:'Education'}), node('p', {text:profile.education})
    ]);
    outlet.replaceChildren(skills, experience, education);
```

- DOMの子要素を挿入・入れ替える。配列データそのものをHTMLへ直接渡さず、生成したDOMノードを渡す。

### L41–L47

```javascript
  } catch (error) {
    console.error(error);
    showError(outlet, 'Resume details could not be loaded.', renderResume);
  }
}

renderResume();
```

- 失敗系の分岐。正常系だけでなく取得エラー・形式不正のケースでもユーザーに表示すべき状態を決める。

## 3. 主要な設計ポイントを深く理解する

### `profile.resumeFile`の検証

same-originかつ末尾が.pdfのURLだけダウンロードリンクへ代入する。JSONに外部の意図しないURLが入ってもそのまま採用しない。

### `skills`のループ

profile.skillsの配列を順に処理し、見出しと各tagを生成する。元データを変更せずHTML表示用に変換している。

### `experience`のループ

経歴オブジェクトを二列のarticle DOMへ写す。日付、ポジション、組織名、説明という役割を分離する。

### `replaceChildren(skills,...)`

一つのコンテナへ3つのセクションを順に差し込み、描画を確定する。

## 4. 入力から出力まで追跡する例

`profile.skills`に`{group:"Front-end", items:["HTML","CSS"]}`があると、section内にh3を一つ、tagを二つ生成する。`resumeFile`が`../assets/sample-resume.pdf`なら同一originと拡張子を確認してリンクへ反映。

## 5. 自己確認ポイント

- このファイルは「JSONからスキル・経歴・学歴を生成」を担当し、どこから読み込まれるか。
- 重要な入力値の型・経路と、成功時に返す値またはDOM変化を説明できるか。
- エラー・入力なし・不正な値が来た場合の処理が分かるか。
- 同じ機能を別ファイルへ移すときに、依存関係も更新する必要があることを理解したか。
- 原本を変更したら本教材の全文とSHA-256も更新すべきことを理解したか。

