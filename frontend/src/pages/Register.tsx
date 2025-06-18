import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import Menu from '../components/Menu';
import Notification from '../components/Notification';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', repeatPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const apiUrl = (import.meta.env.VITE_API_URL as string)?.replace(/\/$/, '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowError(false);
    if (form.password.length < 5) {
      setError('Password must be at least 5 characters.');
      setShowError(true);
      return;
    }
    if (form.password !== form.repeatPassword) {
      setError('Passwords do not match.');
      setShowError(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      navigate('/login');
    } catch (err: any) {
      setError(err.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Menu />
      <Notification show={showError} message={error} onClose={() => setShowError(false)} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Card className="mx-auto" style={{ maxWidth: 400 }}>
          <Card.Body>
            <Card.Title className="mb-4">Register</Card.Title>
            <Form onSubmit={handleSubmit} autoComplete="off">
              <Form.Group className="mb-3" controlId="registerName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required
                  minLength={2}
                  maxLength={50}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                  minLength={5}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="registerRepeatPassword">
                <Form.Label>Repeat Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat your password"
                  value={form.repeatPassword}
                  onChange={e => setForm({ ...form, repeatPassword: e.target.value })}
                  required
                  minLength={5}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100" disabled={loading}>
                {loading ? 'Registering...' : 'Register'}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Register;
