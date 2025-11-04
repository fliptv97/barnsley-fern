export function debounce(fn, delayMs = 300) {
  let timeoutId;

  return function (...args) {
    const ctx = this;

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      fn.apply(ctx, args);
    }, delayMs);
  };
}
