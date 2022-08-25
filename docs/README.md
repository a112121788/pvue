# Pvue 介绍

`pvue`  一款专门专注于渐进增强 MPA(多页应用) 交互的响应式 JavaScript 库。

## 核心特点

- 提供精简版的与 Vue3 语法和表现一致的模板语言；
- 仅由渲染模块和响应式系统模块组成；
- 渲染模块没有采用虚拟 DOM，而是采用在线解析渲染的方式；
- 响应式系统模块对外暴露 reactive 接口提供构建全局状态管理器的能力；
- 代码库体积在 gzip 压缩后不到 8KB，十分适合与项目已有的 UI 库搭配使用。

pvue 无需构建，直接通过 cdn/url 引入即可，非常方便在由服务端渲染 HTML 页面的项目中集成：

```html

<script src="https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js" defer init></script>

<div v-data="{ count: 0 }">
  {{ count }}
  <button @click="count++">inc</button>
</div>

<div v-data="{ open: false }">
  <button @click="open=!open">Toggle</button>
  <span v-show="open">
      Content...
    </span>
</div>
```

## 项目背景

pvue 源于 [petite-vue](https://github.com/vuejs/petite-vue)，petitle-vue 由尤雨溪亲自操刀设计开发，
针对历史非前后端分离项目专门打造的，基于 Vue3 的 @vue/reactivity 提供与 Vue 一致的响应式开发模式的渐进式前端开发框架。

由于尤雨溪的核心精力在 Vue 主项目，petitle-vue 几乎不再更新，故基于 petitle-vue 开发了本项目，并持续更新。

pvue 尽可能保持与 vue 语法兼容。

## 快速上手

```html

<script src="https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js" defer init></script>

<div v-data="{ count: 0 }">
  {{ count }}
  <button @click="count++">inc</button>
</div>

<div v-data="{ open: false }">
  <button @click="open=!open">Toggle</button>
  <span v-show="open">
      Content...
    </span>
</div>

```

- 使用 `v-data` 在页面上标记应该由 `pvue` 控制的区域。
- `defer` 属性使脚本在解析完 HTML 内容后执行。
- `init` 属性告诉 `pvue` 自动查询并初始化页面上所有有 `v-data` 的元素。
