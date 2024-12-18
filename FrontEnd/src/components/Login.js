
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config'; // Import the centralized API base URL

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, values);

      // Assuming the backend sends a token in the response
      const { token } = response.data;

      // Save the token to localStorage
      localStorage.setItem('authToken', token);

      // Add the token to Axios default headers for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert('Login successful!');
      navigate('/dashboard'); // Redirect to dashboard or another protected route
    } catch (error) {
      console.error('Login error:', error.response || error.message);

      // Handle backend validation errors
      if (error.response?.status === 401) {
        setErrors({ api: 'Invalid email or password' });
      } else {
        setErrors({ api: 'Something went wrong. Please try again later.' });
      }
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <div className="login-container">
      <h2>User Login</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            {errors.api && <div className="error">{errors.api}</div>}

            <button type="submit" disabled={isSubmitting}>
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
