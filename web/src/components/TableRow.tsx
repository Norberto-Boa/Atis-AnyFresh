import { format } from "date-fns";
import Link from "next/link";
import { Pencil, Trash } from "phosphor-react";
import * as AlertDialog from '@radix-ui/react-alert-dialog';

interface expenseIR {
  id: string
  name: string,
  productName: string,
  date: Date,
  price: number,
  quantity: number,
  deleteFunction: (id: string) => void
}

const TableRow = ({ id, name, productName, date, price, quantity, deleteFunction} : expenseIR) => {
  return (
    <tr className="odd:bg-zinc-900">
      <td className="whitespace-nowrap px-4 py-2 font-medium text-zinc-100">
        {name}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-zinc-100">
        {productName}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-zinc-100">
        {format(date, "dd/MM/yyyy")}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-zinc-100">
        {price}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-zinc-100">
        {quantity}
      </td>
      <td className="whitespace-nowrap px-4 py-2 text-zinc-100">
        {price * quantity}
      </td>
      <td className="whitespace-nowrap px-4 py-2 flex gap-2">
        <Link
          href={`/expenses/${id}/edit`}
          className="inline-block rounded bg-green-600 px-2 py-2 text-xs font-medium transition-all text-white hover:bg-green-700"
        >
          <Pencil size={20} weight="bold" />
        </Link>
        <AlertDialog.Root
        >
          <AlertDialog.Trigger asChild>
            <div
              className="inline-block rounded bg-red-600 px-2 py-2 text-xs font-medium transition-all text-white hover:bg-red-700"
            >
              <Trash size={20} weight="bold" />
            </div>
          </AlertDialog.Trigger>
          <AlertDialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
          <AlertDialog.Content
            className="bg-darkbg absolute top-1/2 left-1/2 -translate-x-1/2 px-8 py-7 w-auto rounded-lg"
          >
            <AlertDialog.Title
              className="text-3xl font-bold text-red-500 mb-4 tracking-wider"
            >
              Apagar gasto?
            </AlertDialog.Title>

            <AlertDialog.Description
              className="text-zinc-200 text-xl"
            >
              Tem certeza que quer apagar este gasto? <span className="tracking-wide font-semibold"><br/>NB: Gastos apagados nao podem ser recuperados! </span>
            </AlertDialog.Description>

            <div
              className="flex gap-4 justify-end mt-8"
            >
              <AlertDialog.Cancel
                className="bg-purple-600 w-28 h-12 rounded transition-all hover:bg-purple-700 uppercase font-bold text-center"
              >
                Cancelar
              </AlertDialog.Cancel>
              
              <AlertDialog.Action
                className="bg-red-600 w-28 h-12 rounded transition-all hover:bg-red-700 uppercase font-bold text-center"
                onClick={() => deleteFunction(id)}
                
              >
                Apagar
              </AlertDialog.Action>
            </div>

          </AlertDialog.Content>

        </AlertDialog.Root>
      </td>
    </tr>
  )
}

export { TableRow };