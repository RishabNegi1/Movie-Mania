import React, { useState, useEffect, useContext } from 'react';
import ReactStars from 'react-stars';
import { reviewsRef, db } from './Firebase/firebase';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import { query, where, addDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';

const Reviews = ({id,prevRating, userRated}) => {
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState("");
    const useAppstate = useContext(Appstate);
    const [data, setData] = useState([]);
    const [newAdded, setNewAdded] = useState(0);
    const navigate = useNavigate();
    const [reviewsLoading, setReviewsLoading] = useState(false);

    const addReview = async () => {
        setLoading(true);
        try {
            if(useAppstate.login) {
            await addDoc(reviewsRef, {
                movieid: id,
                name: useAppstate.userName,
                rate: rating,
                views: input,
                timestamp: new Date().getTime()
            })

            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rate: userRated + 1
            })

            setRating(0);
            setInput("");
            setNewAdded(newAdded + 1);
            swal({
                title: "Review Sent",
                icon: "success",
                buttons: false,
                timer: 3000
              })
            } else {
                navigate('/login')
            }
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

    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([]);
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })

            setReviewsLoading(false);
        }
        getData();
    },[newAdded])

  return (
    <div className=' mt-5 w-full'>
        <h1 className=' font-bold text-2xl text-emerald-400 underline'>Review this title</h1>
        <ReactStars
           size={38}
           count={10}
           half={true}
           value={rating}
           onChange={(rate) => setRating(rate)}
        />
        <input
         value={input}
         onChange={(e)=> setInput(e.target.value)}
         placeholder='Share your views...'
         className=' w-full p-2 bg-slate-200 mt-4'
        >
        </input>
        <button onClick={addReview} className=' mt-3 p-2 bg-red-600 font-bold text-lg text-white'>
        {loading ? <TailSpin height={20} color="white" /> : 'Share'}
        </button>

        {reviewsLoading ? 
            <div className='mt-6 flex justify-center'><ThreeDots height={10} color="black" /></div>
        :
        <div className='mt-4'>
            {data.map((e, i) => {
                return(
                    <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-600 mt-2' key={i}>
                        <div className='flex items-center'>
                            <p className='text-blue-500 text-xl'>{e.name}</p>
                            <p className='ml-3 text-x'>({new Date(e.timestamp).toLocaleString()})</p>
                        </div>
                        <ReactStars
                            size={20}
                            count={10}
                            half={true}
                            value={e.rate}
                            edit={false}
                        />

                        <p>{e.views}</p>
                    </div>     
                )
            })}
            </div>
        }
    </div>
  )
}

export default Reviews