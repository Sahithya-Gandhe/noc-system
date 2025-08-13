import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    department: '',
    studentId: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
    userType: Yup.string().required('Required'),
    department: Yup.string().required('Required'),
    studentId: Yup.string().when('userType', {
        is: 'student',
      then: (schema) => schema.required('Student ID is required for students')
    })
  });

  const handleSubmit = (values) => {
    setError('');
    try {
      // In a real app, you would send this data to your backend
      register(values);
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h2>Register for NOC System</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <div className="form-group mb-3">
                <label htmlFor="name">Full Name</label>
                <Field 
                  type="text" 
                  name="name" 
                  className="form-control" 
                  placeholder="Enter your full name"
                />
                <ErrorMessage name="name" component="div" className="text-danger" />
              </div>

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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field 
                  type="password" 
                  name="confirmPassword" 
                  className="form-control" 
                  placeholder="Confirm your password"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="userType">Register As</label>
                <Field as="select" name="userType" className="form-control">
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </Field>
                <ErrorMessage name="userType" component="div" className="text-danger" />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="department">Department</label>
                <Field as="select" name="department" className="form-control">
                  <option value="">Select Department</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="Library">Library</option>
                  <option value="TPO">Training & Placement Office</option>
                </Field>
                <ErrorMessage name="department" component="div" className="text-danger" />
              </div>

              {values.userType === 'student' && (
                <div className="form-group mb-3">
                  <label htmlFor="studentId">Student ID</label>
                  <Field 
                    type="text" 
                    name="studentId" 
                    className="form-control" 
                    placeholder="Enter your student ID"
                  />
                  <ErrorMessage name="studentId" component="div" className="text-danger" />
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary w-100" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>
        
        <div className="mt-3 text-center">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Register;