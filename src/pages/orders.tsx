import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchOrders, removeOrder } from '../redux/slices/ordersSlice';
import { format } from 'date-fns';
import { enUS, uk, Locale } from 'date-fns/locale';

const Orders = () => {
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.orders.orders);
    const products = useSelector((state: RootState) => state.products.products);
    const [selectedOrder, setSelectedOrder] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const handleOrderClick = (orderId: number) => {
        setSelectedOrder(orderId === selectedOrder ? null : orderId);
    };

    const handleDeleteClick = () => {
        // debugger;
        if (selectedOrder !== null) {
            dispatch(removeOrder(selectedOrder));
            setSelectedOrder(null);
            setShowPopup(false);
            // debugger;
        }
    };

    const formatDate = (dateString: string, locale: Locale) => {
        const date = new Date(dateString);
        return format(date, 'PPPP', { locale });
    };

    const calculateTotal = (orderProducts: { id: string; amount: number }[]) => {
        return orderProducts.reduce((total, orderProduct) => {
            const product = products.find(p => p.id === parseInt(orderProduct.id));
            if (product) {
                const usdPrice = product.price.find(p => p.symbol === 'USD')?.value || 0;
                return total + usdPrice * orderProduct.amount;
            }
            return total;
        }, 0);
    };

    const calculateProductCount = (orderProducts: { id: string; amount: number }[]) => {
        return orderProducts.reduce((total, orderProduct) => total + orderProduct.amount, 0);
    };

    return (
        <div className='orders d-flex'>
            <div className='orders-list '>
            {orders.map(order => (
                <div key={order.id} className='d-flex' onClick={() => handleOrderClick(order.id)}>
                    <h3>{order.title}</h3>
                    {/* <p>Products count: {calculateProductCount(order.products)}</p> */}
                    {/* <p>Date (en-US): {formatDate(order.date, enUS)}</p> */}
                    {/* <p>Date (uk): {formatDate(order.date, uk)}</p> */}
                    {/* <p>Total (USD): ${calculateTotal(order.products).toFixed(2)}</p> */}
                    {/* <p>Total (UAH): ₴{(calculateTotal(order.products) * 26).toFixed(2)}</p> */}
                    {/* <button onClick={() => setShowPopup(true)}>Delete</button> */}
                </div>
            ))}
            </div>

            {selectedOrder !== null && (
                <div className='order-details '>
                    <h3>Order Details</h3>
                    <p>Order ID: {selectedOrder}</p>
                    {orders.map(order => (
                        <div key={order.id} className='d-flex' onClick={() => handleOrderClick(order.id)}>
                            {/* <h3>{order.title}</h3> */}
                            <p>Products count: {calculateProductCount(order.products)}</p>
                            <p>Date (en-US): {formatDate(order.date, enUS)}</p>
                            <p>Date (uk): {formatDate(order.date, uk)}</p>
                            <p>Total (USD): ${calculateTotal(order.products).toFixed(2)}</p>
                            <p>Total (UAH): ₴{(calculateTotal(order.products) * 26).toFixed(2)}</p>
                            <button onClick={() => setShowPopup(true)}>Delete</button>
                        </div>
                    ))}
                    <button onClick={() => setSelectedOrder(null)}>Close</button>
                </div>
            )}

            {showPopup && (
                <div className='popup'>
                    <div className='popup-content'>
                        <h3>Are you sure you want to delete this order?</h3>
                        <button onClick={handleDeleteClick}>Yes</button>
                        <button onClick={() => setShowPopup(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;