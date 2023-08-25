import { TableRow } from "@/components/TableRow";
import { api } from "@/services/api";
import { Roboto } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";
import { CreateExpenseDialog } from "@/components/CreateExpenseDialog";
import * as Dialog from "@radix-ui/react-dialog";
import { CaretRight, Plus } from "phosphor-react";
import { GetServerSideProps } from "next";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { expense } from "@/@types/_types";
import { PaginationButtons } from "@/components/PaginationButtons";
import { useRouter } from "next/router";



const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '500', '700', '900']
});

interface expensesResponse{
  expenses: expense[], 
  count: number
}

interface Props{
  expenses: expense[],
  count: number,
  page: number
}

export default function Expenses({expenses, count, page}: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleExpenseDelete(id: string) {
    try {
      await api.delete(`/expense/${id}/delete`)
        .then(()=> router.reload());
    } catch (error) {
      console.log(error);
    }
  }
     

  return (
    <div
      className={`ml-80 pt-16 text-white ${roboto.className}`}
    >
      <Head>
        <title>Gastos | AnyFresh</title>
      </Head>
      <div
        className="p-16"
      >
        <h1
          className={`text-2xl font-semibold`}
        >
          Gastos
        </h1>

        {/* Divider line */}

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        <div className="flex justify-between">
          <Dialog.Root
            open={open}
            onOpenChange={setOpen}
          >
            <Dialog.Trigger
              className="flex mb-8 items-center border w-60 px-4 py-3 gap-2 justify-center rounded-lg text-red-400 border-red-400 transition-all hover:text-red-500 hover:border-red-500"
            >
              <Plus size={28} />
              <span className="font-semibold">Novo Gasto</span> 
            </Dialog.Trigger>
            <CreateExpenseDialog
            isOpen={() => {
              console.log(open)
              setOpen(!open)
            }}
              updateState={true}  
            />
          </Dialog.Root>

          <PaginationButtons
            count={count}
            page={page}
            url="/expenses"
          />

        </div>


        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-zinc-600 text-base">
            <thead className="ltr:text-left rtl:text-right border-t-2 border-zinc-600">
              <tr>
                <th className="whitespace-nowrap px-4 pt-12 pb-2 font-medium text-zinc-100 text-start">
                  Nome
                </th>
                <th className="whitespace-nowrap px-4 pt-12 pb-2 font-medium text-zinc-100 text-start">
                  Nome do Prod.
                </th>
                <th className="whitespace-nowrap px-4 pt-12 pb-2 font-medium text-zinc-100 text-start">
                  Data
                </th>
                <th className="whitespace-nowrap px-4 pt-12 pb-2 font-medium text-zinc-100 text-start">
                  Preco
                </th>
                <th className="whitespace-nowrap px-4 pt-12 pb-2 font-medium text-zinc-100 text-start">
                  Qtd
                </th>
                <th className="whitespace-nowrap px-4 pt-12 pb-2 font-medium text-zinc-100 text-start">
                  Preco Total
                </th>
                <th className="whitespace-nowrap px-4 pt-12 pb-2 font-medium text-zinc-100 text-start">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {expenses ?
                expenses.map((expense) => {
                  return (
                    <TableRow 
                      key={expense.id}
                      id={expense.id}
                      name={expense.buyerName}
                      productName={expense.description}
                      date={new Date(expense.date)}
                      price={expense.price}
                      quantity={expense.quantity}
                      deleteFunction={handleExpenseDelete}  
                    />
                  )
                }) :
                <TableRow
                  id="0"
                  name="-"
                  price={0}
                  quantity={0}
                  productName="-"
                  date={new Date(0)}
                  deleteFunction= {() => null}
                />
              }

              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuth = AuthOnServerSide(ctx);
  const page = ctx.query.page ?? 1;

  if (!isAuth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const data : expensesResponse = await api.get(`/expenses?page=${page}`)
    .then((res) => { return res.data })
    .catch((err) => { return err})

  return {
    props: {
      expenses: data.expenses,
      count: data.count,
      page: +page
    }
  }
}