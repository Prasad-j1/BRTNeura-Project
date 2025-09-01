



import React from 'react'
import '../style/SignUp.css'
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';  // import firebase auth
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();

  // handle signup with email & password
  const handleSignUp = async (e) => {
    e.preventDefault();

    const name = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // update display name
      await updateProfile(user, { displayName: name });

      alert("Sign up successful!");
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  // handle google signup
  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Signed up with Google!");
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <div className="header">
        <h1>BRTNeura Technology</h1>
      </div>

      <div className='loginpage' style={{marginTop:"6%"}}>
        <form className='form' onSubmit={handleSignUp} style={{padding: "50px 30px"}}>
          <h3>Sign Up</h3>

          <div className="input">
            <input type="text" name="username" placeholder="Username" required className='text' />
            <input type="email" name="email" placeholder="Email" required className='text' />
            <input type="password" name="password" placeholder="Password" required className='password' />
          </div>

          <button type="submit">Sign Up</button>

          <button 
                type="button" 
                className="googlebtn" 
                onClick={handleGoogleSignUp}
                style={{height: "50px",display:"flex",alignItems:"center",justifyContent:"center",gap:"10px",background:"rgb(37 99 235)",// background:"#4285f4",color:"white"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width="20" height="20" fill="currentColor"
                >
                  <path d="M488 261.8C488 403.3 391.1 504 248 504  110.8 504 0 393.2 0 256S110.8 8 248 8 c66.8 0 123 24.5 166.3 64.9l-67.5 64.9 C258.5 52.6 94.3 116.6 94.3 256 c0 86.5 69.1 156.6 153.7 156.6  98.2 0 135-70.4 140.8-106.9H248v-85.3 h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                </svg>
                Sign up with Google
          </button>

          <h5>Already have an account? <a href="/">Log In</a></h5>
        </form>
      </div>
    </>
  )
}

export default SignUp
