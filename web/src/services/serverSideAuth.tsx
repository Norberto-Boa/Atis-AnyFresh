import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

function AuthOnServerSide(ctx: GetServerSidePropsContext) {
  const { ['atis.token']: token } = parseCookies(ctx);

  if (!token) {
    return false
  }

  return true;
}

export { AuthOnServerSide };