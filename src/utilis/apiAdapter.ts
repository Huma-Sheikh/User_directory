// utils/apiAdapter.ts

import { User } from "../type";

// Raw API data (assume avatar field is now avatar_url and join_date => to_join_date)
export const normalizeUser = (raw: any): User => ({
  id: raw.id,
  username: raw.username,
  firstname: raw.firstname,
  lastname: raw.lastname,
  email: raw.email,
  avatar: raw.avatar_url || raw.avatar || "", // handle fallback key
  role: raw.role,
  join_date: raw.to_join_date || raw.join_date || "",
  description: raw.description,
});
