
import { render, screen, fireEvent } from "@testing-library/react";
import UserCard from "../components/UserCard";
import { STRINGS } from "../utilis/string";
import { User } from "../type";

const mockUser: User = {
  id: "1",
  firstname: "Huma",
  lastname: "Shafique",
  username:"hey",
  role: "Admin",
  description: "A very long description that should be truncated after 70 characters for proper display.",
  join_date: "2024-01-01",
  avatar: "", 
  email: "huma@example.com",
};
describe("UserCard Component", () => {
  test("renders user's full name correctly", () => {
    render(<UserCard user={mockUser} onViewMore={jest.fn()} />);
    expect(screen.getByText("Huma Shafique")).toBeInTheDocument();
  });

  test("renders user's role and join date", () => {
    render(<UserCard user={mockUser} onViewMore={jest.fn()} />);
    expect(screen.getByText("Admin")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
  });

  test("renders truncated description", () => {
    render(<UserCard user={mockUser} onViewMore={jest.fn()} />);
    const truncated = mockUser.description.slice(0, 70) + "...";
    expect(screen.getByText(truncated)).toBeInTheDocument();
  });

  test("sets full description as title on truncated text", () => {
    render(<UserCard user={mockUser} onViewMore={jest.fn()} />);
    const descriptionEl = screen.getByTitle(mockUser.description);
    expect(descriptionEl).toBeInTheDocument();
  });

  test("renders fallback image when avatar is missing", () => {
    render(<UserCard user={mockUser} onViewMore={jest.fn()} />);
    const img = screen.getByAltText("Avatar") as HTMLImageElement;
    expect(img.src).toContain("test-file-stub");
  });

  test("renders actual avatar if provided", () => {
    const updatedUser = { ...mockUser, avatar: "https://example.com/avatar.png" };
    render(<UserCard user={updatedUser} onViewMore={jest.fn()} />);
    const img = screen.getByAltText("Avatar") as HTMLImageElement;
    expect(img.src).toBe(updatedUser.avatar);
  });

  test("calls onViewMore on button click", () => {
    const onViewMoreMock = jest.fn();
    render(<UserCard user={mockUser} onViewMore={onViewMoreMock} />);
    const btn = screen.getByText(STRINGS.VIEW_MORE);
    fireEvent.click(btn);
    expect(onViewMoreMock).toHaveBeenCalledWith(mockUser);
  });

  test("handles missing description gracefully", () => {
  const updatedUser = { ...mockUser, description: "" };
  render(<UserCard user={updatedUser} onViewMore={jest.fn()} />);

  const desc = screen.getByTitle("");
  expect(desc).toBeInTheDocument();
});

});
