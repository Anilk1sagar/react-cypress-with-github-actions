import axios from "axios";

export const fetchUsers = async () => {
  const response = await axios.get<any[]>("/api/users");

  return response.data;
};
