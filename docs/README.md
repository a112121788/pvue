# 介绍

`pvue` 是 [vue](https://vuejs.org) 的优化替代发行版。它提供了与标准 Vue 相同的模板语法和响应式模型，

不过它是专门为在现有的由服务端渲染的 HTML 页面上进行少量的交互准备的轻量级 JS 库。

## 特点

- 仅 ~8kb
- Vue-兼容的模板语法
- 基于 DOM, 原地变换
- 由 `@vue/reactivity` 驱动

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

## 致敬

pvue 源于 [petite-vue](https://github.com/vuejs/petite-vue)，并持续更新。pvue 尽可能保持与 vue 兼容。
