import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import renderer from "react-test-renderer";

import theme from "../theme";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  test("renders navbar", () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Navbar />
      </ThemeProvider>
    );

    renderer.create(component).toJSON();
    render(component);

    expect(screen.getByText("Broccoli & Co.")).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
