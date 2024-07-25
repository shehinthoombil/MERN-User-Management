import { Container } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



const App = () => {
  return (
    <>
      <Header />
      <ToastContainer/>
      <Container className="my-2">
        <Outlet />
      </Container>
      <h1>MERN Auth</h1>
    </>
  )
}

export default App;     
