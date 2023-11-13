import { GetServerSidePropsContext } from "next";
import { destroyCookie, parseCookies } from "nookies";

function AuthOnServerSide(ctx: GetServerSidePropsContext) {
  const { ['atis.token']: token } = parseCookies(ctx);

  if (!token) {
    destroyCookie(ctx, token);
    return false
  }

  return true;
}

export { AuthOnServerSide };