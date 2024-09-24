# Changelog

## 0.5.0 (2024-09-24)

Full Changelog: [v0.4.1...v0.5.0](https://github.com/writer/writer-node/compare/v0.4.1...v0.5.0)

### Features

* **api:** manual updates ([#62](https://github.com/writer/writer-node/issues/62)) ([d9dedc4](https://github.com/writer/writer-node/commit/d9dedc400a225420ef23bbd2bc0077a1cac59ba5))
* **api:** manual updates ([#64](https://github.com/writer/writer-node/issues/64)) ([d072c4d](https://github.com/writer/writer-node/commit/d072c4d279ee25087b282404a097fa80a1f7d17c))
* **client:** send retry count header ([#61](https://github.com/writer/writer-node/issues/61)) ([c0a3dde](https://github.com/writer/writer-node/commit/c0a3ddebb34f34567f01951f39bee1a144e2d05a))


### Bug Fixes

* **lint:** format ([032bc59](https://github.com/writer/writer-node/commit/032bc59490e65b17137e26d965e481290fc2e526))
* **types:** remove leftover polyfill usage ([#60](https://github.com/writer/writer-node/issues/60)) ([043939d](https://github.com/writer/writer-node/commit/043939d96fdd8179fc56ff3b3ed48f37a91d724e))


### Chores

* **internal:** codegen related update ([#58](https://github.com/writer/writer-node/issues/58)) ([0b0a85d](https://github.com/writer/writer-node/commit/0b0a85d7d4be783fbd9a674ed1d3bc961e313b94))


### Documentation

* **api:** updates to API spec ([#57](https://github.com/writer/writer-node/issues/57)) ([73dddc8](https://github.com/writer/writer-node/commit/73dddc829bc31141415005a762b0a3c16d1a852a))
* **api:** updates to API spec ([#63](https://github.com/writer/writer-node/issues/63)) ([50a86f4](https://github.com/writer/writer-node/commit/50a86f4593fbcff313397279b32bb5ceb24fd471))

## 0.4.1 (2024-09-06)

Full Changelog: [v0.4.0...v0.4.1](https://github.com/writer/writer-node/compare/v0.4.0...v0.4.1)

### Bug Fixes

* **uploads:** avoid making redundant memory copies ([#55](https://github.com/writer/writer-node/issues/55)) ([f864fb3](https://github.com/writer/writer-node/commit/f864fb33da970311e3ef32cac083ba5543fe6a7c))


### Chores

* **internal:** codegen related update ([#51](https://github.com/writer/writer-node/issues/51)) ([fcebf50](https://github.com/writer/writer-node/commit/fcebf50518f24dd765d675b94afd3937ac66dd5b))
* **internal:** dependency updates ([#53](https://github.com/writer/writer-node/issues/53)) ([ab3c399](https://github.com/writer/writer-node/commit/ab3c399044f36aa74f21148770869c034c4185ab))
* Update completions-streaming.ts ([303a7b4](https://github.com/writer/writer-node/commit/303a7b434686bed3e8b2ac4ddc68daa329ecf804))

## 0.4.0 (2024-08-14)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/writer/writer-node/compare/v0.3.0...v0.4.0)

### Features

* **api:** added method to generate applications content ([#43](https://github.com/writer/writer-node/issues/43)) ([09b2657](https://github.com/writer/writer-node/commit/09b26572e0b66f490cb5fef0ee3f0c0250ae9142))
* **api:** update via SDK Studio ([#37](https://github.com/writer/writer-node/issues/37)) ([978cf26](https://github.com/writer/writer-node/commit/978cf26ddca6e10cccbb36fb0a7e0eaa44ae367b))
* **api:** update via SDK Studio ([#41](https://github.com/writer/writer-node/issues/41)) ([6e08bc0](https://github.com/writer/writer-node/commit/6e08bc0d85946bda11b397bb647f32595992d322))
* **api:** update via SDK Studio ([#42](https://github.com/writer/writer-node/issues/42)) ([2c54f4a](https://github.com/writer/writer-node/commit/2c54f4a8975a92d169beff5dbd9b096f7999e7b5))
* feat: joint method `uploadAndAddFileToGraph` ([49ae4ba](https://github.com/writer/writer-node/commit/49ae4ba238ca5791e9df5ef42998fffe33e5c121))
* fix: lint ([4a363dc](https://github.com/writer/writer-node/commit/4a363dc4869b1022e31367b6ddd42b4757ee479e))


### Bug Fixes

* **compat:** remove ReadableStream polyfill redundant since node v16 ([#33](https://github.com/writer/writer-node/issues/33)) ([2dac835](https://github.com/writer/writer-node/commit/2dac83558310169906d1057ad08f80ae9ec81272))


### Chores

* **ci:** bump prism mock server version ([#47](https://github.com/writer/writer-node/issues/47)) ([3b881e9](https://github.com/writer/writer-node/commit/3b881e99f6d06d964f6b3d5c2321b2731ad8f0b3))
* **ci:** minor changes ([#46](https://github.com/writer/writer-node/issues/46)) ([2cab651](https://github.com/writer/writer-node/commit/2cab65110b303808962dfa4f8378ca0d2e40aa0b))
* **docs:** fix incorrect client var names ([#34](https://github.com/writer/writer-node/issues/34)) ([186a9d9](https://github.com/writer/writer-node/commit/186a9d9816a8b1021203958aeaebc5954ce95c25))
* **internal:** add constant for default timeout ([#36](https://github.com/writer/writer-node/issues/36)) ([b4220e2](https://github.com/writer/writer-node/commit/b4220e2d2ad266040c753b4c42f1f0da1a51a166))
* **internal:** codegen related update ([#31](https://github.com/writer/writer-node/issues/31)) ([c3ba095](https://github.com/writer/writer-node/commit/c3ba0959665d5604bc963b16c6ab71f738686504))
* **internal:** codegen related update ([#45](https://github.com/writer/writer-node/issues/45)) ([5c54eb9](https://github.com/writer/writer-node/commit/5c54eb96d4bfcaa305990be63ef98839679ac56d))
* **internal:** codegen related update ([#48](https://github.com/writer/writer-node/issues/48)) ([d908809](https://github.com/writer/writer-node/commit/d9088094ecd095db6f598384dbda4bd1f01ce460))
* **internal:** codegen related update ([#49](https://github.com/writer/writer-node/issues/49)) ([d057479](https://github.com/writer/writer-node/commit/d05747974f065d73ffa6c19c792292fd626b87d8))
* **internal:** version bump ([#28](https://github.com/writer/writer-node/issues/28)) ([254dd3c](https://github.com/writer/writer-node/commit/254dd3cc6595271fc239b42e2a8d2ebb683f7a9a))
* **tests:** update prism version ([#32](https://github.com/writer/writer-node/issues/32)) ([6ea2f59](https://github.com/writer/writer-node/commit/6ea2f5920f53502b6ba5e0b7530aa22b0a1a620a))


### Documentation

* **api:** updates to API spec ([#44](https://github.com/writer/writer-node/issues/44)) ([5b3f183](https://github.com/writer/writer-node/commit/5b3f183754a6422212fba2175831ffcbb8470e8b))

## 0.3.0 (2024-07-16)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/writer/writer-node/compare/v0.2.0...v0.3.0)

### Features

* fix(api/files): remove unintentional Content-Length header param ([00aa0e8](https://github.com/writer/writer-node/commit/00aa0e8d85f8c90d2923f506f650cb93dc8c1438))

## 0.2.0 (2024-07-15)

Full Changelog: [v0.1.2...v0.2.0](https://github.com/writer/writer-node/compare/v0.1.2...v0.2.0)

### Features

* **api:** add support for graphs and files endpoints ([#13](https://github.com/writer/writer-node/issues/13)) ([52f462c](https://github.com/writer/writer-node/commit/52f462c25a34a0876577bf7e02444e57b99bf7aa))
* **api:** OpenAPI spec update via Stainless API ([#11](https://github.com/writer/writer-node/issues/11)) ([e742ffe](https://github.com/writer/writer-node/commit/e742ffeb02c8cbee7abee98e70c7ca6673770b85))
* **api:** OpenAPI spec update via Stainless API ([#19](https://github.com/writer/writer-node/issues/19)) ([00d9929](https://github.com/writer/writer-node/commit/00d9929fea595070b9e0e3e6042b40f0d6f898cf))
* **api:** OpenAPI spec update via Stainless API ([#22](https://github.com/writer/writer-node/issues/22)) ([b3b9223](https://github.com/writer/writer-node/commit/b3b9223530de5b8c65bc3e0c58869a8a4a140d3b))
* **api:** OpenAPI spec update via Stainless API ([#23](https://github.com/writer/writer-node/issues/23)) ([1e9c082](https://github.com/writer/writer-node/commit/1e9c08252bf0987fa7e0830bfaa5db6d306cc405))
* **api:** OpenAPI spec update via Stainless API ([#25](https://github.com/writer/writer-node/issues/25)) ([cc8dca0](https://github.com/writer/writer-node/commit/cc8dca08fa4c6b0adcb8fb921a7741e0e78e3934))
* **api:** update via SDK Studio ([#14](https://github.com/writer/writer-node/issues/14)) ([88e43b2](https://github.com/writer/writer-node/commit/88e43b271ffbf1130d6ed582bd8fb0c29bdbf4e1))
* **api:** update via SDK Studio ([#15](https://github.com/writer/writer-node/issues/15)) ([11d170b](https://github.com/writer/writer-node/commit/11d170bf8649dca8beb99519ca0d12097bf28412))
* **api:** update via SDK Studio ([#16](https://github.com/writer/writer-node/issues/16)) ([455b64a](https://github.com/writer/writer-node/commit/455b64ae3c138ae1befef9d20b317b686bf99133))
* **api:** update via SDK Studio ([#17](https://github.com/writer/writer-node/issues/17)) ([fcd684d](https://github.com/writer/writer-node/commit/fcd684d35d9e66c8a7f85c515c22d50ce25c89ba))
* **api:** update via SDK Studio ([#20](https://github.com/writer/writer-node/issues/20)) ([4f863a4](https://github.com/writer/writer-node/commit/4f863a424f73ec65d7075450de05f1fafbda22a6))
* **api:** update via SDK Studio ([#21](https://github.com/writer/writer-node/issues/21)) ([19a6a2c](https://github.com/writer/writer-node/commit/19a6a2cc64b7f9900cead093521b5b6c3d17c29f))
* **api:** update via SDK Studio ([#24](https://github.com/writer/writer-node/issues/24)) ([04c9642](https://github.com/writer/writer-node/commit/04c964230fb0a45b01bac545f1c3e4f5a0a1a7e9))


### Chores

* **internal:** version bump ([#9](https://github.com/writer/writer-node/issues/9)) ([e8cc802](https://github.com/writer/writer-node/commit/e8cc8027b3ae9a9c7e25e932bb5815758b923017))

## 0.1.2 (2024-06-05)

Full Changelog: [v0.1.0-alpha.1...v0.1.2](https://github.com/writerai/writer-node/compare/v0.1.0-alpha.1...v0.1.2)

### Features

* **api:** update via SDK Studio ([#6](https://github.com/writerai/writer-node/issues/6)) ([4e3a404](https://github.com/writerai/writer-node/commit/4e3a404e9b208735519a190b21f987c1a0c258cc))
* **api:** update via SDK Studio ([#7](https://github.com/writerai/writer-node/issues/7)) ([8bacaeb](https://github.com/writerai/writer-node/commit/8bacaebb0db6e46ad27f9d1e6b959d23708aa48b))

## 0.1.0-alpha.1 (2024-06-04)

Full Changelog: [v0.0.1-alpha.0...v0.1.0-alpha.1](https://github.com/writerai/writer-node/compare/v0.0.1-alpha.0...v0.1.0-alpha.1)

### Features

* **api:** update via SDK Studio ([f0c7afd](https://github.com/writerai/writer-node/commit/f0c7afd876cd809a1050bd6ca45ad23803c4475e))
* **api:** update via SDK Studio ([a700263](https://github.com/writerai/writer-node/commit/a700263a6a96e5b2fd42f4e177cc9a08393273d5))
* **api:** update via SDK Studio ([4ea2214](https://github.com/writerai/writer-node/commit/4ea2214221363c04a2fff5c4478d0e0e21c220dd))
* **api:** update via SDK Studio ([b3c74ab](https://github.com/writerai/writer-node/commit/b3c74ab04b2e8fadb6739969b8ceeee6d853fdaa))
* **api:** update via SDK Studio ([f3018fc](https://github.com/writerai/writer-node/commit/f3018fc9f6feb08d54b3a76f80681626c0083272))
* **api:** update via SDK Studio ([b42882d](https://github.com/writerai/writer-node/commit/b42882ddec15bab1f2c0897a8dc337fff5b96432))
* **api:** update via SDK Studio ([27e23b1](https://github.com/writerai/writer-node/commit/27e23b1d7856d7e172adf3879fdee397cf9c8048))
* **api:** update via SDK Studio ([3504f6d](https://github.com/writerai/writer-node/commit/3504f6dcf928563eaafd31ded2572d6c2e2f0530))
* **api:** update via SDK Studio ([ad2a87f](https://github.com/writerai/writer-node/commit/ad2a87f902a94a48ddfdfc8c6e1284dbf0ecdbe8))
* **api:** update via SDK Studio ([c5b1413](https://github.com/writerai/writer-node/commit/c5b14130c0f3df4aecc9ed2f0b5adc810d1c126a))
* **api:** update via SDK Studio ([775dbcf](https://github.com/writerai/writer-node/commit/775dbcf038e55f31e424cb71e0d8b8552deef8dc))
* **api:** update via SDK Studio ([974e3de](https://github.com/writerai/writer-node/commit/974e3debd390df366ad56b69f9255b238b99423d))
* **api:** update via SDK Studio ([f9df401](https://github.com/writerai/writer-node/commit/f9df401dc0d00cf30e50e59761858758a7c1ebaf))
* **api:** update via SDK Studio ([2c4aa57](https://github.com/writerai/writer-node/commit/2c4aa57cd97347795e9471d323b6564365d5a1a4))
* **api:** update via SDK Studio ([#3](https://github.com/writerai/writer-node/issues/3)) ([514a183](https://github.com/writerai/writer-node/commit/514a1831d625e4e536e5c1331f11f634dc78d977))
* **api:** update via SDK Studio ([#4](https://github.com/writerai/writer-node/issues/4)) ([c57666a](https://github.com/writerai/writer-node/commit/c57666a9bac97efdbc39fe3d4dc397ae4cfd83a3))


### Chores

* go live ([#1](https://github.com/writerai/writer-node/issues/1)) ([97d56db](https://github.com/writerai/writer-node/commit/97d56db208b49ffc17c8d54c52cdd8fc53699fa7))
