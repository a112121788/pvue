import { reactive } from "@vue/reactivity";
import { Block } from "./block";
import { Directive } from "./directives";
import { bindContextMethods, createContext } from "./context";
import { toDisplayString } from "./directives/text";
import { nextTick } from "./scheduler";

const escapeRegex = (str: string) =>
  str.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&");

export const createApp = (initialData?: any) => {
  // root context
  const ctx = createContext();
  if (initialData) {
    ctx.data = reactive(initialData);
    bindContextMethods(ctx.data);

    // handle custom delimiters
    if (initialData.$delimiters) {
      const [open, close] = (ctx.delimiters = initialData.$delimiters);
      ctx.delimitersRE = new RegExp(
        escapeRegex(open) + "([^]+?)" + escapeRegex(close),
        "g"
      );
    }
  }

  // global internal helpers
  ctx.data.$s = toDisplayString;
  ctx.data.$nextTick = nextTick;
  ctx.data.$refs = Object.create(null);

  let rootBlocks: Block[];

  return {
    directive(name: string, def?: Directive) {
      if (def) {
        ctx.dirs[name] = def;
        return this;
      } else {
        return ctx.dirs[name];
      }
    },

    use(plugin: any, options = {}) {
      plugin.install(this, options);
      return this;
    },

    mount(el?: string | Element | null) {
      if (typeof el === "string") {
        el = document.querySelector(el);
        if (!el) {
          import.meta.env.DEV &&
          console.error(`selector ${el} has no matching element.`);
          return;
        }
      }

      el = el || document.documentElement;
      let roots: Element[];
      if (el.hasAttribute("v-data")) {
        roots = [el];
      } else {
        roots = [...el.querySelectorAll(`[v-data]`)].filter(
          (root) => !root.matches(`[v-data] [v-data]`)
        );
      }
      if (!roots.length) {
        roots = [el];
      }

      if (
        import.meta.env.DEV &&
        roots.length === 1 &&
        roots[0] === document.documentElement
      ) {
        console.warn(
          `Mounting on documentElement - this is non-optimal as pvue ` +
          `will be forced to crawl the entire page's DOM. ` +
          `Consider explicitly marking elements controlled by pvue ` +
          `with \`v-data\`.`
        );
      }

      rootBlocks = roots.map((el) => new Block(el, ctx, true));
      return this;
    },

    unmount() {
      rootBlocks.forEach((block) => block.teardown());
    }
  };
};
