import { authClient } from "./auth-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const jwtToken = async () => {
  const { data, error } = await authClient.token();

  if (error) {
    return null;
  }

  if (data) {
    return data.token;
  }
};

// List a tutor
export const listTutor = async (tutorData) => {
  const res = await fetch(`${API_BASE_URL}/tutors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await jwtToken()}`,
    },
    body: JSON.stringify(tutorData),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to list tutor");
  }

  return res.json();
};

// Update a tutor
export const updateTutor = async (id, tutorData) => {
  const res = await fetch(`${API_BASE_URL}/my-tutors/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await jwtToken()}`,
    },
    body: JSON.stringify(tutorData),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to update tutor");
  }

  return res.json();
};

// Delete a tutor
export const deleteTutor = async (id) => {
  const res = await fetch(`${API_BASE_URL}/my-tutors/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${await jwtToken()}`,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to delete tutor");
  }

  return res.json();
};

// Book a tutor
export const newBooking = async (bookingData) => {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await jwtToken()}`,
    },
    body: JSON.stringify(bookingData),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to book tutor");
  }

  return res.json();
};

export const cancelBooking = async (id, tutorId) => {
  const res = await fetch(`${API_BASE_URL}/my-bookings/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await jwtToken()}`,
    },
    body: JSON.stringify({ tutorId: tutorId }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to cancel booking");
  }

  return res.json();
};
