import { ProductDialog } from "@/components/ProductDialog";
import { Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { CreateProductDialog } from "@/components/CreateProductDialog";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { GetServerSideProps } from "next";
import { api } from "@/services/api";


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

interface Props{
  products: productResponse[]
}
export default function Products({products}: Props) {
  return (
    <div
      className={`ml-80 pt-16 text-white `}
    >
      <div className="p-16">
        <h1
          className={`text-2xl font-semibold`}
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

        <div className="flex gap-4 flex-wrap">
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
            <p>Nao existm produtos registados, clique em + para registar!</p>  
          }

        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuth = AuthOnServerSide(ctx);

  if (!isAuth) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false
      }
    }
  }

  const products: productResponse[] = await api.get(`/products`)
    .then((res) => { return res.data })
    .catch((err) => { console.log(err) });

  return {
    props: {
      products
    }
  }
}
