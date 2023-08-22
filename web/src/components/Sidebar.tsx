import { AuthContext } from "@/context/authContext";
import { Roboto } from "next/font/google";
import Link from "next/link";
import { ArrowDown, Bag, Gauge, Money, Tag } from "phosphor-react";
import { useContext } from "react";

const roboto = Roboto({ weight: "500", subsets: ["latin"] });

const links = [
  { title: "Dashboard", href: "/", icon: <Gauge size={24} />},
  { title: "Produtos", href: "/products", icon: <Tag size={24} />},
  { title: "Vendas", href: "/sales", icon: <Bag size={24} />},
  { title: "Gastos", href: "/expenses", icon: <ArrowDown size={24} />},
  { title: "Pagamentos", href: "/payments", icon: <Money size={24} />},
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
                className="flex items-center py-2 gap-2"
              >
                {link.icon}
                <span className={`text-xl ${roboto.className}`}>{link.title}</span>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}

export { Sidebar };