import axios from 'axios';
import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { AlertTitle } from '@material-ui/lab';

const AddBooks = () => {
    const [imgURL, setImgURL] = useState(null);
    const [imgName, setImgName] = useState('');
    const { register, handleSubmit } = useForm();
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
    const handleImageUpload = (book) => {
        const imgData = new FormData();
        setImgName(book.target.files[0]);
        imgData.set('key', '37f17ab0500dd8fc0b9ba71dedd0ea03');
        imgData.append('image', book.target.files[0]);

        axios
            .post('https://api.imgbb.com/1/upload', imgData)
            .then(function (response) {
                setImgURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const onSubmit = (data) => {
        const bookData = {
            name: data.name,
            writer: data.writer,
            price: data.price,
            imgURL: imgURL,
        };
        console.log(bookData);
        fetch('https://obscure-badlands-64856.herokuapp.com/addBook', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };
    return (
        <div style={{ justifyContent: 'center' }}>
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
                        Book Successfully <strong>Updated</strong> To The Server
                        !
                    </Alert>
                </Dialog>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className=' my-20  sm:mx-16 my-20 mobile:mx-16 my-20'>
                    <label class='block text-sm font-medium text-gray-700'>
                        Upload Product Photo
                    </label>
                    <div class='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md'>
                        <div class='space-y-1 text-center'>
                            <svg
                                class='mx-auto h-12 w-12 text-gray-400'
                                stroke='currentColor'
                                fill='none'
                                viewBox='0 0 48 48'
                                aria-hidden='true'
                            >
                                <path
                                    d='M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02'
                                    stroke-width='2'
                                    stroke-linecap='round'
                                    stroke-linejoin='round'
                                />
                            </svg>
                            <div class='flex text-sm text-gray-600'>
                                <label
                                    for='file-upload'
                                    class='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id='file-upload'
                                        name='file-upload'
                                        type='file'
                                        class='sr-only'
                                        onChange={handleImageUpload}
                                    ></input>
                                </label>
                                <p class='pl-1'>or drag and drop</p>
                            </div>
                            <p class='text-xs text-gray-500'>
                                PNG, JPG, GIF up to 5MB
                            </p>
                            {imgURL === null ? (
                                'Image Preview Here'
                            ) : (
                                <img
                                    style={{ height: '75px', width: '75px' }}
                                    class='justify-center ml-16'
                                    src={imgURL}
                                    alt=''
                                />
                            )}
                            <p>{imgName.name}</p>
                        </div>
                    </div>
                </div>

                <div class='container lg:mx-20 sm:mx-24 my-20 mobile:mx-16 my-20'>
                    <div
                        for='other'
                        class='block lg:w-4/5 md:4/5 sm:w-4/5 space-y-2 text-gray-700 text-md font-semibold px-4 py-3 rounded-xl border border-purple-600 transition hover:bg-gray-50 hover:bg-opacity-50 hover:border-purple-800'
                    >
                        <span>Book's Information</span>
                        <input
                            type='text'
                            id='name'
                            name='name'
                            placeholder='Book Name'
                            {...register('name')}
                            class='w-full p-3 font-normal transition duration-200 focus:shadow-md focus:outline-none ring-offset-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-300'
                        />
                        <input
                            type='text'
                            id='name'
                            name='writer'
                            placeholder='Writers Name'
                            {...register('writer')}
                            class='w-full p-3 font-normal transition duration-200 focus:shadow-md focus:outline-none ring-offset-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-300'
                        />
                        <input
                            type='text'
                            id='name'
                            name='price'
                            placeholder='Price'
                            {...register('price')}
                            class='w-full p-3 font-normal transition duration-200 focus:shadow-md focus:outline-none ring-offset-2 border border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-300'
                        />
                        <input
                            onClick={handleClickOpen}
                            class='block cursor-pointer md:ml-72 sm:ml-52 mobile:ml-24 bg-purple-800 py-2 px-4 text-gray-100 text-center rounded shadow-lg uppercase font-normal mt-6 hover:bg-gray-800 hover:text-white duration-300 ease-in-out'
                            type='submit'
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddBooks;
