import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth';
import app from './Firebase/firebase';
import swal from 'sweetalert';
import bcrypt from 'bcryptjs';
import { usersRef } from './Firebase/firebase';
import { addDoc } from 'firebase/firestore';

const auth = getAuth(app);
const Signup = () => {
  const navigate = useNavigate();
    const [form, setForm] = useState({
      name: "",
      phone: "",
      password: ""
    });
    const [loading, setLoading] = useState(false);
    const [otpsent, setOtpSent] = useState(false);
    const [OTP, setOTP] = useState("");


    const generateRecaptcha = () => {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
      }, auth);
    }
  
    const requestOtp = () => {
        setLoading(true);
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
          signInWithPhoneNumber(auth, `+91${form.phone}`, appVerifier)
          .then(confirmationResult => {
            window.confirmationResult = confirmationResult;
            swal({
              text: "OTP Sent",
              icon: "success",
              buttons: false,
              timer: 3000,
            });
            setOtpSent(true);
            setLoading(false);
          }).catch((error) => {
            console.log(error)
          })
    }

  const verifyOTP = () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate('/login')
        setLoading(false); 
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef, {
        name: form.name,
        password: hash,
        phone: form.phone
      });
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div>
  <div className="mt-20 flex w-full flex-col items-center">
    {otpsent?

    <>
    <h1 className=' text-3xl text-red-500 font-bold'>SignUp</h1>
      <div className="p-2 w-1/2 md:w-1/5">
      <div className="relative">
      <label for="name" className="leading-7 text-sm">OTP</label>
      <input 
      id="name" 
      name="name"
      value={OTP}
      onChange={(e)=> setOTP(e.target.value)}
      className="w-full bg-slate-300 bg-opacity-40 rounded border border-gray-700 focus:border-teal-500 focus:bg-slate-50 focus:ring-2 focus:ring-teal-900 text-base outline-none text-neutral-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
      </div>
      </div>
      <button onClick={verifyOTP} className="text-white mt-3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
      {loading? <TailSpin height={25} color="white"/> : "Confirm"}
      </button> 
    </>

     :
     
    <>
    <h1 className=' text-3xl text-red-500 font-bold'>SignUp</h1>
        <div className="p-2 w-1/2 md:w-1/5">
          <div className="relative">
            <label for="name" className="leading-7 text-sm">Name</label>
            <input 
            type="text" 
            id="name" 
            name="name"
            value={form.name}
            onChange={(e)=> setForm({...form, name:e.target.value})}
            className="w-full bg-slate-300 bg-opacity-40 rounded border border-gray-700 focus:border-teal-500 focus:bg-slate-50 focus:ring-2 focus:ring-teal-900 text-base outline-none text-neutral-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div className="p-2 w-1/2 md:w-1/5">
          <div className="relative">
            <label for="name" className="leading-7 text-sm">Phone Number</label>
            <input 
            type="text" 
            id="name" 
            name="name"
            value={form.phone}
            onChange={(e)=> setForm({...form, phone:e.target.value})}
            className="w-full bg-slate-300 bg-opacity-40 rounded border border-gray-700 focus:border-teal-500 focus:bg-slate-50 focus:ring-2 focus:ring-teal-900 text-base outline-none text-neutral-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div className="p-2 w-1/2 md:w-1/5">
          <div className="relative">
            <label for="name" className="leading-7 text-sm">Password</label>
            <input 
            type="text" 
            id="name" 
            name="name"
            value={form.password}
            onChange={(e)=> setForm({...form, password:e.target.value})}
            className="w-full bg-slate-300 bg-opacity-40 rounded border border-gray-700 focus:border-teal-500 focus:bg-slate-50 focus:ring-2 focus:ring-teal-900 text-base outline-none text-neutral-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <button onClick={requestOtp} className="text-white mt-3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        {loading? <TailSpin height={25} color="white"/> : "Request OTP"}
        </button>
        </>
        }
        <div>
            <p className=' text-lg mt-3'>Already have an ACC? <Link to={'/login'}>
            <span className=' cursor-pointer text-teal-600 '>LogIn</span>
            </Link></p>
        </div>
  </div>
  <div id='recaptcha-container'></div>
  </div>
    )
}

export default Signup