import { getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { usersRef } from './Firebase/firebase';
import bcrypt from 'bcryptjs';
import { Appstate } from '../App';
import swal from 'sweetalert';

const Log = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    phone: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('phone', '==', form.phone))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);
        if(isUser) {
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            title: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000
          })
          navigate('/')
        } else {
          swal({
            title: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000
          })
        }
      })
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
    setLoading(false);
  }
  return (
    <div>
  <div class="mt-20 flex w-full flex-col items-center">
    <h1 className=' text-3xl text-red-500 font-bold'>LogIn</h1>
        <div class="p-2 w-1/2 md:w-1/5">
          <div class="relative">
            <label for="name" class="leading-7 text-sm">Phone Number</label>
            <input 
            type="number" 
            id="name" 
            name="name"
            value={form.email}
            onChange={(e)=> setForm({...form, phone:e.target.value})}
            class="w-full bg-slate-300 bg-opacity-40 rounded border border-gray-700 focus:border-teal-500 focus:bg-slate-50 focus:ring-2 focus:ring-teal-900 text-base outline-none text-neutral-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>

        <div class="p-2 w-1/2 md:w-1/5">
          <div class="relative">
            <label for="name" class="leading-7 text-sm">Password</label>
            <input 
            type="text" 
            id="name" 
            name="name"
            value={form.password}
            onChange={(e)=> setForm({...form, password:e.target.value})}
            class="w-full bg-slate-300 bg-opacity-40 rounded border border-gray-700 focus:border-teal-500 focus:bg-slate-50 focus:ring-2 focus:ring-teal-900 text-base outline-none text-neutral-900 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
        </div>
        <button onClick={login} class="text-white mt-3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        {loading? <TailSpin height={25} color="white"/> : "LogIn"}
        </button>
        <div>
            <p className=' text-lg mt-3'>New to MovieMania? <Link to={'/signup'}>
            <span className=' cursor-pointer text-teal-600 '>SignUp</span>
            </Link></p>
        </div>
  </div>
  </div>
    )
}

export default Log