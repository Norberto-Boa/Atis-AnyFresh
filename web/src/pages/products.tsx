import { ProductDialog } from "@/components/ProductDialog";
import { Inter } from 'next/font/google';
import { Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateProductDialog } from "@/components/CreateProductDialog";
import { useEffect, useState } from "react";
import axios from "axios";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ['latin'] })

interface productResponse{
  id: string,
  name: string,
  code: string,
  discountPercentage: number,
  price: number,
  bannerUrl: string,
  created_at: string,
  _count: {
    sales: number
  }
}

export default function Products() {
  const [products, setProducts] = useState<productResponse[]>();

  useEffect(() => {
    axios.get('http://localhost:3333/products')
      .then((res) => {
        setProducts(res.data);
      }).catch((err) => console.log(err));
  })

  return (
    <div
      className={`ml-80 pt-16 text-white ${inter.className}`}
    >
      <div className="p-16">
        <h1
          className={`${inter.className} text-2xl font-semibold`}
        >
          Produtos
        </h1>

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />
        
        <div
          className="p-4 bg-white text-black w-fit rounded-full flex items-center justify-center shadow-md mb-12"
        >
          <Dialog.Root>
            <Dialog.Trigger>
              <Plus size={24} />
            </Dialog.Trigger>
            
            <Dialog.Portal>
              <CreateProductDialog />
            </Dialog.Portal>
          </Dialog.Root>
        </div>

        <div className="flex gap-4">
          {products ? 
            products.map((product) => {
              return (
                <ProductDialog
                  key={product.id}
                  name={product.name}
                  bannerUrl={product.bannerUrl}
                  code={product.code}
                  discountPercentage={product.discountPercentage}
                  price={product.price}
                  sales={product._count.sales}
                />
            )
            }) 
            :
            <p>Nao existem produtos registados, clique em + para registar!</p>  
          }

        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  AuthOnServerSide(ctx);
  return {
    props: {
      
    }
  }
}
