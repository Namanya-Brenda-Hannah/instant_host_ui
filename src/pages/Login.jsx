/**
 * pages/Login.jsx - Ostello Login Page
 */
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Alert, CircularProgress,
  Stack, Divider, Link,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { login } from '../utils/api';
import { useToast } from '../hooks/useToast';
import Toast from '../components/Toast';

const BRAND = {
  teal: '#0E7C6B',
  tealDark: '#065C50',
  orange: '#F2994A',
  orangeLight: '#FDE8D0',
  white: '#FFFFFF',
};

export default function Login({ setToken }) {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      const { token } = await login({ email, password });
      localStorage.setItem('token', token);
      if (setToken) setToken(token);
      showToast('Welcome back!', 'success', 'Login Successful');
      setTimeout(() => navigate('/dashboard'), 900);
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left branding panel */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        background: `linear-gradient(160deg, ${BRAND.teal} 0%, ${BRAND.tealDark} 100%)`,
        px: 6, py: 8,
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '60px solid rgba(242,153,74,0.1)', top: -80, left: -80 }} />
        <Box sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '40px solid rgba(242,153,74,0.07)', bottom: -50, right: -50 }} />
        <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: BRAND.white, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>
          <ApartmentIcon sx={{ fontSize: 52, color: BRAND.teal }} />
        </Box>
        <Typography variant="h4" sx={{ color: BRAND.white, fontWeight: 800, textAlign: 'center', mb: 1 }}>
          Ostello
        </Typography>
        <Box sx={{ width: 60, height: 3, bgcolor: BRAND.orange, borderRadius: 2, my: 2 }} />
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', textAlign: 'center', maxWidth: 300, lineHeight: 1.7 }}>
          Find your perfect student hostel. Book rooms, read reviews, and settle in with ease.
        </Typography>
      </Box>

      {/* Right form panel */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#FAFAFA', px: { xs: 3, sm: 6, md: 8 }, py: 6 }}>
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 3 }}>
            <ApartmentIcon sx={{ fontSize: 48, color: BRAND.teal }} />
            <Typography variant="h6" fontWeight={800} color={BRAND.teal}>Ostello</Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>
            <Box sx={{ p: 1, bgcolor: BRAND.orangeLight, borderRadius: 2 }}>
              <LockIcon sx={{ color: BRAND.teal, fontSize: 22 }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={800} color={BRAND.teal}>Sign In</Typography>
              <Typography variant="body2" color="text.secondary">Welcome back</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2.5 }} />

          {error && <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email" type="email" fullWidth margin="normal"
              value={email} onChange={e => setEmail(e.target.value)}
              required autoFocus autoComplete="email"
              slotProps={{ input: { startAdornment: <EmailIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}
            />
            <TextField
              label="Password" type="password" fullWidth margin="normal"
              value={password} onChange={e => setPassword(e.target.value)}
              required autoComplete="current-password"
              slotProps={{ input: { startAdornment: <LockIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}
            />
            <Button
              type="submit" variant="contained" fullWidth disabled={loading}
              sx={{ mt: 3, py: 1.4, fontWeight: 700, fontSize: 15, bgcolor: BRAND.teal, '&:hover': { bgcolor: BRAND.tealDark }, borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Sign In'}
            </Button>
          </Box>

          <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
            {"Don't have an account? "}
            <Link component={RouterLink} to="/register" sx={{ color: BRAND.teal, fontWeight: 700 }}>
              Register here
            </Link>
          </Typography>
        </Box>
      </Box>

      <Toast toast={toast} onClose={hideToast} />
    </Box>
  );
}
