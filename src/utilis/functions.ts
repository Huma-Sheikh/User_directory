import { User } from "../type";
import FallbackImage from "../assets/Image_not_available.png";

export const truncate = (text: string, maxLength: number): string => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

export const getSafeAvatar = (url?: string): string => {
  return url && url.trim() !== "" ? url : FallbackImage;
};

export const handleSearchInputChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  callback: (value: string) => void
) => {
  const value = event.target.value;
  callback(value);
};

export const filterUsersByRole = (
  users: User[],
  searchTerm: string
): User[] => {
  const trimmed = searchTerm.trim();

  // 1. Empty search = return all
  if (!trimmed) return users;

  // 2. Reject if it's a paragraph (3 or more words)
  const wordCount = trimmed.split(/\s+/).length;
  if (wordCount >= 3) return [];

  // 3. Reject if contains mostly special characters/numbers
  const isInvalid = !/^[a-zA-Z\s]+$/.test(trimmed);
  if (isInvalid) return [];

  // 4. Filter normally by role
  const regex = new RegExp(trimmed, "i");
  return users.filter((user) => regex.test(user.role?.toString() || ""));
};
