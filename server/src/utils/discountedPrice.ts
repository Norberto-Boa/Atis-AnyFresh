const totalPrice = (price: number, discount : boolean, quantity : number, discountP: number) => {
  if (discount) {
    const percentage = discountP / 100
    const Price = price - (price * percentage);
    const TP = Price * quantity
    return TP
  }

  const TP = price * quantity
  return TP;
}

export {totalPrice}