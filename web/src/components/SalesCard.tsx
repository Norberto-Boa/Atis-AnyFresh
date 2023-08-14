import { format, isFuture, isPast, addDays } from 'date-fns';
import * as Dialog from '@radix-ui/react-dialog';
import { SalesCardDialog } from "./SalesCardDialog";

interface SalesProps{
  id: string,
  name: string,
  price: number,
  paid: number,
  date: number,
  product: string,
  payment_type: string,
  discount: boolean
  quantity: number,
  discountPercentage:number,
  Payment?: {
    amount: number,
    payment_type: string,
  }[]
}
type StatusIR = 'paid' | 'pending' | 'expired'


const SalesCard = ({id, name, price, paid, date, product, payment_type, quantity, Payment, discountPercentage, discount }: SalesProps) => {

  const expirationDate = addDays(date, 15);

  if (paid == price) {
    status = 'paid'
  } else if (paid < price && isFuture(expirationDate)) {
    status = 'pending'
  } else if (paid < price && isPast(expirationDate))  {
    status = 'expired'
  }

  Payment?.forEach(payment => {
    return paid += payment.amount;
  })

  const totalPrice = discount ?  ((price - (price *discountPercentage/100)) * quantity): (price * quantity)


  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={`w-80 h-36 ${paid === totalPrice ? "bg-green-600" : (paid < totalPrice && isFuture(expirationDate)) ? "bg-transparent border border-zinc-400" : "bg-red-600"} rounded-lg py-6 px-5`}
      >
        <SalesCardDialog
          discount={discount}
          discountPercentage={discountPercentage}
          id={id}
          name={name}
          paid={paid}
          date={date}
          price={price}
          product={product}
          quantity={quantity}
        />
        <div
          className="width-full flex justify-between items-end" 
        >
          <h2
            className="text-2xl font-extrabold"
          >
            {name}
          </h2>
          
          <h2
            className="text- font-extrabold"
          >
            {totalPrice} MT
          </h2>
          

        </div>
              
        <div
          className="w-full flex justify-between mt-6"
        >
          <span className="font-semibold text-lg">{product}</span>
          <span className="font-semibold text-xl text-zinc-200">{quantity}</span>
        </div>
              
        <div
          className="w-full flex justify-between"
        >
          
          <span>{format(date, 'dd/MM/yyyy')}</span>
          <span className="font-semibold text-xl text-zinc-200">{payment_type}</span>
        </div>
      </Dialog.Trigger>
    </Dialog.Root>
      
  )
}

export { SalesCard };