export const registerNewUser = async ({ email, password, nickName }) => {
  const response = await fetch(`http://localhost:3000/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, nickName }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`http://localhost:3000/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.token;
};

export const getMyUserDataService = async ({ token }) => {
  const response = await fetch(`http://localhost:3000/user`, {
    headers: {
      Authorization: token,
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.user;
};
