/**
 * pages/Register.jsx - INSTANT HOST Registration Page
 */
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Alert, CircularProgress,
  Stack, Divider, Link, MenuItem, Select, InputLabel, FormControl,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { register } from '../utils/api';
import { useToast } from '../hooks/useToast';
import Toast from '../components/Toast';

const BRAND = {
  navy: '#1B2A6B',
  navyDark: '#111A4A',
  gold: '#F5A623',
  goldLight: '#FEF3D9',
  white: '#FFFFFF',
};

export default function Register() {
  const navigate = useNavigate();
  const { toast, showToast, hideToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('STUDENT');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setError('Please fill all required fields.');
      return;
    }
    setLoading(true);
    try {
      await register({ full_name: fullName, email, password, role });
      showToast('Account created! Please verify your email then sign in.', 'success', 'Registered');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left branding panel */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        flex: '0 0 45%',
        background: `linear-gradient(160deg, ${BRAND.navy} 0%, ${BRAND.navyDark} 100%)`,
        px: 6, py: 8,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Box sx={{ textAlign: 'center', color: BRAND.white }}>
          <ApartmentIcon sx={{ fontSize: 72, color: BRAND.white }} />
          <Typography variant="h4" fontWeight={800} mt={2}>INSTANT HOST</Typography>
          <Typography variant="body1" mt={1} sx={{ color: 'rgba(255,255,255,0.85)' }}>
            Discover hostels near you. Book with confidence.
          </Typography>
        </Box>
      </Box>

      {/* Right form panel */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#FAFAFA', px: { xs: 3, sm: 6, md: 8 } }}>
        <Box sx={{ width: '100%', maxWidth: 520 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
            <Box sx={{ p: 1, bgcolor: BRAND.goldLight, borderRadius: 2 }}>
              <LockOpenIcon sx={{ color: BRAND.navy }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={800} color={BRAND.navy}>Create Account</Typography>
              <Typography variant="body2" color="text.secondary">Sign up and start discovering hostels</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {error && <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField label="Full Name" fullWidth margin="normal" value={fullName} onChange={e => setFullName(e.target.value)} required autoFocus />
            <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />

            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">I am a...</InputLabel>
              <Select labelId="role-label" value={role} label="I am a..." onChange={e => setRole(e.target.value)}>
                <MenuItem value="STUDENT">Student</MenuItem>
                <MenuItem value="CUSTODIAN">Hostel Custodian</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit" variant="contained" fullWidth disabled={loading}
              sx={{ mt: 2, py: 1.4, fontWeight: 700, bgcolor: BRAND.navy, '&:hover': { bgcolor: BRAND.navyDark }, borderRadius: 2 }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Create Account'}
            </Button>
          </Box>

          <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
            {'Already have an account? '}
            <Link component={RouterLink} to="/login" sx={{ color: BRAND.navy, fontWeight: 700 }}>Sign in</Link>
          </Typography>
        </Box>
      </Box>

      <Toast toast={toast} onClose={hideToast} />
    </Box>
  );
}
