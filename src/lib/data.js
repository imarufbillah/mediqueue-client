import { auth } from "./auth";
import { headers } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const jwtToken = async () => {
  const tokenResponse = await auth.api.getToken({
    headers: await headers(),
  });

  return tokenResponse.token;
};

// Get all tutors
export const getTutors = async () => {
  const res = await fetch(`${API_BASE_URL}/tutors`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get tutors");
  }

  return res.json();
};

// Get tutor by id
export const getTutorById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/tutors/${id}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get tutor");
  }

  return res.json();
};

// Get limited tutors
export const getLimitedTutors = async (limit = 6) => {
  const res = await fetch(`${API_BASE_URL}/tutors?limit=${limit}`);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get tutors");
  }

  return res.json();
};

export const getTutorsByCurrentUser = async () => {
  const res = await fetch(`${API_BASE_URL}/my-tutors`, {
    headers: {
      Authorization: `Bearer ${await jwtToken()}`,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to get tutors");
  }

  return res.json();
};
