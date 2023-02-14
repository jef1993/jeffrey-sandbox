const pageEnterAnimate = {
  opacity: 0,
  scale: 0.2,
  transformOrigin: "bottom",
  y: 100,
};
const pageInAnimate = {
  opacity: 1,
  scale: 1,
  transformOrigin: "center",
  y: 0,
};

const pageExitAnimate = {
  opacity: 0,
  scale: 0.2,
  transformOrigin: "top",
  y: -100,
};

export const pageAnimate = {
  initial: pageEnterAnimate,
  animate: pageInAnimate,
  exit: pageExitAnimate,
};
