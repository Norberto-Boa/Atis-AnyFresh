import { GetServerSideProps } from "next";
import { useContext, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { api } from "@/services/api";
import { AuthContext } from "@/context/authContext";
import { CreateProductDialog } from "@/components/CreateProductDialog";
import { CreateExpenseDialog } from "@/components/CreateExpenseDialog";
import { CreateSaleDialog } from "@/components/CreateSaleDialog";
import {
  ArrowDown,
  CurrencyDollar,
  Plus,
  ShoppingBag,
  Tag,
} from "phosphor-react";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import Head from "next/head";
import { useGetSales } from "@/hooks/useSales/useSales";
import { useGetProducts } from "@/hooks/useProducts/useProducts";
import { useGetPayments } from "@/hooks/usePayments/usePayments";
import { useGetExpenses } from "@/hooks/useExpenses";
import { getTotalOfPayments } from "@/utils/getTotalOfPayments";
import { getTotalOfExpenses } from "@/utils/getTotalOfExpenses";

export default function Home() {
  const [open, setOpen] = useState(false);
  // const [balance, setBalance] = useState<number>();
  const { user } = useContext(AuthContext);
  const { data: sales, isPending: loadingSales, isFetched } = useGetSales();
  const { data: products, isPending: loadingProducts } = useGetProducts();
  const { data: payments, isPending: loadingPayments } = useGetPayments();
  const { data: expenses, isPending: loadingExpenses } = useGetExpenses();

  return (
    <div className={`xl:ml-80 pt-16 text-white`}>
      <Head>
        <title>Dashboard | AnyFresh</title>
      </Head>

      <div className="xl:p-16 px-6">
        <div>
          <h1 className={`text-2xl font-bold `}>
            Dona {user?.name}, seja bem vindo a ATIS
          </h1>
          <span
            className={` leading-tight font-semibold text-zinc-500 text-lg`}
          >
            A plata forma para gerir o teu business
          </span>
        </div>

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        <div className="flex gap-4 flex-wrap max-md:justify-center">
          <Dialog.Root>
            <Dialog.Trigger className="flex items-center border w-60 px-4 py-3 gap-2 justify-center rounded-lg text-emerald-400 border-emerald-400 transition-all hover:text-emerald-500 hover:border-emerald-500">
              <Plus size={28} />
              <span className="font-semibold">Nova Venda</span>
            </Dialog.Trigger>

            {isFetched ? <CreateSaleDialog products={products} /> : ""}
          </Dialog.Root>

          <Dialog.Root>
            <Dialog.Trigger className="flex items-center border w-60 px-4 py-3 gap-2 justify-center rounded-lg text-blue-400 border-blue-400 transition-all hover:text-blue-500 hover:border-blue-500">
              <Plus size={28} />
              <span className="font-semibold">Novo Produto</span>
            </Dialog.Trigger>

            <CreateProductDialog />
          </Dialog.Root>

          {/**Create Expense Button */}
          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger className="flex items-center border w-60 px-4 py-3 gap-2 justify-center rounded-lg text-red-400 border-red-400 transition-all hover:text-red-500 hover:border-red-500">
              <Plus size={28} />
              <span className="font-semibold">Novo Gasto</span>
            </Dialog.Trigger>
            <CreateExpenseDialog />
          </Dialog.Root>
        </div>

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        <div className="flex gap-4 flex-wrap max-lg:justify-center">
          <div className="w-80 h-28 max-md:w-[80%]  border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <ShoppingBag size={26} className="text-emerald-400" />

              <p className="text-xl font-semibold">Produtos</p>
            </div>

            <div className="px-6 py-4 bg-zinc-900 rounded-xl">
              <p className="text-xl font-bold">
                {loadingSales ? "..." : products?.length}
              </p>
            </div>
          </div>

          <div className="w-80 h-28 max-md:w-[80%] border-2  border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <Tag size={26} className="text-emerald-400" />

              <p className="text-xl font-semibold">Vendas</p>
            </div>

            <div className="px-6 py-4 bg-zinc-900 rounded-xl">
              <p className="text-xl font-bold">
                {loadingSales ? "..." : sales?.count}
              </p>
            </div>
          </div>

          <div className="w-80 h-28 max-md:w-[80%] border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <CurrencyDollar size={26} className="text-emerald-400" />

              <p className="text-xl font-semibold">Saldo</p>
            </div>

            <div className="px-2 py-1 bg-zinc-900 ">
              <p className="text-xl font-bold">
                {!loadingPayments && !loadingExpenses
                  ? (
                      getTotalOfPayments(payments) -
                      getTotalOfExpenses(expenses)
                    ).toFixed(2)
                  : "..."}{" "}
                MT
              </p>
            </div>
          </div>

          <div className="w-80 h-28 max-md:w-[80%] border-2 border-emerald-500 rounded-lg px-6 py-8 flex items-center justify-between">
            <div className="flex gap-3 items-center">
              <ArrowDown size={26} className="text-red-400" />

              <p className="text-xl font-semibold">Gastos</p>
            </div>

            <div className="px-1 py-2 bg-zinc-900 ">
              <p className="text-xl font-bold">
                {loadingExpenses
                  ? "..."
                  : getTotalOfExpenses(expenses).toFixed(2)}{" "}
                MT
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuth = AuthOnServerSide(ctx);

  if (!isAuth) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
