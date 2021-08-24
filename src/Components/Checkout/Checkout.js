import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';
import { Dialog, DialogContent, DialogContentText } from '@material-ui/core';

const Checkout = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState({});
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [open, setOpen] = useState(false);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || {
        from: { pathname: '/order' },
    };
    useEffect(() => {
        fetch('https://obscure-badlands-64856.herokuapp.com/book/' + bookId)
            .then((res) => res.json())
            .then((data) => setBook(data));
    }, [bookId]);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        history.replace(from);
    };

    const handleBooking = () => {
        const newBooking = {
            book: book,
            ...loggedInUser,
            date: new Date(),
        };
        fetch('https://obscure-badlands-64856.herokuapp.com/addBooking', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBooking),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            });
        handleClickOpen();
    };

    return (
        <div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <Alert
                        severity='success'
                        onClose={() => {
                            handleClose();
                        }}
                    >
                        <AlertTitle>Success</AlertTitle>
                        You Have <strong>Successfully</strong> Placed Order . !
                        <DialogContent>
                            <DialogContentText id='alert-dialog-description'>
                                You Can Find And Check All Your Orders From The{' '}
                                <strong>Order</strong> Tab .
                            </DialogContentText>
                        </DialogContent>
                    </Alert>
                </Dialog>
            </div>
            <h1 className='font-bold text-4xl text-gray-800 mt-24 ml-24 text-left'>
                Checkout
            </h1>
            <div className='flex ml-32 mt-12 space-x-80 text-lg font-medium text-gray-600'>
                <h5 className='w-28'>Book Name</h5>
                <h5 className='w-28'>Writer</h5>
                <h5 className='w-28'>Price</h5>
            </div>
            <div className='flex ml-32 mt-8 space-x-80 text-lg font-medium text-gray-900'>
                <h5 className='w-28'>{book.name}</h5>
                <h5 className='w-28'>{book.writer}</h5>
                <h5 className='w-28'>{book.price}</h5>
            </div>
            <div className='flex w-3/4 border-t-2 border-gray-500 ml-32 mt-12 space-x-80 text-lg font-medium text-gray-600'>
                <h5 className='w-28 mr-96'>Shipping</h5>
                <h5 className='w-52 ml-40'>$50</h5>
            </div>
            <div className='flex w-3/4 ml-32 mt-8 space-x-80 text-lg font-medium text-gray-600'>
                <h5 className='w-28 mr-96'>Total</h5>
                <h5 className='w-52 ml-40'>$300</h5>
            </div>
            <div className='ml-96 -mr-52 mt-12'>
                <button
                    onClick={handleBooking}
                    className='cursor-pointer bg-purple-800 py-2 px-4 text-gray-100 text-center rounded shadow-lg uppercase font-normal mt-6 hover:bg-gray-800 hover:text-white duration-300 ease-in-out'
                >
                    Proceed Checkout
                </button>
            </div>
        </div>
    );
};

export default Checkout;
