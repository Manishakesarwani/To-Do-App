import App from "../App";
import CreateToDo from "../components/CreateToDo";
import GetAllTodo from "../components/GetAllTodo";
import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import UpdateToDo from "../components/UpdateToDo";
import DeleteToDo from "../components/DeleteToDo";
import GetCompleteToDo from "../components/GetCompleteToDo";
import GetIncompleteToDo from "../components/GetIncompleteToDo";

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {index: true, element: <Home />},
      {path:"create", element:<CreateToDo />},
      {path:"getAll", element:<GetAllTodo />},
      {path:"update/:id", element:<UpdateToDo />},
      {path:"delete/:id", element:<DeleteToDo />},
      {path:"incompleteToDo", element:<GetIncompleteToDo />},
      {path:"completeToDo", element:<GetCompleteToDo />}
    ]
  }
])

export default router;