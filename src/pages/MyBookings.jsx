/**
 * pages/MyBookings.jsx — Student: view all my bookings + pay for approved ones
 */
import { useEffect, useState } from 'react';
import {
    Box, Typography, Stack, Chip, CircularProgress, Alert,
    Card, CardContent, Button, Grid,
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem,
} from '@mui/material';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import PaymentIcon from '@mui/icons-material/Payment';
import CancelIcon from '@mui/icons-material/Cancel';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { getMyBookings, cancelBooking, makePayment } from '../utils/api';
import { useToast } from '../hooks/useToast';
import Toast from '../components/Toast';

const BRAND = { teal: '#0E7C6B', tealDark: '#065C50', orange: '#F2994A', orangeLight: '#FDE8D0' };

const STATUS_COLORS = {
    PENDING: { bg: '#FFF3E0', text: '#ED6C02' },
    APPROVED: { bg: '#E3F2FD', text: '#0288D1' },
    COMPLETED: { bg: '#E8F5E9', text: '#2E7D32' },
    DECLINED: { bg: '#FFEBEE', text: '#D32F2F' },
    CANCELLED: { bg: '#F5F5F5', text: '#9E9E9E' },
};

export default function MyBookings({ token }) {
    const { toast, showToast, hideToast } = useToast();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Pay dialog
    const [payOpen, setPayOpen] = useState(false);
    const [payTarget, setPayTarget] = useState(null);
    const [payMethod, setPayMethod] = useState('MOBILE_MONEY');
    const [payRef, setPayRef] = useState('');
    const [paying, setPaying] = useState(false);

    const fetchBookings = async () => {
        setLoading(true);
        setError('');
        try {
            setBookings(await getMyBookings(token));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBookings(); }, [token]);

    const handleCancel = async (id) => {
        try {
            await cancelBooking(id, token);
            showToast('Booking cancelled.', 'info', 'Cancelled');
            fetchBookings();
        } catch (err) {
            showToast(err.message, 'error', 'Error');
        }
    };

    const handlePay = async () => {
        setPaying(true);
        try {
            await makePayment({ booking_id: payTarget.id, amount: payTarget.price_per_semester, payment_method: payMethod, transaction_ref: payRef || undefined }, token);
            showToast('Payment successful!', 'success', 'Paid');
            setPayOpen(false);
            fetchBookings();
        } catch (err) {
            showToast(err.message, 'error', 'Payment Failed');
        } finally {
            setPaying(false);
        }
    };

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
                <Box sx={{ width: 4, height: 26, bgcolor: BRAND.orange, borderRadius: 1 }} />
                <Typography variant="h5" fontWeight={800} color={BRAND.teal}>My Bookings</Typography>
                {!loading && <Chip label={bookings.length} size="small" sx={{ bgcolor: BRAND.orangeLight, color: BRAND.teal, fontWeight: 700 }} />}
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress sx={{ color: BRAND.teal }} /></Box>}

            {!loading && bookings.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>
                    <BookOnlineIcon sx={{ fontSize: 72, color: BRAND.orangeLight }} />
                    <Typography mt={2} fontWeight={600}>No bookings yet. Browse hostels to get started!</Typography>
                </Box>
            )}

            {!loading && (
                <Grid container spacing={2}>
                    {bookings.map(b => {
                        const sc = STATUS_COLORS[b.status] ?? STATUS_COLORS.PENDING;
                        return (
                            <Grid item xs={12} sm={6} md={4} key={b.id}>
                                <Card sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                                    <Box sx={{ height: 4, bgcolor: sc.text }} />
                                    <CardContent>
                                        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                            <ApartmentIcon sx={{ color: BRAND.teal }} />
                                            <Typography variant="subtitle1" fontWeight={700} noWrap>{b.hostel_name}</Typography>
                                        </Stack>
                                        <Typography variant="body2" color="text.secondary">Room {b.room_number} · {b.room_type}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(b.check_in_date).toLocaleDateString()} → {new Date(b.check_out_date).toLocaleDateString()}
                                        </Typography>
                                        <Typography variant="h6" fontWeight={800} color={BRAND.orange} mt={1}>
                                            UGX {Number(b.price_per_semester).toLocaleString()}
                                        </Typography>
                                        <Chip label={b.status} size="small" sx={{ mt: 1, bgcolor: sc.bg, color: sc.text, fontWeight: 700 }} />

                                        <Stack direction="row" spacing={1} mt={2}>
                                            {b.status === 'APPROVED' && (
                                                <Button size="small" variant="contained" startIcon={<PaymentIcon />}
                                                    sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' }, fontWeight: 700 }}
                                                    onClick={() => { setPayTarget(b); setPayOpen(true); }}>
                                                    Pay
                                                </Button>
                                            )}
                                            {(b.status === 'PENDING' || b.status === 'APPROVED') && (
                                                <Button size="small" variant="outlined" color="error" startIcon={<CancelIcon />}
                                                    onClick={() => handleCancel(b.id)} sx={{ fontWeight: 700 }}>
                                                    Cancel
                                                </Button>
                                            )}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            {/* Payment Dialog */}
            <Dialog open={payOpen} onClose={() => setPayOpen(false)} slotProps={{ paper: { sx: { borderRadius: 3, minWidth: 380 } } }}>
                <DialogTitle sx={{ fontWeight: 800, color: BRAND.teal }}>Make Payment</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        {payTarget?.hostel_name} · Room {payTarget?.room_number} · UGX {Number(payTarget?.price_per_semester ?? 0).toLocaleString()}
                    </Typography>
                    <TextField label="Payment Method" select fullWidth margin="normal" value={payMethod} onChange={e => setPayMethod(e.target.value)}>
                        <MenuItem value="MOBILE_MONEY">Mobile Money</MenuItem>
                        <MenuItem value="BANK_TRANSFER">Bank Transfer</MenuItem>
                        <MenuItem value="CASH">Cash</MenuItem>
                    </TextField>
                    <TextField label="Transaction Reference (optional)" fullWidth margin="normal" value={payRef} onChange={e => setPayRef(e.target.value)} />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setPayOpen(false)} sx={{ color: 'text.secondary' }}>Cancel</Button>
                    <Button variant="contained" onClick={handlePay} disabled={paying}
                        sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' }, fontWeight: 700 }}>
                        {paying ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Confirm Payment'}
                    </Button>
                </DialogActions>
            </Dialog>

            <Toast toast={toast} onClose={hideToast} />
        </Box>
    );
}
