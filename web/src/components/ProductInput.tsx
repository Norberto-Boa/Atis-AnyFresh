import { IProductCreate } from "@/@types/inputTypes";
import { InputHTMLAttributes } from "react";
import { Path, UseFormRegister } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{ 
  label: Path<IProductCreate>,
  register: UseFormRegister<IProductCreate>
}

const ProductInput = (props: InputProps) => {
  return (
    <input
      {...props.register(props.label)}  
      className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
    />
  )
}

export { ProductInput };