import { getUnixTime, isAfter } from "date-fns";
import type { JwtPayload } from "jsonwebtoken";

export interface decodedToken extends JwtPayload{
  name: string;
  exp: number;
  iat: number;
  sub: string;
}

export function checkJwt({name, exp, iat, sub }: decodedToken) {
  const todayUnix = getUnixTime(new Date());
  const isValid = isAfter(exp, todayUnix);
  
  if (isValid) {
    return true;
  } else {
    return false;
  }
}