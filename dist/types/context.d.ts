import { effect as rawEffect, ReactiveEffectRunner } from '@vue/reactivity';
import { Block } from './block';
import { Directive } from './directives';
export interface Context {
    key?: any;
    data: Record<string, any>;
    dirs: Record<string, Directive>;
    blocks: Block[];
    effect: typeof rawEffect;
    effects: ReactiveEffectRunner[];
    cleanups: (() => void)[];
    delimiters: [string, string];
    delimitersRE: RegExp;
}
export declare const createContext: (parent?: Context | undefined) => Context;
export declare const createdDataContext: (ctx: Context, data?: {}) => Context;
export declare const bindContextMethods: (data: Record<string, any>) => void;
