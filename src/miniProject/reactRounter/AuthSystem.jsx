// import React, { useState, useEffect } from 'react';
// // import './AuthSystem.css'; // Create this CSS file with the styles from above

// const AuthSystem = () => {
//   const [activeForm, setActiveForm] = useState('login');
//   const [users, setUsers] = useState([]);
//   const [formData, setFormData] = useState({
//     loginEmail: '',
//     loginPassword: '',
//     signupName: '',
//     signupEmail: '',
//     signupPassword: '',
//     signupConfirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     setUsers(storedUsers);
//   }, []);

//   const handleToggle = (form) => {
//     setActiveForm(form);
//     setErrors({});
//     setSuccessMessage('');
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(email);
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (!validateEmail(formData.loginEmail)) {
//       newErrors.loginEmail = 'Please enter a valid email';
//     }

//     if (formData.loginPassword.length < 6) {
//       newErrors.loginPassword = 'Password must be at least 6 characters';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const user = users.find(u => u.email === formData.loginEmail);

//     if (!user) {
//       newErrors.loginEmail = 'Account not found';
//       setErrors(newErrors);
//       return;
//     }

//     if (user.password !== formData.loginPassword) {
//       newErrors.loginPassword = 'Incorrect password';
//       setErrors(newErrors);
//       return;
//     }

//     setSuccessMessage('Login successful! Redirecting...');
//     setTimeout(() => {
//       window.location.href = '/dashboard';
//     }, 1500);
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();
//     const newErrors = {};

//     if (formData.signupName.trim().length < 2) {
//       newErrors.signupName = 'Name must be at least 2 characters';
//     }

//     if (!validateEmail(formData.signupEmail)) {
//       newErrors.signupEmail = 'Invalid email address';
//     }

//     if (formData.signupPassword.length < 6) {
//       newErrors.signupPassword = 'Password must be at least 6 characters';
//     }

//     if (formData.signupPassword !== formData.signupConfirmPassword) {
//       newErrors.signupConfirmPassword = 'Passwords do not match';
//     }

//     if (users.some(u => u.email === formData.signupEmail)) {
//       newErrors.signupEmail = 'Email already registered';
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     const newUser = {
//       id: Date.now(),
//       name: formData.signupName,
//       email: formData.signupEmail,
//       password: formData.signupPassword
//     };

//     const updatedUsers = [...users, newUser];
//     setUsers(updatedUsers);
//     localStorage.setItem('users', JSON.stringify(updatedUsers));

//     setSuccessMessage('Account created successfully! Redirecting to login...');
//     setTimeout(() => {
//       handleToggle('login');
//       setFormData({
//         ...formData,
//         signupName: '',
//         signupEmail: '',
//         signupPassword: '',
//         signupConfirmPassword: ''
//       });
//     }, 1500);
//   };

//   return (
//     <div className="auth-system">
//       <div className="background-effect"></div>
//       <div className="container">
//         <div className="auth-forms">
//           <div className="form-toggle">
//             <button
//               className={`toggle-btn ${activeForm === 'login' ? 'active' : ''}`}
//               onClick={() => handleToggle('login')}
//             >
//               Login
//             </button>
//             <button
//               className={`toggle-btn ${activeForm === 'signup' ? 'active' : ''}`}
//               onClick={() => handleToggle('signup')}
//             >
//               Sign Up
//             </button>
//           </div>

//           {successMessage && (
//             <div className="success-message">{successMessage}</div>
//           )}

//           {activeForm === 'login' ? (
//             <form className="auth-form active" onSubmit={handleLogin}>
//               <h2 className="form-title">Welcome Back</h2>
//               <div className="form-group">
//                 <label htmlFor="loginEmail">Email</label>
//                 <input
//                   type="email"
//                   id="loginEmail"
//                   name="loginEmail"
//                   value={formData.loginEmail}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.loginEmail && (
//                   <div className="error-message">{errors.loginEmail}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="loginPassword">Password</label>
//                 <input
//                   type="password"
//                   id="loginPassword"
//                   name="loginPassword"
//                   value={formData.loginPassword}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.loginPassword && (
//                   <div className="error-message">{errors.loginPassword}</div>
//                 )}
//               </div>
//               <button type="submit">Sign In</button>
//             </form>
//           ) : (
//             <form className="auth-form active" onSubmit={handleSignup}>
//               <h2 className="form-title">Join Us</h2>
//               <div className="form-group">
//                 <label htmlFor="signupName">Full Name</label>
//                 <input
//                   type="text"
//                   id="signupName"
//                   name="signupName"
//                   value={formData.signupName}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.signupName && (
//                   <div className="error-message">{errors.signupName}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="signupEmail">Email</label>
//                 <input
//                   type="email"
//                   id="signupEmail"
//                   name="signupEmail"
//                   value={formData.signupEmail}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.signupEmail && (
//                   <div className="error-message">{errors.signupEmail}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="signupPassword">Password</label>
//                 <input
//                   type="password"
//                   id="signupPassword"
//                   name="signupPassword"
//                   value={formData.signupPassword}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.signupPassword && (
//                   <div className="error-message">{errors.signupPassword}</div>
//                 )}
//               </div>
//               <div className="form-group">
//                 <label htmlFor="signupConfirmPassword">Confirm Password</label>
//                 <input
//                   type="password"
//                   id="signupConfirmPassword"
//                   name="signupConfirmPassword"
//                   value={formData.signupConfirmPassword}
//                   onChange={handleInputChange}
//                   required
//                 />
//                 {errors.signupConfirmPassword && (
//                   <div className="error-message">
//                     {errors.signupConfirmPassword}
//                   </div>
//                 )}
//               </div>
//               <button type="submit">Create Account</button>
//             </form>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// };

// export default AuthSystem;




import React, { useState } from "react";
import { motion } from "framer-motion";
import { signup, login ,findUserByEmail} from "./authService"; // Adjust the import path as necessary
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
import { directUrl } from "./Common"; // Adjust the import path as necessary
import { useNavigate } from "react-router-dom";


const AuthSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState(() => JSON.parse(localStorage.getItem("users")) || []);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateEmail(formData.email)) {
      // setMessage("Invalid email format.");
      toast.error("Invalid email format.");
      return;
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        // setMessage("Passwords do not match.");
        return;
      }
      handleSignup();
    } else {
      handleLogin();
    }
  };

  const handleSignup = async () => {
    const result = await signup(formData.name, formData.email, formData.password);
    const newUser = { ...formData, id: Date.now() };
    const updatedUsers = [...users, newUser];
    if (result.success) {
      // setUsers(updatedUsers);
      // localStorage.setItem("users", JSON.stringify(updatedUsers));
      // setMessage("Account created successfully! Please log in.");
      toast.success("Account created successfully! Please log in.");
      setIsLogin(true);
    } else {
      toast.error(result.message);
    }
  };

  const handleLogin = async () => {
    const result = await login(formData.email, formData.password);
    // const newUser = { ...formData, id: Date.now() };
    // const updatedUsers = [...users, newUser];
    if (result.success) {
      // setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(result.user));
      
      // findUserByEmail(result.user.email);
      // setMessage("Account created successfully! Please log in.");
      toast.success("Login successful! Redirecting...");

      setTimeout(() => {
        navigate(`${directUrl.taskFlow}`);
      }, 1000);
      // setIsLogin(true);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <motion.div
        className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-white0 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          <h1 className="text-4xl font-extrabold text-white mb-6 text-left">
            <Link to="/" className="text-2xl font-extrabold text-gray-700 tracking-wide md:ml-4">
              Task<span className="text-indigo-500">Flow</span>
            </Link>
          </h1>
        </motion.div>

        <motion.div className=" flex flex-col items-center justify-center mt-10 ">
          <motion.div
            className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-md w-full p-8 space-y-6 transform hover:scale-105 transition-all duration-300"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <motion.div
              className="flex justify-between bg-gray-200 rounded-lg p-3"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <button
                className={`w-1/2 p-2 font-semibold rounded-lg transition ${isLogin ? "bg-indigo-500 text-white" : "text-gray-700"}`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`w-1/2 p-2 font-semibold rounded-lg transition ${!isLogin ? "bg-indigo-500 text-white" : "text-gray-700"}`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </motion.div>

            {message && <motion.p className="text-center text-red-500 font-semibold" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>{message}</motion.p>}

            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {!isLogin && (
                <div>
                  <label className="block font-medium">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
                    required
                  />
                </div>
              )}
              <div>
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
                  required
                />
              </div>
              {!isLogin && (
                <div>
                  <label className="block font-medium">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-indigo-300"
                    required
                  />
                </div>
              )}
              <motion.button
                type="submit"
                className="w-full p-2 text-white font-semibold bg-indigo-500 rounded-lg hover:bg-indigo-600 transition-all transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </motion.button>
            </motion.form>
          </motion.div>
        </motion.div>


      </motion.div>
    </>

  );
};

export default AuthSystem;

