import React from 'react'
import { useNavigate } from 'react-router-dom';

function BackToHomePage() {

    const navigate = useNavigate();

    const backToHome = () =>{
        navigate("/");
    }

  return (
    <div>
        <button type='button' onClick={backToHome} className='rounded-lg px-3 py-1.5 bg-green-300 text-white shrink-0 m-2 border border-black/10 outline-none duration-150 cursor-pointer'>Back to Home Page</button>
    </div>
  )
}

export default BackToHomePage