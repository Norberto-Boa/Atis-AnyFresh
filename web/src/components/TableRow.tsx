import { format } from "date-fns";
import Link from "next/link";
import { Pencil, Trash } from "phosphor-react";

interface expenseIR {
  id: string
  name: string,
  productName: string,
  date: Date,
  price: number,
  quantity: number,
}

const TableRow = ({ id, name, productName, date, price, quantity} : expenseIR) => {
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
          <Pencil size={18} weight="bold" />
        </Link>
        <Link
          href="#"
          className="inline-block rounded bg-red-600 px-2 py-2 text-xs font-medium transition-all text-white hover:bg-red-700"
        >
          <Trash size={18} weight="bold" />
        </Link>
      </td>
    </tr>
  )
}

export { TableRow };