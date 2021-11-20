# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.2.0](https://github.com/corcd/private/compare/v2.1.1...v2.2.0) (2021-11-20)


### Features

* 支持多环境预配置和命令行工具 ([b12472a](https://github.com/corcd/private/commit/b12472a2ffb01ed0a987aad29f81ab3fd8746ff3))

### [2.1.1](https://github.com/corcd/private/compare/v2.1.0...v2.1.1) (2021-11-15)


### Features

* 支持 common 配置;修复已知的问题 ([e231369](https://github.com/corcd/private/commit/e231369122f93232ddafc5b0963d2409df4ef8b0))

## [2.1.0](https://github.com/corcd/private/compare/v2.0.4...v2.1.0) (2021-11-14)


### Features

* 拆分插件,适配新版本 API 设计,修复已知的问题 ([f02ac7c](https://github.com/corcd/private/commit/f02ac7c97a54fbdeaac47fa9c140529bf54dc480))

### [2.0.4](https://github.com/corcd/private/compare/v2.0.3...v2.0.4) (2021-11-05)

### [2.0.3](https://github.com/corcd/private/compare/v2.0.2...v2.0.3) (2021-11-05)


### Bug Fixes

* 修复 this 指针问题 ([57399ff](https://github.com/corcd/private/commit/57399ff601f0044813ab8c428e63ea19331774d2))

### [2.0.2](https://github.com/corcd/private/compare/v2.0.1...v2.0.2) (2021-11-05)


### Bug Fixes

* 修复环境变量混乱使用的问题 ([a726943](https://github.com/corcd/private/commit/a7269434a044dadfda4dbd527a04aae430dd878e))

### [2.0.1](https://github.com/corcd/private/compare/v2.0.0...v2.0.1) (2021-11-04)

## 2.0.0 (2021-11-04)


### Features

* 优化包装函数支持参数注入；新增获取参数属性的单独方法 ([d5ae980](https://github.com/corcd/private/commit/d5ae980015e0baf0f0ed1baaa25f633e55762288))
* 整合 private-define-plugin 插件,分离 warp 函数功能,完善配置 ([03d5179](https://github.com/corcd/private/commit/03d517999a3d7c494331280bd184ff9da4683882))
* 支持函数私有化权限控制 ([8fec0cf](https://github.com/corcd/private/commit/8fec0cf5d86f7b1feca67919fe129196f2a57536))


### Bug Fixes

* 修复插件触发阶段丢失的问题 ([335fd07](https://github.com/corcd/private/commit/335fd07900e96c50f50423609862768a23577908))
