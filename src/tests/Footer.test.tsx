import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import renderer from "react-test-renderer";

import theme from "../theme";
import Footer from "../components/Footer";

jest.mock("axios", () => {
  return { post: jest.fn() };
});

describe("Footer", () => {
  test("renders footer", () => {
    const component = (
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    );

    renderer.create(component).toJSON();
    render(component);
    expect(screen.getByText("Made with ♡ in Singapore")).toBeInTheDocument();
    expect(
      screen.getByText("© 2024 Broccoli & Co. All rights reserved.")
    ).toBeInTheDocument();
    expect(component).toMatchSnapshot();
  });
});
