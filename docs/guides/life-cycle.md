# 生命周期事件

您可以监听每个元素的特殊事件 vue:mounted 和 vue:unmounted。

## mounted 和 unmounted

### 示例 1

```html

<div
  v-if="show"
  @vue:mounted="console.log('mounted on: ', $el)"
  @vue:unmounted="console.log('unmounted: ', $el)"
></div>
```

### 示例 2

```html
<!-- v-data value can be omitted -->
<div v-data>
  <p>{{ count }}</p>
  <p @vue:mounted="mounted($el)" @vue:unmounted="unmounted($el)">{{ plusOne }}
    mouse over</p>
  <button @click="increment">increment</button>
</div>

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
    },

    mounted(el) {
      console.log(el)
      el.addEventListener('mouseover', function() {
        console.log('mouseover');
      })
      el.addEventListener('mouseleave', function() {
        console.log('mouseleave');
      })
    },

    unmounted(el) {
      // remove listners here
    }
  }).mount()
</script>

```
