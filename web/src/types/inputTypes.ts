export interface IExpenseCreate {
	buyerName: string;
	description: string;
	price: number;
	quantity: number;
}

export interface IProductCreate {
	name: string;
	code: string;
	discountPercentage: number;
	price: number;
	bannerUrl: string;
}

export interface ISaleCreate {
	client_name: string;
	product: string;
	quantity: number;
	paid: number;
	date: Date;
	discount: boolean;
}

export interface Expense {
	id: string;
	buyerName: string;
	description: string;
	price: number;
	quantity: number;
	date: string;
}

export interface IPayment {
	payment_type: string;
	amount: number;
	date: string;
	description: string;
}
