export const registerNewUser = async ({ email, password, nickName }) => {
  const response = await fetch(`http://localhost:3000/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, nickName }),
  });

  console.log(response);
  const json = await response.json();
  console.log("registro correcto");

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await fetch(`http://localhost:3000/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json.data;
};
