import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser } from 'react-icons/fa';
import logo from '../assets/logos/Group 2.png';
import './LoginPage.css';

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions!');
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Registration successful! You can now login.');
        // Store token if needed
        localStorage.setItem('token', data.data.token);
        // Redirect to login or dashboard
        window.location.href = '/login';
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Network error. Please check if the backend server is running.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <Container fluid className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col md={5} className='m-auto'>
              <Card className="login-card">
                <Card.Body className="p-3">
                  {/* Logo */}
                  <div className="text-center mb-3">
                    <img src={logo} alt="Bhalbet888" className="login-logo" />
                    <h4 className="welcome-text mt-2">Join Bhalbet888</h4>
                    <p className="signin-text">Create your account to get started</p>
                  </div>

                  {/* Sign Up Form */}
                  <Form onSubmit={handleSubmit}>
                    {/* Full Name Field */}
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Full Name</Form.Label>
                      <div className="input-group">
                        
                        <Form.Control
                          type="text"
                          name="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="form-input w-100"
                          required
                        />
                      </div>
                    </Form.Group>

                    {/* Email Field */}
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Email address</Form.Label>
                      <div className="input-group">
                        
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input w-100"
                          required
                        />
                      </div>
                    </Form.Group>

                    {/* Password Field */}
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Password</Form.Label>
                      <div className="input-group">
                        
                        <Form.Control
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          placeholder="Enter your password"
                          value={formData.password}
                          onChange={handleInputChange}
                          className="form-input w-100"
                          required
                        />
                       
                      </div>
                    </Form.Group>

                    {/* Confirm Password Field */}
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Confirm Password</Form.Label>
                      <div className="input-group">
                       
                        <Form.Control
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          className="form-input w-100"
                          required
                        />
                       
                      </div>
                    </Form.Group>

                    {/* Terms Checkbox */}
                    <Form.Group className="mb-3">
                      <Form.Check
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        label={
                          <span className="terms-text">
                            I agree to the 
                            <a href="#" className="terms-link"> Terms of Service</a> and 
                            <a href="#" className="terms-link">Privacy Policy</a>
                          </span>
                        }
                        className="custom-checkbox"
                        required
                      />
                    </Form.Group>

                    {/* Sign Up Button */}
                    <Button 
                      type="submit" 
                      className="login-btn w-100 mb-3"
                      size="lg"
                    >
                      Sign Up
                    </Button>

                    {/* Login Link */}
                    <div className="text-center">
                      <span className="signup-text">
                        Already have an account? 
                        <a href="/login" className="signup-link"> Sign in</a>
                      </span>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SignUpPage;