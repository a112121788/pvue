# 全局函数

## 全局函数

### Pvue.createApp

createApp 函数接受一个对象参数，是所有表达式的根作用域。

```html

<style>
  .orange {
    color: orange;
  }
</style>

<div v-data>
  <div v-bind="obj">object binding - this should be orange</div>
</div>

<script>
  const data = (window.data = Pvue.reactive({
    id: 'green',
    classes: ['foo', { red: true }],
    style: { color: 'blue' },
    obj: {
      class: 'orange'
    }
  }))
  Pvue.createApp(data).mount()
</script>
```

### Pvue.nextTick

```html

<body>
<main id="app" v-data>
  <h1>Counter</h1>
  <p>
    <button @click="add">Sum one</button>
  </p>
  <div>{{ counter }}</div>
</main>
</body>

<script>
  Pvue.createApp({
    counter: 0,
    add() {
      setTimeout(() => {
        this.counter++;
      }, 500);

      this.$nextTick(() => {
        this.counter++;
      });
    }
  }).mount("#app");
</script>
```

### Pvue.reactive

Pvue 直接采用 Vue3 的响应式系统 (@vue/reactivity) 的核心 API effect 和 reactive 来构建自身的响应式系统。

Vue2 是基于 Object.defineProperty 拦截对象属性的读写操作，从而实现依赖收集和响应式 UI 渲染。而 @vue/reactivity 作为 Vue3
的子项目，采用的是 ES6 的 Proxy 接口实现这一功能。

reactive 核心工作则是通过 Proxy 将一个普通的 JavaScript 对象转换为监控对象，拦截对象属性的读写删操作，并收集依赖该对象（属性）的副作用函数。

### Pvue.version

```html

<script !src="">
  console.log(Pvue.version)
</script>
```

## Pvue.createApp() 对象方法

### mount

处理 el 参数，找到应用挂载的根 DOM 节点，然后执行初始化流程

具体过程：

1. 首先判断传入的 el 是不是 string 类型，如果是直接通过 document.querySelector 去取；否则，就会取 document.documentElement
2. 初始化 roots【节点数组】

### directive

注册自定义指令。实际上是向 ctx 的 dirs 添加一个属性，当调用 applyDirective 时，就可以得到对应的处理函数。

### use

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

### unmount

销毁的过程，基于每个 block 实例化调用 teardown 方法进行销毁

