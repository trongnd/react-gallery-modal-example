export function getWindowSize() {
  const windowWidth = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  const windowHeight = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  return { windowWidth, windowHeight };
}
