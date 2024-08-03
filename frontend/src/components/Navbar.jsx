import React from "react";
// import { Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, MobileNav, Typography, Button, IconButton } from "@material-tailwind/react";
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

export function StickyNavbar() {
    const [openNav, setOpenNav] = React.useState(false);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            console.log('logouthandler');
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    };

    return (

        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    Mern Auth
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-x-1">
                        {/* Profile Button */}
                        <NavLink to={"/profile"}>
                            <Button variant="text" size="sm">
                                <span>Profile</span>
                            </Button>
                        </NavLink>
                        {/* Log In Button */}
                        <span>
                            {userInfo ? (
                                <span className="font-semibold text-sm mr-3">{userInfo.name}</span>
                            ) : (
                                <NavLink to="/login">
                                    <Button className="">
                                        <span>Log In</span>
                                    </Button>
                                </NavLink>
                            )}
                        </span>

                        {/* Log Out Button */}
                        {userInfo && <Button onClick={logoutHandler} variant="gradient" size="sm">
                            <span>LogOut</span>
                        </Button>}
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
        </Navbar>

    );
};
