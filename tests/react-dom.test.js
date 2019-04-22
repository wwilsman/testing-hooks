import React, { Component } from 'react';
import expect from 'expect';
import { mount } from '../src/react-dom';

class Example extends Component {
  componentDidMount() {
    this.props.count.mount++;
  }

  componentWillUnmount() {
    this.props.count.unmount++;
  }

  render() {
    return (
      <div id="react-dom-example">
        {this.props.text}
      </div>
    );
  }
}

describe('React DOM', () => {
  let count;

  beforeEach(() => {
    count = { mount: 0, unmount: 0 };
  });

  it('mounts the component in the DOM', async () => {
    expect(count).toEqual({ mount: 0, unmount: 0 });
    await mount(<Example count={count} text="Hello World!"/>);
    expect(count).toEqual({ mount: 1, unmount: 0 });

    let $el = document.getElementById('react-dom-example');

    expect($el).toBeDefined();
    expect($el.parentNode.id).toBe('testing-root');
    expect($el.innerText).toBe('Hello World!');
  });

  it('unmounts previously mounted components', async () => {
    expect(count).toEqual({ mount: 0, unmount: 0 });
    await mount(<Example count={count} text="First"/>);
    expect(count).toEqual({ mount: 1, unmount: 0 });
    await mount(<Example count={count} text="Second"/>);
    expect(count).toEqual({ mount: 2, unmount: 1 });

    let $el = document.getElementById('react-dom-example');

    expect($el).toBeDefined();
    expect($el.parentNode.id).toBe('testing-root');
    expect($el.innerText).toBe('Second');
  });

  it('can manually unmount components', async () => {
    expect(count).toEqual({ mount: 0, unmount: 0 });

    let unmount = await mount(<Example count={count}/>);
    expect(count).toEqual({ mount: 1, unmount: 0 });
    await expect(unmount()).resolves.toBeUndefined();
    expect(count).toEqual({ mount: 1, unmount: 1 });

    let $el = document.getElementById('react-dom-example');
    expect($el).toBeNull();
  });
});
