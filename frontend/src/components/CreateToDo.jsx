import axios from 'axios';
import React, { useState } from 'react'
import BackToHomePage from './BackToHomePage';
import { useNavigate } from 'react-router-dom';

function CreateToDo() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate();


  const add = async (e) =>{
    e.preventDefault();

    if(isSubmitting) return;

    if(!title || !description){
       alert("Please mention both title and description!");
       return;
      }
    try{
      setIsSubmitting(true);
      console.log("title", title);
      console.log("description", description);
      const res=await axios.post("/todo",{
        data: {
          title,
          description
        }
      });
      console.log("Created:", res.data);
      alert("To-Do created successfully.");
      setIsSubmitting(false);
      setTitle("");
      setDescription("");
    }
    catch(err){
      const success = Boolean(err.response?.data?.success);
      const message = err.response?.data?.message;

      if(!success){
        alert(message);
        setTitle("");
        setDescription("");
      }
      setIsSubmitting(false);
    }
  }

  return (
    <div className='max-w-2xl mx-auto'>
      <form onSubmit={add} className='flex flex-col justify-between items-center'>
          <input value={title} onChange={(e)=>setTitle(e.target.value)} id='title' type='text' placeholder='Write title to your To-Do...' className='w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2' />
          <textarea value={description} onChange={(e)=>setDescription(e.target.value)} id='desc' type='text' placeholder='Write description to your To-Do...' className='w-full border border-black/10 rounded-lg px-3 outline-none duration-150 bg-white/20 py-1.5 m-2' ></textarea>
          <div className='flex'>
          <BackToHomePage />
          <button type='submit' className={`rounded-lg px-3 py-1.5 bg-green-300 text-white shrink-0 m-2 border border-black/10 outline-none duration-150 ${isSubmitting ? "cursor-not-allowed" : "cursor-pointer"}`}>{isSubmitting ? "Adding..." : "Add To-Do"}</button>
          </div>
      </form>
    </div>
  )
}

export default CreateToDo