import { ReactElement, ReactNode, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { IUserLogin, UserInfo, decodedTokenData } from "@/@types/userTypes";
import { parseJwt } from "@/utils/parsejwt";
import { api } from "@/services/api";



interface isAutheticatedType{
  isAutheticated: boolean;
  user?: UserInfo | null;
  signIn: (data: IUserLogin) => Promise<void>
}

type ChildrenProps = {
  children: ReactNode
}

const AuthContext = createContext({} as isAutheticatedType);


function AuthProvider({ children }: ChildrenProps) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const isAutheticated = !!user;

  useEffect(() => {
    const { 'atis.token': token } = parseCookies();
    
    if (token) {
      const decodedToken: decodedTokenData = parseJwt(token);

      setUser({
        id: decodedToken.sub,
        name: decodedToken.name,
      });
    }

  }, []);

  async function signIn({username, password} : IUserLogin) {
    
    const { data } = await api.post(`/login`,
      { username, password }
    );
    
    setCookie(undefined, 'atis.token', data.token, {
      maxAge: 60 * 60 * 1 // 1 hour
    });

    api.defaults.headers['Authorization'] = 'Bearer ' + data.token;

    const decodedToken : decodedTokenData = parseJwt(data.token);

    setUser({
      id: decodedToken.sub,
      name: decodedToken.name,
    });

    Router.push('/')
  }

  return (
    <AuthContext.Provider value={{isAutheticated, signIn, user}}>
      {children}
    </AuthContext.Provider>     
  )
}

export { AuthProvider, AuthContext };