import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import {
  useGetUsersDataMutation,
  usePutBlockUserMutation,
  useDeleteUserMutation,
  useUpdateUserDataMutation,
  useAdminLogoutMutation,
} from "../slices/adminSlices";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { adminlogout,logout } from "../slices/authSlice"; 
import { NavLink } from "react-router-dom";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [getUsersData] = useGetUsersDataMutation();
  const [putBlockUser] = usePutBlockUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserDataMutation();
  const [adminLogout] = useAdminLogoutMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchUser() {
      const res = await getUsersData().unwrap("");
      setUsers(res.user);
    }
    fetchUser();
  }, [data, getUsersData, updateModalOpen]);

  useEffect(() => {
    // Function to filter users based on search criteria
    const filterUsers = () => {
      const filtered = users.filter((user) => {
        const userName = user.name.toLowerCase();
        const userEmail = user.email.toLowerCase();
        const searchValue = search.toLowerCase();
        return (
          userName.includes(searchValue) || userEmail.includes(searchValue)
        );
      });
      setFilteredUsers(filtered);
    };

    // Call the filter function whenever users or search value changes
    filterUsers();
  }, [users, search]);

  const handleDelete = async () => {
    if (userId) {
      await deleteUser(userId).unwrap("");
      setData((prevData) => !prevData);
      setUserId(null);
      setIsOpen(false);
      if (userInfo && userInfo._id === userId) {
        dispatch(logout());
      }
    }
  };


  const handleDeleteClick = (userId) => {
    setUserId(userId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  const handleUpdate = (obj) => {
    setUserId(obj._id);
    setName(obj.name);
    setEmail(obj.email);
    setUpdateModalOpen(true);
  };

  // updating the user informations
  const submitUpdateHandler = async (e) => {
    e.preventDefault();

    // Regular expression for password validation (at least 6 characters with at least one special character)

    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
    
    const nameRegex = /^[^\s]+(\s[^\s]+)*$/;

    // Check if any field is empty
    if (!name || !mobile || !email) {
      toast.error("All fields should be filled");
    } else if (!name.match(nameRegex)) {
      toast.error("Name cannot contain consecutive spaces");
    } else if (!mobile.match(mobileRegex)) {
      toast.error("Enter a valid mobile number");
    } else if (!email.match(emailRegex)) {
      toast.error("Invalid email address");
    } else if (password && !password.match(passwordRegex)) {
      toast.error(
        "Password must be at least 6 characters and contain at least one special character"
      );
    } else if (password && password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        console.log(name, mobile, email, userId);
        console.log("inside the try");
        const res = await updateUser({
          _id: userId,
          name,
          email,
          password,
          mobile,
        }).unwrap();
        console.log(res);
        setUpdateModalOpen(false);
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };


  // log out handling
  const handleLogout = async () => {
    try {
      await adminLogout().unwrap();
      dispatch(adminlogout());
      navigate("/admin");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="w-full h-20 bg-white border-2 shadow-md">
        <span className="text-xl font-bold absolute mt-4 ml-5">Welcome Admin</span> 
        <div className="w-full flex justify-end">
            <button onClick={handleLogout} className="h-10 w-20 hover:bg-red-700 bg-black rounded-lg text-white hover:scale-105 mr-10 mt-5">Log Out</button>
        </div>
    <div className="flex items-center justify-center mt-20">
      <div className="overflow-x-auto h-3/5 w-3/5 max-lg:w-ful p-5 max-lg:px-4 rounded-md border-2 shadow-md bg-white">
        <div className="flex justify-around max-sm:grid items-center">
          <div>
            <h1 className="mb-5 text-3xl font-bold max-lg:text-xl">
              User Management
            </h1>
          </div>
          <div className="flex ml-16">
            <input
              placeholder="Search Users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md rounded-br-none rounded-tr-none border max-lg:py-2 border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
            />
            <button className="bg-blue-500  max-lg:text-xs p-2 hover:cursor-pointer rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors py-[12px]">
              Search
            </button>
          </div>
            <div>
             <NavLink to={'/addNewUser'}>
             <button
             data-ripple-light="true"
             type="button"
             className="block select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
           >
             Add User
           </button>
             </NavLink>
            </div>
        </div>
        <table className="min-w-full bg-white border border-gray-300 mt-3">
          <thead>
            <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2"></th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
            
              <th className="border border-gray-300 p-2 flex items-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((obj, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="border-r border-gray-300 flex justify-center">
                    <img src={obj.profileImg} className="h-10 w-10 rounded-full mt-2" alt="" />
                </td>
                <td className="border-r border-gray-300 p-2">{obj.name}</td>
                <td className="border-r border-gray-300 p-2">{obj.email}</td>
               
                <td className="flex justify-between p-2">
                  <button
                    onClick={() => handleUpdate(obj)}
                    className="hover:scale-105"
                  >
                    <FaUserEdit
                      size={25}
                      style={{ color: "black", transition: "color 0.3s ease" }}
                      onMouseOver={(e) => (e.target.style.color = "blue")}
                      onMouseOut={(e) => (e.target.style.color = "black")}
                    />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(obj._id)}
                    className="mt-2 hover:scale-105"
                  >
                    <MdDelete
                      size={25}
                      style={{ color: "black", transition: "color 0.3s ease" }}
                      onMouseOver={(e) => (e.target.style.color = "red")}
                      onMouseOut={(e) => (e.target.style.color = "black")}
                    />
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        // onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete User Modal"
      >
        <p className="font-bold text-xl mt-5 text-blue-600">
          Are you sure you want to delete this user?
        </p>
        <div className="flex justify-around mt-10">
          <button
            onClick={closeModal}
            className="h-10 w-20 hover:bg-green-700 bg-black rounded-lg text-white hover:scale-105"
          >
            No
          </button>
          <button
            onClick={handleDelete}
            className="h-10 w-20 hover:bg-red-700 bg-black rounded-lg text-white hover:scale-105"
          >
            Proceed
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={updateModalOpen}
        style={customStyles}
        contentLabel="Update User Modal"
      >
        <div className="grid gap-5 p-5">
          <div>
            <input
              onChange={(e) => setName(e.target.value)}
              placeholder=""
              type="text"
              value={name}
              className="rounded-md w-80 border border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
            />
          </div>
          <div>
            <input
              onChange={(e) => setMobile(e.target.value)}
              placeholder=""
              type="text"
              value={mobile}
              className="rounded-md w-full border border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
            />
          </div>
          <div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              placeholder=""
              type="email"
              value={email}
              className="rounded-md border w-full border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
            />
          </div>
          <div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter New Password"
              type="password"
              className="rounded-md border w-full border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
            />
          </div>
          <div>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              type="password"
              className="rounded-md border w-full border-blue-gray-200 px-3 py-3 font-sans text-sm font-normal  outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500"
            />
          </div>
          <div className="">
            <button
              onClick={submitUpdateHandler}
              data-ripple-light="true"
              type="button"
              className="block w-full select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Update Details
            </button>
          </div>
        </div>
      </Modal>
    </div>
    </div>
  );
}

export default Dashboard;