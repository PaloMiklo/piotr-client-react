import { ICartLine } from "../../../model/config";

export const recalculateCartPrice = (cartLines: ICartLine[]): number => cartLines.reduce((acc: number, curr: ICartLine) => acc + curr.product.price * curr.amount, 0);
export const hasFreeShippingClaim = (cartLines: ICartLine[], freeShipping: number): boolean => recalculateCartPrice(cartLines) > freeShipping;
