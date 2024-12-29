import React from 'react';
import Lottie from "lottie-react";
import error from "../../assets/Animation - 1735050973708.json";

const ErrorPage = () => {
    return (
        <div>
            <h1 className='text-center text-3xl font-bold text-red-400'>404 NOT Found</h1>
            <Lottie className='h-screen' animationData={error}  />
        </div>
    );
};

export default ErrorPage;