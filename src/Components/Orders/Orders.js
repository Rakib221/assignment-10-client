import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Orders.css';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch(
            'http://localhost:8080/bookings?email=' +
                loggedInUser.email,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // authorization: `Bearer ${sessionStorage.getItem('token')}`,
                },
            }
        )
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, [loggedInUser.email]);
    return (
        <div style={{ textAlign: 'left' }}>
            <div className='flex flex-col'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 align-middle inline-block min-w-full sm:pl-6 lg:pl-8'>
                        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                        >
                                            Book
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                        >
                                            Cost
                                        </th>
                                        <th
                                            scope='col'
                                            className='pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                        >
                                            Created On
                                        </th>
                                    </tr>
                                </thead>
                                {orders.length === 0 ? (
                                    <div class='loading-bar'>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                ) : (
                                    <tbody className='bg-white divide-y divide-gray-200'>
                                        {orders.map((order) => (
                                            <tr key={order._id}>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='flex items-center'>
                                                        <div className='flex-shrink-0 h-10 w-10'>
                                                            <img
                                                                className='h-10 w-10 rounded-full'
                                                                src={
                                                                    order.photo
                                                                }
                                                                alt=''
                                                            />
                                                        </div>
                                                        <div className='ml-4'>
                                                            <div className='text-sm font-medium text-gray-900'>
                                                                {order.name}
                                                            </div>
                                                            <div className='text-sm text-gray-500'>
                                                                {order.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <div className='text-sm text-gray-900'>
                                                        {order.book.name}
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        {order.book.writer}
                                                    </div>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap'>
                                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                        Active
                                                    </span>
                                                </td>
                                                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                                                    {order.book.price}
                                                </td>
                                                <td className='pl-6 py-4 whitespace-nowrap text-left text-sm font-medium'>
                                                    <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                                                        {new Date(
                                                            order.date
                                                        ).toDateString(
                                                            'dd/MM/yyyy'
                                                        )}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
