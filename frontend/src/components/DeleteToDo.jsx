import GetToDoById from './GetToDoById';
import { useParams } from 'react-router-dom';
import BackToHomePage from './BackToHomePage';
import axios from "../api/axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function DeleteToDo() {
  const {id} = useParams();
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const deleteToDo = async (e) =>{

    e.preventDefault();
    if(isDeleting) return;

    try{
      setIsDeleting(true);
      
      let decision = confirm("Are you sure you want to delete this To-Do?");
      if(decision){
        axios.delete(`/todo/remove/${id}`)
        .then(res => {
          alert(res.data.message);
          setIsDeleting(false);
          navigate(-1);
        })
      }
      else{
        setIsDeleting(false);
      }
    }
    catch(err){
      const success = Boolean(err.response?.data?.success);
      const message = err.response?.data?.message;

      if(!success){
        alert(message);
      }
      setIsDeleting(false);
    }

    
  }

  return (
    <div>
      <GetToDoById />
      <div className='max-w-2xl mx-auto'>
        <div className='flex justify-center'>
        <BackToHomePage />
          <button type='button' onClick={deleteToDo} className={`rounded-lg px-3 py-1.5 bg-green-300 text-white shrink-0 m-2 border border-black/10 outline-none duration-150 ${isDeleting? "cursor-not-allowed" : "cursor-pointer"}`}>{isDeleting ? "Deleting..." : "Delete To Do"}</button>
      </div>
      </div>
    </div>
  )
}

export default DeleteToDo