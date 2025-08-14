import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleprovider } from './firebaseconfig';

const Home = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      const user = result.user;
      navigate('/loggedin', { state: { displayName: user.displayName } });
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
      alert('Failed to sign in with Google. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="text-center mb-5">
            <div className="card text-center mb-5" style={{ backgroundColor: '#f0f0f0', padding: '2rem' }}>
              <h1 className="display-4 mb-3" style={{ fontWeight: 'bold', fontSize: '3.5rem', color: '#8B0000' }}>No Objection Certificate System</h1>
              <p className="lead" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#8B0000' }}>
                A streamlined platform for students to request and track No Objection Certificates.
              </p>
            </div>
            <div className="mt-4">
              <button 
                onClick={handleGoogleSignIn} 
                className="btn btn-danger btn-lg d-flex align-items-center justify-content-center mx-auto" 
                style={{ backgroundColor: '#DB4437', borderColor: '#DB4437', color: 'white', padding: '10px 20px', borderRadius: '5px', fontSize: '1.2rem' }}
              >
                <img 
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                  alt="Google logo" 
                  style={{ width: '24px', height: '24px', marginRight: '10px' }}
                />
                Sign in with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;