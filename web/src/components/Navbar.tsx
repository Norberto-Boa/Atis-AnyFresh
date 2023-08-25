import { AuthContext } from "@/context/authContext";
import { Roboto } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Gear, BellSimple } from "phosphor-react";
import { useContext } from "react";

const roboto = Roboto({weight: ["100", "300", "400", "500", "700", "900"], subsets:['latin']});


const Navbar = () => {
  const { isAutheticated } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  

  return (
    <div className={`w-full h-16 fixed ${isAutheticated ? "block" : "hidden"}`}>
      <div className="w-full lg:max-w-full mx-auto flex justify-between items-center h-full py-4 lg:px-20 bg-slate-900 border-b-2 border-slate-700">
        <div>
          <Link href={`#`} className="text-2xl font-bold">Any<span className={`${roboto.className} text-green-400`}>Fresh</span></Link>
        </div>

        <div className="flex gap-4 items-center">
          <BellSimple weight="fill" size={40} className="text-slate-700"/>
          <Gear weight="fill" size={40} className="text-slate-700" />
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
        </div>

      </div>
    </div>
  )
}

export { Navbar };