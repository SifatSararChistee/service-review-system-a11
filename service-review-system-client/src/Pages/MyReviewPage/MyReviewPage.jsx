import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import ReviewCard from '../../Components/ReviewCard/ReviewCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const MyReviewPage = () => {
    const [reviews, setReviews]=useState([]);
    const {user, loading}=useContext(AuthContext);
    const AxiosSecure= useAxiosSecure()
    useEffect(()=>{
        AxiosSecure.get(`/reviews/${user?.email}`)
        .then(res=>setReviews(res.data))
    },[])

    return (
        <div>
            <h1 className='text-3xl text-center font-bold my-6 text-blue-500'>My Reviews</h1>
            {loading ? (
        <div className="text-center">Loading Reviews...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-2xl">No Reviews found... <br />You have not added any review</div>
      ):(<div className='w-2/3 mx-auto space-y-5'>
        {
            reviews.map(review=><ReviewCard key={review._id} review={review} reviews={reviews} setReviews={setReviews}></ReviewCard>)
        }
    </div>)}
            
        </div>
    );
};

export default MyReviewPage;