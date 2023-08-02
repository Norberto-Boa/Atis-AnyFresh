import { TableRow } from "@/components/TableRow";
import { api } from "@/services/api";
import { getToken } from "@/utils/getToken";
import { Inter } from "@next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";

const inter = Inter({subsets: ['latin']})

interface expensesResponse{
  id: string,
  description: string,
  buyerName: string,
  price: number,
  quantity: number,
  date: Date,
}

export default function Expenses() {
  const [expenses, setExpenses] = useState<expensesResponse[]>();

  

  useEffect(() => {
    api.get(`http://localhost:3333/expenses`)
      .then((res) => {
        setExpenses(res.data);
      })
  }, []);

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
            Gastos
          </h1>

          {/* Divider line */}

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />


        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-zinc-600 text-base">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100 text-start">
                  Nome
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100 text-start">
                  Nome do Prod.
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100 text-start">
                  Data
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100 text-start">
                  Preco
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100 text-start">
                  Qtd
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100 text-start">
                  Preco Total
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100 text-start">
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
                />
              }

              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}