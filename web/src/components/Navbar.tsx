import { AuthContext } from "@/context/authContext";
import Image from "next/image";
import Link from "next/link";
import { SignOut } from "phosphor-react";
import { useContext } from "react";
import { destroyCookie, parseCookies } from "nookies";
import Router from "next/router";


const Navbar = () => {
  const { logOut, isAutheticated } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  
  const LogOut = async () => {
    logOut();
    return Router.push('/login');
  }

  return (
    <div className={`w-full h-16 fixed ${isAutheticated ? "block" : "hidden"}`}>
      <div className="w-full lg:max-w-full mx-auto flex justify-between items-center h-full py-4 px-12 lg:px-20 bg-slate-900 border-b-2 border-slate-700">
        <div>
          <Link href={`#`} className="text-2xl font-bold">Any<span className={`text-green-400`}>Fresh</span></Link>
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex gap-4 items-center">
            <div className="h-10 w-10 bg-slate-700 rounded-full">
              <Image
                src={`https://github.com/Norberto-Boa.png`}
                width={100}
                height={100}
                alt="Profile Picture"
                className="!w-full !h-full rounded-full"
              />
            </div>
            <div>
              <span className="block font-bold text-xl leading-none">{isAutheticated ? user?.name : ""}</span>
            </div>
          </div>
          <SignOut
            onClick={LogOut}
            weight="fill" size={40}
            className="text-slate-700 hover:text-slate-500 transition-all -rotate-90 cursor-pointer"
          />
          
        </div>

      </div>
    </div>
  )
}

export { Navbar };