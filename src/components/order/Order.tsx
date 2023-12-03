import { FC, Fragment, ReactElement } from 'react';
import { Controller, ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { IBillingOption, IDeliveryOption, IOrder } from '../../model/config';
import { selectBillings } from '../../store/selector/billings';
import { selectDeliveries } from '../../store/selector/deliveries';
import { IOrderFormProps } from './Order.config';
import './Order.scss';

const OrderForm: FC<IOrderFormProps> = ({ onSubmit }): ReactElement => {
    const { control, handleSubmit: handleFormSubmit, formState: { errors } } = useForm<IOrder>();

    const deliveries_rdx: IDeliveryOption[] = useSelector(selectDeliveries);
    const billings_rdx: IBillingOption[] = useSelector(selectBillings);

    const onSubmitHandler: SubmitHandler<IOrder> = (data: IOrder): void => { onSubmit(data) };

    return (
        <Fragment>
            {deliveries_rdx.length && billings_rdx ? (
                <div className='container d-flex justify-content-center'>
                    <form onSubmit={handleFormSubmit(onSubmitHandler)}>
                        <h4 className='mt-3'>Customer info</h4>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between'>
                            <label htmlFor="customer.firstname">First Name</label>
                            <Controller
                                name="customer.firstname"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.firstname">} placeholder="First Name" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.lastname">Last Name</label>
                            <Controller
                                name="customer.lastname"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.lastname">} placeholder="Last Name" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.email">Email</label>
                            <Controller
                                name="customer.email"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.email">} placeholder="Email" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.deliveryOption.code">Delivery option</label>
                            <Controller
                                name="deliveryOption"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select {...field as ControllerRenderProps<IOrder, "deliveryOption">}>
                                        <option value="" disabled>Select a delivery option</option>
                                        {deliveries_rdx.map((delivery: IDeliveryOption) => (
                                            <option key={delivery.code} value={'' + delivery}>
                                                {delivery.name} | {delivery.price} €
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.billingOption.code">Billing Option</label>
                            <Controller
                                name="billingOption"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <select {...field as ControllerRenderProps<IOrder, "billingOption">}>
                                        <option value="" disabled>Select a billing option</option>
                                        {billings_rdx.map((billing: IBillingOption) => (
                                            <option key={billing.code} value={'' + billing}>
                                                {billing.name} | {billing.price} €
                                            </option>
                                        ))}
                                    </select>
                                )}
                            />
                        </div>
                        <h4 className='mt-3'>Shipping Address</h4>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between'>
                            <label htmlFor="customer.shippingAddress.street">Street</label>
                            <Controller
                                name="customer.shippingAddress.street"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.shippingAddress.street">} placeholder="Street" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.shippingAddress.houseNumber">House Number</label>
                            <Controller
                                name="customer.shippingAddress.houseNumber"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.shippingAddress.houseNumber">} placeholder="House Number" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.shippingAddress.zipCode">Zip Code</label>
                            <Controller
                                name="customer.shippingAddress.zipCode"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.shippingAddress.zipCode">} placeholder="Zip Code" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.shippingAddress.city">City</label>
                            <Controller
                                name="customer.shippingAddress.city"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.shippingAddress.city">} placeholder="City" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.shippingAddress.country">Country</label>
                            <Controller
                                name="customer.shippingAddress.country"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.shippingAddress.country">} placeholder="Country" />}
                            />
                        </div>
                        <h4 className='mt-3'>Billing Address</h4>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between'>
                            <label htmlFor="customer.billingAddress.street">Street</label>
                            <Controller
                                name="customer.billingAddress.street"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.billingAddress.street">} placeholder="Street" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.billingAddress.houseNumber">House Number</label>
                            <Controller
                                name="customer.billingAddress.houseNumber"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.billingAddress.houseNumber">} placeholder="House number" />}
                            /></div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.billingAddress.zipCode">Zip Code</label>
                            <Controller
                                name="customer.billingAddress.zipCode"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.billingAddress.zipCode">} placeholder="Zip Code" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.billingAddress.city">City</label>
                            <Controller
                                name="customer.billingAddress.city"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.billingAddress.city">} placeholder="City" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.billingAddress.country">Country</label>
                            <Controller
                                name="customer.billingAddress.country"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <input {...field as ControllerRenderProps<IOrder, "customer.billingAddress.country">} placeholder="Country" />}
                            />
                        </div>
                        <div className='col-12 d-flex col-12 d-flex justify-content-between pt-2'>
                            <label htmlFor="customer.message">Note</label>
                            <Controller
                                name="customer.message"
                                control={control}
                                defaultValue=""
                                render={({ field }) => <textarea {...field as ControllerRenderProps<IOrder, "customer.message">} placeholder="Note" />}
                            />
                        </div>
                        <div>
                            <button type="submit" > Submit </button>
                        </div>
                    </form>
                </div>
            ) :
                <p>Loading...</p>
            }
        </Fragment>
    )
};

export default OrderForm;
