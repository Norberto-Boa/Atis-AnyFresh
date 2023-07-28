export function getToken() {
  const bearerToken = localStorage.getItem("token")

  return bearerToken;
}