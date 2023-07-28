import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Input } from "./Input";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Check } from "phosphor-react";
import { parseJwt } from "@/utils/parsejwt";

interface products{
  id: string;
  name: string;
}

const CreateSaleDialog = () => {

  const router = useRouter();

  const [hasDiscount, setHasDiscount] = useState(false)
  const [products, setProducts] = useState<products[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3333/products`)
      .then(res => {
        setProducts(res.data);
      });
  });
  
  async function handleCreateProduct(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    const bearerToken = localStorage.getItem("token")
    const [, token] = bearerToken?.split(" ");
    const decodedToken = parseJwt(token);
    const id = decodedToken.sub


    try {
      await axios.post(`http://localhost:3333/sale`, {
        client_name: data.client_name,
        productId: data.product,
        quantity: Number(data.quantity),
        paid: Number(data.paid),
        date: data.date,
        discount: hasDiscount
      }, {
        headers: {
          Authorization : `${token}`,
          user: `${id}`
        },

      }).then((res) => {
        alert('Anuncio criado');
        
      });
      

    } catch (err) {
      console.log(err)
    }

  }


  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
      <Dialog.Content
        className="bg-darkbg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 px-8 py-7 w-96 rounded-lg"
      >

        <Dialog.Title
          className="text-3xl font-bold text-white mb-4"
        >
          Criar nova compra
        </Dialog.Title>

        <form action=""
          onSubmit={handleCreateProduct}
        >

          <div
            className="mb-2"
          >
            <label
              htmlFor="name"
              className="font-semibold"
            >
              Escolha o Produto
            </label>
            
            <select
              name="product" id="product"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-full"
            >
              <option value={""} className="text-zinc-500 py-3 px-4">Selecione o game que deseja jogar</option>
              {
                products.map((product, i) => {
                  return (
                    <option key={product.id} value={product.id} className="text-zinc py-3 px-4">{product.name}</option>
                  )
                })
              }
            </select>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="client_name"
              className="font-semibold"
            >
              Nome do cliente
            </label>
            
            <Input name="client_name" id="client_name" type="text"/>
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
            
            <Input name="quantity" id="quantity" type="number"/>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="paid"
              className="font-semibold"
            >
              Valor pago
            </label>
            
            <Input name="paid" id="paid" type="number"/>
          </div>

          <div
            className="mb-4"
          >
            <label
              htmlFor="date"
              className="font-semibold"
            >
              Data
            </label>
            
            <Input
              name="date" id="date" type="date"
            />
          </div>

          <div className="flex gap-2 items-center">
            <Checkbox.Root
              className="w-4 h-4 p-3 rounded flex items-center justify-center bg-zinc-700 data-[state=checked]:bg-green-500"
              id="discount"
              name="discount"
              checked={hasDiscount}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setHasDiscount(true);
                } else {
                  setHasDiscount(false);
                }
              }}
            >
              <Checkbox.Indicator
                className=""
              >
                <Check size={16} weight="bold" className="text-white" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            <label
              htmlFor="discount"
              className="font-semibold"
            >
              Desconto
            </label>
          </div>

          <p className="text-2xl font-medium mt-4">Total:</p>
          <span className="text-2xl font-bold text-emerald-500 mb-2">{2500} MT</span>


          <button
            className="w-full bg-green-500 mt-2 px-3 py-4 rounded transition-all hover:bg-green-600 uppercase font-bold"
          >
            Nova Venda
          </button>
        </form>


      </Dialog.Content>
    </Dialog.Portal>
  )
}

export { CreateSaleDialog };