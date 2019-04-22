import Vue from 'vue';
import expect from 'expect';
import { mount } from '../src/vue';

// disable console logs
Vue.config.productionTip = false;
Vue.config.devtools = false;

const Example = {
  props: ['count', 'text'],

  beforeMount() {
    this.count.mount++;
  },

  beforeDestroy() {
    this.count.destroy++;
  },

  template: `
    <div id="vue-example">
      {{text}}
    </div>
  `
};

describe('Vue', () => {
  let count;

  beforeEach(() => {
    count = { mount: 0, destroy: 0 };
  });

  it('mounts the component in the DOM', async () => {
    expect(count).toEqual({ mount: 0, destroy: 0 });
    await mount(Example, { count, text: 'Hello World!' });
    expect(count).toEqual({ mount: 1, destroy: 0 });

    let $el = document.getElementById('vue-example');

    expect($el).toBeDefined();
    expect($el.parentNode.id).toBe('testing-root');
    expect($el.innerText).toBe('Hello World!');
  });

  it('destroys previously mounted components', async () => {
    expect(count).toEqual({ mount: 0, destroy: 0 });
    await mount(Example, { count, text: 'First' });
    expect(count).toEqual({ mount: 1, destroy: 0 });
    await mount(Example, { count, text: 'Second' });
    expect(count).toEqual({ mount: 2, destroy: 1 });

    let $el = document.getElementById('vue-example');

    expect($el).toBeDefined();
    expect($el.parentNode.id).toBe('testing-root');
    expect($el.innerText).toBe('Second');
  });

  it('can manually destroy components', async () => {
    expect(count).toEqual({ mount: 0, destroy: 0 });

    let destroy = await mount(Example, { count });
    expect(count).toEqual({ mount: 1, destroy: 0 });
    await expect(destroy()).resolves.toBeUndefined();
    expect(count).toEqual({ mount: 1, destroy: 1 });

    let $el = document.getElementById('vue-example');
    expect($el).toBeNull();
  });
});
