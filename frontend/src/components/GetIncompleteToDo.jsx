import { useState, useEffect } from 'react';
import axios from "../api/axios";
import BackToHomePage from './BackToHomePage';
import { useNavigate } from 'react-router-dom';

function GetIncompleteToDo() {

    const [incompleteToDo, setIncompleteToDo] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchIncompleteToDo = async () => {
      try{
        setLoading(true);
        const res = await axios.get("/todo/incomplete")
        console.log("Incomplete Data", res.data.IncompleteToDos);
        setIncompleteToDo(res.data.IncompleteToDos);
      }
      catch(err){
        const success = Boolean(err.response?.data?.success);
        const message = err.response?.data?.message;

        if(!success){
          // alert(message);
          // navigate("/");
          console.log(message);
          setIncompleteToDo([]);
        }
      }finally {
    setLoading(false);
  }
    }
    useEffect(()=>{
      fetchIncompleteToDo();
    },[]);

  const updateToDo = (id) =>{
    navigate(`/update/${id}`);
  }
  const deleteToDo = (id) =>{
    navigate(`/delete/${id}`);
  }

  const toggle = async (id) => {
  try {
    const res=await axios.patch(`/todo/update/status/${id}`);

    setIncompleteToDo(res.data.IncompleteToDos);
    
    fetchIncompleteToDo();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className='flex flex-col justify-center items-center'>
        {loading && (
          <p className="text-blue-500 my-4 text-center animate-pulse">Loading tasks...</p>
        )}
        {!loading && incompleteToDo.length===0 && (
          <p className="text-gray-500 my-4 text-center">🎉No incomplete tasks found.</p>
        )}
        <div className='grid grid-cols-4 gap-4'>
        {!loading && incompleteToDo.length>0 && incompleteToDo.map(each => (
            <div key={each._id} className={`border-black/10 flex border justify-between py-1.5 items-center rounded-lg px-3 gap-x-3 duration-300 my-3 text-black ${
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
    <BackToHomePage />
    </div>
  )
}

export default GetIncompleteToDo