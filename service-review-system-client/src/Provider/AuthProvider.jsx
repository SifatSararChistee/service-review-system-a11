import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext()

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const createNewUser =(email, password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logInUser =(email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const logInWithGoogle =()=>{
        return signInWithPopup(auth, provider)
    }
    const logOut =()=>{
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile=(updatedData)=>{
        return updateProfile(auth.currentUser , updatedData);
    }
    const authInfo ={
        user,
        setUser,
        createNewUser,
        logOut,
        logInUser,
        loading,
        logInWithGoogle,
        updateUserProfile,
        setLoading
    }

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(auth, async(currentUser)=>{
            
            if(currentUser?.email){
                setUser(currentUser)
                const {data} = await axios.post(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/jwt`,{
                    email: currentUser?.email,
                },{withCredentials:true})
            }else{
                setUser(currentUser)
                const {data} = await axios.get(`https://b10a11-server-side-sifat-sarar-chistee.vercel.app/logout`,{withCredentials:true})
            }
            setLoading(false)
        });
        return ()=>{
            unsubscribe()
        }
    },[])
    return (
    <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
    );
};

export default AuthProvider;