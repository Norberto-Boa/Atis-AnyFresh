import { client } from "../../prisma/client";

interface ICreateProductRequest{
  name: string,
  code: string,
  discountPercentage: number
  price: number,
  bannerUrl: string
}

class createProductUseCase {
  async execute({ name, code, discountPercentage, price, bannerUrl }: ICreateProductRequest) {
    const product = await client.product.create({
      data: {
        name,
        code, 
        discountPercentage,
        price,
        bannerUrl
      }
    })

    console.log(product)

    return { product };
  }
}

export { createProductUseCase };
