import * as Dialog from "@radix-ui/react-dialog";
import { PencilSimple, Money } from "phosphor-react";
import { format } from "date-fns";
import Link from "next/link";
import { useState, type ButtonHTMLAttributes } from "react";
import { useDeleteSale } from "@/hooks/useSales/useSales";
import { Notification } from "./NotificationDialog";

interface SalesCardProps {
	id: string;
	name: string;
	price: number;
	product: string;
	quantity: number;
	date: number;
	paid: number;
	discount: boolean;
	discountPercentage: number;
}

const SalesCardDialog = ({
	id,
	name,
	price,
	product,
	quantity,
	date,
	paid,
	discount,
	discountPercentage,
}: SalesCardProps) => {
	const totalPrice = discount
		? (price - (price * discountPercentage) / 100) * quantity
		: price * quantity;
	const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

	const { mutate, feedback, setFeedback } = useDeleteSale(id);

	const handleDelteConfirmation = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		mutate();
	};

	const handleDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setIsConfirmDeleteOpen(true);
	};

	const handleCancelClick = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();
		setIsConfirmDeleteOpen(false);
	};

	return (
		<>
			{feedback && (
				<Notification
					type={feedback.type}
					message={feedback.message}
					onClose={() => setFeedback(null)}
				/>
			)}

			<Dialog.Portal>
				<Dialog.Overlay className="bg-white/20 min-w-full min-h-screen fixed inset-0 animate-overlay-show" />

				<Dialog.Content className="bg-darkbg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-8 py-7 w-96 rounded-lg">
					<Dialog.Title className="text-3xl font-bold text-white mb-4 flex justify-between">
						<span>{name}</span>
						{totalPrice} MT
					</Dialog.Title>

					<div className="flex justify-between w-full mb-2">
						<span className="font-semibold text-lg">Produto:</span>
						<span className="font-bold text-lg">{product}</span>
					</div>

					<div className="flex justify-between w-full mb-2">
						<span className="font-semibold text-lg">Quantidade:</span>
						<span className="font-bold text-lg">{quantity}</span>
					</div>

					<div className="flex justify-between w-full mb-2">
						<span className="font-semibold text-lg">Preço:</span>
						<span className="font-bold text-lg">{price} MT</span>
					</div>

					<div className="flex justify-between w-full mb-2">
						<span className="font-semibold text-lg">Preço Total:</span>
						<span className="font-bold text-lg">{totalPrice} MT</span>
					</div>

					<div className="flex justify-between w-full mb-2">
						<span className="font-semibold text-lg">Valor Pago:</span>
						<span className="font-bold text-lg">{paid} MT</span>
					</div>

					<div className="flex justify-between w-full mb-2">
						<span className="font-semibold text-lg">Divida:</span>
						<span className="font-bold text-lg">{totalPrice - paid} MT</span>
					</div>

					<span className="mb-2 text-base font-semibold text-zinc-500">
						{format(date, "dd/MM/yyyy")}
					</span>

					{isConfirmDeleteOpen ? (
						<div className="flex gap-2">
							<button
								type="button"
								className="w-full border-2 border-blue-500 text-blue-500 mt-4 px-3 py-4 rounded transition-all duration-700 hover:bg-blue-600 hover:text-white uppercase font-bold flex items-center gap-3 justify-center flex-row-reverse"
								onClick={handleCancelClick}
							>
								Cancelar
							</button>

							<button
								type="button"
								className="w-full border-2 border-red-500 text-red-500 mt-4 px-3 py-4 rounded transition-all duration-700 hover:bg-red-600 hover:text-white uppercase font-bold flex items-center gap-3 justify-center flex-row-reverse"
								onClick={handleDelteConfirmation}
							>
								Confirmar
							</button>
						</div>
					) : (
						<div className="flex gap-2">
							<Link
								href={`sale/${id}/edit`}
								className="w-full border-2 border-blue-500 text-blue-500 mt-4 px-3 py-4 rounded transition-all duration-700 hover:bg-blue-600 hover:text-white uppercase font-bold flex items-center gap-3 justify-center flex-row-reverse"
							>
								<PencilSimple size={24} weight="bold" />
								Editar
							</Link>

							<button
								type="button"
								className="w-full border-2 border-red-500 text-red-500 mt-4 px-3 py-4 rounded transition-all duration-700 hover:bg-red-600 hover:text-white uppercase font-bold flex items-center gap-3 justify-center flex-row-reverse"
								onClick={handleDeleteClick}
							>
								Apagar
							</button>
						</div>
					)}

					<Link
						href={`payment/${id}/create`}
						className="w-full bg-green-500 border-2 border-green-400 text-white mt-2 px-3 py-4 rounded transition-all duration-700 hover:bg-green-600 hover:text-white uppercase font-bold flex items-center gap-3 justify-center flex-row-reverse"
					>
						<Money size={24} weight="bold" />
						Pagar
					</Link>
				</Dialog.Content>
			</Dialog.Portal>
		</>
	);
};

export { SalesCardDialog };
