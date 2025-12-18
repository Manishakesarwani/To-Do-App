import React, { useState } from 'react'
import axios from "../api/axios";

function DeleteAllCompleteToDo({completeToDo,setCompleteToDo}) {

    const [isDeleting, setIsDeleting] = useState(false);

    const DeleteAll = (e) => {
        e.preventDefault();
        console.log(completeToDo);

        if(isDeleting) return;

        try{
            setIsDeleting(true);
            const decision = confirm("Are you sure you want to delete all these tasks?");
            if(decision){
                axios.delete("/todo/remove/complete")
                .then(res =>{
                    setCompleteToDo([]);
                    alert(res.data.message);
                })
            }
            else{
                setIsDeleting(false)
            }
        }
        catch(err){
            const success = Boolean(err.response?.data?.success);
            const message = err.response?.data?.message;

            if(!success){
                alert(message);
            }
            
        }
        
    }
  return (
    <div>
        <button type='button' className={`rounded-lg px-3 py-1.5 bg-green-300 text-white shrink-0 m-2 border border-black/10 outline-none duration-150 ${isDeleting ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={DeleteAll}>{isDeleting ? "Deleting..." : "Delete All"}</button>
    </div>
  )
}

export default DeleteAllCompleteToDo