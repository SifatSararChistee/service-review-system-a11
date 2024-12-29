import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

// Set the app element for accessibility
Modal.setAppElement("#root");

const ServiceTable = ({ service, services, setServices }) => {
  const axiosSecure= useAxiosSecure()

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    const {
        _id,
        serviceImage,
        serviceTitle,
        companyName,
        website,
        description,
        category,
        price,
    } = service;

            // Initialize state with the selectedService or an empty object
            const [formData, setFormData] = useState({
                serviceImage: serviceImage || "",
                serviceTitle: serviceTitle || "",
                companyName: companyName || "",
                website: website || "",
                description: description || "",
                category: category || "",
                price: price || "",
              });
        
    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSave = (_id) => {
        axiosSecure.patch(`/service/${_id}`, formData)
        .then(res=> {
            if (res.data.modifiedCount > 0) {
                toast.success('Service Updated successfully!');
                        // Update the local state to reflect the changes
        setServices((prevServices) =>
            prevServices.map((service) =>
              service._id === _id ? { ...service, ...formData } : service
            )
          );
              } else {
                toast.error('Failed to update the service!');
              }
        }
        )
        setIsUpdateModalOpen(false); // Close the modal
      };

  const handleUpdate = (service) => {
    setSelectedService(service);
    setIsUpdateModalOpen(true);
  };


  const handleDelete = (service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async (_id) => {
    try {
      const {data} = await axiosSecure.delete(`/service/${_id}`
      );
      if (data.deletedCount > 0) {
        setServices((prevServices) =>
          prevServices.filter((srv) => srv._id !== _id)
        );
        toast.success(`Deleted successfully!`);
        setIsDeleteModalOpen(false);
        setSelectedService(null);
      } else {
        toast.error("Failed to delete the service.");
      }
    } catch (error) {
      toast.error("Error deleting the service.");
      console.error("Deletion error:", error);
    }
  };

  return (
    <div>
      {/* Services Table */}
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="table table-zebra bg-white w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Service Title</th>
              <th>Company</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* Service Image */}
              <td>
                <img
                  src={serviceImage}
                  alt={serviceTitle}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td>{serviceTitle}</td>
              <td>{companyName}</td>
              <td>{category}</td>
              <td>${price}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => handleUpdate(service)}
                >
                  Update
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    {/* Update Modal */}
    <Modal
      isOpen={isUpdateModalOpen}
      onRequestClose={() => setIsUpdateModalOpen(false)}
      className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-20 max-h-screen overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-lg font-bold mb-4">Update Service</h2>

      {/* Service Image */}
      <label className="block mb-2 font-semibold">Service Image URL</label>
      <input
        type="text"
        name="serviceImage"
        value={formData.serviceImage}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Service Image URL"
      />

      {/* Service Title */}
      <label className="block mb-2 font-semibold">Service Title</label>
      <input
        type="text"
        name="serviceTitle"
        value={formData.serviceTitle}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Service Title"
      />

      {/* Company Name */}
      <label className="block mb-2 font-semibold">Company Name</label>
      <input
        type="text"
        name="companyName"
        value={formData.companyName}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Company Name"
      />

      {/* Website */}
      <label className="block mb-2 font-semibold">Website</label>
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Website URL"
      />

      {/* Description */}
      <label className="block mb-2 font-semibold">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="textarea textarea-bordered w-full mb-4"
        placeholder="Description"
      ></textarea>

      {/* Category */}
      <label className="block mb-2 font-semibold">Category</label>
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Category"
      />

      {/* Price */}
      <label className="block mb-2 font-semibold">Price</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Price"
      />

      {/* Save Button */}
      <button className="btn btn-primary w-full" onClick={()=>handleSave(_id)}>
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
          <span className="font-semibold">{selectedService?.serviceTitle}</span>?
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

export default ServiceTable;
