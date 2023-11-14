import { HTMLAttributes, useState } from "react";


interface ButtonProps extends HTMLAttributes<"button">{
  label: string;
  color: string;
  hover: string;
  disabled: boolean;
}

const Button = ({color, hover, label, disabled }: ButtonProps) => {
  
  return (
    <button
      className={`w-full ${color} mt-2 px-3 py-4 rounded transition-all hover:${hover} uppercase font-bold disabled:opacity-60 disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export { Button };