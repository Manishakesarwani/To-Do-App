import React from 'react'
import axios from "../api/axios"
import { useState } from 'react';

function MarkAllComplete({todo, setToDo}) {

    const [isMarking, setIsMarking] = useState(false);

    const MarkAllComplete = async (e) => {
        e.preventDefault();

        if(isMarking) return;

        try{
            setIsMarking(true);
            const res = await axios.patch("/todo/update/all/complete")
            alert(res.data.message);
            setToDo(res.data.ToDoList);
            setIsMarking(false);
        }
        catch(err){
            const success = Boolean(err.response?.data?.success);
            const message = err.response?.data?.message;
            
            if(!success){
                alert(message);
                setToDo(err.response?.data?.ToDoList);
            }
            setIsMarking(false);
        }

    }

  return (
    <div>
        <button type='button' className={`rounded-lg px-3 py-1.5 bg-green-300 text-white shrink-0 m-2 border border-black/10 outline-none duration-150 ${isMarking ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={MarkAllComplete}>{isMarking ? "Marking..." : "Mark all complete"}</button>
    </div>
  )
}

export default MarkAllComplete