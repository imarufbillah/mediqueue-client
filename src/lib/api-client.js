const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const listTutor = async (tutorData) => {
  const res = await fetch(`${API_BASE_URL}/tutors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tutorData),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to list tutor");
  }

  return res.json();
};
