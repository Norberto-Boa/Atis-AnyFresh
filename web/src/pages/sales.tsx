import { Inter } from "@next/font/google";
import { MagnifyingGlass, Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { SalesCard } from "@/components/SalesCard";
import { CreateSaleDialog } from "@/components/CreateSaleDialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { api } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../redux/store';
import { fetchSales } from "@/redux/sales/salesActions";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getAPIclient } from "@/services/getApiClient";
import { AuthOnServerSide } from "@/services/serverSideAuth";

const inter = Inter({subsets: ['latin']})

interface res{
  id: string,
  client_name: string,
  userId: string,
  productId: string,
  quantity: number,
  paid: number,
  date: string,
  discount: boolean,
  created_at: string
  Product: {
    id: string,
    name: string,
    code: string,
    discountPercentage: number,
    price: number,
    created_at: string
  },
  Payment: {
    amount: number,
    payment_type: string,
  }[],
  TotalPrice: number
}

export default function Sales() {
  
  const { sales, loading } = useSelector((state: RootState) => state.sales);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchSales());
  },[dispatch]);

  return (
    <div
      className={`ml-80 pt-16 text-white ${inter.className}`}
    >
      <div
        className="p-16"
      >
        <h1
          className={`${inter.className} text-2xl font-semibold`}
        >
          Vendas
        </h1>

        {/* Divider line */}

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />
        

        <div
          className="flex gap-4 mb-8 items-center"
        >
          {/* Create new Sale dialog trigger */}
          <Dialog.Root>
            <Dialog.Trigger
              className="flex items-center border w-60 px-4 py-3 gap-2 justify-center rounded text-emerald-400 border-emerald-400 transition-all hover:text-emerald-500 hover:border-emerald-500"
            >
              <Plus size={28} />
              <span className="font-semibold">Nova Compra</span> 
            </Dialog.Trigger>

            <CreateSaleDialog />
          </Dialog.Root>

          {/* Search input and button */}
          <div
            className="flex items-center gap-2"
          >
            {/* <div className="py-2 px-2 border border-r-0 border-zinc-600 rounded">
              <MagnifyingGlass size={26} weight="bold"/>
            </div> */}
            <input
              type="text"
              className="w-80 border-2 border-zinc-600 bg-zinc-900 py-3 px-4 rounded text-base placeholder:text-zinc-500"
              placeholder="Procure pelo nome..."
            />

            <button
              className="flex text-lg gap-2 py-3 px-5 bg-green-600 rounded justify-center items-center font-semibold"
            >
              Procurar
              <MagnifyingGlass size={24} weight="bold"/>
            </button>

          </div>
        </div>
        
        <div
          className="flex gap-4"
        >

          {
            sales ?
            sales.map((sale, i) => {
            return (
              <SalesCard
                id={sale.id}
                paid={0}
                Payment={sale.Payment}
                name={sale.client_name}
                date={Date.parse(sale.date)}
                payment_type={sale.Payment.length === 0 ? "Not paid" : sale.Payment[0].payment_type}
                price={sale.Product.price}
                product={sale.Product.name}
                quantity={sale.quantity}
                key={sale.id}
              />
            )
            })
              :
            <p>There is no sale </p>
        }
         
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return AuthOnServerSide(ctx);
}
