const breakpoints = ["450px", "600px", "800px", "1200px"];

const colors = {
  black: "#000000",
  black10: "rgba(0,0,0,0.1)",
  black50: "rgba(0,0,0,0.5)",
  black70: "rgba(0,0,0,0.7)",
  black90: "rgba(0,0,0,0.9)",
  white: "#ffffff",
  red: "#ff0000",
};

const fontWeights = {
  light: 300,
  normal: 400,
  medium: 500,
  lightBold: 600,
  bold: 700,
};

const fontSizes = {
  small: "0.8rem",
  subtext: "1rem",
  paragraph: "1.2rem",
  h6: "1.35rem",
  h5: "1.5rem",
  h4: "1.8rem",
  h3: "2.4rem",
  h2: "3.2rem",
  h1: "4.8rem",
};

const spacing = {
  a: 0,
  b: 4,
  c: 8,
  d: 16,
  e: 24,
  f: 32,
};

const theme = {
  breakpoints,
  mediaQueries: {
    sm: `@media screen and (min-width: ${breakpoints[0]})`,
    md: `@media screen and (min-width: ${breakpoints[1]})`,
    lg: `@media screen and (min-width: ${breakpoints[2]})`,
    xl: `@media screen and (min-width: ${breakpoints[3]})`,
  },
  colors,
  fontWeights,
  fontSizes,
  spacing,
};

export default theme;
