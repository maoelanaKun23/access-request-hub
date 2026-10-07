export function pxToVw(px: number, windowWidth?: number) {
  return `${(px / (windowWidth ?? window.innerWidth)) * 100}vw`
}
export function pxToVh(px: number, windowHeight?: number) {
  return `${(px / (windowHeight ?? window.innerHeight)) * 100}vh`
}
