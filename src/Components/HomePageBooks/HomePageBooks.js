import { Grid } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePageBooks = ({ book }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Grid>
                <div class='container px-0 bg-gray-100  flex justify-center rounded-lg'>
                    <div class='bg-white max-w-xs shadow-lg cursor-pointer rounded-lg transform hover:scale-105 duration-300 ease-in-out'>
                        <div
                            class='rounded-t'
                            style={{
                                justifyContent: 'center',
                                borderRadius: '50%',
                            }}
                        >
                            <img
                                src={book.imgURL}
                                style={{ height: '350px', width: '20rem' }}
                                alt=''
                                class='rounded-t'
                            />
                        </div>
                        <div class='flex justify-around w-full  transform -translate-y-5 px-4'>
                            <div class='rounded-full shadow w-10 h-10 flex justify-center items-center bg-purple-100'>
                                1
                            </div>
                            <div class='rounded-full shadow w-10 h-10 flex justify-center items-center bg-purple-100'>
                                2
                            </div>
                            <div class='rounded-full shadow w-10 h-10 flex justify-center items-center bg-purple-100'>
                                3
                            </div>
                        </div>
                        <div class='p-4'>
                            <h2 class='text-xl font-semibold uppercase max-h-80'>
                                {book.name}
                            </h2>
                            <p class='font-bold font-sans text-purple-500 text-2xl my-2'>
                                {book.price}
                            </p>
                            <p>Writer: {book.writer}</p>
                            <Link to={'book/' + book._id}>
                                <h4 class='block bg-purple-900 py-2 px-2 text-gray-100 text-center rounded shadow-lg uppercase font-normal mt-6 hover:bg-gray-800 hover:text-white duration-300 ease-in-out'>
                                    Buy Now
                                </h4>
                            </Link>
                        </div>
                    </div>
                </div>
            </Grid>
        </div>
    );
};
export default HomePageBooks;
