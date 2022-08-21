import {
  effect as rawEffect,
  reactive,
  ReactiveEffectRunner
} from '@vue/reactivity'
import { Block } from './block'
import { Directive } from './directives'
import { queueJob } from './scheduler'
import { inOnce } from './walk'
export interface Context {
  key?: any
  data: Record<string, any>
  dirs: Record<string, Directive>
  blocks: Block[]
  effect: typeof rawEffect
  effects: ReactiveEffectRunner[]
  cleanups: (() => void)[]
  delimiters: [string, string]
  delimitersRE: RegExp
}

export const createContext = (parent?: Context): Context => {
  const ctx: Context = {
    delimiters: ['{{', '}}'],
    delimitersRE: /\{\{([^]+?)\}\}/g,
    ...parent,
    data: parent ? parent.data : reactive({}),
    dirs: parent ? parent.dirs : {},
    effects: [],
    blocks: [],
    cleanups: [],
    effect: (fn) => {
      if (inOnce) {
        queueJob(fn)
        return fn as any
      }
      const e: ReactiveEffectRunner = rawEffect(fn, {
        scheduler: () => queueJob(e)
      })
      ctx.effects.push(e)
      return e
    }
  }
  return ctx
}

export const createdDataContext = (ctx: Context, data = {}): Context => {
  const parentdata = ctx.data
  const mergeddata = Object.create(parentdata)
  Object.defineProperties(mergeddata, Object.getOwnPropertyDescriptors(data))
  mergeddata.$refs = Object.create(parentdata.$refs)
  const reactiveProxy = reactive(
    new Proxy(mergeddata, {
      set(target, key, val, receiver) {
        // when setting a property that doesn't exist on current data,
        // do not create it on the current data and fallback to parent data.
        if (receiver === reactiveProxy && !target.hasOwnProperty(key)) {
          return Reflect.set(parentdata, key, val)
        }
        return Reflect.set(target, key, val, receiver)
      }
    })
  )

  bindContextMethods(reactiveProxy)
  return {
    ...ctx,
    data: reactiveProxy
  }
}

export const bindContextMethods = (data: Record<string, any>) => {
  for (const key of Object.keys(data)) {
    if (typeof data[key] === 'function') {
      data[key] = data[key].bind(data)
    }
  }
}
