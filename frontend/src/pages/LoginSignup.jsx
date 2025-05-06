import React, {useState } from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState("Login")

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const login = async () => {
    console.log("login function executed", formData)
    let responseData;
    await fetch("https://react-node-ecommerce-2agh.onrender.com/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => {responseData=data});

    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  const signup = async () => {
    console.log("singup function executed", formData)
    let responseData;
    await fetch("https://react-node-ecommerce-2agh.onrender.com/signup", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "content-type": "application/json"
      },
      body: JSON.stringify(formData)
    }).then((response) => response.json()).then((data) => {responseData=data});

    if(responseData.success){
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/")
    }
    else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className='loginsignup-fields'>
          {state === "Sign Up" ? <input type="text" name='username' value={formData.username} onChange={changeHandler} placeholder='your name'/> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="text" placeholder='Email Address'/>
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='password'/>
        </div>
        <button onClick={() => {state === "Login" ? login(): signup()}}>Continue</button>
        <div className='loginsignup-agree'>
          <input type="checkbox" name='' id=''/>
          <p>i agree to the terms of user & privacy policy.</p>
        </div>
        {state === "Sign Up" ? <p className='loginsignup-login'>Already Have an Account? <span onClick={()=>setState("Login")}>Login Here</span></p> : <p className='loginsignup-login'>Create an Account? <span onClick={()=>setState("Sign Up") }>Click Here</span></p>}
      </div>
    </div>
  )
}

export default LoginSignup
