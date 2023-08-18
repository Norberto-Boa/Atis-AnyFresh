import { Inter } from "@next/font/google";
import { MagnifyingGlass, Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";

import { SalesCard } from "@/components/SalesCard";
import { CreateSaleDialog } from "@/components/CreateSaleDialog";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { ParsedUrlQuery } from "querystring";
import { salesResponse } from "@/@types/userTypes";
import Head from "next/head";
import { useRouter } from "next/router";
import { PaginationButtons } from "@/components/PaginationButtons";


interface Params extends ParsedUrlQuery{
  page: string;
}
const inter = Inter({subsets: ['latin']})

interface PropsSale{
  sales: salesResponse[],
  page: number,
  count: number
}

export default function Sales({ sales, page, count }: PropsSale) {

  return (
    <div
      className={`ml-80 pt-16 text-white ${inter.className}`}
    >
      <Head>
        <title>Vendas | AnyFresh</title>
      </Head>

      <div
        className="p-16"
      >
        <h1
          className={`${inter.className} text-2xl font-semibold`}
        >
          Vendas
        </h1>

        {/* Divider line */}

        <div className={`w-full h-[1px] bg-zinc-700 my-10`} />
        

        <div
          className="flex gap-4 mb-4 justify-center"
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
        </div>

        <div className="flex justify-between items-center mb-4">          
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
          
          <div
            className="flex gap-2 items-center"
          >
            <PaginationButtons
              count={count}
              page={page}
              url="sales"
            />
          </div>
        </div>

        <div
          className="flex gap-4 flex-wrap justify-between"
        >

          {
            sales ?
            sales.map((sale, i) => {
            return (
              <SalesCard
                id={sale.id}
                paid={0}
                Payment={sale.Payment}
                discount={sale.discount}
                name={sale.client_name}
                date={Date.parse(sale.date)}
                payment_type={sale.Payment?.length === 0 ? "Not paid" : sale?.Payment[0].payment_type}
                price={sale.Product.price}
                product={sale.Product.name}
                discountPercentage = {sale.Product.discountPercentage}
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
  const isAuth = AuthOnServerSide(ctx);
  let page = ctx.query.page ?? 1;
  
  if (!isAuth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  const data = await api.get(`/sales?page=${page}`)
    .then((res) => {
      return res.data
    }).catch((err) => { return (err) });

  return {
    props: {
      sales: data.Sales,
      page: +page,
      count: data.count
    }
  };
}
