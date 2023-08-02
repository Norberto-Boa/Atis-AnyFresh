import { AuthContext } from "@/context/authContext";
import { RootState } from "@/redux/store";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { House } from "phosphor-react";
import { useContext } from "react";
import { useSelector } from "react-redux";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

const links = [
  { title: "Dashboard", href: "/", icon: <House size={32} />},
  { title: "Produtos", href: "/products", icon: <House size={32} />},
  { title: "Vendas", href: "/sales", icon: <House size={32} />},
  { title: "Gastos", href: "/expenses", icon: <House size={32} />},
]


const Sidebar = () => {
  const { isAutheticated } = useContext(AuthContext);

  return (
    <div className={`bg-slate-900 lg:w-80 min-h-screen fixed lg:top-16 ${isAutheticated ? "block" : "hidden"}`}>
      <div className="px-8 py-6">
        <h1 className={`${roboto.className} text-base mb-4`}>Menu</h1>

        <div>
          {links.map((link, index) => {
            return (
              <Link
                href={link.href}
                key={index}
                className="flex items-center py-1 gap-2"
              >
                {link.icon}
                <span className={`text-lg ${roboto.className}`}>{link.title}</span>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export { Sidebar };