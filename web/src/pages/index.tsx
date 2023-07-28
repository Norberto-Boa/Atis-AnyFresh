import { Inter } from 'next/font/google'
import { Plus, Tag } from "phosphor-react"
import * as Dialog from "@radix-ui/react-dialog";
import { CreateProductDialog } from "@/components/CreateProductDialog";
import { CreateExpenseDialog } from "@/components/CreateExpenseDialog";
import { CreateSaleDialog } from "@/components/CreateSaleDialog";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  


  return (
    <div className={`ml-80 pt-16 text-white ${inter.className}`} >
      <div className="p-16">
        <div>
          <h1 className={`${inter.className} text-2xl font-bold`}>Dona Mena, seja bem vindo a ATIS</h1>
          <span className={` ${inter.className} leading-tight font-semibold text-zinc-500 text-lg`}>A plata forma para gerir o teu business</span>
        </div>

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        <div className="flex gap-8">
          <Dialog.Root>
            <Dialog.Trigger
              className="flex items-center border w-60 px-4 py-3 gap-2 justify-center rounded-lg text-emerald-400 border-emerald-400 transition-all hover:text-emerald-500 hover:border-emerald-500"
            >
              <Plus size={28} />
              <span className="font-semibold">Nova Compra</span> 
            </Dialog.Trigger>

            <CreateSaleDialog />
          </Dialog.Root>
    
          <Dialog.Root>
            <Dialog.Trigger
              className="flex items-center border w-60 px-4 py-3 gap-2 justify-center rounded-lg text-blue-400 border-blue-400 transition-all hover:text-blue-500 hover:border-blue-500"
            >
              <Plus size={28} />
              <span className="font-semibold">Novo Produto</span> 
            </Dialog.Trigger>

            <CreateProductDialog />
          </Dialog.Root>
          
          <Dialog.Root>
            <Dialog.Trigger
              className="flex items-center border w-60 px-4 py-3 gap-2 justify-center rounded-lg text-red-400 border-red-400 transition-all hover:text-red-500 hover:border-red-500"
            >
              <Plus size={28} />
              <span className="font-semibold">Novo Gasto</span> 
            </Dialog.Trigger>
            <CreateExpenseDialog />
          </Dialog.Root>
 
        </div>

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        <div className="flex gap-8">
          
          <div className="w-80 h-28 border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="p-4 border-2 rounded-full border-emerald-500">
                <Tag size={28}/>  
              </div>
              
              <p className="text-xl font-semibold">Produtos</p>
            </div>

            <div className="px-6 py-4 bg-zinc-900 rounded-full">
              <p className="text-xl font-bold">{3}</p>
            </div>

          </div>

          <div className="w-80 h-28 border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="p-4 border-2 rounded-full border-emerald-500">
                <Tag size={28}/>  
              </div>
              
              <p className="text-xl font-semibold">Vendas</p>
            </div>

            <div className="px-4 py-4 bg-zinc-900 rounded-full">
              <p className="text-xl font-bold">{90}</p>
            </div>

          </div>

          <div className="w-80 h-28 border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="p-4 border-2 rounded-full border-emerald-500">
                <Tag size={28}/>  
              </div>
              
              <p className="text-xl font-semibold">Saldo</p>
            </div>

            <div className="px-2 py-1 bg-zinc-900 ">
              <p className="text-xl font-bold">{40000} MT</p>
            </div>

          </div>

          <div className="w-80 h-28 border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <div className="p-4 border-2 rounded-full border-emerald-500">
                <Tag size={28}/>  
              </div>
              
              <p className="text-xl font-semibold">Gastos</p>
            </div>

            <div className="px-1 py-2 bg-zinc-900 ">
              <p className="text-xl font-bold">{5000} MT</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
