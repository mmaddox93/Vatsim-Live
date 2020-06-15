import { VNodeDirective } from 'vue';

interface ClickOutsideBindingArgs {
  handler: (e: Event) => void
}

interface ClickOutsideDirective extends VNodeDirective {
  value?: ((e: Event) => void) | ClickOutsideBindingArgs
}

const clickHandler = (event: Event, el: HTMLElement, binding: ClickOutsideDirective) => {
  if (!event.composedPath().includes(el)) {
    const handler = typeof binding.value === 'function' ? binding.value : binding.value!.handler;
    handler(event);
    event.stopPropagation();
  }
};

const clickOutside = {
  bind(el: HTMLElement, binding: ClickOutsideDirective) {
    document.body.addEventListener('click', (event) => clickHandler(event, el, binding));
  },
  unbind(el: HTMLElement, binding: ClickOutsideDirective) {
    document.body.removeEventListener('click', (event) => clickHandler(event, el, binding));
  },
};

export default clickOutside;
