import { render, unmountComponentAtNode } from 'react-dom';
import { createTestingHook } from './index';

export const mount = createTestingHook(async component => {
  let root = document.createElement('div');
  root.id = 'testing-root';

  await new Promise(resolve => {
    document.body.appendChild(root);
    render(component, root, resolve);
  });

  return () => {
    unmountComponentAtNode(root);
    document.body.removeChild(root);
  };
});
