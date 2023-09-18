import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Check } from "phosphor-react";
import { parseJwt } from "@/utils/parsejwt";
import { SaleInput } from "./SaleInput";
import { useForm } from "react-hook-form";
import { ISaleCreate } from "@/@types/inputTypes";
import { parseCookies } from "nookies";
import { api } from "@/services/api";
import { Button } from "./Button";

export interface products{
  id: string;
  name: string;
}

interface props{
  products: products[];
}

const CreateSaleDialog = ({products} : props) => {
  const { register, handleSubmit } = useForm<ISaleCreate>();
  const [hasDiscount, setHasDiscount] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  
  async function handleCreateProduct(data: ISaleCreate) {
    setButtonDisabled(true);
    const { ["atis.token"] : token} = parseCookies();
    const decodedToken = parseJwt(token);
    const id = decodedToken.sub


    try {
      await api.post(`/sale`, {
        client_name: data.client_name,
        productId: data.product,
        quantity: Number(data.quantity),
        paid: Number(data.paid),
        date: data.date,
        discount: hasDiscount
      }, {
        headers: {
          user: `${id}`
        },

      }).then(() => {
        alert('Anuncio criado');
        setButtonDisabled(false);
      });
      

    } catch (err) {
      console.log(err)
      setButtonDisabled(false);
    }

  }


  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
      <Dialog.Content
        className="bg-darkbg fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4 px-8 py-7 w-96 rounded-lg"
      >

        <Dialog.Title
          className="text-3xl font-bold text-white mb-4"
        >
          Criar nova venda
        </Dialog.Title>

        <form action=""
          onSubmit={handleSubmit(handleCreateProduct)}
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
              {...register('product')}
              name="product" id="product"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-full"
            >
              <option value={""} className="text-zinc-500 py-3 px-4">Selecione o produto vendido</option>
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
            
            <SaleInput
            label="client_name"
            register={register}
            name="client_name" id="client_name" type="text"/>
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
            
            <SaleInput
            label="quantity"
            register={register}
            name="quantity" id="quantity" type="number"/>
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
            
            <SaleInput
            label="paid"
            register={register}
            name="paid" id="paid" type="number"/>
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
            
            <input
              {...register("date")}
              name="date" id="date" type="date"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
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

          <Button
            color="bg-green-500"
            hover="bg-green-600"
            disabled={buttonDisabled}
            label="Nova Venda"
          />
        </form>


      </Dialog.Content>
    </Dialog.Portal>
  )
}


export { CreateSaleDialog };