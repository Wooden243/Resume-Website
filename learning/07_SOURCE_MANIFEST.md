# 07 | 実装ソースと教材の整合性

`learning/code-walkthrough/`には、主要ソースの全文とSHA-256チェックサムを掲載しています。初期テンプレートから引き継いだ**解説文の一部には当時の例示が残る**ため、現行の公開仕様は`README.md`、`data/projects.json`、コードそのものを優先してください。

このファイルに固定のチェックサム一覧を重複して持つと更新漏れが生じるため、各写本に記載されているSHA-256と元ファイルのバイト列を**テストで自動照合**する方式に変更しました。

```bash
bash scripts/verify.sh
```

対応する検査は`tests/test_materials.py`の`test_all_full_source_blocks_match_current_files`です。次の両方を確認します。

1. 各学習用Markdownの第1章に含まれるソース全文が、現在の該当ソースと一致すること。
2. 記載されたSHA-256が、現在の該当ソースのSHA-256と一致すること。

ローカルで単独に確認する場合は次のように実行できます。

```bash
python3 - <<'PY'
from hashlib import sha256
from pathlib import Path
source = Path("assets/js/detail.js")
print(f"{source}: {sha256(source.read_bytes()).hexdigest()}")
PY
```

作品の内容を知りたい場合は[トップREADME](../README.md)および[作品一覧データ](../data/projects.json)を参照してください。
