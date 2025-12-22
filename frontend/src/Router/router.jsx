import App from "../App";
import CreateToDo from "../components/CreateToDo";
import GetAllToDo from "../components/GetAllToDo";
import Home from "../pages/Home";
import { createBrowserRouter } from "react-router-dom";
import UpdateToDo from "../components/UpdateToDo";
import DeleteToDo from "../components/DeleteToDo";
import GetIncompleteToDo from "../components/GetIncompleteToDo";
import GetAllCompleteToDo from "../components/GetAllCompleteToDo";

const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {index: true, element: <Home />},
      {path:"create", element:<CreateToDo />},
      {path:"getAll", element:<GetAllToDo />},
      {path:"update/:id", element:<UpdateToDo />},
      {path:"delete/:id", element:<DeleteToDo />},
      {path:"incompleteToDo", element:<GetIncompleteToDo />},
      {path:"completeToDo", element:<GetAllCompleteToDo />}
    ]
  }
])

export default router;