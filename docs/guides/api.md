# 核心指令

## v-data

Pvue 中的一切都是从 v-data 指令开始的。

v-data 将一大块 HTML 定义为 Pvue 组件，并为该组件提供响应数据以供参考。

注意 v-data 这里不需要有值，只是作为 pvue 处理元素的提示。

这是一个人为的下拉组件的示例：

```html

<div v-data="{ open: false }">
  <button @click="open=!open">Toggle</button>
  <span v-show="open">
        Content...
      </span>
</div>
```

不要担心这个例子中的其他指令（@click 和 v-show），我们稍后会介绍。现在，让我们专注于 v-data。

### 范围

v-data 指令中定义的属性可用于所有子元素。甚至在其他嵌套 v-data 组件中。

```html

<div v-data="{ foo: 'bar' }">
  <span v-text="foo"><!-- Will output: "bar" --></span>

  <div v-data="{ bar: 'baz' }">
    <span v-text="foo"><!-- Will output: "bar" --></span>

    <div v-data="{ foo: 'bob' }">
      <span v-text="foo"><!-- Will output: "bob" --></span>
    </div>
  </div>
</div>
```

### 方法

因为 v-data 被评估为普通的 JavaScript 对象，所以除了状态之外，您还可以存储方法甚至 getter。

例如，让我们将“切换内容”行为提取到 v-data。

```html

<div v-data="{ open: false, toggle() { this.open = ! this.open } }">
  <button @click="toggle()">Toggle Content</button>

  <div v-show="open">
    Content...
  </div>
</div>
```

注意添加的 toggle() { this.open = ! this.open } 方法 v-data。现在可以从组件内部的任何位置调用此方法。

您还会注意到 this. 访问对象本身的状态的用法。这是因为 Pvue 评估这个数据对象就像任何带有 this 上下文的标准 JavaScript
对象一样。

如果您愿意，您可以完全离开 toggle 方法的调用括号。例如：

```html
<!-- Before -->
<button @click="toggle()">...</button>

<!-- After -->
<button @click="toggle">...</button>
```

### Gettes

当方法的唯一目的是根据其他状态返回数据时，JavaScript getter 很方便。

将它们想象成“计算属性”（尽管它们不像 Vue 的计算属性那样被缓存）。

让我们重构我们的组件以使用一个 getter 调用 isOpen 而不是直接访问 open。

```html

<div v-data="{
    open: false,
    get isOpen() { return this.open },
    toggle() { this.open = ! this.open },
  }">
  <button @click="toggle()">Toggle Content</button>

  <div v-show="isOpen">
    Content...
  </div>
</div>
```

请注意，“内容”现在依赖于 isOpengetter 而不是 open 直接依赖于属性。

在这种情况下，没有明显的好处。但在某些情况下，getter 有助于在组件中提供更具表现力的语法。

### 无数据组件

有时，您想创建一个 Pvue 组件，但您不需要任何数据。

在这些情况下，您始终可以传入一个空对象。

```html

<div v-data="{}">
```

但是，如果您愿意，您也可以完全消除该属性值，如果它看起来更好的话。

```html

<div x-data>
```

### 单元素组件

有时您的 Pvue 组件中可能只有一个元素，如下所示：

```html

<div v-data="{ open: true }">
  <button @click="open = false" x-show="open">Hide Me</button>
</div>
```

在这些情况下，您可以 v-data 直接在该单个元素上声明：

```html

<button v-data="{ open: true }" @click="open = false" v-show="open">
  Hide Me
</button>
```

### 可重复使用的数据

如果您发现自己复制 x-data 的内容，或者发现内联语法冗长，您可以

```html

<script src="https://cdn.jsdelivr.net/gh/a112121788/pvue/dist/pvue.iife.js" init></script>

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

## v-away

监听元素之外的点击事件。这是一个常见的需求，并且手动实现它既烦人又复杂。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="./pvue.iife.js" defer init></script>
  <title>Document</title>
  <style>
  </style>
</head>
<body>
<div v-data="{ open: false }">
  <button @click="open=!open">Toggle</button>
  <span v-show="open" v-away:open="open=false">
        点击我之外的区域
      </span>
</div>
</body>
</html>
```

## v-bind

v-bind 允许您根据 JavaScript 表达式的结果为元素设置 HTML 属性。

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

## v-effect

v-effect 是一个指令，用于执行 pvue 中的内联反应式语句。在下面的代码片段中，count 变量是反应式的，所以每当计数发生变化时，v-effect
将重新运行，然后用 count 的当前值更新 div。

```html

<div v-data="{ count: 0 }" v-cloak>
  <div v-effect="$el.textContent = count"></div>
  <button @click="count++">++</button>
</div>
```

## v-for

```html

<div id="app">
  <button @click="add">add</button>
  <button @click="list.reverse()">reverse</button>
  <button @click="list.pop()">pop</button>
  <button @click="splice">splice</button>
  <ul>
    <li v-for="({ id, text }, index) in list" :key="id">
      <div>{{ index }} {{ { id, text } }}</div>
    </li>
  </ul>

  <ul>
    <li v-for="item of list" :key="item.id">
      <input v-model="item.text" />
    </li>
  </ul>
</div>

<script>
  let id = 4
  Pvue.createApp({
    list: [
      { id: 1, text: 'bar' },
      { id: 2, text: 'boo' },
      { id: 3, text: 'baz' },
      { id: 4, text: 'bazz' }
    ],
    add() {
      this.list.push({ id: ++id, text: 'new item' })
    },
    splice() {
      this.list.splice(1, 0, { id: ++id, text: 'new item' })
    }
  }).mount('#app')
</script>


```

## v-html

```html

<div v-data="{ ele:'<span>Hello World</span>' }">
  <p v-html="ele"></p>
</div>

<script>
  Pvue.createApp().mount()
</script>
```

## v-if

```html

<div id="app" v-data="{ open: true, elseOpen: true }">
  <button @click="open = !open">toggle</button>
  <button @click="elseOpen = !elseOpen">toggle else</button>
  <div v-if="open">ok</div>
  <div v-else-if="elseOpen">else if</div>
  <template v-else>else</template>
</div>

<script>
  Pvue.createApp().mount('#app')
</script>

```

## v-model

```html


<div
  id="app"
  v-data="{
  text: 'hello',
  checked: true,
  checkToggle: { a: 1 },
  trueValue: { a: 1 },
  falseValue: { a: 2 },
  arr: ['one'],
  radioSelected: 'two',
  selected: 'two'
}"
>
  <pre>{{ $data }}</pre>
  <h2>Text Input</h2>
  {{ text }}
  <input v-model.trim="text" />

  <h2>TextArea</h2>
  {{ text }}
  <textarea v-model.trim="text"></textarea>

  <h2>Text Input w/ lazy</h2>
  {{ text }}
  <input v-model.lazy="text" />

  <h2>Checkbox</h2>
  <input type="checkbox" id="checkbox" v-model="checked" />
  <label for="checkbox">{{ checked }}</label>

  <h2>Checkbox w/ Array</h2>
  <label><input type="checkbox" v-model="arr" value="one" /> one</label>
  <label><input type="checkbox" v-model="arr" value="two" /> two</label>
  <label
  ><input type="checkbox" v-model="arr" :value="123" /> actual number</label
  >
  <div>{{ arr }}</div>

  <h2>Checkbox w/ true-value / false-value</h2>
  <input
    type="checkbox"
    v-model="checkToggle"
    :true-value="trueValue"
    :false-value="falseValue"
  />
  <div>{{ checkToggle }}</div>

  <h2>Radio</h2>
  <label><input type="radio" v-model="radioSelected" value="one" /> one</label>
  <label><input type="radio" v-model="radioSelected" value="two" /> two</label>
  <label
  ><input type="radio" v-model="radioSelected" value="three" /> three</label
  >
  <div>{{ radioSelected }}</div>

  <h2>Select</h2>
  <select v-model="selected" @change="console.log(selected, $event.target.value)">
    <option>one</option>
    <option>two</option>
    <option>three</option>
  </select>
  <div>{{ selected }}</div>
</div>


<script>
  Pvue.createApp().mount("#app");
</script>
```

## v-on

绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句，如果没有修饰符也可以省略。

可参考： [https://v2.cn.vuejs.org/v2/api/#v-on](https://v2.cn.vuejs.org/v2/api/#v-on)

```html


<div id="app">
  <input
    type="text"
    @keyup.x="alert('yo')"
    placeholder="type x to test key modifier"
  />
  <form>
    <button type="submit" @click.prevent.stop>submit (prevented)</button>
  </form>
  <button @click.right="alert('clicked')">right click</button>
  <button @click.middle="alert('clicked')">middle click</button>
  <button @click.once="alert('clicked')">click once</button>
</div>

<script>
  Pvue.createApp().mount('#app')
</script>


```

## v-once

```html

<div v-data="{ count: 5 }">
  {{ count }}
  <div v-once>
    <h2>Once</h2>
    {{ count }}
    <span v-text="count"></span>
  </div>
  <button @click="count++">++</button>
</div>

<script>
  PVue.createApp().mount()
</script>
```

## v-pre

```html

<div v-data="{ count: 0 }">
  <p>{{ count }}</p>
  <p v-pre> {{ count }}</p>
  <button @click="count++">increment</button>
</div>

<script type="module">
  Pvue.createApp().mount()
</script>

```

## v-ref

```html


<div
  id="root"
  ref="root"
  v-data="{ dynamicRef: 'x', show: true }"
  v-effect="console.log({ x: $refs.x, y: $refs.y, input: $refs.input })"
>
  <p>Accessing root el: id is {{ $refs.root.id }}</p>

  <input ref="input" />
  <span v-if="show" :ref="dynamicRef">Span with dynamic ref</span>
  <p>dynamicRef is {{ dynamicRef }}</p>
  <button @click="dynamicRef = dynamicRef === 'x' ? 'y' : 'x'">
    change dynamicRef
  </button>
  <button @click="show = !show">toggle</button>

  <div v-data>
    <p ref="x">nested data ref</p>
    <button
      @click="console.log({ x: $refs.x, y: $refs.y, input: $refs.input })"
    >
      log nested data refs
    </button>
  </div>
</div>

```

## v-show

```html

<div id="app" v-data="{ open: true }">
  <button @click="open = !open">toggle</button>
  <div v-show="open">ok</div>
</div>

<script>
  Pvue.createApp().mount('#app')
</script>
```

## v-text

```html

<script>
  Pvue.createApp().mount()
</script>

<div v-data="{ count: 1 }">
  <p v-text="count"></p>
  <button @click="count++">increase</button>
</div>
```

## v-cloak

```html


<div v-data v-cloak>
  <div v-cloak v-if="!hide">{{ msg }}</div>
  <button @click="hide = !hide">toggle</button>
</div>

<style>
  [v-cloak] {
    display: none;
  }
</style>

<script>
  Pvue.createApp({
    msg: 'content',
    hide: false
  }).mount()
</script>
```
