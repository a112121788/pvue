# 介绍

::: tip
专门为在现有的由服务器框架呈现的 HTML 页面上进行少量的交互准备的轻量级 JS 库，还在不断开发中。
:::


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

`pvue` 是 [vue](https://vuejs.org) 的优化的替代发行版。它提供了与标准 Vue 相同的模板语法和响应式模型，
不过它是专门为在现有的由服务器框架呈现的 HTML 页面上进行少量的交互准备的轻量级 JS 库。

- 仅 ~8kb
- Vue-兼容的模板语法
- 基于 DOM, 原地变换
- 由 `@vue/reactivity` 驱动


