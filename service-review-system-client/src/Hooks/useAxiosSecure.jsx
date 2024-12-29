import axios from 'axios'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Provider/AuthProvider'

const axiosSecure = axios.create({
  baseURL: 'https://b10a11-server-side-sifat-sarar-chistee.vercel.app',
  withCredentials: true,
})

const useAxiosSecure = () => {
  const navigate = useNavigate()
  const { logOut } = useContext(AuthContext)
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      res => {
        return res
      },
      async error => {
        console.log(
          'error caught from our very own axios interceptor-->',
          error.response
        )
        if (error.response.status === 401 || error.response.status === 403) {
          // logout
          logOut()
          // navigate to login
          navigate('/login')
        }
      }
    )
  }, [logOut, navigate])
  return axiosSecure
}

export default useAxiosSecure