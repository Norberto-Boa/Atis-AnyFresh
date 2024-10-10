import { useRouter } from "next/router";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import { useState } from "react";
import { Check } from "phosphor-react";
import { parseJwt } from "@/utils/parsejwt";
import { SaleInput } from "./SaleInput";
import { useForm } from "react-hook-form";
import type { ISaleCreate } from "@/types/inputTypes";
import { parseCookies } from "nookies";
import { api } from "@/services/api";
import { Button } from "./Button";
import { useAddSale } from "@/hooks/useSales/useSales";
import { Notification } from "./NotificationDialog";

export interface products {
	id: string;
	name: string;
}

interface props {
	products: products[] | undefined;
}

const CreateSaleDialog = ({ products }: props) => {
	const { register, handleSubmit } = useForm<ISaleCreate>();
	const [hasDiscount, setHasDiscount] = useState(false);
	const [buttonDisabled, setButtonDisabled] = useState(false);
	const [open, setOpen] = useState(false);
	const {
		data: sale,
		isPending,
		isSuccess,
		mutate,
		feedback,
		setFeedback,
	} = useAddSale();

	async function handleCreateProduct(data: ISaleCreate) {
		setButtonDisabled(true);
		mutate({
			client_name: data.client_name,
			productId: data.product,
			quantity: Number(data.quantity),
			date: data.date,
			discount: hasDiscount,
			paid: 0,
		});

		setButtonDisabled(false);
	}

	return (
		<Dialog.Portal>
			{feedback && (
				<Notification
					type={feedback.type}
					message={feedback.message}
					onClose={() => setFeedback(null)}
				/>
			)}

			<Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />
			<Dialog.Content className="bg-darkbg fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/4 px-8 py-7 lg:w-96 max-lg:w-80 rounded-lg">
				<Dialog.Title className="text-3xl font-bold text-white mb-4">
					Criar nova venda
				</Dialog.Title>

				<form action="" onSubmit={handleSubmit(handleCreateProduct)}>
					<div className="mb-2">
						<label htmlFor="name" className="font-semibold">
							Escolha o Produto
						</label>

						<select
							{...register("product")}
							name="product"
							id="product"
							className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-full"
							required
						>
							<option value={""} className="text-zinc-500 py-3 px-4">
								Selecione o produto vendido
							</option>
							{products?.map((product, i) => {
								return (
									<option
										key={product.id}
										value={product.id}
										className="text-zinc py-3 px-4"
									>
										{product.name}
									</option>
								);
							})}
						</select>
					</div>

					<div className="mb-2">
						<label htmlFor="client_name" className="font-semibold">
							Nome do cliente
						</label>

						<SaleInput
							required
							label="client_name"
							register={register}
							name="client_name"
							id="client_name"
							type="text"
						/>
					</div>

					<div className="mb-2">
						<label htmlFor="quantity" className="font-semibold">
							Quantidade
						</label>

						<SaleInput
							required
							label="quantity"
							register={register}
							name="quantity"
							id="quantity"
							type="number"
						/>
					</div>
					<div className="mb-4">
						<label htmlFor="date" className="font-semibold">
							Data
						</label>

						<input
							{...register("date")}
							required
							name="date"
							id="date"
							type="date"
							className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 w-[100%] mt-1"
						/>
					</div>

					<div className="flex gap-2 items-center">
						<Checkbox.Root
							className="w-4 h-4 p-3 rounded flex items-center justify-center bg-zinc-700 data-[state=checked]:bg-green-500"
							id="discount"
							name="discount"
							checked={hasDiscount}
							onCheckedChange={(checked) => {
								if (checked === true) {
									setHasDiscount(true);
								} else {
									setHasDiscount(false);
								}
							}}
						>
							<Checkbox.Indicator className="">
								<Check size={16} weight="bold" className="text-white" />
							</Checkbox.Indicator>
						</Checkbox.Root>
						<label htmlFor="discount" className="font-semibold">
							Desconto
						</label>
					</div>

					<Dialog.Close
						className={
							"w-full bg-red-500 text-white mt-4 px-3 py-4 rounded transition-all  uppercase font-bold disabled:opacity-60 disabled:cursor-not-allowed"
						}
					>
						Cancelar
					</Dialog.Close>

					<Button
						color="bg-green-500"
						hover="bg-green-600"
						disabled={buttonDisabled}
						label="Nova Venda"
					/>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
};

export { CreateSaleDialog };
