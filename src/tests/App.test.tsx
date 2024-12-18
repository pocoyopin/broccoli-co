import { render } from "@testing-library/react";

import App from "../App";

jest.mock("axios", () => {
  return { post: jest.fn() };
});

test("renders without crashing", () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
