# 生命周期事件

您可以监听每个元素的特殊事件 vue:mounted 和 vue:unmounted。


## mounted 和 unmounted

```html
<div
  v-if="show"
  @vue:mounted="console.log('mounted on: ', $el)"
  @vue:unmounted="console.log('unmounted: ', $el)"
></div>
```
