import { useState } from "react"
import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header'

// import Hero from "../components/Hero"


const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  // const username = useSelector((state) => state.user.name);

  return (
    <>
    <Header/>
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-slate-700 to-gray-600">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome, {}!</h1>
          <p className="text-lg mb-8">Start your journey with us.</p>
          <Link to="/profile">
            <button className="bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300">
              Go to Profile
            </button>
          </Link>
          <br />
          <br />
        </div>
      </div>
    </>

  )
}

export default HomeScreen
