# 组件与状态

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

