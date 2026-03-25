/**
 * pages/HostelList.jsx — Browse & Search Hostels
 */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box, Typography, Grid, Card, CardContent, CardMedia, Button,
    TextField, Stack, Chip, CircularProgress, Alert, Rating,
    MenuItem, InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { searchHostels } from '../utils/api';

const BRAND = { teal: '#0E7C6B', orange: '#F2994A', orangeLight: '#FDE8D0' };

export default function HostelList() {
    const navigate = useNavigate();

    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [search, setSearch] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [roomType, setRoomType] = useState('');

    const fetchHostels = async () => {
        setLoading(true);
        setError('');
        try {
            const params = {};
            if (search.trim()) params.search = search.trim();
            if (minPrice) params.min_price = minPrice;
            if (maxPrice) params.max_price = maxPrice;
            if (roomType) params.room_type = roomType;
            setHostels(await searchHostels(params));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchHostels(); }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchHostels();
    };

    return (
        <Box>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={1.5} mb={3}>
                <Box sx={{ width: 4, height: 26, bgcolor: BRAND.orange, borderRadius: 1 }} />
                <Typography variant="h5" fontWeight={800} color={BRAND.teal}>Browse Hostels</Typography>
            </Stack>

            {/* Filters */}
            <Box component="form" onSubmit={handleSearch} sx={{ mb: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="flex-end">
                    <TextField
                        label="Search hostels…" fullWidth size="small" value={search}
                        onChange={e => setSearch(e.target.value)}
                        InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ color: BRAND.teal }} /></InputAdornment> }}
                    />
                    <TextField label="Min Price" size="small" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} sx={{ minWidth: 120 }} />
                    <TextField label="Max Price" size="small" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} sx={{ minWidth: 120 }} />
                    <TextField label="Room Type" size="small" select value={roomType} onChange={e => setRoomType(e.target.value)} sx={{ minWidth: 140 }}>
                        <MenuItem value="">All Types</MenuItem>
                        <MenuItem value="SINGLE">Single</MenuItem>
                        <MenuItem value="DOUBLE">Double</MenuItem>
                        <MenuItem value="DORMITORY">Dormitory</MenuItem>
                    </TextField>
                    <Button type="submit" variant="contained" sx={{ bgcolor: BRAND.teal, '&:hover': { bgcolor: '#065C50' }, fontWeight: 700, minWidth: 100, height: 40 }}>
                        Search
                    </Button>
                </Stack>
            </Box>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress sx={{ color: BRAND.teal }} /></Box>}

            {!loading && hostels.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 10, color: 'text.secondary' }}>
                    <ApartmentIcon sx={{ fontSize: 72, color: BRAND.orangeLight }} />
                    <Typography mt={2} fontWeight={600}>No hostels found. Try a different search.</Typography>
                </Box>
            )}

            {/* Hostel Cards */}
            {!loading && (
                <Grid container spacing={3}>
                    {hostels.map(h => (
                        <Grid item xs={12} sm={6} md={4} key={h.id}>
                            <Card
                                sx={{
                                    borderRadius: 3, overflow: 'hidden',
                                    border: '1px solid rgba(0,0,0,0.06)',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                                    transition: '0.25s', cursor: 'pointer',
                                    '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 28px rgba(14,124,107,0.18)' },
                                }}
                                onClick={() => navigate(`/hostels/${h.id}`)}
                            >
                                <CardMedia
                                    component="div"
                                    sx={{
                                        height: 160, bgcolor: '#E6F4F1',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: `linear-gradient(135deg, ${BRAND.teal}22 0%, ${BRAND.orange}22 100%)`,
                                    }}
                                >
                                    <ApartmentIcon sx={{ fontSize: 64, color: BRAND.teal, opacity: 0.5 }} />
                                </CardMedia>
                                <CardContent sx={{ pt: 2 }}>
                                    <Typography variant="h6" fontWeight={700} noWrap>{h.name}</Typography>
                                    <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                                        <LocationOnIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                                        <Typography variant="body2" color="text.secondary" noWrap>{h.address}</Typography>
                                    </Stack>
                                    <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                                        <Rating value={Number(h.avg_rating) || 0} precision={0.5} readOnly size="small" />
                                        <Typography variant="caption" color="text.disabled">({Number(h.avg_rating || 0).toFixed(1)})</Typography>
                                    </Stack>
                                    {h.amenities && (
                                        <Stack direction="row" spacing={0.5} mt={1} flexWrap="wrap" useFlexGap>
                                            {h.amenities.split(',').slice(0, 3).map(a => (
                                                <Chip key={a} label={a.trim()} size="small" sx={{ fontSize: 10, bgcolor: BRAND.orangeLight, color: BRAND.teal, fontWeight: 600 }} />
                                            ))}
                                        </Stack>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
}
