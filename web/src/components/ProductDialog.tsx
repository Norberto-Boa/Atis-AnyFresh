import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";

import Link from "next/link";
import { NotePencil } from "phosphor-react";



interface ProductDialogProps{
  name: string,
  code: string,
  discountPercentage: number,
  sales: number,
  price: number,
  bannerUrl: string,
}

const ProductDialog = ({name, code, bannerUrl, discountPercentage, price, sales}: ProductDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={`font-medium relative rounded-lg overflow-hidden group`}
      >
        <Image
          src={bannerUrl}
          alt=" Background"
          width={300}
          height={300}
          className="group-hover:scale-110 transition-all duration-1000 object-fill w-[320px] h-[250px]"
        /> 
        <div
          className="absolute w-full h-full bg-black/40 inset-0 overflow-hidden"
        />
        <h1
         className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-3xl`}
        >
          {name}
        </h1>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
        <Dialog.Content
          className="bg-darkbg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-7 w-96 rounded-lg"
        >
          <Dialog.Title
            className="text-3xl font-bold text-white mb-4"
          >
            {name} / <span className="font-semibold">{code}</span>   
          </Dialog.Title>

          <h1 className="text-2xl font-semibold mb-4">Detalhes</h1>
          
          <div className="mb-4">
            <p className="text-xl font-medium"><strong>Preco:</strong> {price}MT</p>
          </div>
          
          <div className="mb-4">
            <p className="text-xl font-medium"><strong>% Promocional:</strong> {discountPercentage}%</p>
          </div>
          
          <div
            className="mb-4"
          >
            <p className="text-xl font-medium"><strong>Vendas:</strong> {sales}</p>
          </div>

          <div
            className="mb-8"
          >
            <p className="text-xl font-medium"><strong>Valor produzido:</strong> {sales * price} MT</p>
          </div>

          <div
            className="flex justify-between"
          >
            <Dialog.Close
              className="w-[49%] px-4 py-3 bg-red-500 rounded font-medium text-xl"
            >
              Fechar
            </Dialog.Close>
            <Link
              href={`#`}
              className="w-[49%] px-4 py-3 bg-emerald-500 rounded font-medium text-xl gap-2 flex justify-center items-center"
            >
              <NotePencil size={24} weight="fill"/>
              Editar
            </Link>
          </div>

        </Dialog.Content>
      </Dialog.Portal>

    </Dialog.Root>
  )
}

export { ProductDialog };