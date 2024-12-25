import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      const apiUrl = "https://backend-abdopython2001-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/users/login";

      const response = await axios.post(apiUrl, values);

      const { token } = response.data;

      localStorage.setItem('authToken', token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert('Login successful!');
      navigate('/dashboard');
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
