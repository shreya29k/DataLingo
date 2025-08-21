const BASE_URL = "http://localhost:8088/api/files";

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return await response.json();
};

export const getAllFiles = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  if (!response.ok) throw new Error("Failed to fetch files");
  return await response.json();
};

export const deleteFile = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete file");
  return await response.text();
};