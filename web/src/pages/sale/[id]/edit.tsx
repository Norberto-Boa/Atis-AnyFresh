import {useRouter} from "next/router";
import { ProductData } from "@/@types/_types";
import { salesResponse } from "@/@types/userTypes";
import { api } from "@/services/api";
import { Inter, Roboto } from "@next/font/google"
import { useEffect, useState } from "react";

const roboto = Roboto({
  weight: ['400', '500', '700', '900', '300'],
  subsets: ["latin"]
})


export default async function Edit() {
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState<ProductData[]>([]);
  const [sale, setSale] = useState<salesResponse>();

  useEffect(() => {
    api.get(`/products`)
      .then(res => {
        setProducts(res.data);
      });
    
    api.get(`/sale/${id}`).then(res => setSale(res.data));
    
  }, [id]);
  
  return (
    <div
      className={`ml-80 pt-16 text-white ${roboto.className}`}
    >
      <div
        className="p-16"
      >
        <h1
          className={`text-2xl font-semibold`}
        >
          Editar pagamento da venda feita para - no dia;
        </h1>

        <h2
          className={`mt-4 font-semibold text-xl`}
        > 

        </h2>

        {/* Divider line */}

        <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

        {/*Edit Form */}
        <form>
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

        </form>

      </div>
    </div>
  )
}