import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import axios from "axios";

jest.mock("axios", () => ({
  __esModules: true,
  default: {
    get: () => ({
      data: { id: 1, name: "kedar" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl).toBeInTheDocument();
});
test("password input should be rendered", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl).toBeInTheDocument();
});
test("button input should be rendered", () => {
  render(<Login />);
  const buttonInputEl = screen.getByRole("button");
  expect(buttonInputEl).toBeInTheDocument();
});
test("username input should be empty", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  expect(userInputEl.value).toBe("");
});
test("password input should be empty", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  expect(passwordInputEl.value).toBe("");
});

test("button should be disabled", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("error msg should be invisible", () => {
  render(<Login />);
  const errElement = screen.getByTestId("error");
  expect(errElement).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  expect(userInputEl.value).toBe(testValue);
});
test("password input should change", () => {
  render(<Login />);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "test";
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("button should not be disabled when input exists", () => {
  render(<Login />);
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";
  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });

  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toBeDisabled();
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

// test("loading should be rendered when clicked", () => {
//   render(<Login />);
//   const buttonEl = screen.getByRole("button");
//   const userInputEl = screen.getByPlaceholderText(/username/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(userInputEl, { target: { value: testValue } });
//   fireEvent.change(passwordInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   expect(buttonEl).toHaveTextContent(/please wait/i);
// });

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

// test("user should be rendered after fetching", async () => {
//   render(<Login />);
//   const buttonEl = screen.getByRole("button");
//   const userInputEl = screen.getByPlaceholderText(/username/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(userInputEl, { target: { value: testValue } });
//   fireEvent.change(passwordInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("kedar");

//   expect(userItem).toBeInTheDocument();
// });
