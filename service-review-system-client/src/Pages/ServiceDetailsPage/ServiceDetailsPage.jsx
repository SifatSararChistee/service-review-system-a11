import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Rating from 'react-rating';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import ReviewCard from '../../Components/ReviewCard/ReviewCard';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ServiceDetailsPage = () => {
    const axiosSecure=useAxiosSecure()
    const [service, setService] = useState(null); // Initialize as null

    const { id } = useParams();
    const {user}= useContext(AuthContext)
    const navigate=useNavigate()
    const [reviews, setReviews] = useState([]);

    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const reviewDate = new Date().toLocaleDateString(); // Current date

    const {
        _id,
        serviceImage,
        serviceTitle,
        companyName,
        website,
        description,
        category,
        price,
        userEmail,
        addedDate,
    } = service || {}; // Use optional chaining or fallback to an empty object
    

    useEffect(()=>{
        axios.get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/service-details/${id}`,
            {
                withCredentials: true,  // Include cookies or credentials in the request
              }
        )
        .then(res=> setService(res.data))
    }
    ,[id])

    const handleSubmit = async (e) => {
        // e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }
    
        if (!reviewText || rating === 0) {
            toast.error('Please provide a review and a rating.');
            return;
        }
    
        const reviewData = {
            text: reviewText,
            rating,
            date: reviewDate,
            serviceId: service._id, // Correct this reference
            userName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
        };
    
        try {
            const response = await axiosSecure.post('/reviews', reviewData);
            toast.success('Review submitted successfully!');
            // Update the reviews list
            setReviews((prevReviews) => [response.data, ...prevReviews]);
            // Clear the form
            setReviewText('');
            setRating(0);
        } catch (error) {
            console.error('Error submitting review:', error.response?.data || error.message);
            toast.error('Failed to submit the review. Please try again.');
        }
    };
    



    useEffect(() => {
        const fetchReviewData = async () => {
            try {
                const { data } = await axios.get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/review/${id}`);
                setReviews(data); // Update state with fetched data
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.warn('No reviews found for this item.');
                    setReviews([]); // Set reviews to an empty array if not found
                } else {
                    console.error('Error fetching review data:', error.response?.data || error.message);
                }
            }
        };
    
        fetchReviewData();
    }, [id]); // Dependency array includes "id"
    
    
    

    return (
        <div className='flex flex-col lg:flex-row justify-between w-full mx-auto'> 

        {/* Service Details */}
        <div className="w-full lg:w-2/3 bg-gray-50 flex flex-col items-center py-8 p-7">
            <div className="bg-white shadow-xl w-full max-w-4xl rounded-lg p-7 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/3 mb-4 lg:mb-0">
                    <img
                        src={serviceImage}
                        alt={serviceTitle}
                        className="object-cover rounded-t-lg lg:rounded-l-lg w-full h-auto"
                    />
                </div>
                <div className="p-6 flex-1">
                    <h1 className="card-title text-3xl font-bold mb-4">{serviceTitle}</h1>
                    <p className="text-gray-700 text-sm mb-2">
                        <span className="font-semibold">Added Date:</span> {addedDate}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                        <span className="font-semibold">Category:</span> {category}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                        <span className="font-semibold">Company:</span> {companyName}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                        <span className="font-semibold">Reviews:</span> {reviews.length}
                    </p>
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline mb-2"
                    >
                        Visit Website
                    </a>
                    <p className="text-gray-700 mb-4">{description}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-gray-800">
                            Price: ${price}
                        </span>
                        <span className="text-sm text-gray-500">
                            Contact: {userEmail}
                        </span>
                    </div>
                </div>
            </div>
    
            <div className='p-7'>
                <h1 className='text-3xl font-bold my-5'>Reviews</h1>
                <div className='space-y-5'>
                    {reviews.map((review, i) => (
                        <ReviewCard key={i} review={review}></ReviewCard>
                    ))}
                </div>
            </div>
        </div>
    
        {/* Review Form */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md sticky top-5 z-30">
            <h2 className="text-2xl font-semibold mb-4">Add Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Review Textarea */}
                <div>
                    <label htmlFor="reviewText" className="block text-sm font-medium mb-1">
                        Write your review:
                    </label>
                    <textarea
                        id="reviewText"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="textarea textarea-bordered w-full"
                        placeholder="Share your thoughts about the service..."
                        rows="4"
                    ></textarea>
                </div>
    
                {/* Rating Selection */}
                <div>
                    <label className="block text-sm font-medium mb-1">Rating:</label>
                    <Rating
                        initialRating={rating}
                        onChange={(value) => setRating(value)}
                        emptySymbol={<span className="text-gray-400 text-2xl">☆</span>}
                        fullSymbol={<span className="text-yellow-500 text-2xl">★</span>}
                        fractions={2}
                    />
                </div>
    
                {/* Posted Date */}
                <div>
                    <label className="block text-sm font-medium mb-1">Review Posted Date:</label>
                    <p className="text-gray-600">{reviewDate}</p>
                </div>
    
                {/* Add Review Button */}
                <div>
                    <button type="submit" className="btn btn-primary w-full">
                        Add Review
                    </button>
                </div>
            </form>
        </div>
    
    </div>
    
        
       
    );
};

export default ServiceDetailsPage;
