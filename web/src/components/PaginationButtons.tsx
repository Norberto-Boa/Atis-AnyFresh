import { CaretLeft, CaretRight } from "phosphor-react";
import { useRouter } from "next/router";

interface PaginationButtonsProps{
  page: number,
  count: number
  url: string
}

const PaginationButtons = ({page, count, url} : PaginationButtonsProps) => {
  const router = useRouter();
  const lastPage = Math.ceil(count / 12);

  return (
    <div
      className="flex gap-2 items-center"
    >
      <button 
        className="p-2 border border-zinc-700 rounded-md hover:border-zinc-600 transition-all text-zinc-300 disabled:border-zinc-800 disabled:text-zinc-700 disabled:cursor-not-allowed"
        onClick={() => router.push(`${url}?page=${page - 1}`)}
        disabled={page <= 1}
      >
        <CaretLeft size={24} />
      </button>
      <span className="text-zinc-300">{page}</span>
      <span className="text-zinc-400">/ {lastPage}</span>
      <button 
        className={`p-2 border border-zinc-700 rounded-md hover:border-zinc-600 transition-all text-zinc-300 disabled:border-zinc-800 disabled:text-zinc-700 disabled:cursor-not-allowed`}
        onClick={() => router.push(`${url}?page=${page + 1}`)}
        disabled={page >= lastPage}
      >
        <CaretRight size={24} />
      </button>
    </div>
  )
}

export { PaginationButtons };