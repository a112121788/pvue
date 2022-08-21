import { Directive } from ".";

export const away: Directive<HTMLElement> = ({ el, get, exp, arg }) => {
  let isopen = false;
  let listener = (event: any) => {
    if (get(arg) && !isopen) {
      isopen = true;
      return;
    }
    if (!el.contains(event.target)) {
      if (get(arg))
        get(exp);
      isopen = false;
    }
  };
  document.addEventListener("click", listener);
  return () => {
    document.removeEventListener("click", listener);
  };
};

