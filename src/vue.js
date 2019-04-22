import Vue from 'vue';
import { createTestingHook } from './index';

export const mount = createTestingHook((
  Component,
  propsData = {}
) => {
  let root = document.createElement('div');
  root.innerHTML = '<div></div>';
  root.id = 'testing-root';

  let vm = new Vue({
    extends: Component,
    propsData
  });

  document.body.appendChild(root);
  vm.$mount(root.firstChild);

  return () => {
    document.body.removeChild(root);
    vm.$destroy();
  };
});
