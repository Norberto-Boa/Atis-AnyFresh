import { CheckCircle, WarningCircle, XCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export interface NotificationProps {
	type: "success" | "error" | "warning";
	message: string;
	onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
	type,
	message,
	onClose,
}) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose(); // Call the onClose function after 5 seconds
		}, 5000);

		// Cleanup the timer on unmount
		return () => clearTimeout(timer);
	}, [onClose]);

	const getIcon = () => {
		switch (type) {
			case "success":
				return <CheckCircle size={36} className="text-green-500" />;
			case "error":
				return <XCircle size={36} className="text-red-500" />;
			case "warning":
				return <WarningCircle size={36} className="text-orange-500" />;
			default:
				return null;
		}
	};

	const getTitle = () => {
		switch (type) {
			case "success":
				return "Success";
			case "error":
				return "Error";
			case "warning":
				return "Warning";
			default:
				return "";
		}
	};

	const getTitleColor = () => {
		switch (type) {
			case "success":
				return "text-green-500";
			case "error":
				return "text-red-500";
			case "warning":
				return "text-orange-500";
			default:
				return "";
		}
	};

	return (
		<div
			className={`fixed bottom-5 right-5 bg-white shadow-lg rounded-lg py-3 px-8 flex items-center space-x-4 border-l-4 z-[9999] 
        ${
					type === "success"
						? "border-green-500"
						: type === "error"
							? "border-red-500"
							: "border-orange-500"
				}`}
		>
			<div>{getIcon()}</div>
			<div>
				<h4 className={`text-lg font-semibold ${getTitleColor()}`}>
					{getTitle()}
				</h4>
				<p className="text-slate-800 font-semibold">{message}</p>
			</div>
		</div>
	);
};

export { Notification };
