export function getToken() {
  
  if (typeof window === "undefined") {
    return null
  }
  
  const bearerToken = localStorage.getItem("token")
  const token = bearerToken?.split(' ');

  if (!token) {
    return null
  }

  return token[1];
}