# Changelog

## 2.2.0-rc.1 (2025-04-25)

Full Changelog: [v2.1.0...v2.2.0-rc.1](https://github.com/writer/writer-node/compare/v2.1.0...v2.2.0-rc.1)

### Features

* **api:** add ai detect tool endpoint ([d41c51e](https://github.com/writer/writer-node/commit/d41c51e1301157e88f75a42d4872fe26bfb116e7))
* **api:** add translation endpoint ([2bd71ae](https://github.com/writer/writer-node/commit/2bd71aef9490235eaac25f3fdd71a4d6ffe4badf))
* **client:** add parse method ([#226](https://github.com/writer/writer-node/issues/226)) ([da86456](https://github.com/writer/writer-node/commit/da86456495b32ec8e2c5b86b6a45e012a81254a1))


### Bug Fixes

* **client:** send all configured auth headers ([#222](https://github.com/writer/writer-node/issues/222)) ([22d5e6f](https://github.com/writer/writer-node/commit/22d5e6f54afcc60ffdf9fecc50246045c51202be))
* **internal:** fix file uploads in node 18 jest ([623fdd9](https://github.com/writer/writer-node/commit/623fdd95d8313a0f502d6a9170c38cca70700390))


### Chores

* **ci:** add timeout thresholds for CI jobs ([93abeda](https://github.com/writer/writer-node/commit/93abedab0fb7742bb9a474df94e5be7b3bbc864e))
* **ci:** only use depot for staging repos ([788c1d6](https://github.com/writer/writer-node/commit/788c1d6990de300417c44c431adbd713f04ebc36))
* **ci:** run on more branches and use depot runners ([8a5e6e8](https://github.com/writer/writer-node/commit/8a5e6e85b943696602a67f23fd43dbdc995a6631))
* **client:** minor internal fixes ([a1c6989](https://github.com/writer/writer-node/commit/a1c6989afc29d3a477470c6715f8ba5d07e0ab89))
* **internal:** improve node 18 shims ([#225](https://github.com/writer/writer-node/issues/225)) ([7012687](https://github.com/writer/writer-node/commit/7012687bb4d33eb021c8ef8f6188ae11eeea8636))
* **internal:** reduce CI branch coverage ([afaeb00](https://github.com/writer/writer-node/commit/afaeb0081bdcddeeccb931c838f1df15a13cfbbe))
* **internal:** upload builds and expand CI branch coverage ([#224](https://github.com/writer/writer-node/issues/224)) ([76336c3](https://github.com/writer/writer-node/commit/76336c38c9fff2672b5e0c90c585039f9d72c331))
* **perf:** faster base64 decoding ([4e9eb5a](https://github.com/writer/writer-node/commit/4e9eb5aa2b55874a94ddbc1d68574358297e3315))


### Documentation

* **api:** updates to API spec ([4c495f6](https://github.com/writer/writer-node/commit/4c495f64ca2851ffa12ef2cb6ef9c8d6ed66df70))
* **api:** updates to API spec ([5014f1d](https://github.com/writer/writer-node/commit/5014f1d33574a41881b43e2106cee4461d203ae5))
* **api:** updates to API spec ([94a7c72](https://github.com/writer/writer-node/commit/94a7c72b42dc1b9610141444487150c4e1894d52))
* **api:** updates to API spec ([32c703f](https://github.com/writer/writer-node/commit/32c703ff339589dae937e6871fc0f5c1c24a15f5))
* swap examples used in readme ([#220](https://github.com/writer/writer-node/issues/220)) ([72d9f65](https://github.com/writer/writer-node/commit/72d9f657faebb7cfe80635d17c63605f9e894610))

## 2.1.0 (2025-04-04)

Full Changelog: [v2.1.0-rc.1...v2.1.0](https://github.com/writer/writer-node/compare/v2.1.0-rc.1...v2.1.0)

### Features

* **api:** manual updates ([#217](https://github.com/writer/writer-node/issues/217)) ([9217f0e](https://github.com/writer/writer-node/commit/9217f0ecef3606bc5fdc00fdee5e008b240c8a93))


### Bug Fixes

* **api:** improve type resolution when importing as a package ([#214](https://github.com/writer/writer-node/issues/214)) ([0169d65](https://github.com/writer/writer-node/commit/0169d650344f16d5a69420a888325ed22567fa02))
* **client:** send `X-Stainless-Timeout` in seconds ([#209](https://github.com/writer/writer-node/issues/209)) ([6f6b153](https://github.com/writer/writer-node/commit/6f6b1535d1bacf27de69fdc1f8ae7162f32d82e4))

### Chores

* **docs:** improve migration doc ([#216](https://github.com/writer/writer-node/issues/216)) ([b2880ad](https://github.com/writer/writer-node/commit/b2880ad53b4caddd681b0647fe1c106efed08372))
* **internal:** add aliases for Record and Array ([#213](https://github.com/writer/writer-node/issues/213)) ([af62acf](https://github.com/writer/writer-node/commit/af62acfce3f4b7b1fe774ca716e06bcdd3a207b6))


## 2.1.0-rc.1 (2025-04-02)

Full Changelog: [v2.0.0...v2.1.0-rc.1](https://github.com/writer/writer-node/compare/v2.0.0...v2.1.0-rc.1)

### Features

* add chat streaming helpers ([#190](https://github.com/writer/writer-node/issues/190)) ([fb61df1](https://github.com/writer/writer-node/commit/fb61df128d092251b1cc25eef499364117a7e3c0))
* add SKIP_BREW env var to ./scripts/bootstrap ([#187](https://github.com/writer/writer-node/issues/187)) ([39fdb36](https://github.com/writer/writer-node/commit/39fdb36ca157970fa4199150abfd21d84d9e5a88))
* **api:** Add Vision endpoint. ([#202](https://github.com/writer/writer-node/issues/202)) ([ad5a874](https://github.com/writer/writer-node/commit/ad5a874ca34231205eebb944724c2e466e1bebe4))
* **api:** Add Vision endpoint. ([#203](https://github.com/writer/writer-node/issues/203)) ([e628937](https://github.com/writer/writer-node/commit/e6289373144728f15ac60d01dcaad4d0c7776eaf))
* **client:** accept RFC6838 JSON content types ([#188](https://github.com/writer/writer-node/issues/188)) ([22721b6](https://github.com/writer/writer-node/commit/22721b6e33dfd524c0bece099496d8d1ac63a0ba))


### Bug Fixes

* **client:** fix TypeError with undefined File ([#181](https://github.com/writer/writer-node/issues/181)) ([50b448c](https://github.com/writer/writer-node/commit/50b448c630c896af6e1b4c5d884fc479121dad38))
* **exports:** ensure resource imports don't require /index ([#192](https://github.com/writer/writer-node/issues/192)) ([6a9e294](https://github.com/writer/writer-node/commit/6a9e2948c979a34f03af9ad77697d020f1551551))
* **internal:** add mts file + crypto shim types ([#193](https://github.com/writer/writer-node/issues/193)) ([881ff5e](https://github.com/writer/writer-node/commit/881ff5ea019b8f207a00ed60c22dae0b9eaad14b))
* **internal:** clean up undefined File test ([#182](https://github.com/writer/writer-node/issues/182)) ([490da8e](https://github.com/writer/writer-node/commit/490da8e97ac627379d6cdde4c6ec729bb2d8718a))
* **tests:** manually reset node:buffer File ([#183](https://github.com/writer/writer-node/issues/183)) ([4fcf113](https://github.com/writer/writer-node/commit/4fcf1135890f63c646e7379d81b7cef6f063ffdd))


### Chores

* **client:** more accurate streaming errors ([#205](https://github.com/writer/writer-node/issues/205)) ([373e288](https://github.com/writer/writer-node/commit/373e288825f61889b8acd4ccd6557f4cc0253707))
* **client:** only accept standard types for file uploads ([#178](https://github.com/writer/writer-node/issues/178)) ([7dec96f](https://github.com/writer/writer-node/commit/7dec96fd2078b2dffb0bec94813b3319a4fdf141))
* **docs:** fix typo ([#197](https://github.com/writer/writer-node/issues/197)) ([3fd6d5e](https://github.com/writer/writer-node/commit/3fd6d5e8e3abed1c4119f1ff924e62ba0ddafd85))
* **docs:** improve docs for withResponse/asResponse ([#185](https://github.com/writer/writer-node/issues/185)) ([22f5e8d](https://github.com/writer/writer-node/commit/22f5e8dbe774c9e3ce47fcde1fd19c72fb42821a))
* **docs:** migration guide re-ordering ([#198](https://github.com/writer/writer-node/issues/198)) ([5f39d5d](https://github.com/writer/writer-node/commit/5f39d5d8629b6217f886dd81a46482bb6be341ba))
* **exports:** cleaner resource index imports ([#195](https://github.com/writer/writer-node/issues/195)) ([c568461](https://github.com/writer/writer-node/commit/c5684611524bf791895fcea3c9c28da06602019b))
* **exports:** stop using path fallbacks ([#196](https://github.com/writer/writer-node/issues/196)) ([3cc4c12](https://github.com/writer/writer-node/commit/3cc4c12034096679e4b964cce6233db6758d4a30))
* **internal:** codegen related update ([#206](https://github.com/writer/writer-node/issues/206)) ([afbf140](https://github.com/writer/writer-node/commit/afbf140a611c3dc9ec45be404313ec35d4979d8d))
* **internal:** constrain synckit dev dependency ([#180](https://github.com/writer/writer-node/issues/180)) ([9f99a49](https://github.com/writer/writer-node/commit/9f99a492e04fc6c090c122a121c00a53d4fa268a))
* **internal:** Fix README samples. ([#200](https://github.com/writer/writer-node/issues/200)) ([68e5023](https://github.com/writer/writer-node/commit/68e50235edfca036e199435ca951e8af21b32f68))
* **internal:** fix tests failing on node v18 ([#179](https://github.com/writer/writer-node/issues/179)) ([c8777ed](https://github.com/writer/writer-node/commit/c8777edceae587033b7c7c054b79b9d266b88fa5))
* **internal:** minor client file refactoring ([#194](https://github.com/writer/writer-node/issues/194)) ([80629b0](https://github.com/writer/writer-node/commit/80629b04bdb931e9db32a572b266688db9ba0917))
* **internal:** remove extra empty newlines ([#191](https://github.com/writer/writer-node/issues/191)) ([4f3f316](https://github.com/writer/writer-node/commit/4f3f31695038997da9487d45898ad4f3512cb69d))
* **types:** improved go to definition on fetchOptions ([#184](https://github.com/writer/writer-node/issues/184)) ([f4bf1f0](https://github.com/writer/writer-node/commit/f4bf1f0da6721df65ad86daeae38696a9b913d1b))


### Documentation

* **api:** updates to API spec ([#189](https://github.com/writer/writer-node/issues/189)) ([2c07888](https://github.com/writer/writer-node/commit/2c07888553957b571929887afaaf8d9baec0bc83))
* **api:** updates to API spec ([#199](https://github.com/writer/writer-node/issues/199)) ([01722fd](https://github.com/writer/writer-node/commit/01722fd2194f45bc8ce082be0cfa046620aa6481))
* **api:** updates to API spec ([#204](https://github.com/writer/writer-node/issues/204)) ([eecd179](https://github.com/writer/writer-node/commit/eecd179a9ea21df0868968ee019569a12bf02b55))
* **api:** updates to API spec ([#207](https://github.com/writer/writer-node/issues/207)) ([a0e0f73](https://github.com/writer/writer-node/commit/a0e0f73f25eedabcf793a111331edba20094fabd))
* update URLs from stainlessapi.com to stainless.com ([#176](https://github.com/writer/writer-node/issues/176)) ([7a061f9](https://github.com/writer/writer-node/commit/7a061f915cf5fd7e080f72e736304f1755df90d1))

## 2.0.0 (2025-02-26)

Full Changelog: [v2.0.0-rc.1...v2.0.0](https://github.com/writer/writer-node/compare/v2.0.0-rc.1...v2.0.0)

### Chores

* **internal:** improve streaming tests ([#172](https://github.com/writer/writer-node/issues/172)) ([36ff013](https://github.com/writer/writer-node/commit/36ff01390464adb669b6a30fd2e0806494406f88))

## 2.0.0-rc.1 (2025-02-25)

Full Changelog: [v0.0.1-alpha.0...v2.0.0-rc.1](https://github.com/writer/writer-node/compare/v0.0.1-alpha.0...v2.0.0-rc.1)

### Features

* **api:** add model graphs.Question ([#67](https://github.com/writer/writer-node/issues/67)) ([af195e9](https://github.com/writer/writer-node/commit/af195e9a6e4562dfb7a7e24cde19a20d45e8511f))
* **api:** add new endpoints ([#94](https://github.com/writer/writer-node/issues/94)) ([b0dcac4](https://github.com/writer/writer-node/commit/b0dcac40bb742924828cc51fd2c8702ab509e9a1))
* **api:** add streaming to application generation ([#122](https://github.com/writer/writer-node/issues/122)) ([c85d6c6](https://github.com/writer/writer-node/commit/c85d6c62e16d3b9f38b401d162ab144123413b55))
* **api:** add streaming to kg question ([#101](https://github.com/writer/writer-node/issues/101)) ([0279ffc](https://github.com/writer/writer-node/commit/0279ffc13185a7cc4e34bcd5df0489b19bcd8b64))
* **api:** add support for graphs and files endpoints ([#13](https://github.com/writer/writer-node/issues/13)) ([52f462c](https://github.com/writer/writer-node/commit/52f462c25a34a0876577bf7e02444e57b99bf7aa))
* **api:** added method to generate applications content ([#43](https://github.com/writer/writer-node/issues/43)) ([09b2657](https://github.com/writer/writer-node/commit/09b26572e0b66f490cb5fef0ee3f0c0250ae9142))
* **api:** api update ([#100](https://github.com/writer/writer-node/issues/100)) ([a7c6e10](https://github.com/writer/writer-node/commit/a7c6e10b93285a3c5a42ed468097bab2556d6be3))
* **api:** api update ([#121](https://github.com/writer/writer-node/issues/121)) ([f4adda0](https://github.com/writer/writer-node/commit/f4adda020d78626ce8ddf24e87c866db24e4baaf))
* **api:** api update ([#81](https://github.com/writer/writer-node/issues/81)) ([d61a1db](https://github.com/writer/writer-node/commit/d61a1db8343f7ca2d98de4ef66c16020b2d7144b))
* **api:** api update ([#84](https://github.com/writer/writer-node/issues/84)) ([dfbb999](https://github.com/writer/writer-node/commit/dfbb9998ef58cf008ad4ec920fc387050ee37153))
* **api:** api update ([#87](https://github.com/writer/writer-node/issues/87)) ([eabef89](https://github.com/writer/writer-node/commit/eabef89d3b32f0a46e546e004d16d91f3b91e63c))
* **api:** default timeout increase to 3 min ([#111](https://github.com/writer/writer-node/issues/111)) ([e0d48dc](https://github.com/writer/writer-node/commit/e0d48dc70007e2ff26f7045ee5362d8954328805))
* **api:** manual updates ([#102](https://github.com/writer/writer-node/issues/102)) ([eea7dcc](https://github.com/writer/writer-node/commit/eea7dcc7d88ebe666cce615991b302dfec62d46b))
* **api:** manual updates ([#105](https://github.com/writer/writer-node/issues/105)) ([9158a6d](https://github.com/writer/writer-node/commit/9158a6debe889e7cc7cf23df00d5f46671d352e7))
* **api:** manual updates ([#119](https://github.com/writer/writer-node/issues/119)) ([37f2a16](https://github.com/writer/writer-node/commit/37f2a169c41b4b0a22d7bcff562f6881a66f3af9))
* **api:** manual updates ([#62](https://github.com/writer/writer-node/issues/62)) ([d9dedc4](https://github.com/writer/writer-node/commit/d9dedc400a225420ef23bbd2bc0077a1cac59ba5))
* **api:** manual updates ([#64](https://github.com/writer/writer-node/issues/64)) ([d072c4d](https://github.com/writer/writer-node/commit/d072c4d279ee25087b282404a097fa80a1f7d17c))
* **api:** manual updates ([#95](https://github.com/writer/writer-node/issues/95)) ([26f13bd](https://github.com/writer/writer-node/commit/26f13bda1f456ff17cb8194cf5c2edeb6303652b))
* **api:** OpenAPI spec update via Stainless API ([#11](https://github.com/writer/writer-node/issues/11)) ([e742ffe](https://github.com/writer/writer-node/commit/e742ffeb02c8cbee7abee98e70c7ca6673770b85))
* **api:** OpenAPI spec update via Stainless API ([#19](https://github.com/writer/writer-node/issues/19)) ([00d9929](https://github.com/writer/writer-node/commit/00d9929fea595070b9e0e3e6042b40f0d6f898cf))
* **api:** OpenAPI spec update via Stainless API ([#22](https://github.com/writer/writer-node/issues/22)) ([b3b9223](https://github.com/writer/writer-node/commit/b3b9223530de5b8c65bc3e0c58869a8a4a140d3b))
* **api:** OpenAPI spec update via Stainless API ([#23](https://github.com/writer/writer-node/issues/23)) ([1e9c082](https://github.com/writer/writer-node/commit/1e9c08252bf0987fa7e0830bfaa5db6d306cc405))
* **api:** OpenAPI spec update via Stainless API ([#25](https://github.com/writer/writer-node/issues/25)) ([cc8dca0](https://github.com/writer/writer-node/commit/cc8dca08fa4c6b0adcb8fb921a7741e0e78e3934))
* **api:** rename kg question and add text-to-graph ([#103](https://github.com/writer/writer-node/issues/103)) ([5e651e2](https://github.com/writer/writer-node/commit/5e651e2383975474a8dea114527c4111e01f9b2d))
* **api:** rename to chat_completion_chunk ([#73](https://github.com/writer/writer-node/issues/73)) ([e4d5ac4](https://github.com/writer/writer-node/commit/e4d5ac4a9cf5eb8fa8a068024628b4ae689e5468))
* **api:** switch to new TypeScript package ([#166](https://github.com/writer/writer-node/issues/166)) ([c63e4b2](https://github.com/writer/writer-node/commit/c63e4b28b2e26adf61f7533b61f7c242a15325f7))
* **api:** update models in readme ([#79](https://github.com/writer/writer-node/issues/79)) ([19b7851](https://github.com/writer/writer-node/commit/19b7851bc31035fb457063bd5ea92aa15f4bc4ee))
* **api:** update tools api methods ([#99](https://github.com/writer/writer-node/issues/99)) ([991f955](https://github.com/writer/writer-node/commit/991f955a62816fbd25e92649f84383f264521755))
* **api:** update via SDK Studio ([f0c7afd](https://github.com/writer/writer-node/commit/f0c7afd876cd809a1050bd6ca45ad23803c4475e))
* **api:** update via SDK Studio ([a700263](https://github.com/writer/writer-node/commit/a700263a6a96e5b2fd42f4e177cc9a08393273d5))
* **api:** update via SDK Studio ([4ea2214](https://github.com/writer/writer-node/commit/4ea2214221363c04a2fff5c4478d0e0e21c220dd))
* **api:** update via SDK Studio ([b3c74ab](https://github.com/writer/writer-node/commit/b3c74ab04b2e8fadb6739969b8ceeee6d853fdaa))
* **api:** update via SDK Studio ([f3018fc](https://github.com/writer/writer-node/commit/f3018fc9f6feb08d54b3a76f80681626c0083272))
* **api:** update via SDK Studio ([b42882d](https://github.com/writer/writer-node/commit/b42882ddec15bab1f2c0897a8dc337fff5b96432))
* **api:** update via SDK Studio ([27e23b1](https://github.com/writer/writer-node/commit/27e23b1d7856d7e172adf3879fdee397cf9c8048))
* **api:** update via SDK Studio ([3504f6d](https://github.com/writer/writer-node/commit/3504f6dcf928563eaafd31ded2572d6c2e2f0530))
* **api:** update via SDK Studio ([ad2a87f](https://github.com/writer/writer-node/commit/ad2a87f902a94a48ddfdfc8c6e1284dbf0ecdbe8))
* **api:** update via SDK Studio ([c5b1413](https://github.com/writer/writer-node/commit/c5b14130c0f3df4aecc9ed2f0b5adc810d1c126a))
* **api:** update via SDK Studio ([775dbcf](https://github.com/writer/writer-node/commit/775dbcf038e55f31e424cb71e0d8b8552deef8dc))
* **api:** update via SDK Studio ([974e3de](https://github.com/writer/writer-node/commit/974e3debd390df366ad56b69f9255b238b99423d))
* **api:** update via SDK Studio ([f9df401](https://github.com/writer/writer-node/commit/f9df401dc0d00cf30e50e59761858758a7c1ebaf))
* **api:** update via SDK Studio ([2c4aa57](https://github.com/writer/writer-node/commit/2c4aa57cd97347795e9471d323b6564365d5a1a4))
* **api:** update via SDK Studio ([#14](https://github.com/writer/writer-node/issues/14)) ([88e43b2](https://github.com/writer/writer-node/commit/88e43b271ffbf1130d6ed582bd8fb0c29bdbf4e1))
* **api:** update via SDK Studio ([#15](https://github.com/writer/writer-node/issues/15)) ([11d170b](https://github.com/writer/writer-node/commit/11d170bf8649dca8beb99519ca0d12097bf28412))
* **api:** update via SDK Studio ([#16](https://github.com/writer/writer-node/issues/16)) ([455b64a](https://github.com/writer/writer-node/commit/455b64ae3c138ae1befef9d20b317b686bf99133))
* **api:** update via SDK Studio ([#17](https://github.com/writer/writer-node/issues/17)) ([fcd684d](https://github.com/writer/writer-node/commit/fcd684d35d9e66c8a7f85c515c22d50ce25c89ba))
* **api:** update via SDK Studio ([#20](https://github.com/writer/writer-node/issues/20)) ([4f863a4](https://github.com/writer/writer-node/commit/4f863a424f73ec65d7075450de05f1fafbda22a6))
* **api:** update via SDK Studio ([#21](https://github.com/writer/writer-node/issues/21)) ([19a6a2c](https://github.com/writer/writer-node/commit/19a6a2cc64b7f9900cead093521b5b6c3d17c29f))
* **api:** update via SDK Studio ([#24](https://github.com/writer/writer-node/issues/24)) ([04c9642](https://github.com/writer/writer-node/commit/04c964230fb0a45b01bac545f1c3e4f5a0a1a7e9))
* **api:** update via SDK Studio ([#3](https://github.com/writer/writer-node/issues/3)) ([514a183](https://github.com/writer/writer-node/commit/514a1831d625e4e536e5c1331f11f634dc78d977))
* **api:** update via SDK Studio ([#37](https://github.com/writer/writer-node/issues/37)) ([978cf26](https://github.com/writer/writer-node/commit/978cf26ddca6e10cccbb36fb0a7e0eaa44ae367b))
* **api:** update via SDK Studio ([#4](https://github.com/writer/writer-node/issues/4)) ([c57666a](https://github.com/writer/writer-node/commit/c57666a9bac97efdbc39fe3d4dc397ae4cfd83a3))
* **api:** update via SDK Studio ([#41](https://github.com/writer/writer-node/issues/41)) ([6e08bc0](https://github.com/writer/writer-node/commit/6e08bc0d85946bda11b397bb647f32595992d322))
* **api:** update via SDK Studio ([#42](https://github.com/writer/writer-node/issues/42)) ([2c54f4a](https://github.com/writer/writer-node/commit/2c54f4a8975a92d169beff5dbd9b096f7999e7b5))
* **api:** update via SDK Studio ([#6](https://github.com/writer/writer-node/issues/6)) ([4e3a404](https://github.com/writer/writer-node/commit/4e3a404e9b208735519a190b21f987c1a0c258cc))
* **api:** update via SDK Studio ([#7](https://github.com/writer/writer-node/issues/7)) ([8bacaeb](https://github.com/writer/writer-node/commit/8bacaebb0db6e46ad27f9d1e6b959d23708aa48b))
* **client:** send retry count header ([#61](https://github.com/writer/writer-node/issues/61)) ([c0a3dde](https://github.com/writer/writer-node/commit/c0a3ddebb34f34567f01951f39bee1a144e2d05a))
* feat: joint method `uploadAndAddFileToGraph` ([49ae4ba](https://github.com/writer/writer-node/commit/49ae4ba238ca5791e9df5ef42998fffe33e5c121))
* fix: lint ([4a363dc](https://github.com/writer/writer-node/commit/4a363dc4869b1022e31367b6ddd42b4757ee479e))
* fix(api/files): remove unintentional Content-Length header param ([00aa0e8](https://github.com/writer/writer-node/commit/00aa0e8d85f8c90d2923f506f650cb93dc8c1438))
* **internal:** make git install file structure match npm ([#118](https://github.com/writer/writer-node/issues/118)) ([407d303](https://github.com/writer/writer-node/commit/407d303875b56668730be19459cf33441745c577))
* joint method `uploadAndAddFileToGraph` ([d9e933a](https://github.com/writer/writer-node/commit/d9e933ad43c9808f175a84651333429a7d12272b))


### Bug Fixes

* add content type to file uploads param ([cb5531a](https://github.com/writer/writer-node/commit/cb5531ab082f648e26b41b109e56b84bd41b4c50))
* **api/files:** remove unintentional Content-Length header param ([82e9f9b](https://github.com/writer/writer-node/commit/82e9f9ba2258b00b23b494336599792cc501ddb7))
* change file content type to Core.Uploadable ([64c3ac9](https://github.com/writer/writer-node/commit/64c3ac9f330c55616511146bc4c2c228ebf05fc6))
* **compat:** remove ReadableStream polyfill redundant since node v16 ([#33](https://github.com/writer/writer-node/issues/33)) ([2dac835](https://github.com/writer/writer-node/commit/2dac83558310169906d1057ad08f80ae9ec81272))
* fix tool_choice schema ([d3ade29](https://github.com/writer/writer-node/commit/d3ade29281eaf5ffd94022e77313d8cfe96955e3))
* **internal:** fix tests for file uploads ([534ec64](https://github.com/writer/writer-node/commit/534ec64deeb6c68fc64e8825b619e46468518252))
* lint ([18cf3c1](https://github.com/writer/writer-node/commit/18cf3c185780c9b7cf63137ae4dfb776f96b6723))
* **lint:** format ([032bc59](https://github.com/writer/writer-node/commit/032bc59490e65b17137e26d965e481290fc2e526))
* **tests:** stop using node:stream ([#170](https://github.com/writer/writer-node/issues/170)) ([9792c5e](https://github.com/writer/writer-node/commit/9792c5e367c9eb21ed3089aeb30a88fa5cd7eb1c))
* **tests:** use new method ([e822e8d](https://github.com/writer/writer-node/commit/e822e8d461ac38a8d17b0239cc9744c6cc9f7932))
* **types:** remove leftover polyfill usage ([#60](https://github.com/writer/writer-node/issues/60)) ([043939d](https://github.com/writer/writer-node/commit/043939d96fdd8179fc56ff3b3ed48f37a91d724e))
* **uploads:** avoid making redundant memory copies ([#55](https://github.com/writer/writer-node/issues/55)) ([f864fb3](https://github.com/writer/writer-node/commit/f864fb33da970311e3ef32cac083ba5543fe6a7c))


### Chores

* **api:** add Content-Type back to file uploads and example ([89b148f](https://github.com/writer/writer-node/commit/89b148fa2425c0a0674268004ce676a72de745b6))
* **ci:** bump prism mock server version ([#47](https://github.com/writer/writer-node/issues/47)) ([3b881e9](https://github.com/writer/writer-node/commit/3b881e99f6d06d964f6b3d5c2321b2731ad8f0b3))
* **ci:** minor changes ([#46](https://github.com/writer/writer-node/issues/46)) ([2cab651](https://github.com/writer/writer-node/commit/2cab65110b303808962dfa4f8378ca0d2e40aa0b))
* **docs:** clean up example a bit ([5766967](https://github.com/writer/writer-node/commit/5766967587e580c0614fea25b7e7e60047518f20))
* **docs:** fix incorrect client var names ([#34](https://github.com/writer/writer-node/issues/34)) ([186a9d9](https://github.com/writer/writer-node/commit/186a9d9816a8b1021203958aeaebc5954ce95c25))
* go live ([#1](https://github.com/writer/writer-node/issues/1)) ([97d56db](https://github.com/writer/writer-node/commit/97d56db208b49ffc17c8d54c52cdd8fc53699fa7))
* **internal:** add constant for default timeout ([#36](https://github.com/writer/writer-node/issues/36)) ([b4220e2](https://github.com/writer/writer-node/commit/b4220e2d2ad266040c753b4c42f1f0da1a51a166))
* **internal:** bump cross-spawn to v7.0.6 ([#124](https://github.com/writer/writer-node/issues/124)) ([b5ccd7c](https://github.com/writer/writer-node/commit/b5ccd7cfba653cd078769eef9900933fed84819f))
* **internal:** codegen related update ([#116](https://github.com/writer/writer-node/issues/116)) ([d632f68](https://github.com/writer/writer-node/commit/d632f686120b920e06dfa7a2dc76ddf651da7357))
* **internal:** codegen related update ([#31](https://github.com/writer/writer-node/issues/31)) ([c3ba095](https://github.com/writer/writer-node/commit/c3ba0959665d5604bc963b16c6ab71f738686504))
* **internal:** codegen related update ([#45](https://github.com/writer/writer-node/issues/45)) ([5c54eb9](https://github.com/writer/writer-node/commit/5c54eb96d4bfcaa305990be63ef98839679ac56d))
* **internal:** codegen related update ([#48](https://github.com/writer/writer-node/issues/48)) ([d908809](https://github.com/writer/writer-node/commit/d9088094ecd095db6f598384dbda4bd1f01ce460))
* **internal:** codegen related update ([#49](https://github.com/writer/writer-node/issues/49)) ([d057479](https://github.com/writer/writer-node/commit/d05747974f065d73ffa6c19c792292fd626b87d8))
* **internal:** codegen related update ([#51](https://github.com/writer/writer-node/issues/51)) ([fcebf50](https://github.com/writer/writer-node/commit/fcebf50518f24dd765d675b94afd3937ac66dd5b))
* **internal:** codegen related update ([#58](https://github.com/writer/writer-node/issues/58)) ([0b0a85d](https://github.com/writer/writer-node/commit/0b0a85d7d4be783fbd9a674ed1d3bc961e313b94))
* **internal:** codegen related update ([#69](https://github.com/writer/writer-node/issues/69)) ([4fdbf70](https://github.com/writer/writer-node/commit/4fdbf70757530bd9dfd045e60da042877aac82a4))
* **internal:** codegen related update ([#72](https://github.com/writer/writer-node/issues/72)) ([611a33b](https://github.com/writer/writer-node/commit/611a33bda7ce33ec69fa3907a2b6ad7ae0fbe781))
* **internal:** dependency updates ([#53](https://github.com/writer/writer-node/issues/53)) ([ab3c399](https://github.com/writer/writer-node/commit/ab3c399044f36aa74f21148770869c034c4185ab))
* **internal:** move LineDecoder to a separate file ([#76](https://github.com/writer/writer-node/issues/76)) ([f8c8855](https://github.com/writer/writer-node/commit/f8c885507286f008fb26a501d692d25f912b4798))
* **internal:** pass props through internal parser ([#78](https://github.com/writer/writer-node/issues/78)) ([bb1aae5](https://github.com/writer/writer-node/commit/bb1aae50a38e375118b3ddaf35ceabb83b0ae44d))
* **internal:** remove unnecessary getRequestClient function ([#123](https://github.com/writer/writer-node/issues/123)) ([8e9e6f0](https://github.com/writer/writer-node/commit/8e9e6f02a09bf3c31bdeb0c616ab51800696d2ed))
* **internal:** update isAbsoluteURL ([#126](https://github.com/writer/writer-node/issues/126)) ([0a676eb](https://github.com/writer/writer-node/commit/0a676eba5b7a8330fe6b196e362c105d8f3049c6))
* **internal:** version bump ([#113](https://github.com/writer/writer-node/issues/113)) ([37a3f70](https://github.com/writer/writer-node/commit/37a3f705d82f14269e925377dc09d9869a653dc8))
* **internal:** version bump ([#115](https://github.com/writer/writer-node/issues/115)) ([9309158](https://github.com/writer/writer-node/commit/930915807369000620132d52c5f45df6bd3462fb))
* **internal:** version bump ([#28](https://github.com/writer/writer-node/issues/28)) ([254dd3c](https://github.com/writer/writer-node/commit/254dd3cc6595271fc239b42e2a8d2ebb683f7a9a))
* **internal:** version bump ([#9](https://github.com/writer/writer-node/issues/9)) ([e8cc802](https://github.com/writer/writer-node/commit/e8cc8027b3ae9a9c7e25e932bb5815758b923017))
* rebuild project due to codegen change ([#104](https://github.com/writer/writer-node/issues/104)) ([e1c82c3](https://github.com/writer/writer-node/commit/e1c82c3fcaa679478ed321bf97cf8935ed98e7d6))
* rebuild project due to codegen change ([#107](https://github.com/writer/writer-node/issues/107)) ([f053183](https://github.com/writer/writer-node/commit/f0531839142b957f8e6574a654eceb82c9f7a4e0))
* rebuild project due to codegen change ([#109](https://github.com/writer/writer-node/issues/109)) ([7f35e1b](https://github.com/writer/writer-node/commit/7f35e1b0c9574e02273130e99d56f99829ff7062))
* rebuild project due to codegen change ([#110](https://github.com/writer/writer-node/issues/110)) ([fc9e0e0](https://github.com/writer/writer-node/commit/fc9e0e088f76f18055213deaf259381b7713b415))
* rebuild project due to codegen change ([#90](https://github.com/writer/writer-node/issues/90)) ([89fa5b3](https://github.com/writer/writer-node/commit/89fa5b3b669fc430ab3578a126cffd4b536bcbd2))
* rebuild project due to codegen change ([#91](https://github.com/writer/writer-node/issues/91)) ([3657edb](https://github.com/writer/writer-node/commit/3657edb012dac0612aef8d09944a0283718988e2))
* rebuild project due to codegen change ([#92](https://github.com/writer/writer-node/issues/92)) ([a60408e](https://github.com/writer/writer-node/commit/a60408e45c1eae74b653e3f4b7120e461f9e29a0))
* rebuild project due to codegen change ([#93](https://github.com/writer/writer-node/issues/93)) ([0f9276c](https://github.com/writer/writer-node/commit/0f9276cfecc4d48ded3536dfb6075636f298fc4f))
* rebuild project due to codegen change ([#96](https://github.com/writer/writer-node/issues/96)) ([25327f5](https://github.com/writer/writer-node/commit/25327f5a7c98774387f100155428a291acd82f46))
* rebuild project due to codegen change ([#97](https://github.com/writer/writer-node/issues/97)) ([6df076b](https://github.com/writer/writer-node/commit/6df076b5af13422cb960d602b6aeb174e6bbdbc9))
* rebuild project due to codegen change ([#98](https://github.com/writer/writer-node/issues/98)) ([890c742](https://github.com/writer/writer-node/commit/890c74292aadb14d39ccec510f115b5740badf31))
* sync repo ([b56ae94](https://github.com/writer/writer-node/commit/b56ae94ccb9b2da425c4cb057f140a6ea5548986))
* **tests:** update prism version ([#32](https://github.com/writer/writer-node/issues/32)) ([6ea2f59](https://github.com/writer/writer-node/commit/6ea2f5920f53502b6ba5e0b7530aa22b0a1a620a))
* **types:** nicer error class types + jsdocs ([#125](https://github.com/writer/writer-node/issues/125)) ([a94669a](https://github.com/writer/writer-node/commit/a94669a86363b394efc1d045144eff4c4e0ac257))
* Update completions-streaming.ts ([303a7b4](https://github.com/writer/writer-node/commit/303a7b434686bed3e8b2ac4ddc68daa329ecf804))


### Documentation

* Add file upload details to README. ([#169](https://github.com/writer/writer-node/issues/169)) ([0aba23f](https://github.com/writer/writer-node/commit/0aba23f0360177e2a08d8d5f2061962f4ce54fb5))
* add pagination example ([#74](https://github.com/writer/writer-node/issues/74)) ([09b3ee2](https://github.com/writer/writer-node/commit/09b3ee23124d02bf223c1ec1e8458217af47b570))
* **api:** updates to API spec ([#168](https://github.com/writer/writer-node/issues/168)) ([af23ff6](https://github.com/writer/writer-node/commit/af23ff65a6e0a21a8e23e2a074aadaf2aaa72fe9))
* **api:** updates to API spec ([#44](https://github.com/writer/writer-node/issues/44)) ([5b3f183](https://github.com/writer/writer-node/commit/5b3f183754a6422212fba2175831ffcbb8470e8b))
* **api:** updates to API spec ([#57](https://github.com/writer/writer-node/issues/57)) ([73dddc8](https://github.com/writer/writer-node/commit/73dddc829bc31141415005a762b0a3c16d1a852a))
* **api:** updates to API spec ([#63](https://github.com/writer/writer-node/issues/63)) ([50a86f4](https://github.com/writer/writer-node/commit/50a86f4593fbcff313397279b32bb5ceb24fd471))
* **api:** updates to API spec ([#70](https://github.com/writer/writer-node/issues/70)) ([7c0721d](https://github.com/writer/writer-node/commit/7c0721da2901bd6e4ee7aba97b32ec8b6d8bec52))
* **api:** updates to API spec ([#75](https://github.com/writer/writer-node/issues/75)) ([3fad6c7](https://github.com/writer/writer-node/commit/3fad6c7738c5abf3e795f3b7d8c35d9a76eaf98b))
* **api:** updates to API spec ([#77](https://github.com/writer/writer-node/issues/77)) ([8749431](https://github.com/writer/writer-node/commit/87494313a99d6c8be5f768ce7654bf7f52f7042a))
* Update README. ([#167](https://github.com/writer/writer-node/issues/167)) ([13e0748](https://github.com/writer/writer-node/commit/13e0748e2645aace5119621b8b71dffea6c304d8))
