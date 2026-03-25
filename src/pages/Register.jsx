/**
 * pages/Register.jsx — Ostello Registration Page
 */
import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Button, TextField, Typography, Alert, CircularProgress,
  Stack, Divider, Link, MenuItem, Select, InputLabel, FormControl,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { register } from '../utils/api';
import { useToast } from '../hooks/useToast';
import Toast from '../components/Toast';

const BRAND = {
  teal: '#0E7C6B',
  tealDark: '#065C50',
  orange: '#F2994A',
  orangeLight: '#FDE8D0',
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
      showToast('Account created — check your email to verify.', 'success', 'Registered');
      setTimeout(() => navigate('/login'), 900);
    } catch (err) {
      setError(err.message || 'Registration failed.');
      showToast(err.message || 'Registration error', 'error', 'Register Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, flex: '0 0 45%', background: `linear-gradient(160deg, ${BRAND.teal} 0%, ${BRAND.tealDark} 100%)`, px: 6, py: 8, alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center', color: BRAND.white }}>
          <ApartmentIcon sx={{ fontSize: 72, color: BRAND.white }} />
          <Typography variant="h4" fontWeight={800} mt={2}>Ostello</Typography>
          <Typography variant="body1" mt={1} sx={{ color: 'rgba(255,255,255,0.85)' }}>Discover hostels near you. Book with confidence.</Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#FAFAFA', px: { xs: 3, sm: 6, md: 8 } }}>
        <Box sx={{ width: '100%', maxWidth: 520 }}>
          <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
            <Box sx={{ p: 1, bgcolor: BRAND.orangeLight, borderRadius: 2 }}>
              <LockOpenIcon sx={{ color: BRAND.teal }} />
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={800} color={BRAND.teal}>Create account</Typography>
              <Typography variant="body2" color="text.secondary">Sign up and start discovering hostels</Typography>
            </Box>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {error && <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField label="Full name" fullWidth margin="normal" value={fullName} onChange={e => setFullName(e.target.value)} required />
            <TextField label="Email" type="email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} required />
            <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} required />

            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select labelId="role-label" value={role} label="Role" onChange={e => setRole(e.target.value)}>
                <MenuItem value="STUDENT">Student</MenuItem>
                <MenuItem value="CUSTODIAN">Custodian</MenuItem>
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" fullWidth disabled={loading} sx={{ mt: 2, bgcolor: BRAND.teal, '&:hover': { bgcolor: BRAND.tealDark } }}>
              {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Register'}
            </Button>
          </Box>

          <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" sx={{ color: BRAND.teal, fontWeight: 700 }}>Sign in</Link>
          </Typography>
        </Box>
      </Box>

      <Toast toast={toast} onClose={hideToast} />
    </Box>
  );
}
/**/**/**

 * pages/Register.jsx — Ostello Registration Page

 */ * pages / Register.jsx — Ostello Registration Page * pages / Register.jsx — UCU Registration Page

import { useState } from 'react';

import { useNavigate, Link as RouterLink } from 'react-router-dom'; */ *

import {

  Box, Button, TextField, Typography, Alert, CircularProgress,import { useState } from 'react'; * Same split - panel layout as Login.jsx:

Stack, Divider, Link, MenuItem,

} from '@mui/material'; import { useNavigate, Link as RouterLink } from 'react-router-dom'; * Left  → UCU branding panel(maroon)

import PersonIcon from '@mui/icons-material/Person';

import EmailIcon from '@mui/icons-material/Email'; import { * Right → Registration form(white)

import PhoneIcon from '@mui/icons-material/Phone';

import SchoolIcon from '@mui/icons-material/School'; Box, Button, TextField, Typography, Alert, CircularProgress, *

import LockIcon from '@mui/icons-material/Lock';

import HowToRegIcon from '@mui/icons-material/HowToReg'; Stack, Divider, Link, MenuItem, * KEY CONCEPTS:

import ApartmentIcon from '@mui/icons-material/Apartment';

import { register } from '../utils/api';} from '@mui/material'; * - Client - side password confirmation check before hitting the API

import { useToast } from '../hooks/useToast';

import Toast from '../components/Toast'; import PersonIcon from '@mui/icons-material/Person'; * - success state shows a green Alert, then redirects to / login after 1.5s



const BRAND = { import EmailIcon from '@mui/icons-material/Email'; *  - error state shows a red Alert for any API or validation failure

teal: '#0E7C6B',

  tealDark: '#065C50',import PhoneIcon from '@mui/icons-material/Phone'; */

orange: '#F2994A',

  orangeLight: '#FDE8D0',import SchoolIcon from '@mui/icons-material/School';

white: '#FFFFFF',

}; import LockIcon from '@mui/icons-material/Lock'; import { useState } from 'react';



export default function Register() {
  import HowToRegIcon from '@mui/icons-material/HowToReg'; import { useNavigate, Link as RouterLink } from 'react-router-dom';

  const navigate = useNavigate();

  const { toast, showToast, hideToast } = useToast(); import ApartmentIcon from '@mui/icons-material/Apartment'; import {



  const [fullName, setFullName] = useState(''); import { register } from '../utils/api'; Box, Button, TextField, Typography, Alert, CircularProgress,

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState(''); import { useToast } from '../hooks/useToast'; Stack, Divider, Link,

  const [institution, setInstitution] = useState('');

  const [role, setRole] = useState('STUDENT'); import Toast from '../components/Toast';
} from '@mui/material';

const [password, setPassword] = useState('');

const [confirm, setConfirm] = useState(''); import PersonIcon from '@mui/icons-material/Person';



const [loading, setLoading] = useState(false); const BRAND = {
  import EmailIcon from '@mui/icons-material/Email';

  const [error, setError] = useState('');

  const [success, setSuccess] = useState(''); teal: '#0E7C6B', import LockIcon from '@mui/icons-material/Lock';



  const handleSubmit = async (e) => {
    tealDark: '#065C50',import HowToRegIcon from '@mui/icons-material/HowToReg';

    e.preventDefault();

    setError(''); orange: '#F2994A',import { register } from '../utils/api';

    setSuccess('');

    orangeLight: '#FDE8D0',import ucuLogo from '../assets/uculogotousenobg.png';

    if (!fullName.trim() || !email.trim() || !password.trim()) {

      setError('Full name, email, and password are required.'); white: '#FFFFFF',import { useToast } from '../hooks/useToast';

      return;

    }
  }; import Toast from '../components/Toast';

  if(password !== confirm) {

    setError('Passwords do not match.');

return;

    }export default function Register() {
  const UCU = {



    setLoading(true);  const navigate = useNavigate(); maroon: '#7B1C1C',

    try {

      const data = await register({
        const { toast, showToast, hideToast } = useToast(); maroonDark: '#5C1010',

        full_name: fullName,

        email, gold: '#C9A227',

        phone,

        password, const [fullName, setFullName] = useState(''); goldLight: '#F5E6B0',

        role,

        institution, const [email, setEmail] = useState(''); white: '#FFFFFF',

      });

      showToast(data.message || 'Account created! Redirecting…', 'success', 'Welcome to Ostello!'); const [phone, setPhone] = useState('');
  };

  setSuccess(data.message || 'Account created! Check your email then log in.');

  setTimeout(() => navigate('/login'), 2000); const [institution, setInstitution] = useState('');

} catch (err) {

  setError(err.message || 'Registration failed.'); const [role, setRole] = useState('STUDENT');// ── Component ─────────────────────────────────────────────────────────────────

  showToast(err.message || 'Registration failed.', 'error', 'Registration Failed');

} finally {
  const [password, setPassword] = useState(''); export default function Register() {

    setLoading(false);

  } const [confirm, setConfirm] = useState(''); const navigate = useNavigate();

};

const { toast, showToast, hideToast } = useToast();

const passwordMismatch = !!confirm && password !== confirm;

const [loading, setLoading] = useState(false);

return (

  <Box sx={{ display: 'flex', minHeight: '100vh' }}>  const [error, setError] = useState('');  const [username, setUsername] = useState('');



    {/* Left branding panel */}  const [success, setSuccess] = useState('');  const [email, setEmail] = useState('');

    <Box

      sx={{
        const [password, setPassword] = useState('');

        display: { xs: 'none', md: 'flex' },

        flexDirection: 'column', justifyContent: 'center', alignItems: 'center', const handleSubmit = async (e) => {
          const [confirm, setConfirm] = useState('');

          width: '45%',

            background: `linear-gradient(160deg, ${BRAND.teal} 0%, ${BRAND.tealDark} 100%)`,    e.preventDefault();

    px: 6, py: 8, position: 'relative', overflow: 'hidden',

        }}    setError('');  const [loading, setLoading] = useState(false);

      >

    <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '60px solid rgba(242,153,74,0.1)', top: -80, left: -80 }} />    setSuccess('');  const [error, setError] = useState('');

    <Box sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '40px solid rgba(242,153,74,0.07)', bottom: -50, right: -50 }} />

    const [success, setSuccess] = useState('');

    <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: BRAND.white, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>

      <ApartmentIcon sx={{ fontSize: 52, color: BRAND.teal }} />    if (!fullName.trim() || !email.trim() || !password.trim()) {

        </Box>

    setError('Full name, email, and password are required.');  // ── Submit handler ──────────────────────────────────────────────────────────

    <Typography variant="h4" sx={{ color: BRAND.white, fontWeight: 800, textAlign: 'center', lineHeight: 1.2, mb: 1 }}>

          Ostello      return;  const handleSubmit = async (e) => {

        </Typography>

    }    e.preventDefault();

    <Box sx={{ width: 60, height: 3, bgcolor: BRAND.orange, borderRadius: 2, my: 2 }} />

    if (password !== confirm) {setError('');

    <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', textAlign: 'center', maxWidth: 300, lineHeight: 1.7 }}>

      Create your account and start discovering hostels near your campus.      setError('Passwords do not match.');    setSuccess('');

    </Typography>

    return;

    <Stack direction="row" spacing={1} mt={4} alignItems="center">

      <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: BRAND.orange }} />    }    if (!username.trim() || !email.trim() || !password.trim()) {

          <Typography variant="caption" sx={{ color: BRAND.orangeLight, letterSpacing: 1.5, fontSize: 10 }}>

            {role === 'CUSTODIAN' ? 'LIST YOUR HOSTEL' : 'FIND YOUR HOSTEL'}      setError('All fields are required.');

          </Typography>

          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: BRAND.orange }} />    setLoading(true);      return;

    </Stack>

  </Box>    try { }



      {/* Right form panel */ } const data = await register({ full_name: fullName, email, phone, password, role, institution });    // Client-side check — server also validates, but this gives instant feedback

<Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#FAFAFA', px: { xs: 3, sm: 6, md: 8 }, py: 6 }}>

  <Box sx={{ width: '100%', maxWidth: 420 }}>      showToast(data.message || 'Account created! Redirecting…', 'success', 'Welcome to Ostello!');    if (password !== confirm) {



    <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 3 }}>      setSuccess(data.message || 'Account created! Check your email then log in.');      setError('Passwords do not match.');

      <ApartmentIcon sx={{ fontSize: 48, color: BRAND.teal, mb: 0.5 }} />

      <Typography variant="h6" fontWeight={800} color={BRAND.teal}>Ostello</Typography>      setTimeout(() => navigate('/login'), 2000);      return;

    </Box>

  } catch (err) { }

    <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>

      <Box sx={{ p: 1, bgcolor: BRAND.orangeLight, borderRadius: 2 }}>      setError(err.message || 'Registration failed.');

        <HowToRegIcon sx={{ color: BRAND.teal, fontSize: 22 }} />

      </Box>      showToast(err.message || 'Registration failed.', 'error', 'Registration Failed');    setLoading(true);

      <Box>

        <Typography variant="h5" fontWeight={800} color={BRAND.teal}>Create Account</Typography>    } finally {    try {

          <Typography variant="body2" color="text.secondary">Fill in your details to register</Typography>

            </Box>      setLoading(false);      const data = await register(username, password, email);

    </Stack>

    }      showToast(data.message || 'Account created! Redirecting to login…', 'success', 'Welcome to UCU!');

    <Divider sx={{ my: 2.5 }} />

  };      setSuccess(data.message || 'Account created! Redirecting to login…');

    {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

    {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}      setTimeout(() => navigate('/login'), 1800);



    <Box component="form" onSubmit={handleSubmit} noValidate>  const passwordMismatch = !!confirm && password !== confirm;    } catch (err) {

      <TextField

        label="I want to…" select fullWidth margin="normal" value={role} setError(err.message || 'Registration failed. Please try again.');

      onChange={e => setRole(e.target.value)}

            >  return (      showToast(err.message || 'Registration failed.', 'error', 'Registration Failed');

      <MenuItem value="STUDENT">Find &amp; book a hostel (Student)</MenuItem>

      <MenuItem value="CUSTODIAN">List my hostel (Custodian)</MenuItem>    <Box sx={{ display: 'flex', minHeight: '100vh' }}>    } finally {

            </TextField>

      setLoading(false);

      <TextField

        label="Full Name" fullWidth margin="normal" value={fullName}      {/* Left branding panel */}    }

      onChange={e => setFullName(e.target.value)} required autoFocus

      slotProps={{ input: { startAdornment: <PersonIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}      <Box  };

            />

      <TextField sx={{

        label="Email" type="email" fullWidth margin="normal" value={ email }

              onChange={ e => setEmail(e.target.value)} required          display: {xs: 'none', md: 'flex' },  const passwordMismatch = !!confirm && password !== confirm;

      slotProps={{ input: { startAdornment: <EmailIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}

            />          flexDirection: 'column', justifyContent: 'center', alignItems: 'center',

      <TextField

        label="Phone (optional)" fullWidth margin="normal" value={phone} width: '45%',  // ── Render ──────────────────────────────────────────────────────────────────

      onChange={e => setPhone(e.target.value)}

      slotProps={{ input: { startAdornment: <PhoneIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}          background: `linear-gradient(160deg, ${BRAND.teal} 0%, ${BRAND.tealDark} 100%)`,  return (

            />

      {role === 'STUDENT' && (px: 6, py: 8, position: 'relative', overflow: 'hidden',    <Box sx={{ display: 'flex', minHeight: '100vh' }}>

        <TextField

          label="Institution (optional)" fullWidth margin="normal" value={institution}        }}

        onChange={e => setInstitution(e.target.value)}

        slotProps={{ input: { startAdornment: <SchoolIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}      >      {/* ── Left branding panel ── */}

              />

            )}        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: '60px solid rgba(242,153,74,0.1)', top: -80, left: -80 }} />      <Box

            <TextField

          label="Password" type="password" fullWidth margin="normal" value={password}        <Box sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: '40px solid rgba(242,153,74,0.07)', bottom: -50, right: -50 }} />        sx={{

            onChange={ e => setPassword(e.target.value)} required

        slotProps={{ input: { startAdornment: <LockIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}          display: {xs: 'none', md: 'flex' },

            />

        <TextField        <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: BRAND.white, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, boxShadow: '0 8px 30px rgba(0,0,0,0.35)' }}>          flexDirection: 'column',

          label="Confirm Password" type="password" fullWidth margin="normal" value={confirm}

          onChange={e => setConfirm(e.target.value)} required          <ApartmentIcon sx={{ fontSize: 52, color: BRAND.teal }} />          justifyContent: 'center',

          error={passwordMismatch}

          helperText={passwordMismatch ? 'Passwords do not match' : ''}        </Box>          alignItems: 'center',

        slotProps={{ input: { startAdornment: <LockIcon sx={{ mr: 1, color: passwordMismatch ? 'error.main' : BRAND.teal, fontSize: 20 }} /> } }}

            />          width: '45%',



        <Button        <Typography variant="h4" sx={{ color: BRAND.white, fontWeight: 800, textAlign: 'center', lineHeight: 1.2, mb: 1 }}>          background: `linear-gradient(160deg, ${UCU.maroon} 0%, ${UCU.maroonDark} 100%)`,

          type="submit" variant="contained" fullWidth disabled={loading || !!success}

          sx={{ mt: 3, py: 1.4, fontWeight: 700, fontSize: 15, bgcolor: BRAND.teal, '&:hover': { bgcolor: BRAND.tealDark }, borderRadius: 2 }}          Ostello          px: 6,

            >

          {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Create Account'}        </Typography>          py: 8,

      </Button>

    </Box>          position: 'relative',



    <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">        <Box sx={{ width: 60, height: 3, bgcolor: BRAND.orange, borderRadius: 2, my: 2 }} />          overflow: 'hidden',

      Already have an account?{' '}

      <Link component={RouterLink} to="/login" sx={{ color: BRAND.teal, fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>        }}

        Sign in here

      </Link>        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', textAlign: 'center', maxWidth: 300, lineHeight: 1.7 }}>      >

      </Typography>

  </Box>          Create your account and start discovering hostels near your campus.        {/* Decorative circles */}

</Box>

        </Typography >        <Box sx={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', border: `60px solid rgba(201,162,39,0.08)`, top: -80, left: -80 }} />

      <Toast toast={toast} onClose={hideToast} />

    </Box > <Box sx={{ position: 'absolute', width: 200, height: 200, borderRadius: '50%', border: `40px solid rgba(201,162,39,0.06)`, bottom: -50, right: -50 }} />

  );

}        <Stack direction="row" spacing={1} mt={4} alignItems="center">


  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: BRAND.orange }} />        {/* UCU Logo */}

  <Typography variant="caption" sx={{ color: BRAND.orangeLight, letterSpacing: 1.5, fontSize: 10 }}>        <Box

    {role === 'CUSTODIAN' ? 'LIST YOUR HOSTEL' : 'FIND YOUR HOSTEL'} sx={{

          </Typography>            width: 130, height: 130,

  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: BRAND.orange }} />            borderRadius: '50%',

</Stack>            bgcolor: UCU.white,

      </Box > display: 'flex', alignItems: 'center', justifyContent: 'center',

  mb: 3,

    {/* Right form panel */ }            boxShadow: '0 8px 30px rgba(0,0,0,0.35)',

      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: '#FAFAFA', px: { xs: 3, sm: 6, md: 8 }, py: 6 }}>            p: 1.5,

        <Box sx={{ width: '100%', maxWidth: 420 }}>          }}

        >

          <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 3 }}>          <Box

            <ApartmentIcon sx={{ fontSize: 48, color: BRAND.teal, mb: 0.5 }} />            component="img"

            <Typography variant="h6" fontWeight={800} color={BRAND.teal}>Ostello</Typography>            src={ucuLogo}

          </Box>            alt="UCU Logo"

            sx={{ width: '100%', height: '100%', objectFit: 'contain' }}

          <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>          />

            <Box sx={{ p: 1, bgcolor: BRAND.orangeLight, borderRadius: 2 }}>        </Box>

              <HowToRegIcon sx={{ color: BRAND.teal, fontSize: 22 }} />

            </Box>        <Typography variant="h4" sx={{ color: UCU.white, fontWeight: 800, textAlign: 'center', lineHeight: 1.2, mb: 1 }}>

            <Box>          Uganda Christian University

              <Typography variant="h5" fontWeight={800} color={BRAND.teal}>Create Account</Typography>        </Typography>

              <Typography variant="body2" color="text.secondary">Fill in your details to register</Typography>

            </Box>        <Box sx={{ width: 60, height: 3, bgcolor: UCU.gold, borderRadius: 2, my: 2 }} />

          </Stack >

  <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.75)', textAlign: 'center', maxWidth: 300, lineHeight: 1.7 }}>

    <Divider sx={{ my: 2.5 }} />          Create your account and join the UCU learning community today.

  </Typography>

{ error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert> }

{ success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert> }        <Stack direction="row" spacing={1} mt={4} alignItems="center">

          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: UCU.gold }} />

          <Box component="form" onSubmit={handleSubmit} noValidate>          <Typography variant="caption" sx={{ color: UCU.goldLight, letterSpacing: 1.5, fontSize: 10 }}>

            <TextField            STUDENT PORTAL

              label="I want to…" select fullWidth margin="normal" value={role}          </Typography>

              onChange={e => setRole(e.target.value)}          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: UCU.gold }} />

            >        </Stack>

              <MenuItem value="STUDENT">Find &amp; book a hostel (Student)</MenuItem>      </Box >

  <MenuItem value="CUSTODIAN">List my hostel (Custodian)</MenuItem>

            </TextField > {/* ── Right form panel ── */ }

  < Box

  < TextField        sx = {{

  label = "Full Name" fullWidth margin = "normal" value = { fullName }          flex: 1,

    onChange = { e => setFullName(e.target.value) } required autoFocus          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',

      slotProps = {{ input: { startAdornment: <PersonIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }
} bgcolor: '#FAFAFA',

            />          px: { xs: 3, sm: 6, md: 8 },

  < TextField          py: 6,

    label = "Email" type = "email" fullWidth margin = "normal" value = { email }        }}

onChange = { e => setEmail(e.target.value) } required >

  slotProps={ { input: { startAdornment: <EmailIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } } } <Box sx={{ width: '100%', maxWidth: 420 }}>

            />

    <TextField          {/* Mobile heading */}

      label="Phone (optional)" fullWidth margin="normal" value={phone}          <Box sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'center', mb: 3 }}>

      onChange={e => setPhone(e.target.value)}            <Box

        slotProps={{ input: { startAdornment: <PhoneIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }} component="img"

      />              src={ucuLogo}

      {role === 'STUDENT' && (alt = "UCU Logo"

        < TextField              sx={{ width: 56, height: 56, objectFit: 'contain', mb: 0.5 }}

      label="Institution (optional)" fullWidth margin="normal" value={institution}            />

      onChange={e => setInstitution(e.target.value)}            <Typography variant="h6" fontWeight={800} color={UCU.maroon}>Uganda Christian University</Typography>

      slotProps={{ input: { startAdornment: <SchoolIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}          </Box>

              />

            )}          <Stack direction="row" alignItems="center" spacing={1.5} mb={1}>

      <TextField            <Box sx={{ p: 1, bgcolor: UCU.goldLight, borderRadius: 2 }}>

        label="Password" type="password" fullWidth margin="normal" value={password}              <HowToRegIcon sx={{ color: UCU.maroon, fontSize: 22 }} />

        onChange={e => setPassword(e.target.value)} required            </Box>

      slotProps={{ input: { startAdornment: <LockIcon sx={{ mr: 1, color: BRAND.teal, fontSize: 20 }} /> } }}            <Box>

            />              <Typography variant="h5" fontWeight={800} color={UCU.maroon}>Create Account</Typography>

        <TextField              <Typography variant="body2" color="text.secondary">Fill in your details to register</Typography>

        label="Confirm Password" type="password" fullWidth margin="normal" value={confirm}            </Box>

      onChange={e => setConfirm(e.target.value)} required          </Stack>

    error={passwordMismatch}

    helperText={passwordMismatch ? 'Passwords do not match' : ''}          <Divider sx={{ my: 2.5 }} />

    slotProps={{ input: { startAdornment: <LockIcon sx={{ mr: 1, color: passwordMismatch ? 'error.main' : BRAND.teal, fontSize: 20 }} /> } }}

            />          {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}

    {success && <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>{success}</Alert>}

    <Button

      type="submit" variant="contained" fullWidth disabled={loading || !!success}          <Box component="form" onSubmit={handleSubmit} noValidate>

      sx={{ mt: 3, py: 1.4, fontWeight: 700, fontSize: 15, bgcolor: BRAND.teal, '&:hover': { bgcolor: BRAND.tealDark }, borderRadius: 2 }}            <TextField

      >              label="Username"

        {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : 'Create Account'}              fullWidth margin="normal"

      </Button>              value={username}

    </Box>              onChange={e => setUsername(e.target.value)}

    required autoFocus

    <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">              slotProps={{ input: { startAdornment: <PersonIcon sx={{ mr: 1, color: UCU.maroon, fontSize: 20 }} /> } }}

      Already have an account?{' '}            />

      <Link component={RouterLink} to="/login" sx={{ color: BRAND.teal, fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>            <TextField

        Sign in here label="Email"

            </Link>              type="email"

    </Typography>              fullWidth margin="normal"

  </Box>              value = { email }

      </Box > onChange={ e => setEmail(e.target.value) }

required

  < Toast toast = { toast } onClose = { hideToast } /> slotProps={ { input: { startAdornment: <EmailIcon sx={{ mr: 1, color: UCU.maroon, fontSize: 20 }} /> } } }

    </Box >            />

  );            <TextField

}              label="Password"

              type="password"
              fullWidth margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              slotProps={{ input: { startAdornment: <LockIcon sx={{ mr: 1, color: UCU.maroon, fontSize: 20 }} /> } }}
            />
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth margin="normal"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              error={passwordMismatch}
              helperText={passwordMismatch ? 'Passwords do not match' : ''}
              slotProps={{ input: { startAdornment: <LockIcon sx={{ mr: 1, color: passwordMismatch ? 'error.main' : UCU.maroon, fontSize: 20 }} /> } }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading || !!success}
              sx={{
                mt: 3, py: 1.4, fontWeight: 700, fontSize: 15,
                bgcolor: UCU.maroon, '&:hover': { bgcolor: UCU.maroonDark },
                borderRadius: 2,
              }}
            >
              {loading
                ? <CircularProgress size={22} sx={{ color: '#fff' }} />
                : 'Create Account'
              }
            </Button>
          </Box >

  <Typography variant="body2" textAlign="center" mt={3} color="text.secondary">
    Already have an account?{' '}
    <Link
      component={RouterLink}
      to="/login"
      sx={{ color: UCU.maroon, fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
    >
      Sign in here
    </Link>
  </Typography>
        </Box >
      </Box >

  {/* ── Toast Notifications ── */ }
  < Toast toast = { toast } onClose = { hideToast } />
    </Box >
  );
}


