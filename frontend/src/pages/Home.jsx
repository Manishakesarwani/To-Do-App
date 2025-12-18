import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const [oprtn, setOperations] = useState(null);
  const navigate = useNavigate();
  
    const handleSubmit = (e) =>{
      e.preventDefault();
      console.log(oprtn);

      switch(oprtn){
        case 1:
          navigate("/create");
          break;
        case 2:
          navigate("/getAll");
          break;
        case 3:
          navigate("/incompleteToDo");
          break;
        case 4:
          navigate("/completeToDo");
          break;
        default:
          navigate("/");
      }
    }

  return (
    <div className="flex flex-col justify-center items-center">
        <p>Please select the operations you would like to perform :-</p>
          <div className="mb-4">
            <form className='flex flex-col flex-wrap justify-evenly gap-1' onSubmit={handleSubmit}>
              <div className='my-1'>
                <input type="radio" value={1} checked={oprtn===1} onChange={(e)=>setOperations(Number(e.target.value))} name='operations' id='op1' required />
                <label htmlFor="op1" className='mx-1'>Add a To-Do</label>
              </div>
              <div className='my-1'>
                <input type="radio" value={2} checked={oprtn===2} onChange={(e)=>setOperations(Number(e.target.value))} name='operations' id='op2' />
                <label htmlFor="op2" className='mx-1'>Get all To-Do</label>
              </div>
              <div className='my-1'>
                <input type="radio" value={3} checked={oprtn===3} onChange={(e)=>setOperations(Number(e.target.value))} name='operations' id='op3' />
                <label htmlFor="op3" className='mx-1'>Get all incomplete To-Do</label>
              </div>
              <div className='my-1'>
                <input type="radio" value={4} checked={oprtn===4} onChange={(e)=>setOperations(Number(e.target.value))} name='operations' id='op4' />
                <label htmlFor="op4" className='mx-1'>Get all complete To-Do</label>
              </div>
              <div className='text-center'>
                <button type='submit' className='rounded-lg px-3 py-1.5 bg-green-300 text-white shrink-0 m-2 border border-black/10 outline-none duration-150 cursor-pointer'>Submit</button>
              </div>
            </form>
          </div>

    </div>
  )
}

export default Home