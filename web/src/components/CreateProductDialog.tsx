import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { parseJwt } from "@/utils/parsejwt";
import { ProductInput } from "./productInput";
import { IProductCreate } from "@/@types/inputTypes";
import { api } from "@/services/api";
import { parseCookies } from "nookies";



const CreateProductDialog = () => {
  const { register, handleSubmit } = useForm<IProductCreate>();
  const router = useRouter();

  const handleProductCreation = async(data : IProductCreate) =>{
    const {['atis.token']: token} = parseCookies();
    const decodedToken = parseJwt(token);
    const id = decodedToken.sub;

    try {
      await api.post(`/product`, {
        name: data.name, 
        code: data.code,
        price: Number(data.price),
        discountPercentage: Number(data.discountPercentage),
        bannerUrl: data.bannerUrl
      }, {
        headers: {
          user: id
        }
      }).then(() => {
        router.reload();
      })
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
      <Dialog.Content
        className="bg-darkbg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 px-8 py-7 w-96 rounded-lg"
      >

        <Dialog.Title
          className="text-3xl font-bold text-white mb-4"
        >
          Create a new Product
        </Dialog.Title>

        <form action=""
          onSubmit={handleSubmit(handleProductCreation)}
        >


          <div
            className="mb-2"
          >
            <label
              htmlFor="name"
              className="font-semibold"
            >
              Name
            </label>
            
            <ProductInput 
            label="name"
            register={register} 
            id="name" type="text"/>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="code"
              className="font-semibold"
            >
              Code
            </label>
            
            <ProductInput 
            label="code"
            register={register} 
            name="code" id="code" type="text"/>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="price"
              className="font-semibold"
            >
              Price
            </label>
            
            <ProductInput 
            label="price"
            register={register} 
            name="price" id="price" type="number"/>
          </div>

          <div
            className="mb-2"
          >
            <label
              htmlFor="discountPercentage"
              className="font-semibold"
            >
              Discount (%)
            </label>
            
            <ProductInput 
            label="discountPercentage"
            register={register} 
            name="discountPercentage" id="discountPercentage" type="number"/>
          </div>
          
          <div
            className="mb-2"
          >
            <label
              htmlFor="bannerUrl"
              className="font-semibold"
            >
              Banner
            </label>
            
            <ProductInput 
            label="bannerUrl"
            register={register}
             name="bannerUrl" id="bannerUrl" type="text"/>
          </div>

          <button
            className="w-full bg-emerald-500 mt-2 px-3 py-4 rounded transition-all hover:bg-emerald-600 uppercase font-bold"
          >
            Create Product
          </button>
        </form>


      </Dialog.Content>
    </Dialog.Portal>
  )
}

export { CreateProductDialog };