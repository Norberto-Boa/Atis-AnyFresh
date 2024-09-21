import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import { parseJwt } from "@/utils/parsejwt";
import { ProductInput } from "./ProductInput";
import type { IProductCreate } from "@/types/inputTypes";
import { api } from "@/services/api";
import { parseCookies } from "nookies";
import { useState } from "react";
import { Button } from "./Button";
import { useAddProduct } from "@/hooks/useProducts/useProducts";

const CreateProductDialog = () => {
	const { register, handleSubmit } = useForm<IProductCreate>();
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const router = useRouter();
	const { data: product, isPending, isSuccess, mutate } = useAddProduct();

	const handleProductCreation = async (data: IProductCreate) => {
		setButtonDisabled(true);
		const { "atis.token": token } = parseCookies();
		const decodedToken = parseJwt(token);
		const id = decodedToken.sub;
		mutate({
			name: data.name,
			code: data.code,
			price: Number(data.price),
			discountPercentage: Number(data.discountPercentage),
			bannerUrl: data.bannerUrl,
		});
	};

	return (
		<Dialog.Portal>
			<Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
			<Dialog.Content className="bg-darkbg fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4 px-8 py-7 lg:w-96 max-lg:w-80 rounded-lg">
				<Dialog.Title className="text-3xl font-bold text-white mb-4">
					Create a new Product
				</Dialog.Title>

				<form action="" onSubmit={handleSubmit(handleProductCreation)}>
					<div className="mb-2">
						<label htmlFor="name" className="font-semibold">
							Name
						</label>

						<ProductInput
							label="name"
							register={register}
							id="name"
							type="text"
							required
						/>
					</div>

					<div className="mb-2">
						<label htmlFor="code" className="font-semibold">
							Code
						</label>

						<ProductInput
							required
							label="code"
							register={register}
							name="code"
							id="code"
							type="text"
						/>
					</div>

					<div className="mb-2">
						<label htmlFor="price" className="font-semibold">
							Price
						</label>

						<ProductInput
							required
							label="price"
							register={register}
							name="price"
							id="price"
							type="number"
						/>
					</div>

					<div className="mb-2">
						<label htmlFor="discountPercentage" className="font-semibold">
							Discount (%)
						</label>

						<ProductInput
							required
							label="discountPercentage"
							register={register}
							name="discountPercentage"
							id="discountPercentage"
							type="number"
						/>
					</div>

					<div className="mb-2">
						<label htmlFor="bannerUrl" className="font-semibold">
							Banner
						</label>

						<ProductInput
							required
							label="bannerUrl"
							register={register}
							name="bannerUrl"
							id="bannerUrl"
							type="text"
						/>
					</div>

					<Dialog.Close
						className={
							"w-full bg-red-500 text-white mt-4 px-3 py-4 rounded transition-all  uppercase font-bold disabled:opacity-60 disabled:cursor-not-allowed"
						}
					>
						Cancelar
					</Dialog.Close>

					<Button
						color="bg-emerald-500"
						hover="bg-emerald-600"
						label="Create Product"
						disabled={buttonDisabled}
					/>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
};

export { CreateProductDialog };
