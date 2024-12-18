import {
  fireEvent,
  getByTestId,
  queryByAttribute,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { ThemeProvider } from "styled-components";

import HomePage from "../pages/HomePage";
import theme from "../theme";
import axios from "axios";

jest.mock("axios", () => {
  return { post: jest.fn() };
});
const mockedAxios = axios as jest.Mocked<typeof axios>;

const getById = queryByAttribute.bind(null, "id");

describe("HomePage", () => {
  describe("Navbar", () => {
    test("renders navbar", () => {
      render(
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      );
      expect(screen.getByText("Broccoli & Co.")).toBeInTheDocument();
    });
  });

  describe("Footer", () => {
    test("renders footer", () => {
      render(
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      );
      expect(screen.getByText("Made with ♡ in Singapore")).toBeInTheDocument();
      expect(
        screen.getByText("© 2024 Broccoli & Co. All rights reserved.")
      ).toBeInTheDocument();
    });
  });

  describe("Content", () => {
    test("renders content", () => {
      render(
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      );

      expect(screen.getByText("Request an invite")).toBeInTheDocument();
    });

    test("invite button", () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      );

      fireEvent.click(getById(container, "requestInvite")!);
      expect(screen.getByText("Request an Invite")).toBeInTheDocument();
      expect(screen.getByText("Send")).toBeInTheDocument();
    });

    test("close invite button", () => {
      const { container } = render(
        <ThemeProvider theme={theme}>
          <HomePage />
        </ThemeProvider>
      );

      fireEvent.click(getById(container, "requestInvite")!);
      fireEvent.click(getById(container, "inviteFormCloseButton")!);
      expect(screen.queryByText("Send")).toBeNull();
    });

    describe("Form", () => {
      describe("show correct error message", () => {
        test("empty full name", () => {
          const { container, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);

          fireEvent.change(getByPlaceholderText("Full name"), {
            target: { value: "text" },
          });
          fireEvent.change(getByPlaceholderText("Full name"), {
            target: { value: "" },
          });
          expect(
            screen.queryByText("Full name is required")
          ).toBeInTheDocument();
        });

        test("empty email", () => {
          const { container, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);

          fireEvent.change(getByPlaceholderText("Email"), {
            target: { value: "text" },
          });
          fireEvent.change(getByPlaceholderText("Email"), {
            target: { value: "" },
          });
          expect(screen.queryByText("Email is required")).toBeInTheDocument();
        });

        test("empty confirmation email", () => {
          const { container, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);

          fireEvent.change(getByPlaceholderText("Confirm email"), {
            target: { value: "text" },
          });
          fireEvent.change(getByPlaceholderText("Confirm email"), {
            target: { value: "" },
          });
          expect(
            screen.queryByText("Confirmation email is required")
          ).toBeInTheDocument();
        });

        test("confirmation email not equal email", () => {
          const { container, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);

          fireEvent.change(getByPlaceholderText("Email"), {
            target: { value: "text" },
          });
          fireEvent.change(getByPlaceholderText("Confirm email"), {
            target: { value: "texts" },
          });
          expect(
            screen.queryByText("Confirmation email does not match email")
          ).toBeInTheDocument();
        });

        test("invalid email", () => {
          const { container, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);

          fireEvent.change(getByPlaceholderText("Email"), {
            target: { value: "text" },
          });
          expect(
            screen.queryByText("Email format is invalid")
          ).toBeInTheDocument();
        });

        test("empty form on submit", () => {
          const { container } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);
          fireEvent.click(getById(container, "submitInviteButton")!);
          expect(
            screen.queryByText("Full name is required")
          ).toBeInTheDocument();
          expect(screen.queryByText("Email is required")).toBeInTheDocument();
          expect(
            screen.queryByText("Confirmation email is required")
          ).toBeInTheDocument();
        });
      });

      describe("submit correctly", () => {
        test("submit on correct data format", async () => {
          mockedAxios.post.mockResolvedValueOnce({
            data: "Registered",
            status: 200,
          });

          const { container, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);

          fireEvent.change(getByPlaceholderText("Full name"), {
            target: { value: "test" },
          });
          fireEvent.change(getByPlaceholderText("Email"), {
            target: { value: "test@email.com" },
          });
          fireEvent.change(getByPlaceholderText("Confirm email"), {
            target: { value: "test@email.com" },
          });

          fireEvent.click(getById(container, "submitInviteButton")!);

          await waitFor(() => {
            expect(screen.queryByText("All done!")).toBeInTheDocument();
          });
        });

        test("submit on used email data format", async () => {
          const errorMsg = "Bad Request: Email is already in use";
          mockedAxios.post.mockResolvedValueOnce({
            data: { errorMessage: errorMsg },
            status: 400,
          });

          const { container, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);

          fireEvent.change(getByPlaceholderText("Full name"), {
            target: { value: "test" },
          });
          fireEvent.change(getByPlaceholderText("Email"), {
            target: { value: "usedemail@airwallex.com" },
          });
          fireEvent.change(getByPlaceholderText("Confirm email"), {
            target: { value: "usedemail@airwallex.com" },
          });

          fireEvent.click(getById(container, "submitInviteButton")!);

          await waitFor(() => {
            expect(screen.queryByText(errorMsg)).toBeInTheDocument();
          });
        });

        test("close on successful submission", async () => {
          mockedAxios.post.mockResolvedValueOnce({
            data: "Registered",
            status: 200,
          });

          const { container, getByPlaceholderText } = render(
            <ThemeProvider theme={theme}>
              <HomePage />
            </ThemeProvider>
          );

          fireEvent.click(getById(container, "requestInvite")!);

          fireEvent.change(getByPlaceholderText("Full name"), {
            target: { value: "test" },
          });
          fireEvent.change(getByPlaceholderText("Email"), {
            target: { value: "test@email.com" },
          });
          fireEvent.change(getByPlaceholderText("Confirm email"), {
            target: { value: "test@email.com" },
          });

          fireEvent.click(getById(container, "submitInviteButton")!);

          await waitFor(() => {
            fireEvent.click(getById(container, "closeModalButton")!);
            expect(screen.queryByText("All done!")).toBeNull();
          });
        });
      });
    });
  });
});
