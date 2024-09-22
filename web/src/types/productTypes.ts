interface Product {
	id: string;
	name: string;
	code: string;
	discountPercentage: number;
	price: number;
	bannerUrl: string;
	created_at: string;
	_count: {
		sales: number;
	};
}
