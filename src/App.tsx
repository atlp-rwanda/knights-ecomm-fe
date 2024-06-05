import { RouterProvider, createBrowserRouter } from "react-router-dom";
import './styles/App.css'
import WelcomePage from "./pages/welcomePage";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <WelcomePage />
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  ); 
}

export default App
