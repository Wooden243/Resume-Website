# 08 | Git/GitHub提出の仕組みと手順

## まず区別すること

- **Git**: PC上でファイルの変更履歴を追跡する仕組み。
- **GitHub**: Gitで管理したリポジトリを遠隔保存するサービス。
- **GitHub Pages**: GitHub上の静的サイトをHTTP(S)で公開する仕組み。**GitHubにpushしただけでは自動有効化されない**。
- **独自ドメイン**: 所有しているDNS名をサイトへ向ける別の設定。コードから生成できない。

## 新規リポジトリへの初回push

WSL Ubuntuのターミナルで、ZIP展開先のフォルダーへ移動したことを確認する。`pwd`と`ls`を使う。

```bash
cd Resume-Website
pwd
ls

git init
git status
cat .gitignore
git add .
git status
git commit -m "Initial commit: Resume Website"
git branch -M main
```

**それぞれの意味:**

1. `git init` = `.git`ディレクトリを作り、作業ディレクトリをGit管理にする。
2. `git status` = 未追跡、変更済み、ステージ済みのファイルを表示する。
3. `.gitignore` = 誤ってGitへ含めたくないファイルを指定する。
4. `git add .` = 現在の内容を次のコミット候補（staging area）へ入れる。
5. `git commit` = ステージされた内容をスナップショットとして記録する。
6. `git branch -M main` = 現在のブランチをmainに変更する。

`gh`へログイン済みなら次を実行する。

```bash
gh repo create Resume-Website \
  --public \
  --source=. \
  --remote=origin \
  --push
```

- `Resume-Website` はリポジトリ名。スペースのない形式で指定する。
- `--public` は一般公開。
- `--source=.` は現在のローカルフォルダーを元にする。
- `--remote=origin` はGitHubの接続先を`origin`という名前で追加する。
- `--push` はコミットをGitHubへ送る。

GitHubのWeb画面で新規の**空リポジトリ**を作った場合は、上の`gh repo create`ではなく`git remote add origin git@github.com:<ACCOUNT>/Resume-Website.git`と`git push -u origin main`を実行する（`<ACCOUNT>`を実際のアカウント名へ置換）。

## 公開と動作確認

```bash
git remote -v
git status
gh repo view --web
```

リポジトリへpushしただけでは公開サイトのURLは作れないことがある。GitHubのSettings → PagesでSourceをGitHub Actionsにし、`.github/workflows/deploy.yml`の実行に成功したら公開URLを確認する。独自ドメインを使う場合は`docs/deployment.md`参照。

## 更新したいとき

```bash
git add .
git commit -m "Update project information"
git push
```

Actionsワークフローが有効なら、`main`へのpush後にGitHub Pagesのデプロイが走る。

## よくあるエラー

- `remote origin already exists`: `git remote -v`を確認し、正しくなければ`git remote set-url origin <URL>`。
- `nothing to commit`: 実際の変更がない、またはすでにコミット済み。
- `src refspec main does not match any`: 通常、最初のコミットがまだないかブランチ名が違う。
- `Permission denied (publickey)`: SSH認証設定がない。`ssh -T git@github.com`で確認、またはHTTPS認証を利用。
- `repository not found`: URL、アカウント名、権限、公開状態を確認。
- `non-fast-forward`: リモートにローカルにないコミットがある。無条件のforce pushではなく、`git fetch`して履歴を確認する。
- GitHub Pagesが404: Actionsの実行、PagesのSource設定、公開URL、相対アセットパスを確認する。

## 公開前チェック

誤った実績や未確認のプロジェクト、ダミーPDF、秘密鍵や`.env`がコミットされないように確認。`git status`とGitHub上のファイル一覧を照合する。公開した後に削除しても履歴から完全に隠れるとは限らないため、最初に検査することが重要。
