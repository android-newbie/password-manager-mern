import React, { useState, useEffect } from 'react';
import "./Signup.css";
import { Link, useHistory } from "react-router-dom";
import img from "../../assets/images/signup.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signupUser } from '../../axios/instance';
import { useSelector } from "react-redux";
import ReactLoading from 'react-loading';

function Signup()
{
    const isAuthenticated = useSelector(state => state.isAuthenticated);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    });
    const [passwordStrength, setPasswordStrength] = useState("");
    const [cnfPasswordStrength, setCnfPasswordStrength] = useState("");


    const handleChange = (e) =>
    {
        const { name, value } = e.target;

        setUserData((prevData) =>
        {
            return {
                ...prevData,
                [name]: value
            }
        })

        if(e.target.id === 'password'){
            console.log('password changes', e.target.value);
            let strength = checkPasswordStrength(e.target.value);
            strength === true? setPasswordStrength("Strong") : setPasswordStrength("Weak");;
        }
        if(e.target.id === 'cpassword'){
            console.log('password changes', e.target.value);
            let strength = checkPasswordStrength(e.target.value);
            strength === true? setCnfPasswordStrength("Strong") : setCnfPasswordStrength("Weak");;
        }

        // Check password strength
    }

    const checkPasswordStrength = (password) => {
        // Implement your own logic to determine password strength
        // You can use regular expressions, libraries, or APIs for a more sophisticated check
        // For simplicity, let's check if the password length is at least 6 characters
                    
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialCharacter = /[!@#$%^&*]/.test(password);
        const hasNumber = /\d/.test(password);

        if (password.length >= 8 && hasUpperCase && hasLowerCase && hasSpecialCharacter && hasNumber) {
            return true;
        } else {
            return false;
        }
      }

    const handleRegister = async () =>
    {
        setIsLoading(true);
        try
        {
            const res = await signupUser(userData);

            if (res.status === 400)
            {
                toast.error(res.data.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoading(false);
            }
            else if (res.status === 201)
            {
                setUserData({
                    name: "",
                    email: "",
                    password: "",
                    cpassword: ""
                });

                toast.success(res.data.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setIsLoading(false);
                history.push("/signin");

            }
        }
        catch (error)
        {
            console.log(error);
        }
    }

    useEffect(() =>
    {
        isAuthenticated && history.replace("/");
    }, [isAuthenticated, history]);

    return (
        <div className="signup">
            <ToastContainer />
            <div className="signup__wrapper">


                <div className="signup__left">

                    <div className="inputs">
                        <label> Full Name </label>
                        <input type="text" placeholder="Full Name" name="name" autoComplete={"off"} onChange={handleChange} value={userData.name} required />
                    </div>


                    <div className="inputs">
                        <label> Email </label>
                        <input type="email" placeholder="Email" name="email" autoComplete={"off"} onChange={handleChange} value={userData.email} required />
                    </div>

                    <div className="inputs">
                        <label> Password </label>
                        <input type="password" placeholder="Password" name="password" id='password' required onChange={handleChange} value={userData.password} />
                        {userData.password !== '' && 
                        <p className={` ${passwordStrength==='Weak' ? 'red' : 'green'}`}>Password Strength: {passwordStrength}</p> }

                    </div>

                    <div className="inputs">
                        <label> Confirm Password </label>
                        <input type="password" placeholder="Confirm Password" name="cpassword" id='cpassword' onChange={handleChange} required value={userData.cpassword} />
                        {userData.cpassword !== '' &&
                        <p className={` ${cnfPasswordStrength==='Weak' ? 'red' : 'green'}`}>Password Strength: {cnfPasswordStrength}</p>}

                    </div>

                    <p>
                        Alredy have an account? <Link to="/signin">Login</Link>
                    </p>

                    { isLoading && <ReactLoading type={"balls"} color={"#ff1f5a"} height={20} width={20} />}
                    <button onClick={handleRegister}> SignUp </button>
                </div>


                <div className="signup__right">
                    <img src={img} alt="login.jpg" />

                    <div className="signup__content">
                        <h1> SignUp </h1>
                        <h4> Get your password secured with us for free. </h4>

                        <p> Already have an account ?
                            <Link to="/signin"> Login </Link> </p>


                        <a className="attr" href='https://www.freepik.com/vectors/star' target="_blank" rel="noreferrer">Star vector created by vectorpouch - www.freepik.com</a>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default Signup;
