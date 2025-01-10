import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Modal from "react-modal";
import toast from "react-hot-toast";
import Rating from 'react-rating';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import axios from 'axios';

// Set the app element for accessibility
Modal.setAppElement("#root");

const ReviewCard = ({review, setReviews, reviews}) => {
  const {pathname} = useLocation()
  const axiosSecure=useAxiosSecure()
  const {
    _id,
    text,
    rating,
    serviceId,
    photoURL,
    userName,
    date
} = review;

const [serviceInfo , setServiceInfo]= useState({})


useEffect(() => {
    // Check if serviceId is valid before making the request
    if (!serviceId || serviceId.length !== 24 || !/^[a-fA-F0-9]+$/.test(serviceId)) {
        console.warn('Invalid or undefined serviceId. Skipping data fetch.');
        return;
    }

    axios
        .get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/service-detail/${serviceId}`)
        .then((res) => setServiceInfo(res.data))
        .catch((error) => {
            console.error('Error fetching service details:', error.response?.data || error.message);
        });
}, [serviceId]); // Add serviceId to the dependency array


      const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
      const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
      const [selectedReview, setSelectedReview] = useState(null);


      const handleDelete = (review) => {
        setSelectedReview(review);
        setIsDeleteModalOpen(true);
      };
    
      const confirmDelete = async (_id) => {
        try {
          const {data} = await axiosSecure.delete(
            `/review/${_id}`)
          if (data.deletedCount > 0) {
            setReviews((prevServices) =>
              prevServices.filter((rev) => rev._id !== _id)
            );
            toast.success(`Review Deleted successfully!`);
            setIsDeleteModalOpen(false);
            setSelectedReview(null);
          } else {
            toast.error("Failed to delete the review.");
          }
        } catch (error) {
          toast.error("Error deleting the review.");
          console.error("Deletion error:", error);
        }
      };

            // Initialize state with the selectedService or an empty object
            const [reviewData, setReviewData] = useState({
                text: text || "",
                rating: rating || "",
              });
        
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReviewData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleRatingChange = (newRating) => {
        setReviewData((prevData) => ({
          ...prevData,
          rating: newRating,
        }));
      };
      
      const handleSave = (_id) => {
        axiosSecure.patch(`/review/${_id}`, reviewData)
        .then(res=> {
            if (res.data.modifiedCount > 0) {
                toast.success('Review Updated successfully!');
                        // Update the local state to reflect the changes
        setReviews((prevReviews) =>
            prevReviews.map((review) =>
              review._id === _id ? { ...review, ...reviewData } : review
            )
          );
              } else {
                toast.error('Failed to update the review!');
              }
        }
        )
        setIsUpdateModalOpen(false); // Close the modal
      };

  const handleUpdate = (review) => {
    setSelectedReview(review);
    setIsUpdateModalOpen(true);
  };

    
    return (
<div className="card bg-white shadow-xl w-11/12">
      <div className="card-body bg-white">
      <div className='flex items-center w-[500px] gap-5'>
        <div>
        <img
            referrerPolicy='no-referrer'
          src={pathname==='/my-reviews' ? serviceInfo.serviceImage : photoURL}
          alt={pathname==='/my-reviews' ? serviceInfo.serviceTitle : userName}
          className="rounded-full w-20 h-20 mx-auto mt-4"
        />
        </div>
        <div className='space-y-2'>
          <h1 className='text-xl font-bold'>{pathname==='/my-reviews' ? serviceInfo.serviceTitle : userName}</h1>
        <h2 className="card-title">{pathname==='/my-reviews' ? serviceInfo.companyName: ''}</h2>
      <p className="text-sm">{date}</p>
      <div className="flex justify-start mt-2">
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              xmlns="http://www.w3.org/2000/svg"
              className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 15l-5.16 2.71 1.05-6.16L1 7.24l6.18-.89L10 1l2.82 5.35 6.18.89-4.89 4.31 1.05 6.16L10 15z"
                clipRule="evenodd"
              />
            </svg>
          ))}
        </div>
        </div>
      </div>
        <p className="mt-4">{text}</p>
      </div>
{ pathname==='/my-reviews' ?
        <div className='text-right p-8'>
        <button className="btn btn-primary btn-sm mr-2" onClick={() => handleUpdate(review)}>Update</button>
        <button className="btn btn-error btn-sm"onClick={() => handleDelete(review)}>Delete</button>
        </div>
        :''
}

        {/* Update Modal */}
        <Modal
  isOpen={isUpdateModalOpen}
  onRequestClose={() => setIsUpdateModalOpen(false)}
  className="bg-white p-6 rounded-lg shadow-md mx-auto mt-20 overflow-y-auto w-[600px] max-w-[80%]"
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
>
  <h2 className="text-lg font-bold mb-4">Update Review</h2>
  <textarea
    id="reviewText"
    name="text"
    value={reviewData.text}
    onChange={handleChange}
    className="textarea textarea-bordered w-full"
    placeholder="Share your thoughts about the service..."
    rows="4"
  ></textarea>

  <div>
    <label className="block text-sm font-medium mb-1">Rating:</label>
    <Rating
  initialRating={reviewData.rating}
  onChange={handleRatingChange} // Use the specific handler
  emptySymbol={<span className="text-gray-400 text-2xl">☆</span>}
  fullSymbol={<span className="text-yellow-500 text-2xl">★</span>}
  fractions={2}
/>

  </div>

  <button className="btn btn-primary w-full" onClick={() => handleSave(_id)}>
    Save
  </button>
</Modal>


      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-lg font-bold mb-2">Confirm Deletion</h2>
        <p>
          Are you sure you want to delete{" "}
          <span className="font-semibold">{selectedReview?.serviceTitle}</span>?
        </p>
        <div className="mt-4 flex justify-end">
          <button className="btn btn-error mr-2" onClick={()=>confirmDelete(_id)}>
            Delete
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>

    </div>
    );
};

export default ReviewCard;