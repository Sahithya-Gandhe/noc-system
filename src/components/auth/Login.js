import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = {
    email: '',
    password: '',
    userType: 'student'
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().required('Required'),
    userType: Yup.string().required('Required')
  });

  const handleSubmit = (values) => {
    setError('');
    // In a real app, you would validate credentials against a backend
    // For demo purposes, we'll use mock authentication
    try {
      login(values.email, values.password, values.userType);
      
      // Redirect based on user type
      if (values.userType === 'student') {
        navigate('/student/dashboard');
      } else {
        navigate('/faculty/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Login to NOC System</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <Field 
                  type="email" 
                  name="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <Field 
                  type="password" 
                  name="password" 
                  className="form-control" 
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="userType">Login As</label>
                <Field as="select" name="userType" className="form-control">
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </Field>
                <ErrorMessage name="userType" component="div" className="text-danger" />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary w-100" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        
        <div className="mt-3 text-center">
          <p>Don't have an account? <a href="/register">Register here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;