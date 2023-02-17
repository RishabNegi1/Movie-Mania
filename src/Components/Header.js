import React, { useContext } from 'react'
import { Appstate } from '../App';
import { Link} from 'react-router-dom';

const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className="font-bold flex justify-between p-4 items-center bg-lime-100 mt-0">
        <Link to={'/'}><h1 className="text-3xl"><span className="text-emerald-300">
            Movie</span><span className="text-blue-300">Mania</span></h1></Link>
        {useAppstate.login?
        <>
        <Link to={'/addm'}><h1 className='text-lg cursor-pointer flex items-center font-bold'>
          <button><span className=' text-teal-500'>Add New</span></button>
        </h1></Link>
        </>
        :
        <Link to={'/login'}><button className="bg-red-600 text-slate-100 p-2">Log In</button></Link>
        }
    </div>
  )
}

export default Header