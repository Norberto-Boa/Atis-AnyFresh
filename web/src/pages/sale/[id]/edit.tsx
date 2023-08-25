import { useRouter } from "next/router"
import { ProductData } from "@/@types/_types"
import { salesResponse } from "@/@types/userTypes"
import { api } from "@/services/api"
import { useState } from "react";
import Head from "next/head";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Input } from "@/components/Input";
import { useForm, UseFormRegister } from "react-hook-form";
import { GetServerSideProps } from "next";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import React from "react";
import { Check } from "phosphor-react";
import { ParsedUrlQuery } from "querystring";
import { format } from "date-fns";

interface Params extends ParsedUrlQuery{
  id: string;
}

interface Props{
  products: ProductData[],
  sale: salesResponse
}

interface IFormInputs{
  client_name: string,
  date: string,
  product: string,
  quantity: number,
}



export default function Sale({products, sale} : Props) {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit } = useForm<IFormInputs>({});
  const [hasDiscount, setHasDiscount] = useState(false);

  async function handleEditSale({client_name, date, product, quantity} : IFormInputs) {
    try {
      await api.put(`sale/${id}/edit`, {
        client_name: client_name,
        date: date,
        productId: product,
        quantity: Number(quantity),
        discount: hasDiscount
      })
        .then(() => {
          alert(`Venda da ${sale.client_name} editada com sucesso! ${sale.discount}`);
          router.push(`/sales`);
        })
        
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={`ml-80 pt-16 text-white`}
    >
      <Head>
        <title>Sale | Edit</title>
      </Head>
      <div
        className="p-16"
      >
        <h1
          className={`text-2xl font-semibold`}
        >
          Editar a venda feita para {`${sale.client_name} - no dia ${sale.date}`};
        </h1>

        <h2
          className={`mt-4 font-semibold text-xl`}
        > 

        </h2>

        {/* Divider line */}

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        {/*Edit Form */}

        <div
          className="flex gap-32"
        >
          <form
            className="w-1/3"
            onSubmit={handleSubmit(handleEditSale)}
          >
            <div
              className="mb-2"
            >
              <label
                htmlFor="name"
                className="font-medium mb-2"
              >
                Escolha o Produto
              </label>

              <select
                {...register('product')}
                name="product" id="product"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 block mt-2 w-full"
              >

                <option value={""} className="text-zinc-500 py-3 px-4">Selecione o producto da venda!</option>
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
                className="font-medium"
              >
                Nome do cliente
              </label>
              
              <input
                {...register('client_name')} name="client_name" id="client_name" type="text"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
              />
            </div>


            <div
              className="mb-2"
            >
              <label
                htmlFor="quantity"
                className="font-medium"
              >
                Quantidade
              </label>
              
              <input {...register('quantity')} name="quantity" id="quantity" type="number"
                className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
              />
            </div>

            <div
              className="mb-4"
            >
              <label
                htmlFor="date"
                className="font-medium"
              >
                Data
              </label>
              
              <input
                {...register('date')} name="date" id="date" type="date"
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
                className="font-medium"
              >
                Desconto
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 mt-3 px-3 py-4 rounded transition-all hover:bg-green-600 uppercase font-bold"
            >
              Editar Venda
            </button> 
          </form>
          <div>
            <h2
              className="text-xl font-bold tracking-wide"
            >
              Dados Actuais
            </h2>

            <ul>
              <li className="text-lg mt-4">
                <span className="font-medium tracking-wide">Produto: </span>
                <span>{sale.Product.name}</span>
              </li>

              <li className="text-lg mt-4">
                <span className="font-medium tracking-wide">Nome do Cliente: </span>
                <span>{sale.client_name}</span>
              </li>

              <li className="text-lg mt-4">
                <span className="font-medium tracking-wide">Quantidade: </span>
                <span>{sale.quantity}</span>
              </li>

              <li className="text-lg mt-4">
                <span className="font-medium tracking-wide">Data: </span>
                <span>{format(new Date(sale.date), 'dd/MM/yyyy')}</span>
              </li>

              <li className="text-lg mt-4">
                <span className="font-medium tracking-wide">Desconto: </span>
                <span>{sale.discount ? "Sim" : "Não"}</span>
              </li>

            </ul>
          </div>
        </div>
      </div>

    </div>
  )  
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuth = AuthOnServerSide(ctx);

  const { id } = ctx.params as Params;

  const products = await (await api.get('/products')).data
  const sale = await (await api.get(`sale/${id}`)).data

  if (!isAuth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: {
      sale,
      products 
    }
  }
}