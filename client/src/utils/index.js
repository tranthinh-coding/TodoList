export function lazyViews(path) {
  return () => import(`@/views/${path}`);
}