import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './ManageBooks.css';
const ManageBooks = () => {
    const [books, setBooks] = useState([]);
    const [open, setOpen] = useState(false);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || {
        from: { pathname: '/' },
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        history.replace(from);
    };

    useEffect(() => {
        fetch('https://obscure-badlands-64856.herokuapp.com/books')
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
            });
    }, [setBooks]);
    const handleDelete = (id) => {
        fetch(`https://obscure-badlands-64856.herokuapp.com/deleteBook/${id}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => console.log('deleted ', data));
    };

    return (
        <div>
            {books.length === 0 ? (
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
                <div>
                    <div>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-description'
                        >
                            <Alert
                                severity='error'
                                onClose={() => {
                                    handleClose();
                                }}
                            >
                                <AlertTitle>Success</AlertTitle>
                                Book Successfully <strong>Deleted</strong> From
                                The Server !
                            </Alert>
                        </Dialog>
                    </div>
                    {books.map((book) => (
                        <div class='p-4 lg:flex lg:items-center lg:justify-between'>
                            <div class='flex-1 w-auto min-w-0'>
                                <p
                                    style={{ display: 'flex' }}
                                    class='text-2xl m-0 p-0 font-bold leading-7 text-gray-700 sm:text-3xl sm:truncate'
                                >
                                    {book.name}
                                </p>
                                <div class='mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6'>
                                    <div class='mt-2 flex items-center text-sm text-gray-500'>
                                        {/* <!-- Heroicon name: solid/briefcase --> */}
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            class='h-5 w-5'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                        >
                                            <path d='M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z' />
                                        </svg>
                                        {book.writer}
                                    </div>
                                    <div class='mt-2 flex items-center text-sm text-gray-500'>
                                        {/* <!-- Heroicon name: solid/currency-dollar --> */}
                                        <svg
                                            class='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            aria-hidden='true'
                                        >
                                            <path d='M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z' />
                                            <path
                                                fill-rule='evenodd'
                                                d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z'
                                                clip-rule='evenodd'
                                            />
                                        </svg>
                                        {book.price}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <img
                                    style={{
                                        height: '50px',
                                        width: '50px',
                                        border: '2px solid gray',
                                        borderRadius: '50%',
                                    }}
                                    src={book.imgURL}
                                    alt=''
                                />
                            </div>
                            <div class='mt-5 flex lg:mt-0 lg:ml-40 '>
                                <span class=' sm:block'>
                                    <button
                                        type='button'
                                        class='inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    >
                                        {/* <!-- Heroicon name: solid/pencil --> */}
                                        <svg
                                            class='-ml-1 mr-2 h-5 w-5 text-gray-500'
                                            xmlns='http://www.w3.org/2000/svg'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                        >
                                            <path d='M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z' />
                                        </svg>
                                        Edit
                                    </button>
                                </span>

                                <span
                                    onClick={handleClickOpen}
                                    class=' md:ml-3 sm:ml-3 mobile:ml-3'
                                >
                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        type='button'
                                        class='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    >
                                        {/* <!-- Heroicon name: solid/check --> */}
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            class='h-5 w-5 pr-1'
                                            fill='none'
                                            viewBox='0 0 24 24'
                                            stroke='currentColor'
                                        >
                                            <path
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                stroke-width='2'
                                                d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                                            />
                                        </svg>
                                        Delete
                                    </button>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageBooks;
