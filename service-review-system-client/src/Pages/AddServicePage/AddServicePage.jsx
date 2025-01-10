import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const AddServicePage = () => {
    const {user}= useContext(AuthContext);
    const userEmail = user ? user.email : null;
    const navigate= useNavigate()
    const axiosSecure =useAxiosSecure()
    const [serviceDetails, setServiceDetails] = useState({
        serviceImage: '',
        serviceTitle: '',
        companyName: '',
        website: '',
        description: '',
        category: '',
        price: '',
        review:0,
    });

    const [addedDate] = useState(new Date().toLocaleDateString());

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServiceDetails({
            ...serviceDetails,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = { ...serviceDetails, userEmail, addedDate };

        // Send formData to the backend
        axiosSecure.post('/services', formData)
        .then(response => {
            toast.success("Service added Successfully")
            navigate('/all-services')
        })        
        .catch(error => {
            console.error('Error:', error.response ? error.response.data : error.message);
        });
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4"
        >
            <h1 className='text-3xl font-bold text-center my-5 text-blue-500'>Add Your Service </h1>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Service Image URL:</span>
                </label>
                <input 
                    type="url" 
                    name="serviceImage" 
                    value={serviceDetails.serviceImage} 
                    onChange={handleChange} 
                    className="input input-bordered w-full" 
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Service Title:</span>
                </label>
                <input
                    type="text"
                    name="serviceTitle"
                    value={serviceDetails.serviceTitle}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Company Name:</span>
                </label>
                <input
                    type="text"
                    name="companyName"
                    value={serviceDetails.companyName}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Website:</span>
                </label>
                <input
                    type="url"
                    name="website"
                    value={serviceDetails.website}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Description:</span>
                </label>
                <textarea
                    name="description"
                    value={serviceDetails.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                ></textarea>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Category:</span>
                </label>
                <input
                    type="text"
                    name="category"
                    value={serviceDetails.category}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Price:</span>
                </label>
                <input
                    type="number"
                    name="price"
                    value={serviceDetails.price}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                />
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Added Date:</span>
                </label>
                <p className="text-base-content">{addedDate}</p>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">User Email:</span>
                </label>
                <p className="text-base-content">{user?.email}</p>
            </div>

            <button 
                type="submit" 
                className="btn bg-blue-500 text-white w-full"
            >
                Add Service
            </button>
        </form>
    );
};

export default AddServicePage;
