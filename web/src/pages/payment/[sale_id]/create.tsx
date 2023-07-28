import { Input } from "@/components/Input";
import { parseJwt } from "@/utils/parsejwt";
import { Inter } from "@next/font/google";
import axios from "axios";
import { useRouter } from 'next/router';
import { ArrowLineUp } from "phosphor-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

const inter = Inter({subsets: ['latin']})

interface IPayment{
  payment_type?: "Cash" | "M-pesa" | "E-mola" | "BIM" | "Conta-Movel",
  amount?: number,
  date?: Date,
  description?: string
}


export default function Create() {
  const [saleData, setSaleData] = useState();
  const [formData, setFormData] = useState<IPayment>();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => { 
    const { name, value } = e.target
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    console.log(formData)
  }

  const router = useRouter();

  const { sale_id } = router.query;

  useEffect(() => {
    axios.get(`http://localhost:3333/sale/${router.query['sale_id']}`)
      .then((res) => {
        setSaleData(res.data);
      });
  })


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const bearerToken = localStorage.getItem("token")
    const [, token] = bearerToken?.split(" ");
    const decodedToken = parseJwt(token);
    const id = decodedToken.sub

    console.log(formData);

    try {
      axios.post(`http://localhost:3333/payment/${sale_id}`,
        {
          payment_type: formData?.payment_type,
          amount: Number(formData?.amount),
          date: formData?.date,
          description: formData?.description
        }, {
          headers: {
            Authorization: token,
            user: id
          }
        }
      ).then(() => {
        alert("Pagamento criado com sucesso!")
        router.push("/sales")
      })
      
    } catch (error) {
      
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
          Criar pagamento da venda {saleData?.client_name}
        </h1>

      {/* Divider line */}

      <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

      {/*Form de Pagamento*/}
        <form
          action=""
          onSubmit={handleSubmit}
        >
          <div className="mb-2">
            <label htmlFor="payment_type">Meio de pagamento</label>
            <select
              name="payment_type"
              id="payment_type"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-80 block mt-2"
              onChange={handleChange}
            >
              <option value={""} className="text-zinc-500 py-3 px-4" disabled>Selecione o game que deseja jogar</option>
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
            
            <Input name="amount" id="amount" type="number" className="!w-80" onChange={handleChange}/>
          </div>
          
    
          <div
            className="mb-2 w-96"
          >
            <label
              htmlFor="date"
            >
              Date
            </label>
            
            <Input name="date" id="date" type="datetime-local" className="!w-80" onChange={handleChange}/>
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
              name="description"
              id="description"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
              onChange={handleChange}
            />
          </div>

          <div className="w-96 mt-2">  
            <button
              type="submit"
              className="w-full bg-green-500 border-2 border-green-400 text-white mt-2 px-3 py-4 rounded transition-all duration-700 hover:bg-green-600 hover:text-white uppercase font-bold flex items-center gap-3 justify-center flex-row-reverse"
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
