# 07 | 実装ソースと教材の整合性

以下は納品時点のソースファイルSHA-256。`code-walkthrough`内の全文と実装コードが一致しているかを調べる。

|ファイル|SHA-256|
|---|---|
|`assets/js/data.js`|`b886041c53ff0bf5e93c2ac4a882f9fe466feaf40273d443c9519c670b9a6d51`|
|`assets/js/model.js`|`1e0e76b28987a00fe8c27f77957818b5a4d21c70a7630091c5a03410a30714db`|
|`assets/js/dom.js`|`d4c69cac1c2857facad138f7c417dfbc04d56325014da6b45c32266690b06940`|
|`assets/js/site.js`|`3d91fe9f237626061aebb16071799699e67479883221d7a9665b629955c3148e`|
|`assets/js/site-init.js`|`c1c7fb81877c2ba04e4425672c9c0a7b681577b186da41c11c78054da9e6edf0`|
|`assets/js/main.js`|`7818dc4dafd8706011292e95e82e8639f476c6d01c10786663287e3790d9deb5`|
|`assets/js/projects.js`|`4e2128fa7a94c2c8677e6636845730c7c39de73f986f5a1531187750bc9865b2`|
|`assets/js/detail.js`|`6685426b1d236be56e18b45caf852cc02cac8af62b77a00fca470583ae3ff3c0`|
|`assets/js/resume.js`|`48dac5444f4900d26057b8e7afc189b88479d93294044107e9267f19ea32b987`|
|`index.html`|`3a5cc09fb34e377cea9d25000575cf71e6f130004424852f272813b03dc35102`|
|`projects/index.html`|`08d8edc62d26e7ffc0b44aabe138a7afb9378cd38874eb96a16ddfd177566cea`|
|`projects/detail.html`|`51547f504bd0824703eea930e154bffa20cee46ce2f9ed484f73ade21c4bf859`|
|`resume/index.html`|`05ff5adfa1c5adfecf428afbd5aaef2f6a783f9e65469587c4fdf1f26b3006b6`|
|`guide.html`|`2a38673e034b0e9484ac6c4fd61d4a5f4b76c28a2364d09705730f335c64b9bc`|
|`assets/css/styles.css`|`e17fe7955a665c3bb9c44a5733096f5079bf459a0509d28a71d5a7bd7479a843`|
|`data/projects.json`|`dfcdd2b923f2a8a45afa9fb3be7527c7ccbff8af3d6252869d58804c2ae173df`|
|`data/profile.json`|`f39c35945a4207dfea1b74da7c8045120b990ab82530dd3f9401b7d82c222d44`|
|`tests/model.test.js`|`da40c8d6016f4605dc5b593b1b585ca50cdd8aed919a34e360e45d9be99c5747`|
|`tests/structure.test.js`|`e702e6db23f7aa6d125aa4a6ca833c64ffe8b7e287e88e4fb7e5563c89146445`|
|`tests/test_http.py`|`f05916d184907ab5c437f1a8a9e9c99bd955a31d79e975eb2c0a40346bab6be4`|
|`.github/workflows/deploy.yml`|`c92dad6fe44679e743d353879e921f872683702c4f7dfa2464de66f4c950ede7`|
|`scripts/serve.sh`|`efea47a01fe5376c3561d3f8da9c7873b6dfb4fc0a996625ccc1f1ab3d88791d`|
|`scripts/verify.sh`|`26d7fed41d14f1ba59f0e54c5c3e98537a1af8131d810ae1e1f33d78d43a1ca8`|

ソースを変更したら、必ず教材を生成し直して整合性を確認する。
