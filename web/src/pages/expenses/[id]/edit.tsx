import { Inter } from "@next/font/google";
import { useRouter } from 'next/router';

const inter = Inter({subsets: ['latin']})

export default function Edit() {
  const router = useRouter();
  const id = router.query['id'];

  return (
    <div
      className={`ml-80 pt-16 text-white ${inter.className}`}
    >
      <div
        className="p-16"
      >
        <h1
          className={`${inter.className} text-2xl font-semibold`}
        >
          Editar gasto feito por {id}
        </h1>

      {/* Divider line */}

      <div className={`w-full h-[1px] bg-zinc-700 my-12`} />

      {/*Form de edicao*/}

      

      
      </div>
    </div>
  )
}
