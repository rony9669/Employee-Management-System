const BASE_URL = "http://localhost:3000";

//return all users
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  const json = await response.json();

  return json;
};

//single user
export const getUser = async (userId) => {
  const response = await fetch(`${BASE_URL}/api/users/${userId}`); //!bhul
  const json = await response.json();

  if (json) return json;
  return {};
};

//posting a new user
export async function addUser(formDta) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formDta),
    };
    const response = await fetch(`${BASE_URL}/api/users`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

//update a user
export async function updateUser(userId, formDta) {
  try {
    const Options = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(formDta),
    };
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}

//DELETE a  user
export async function deleteUser(userId) {
  try {
    const Options = {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    };
    const response = await fetch(`${BASE_URL}/api/users/${userId}`, Options);
    const json = await response.json();
    return json;
  } catch (error) {
    return error;
  }
}
