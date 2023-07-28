import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./Input";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from 'axios';
import { parseJwt } from "@/utils/parsejwt";

const CreateExpenseDialog = () => {
  const [formData, setFormData] = useState({
    buyerName: "",
    description: "",
    price: 0,
    quantity: 0,
    date:""
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const bearerToken = localStorage.getItem("token")
    const [, token] = bearerToken?.split(" ");
    const decodedToken = parseJwt(token);
    const id = decodedToken.sub
    

    try {
      await axios.post(`http://localhost:3333/expense`, {
        buyerName: formData.buyerName,
        description: formData.description,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        date: formData.date
      }, {
        headers: {
          Authorization: token,
          user: id
        }
      }).then(() => {
        router.reload();
      })
    } catch (error) {
      console.log(error);
    }
    
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
      <Dialog.Content
        className="bg-darkbg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 px-8 py-7 w-96 rounded-lg"
      >

        <Dialog.Title
          className="text-3xl font-bold text-white mb-4"
        >
          Criar novo gasto
        </Dialog.Title>

        <form
          action=""
          onSubmit={handleSubmit}
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
            
            <Input onChange={handleChange} name="buyerName" id="buyerName" type="text"/>
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
            
            <Input onChange={handleChange} name="description" id="description" type="text"/>
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
            
            <Input onChange={handleChange} name="price" id="price" type="number"/>
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
            
            <Input onChange={handleChange} name="quantity" id="quantity" type="number"/>
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
            
            <Input onChange={handleChange} name="date" id="date" type="datetime-local"/>
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