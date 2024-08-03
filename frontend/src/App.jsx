import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"

// import Header from "./components/Header"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const App = () => {
  return (
    <>
      {/* <Header /> */}
      <ToastContainer autoClose={2000} />
      {/* <Container className="my-2"> */}
      <Outlet />
      {/* </Container> */}
    </>
  )
}

export default App;     
