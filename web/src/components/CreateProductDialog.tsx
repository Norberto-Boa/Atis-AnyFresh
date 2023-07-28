import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { Input } from "./Input";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { parseJwt } from "@/utils/parsejwt";



const CreateProductDialog = () => {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discountPercentage: 0,
    price: 0,
    bannerUrl: ""
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({...prevFormData, [name]: value}))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault();

    const bearerToken = localStorage.getItem("token");
    const [, token] = bearerToken?.split(" ");
    const decodedToken = parseJwt(token);
    const id = decodedToken.sub;

    try {
      await axios.post(`http://localhost:3333/product`, {
        name: formData.name, 
        code: formData.code,
        price: Number(formData.price),
        discountPercentage: Number(formData.discountPercentage),
        bannerUrl: formData.bannerUrl
      }, {
        headers: {
          Authorization: token,
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
          onSubmit={handleSubmit}
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
            
            <Input onChange={handleChange} name="name" id="name" type="text"/>
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
            
            <Input onChange={handleChange} name="code" id="code" type="text"/>
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
            
            <Input onChange={handleChange} name="price" id="price" type="number"/>
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
            
            <Input onChange={handleChange} name="discountPercentage" id="discountPercentage" type="number"/>
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
            
            <Input onChange={ handleChange} name="bannerUrl" id="bannerUrl" type="text"/>
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