import { useEffect, useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import Menu from '../components/Menu';
import Notification from '../components/Notification';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', email: '', avatar: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const apiUrl = (import.meta.env.VITE_API_URL as string)?.replace(/\/$/, '');
        const token = localStorage.getItem('token');
        const res = await fetch(`${apiUrl}/auth/me`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load profile');
        setProfile({ name: data.user.name, email: data.user.email, avatar: data.user.avatar || '' });
      } catch (err: any) {
        setError(err.message);
        setShowError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setShowError(false);
    setSuccess(false);
    try {
      const apiUrl = (import.meta.env.VITE_API_URL as string)?.replace(/\/$/, '');
      const token = localStorage.getItem('token');
      const res = await fetch(`${apiUrl}/auth/updateprofile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Update failed');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
      setShowError(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', minWidth: '100vw', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <Menu />
      <Notification show={showError} message={error} onClose={() => setShowError(false)} />
      <Notification show={success} message="Profile updated!" onClose={() => setSuccess(false)} variant="success" />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Card className="mx-auto" style={{ maxWidth: 400 }}>
          <Card.Body>
            <Card.Title className="mb-4">Profile</Card.Title>
            {loading ? (
              <div className="text-center"><Spinner animation="border" /></div>
            ) : (
              <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Group className="mb-3" controlId="profileName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="profileEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="profileAvatar">
                  <Form.Label>Avatar URL</Form.Label>
                  <Form.Control
                    type="text"
                    name="avatar"
                    value={profile.avatar}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button type="submit" variant="primary" className="w-100">Update Profile</Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
