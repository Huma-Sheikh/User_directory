import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "../components/NavBar";
import { STRINGS } from "../utilis/string";

describe("NavBar Component", () => {
  test("renders navbar when modal is not open", () => {
    render(<NavBar isModalOpen={false} onSearchChange={jest.fn()} />);
    expect(screen.getByText(STRINGS.APP_TITLE)).toBeInTheDocument();
  });

  test("does not render navbar when modal is open", () => {
    const { container } = render(<NavBar isModalOpen={true} onSearchChange={jest.fn()} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders input with correct placeholder", () => {
    render(<NavBar isModalOpen={false} onSearchChange={jest.fn()} />);
    const input = screen.getByPlaceholderText(STRINGS.SEARCH_PLACEHOLDER);
    expect(input).toBeInTheDocument();
  });

  test("calls onSearchChange when input value changes", () => {
    const mockSearch = jest.fn();
    render(<NavBar isModalOpen={false} onSearchChange={mockSearch} />);
    const input = screen.getByPlaceholderText(STRINGS.SEARCH_PLACEHOLDER);
    fireEvent.change(input, { target: { value: "admin" } });

    // Since you're using a centralized `handleSearchInputChange`,
    // which directly calls `onSearchChange`, this should be triggered
    expect(mockSearch).toHaveBeenCalledWith("admin");
  });
});
