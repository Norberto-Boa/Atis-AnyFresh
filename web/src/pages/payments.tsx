import { salesResponse } from "@/@types/userTypes";
import { Roboto } from "@next/font/google";
import { api } from "@/services/api";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { GetServerSideProps } from "next";
import Head from "next/head";

const roboto = Roboto({
  weight:["100", "300", "400", "500", "700", "900"],
  subsets: ['cyrillic']
})


interface Props{
  sales: salesResponse[]
}

export default function Payment({sales}: Props) {

  return (
    <div
      className={`ml-80 pt-16 text-white ${roboto.className}`}
    >
      <Head>
        <title>Pagamentos | AnyFresh</title>
      </Head>

      <div
        className="p-16"
      >
        <h1
          className="text-2xl font-semibold tracking-wide"
        >
          Pagamentos
        </h1>

        {/* Divider line */}
        <div className={`w-full h-[1px] bg-zinc-700 my-10`} />

        <div
          className="overflow-x auto"
        > 
          <table
            className="min-w-full divide-y-2 divide-zinc-600 text-base"
          >
            <thead
              className="ltr:text-left rtl:text-right border-t-2 border-zinc-600"
            >
              <tr>
                <th
                  className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start"
                >
                  Nome do Cliente
                </th>

                <th
                  className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start"
                >
                  Produto
                </th>
                
                <th
                  className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start"
                >
                  Data
                </th>
                
                <th
                  className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start"
                >
                  Preco total
                </th>
                
                <th
                  className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start"
                >
                  Valor Pago
                </th>

                <th
                  className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start"
                >
                  Pagamentos
                </th>           
              </tr>
            </thead>
          </table>
        </div>

      </div>
    </div>  
  ) 
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuth = AuthOnServerSide(ctx);
  let page = ctx.query.page ?? 1;

  if (!isAuth) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  const data = await api.get(`/sales?page=${page}`)
    .then(res => { return res.data })
    .catch(err => {console.log(err)});

  return {
    props: {
      sales: data.Sales
    }
  }
}