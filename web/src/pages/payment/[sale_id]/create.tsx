import { useForm } from 'react-hook-form';
import { Input } from "@/components/Input";
import { api } from "@/services/api";
import { isPaid } from "@/utils/isPaid";
import { Inter } from "next/font/google";
import { useRouter } from 'next/router';
import { ArrowLineUp } from "phosphor-react";
import {  useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { GetServerSideProps } from 'next';
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { PaymentInput } from "@/components/PaymentInput";
import { IPayment } from "@/@types/inputTypes";
import { Params } from "@/@types/_types";
import { salesResponse } from "@/@types/userTypes";

const inter = Inter({subsets: ['latin']})

interface Props{
  sale: salesResponse;
}

export default function Create({sale}: Props) {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IPayment>();
  const { user } = useContext(AuthContext);

  if (!sale) {
    return (
      <p className={`ml-96 pt-20 text-white ${inter.className}`} >We did not find the sale... <Link href={'/sales'} className="text-blue-400 font-semibold"> Go back to sale and do not refresh the page </Link></p>
    )
  };

  const paid = isPaid(sale.TotalPrice, sale.Payment)

  const handlePayment = (data: IPayment,) => {
    try {
      api.post(`http://localhost:3333/payment/${sale.id}`, {
        payment_type: data.payment_type,
        amount: Number(data.amount),
        date: data.date,
        description: data.description
      }, {
        headers: {
          user: user?.id
        }  
      }
      ).then(() => {
        alert("Pagamento criado com sucesso!")
        router.push("/sales")
      })
      
    } catch (error) {
      console.log(error);
    }

  }



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
          Criar pagamento da venda para {sale.client_name} - {sale.quantity} {sale.Product.name}
        </h1>

        <h2
          className={`mt-4 ${inter.className} font-semibold text-xl ${paid ? 'text-green-400' : 'text-red-400'}`}
        >
          {typeof paid === "number" ? `O valor pago desta divida e ${paid}` : `Esta divida ja foi paga!`}
        </h2>

      {/* Divider line */}

      <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

      {/*Form de Pagamento*/}
        <form
          action=""
          onSubmit={handleSubmit(handlePayment)}
        >
          <div className="mb-2">
            <label htmlFor="payment_type">Meio de pagamento</label>
            <select
              {...register("payment_type")}
              disabled={paid === true ? true : false}
              name="payment_type"
              id="payment_type"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-96 block mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <option value={""} className="text-zinc-500 py-3 px-4">Selecione o meio de pagamento que deseja usar!</option>
              <option value={"Conta-movel"} className="text-zinc-200 py-3 px-4">Conta Movel</option>
              <option value={"M-pesa"} className="text-zinc-200 py-3 px-4">M-Pesa</option>
              <option value={"BIM"} className="text-zinc-200 py-3 px-4">BIM</option>
              <option value={"Cash"} className="text-zinc-200 py-3 px-4">Cash</option>
              <option value={"E-mola"} className="text-zinc-200 py-3 px-4">E-mola</option>

            </select>
          </div>

          <div
            className="mb-2 w-96"
          >
            <label
              htmlFor="amount"
            >
              Quantia
            </label>
            
            <PaymentInput
              register={register} label="amount" id="amount" type="number" className="!w-80 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={paid === true ? true : false}
            />
          </div>
          
    
          <div
            className="mb-2 w-96"
          >
            <label
              htmlFor="date"
            >
              Date
            </label>
            
            <input
              {...register("date")}
              id="date" type="datetime-local"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={paid === true ? true : false}
            />
          </div>

          <div
            className="mb-2 w-96"
          >
            <label
              htmlFor="description"
            >
              Description
            </label>
            
            <textarea
              {...register("description")}
              name="description"
              id="description"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={paid === true ? true : false}
              
            />
          </div>

          <div className="w-96 mt-2"> 

               
            <button
              
              type="submit"
              className="w-full bg-green-500 border-2 border-green-400 text-white mt-2 px-3 py-4 rounded transition-all duration-700 hover:bg-green-600 hover:text-white uppercase font-bold flex items-center gap-3 justify-center flex-row-reverse disabled:opacity-60 disabled:cursor-not-allowed"
              disabled= {paid === true ? true : false}
            >
              <ArrowLineUp size={24} weight="bold" />
              Pagar
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuth = AuthOnServerSide(ctx);
  const { sale_id } = ctx.params as Params; 

  if (!isAuth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const data = await api.get(`/sale/${sale_id}`).then(res => { return res.data }).catch(err => { return err });

  return {
    props: {
      sale: data
    }
  }
}