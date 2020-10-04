export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.accessToken) {
    return {"access-token": user.accessToken, "uid": user.uid, "client": user.client};
  } else {
    return {};
  }
}
