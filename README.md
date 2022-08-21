# Pvue

`pvue` 是 [vue](https://vuejs.org) 的优化的替代发行版。它提供了与标准 Vue 相同的模板语法和响应式模型，
不过它是专门为在现有的由服务器框架呈现的 HTML 页面上进行少量的交互准备的轻量级 JS 库。

- 仅 ~8kb
- Vue-兼容的模板语法
- 基于 DOM, 原地变换
- 由 `@vue/reactivity` 驱动

## 快速上手

`pvue` 无需构建可使用，只需从 CDN 加载即可：

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

### 手动初始化

如果您不想要自动初始化，可以去掉 `init` 属性，将脚本移到 `<BODY>` 的末尾：

```html

<script src="https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js"></script>
<script>
  Pvue.createApp().mount()
</script>
```

### 生产环境 CDN 地址

- 最新版： `https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js`
- 具体某个版本：`https://cdn.jsdelivr.net/gh/a112121788/pvue@0.5.0/dist/pvue.iife.js`

### 根域

`createApp` 函数接受作为所有表达式的根作用域的数据对象，这可以用来引导简单的一次性应用程序：

```html

<script src="https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js"></script>

<script>
  Pvue.createApp({
    // exposed to all expressions
    count: 0,
    // getters
    get plusOne() {
      return this.count + 1
    },
    // methods
    increment() {
      this.count++
    }
  }).mount()
</script>

<!-- v-data value can be omitted -->
<div v-data>
  <p>{{ count }}</p>
  <p>{{ plusOne }}</p>
  <button @click="increment">increment</button>
</div>
```

注：`v-data` 不需要取值，只是作为 `pvue` 处理元素的提示。

### 显式装载目标

您可以指定挂载目标 (选择器或元素)，将 `pvue` 限制为页面的该区域：

```js
createApp().mount('#only-this-div')
```

这也意味着您可以在同一页面上有多个`pvue`应用来控制不同的地域：

```js
Pvue.createApp({
  // root data for app one
}).mount('#app1')

createApp({
  // root data for app two
}).mount('#app2')
```

### 生命周期事件

您可以监听每个元素特殊的 `vue:mounted` 和 `vue:unounted` 生命周期事件 (v0.4.0 开始需要 `vue：` 前缀)：

```html

<div
  v-if="show"
  @vue:mounted="console.log('mounted on: ', $el)"
  @vue:unmounted="console.log('unmounted: ', $el)"
></div>
```

### `v-effect`

Use `v-effect` to execute **reactive** inline statements:

```html

<div v-data="{ count: 0 }">
  <div v-effect="$el.textContent = count"></div>
  <button @click="count++">++</button>
</div>
```

effect 使用的是`Count`，这是一个反应性的数据源，所以每当`Count`发生变化时，它都会重新运行。

替换原始 Vue TodoMVC 示例中的`todo-focus` 指令的另一个示例：

```html
<input v-effect="if (todo === editedTodo) $el.focus()" />
```

### 组件

在 `pvue` 中，“组件”的概念是不同的，因为它更基本。

首先，可以使用函数创建可重用的作用域逻辑：

```html

<script src="https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js"></script>
<script>
  function Counter(props) {
    return {
      count: props.initialCount,
      inc() {
        this.count++
      },
      mounted() {
        console.log(`I'm mounted!`)
      }
    }
  }

  Pvue.createApp({
    Counter
  }).mount()
</script>

<div v-data="Counter({ initialCount: 1 })" @vue:mounted="mounted">
  <p>{{ count }}</p>
  <button @click="inc">increment</button>
</div>

<div v-data="Counter({ initialCount: 2 })">
  <p>{{ count }}</p>
  <button @click="inc">increment</button>
</div>
```

### 带模板的组件

如果您还想重用一个模板，可以在 data 对象上提供一个特殊的 `$template` 键。该值可以是模板字符串，也可以是`<template>`元素的
ID 选择符：

```html

<script src="https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js"></script>
<script type="module">
  function Counter(props) {
    return {
      $template: '#counter-template',
      count: props.initialCount,
      inc() {
        this.count++
      }
    }
  }

  Pvue.createApp({
    Counter
  }).mount()
</script>

<template id="counter-template">
  My count is {{ count }}
  <button @click="inc">++</button>
</template>

<!-- reuse it -->
<div v-data="Counter({ initialCount: 1 })"></div>
<div v-data="Counter({ initialCount: 2 })"></div>
```

与内联字符串相比，推荐使用 `<template>` 方法，因为从原生模板元素克隆会更高效。

### 全局状态管理

您可以使用`reactive`方法 (从`@vue/reactivity`重新导出) 创建全局单一状态：

```html

<script src="https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js"></script>
<script>
  const store = reactive({
    count: 0,
    inc() {
      this.count++
    }
  })

  // manipulate it here
  store.inc()

  Pvue.createApp({
    // share it with app datas
    store
  }).mount()
</script>

<div v-data="{ localCount: 0 }">
  <p>Global {{ store.count }}</p>
  <button @click="store.inc">increment</button>

  <p>Local {{ localCount }}</p>
  <button @click="localCount++">increment</button>
</div>
```

### 自定义指令

支持自定义指令，但具有不同的接口：

```js
const myDirective = (ctx) => {
  // the element the directive is on
  ctx.el
  // the raw value expression
  // e.g. v-my-dir="x" then this would be "x"
  ctx.exp
  // v-my-dir:foo -> "foo"
  ctx.arg
  // v-my-dir.mod -> { mod: true }
  ctx.modifiers
  // evaluate the expression and get its value
  ctx.get()
  // evaluate arbitrary expression in current data
  ctx.get(`${ctx.exp} + 10`)

  // run reactive effect
  ctx.effect(() => {
    // this will re-run every time the get() value changes
    console.log(ctx.get())
  })

  return () => {
    // cleanup if the element is unmounted
  }
}

// register the directive
createApp().directive('my-dir', myDirective).mount()
```

`v-html` 的实现方式如下：

```js
const html = ({ el, get, effect }) => {
  effect(() => {
    el.innerHTML = get()
  })
}
```

### 自定义分隔符 (0.3+)

您可以通过向根作用域传递 `$delimiters` 来使用自定义分隔符。这在与同时使用 mustaches 的服务器端模板语言一起工作时非常有用：

```js
createApp({
  $delimiters: ['${', '}']
}).mount()
```

### 使用插件

您可以编写自定义指令，然后将其作为包分发，然后将它添加到创建 vue 中，如：

```html

<div v-data="{counter: 0}" v-log="inside petite-vue data">
  <button @click="counter++">increase</button>
</div>

<script type="module">
  import log from './log'
  import { createApp } from 'https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.es.js'

  createApp().use(log).mount()
</script>
```

类似于 vue 插件代码的插件代码：

```js
// inside log.js plugin file
export default {
  install: (app, options) => {
    app.directive('log', ({ exp }) => {
      console.log(exp)
    })
  }
}
```

## 示例

查看[示例目录](./examples).

## 特性

### 仅 `pvue`

- `v-data`
- `v-effect`
- `@vue:mounted` & `@vue:unmounted` events

### 不同的行为

- 在表达式中，`$el`指向指令绑定到的当前元素（而不是组件根元素）
- `createApp()`接受全局状态而不是组件
- 组件被简化为对象返回函数
- 自定义指令具有不同的接口

### Vue 兼容

- `{{ }}` 文本绑定（可配置自定义定界符）
- `v-bind`（包括`:`速记和类/样式特殊处理）
- `v-on`（包括`@`速记和所有修饰语）
- `v-model`（所有输入类型 + 非字符串` :value` 绑定）
- `v-if` / `v-else` / `v-else-if`
- `v-for`
- `v-show`
- `v-html`
- `v-text`
- `v-pre`
- `v-once`
- `v-cloak`
- `reactive()`
- `nextTick()`
- Template refs

### 不支持特性

一些特征被丢弃，因为它们在渐进增强的上下文中具有相对低的效用/大小比。如果您需要这些功能，您可能只需要使用标准的 Vue。

- `ref()`, `computed()` 等。
- Render 函数 (`pvue` 没有虚拟 dom)
- 收集类型的反应性（Map、Set 等，因尺寸较小而删除）
- 过渡、保活、传送、悬念
- `v-for` 深度解构
- `v-on="object"`
- `v-is` & `<component :is="xxx">`
- `v-bind:style` 自动前缀

## 与标准 Vue 的差别

“pvue”的意义不仅仅在于小。它是关于使用预期用例的最佳实现（渐进增强）。

标准 Vue 可以在有或没有构建步骤的情况下使用。当使用构建设置时（例如使用单文件组件），我们预编译所有模板，因此在运行时不需要进行模板处理。
多亏了 tree-shaking，我们可以在标准 Vue 中提供可选功能，在不使用时不会使您的捆绑包膨胀。
这是标准 Vue 的最佳使用，但由于它涉及构建设置，因此更适合于构建交互相对频繁的 SPA 或应用程序。

当使用标准 Vue 而不需要构建步骤并安装到 DOM 模板中时，它的最佳性要低得多，因为：

- 我们必须将 Vue 模板编译器发送到浏览器（额外大小为 13kb）
- 编译器必须从已经实例化的 DOM 中检索模板字符串
- 然后，编译器将字符串编译为 JavaScript 呈现函数
- 然后，Vue 用渲染函数生成的新 DOM 替换现有 DOM 模板。

`pvue` 通过遍历现有 DOM 并将细粒度的反应性效果直接附加到元素来避免所有这些开销。DOM 是模板。这意味着“pvue”在渐进增强场景中更有效。

这也是 Vue 1 的工作方式。这里的权衡是，这种方法与 DOM 耦合，因此不适用于平台无关的渲染或 JavaScript SSR。
我们还失去了处理高级抽象的呈现函数的能力。然而，正如您可能知道的那样，在渐进增强的环境中很少需要这些功能。

## 与 Alpine 的差别

`pvue` is indeed addressing a similar data to [Alpine](https://alpinejs.dev), but aims to be (1) even more minimal
and (2) more Vue-compatible.

`pvue` 确实解决了与 [Alpine](https://alpinejs.dev) 类似的范围，但其目的是（1）更加最小化和（2）更加兼容 Vue。

- `pvue` 大约是 Alpine 的一半。

- `pvue` 没有 transition 系统（也许这可以是一个选择加入插件）。

- 虽然 Alpine 在很大程度上类似于 Vue 的设计，但在许多情况下，其行为与 Vue 本身不同。在未来，它也可能与 Vue 的差异更大。
  这是好的，因为 Alpine 不应该限制其设计严格遵循 Vue，它应该有自由在一个对其目标有意义的方向上发展。

相比之下，`pvue`将尽可能与标准 Vue 行为保持一致，以便在需要时减少移动到标准 Vue 的摩擦。
它旨在**成为 Vue 生态系统**的一部分**以涵盖标准 Vue 目前优化程度较低的渐进增强用例。

## 安全和 CSP

`pvue`计算模板中的 JavaScript 表达式。这意味着**如果**`pvue`安装在 DOM 中包含来自用户数据的未经清理的 HTML 的区域上，
则可能会导致 XSS 攻击，**如果您的页面呈现用户提交的 HTML，您应该更喜欢使用 显式装载目标初始化 `pvue`，
以便它只处理由您控制的部分**。您还可以为`v-data`属性清理任何用户提交的 HTML。

`pvue` 使用 `new Function（）`计算表达式，这在严格的 CSP 设置中可能是禁止的。
没有计划提供一个 CSP 构建，因为它涉及到一个表达式解析器，这违背了轻量级的目的。如果您有严格的 CSP 要求，您可能应该使用标准
Vue 并预编译模板。

## 版权

MIT
