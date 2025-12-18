import { useState } from 'react';
import { useParams } from 'react-router-dom'
import GetToDoById from './GetToDoById';
import BackToHomePage from './BackToHomePage';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UpdateToDo() {

  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const Update = async (e) =>{
      e.preventDefault();

      if(isSubmitting) return;
  
      if(!title || !description){
         alert("Please mention title and description that need to be updated!");
         return;
        }
      const decision = confirm("Are you sure you want to update To-Do?");
      if(decision){
      try{
        setIsSubmitting(true);
        console.log("title", title);
        console.log("description", description);
        const res=await axios.put(`/todo/update/${id}`,{
          data: {
            title,
            description
          }
        });
        console.log("Updated:", res.data);
        alert(res.data.message);
        setIsSubmitting(false);
        setTitle("");
        setDescription("");
        navigate(-1);
      }
      catch(err){
        const success = Boolean(err.response?.data?.success);
        const message = err.response?.data?.message;
  
        if(!success){
          alert(message);
          setIsSubmitting(false);
          setTitle("");
          setDescription("");
        }
        setIsSubmitting(false);
      }
      }
      else{
        setIsSubmitting(false);
      }
    }

  return (
    <div>
      <GetToDoById />
      <div className='max-w-2xl mx-auto'>
      <form onSubmit={Update} className='flex flex-col justify-between items-center'>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} id='title' type='text' placeholder='Write title to your To-Do...' className='w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2' />
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} id='desc' type='text' placeholder='Write description to your To-Do...' className='w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2' ></textarea>
          <div className='flex'>
          <BackToHomePage />
          <button type='submit' className={`rounded-lg px-3 py-1.5 bg-green-300 text-white shrink-0 m-2 border border-black/10 outline-none duration-150 ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}>{isSubmitting ? "Updating..." : "Update To-Do"}</button>
          </div>
      </form>
    </div>
    
    </div>
  )
}

export default UpdateToDo