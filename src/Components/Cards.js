import React, { useEffect, useState } from "react";
import {getDocs} from 'firebase/firestore';
import { moviesRef } from "./Firebase/firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _data = await getDocs(moviesRef);
      _data.forEach((doc) => {
        setData((prv) => [...prv, {...(doc.data()), id: doc.id}])
      })
      setLoading(false);
    }
    getData();
  },[])
  return(
    
    <div className="flex flex-wrap justify-center md:justify-between p-4 mt-3">
      { data.map((e, i) => {
        return(
        <Link to={`/detail/${e.id}`}>
        <div key={i} className=" rounded-2xl m-2 p-2 mt-5 hover:-translate-y-4 transition-all duration-500 cursor-pointer"> 
            <img className=" h-72" src={e.image} alt='' />
        </div>
        </Link>
        );})}
        
    </div>
    
  )
}

export default Cards