import { MagnifyingGlass, Plus } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { SalesCard } from "@/components/SalesCard";
import { CreateSaleDialog } from "@/components/CreateSaleDialog";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { salesResponse } from "@/@types/userTypes";
import Head from "next/head";
import { PaginationButtons } from "@/components/PaginationButtons";
import { products } from "../components/CreateSaleDialog";
import { whatIsPaid } from "@/utils/isPaid";

interface PropsSale {
  sales: salesResponse[];
  page: number;
  count: number;
  products: products[];
}

export default function Sales({ sales, page, count, products }: PropsSale) {
  let money = 0;
  let paid = 0;
  sales.map((sale) => {
    return (money = money + sale.TotalPrice);
  });

  sales.map((sale) => {
    sale?.Payment?.forEach((payment) => {
      return (paid += payment.amount);
    });
  });

  return (
    <div className={`xl:ml-80 pt-16 max-md:pt-12 text-white`}>
      <Head>
        <title>Vendas | AnyFresh</title>
      </Head>

      <div className="xl:p-16 px-6">
        <h1 className={` text-2xl font-semibold`}>Vendas</h1>

        {/* Divider line */}

        <div className={`w-full h-[1px] bg-zinc-700 my-10`} />

        <div className="flex gap-4 mb-4 justify-between">
          {/* Create new Sale dialog trigger */}
          <Dialog.Root>
            <Dialog.Trigger className="flex items-center border py-1 w-60 px-1 lg:px-4 lg:py-3 gap-1 justify-center rounded text-emerald-400 border-emerald-400 transition-all hover:text-emerald-500 hover:border-emerald-500">
              <Plus size={24} />
              <span className="font-semibold">Nova Compra</span>
            </Dialog.Trigger>

            <CreateSaleDialog products={products} />
          </Dialog.Root>

          <h1 className="lg:text-2xl font-bold text-green-500">
            <span className="text-white">Pagamento esperado:</span>
            <span> {money - paid} MT</span>
          </h1>
        </div>

        <div className="flex justify-between max-md:justify-center items-center mb-4 flex-wrap gap-2">
          {/* Search input and button */}
          <div className="flex items-center gap-2 flex-wrap max-md: justify-center">
            {/* <div className="py-2 px-2 border border-r-0 border-zinc-600 rounded">
              <MagnifyingGlass size={26} weight="bold"/>
            </div> */}
            <input
              type="text"
              className="max-md:w-full md:w-80 border-2 border-zinc-600 bg-zinc-900 py-3 px-4 rounded text-base placeholder:text-zinc-500"
              placeholder="Procure pelo nome..."
            />

            <button className="flex text-lg gap-2 py-3 px-5 bg-green-600 rounded justify-center items-center font-semibold max-md:w-full">
              Procurar
              <MagnifyingGlass size={24} weight="bold" />
            </button>
          </div>

          <div className="flex gap-2 items-center justify-center">
            <PaginationButtons
              count={count}
              page={page}
              url="sales"
              items={12}
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap max-lg:justify-center justify-between">
          {sales ? (
            sales.map((sale, i) => {
              return (
                <SalesCard
                  id={sale.id}
                  paid={0}
                  Payment={sale.Payment}
                  discount={sale.discount}
                  name={sale.client_name}
                  date={Date.parse(sale.date)}
                  payment_type={whatIsPaid(sale.TotalPrice, sale.Payment)}
                  price={sale.Product.price}
                  product={sale.Product.name}
                  discountPercentage={sale.Product.discountPercentage}
                  quantity={sale.quantity}
                  key={sale.id}
                />
              );
            })
          ) : (
            <p>There is no sale </p>
          )}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const isAuth = AuthOnServerSide(ctx);
  let page = ctx.query.page ?? 1;

  if (!isAuth) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const endpoints = ["/products", `/sales?page=${page}`];

  const res = await Promise.all([api.get(endpoints[0]), api.get(endpoints[1])]);

  const [res1, res2] = res;

  const products = res1.data;
  const data = res2.data;

  return {
    props: {
      sales: data.Sales,
      page: +page,
      count: data.count,
      products: products,
    },
  };
};
