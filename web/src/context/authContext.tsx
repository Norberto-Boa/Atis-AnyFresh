import {
  ReactElement,
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { IUserLogin, UserInfo, decodedTokenData } from "@/types/userTypes";
import { parseJwt } from "@/utils/parsejwt";
import { api } from "@/services/api";

interface isAutheticatedType {
  isAutheticated: boolean;
  user?: UserInfo | null;
  signIn: (data: IUserLogin) => Promise<void>;
  logOut: () => void;
}

type ChildrenProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as isAutheticatedType);

function AuthProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const isAutheticated = !!user;

  useEffect(() => {
    const { "atis.token": token } = parseCookies();

    if (!token) {
      setUser(null);
      return;
    }
    const decodedToken: decodedTokenData = parseJwt(token);
    setUser({
      id: decodedToken.sub,
      name: decodedToken.name,
    });
  }, []);

  async function logOut() {
    setUser(null);
    destroyCookie(null, "atis.token");
  }

  async function signIn({ username, password }: IUserLogin) {
    const res = await api.post(`/login`, { username, password });

    console.log(res);

    setCookie(undefined, "atis.token", res.data.token, {
      maxAge: 60 * 60 * 1, // 1 hour
    });

    api.defaults.headers["Authorization"] = "Bearer " + res.data.token;

    const decodedToken: decodedTokenData = parseJwt(res.data.token);

    setUser({
      id: decodedToken.sub,
      name: decodedToken.name,
    });

    Router.push("/");
  }

  return (
    <AuthContext.Provider value={{ isAutheticated, signIn, user, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
