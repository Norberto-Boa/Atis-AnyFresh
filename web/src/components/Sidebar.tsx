import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { ArrowDown, Bag, Gauge, List, Money, Tag } from "phosphor-react";
import { useContext, useState } from "react";

const links = [
  { title: "Dashboard", href: "/", icon: <Gauge size={24} />},
  { title: "Produtos", href: "/products", icon: <Tag size={24} />},
  { title: "Vendas", href: "/sales", icon: <Bag size={24} />},
  { title: "Gastos", href: "/expenses", icon: <ArrowDown size={24} />},
  { title: "Pagamentos", href: "/payments", icon: <Money size={24} />},
]


const Sidebar = () => {
  const { isAutheticated } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  
  return (

    <div
      className="pt-16 relative"
    >
      <div
        className={`absolute inset-0 h-screen bg-black/25 ${open ? '' : 'hidden'} overflow-hidden`}
        onClick={() => setOpen(!open)}
      />
      
      <div className="lg:hidden px-4">
        <List
          size={36} weight="bold"
          className="text-slate-100 cursor-pointer mt-2"
          onClick={()=> setOpen(!open)}
        />
      </div>

      {/* Mobile Navbar  */}

      <div
        className={`bg-slate-900 min-h-screen z-10 fixed lg:hidden transition-all duration-700
        -translate-y-11 ${open ? '-translate-x-0' : '-translate-x-64'}
        ${isAutheticated ? "block" : "hidden"}`}
      >
        <div className="px-8 py-6">
          <h1 className={`text-xl font-bold tracking-wide mb-4 uppercase`}>Menu</h1>

          <div>
            {links.map((link, index) => {
              return (
                <Link
                  href={link.href}
                  key={index}
                  className="flex items-center py-2 gap-2"
                >
                  {link.icon}
                  <span className={`text-xl`}>{link.title}</span>
                </Link>
              )
            })}
          </div>

        </div>
      </div>

      <div
        className={`bg-slate-900 lg:w-64 min-h-screen fixed hidden
        ${isAutheticated ? "lg:block" : "hidden"}`}
      >
        <div className="px-8 py-6">
          <h1 className={`text-xl font-bold tracking-wide mb-4 uppercase`}>Menu</h1>

          <div>
            {links.map((link, index) => {
              return (
                <Link
                  href={link.href}
                  key={index}
                  className="flex items-center py-2 gap-2"
                >
                  {link.icon}
                  <span className={`text-xl`}>{link.title}</span>
                </Link>
              )
            })}
          </div>

        </div>
      </div>
    </div>
  )
}

export { Sidebar };