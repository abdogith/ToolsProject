import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'user', // Default role is 'user'
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phone: Yup.string().matches(/^\d{11}$/, 'Phone must be 11 digits').required('Phone is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    role: Yup.string().oneOf(['user', 'admin'], 'Invalid role').required('Role is required'),
  });

  const onSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const apiUrl = "https://backend-abdopython2001-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/api/users/register";
      await axios.post(apiUrl, values);
      alert('Registration successful!');
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response || error.message);
      setErrors({ api: error.response?.data || 'Registration failed. Try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="register-container">
      <h2>User Registration</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            <div>
              <label>Name</label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div>
              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label>Phone</label>
              <Field type="text" name="phone" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div>
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div>
              <label>Role</label>
              <Field type="text" name="role" />
              <ErrorMessage name="role" component="div" className="error" />
            </div>

            {errors.api && <div className="error">{errors.api}</div>}

            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;

