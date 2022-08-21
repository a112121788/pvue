import { Directive } from "./directives";
export declare const createApp: (initialData?: any) => {
    directive(name: string, def?: Directive<Element> | undefined): Directive<Element> | any;
    use(plugin: any, options?: {}): any;
    mount(el?: string | Element | null | undefined): any | undefined;
    unmount(): void;
};
