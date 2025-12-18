import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

function GetToDoById() {
    const {id} = useParams();

    const [uToDo, setUToDo] = useState([]);

    useEffect(()=>{
        axios.get(`/todo/${id}`)
        .then(res => {
            console.log(res.data.RequestedToDo);
            setUToDo(res.data.RequestedToDo);
        })
        .catch(err => {
            const success = Boolean(err.response?.data?.success);
            const message = err.response?.data?.message;

            if(!success){
                alert(message);
            }
        })
    },[]);

  return (
    <div className={`max-w-2xl mx-auto border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 my-3 text-black ${
        uToDo.isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
    }`}>
        <div className='flex flex-col'>
            <h3 className='font-bold'>{uToDo.title}</h3>
            <p>{uToDo.description}</p>
        </div>
    </div>
  )
}

export default GetToDoById