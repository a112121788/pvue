# 其他

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



## 自定义分隔符

如果分隔符与你当前使用的开发框架冲突，可以自定义分隔符。

```html
<div v-data="{ count: 1 }">
  <p v-if="count">count is ${ count }!</p>
  <button @click="count++">increase</button>

  <p v-for="i in [1, 2, 3]" :key="i">${ i }</p>

  <p v-if="true">${ count }</p>
</div>

<script>
  Pvue.createApp({
    $delimiters: ['${', '}']
  }).mount()
</script>
```

## 多 mount

当页面有多个组件都需要使用 Pvue 时，可以使用多个 mount。

```html
<div id="app1">
  Global count {{ store.count }}
  Local count {{ count }}
</div>

<div id="app2">
  Global count {{ store.count }}
  Local count {{ count }}
</div>

<script>
  const store = Pvue.reactive({
    count: 0,
    inc() {
      this.count++
    }
  })

  Pvue.createApp({
    store,
    count: 1
  }).mount('#app1')

  Pvue.createApp({
    store,
    count: 2
  }).mount('#app2')
</script>
```

## 全局状态管理

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




## 自定义指令

pvue 支持自定义指令，但写法不同：

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
  // evaluate arbitrary expression in current scope
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

