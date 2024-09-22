import { CheckCircle, WarningCircle, XCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export interface NotificationProps {
	type: "success" | "error" | "warning";
	message: string;
}

const Notification: React.FC<NotificationProps> = ({ type, message }) => {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		// Auto-dismiss the notification after 5 seconds
		const timer = setTimeout(() => {
			setVisible(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

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

	return visible ? (
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
	) : null;
};

export { Notification };
