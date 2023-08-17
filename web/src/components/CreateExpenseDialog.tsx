import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./Input";
import { ChangeEvent, FormEvent, useState } from "react";
import { parseJwt } from "@/utils/parsejwt";
import { useForm } from "react-hook-form";
import { api } from "@/services/api";
import { parseCookies } from "nookies";
import { IExpenseCreate } from "@/@types/inputTypes";

interface CreateExpenseProps{
  isOpen: () => void,
  updateState?: boolean,
}

const CreateExpenseDialog = ({updateState, isOpen} : CreateExpenseProps) => {
  const { register, handleSubmit } = useForm<IExpenseCreate>()
  const [date, setDate] = useState("");
  const router = useRouter();


  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }

  const handleExpenseCreation = async (data : IExpenseCreate) => {
    
    const {['atis.token'] : token} = parseCookies()
    const decodedToken = parseJwt(token);
    const id = decodedToken.sub
    

    try {
      await api.post(`/expense`, {
        buyerName: data.buyerName,
        description: data.description,
        price: Number(data.price),
        quantity: Number(data.quantity),
        date: date
      }, {
        headers: {
          Authorization: token,
          user: id
        }
      }).then((res) => {
        if (updateState) {
          router.reload();
        }
        isOpen();
      })
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
      <Dialog.Content
        className="bg-darkbg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 px-8 py-7 w-96 rounded-lg"
      >

        <Dialog.Title
          className="text-3xl font-bold text-white mb-4"
        >
          Criar novo gasto
        </Dialog.Title>

        <form
          action=""
          onSubmit={handleSubmit(handleExpenseCreation)}
        >


          <div
            className="mb-2"
          >
            <label
              htmlFor="buyerName"
              className="font-semibold"
            >
              Nome do comprador
            </label>
            
            <Input label="buyerName" register={register} id="buyerName" type="text"/>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="description"
              className="font-semibold"
            >
              Nome do Produto
            </label>
            
            <Input label="description" register={register} id="description" type="text"/>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="price"
              className="font-semibold"
            >
              Preço
            </label>
            
            <Input label="price" register={register} id="price" type="number"/>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="quantity"
              className="font-semibold"
            >
              Quantidade
            </label>
            
            <Input label="quantity" register={register} id="quantity" type="number"/>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="date"
              className="font-semibold"
            >
              Data
            </label>
            
            <input
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
              id="date" type="datetime-local"
              onChange={handleDate}
            />
          </div>

          <button
            className="w-full bg-red-500 mt-2 px-3 py-4 rounded transition-all hover:bg-red-600 uppercase font-bold"
          >
            Create Expense
          </button>
        </form>


      </Dialog.Content>
    </Dialog.Portal>
  )
}

export { CreateExpenseDialog };