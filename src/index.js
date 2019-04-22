export function createTestingHook(up) {
  // local user teardown
  let down = null;

  // after setup, set local user teardown
  let setup = async args => {
    let ret = await up(...args);

    if (typeof ret === 'function') {
      down = ret;
    }
  };

  // calls and resets local user teardown
  let teardown = async () => {
    if (down) await down();
    down = null;
  };

  // auto-teardown before setup
  return async (...args) => {
    await teardown();
    await setup(args);

    // return for manual teardown
    return teardown;
  };
}
