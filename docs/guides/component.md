# 组件与状态

## 模板

template 元素是 2013 年定稿用于提供一种更统一、功能更强大的模板本存放方式。具体表现为

通过 template 元素属性 content 获取已实例化的 HTML 元素 (不是字符串而已)：

```html
<template id="tpl">
  <div>a</div>
  <div>b</div>
</template>
<script>
  const tpl = document.getElementById('tpl')
  tpl.content // document-fragment
  tpl.content.children[0].outerHTML // <div>a</div>
</script>
```
1. `<template>` 以及其子节点均不可视
2. `<template>` 下的 img 元素的 src 属性即使有值也不会发出资源请求
3. `<template>` 下的 script 和 css 规则均不会解析和执行

[内容模板元素](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/template)



## 组件

“组件”的概念在 pvue 中有所不同，因为它更加简单。

可以使用函数创建可复用部分的逻辑：

```html
<template id="comp">
  {{ count }} {{ plusOne }}
  <button @click="count++">++</button>
</template>

<div v-data="MyComp()"></div>

<script>
  function MyComp() {
    return {
      $template: '#comp',
      count: 0,
      get plusOne() {
        return this.count + 1
      }
    }
  }

  Pvue.createApp({
    MyComp
  }).mount()
</script>
```

### 带有模板的组件

如果您还想复用模板，您可以使用 $template 属性，该值可以是模板字符串，也可以是 `<template>` 元素的 ID 选择器：

```html

<template id="counter-template">
  My count is {{ count }}
  <button @click="inc">++</button>
</template>

<!-- reuse it -->
<div v-scope="Counter({ initialCount: 1 })"></div>
<div v-scope="Counter({ initialCount: 2 })"></div>

<script>
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
```

建议使用该 `<template>` 方法而不是内联字符串，因为从本地模板克隆元素更高效。

### template 错误用例

> `<template>`必须搭配 v-if 或 v-for 使用哦

虽然 template 元素能帮助我们优化用户体验和性能，但有些时候也会让我们掉到坑里面，下面一起绕过这些坑吧！
```html
<div v-data="App"></div>

<script>

  Pvue.createApp({
    App: {
      $template: `
      <template>
        <div>Hello</div>
      </template>
      `,
    }
    status: 'online'
  }).mount('[v-data]')
</script>
```
根块对象对应的是 `<div v-data="App"></div>`，而 `<template>` 由于没有附加 v-if 或 v-for，
因此不会为其创建新的块对象进行处理，最后得到的 UI 就是这样的：

```html
<div v-data="App">
  <template>
    <div>Hello</div>
  </template>
</div>
```
无法看到文字 Hello。







## 状态管理

可以使用该 reactive 方法来创建全局状态：

```html
<div v-data="{ localCount: 0 }">
  <p>Global {{ store.count }}</p>
  <button @click="store.inc">increment</button>

  <p>Local {{ localCount }}</p>
  <button @click="localCount++">increment</button>
</div>


<script>
  const store = Pvue.reactive({
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
```

我们使用 reactive 构造了一个响应式对象，我们在改变这个对象中数据的时候，其他使用到这个数据的地方也会相应的自动更新。

