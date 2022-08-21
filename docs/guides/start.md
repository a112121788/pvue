# 快速上手

## iife版

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

## ES版

```html
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

<script type="module">
  import { createApp } from 'https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.es.js'

  createApp({
      count:0,
      open:false,
    }
  ).mount()
</script>
```

建议使用 iife 版，部分浏览器并不支持 `<script type="module">`。
