import { GetServerSideProps, GetStaticProps } from "next";
import { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Inter } from 'next/font/google';
import * as Dialog from "@radix-ui/react-dialog";
import { parseCookies } from "nookies";

import { api } from "@/services/api";
import { AuthContext } from "@/context/authContext";

import { CreateProductDialog } from "@/components/CreateProductDialog";
import { CreateExpenseDialog } from "@/components/CreateExpenseDialog";
import { CreateSaleDialog } from "@/components/CreateSaleDialog";
import { ArrowDown, CurrencyDollar, Plus, ShoppingBag, Tag } from "phosphor-react";
import { getAPIclient } from "@/services/getApiClient";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import axios from "axios";

const inter = Inter({ subsets: ['latin'] })

interface DashboardData{
  products: number,
  sales: number,
  expenses: number,
  balance: number,
}

export default function Home({products, sales, expenses, balance}: DashboardData) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user } = useContext(AuthContext);
  
  return (
    <div className={`ml-80 pt-16 text-white ${inter.className}`} >
      <div className="p-16">
        <div>
          <h1 className={`${inter.className} text-2xl font-bold`}>Dona {user?.name}, seja bem vindo a ATIS</h1>
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
          

          {/**Create Expense Button */}
          <Dialog.Root
            open={open}
          >
            <Dialog.Trigger
              className="flex items-center border w-60 px-4 py-3 gap-2 justify-center rounded-lg text-red-400 border-red-400 transition-all hover:text-red-500 hover:border-red-500"
            >
              <Plus size={28} />
              <span className="font-semibold">Novo Gasto</span> 
            </Dialog.Trigger>
            <CreateExpenseDialog
              isOpen={() => setOpen(!open)}
            />
          </Dialog.Root>
 
        </div>

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        <div className="flex gap-8">
          
          <div className="w-80 h-28 border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <ShoppingBag size={26} className="text-emerald-400"/>
              
              <p className="text-xl font-semibold">Produtos</p>
            </div>

            <div className="px-6 py-4 bg-zinc-900 rounded-xl">
              <p className="text-xl font-bold">{products}</p>
            </div>

          </div>

          <div className="w-80 h-28 border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <Tag size={26} className="text-emerald-400"/>
              
              <p className="text-xl font-semibold">Vendas</p>
            </div>

            <div className="px-6 py-4 bg-zinc-900 rounded-xl">
              <p className="text-xl font-bold">{sales}</p>
            </div>

          </div>

          <div className="w-80 h-28 border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <CurrencyDollar size={26} className="text-emerald-400"/>  
              
              <p className="text-xl font-semibold">Saldo</p>
            </div>

            <div className="px-2 py-1 bg-zinc-900 ">
              <p className="text-xl font-bold">{Intl.NumberFormat('en-DE').format(balance)} MT</p>
            </div>

          </div>

          <div className="w-80 h-28 border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <ArrowDown size={26} className="text-red-400"/>
              
              <p className="text-xl font-semibold">Gastos</p>
            </div>

            <div className="px-1 py-2 bg-zinc-900 ">
              <p className="text-xl font-bold">{Intl.NumberFormat('en-DE').format(expenses)} MT</p>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuth = AuthOnServerSide(ctx);

  if (!isAuth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const endpoints = [
    "/products",
    "/sales",
    "/expenses",
    "/payments"
  ]
  
  const res = await Promise.all([
    api.get(endpoints[0]),
    api.get(endpoints[1]),
    api.get(endpoints[2]),
    api.get(endpoints[3])
  ]) 

  const [res1, res2, res3, res4] = res;

  const products = res1.data.length;
  const sales = res2.data.length;

  let expenses = 0;
  res3.data.forEach((expense: { quantity: number, price: number }) => {expenses += (expense.quantity * expense.price)})

  let totalPayment = 0;
  res4.data.forEach((payment: { amount: number }) => { totalPayment += payment.amount });

  const balance = totalPayment - expenses;

  return {
    props: {
      products,
      sales,
      expenses,
      balance 
    }
  }
}
