import { Grid, makeStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import HomePageBooks from '../HomePageBooks/HomePageBooks';
import './../Home/Home.css';

const useStyles = makeStyles({
    root: {
        root: { flexGrow: 1, maxWidth: 345 },
    },
    media: {
        height: 140,
    },
});

const Home = () => {
    const [books, setBooks] = useState([]);
    useEffect(() => {
        fetch('https://obscure-badlands-64856.herokuapp.com/books')
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
            });
    }, [setBooks]);
    const classes = useStyles();
    return (
        <div className='body h-max bg-gray-800'>
            {books.length === 0 ? (
                <div class='lds-roller'>
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
                <div
                    style={{ margin: '0px 50px 0px 50px', paddingTop: '50px' }}
                >
                    <Grid container className={classes.root} spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify='center' spacing={1}>
                                {books.map((book) => (
                                    <Grid
                                        key={book._id}
                                        item
                                        style={{ margin: '24px' }}
                                    >
                                        <HomePageBooks
                                            book={book}
                                        ></HomePageBooks>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default Home;
