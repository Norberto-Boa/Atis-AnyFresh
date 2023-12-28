import { PaymentResponse } from "@/@types/userTypes";
import { api } from "@/services/api";
import { AuthOnServerSide } from "@/services/serverSideAuth";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { format } from "date-fns";
import { PaginationButtons } from "@/components/PaginationButtons";

interface paymentResponse {
  payments: PaymentResponse[];
  count: number;
}

interface Props {
  payments: PaymentResponse[];
  count: number;
  page: number;
}

export default function Payment({ payments, count, page }: Props) {
  return (
    <div className={`xl:ml-80 max-lg:pt-16 max-md:pt-12 text-white`}>
      <Head>
        <title>Pagamentos | AnyFresh</title>
      </Head>

      <div className="xl:p-16 px-6">
        <h1 className="text-2xl font-semibold tracking-wide">Pagamentos</h1>

        {/* Divider line */}
        <div className={`w-full h-[1px] bg-zinc-700 my-8`} />

        <div className="flex justify-between mb-4 items-center max-md:flex-col">
          <PaginationButtons
            count={count}
            page={page}
            url="/payments"
            items={10}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-zinc-600 text-base">
            <thead className="ltr:text-left rtl:text-right border-t-2 border-zinc-600">
              {/* TableHeaders */}
              <tr>
                <th className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start">
                  Nome do Cliente
                </th>

                <th className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start">
                  Produto
                </th>

                <th className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start">
                  Data
                </th>

                <th className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start">
                  Preco total
                </th>

                <th className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start">
                  Valor Pago
                </th>

                <th className="whitespace-nowrap px-4 pt-4 pb-2 font-medium text-zinc-100 text-start">
                  Data do pagamento
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {payments ? (
                payments.map((payment) => {
                  return (
                    <tr className="odd:bg-zinc-900" key={payment.id}>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100">
                        {payment.sale.client_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100">
                        {payment.sale.Product.name}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100/60">
                        {format(new Date(payment.sale.date), "dd/MM/yyyy")}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100">
                        {payment.sale.quantity * payment.sale.Product.price}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100">
                        {payment.amount}
                      </td>

                      <td className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100/60">
                        {format(new Date(payment.date), "dd/MM/yyyy")}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p>Nao existe nenhum pagamento</p>
              )}
            </tbody>
          </table>
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

  const data: paymentResponse = await api
    .get(`/payments?page=${page}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(data);
  return {
    props: {
      payments: data.payments,
      count: data.count,
      page: +page,
    },
  };
};
