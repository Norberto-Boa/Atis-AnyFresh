import { AuthContext } from "@/context/authContext";
import { Roboto } from "@next/font/google";
import Link from "next/link";
import { Gear, BellSimple } from "phosphor-react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../redux/store';

const roboto = Roboto({weight: "900", subsets:['latin']});


const Navbar = () => {
  const { isAutheticated } = useContext(AuthContext);
  

  return (
    <div className={`w-full h-16 fixed ${isAutheticated ? "block" : "hidden"}`}>
      <div className="w-full lg:max-w-full mx-auto flex justify-between items-center h-full py-4 lg:px-20 bg-slate-900 border-b-2 border-slate-700">
        <div>
          <Link href={`#`} className="text-2xl"><strong>Book</strong><span className={`${roboto.className} text-blue-600`}>Sharing</span></Link>
        </div>

        <div className="flex gap-4 items-center">
          <BellSimple weight="fill" size={40} className="text-slate-700"/>
          <Gear weight="fill" size={40} className="text-slate-700" />
          <div className="flex gap-4 items-center">
            <div className="h-10 w-10 bg-slate-700 rounded-full" />
            <div>
              <span className="block font-bold text-xl leading-none">BoaN</span>
              <span className="block text-slate-400 text-sm">Norberto Boa</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export { Navbar };