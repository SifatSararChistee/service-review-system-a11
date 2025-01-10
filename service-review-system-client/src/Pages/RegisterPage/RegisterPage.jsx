import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import toast from 'react-hot-toast';
import { getAuth } from 'firebase/auth';
import Lottie from 'lottie-react';
import registerAnimation from '../../assets/register.json'


const RegisterPage = () => {
  const {createNewUser,  setUser,logInWithGoogle, setLoading, updateUserProfile} =useContext(AuthContext)
  const navigate=useNavigate()
  const [error, setError] = useState("");

 const validatePassword = (password) => {
  if (password.length < 6) {
    return ("Password must be at least 6 characters long");
  }
  if (!/[A-Z]/.test(password)) {
    return ("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    return ("Password must contain at least one lowercase letter.");
  }
  return "";
};

  const handleRegister=(e)=>{
    e.preventDefault()
    const form =new FormData(e.target)
    const name =form.get("name")
    const email =form.get("email")
    const photo =form.get("photo")
    const password =form.get("password")
        const validationError = validatePassword(password);
        if (validationError) {
          setError(validationError);
          return;
        }    
        createNewUser(email ,password)
        .then((userCredential) => {
          const user = userCredential.user;
            setUser(user)
            setLoading(false)
            updateUserProfile({
              displayName:name,
              photoURL:photo
            })
            .then(()=>{
              const auth = getAuth();
              const updatedUser = auth.currentUser;
              setUser({ ...updatedUser });
              toast.success("Account Registered Successfully")
              navigate("/")
            })
            .catch((err)=>{
              toast.error(err.message)
            })
    
        })
    .catch((err) => {
      setError(err.message);
      setLoading(false)
      toast.error(err.message); 
    });
  }

  const handleGoogleLogin=()=>{
    logInWithGoogle()
    .then((userCredential) => {
      const user = userCredential.user;
        setUser(user)
        toast.success("Registered Successfully")
        navigate("/")
    })
    .catch((err) => {
      toast.error(err.code)
    });
  }
    return (
        <div className='flex items-center justify-center w-11/12 gap-4 mx-auto'>
          <div className="flex flex-col justify-center items-center mt-4 w-[400px] shadow-2xl rounded-xl">
            <h1 className='text-3xl font-bold mt-2'>Register Your Account</h1>
            <form onSubmit={handleRegister} className="p-10 w-full">
            <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input name='name' type="text" placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input name='email' type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input name='photo' type="text" placeholder="PhotoURL" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input name='password' type="password" placeholder="password" className="input input-bordered" required />
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-blue-500 text-white text-lg">Register</button>
        </div>
        <p className="text-center">Or</p>
        <div className="form-control">
          <button className="btn text-lg" onClick={handleGoogleLogin}> <FcGoogle />Register With Google</button>
        </div>
      </form>
      <p>Already have an account?</p>
      <p className="mb-5 text-lg font-medium underline"><Link to={'/login'}> LogIn Here </Link></p>
        </div>

        <div className='w-1/2 max-h-fit hidden lg:block md:block'>
          <Lottie className='h-[400px]' animationData={registerAnimation}></Lottie>
        </div>
        </div>

    );
};

export default RegisterPage;