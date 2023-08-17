import { Params } from "@/@types/_types";
import { useForm } from "react-hook-form";
import { api } from "@/services/api";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { Inter } from "@next/font/google";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { expense } from '../../../@types/_types';
import Head from "next/head";
import { format } from "date-fns";
import { Input } from "@/components/Input";
import { IExpenseCreate } from "@/@types/inputTypes";
import { ChangeEvent, useState } from "react";

const inter = Inter({subsets: ['latin']})

interface Props{
  expense: expense
}

export default function Edit({ expense }: Props) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const {register, handleSubmit} = useForm<IExpenseCreate>();

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }

  const handleEditData = (data : IExpenseCreate) => {
    try {
      
    } catch (error) {
      
    }
  }

  return (
    <div
      className={`ml-80 pt-16 text-white ${inter.className}`}
    >
      <Head>
        <title>Edit | Expense</title>
      </Head>
      <div
        className="p-16"
      >
        <h1
          className={`${inter.className} text-2xl font-semibold`}
        >
          Editar gasto feito por {expense.buyerName} no dia {format(new Date(expense.date), "MM/dd/yyyy")}
        </h1>

      {/* Divider line */}

      <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        <div
          className="flex gap-20"
          >
          {/*Edit Form*/}
          <form action="">
            <div
              className="mb-2"
            >
              <label htmlFor="buyerName">Nome do comprador</label>
              <Input
                label="buyerName"
                register={register}
                id="buyerName"
                placeholder="Escreva o nome do comprador"
              />
            </div>
            <div
              className="mb-2"
            >
              <label htmlFor="description">Descrição</label>
              <Input
                label="description"
                register={register}
                id="description"
                placeholder="Escreva o nome do produto"
              />
            </div>
            <div
              className="mb-2"
            >
              <label htmlFor="price">Preço</label>
              <Input
                label="price"
                register={register}
                id="price"
                placeholder="Escreva o preco"
                type="number"
              />
            </div>
            <div
              className="mb-2"
            >
              <label htmlFor="quantity">Quantidade</label>
              <Input
                label="quantity"
                register={register}
                id="quantity"
                placeholder="Quantos comprou?"
              />
            </div>
            <div
              className="mb-2"
            >
              <label htmlFor="date">Nome do comprador</label>
              <input
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
                id="date" type="date"
                onChange={handleDate}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 mt-2 px-3 py-4 rounded transition-all hover:bg-red-600 uppercase font-bold"
            >
              Create Expense
            </button>
          </form>

          {/*Actual Data*/}
          <div
            className="border-l border-zinc-400 pl-4"
          >
            <p
              className="text-lg tracking-wider mb-2"
            >
              <span className="font-bold">Comprador: </span>
              <span>{expense.buyerName}</span>
            </p>

            <p
              className="text-lg tracking-wider mb-2"
            >
              <span className="font-bold">Descricao: </span>
              <span>{expense.description}</span>
            </p>

            <p
              className="text-lg tracking-wider mb-2"
            >
              <span className="font-bold">Preco: </span>
              <span>{expense.price}</span>
            </p>

            <p
              className="text-lg tracking-wider mb-2"
            >
              <span className="font-bold">Quantidade: </span>
              <span>{expense.quantity}</span>
            </p>
            
            <p
              className="text-lg tracking-wider mb-2"
            >
              <span className="font-bold">Data: </span>
              <span>{format(new Date(expense.date), "MM/dd/yyyy")}</span>
            </p>

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

  const { id } = ctx.params as Params;
  const expense = await api.get(`/expense/${id}`)
    .then((res) => { return res.data.expense })
    .catch ((err) => {return err})

  console.log(expense);
  
  return {
    props: {
      expense
    }
  }

}