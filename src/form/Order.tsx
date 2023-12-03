import { ReactElement } from 'react';
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { IOrder } from '../model/config';
import { IOrderFormProps } from './Order.config';

const OrderForm: React.FC<IOrderFormProps> = ({ onSubmit }): ReactElement => {
    const {
        control,
        handleSubmit: handleFormSubmit,
        formState: { errors },
    } = useForm<IOrder>();

    const onSubmitHandler: SubmitHandler<IOrder> = (data) => {
        console.log('Form value -> ', data);

        // call the external onSubmit function passed as a prop
        onSubmit(data);
    };
    return (
        <form onSubmit={handleFormSubmit(onSubmitHandler)}>
            {/* Cart Section */}
            < div >
                <label>Cart </label>

            </div>

            {/* Customer Section */}
            <div>
                <label>Customer </label>

            </div>

            {/* Shipping Section */}
            <div>
                <label>Shipping </label>

            </div>

            {/* Billing Section */}
            <div>
                <label>Billing </label>

            </div>

            <div>
                <label>Created UI </label>
                < Controller
                    name="createdUi"
                    control={control}
                    defaultValue=""
                    render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "createdUi">} />}
                />
                {/* Other controls */}
            </div>

            <div>
                <button type="submit" > Submit </button>
            </div>
        </form>
    );
};

export default OrderForm;
