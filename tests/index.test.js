import expect from 'expect';
import { createTestingHook } from '../src/index';

describe('createTestingHook', () => {
  let count, hook;

  beforeEach(() => {
    count = { setup: 0, teardown: 0 };

    hook = createTestingHook(() => {
      count.setup++;
      return () => count.teardown++;
    });
  });

  it('only runs setup on the first run', async () => {
    expect(count).toEqual({ setup: 0, teardown: 0 });
    await expect(hook()).resolves.toEqual(expect.any(Function));
    expect(count).toEqual({ setup: 1, teardown: 0 });
  });

  it('runs teardown before subsequent setups', async () => {
    expect(count).toEqual({ setup: 0, teardown: 0 });
    await expect(hook()).resolves.toEqual(expect.any(Function));
    expect(count).toEqual({ setup: 1, teardown: 0 });
    await expect(hook()).resolves.toEqual(expect.any(Function));
    expect(count).toEqual({ setup: 2, teardown: 1 });
  });

  it('can manually call teardown', async () => {
    expect(count).toEqual({ setup: 0, teardown: 0 });

    let teardown = await hook();
    expect(count).toEqual({ setup: 1, teardown: 0 });
    await expect(teardown()).resolves.toBeUndefined();
    expect(count).toEqual({ setup: 1, teardown: 1 });

    await expect(hook()).resolves.toEqual(expect.any(Function));
    expect(count).toEqual({ setup: 2, teardown: 1 });
  });
});
