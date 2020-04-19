export default {
  bind(el, binding, vNode) {
    // eslint-disable-next-line no-param-reassign
    el.__vueClickOutside__ = (event) => {
      if (!el.contains(event.target)) {
        // call method provided in v-click-outside value
        vNode.context[binding.expression](event);
        event.stopPropagation();
      }
    };
    document.body.addEventListener('click', el.__vueClickOutside__);
  },
  unbind(el) {
    // Remove Event Listeners
    document.removeEventListener('click', el.__vueClickOutside__);
    // eslint-disable-next-line no-param-reassign
    el.__vueClickOutside__ = null;
  },
};
