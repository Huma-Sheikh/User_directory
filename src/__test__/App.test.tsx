import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

// Helper for delaying mock fetch
const wait = (ms = 0) => new Promise((res) => setTimeout(res, ms));

jest.mock("axios", () => ({
  get: () =>
    Promise.resolve({
      data: {
        data: {
          users: [
            {
              id: 1,
              firstname: "Huma",
              lastname: "Shafique",
              role: "admin",
              email: "huma@example.com",
              join_date: "2023-01-01",
              avatar: "",
              description: "Queen of code",
            },
            {
              id: 2,
              firstname: "Zain",
              lastname: "ok",
              role: "designer",
              email: "zain@example.com",
              join_date: "2022-01-01",
              avatar: "",
              description: "Master of CSS",
            },
          ],
        },
      },
    }),
}));

describe("App Component", () => {
  test("shows loader initially", async () => {
    render(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    await wait(100); // Let data load
  });

  test("renders user cards after data loads", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("Huma Shafique")).toBeInTheDocument();
      expect(screen.getByText("Zain ok")).toBeInTheDocument();
    });
  });

  test("filters users based on search input", async () => {
    render(<App />);
    await wait(100);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "admin" } });

    expect(screen.queryByText("Zain ok")).not.toBeInTheDocument();
    expect(screen.queryByText("Huma Shafique")).toBeInTheDocument();
  });

  test("shows no users found when search yields nothing", async () => {
    render(<App />);
    await wait(100);

    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "developer" } });

    expect(screen.getByText(/no users found/i)).toBeInTheDocument();
  });

  test("opens and closes modal on button click", async () => {
    render(<App />);
    await wait(100);

    const button = screen.getAllByText(/view more/i)[0];
    fireEvent.click(button);

    expect(screen.getByText(/description/i)).toBeInTheDocument();

    const close = screen.getByText("×");
    fireEvent.click(close);

    await waitFor(() =>
      expect(screen.queryByText(/description/i)).not.toBeInTheDocument()
    );
  });
});
