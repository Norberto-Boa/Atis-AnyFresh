import { UserInfo } from "@/@types/userTypes";
import { useDispatch } from "react-redux";
import { parseJwt } from "./parsejwt";
import { checkJwt } from "./checkJwt";


function isAuthViaRedux(userInfo : UserInfo | null) {
  if (!userInfo) {
    return false;
  }

  return true;
};

function isAuth(token: string) {
  
  const decodedToken = parseJwt(token);
  const checkToken = checkJwt(decodedToken);

}




export { isAuthViaRedux };