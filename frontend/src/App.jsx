import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="bg-[#172842] min-h-screen py-8">
      <div className="w-full mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage your Todos</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default App
