import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { StickyNavbar } from './Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (

    <div>
      <StickyNavbar />
      <div className='w-full h-32'></div>
      <div className='w-full flex justify-center'>
        <div className='w-1/2 p-5 rounded-md border-2 shadow-md bg-white'>
          {userInfo ? (
            <div className='text-lg font-semibold' style={{ color: '#333', fontStyle: 'italic' }}>
              <span className='text-2xl font-bold' style={{ color: '#4CAF50', fontStyle: 'italic' }}>Welcome back, {userInfo.name}!</span>
              {userInfo.profileImg && (
                <div className="my-4 flex justify-center">
                  <img
                    src={userInfo.profileImg}
                    alt="Profile"
                    className="h-60 w-60 rounded-full"
                  />
                </div>
              )}
              <p>We're delighted to see you again. Your presence adds so much to our community! As you embark on today's journey, remember that every step you take brings you closer to your goals. May your day be filled with joy, productivity, and meaningful connections.</p>
            </div>
          ) : (
            <p className='text-xl font-bold' style={{ color: '#333', fontStyle: 'italic' }}>
              Good day! We hope this message finds you well. Remember, every day is a new opportunity to achieve greatness. Wishing you a day filled with positivity and success! Please login to continue exploring our platform and unlocking all its features. Your journey awaits! Thank you for being part of our community.
            </p>
          )}
        </div>
      </div>
    </div>

  )
}

export default Home
