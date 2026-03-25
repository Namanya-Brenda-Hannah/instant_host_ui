/**
 * pages/BookingRequests.jsx — Custodian: approve / decline booking requests
 */
import { useEffect, useState } from 'react';
import {
    Box, Typography, Stack, Chip, CircularProgress, Alert,
    Card, CardContent, Button, Grid,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { getCustodianBookings, approveBooking, declineBooking } from '../utils/api';
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

export default function BookingRequests({ token }) {
    const { toast, showToast, hideToast } = useToast();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchBookings = async () => {
        setLoading(true);
        setError('');
        try {
            setBookings(await getCustodianBookings(token));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBookings(); }, [token]);

    const handleApprove = async (id) => {
        try {
            await approveBooking(id, token);
            showToast('Booking approved!', 'success', 'Approved');
            fetchBookings();
        } catch (err) {
            showToast(err.message, 'error', 'Error');
        }
    };

    const handleDecline = async (id) => {
        try {
            await declineBooking(id, token);
            showToast('Booking declined.', 'warning', 'Declined');
            fetchBookings();
        } catch (err) {
            showToast(err.message, 'error', 'Error');
        }
    };

    return (
        <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
                <Box sx={{ width: 4, height: 26, bgcolor: BRAND.orange, borderRadius: 1 }} />
                <Typography variant="h5" fontWeight={800} color={BRAND.teal}>Booking Requests</Typography>
                {!loading && <Chip label={bookings.length} size="small" sx={{ bgcolor: BRAND.orangeLight, color: BRAND.teal, fontWeight: 700 }} />}
            </Stack>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress sx={{ color: BRAND.teal }} /></Box>}

            {!loading && bookings.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>
                    <InboxIcon sx={{ fontSize: 72, color: BRAND.orangeLight }} />
                    <Typography mt={2} fontWeight={600}>No booking requests at the moment.</Typography>
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
                                        <Typography variant="body2" fontWeight={600} mt={0.5}>Student: {b.student_name}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {new Date(b.check_in_date).toLocaleDateString()} → {new Date(b.check_out_date).toLocaleDateString()}
                                        </Typography>
                                        <Chip label={b.status} size="small" sx={{ mt: 1, bgcolor: sc.bg, color: sc.text, fontWeight: 700 }} />

                                        {b.status === 'PENDING' && (
                                            <Stack direction="row" spacing={1} mt={2}>
                                                <Button size="small" variant="contained" startIcon={<CheckCircleIcon />}
                                                    sx={{ bgcolor: '#2E7D32', '&:hover': { bgcolor: '#1B5E20' }, fontWeight: 700 }}
                                                    onClick={() => handleApprove(b.id)}>
                                                    Approve
                                                </Button>
                                                <Button size="small" variant="outlined" color="error" startIcon={<CancelIcon />}
                                                    onClick={() => handleDecline(b.id)} sx={{ fontWeight: 700 }}>
                                                    Decline
                                                </Button>
                                            </Stack>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}

            <Toast toast={toast} onClose={hideToast} />
        </Box>
    );
}
