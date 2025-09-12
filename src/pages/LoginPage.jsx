import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import logo from '../assets/logos/Group 2.png';
import './LoginPage.css';

const API_BASE = (import.meta.env.VITE_BACKEND_URL || '').replace(/\/$/, '');

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, password: formData.password })
      });

      const data = await response.json();

      if (data.success) {
        // Store token
        localStorage.setItem('token', data.data.token);
        // Redirect based on role
        const role = data?.data?.user?.role;
        if (role === 'admin') {
          window.location.href = '/admin';
        } else {
          window.location.href = '/';
        }
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Network error. Please check if the backend server is running.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-background">
        <Container fluid className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col xs={12} sm={8} md={6} lg={4} xl={3}>
              <Card className="login-card">
                <Card.Body className="p-3">
                  <div className="text-center mb-3">
                    <img src={logo} alt="Bhalbet888" className="login-logo" />
                    <h4 className="welcome-text mt-2">Welcome back Bhalbet888</h4>
                    <p className="signin-text">Sign in to your account to continue</p>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Email address</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="form-input w-100"
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="form-label">Password</Form.Label>
                      <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="form-input w-100"
                        required
                      />
                    </Form.Group>

                    <Button type="submit" className="login-btn w-100 mb-3" size="lg">
                      Login
                    </Button>

                    <div className="text-center">
                      <span className="signup-text">
                        Don't have an account?
                        <a href="/signup" className="signup-link"> Sign up</a>
                      </span>
                    </div>
                  </Form>

                  <div className="text-center mt-3">
                    <small className="terms-text">
                      By signing in, you agree to our
                      <a href="#" className="terms-link"> Terms of Service</a> and
                      <a href="#" className="terms-link">Privacy Policy</a>
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;