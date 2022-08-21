# 其他

## 组件

组件

如果还需要模板的话，相比函数组件是多了一个字段来声明模板：$template，
该字段的值可以是一个模板字符串，也可以是 <template>元素的 ID 选择器。(推荐用template元素)。



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

## reactive

响应式

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
