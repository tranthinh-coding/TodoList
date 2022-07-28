export function lazyViews(path) {
  return () => import(`@/views/${path}`);
}

export function module(path) {
  return () => import(`@/${path}`);
}
