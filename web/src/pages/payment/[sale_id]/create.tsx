import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form';
import { Input } from "@/components/Input";
import { AppDispatch, RootState } from "@/redux/store";
import { api } from "@/services/api";
import { isPaid } from "@/utils/isPaid";
import { Inter } from "@next/font/google";
import { useRouter } from 'next/router';
import { ArrowLineUp } from "phosphor-react";
import {  useContext } from "react";
import { AuthContext } from "@/context/authContext";
import Link from "next/link";
import { GetServerSideProps } from 'next';
import { AuthOnServerSide } from "@/services/serverSideAuth";

const inter = Inter({subsets: ['latin']})

interface IPayment{
  payment_type?: "Cash" | "M-pesa" | "E-mola" | "BIM" | "Conta-Movel",
  amount?: number,
  date?: Date,
  description?: string
}


export default function Create() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IPayment>();
  const { user } = useContext(AuthContext);

  const { sale_id } = router.query;

  const sale = useSelector((state: RootState) => state.sales.sales.find(sale => sale.id === sale_id));
  const dispatch = useDispatch<AppDispatch>();
  
  if (!sale) {
    return (
      <p className={`ml-96 pt-20 text-white ${inter.className}`} >We did not find the sale... <Link href={'/sales'} className="text-blue-400 font-semibold"> Go back to sale and do not refresh the page </Link></p>
    )
  };

  const paid = isPaid(sale.TotalPrice, sale.Payment)
  // useEffect(() => {
  //   axios.get(`http://localhost:3333/sale/${router.query['sale_id']}`)
  //     .then((res) => {
  //       setSaleData(res.data);
  //     });
  // })


  const handlePayment = (data: IPayment,) => {
    

    try {
      api.post(`http://localhost:3333/payment/${sale_id}`, data, {
        headers: {
          user: user.id
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
          Criar pagamento da venda {sale?.client_name}
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
            
            <Input
              {...register("amount")} name="amount" id="amount" type="number" className="!w-80 disabled:opacity-60 disabled:cursor-not-allowed"
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
            
            <Input
              {...register("date")} name="date" id="date" type="datetime-local" className="!w-80 disabled:opacity-60 disabled:cursor-not-allowed"
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
  return AuthOnServerSide(ctx);
}