import { useState, useEffect } from 'react';
import axios from 'axios';
import BackToHomePage from './BackToHomePage';
import { useNavigate } from 'react-router-dom';
import MarkAllComplete from './MarkAllComplete';
import MarkAllIncomplete from './MarkAllIncomplete';


function GetAllTodo() {

 const [todo, setTodo] = useState([]);
 const navigate = useNavigate();

  const fetchTodos = async () =>{
    try{
      const res = await axios.get("/todo");
      console.log("Data",res.data.toDoList);
      setTodo(res.data.toDoList);
    }
    catch(err){
      const success = Boolean(err.response?.data?.success);
      const message = err.response?.data?.message;
  
        if(!success){
          // alert(message);
          // navigate("/");
          console.log(message);
          setTodo([]);
        }
    };
  }

    useEffect(()=>{
    fetchTodos();
  },[]);

  const updateToDo = (id) =>{
    navigate(`/update/${id}`);
  }
  const deleteToDo = (id) =>{
    navigate(`/delete/${id}`);
  }

  const toggle = async (id) => {
  try {
    const res = await axios.patch(`/todo/update/status/${id}`);

    alert(res.data.message);
    setTodo(res.data.UpdatedToDo);

    // setTodo(prev =>
    //   prev.map(item =>
    //     item._id === id
    //       ? { ...item, isCompleted: !item.isCompleted }
    //       : item
    //   )
    // );
    fetchTodos();
  } catch (error) {
    const success=error.response?.data?.success;
    const message = error.response?.data?.message;

    if(!success){
      alert(message);
    }
  }
};



  return (
    <div className='flex flex-col justify-center items-center'>
        {todo.length===0 && (
          <p className="text-gray-500 my-4 text-center">🎉No tasks found.</p>
        )}
        <div className='grid grid-cols-4 gap-4'>
        {todo.length>0 && todo.map(each => (
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
    <div className='flex'>
      <BackToHomePage />
      {todo.length>0 && (
        <MarkAllComplete todo={todo} setToDo={setTodo} />
      )}
      {todo.length>0 && (
        <MarkAllIncomplete todo={todo} setToDo={setTodo} />
      )}
    </div>
    </div>
  )
}

export default GetAllTodo