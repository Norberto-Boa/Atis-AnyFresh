import { baseUrl } from "@/utils/axios";
import { Inter } from 'next/font/google';
import { FormEvent } from "react";
import axios from 'axios';
import { useRouter } from "next/router";

const inter = Inter({ subsets: ['latin'] })



export default function Login() {

  const router = useRouter();

  async function handlelogin(e: FormEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    try {
      await axios.post(`http://localhost:3333/login`, {
        username: data.username,
        password: data.password
      }).then((res) => {
        if (res.data.status === 400) {
          return
        } else {
          localStorage.setItem("token", `Bearer ${res.data.token}`);
          router.push('/');
        }
      })
    } catch (error) {
      return error
    }
  }  

  return (
    <div
      className={`flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ${inter.className}`}
    >
      <div
        className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-zinc-800 border-zinc-700" 
      >
        <div
          className="p-6 space-y-4 md:space-y-6 sm:p-8"
        >
          <h1
            className="text-xl font-bold leading-tight tracking-tight md:text-2xl"
          >
            Faca o seu login
          </h1>

          <form
            action="#"
            className="space-y-4 md:space-y-6"
            onSubmit={handlelogin}
          >
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium"
              >
                Nome do Usuario
              </label>
              <input
                type="text"
                name="username" id="username"
                placeholder="Example: Dona_Mena"
                className="sm:text-sm  rounded-lg block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <input
                type="password"
                name="password" id="password"
                placeholder="••••••••••"
                className="sm:text-sm  rounded-lg block w-full p-2.5 bg-zinc-700 border-zinc-600 placeholder-zinc-400 text-white focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 font-medium rounded-lg text-base px-5 py-2.5 text-center transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}