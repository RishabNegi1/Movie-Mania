import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {db, moviesRef, reviewsRef} from './Firebase/firebase';
import { doc,getDoc } from 'firebase/firestore';
import Reviews from './Reviews';
import { ThreeCircles } from 'react-loader-spinner';

const Detail = () => {
  const {id} = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: moviesRef.rating,
    genere: "",
    rate: reviewsRef.rate
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      setLoading(false);
    }
    getData();
  },[])
  return (
    <div className=' p-4 mt-4 w-full flex flex-col md:flex-row items-center md:items-start justify-center'>
      { loading ? <div className='h-96 flex w-full justify-center items-center'><ThreeCircles height={30} color="black" /></div> : 
      <>
        <img className=' h-80' src={data.image}/>
        <div className=' p-5 md:ml-4 w-full md:w-1/2'>
        <h1 className=' text-3xl text-indigo-400 font-bold'>{data.title}</h1>
        <h1 className=" text-neutral-500 mt-4 font-bold text-xl">{data.year}</h1>
        <h1 className=" text-neutral-500 mt-4 font-bold text-xl">{data.rating}</h1>
        <h1 className=" text-orange-800 mt-4 font-bold text-xl">{data.genere}</h1>
        <p className=' mt-3 font-bold text-pink-600 text-xl'>{data.description}</p>
        <Reviews id={id} prevRating={data.rating} userRated={data.rate} />
        </div>
        
        </>
      }
    </div>
  )
}

export default Detail