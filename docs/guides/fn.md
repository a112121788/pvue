# 全局函数


## 全局函数

### Pvue.createApp

createApp 函数接受一个对象参数，是所有表达式的根作用域。



```html

```

### Pvue.nextTick

```html

```

### Pvue.reactive

即：@vue/reactivity

```html

```

### Pvue.version

```html

```

## Pvue.createApp() 对象方法

### mount

处理el参数，找到应用挂载的根DOM节点，然后执行初始化流程

具体过程：

1. 首先判断传入的el是不是string类型，如果是直接通过document.querySelector去取；否则，就会取document.documentElement
2. 初始化roots【节点数组】

### directive

注册自定义指令。实际上是向ctx的dirs添加一个属性，当调用applyDirective时，就可以得到对应的处理函数。


### use

### unmount

销毁的过程，基于每个block实例化调用teardown方法进行销毁

