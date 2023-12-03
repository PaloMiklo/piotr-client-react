import { SubmitHandler } from "react-hook-form";
import { IOrder } from "../../model/config";

export interface IOrderFormProps { onSubmit: SubmitHandler<IOrder>; }