import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from './FormContainer';
import { toast } from 'react-toastify';
import Loader from './Loader';
import { storage } from '../../../backend/firebase/config';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSetImgMutation, useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
    const [email, setEmail] = useState('');
    const [image, setImage] = useState("");
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();

    const { userInfo } = useSelector((state) => state.auth);
    const [updateProfile, { isLoading }] = useUpdateUserMutation();
    const [useProfileSetting] = useSetImgMutation()
    // const [setImg] = useSetImgMutation();
    const navigate = useNavigate();
    console.log(userInfo);
    useEffect(() => {
        setName(userInfo.name);
        setEmail(userInfo.email);
        setMobile(userInfo.mobile);
        setImage(userInfo.profileImg)
    }, [userInfo.email, userInfo.name, userInfo.mobile, navigate]);

    //input image
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file from the input field

        if (file) {
            const reader = new FileReader(); // Create a new FileReader object

            reader.onloadend = () => {
                setImage(reader.result); // Set the result of reading the file as the image preview
            };

            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };

    const handleClick = () => {
        document.getElementById("fileInput").click();
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        // Regular expression for password validation (at least 6 characters with at least one special character)
        const emailRegex = /^\S+@\S+\.\S+$/;
        const passwordRegex =
            /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.*[a-zA-Z0-9]).{6,}$/;
        const mobileRegex = /^(?![0-5])\d{10}$/;
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
        } else if (password !== confirmPassword) {
            toast.error('Passwords do not match');
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id,
                    name,
                    email,
                    password,
                    mobile,
                }).unwrap();
                console.log(res);
                dispatch(setCredentials({ ...res }));
                toast.success('Profile updated successfully');
                navigate('/');
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }

        }
    };

    // Save the image 
    const saveimage = async () => {
        try {
            // Get the file from the imagePreview
            const file = await fetch(image).then((res) => res.blob());

            // Generate a unique filename for the image
            const fileName = `${userInfo._id}_${Date.now()}.jpg`; // Example: "userID_timestamp.jpg"

            // Create a storage reference with the generated filename
            const storageRef = ref(storage, `/images/${fileName}`);

            // Upload the file
            const snapshot = await uploadBytes(storageRef, file);

            // Get the download URL of the uploaded image
            const downloadURL = await getDownloadURL(snapshot.ref);

            try {
                console.log(downloadURL, userInfo._id);
                const res = await useProfileSetting({
                    url: downloadURL,
                    id: userInfo._id
                }).unwrap()
                dispatch(setCredentials(res));
                toast.success('Image added successfully')
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }

        } catch (error) {
            console.error("Error uploading image:", error);
            // Handle errors here
        }
    };

    return (
        <FormContainer>
            <h1>Update Profile</h1>

            <Form onSubmit={submitHandler}>

                <Form.Group className='my-2' controlId='image'>
                    <Form.Label> Profile Image </Form.Label>
                    <Button variant='secondary' onClick={handleClick}>
                        Choose Image
                    </Button>
                    <Form.Control
                        id='fileInput'
                        type='file'
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    {image && (
                        <div className='my-2'>
                            <img
                                src={image}
                                alt='Preview'
                                style={{ maxWidth: '100%', marginLeft: '20px' }}
                                onClick={handleClick}
                                className='h-60 w-60 rounded-full max-md:ml-20'
                            />
                        </div>
                    )}
                </Form.Group>

                <Button
                    onClick={saveimage}
                    className='h-10 ml-20 w-20 hover:bg-green-500 bg-black rounded-lg text-white hover:scale-105'
                >
                    SAVE
                </Button>

                <Form.Group className='my-2' controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='mobile'>
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Mobile'
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group className='my-2' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>



                <Form.Group className='my-2' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>


                <Form.Group className='my-2' controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Update
                </Button>

                {isLoading && <Loader />}
            </Form>
        </FormContainer>
    );
};

export default ProfileScreen;