# 其他

## 组件
```html
<script type="module">
  import { createApp, reactive } from '../src'

  function MyComp() {
    return {
      $template: '#comp',
      count: 0,
      get plusOne() {
        return this.count + 1
      }
    }
  }

  createApp({
    MyComp
  }).mount()
</script>

<template id="comp">
  {{ count }} {{ plusOne }}
  <button @click="count++">++</button>
</template>

<div v-data="MyComp()"></div>
```

## 自定义 delimiter
```html
<script type="module">
  import { createApp } from '../src'
  createApp({
    $delimiters: ['${', '}']
  }).mount()
</script>

<div v-data="{ count: 1 }">
  <p v-if="count">count is ${ count }!</p>
  <button @click="count++">increase</button>

  <p v-for="i in [1, 2, 3]" :key="i">${ i }</p>

  <p v-if="true">${ count }</p>
</div>

```

## 多 mount
```html
<script type="module">
  import { createApp, reactive } from '../src'

  const store = reactive({
    count: 0,
    inc() {
      this.count++
    }
  })

  createApp({
    store,
    count: 1
  }).mount('#app1')

  createApp({
    store,
    count: 2
  }).mount('#app2')
</script>

<div id="app1">
  Global count {{ store.count }}
  Local count {{ count }}
</div>

<div id="app2">
  Global count {{ store.count }}
  Local count {{ count }}
</div>
```

## reactive
```html
<script type="module">
  import { createApp, reactive } from '../src'

  const store = reactive({
    count: 0,
    inc() {
      this.count++
    }
  })

  // manipulate it here
  store.inc()

  createApp({
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
