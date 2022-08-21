const evalCache: Record<string, Function> = Object.create(null)

export const evaluate = (data: any, exp: string, el?: Node) =>
  execute(data, `return(${exp})`, el)

export const execute = (data: any, exp: string, el?: Node) => {
  const fn = evalCache[exp] || (evalCache[exp] = toFunction(exp))
  try {
    return fn(data, el)
  } catch (e) {
    if (import.meta.env.DEV) {
      console.warn(`Error when evaluating expression "${exp}":`)
    }
    console.error(e)
  }
}

const toFunction = (exp: string): Function => {
  try {
    return new Function(`$data`, `$el`, `with($data){${exp}}`)
  } catch (e) {
    console.error(`${(e as Error).message} in expression: ${exp}`)
    return () => {}
  }
}
