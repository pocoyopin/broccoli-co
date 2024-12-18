import React from "react";
import { ThemeProvider } from "styled-components";

import HomePage from "./pages/HomePage";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  );
}

export default App;
