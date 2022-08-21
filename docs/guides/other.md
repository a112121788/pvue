# 其他

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

