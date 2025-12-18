import { useState, useEffect } from 'react';
import axios from "../api/axios";
import BackToHomePage from './BackToHomePage';
import { useNavigate } from 'react-router-dom';
import DeleteAllCompleteToDo from './DeleteAllCompleteToDo';

function GetCompleteToDo() {

  const [completeToDo, setCompleteToDo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCompleteToDo = async ()=>{
    try{
      setLoading(true);
      const res= await axios.get("/todo/complete");
      console.log(res.data.CompleteToDos);
      setCompleteToDo(res.data.CompleteToDos);
    }
    catch(err){
      const success=Boolean(err.response?.data?.success);
      const message = err.response?.data?.message;
      if(!success){
        console.log(message);
        setCompleteToDo([]);
      }
    }finally {
    setLoading(false);
  }
  }
  useEffect(()=>{
    fetchCompleteToDo();
  },[]);

  const updateToDo = (id) =>{
      navigate(`/update/${id}`);
    }
    const deleteToDo = (id) =>{
      navigate(`/delete/${id}`);
    }
  
    const toggle = async (id) => {
    try {
      await axios.patch(`/todo/update/status/${id}`);
  
      setCompleteToDo(prev =>
        prev.map(item =>
          item._id === id
            ? { ...item, isCompleted: !item.isCompleted }
            : item
        )
      );
      
      fetchCompleteToDo();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center'>
        {loading && (
          <p className="text-blue-500 my-4 text-center animate-pulse">Loading tasks...</p>
        )}
        {!loading && completeToDo.length===0 && (
          <p className="text-gray-500 my-4 text-center">No complete tasks found.</p>
        )}
        <div className='grid grid-cols-4 gap-4'>
        {!loading && completeToDo.length>0 && completeToDo.map(each => (
            <div key={each._id} className={`flex justify-between items-center border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 my-3 text-black ${
        each.isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
    }`}>
                <div>
                  <input type='checkbox' className='cursor-pointer' checked={each.isCompleted} onChange={()=>toggle(each._id)} />
                </div>
                <div className='flex flex-col'>
                    <h3 className='font-bold'>{each.title}</h3>
                    <p>{each.description}</p>
                </div>
                <div>
                    <button className={`w-8 h-8 m-1 cursor-pointer rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 ${each.isCompleted ? "hidden" : "inline-flex"}`} onClick={()=>updateToDo(each._id)} disabled={each.isCompleted}>{each.isCompleted ? "" : "✏️"}</button>
                    <button className='inline-flex w-8 h-8 m-1 cursor-pointer rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50' onClick={()=>deleteToDo(each._id)}>❌</button>
                </div>
            </div>
        ))}
    
    </div>
    <div className='flex gap-3'>
      <BackToHomePage />
      {!loading && completeToDo.length>0 && (
        <DeleteAllCompleteToDo completeToDo={completeToDo} setCompleteToDo={setCompleteToDo} />
      )}
    </div>
    </div>
  )
}

export default GetCompleteToDo