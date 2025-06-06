import React, { useState } from 'react'
import { userLogin } from '../services/userApi'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

function Login({ role = "user" }) {

  const navigate = useNavigate()

  const [values, setValues] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    
    e.preventDefault()

    userLogin(values, role).then((res) => {

      if(role == "admin"){
        localStorage.setItem("admin-token",res?.data?.token)
        toast.success(res?.data?.message)

        navigate("/admin/dashboard")
      }else{

              localStorage.setItem("token",res?.data?.token)
              toast.success(res?.data?.message)
               navigate("/")
      }

    }).catch((err) => {
      toast.error(err?.response?.data?.error)
    })
  }

  const handleChange = (e)=>{
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">{role == "admin"? "Admin login" : "Login now!"}</h1>
      <p className="py-6">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
      </p>
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required onChange={handleChange}/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required onChange={handleChange}/>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}

export default Login
