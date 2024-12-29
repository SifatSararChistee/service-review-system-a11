import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import ReviewCard from '../../Components/ReviewCard/ReviewCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyReviewPage = () => {
    const [reviews, setReviews]=useState([]);
    const {user}=useContext(AuthContext);
    const AxiosSecure= useAxiosSecure()
    useEffect(()=>{
        AxiosSecure.get(`/reviews/${user?.email}`)
        .then(res=>setReviews(res.data))
    },[])

    return (
        <div>
            <h1 className='text-3xl text-center font-bold mt-6 text-primary'>My Reviews</h1>
            <div className='w-2/3 mx-auto space-y-5'>
                {
                    reviews.map(review=><ReviewCard key={review._id} review={review} reviews={reviews} setReviews={setReviews}></ReviewCard>)
                }
            </div>
        </div>
    );
};

export default MyReviewPage;