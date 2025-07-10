import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserModal from "../components/UserModal";
import { User } from "../type";

const mockUser: User = {
  id: "1",
  firstname: "Huma",
  lastname: "Shafique",
  username:'hey',
  role: "Admin",
  description: "A passionate developer.",
  join_date: "2024-01-01",
  avatar: "",
  email: "huma@example.com",
};

describe("UserModal Component", () => {
  test("does not render when isOpen is false", () => {
    const { container } = render(
      <UserModal user={mockUser} isOpen={false} onClose={jest.fn()} />
    );
    expect(container.firstChild).toBeNull();
  });

  test("renders correctly when isOpen is true", () => {
    render(<UserModal user={mockUser} isOpen={true} onClose={jest.fn()} />);
    
    expect(screen.getByText("Huma Shafique")).toBeInTheDocument();
    expect(screen.getByText(/📅 Joined 2024-01-01/i)).toBeInTheDocument();
    expect(screen.getByText(/A passionate developer./i)).toBeInTheDocument();
    expect(screen.getByText(/📧 huma@example.com/i)).toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<UserModal user={mockUser} isOpen={true} onClose={onCloseMock} />);
    
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test("renders fallback avatar when user avatar is missing", () => {
    render(<UserModal user={mockUser} isOpen={true} onClose={jest.fn()} />);
    
    const img = screen.getByAltText("Avatar") as HTMLImageElement;
    expect(img.src).toContain("test-file-stub");
  });

 test("handles missing description gracefully", () => {
  const userWithoutDesc = { ...mockUser, description: "" };
  render(<UserModal user={userWithoutDesc} isOpen={true} onClose={jest.fn()} />);
  
  const desc = screen.getByTestId("user-description");
  expect(desc).toBeInTheDocument();
  expect(desc.textContent).toBe("");
});
});
