export const addClass = (el: any, className: string) => {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
};

export const removeClass = (el: any, className: string) => {
  el.classList.remove(className);
};
