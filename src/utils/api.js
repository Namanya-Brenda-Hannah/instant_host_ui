/**
 * utils/api.js – Centralised API Client (Ostello)
 */

const API_BASE = 'http://localhost:3000/api';

// ── Helpers ───────────────────────────────────────────────────────────────────

const authHeaders = (token) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
});

const request = async (url, options = {}) => {
    const res = await fetch(url, options);
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.error || `Request failed with status ${res.status}`);
    }
    return data;
};

// ── Auth ──────────────────────────────────────────────────────────────────────

export const login = ({ email, password }) =>
    request(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

export const register = (userData) =>
    request(`${API_BASE}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
    });

export const verifyEmail = (token) =>
    request(`${API_BASE}/verify-email?token=${token}`);

export const forgotPassword = (email) =>
    request(`${API_BASE}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });

export const resetPassword = (token, password) =>
    request(`${API_BASE}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
    });

// ── Users ─────────────────────────────────────────────────────────────────────

export const getProfile = (token) =>
    request(`${API_BASE}/users/me`, { headers: authHeaders(token) });

export const updateProfile = (data, token) =>
    request(`${API_BASE}/users/me`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const getUsers = (token, role = '') =>
    request(`${API_BASE}/users${role ? `?role=${role}` : ''}`, { headers: authHeaders(token) });

export const getUserById = (id, token) =>
    request(`${API_BASE}/users/${id}`, { headers: authHeaders(token) });

export const updateUser = (id, data, token) =>
    request(`${API_BASE}/users/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const deleteUser = (id, token) =>
    request(`${API_BASE}/users/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
    });

// ── Hostels ───────────────────────────────────────────────────────────────────

export const searchHostels = (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`${API_BASE}/hostels${query ? `?${query}` : ''}`);
};

export const getHostelById = (id) =>
    request(`${API_BASE}/hostels/${id}`);

export const getMyHostels = (token) =>
    request(`${API_BASE}/hostels/my`, { headers: authHeaders(token) });

export const getHostelStats = (token) =>
    request(`${API_BASE}/hostels/stats`, { headers: authHeaders(token) });

export const createHostel = (data, token) =>
    request(`${API_BASE}/hostels`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const updateHostel = (id, data, token) =>
    request(`${API_BASE}/hostels/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const deleteHostel = (id, token) =>
    request(`${API_BASE}/hostels/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
    });

// ── Rooms ─────────────────────────────────────────────────────────────────────

export const getRoomsByHostel = (hostelId) =>
    request(`${API_BASE}/hostels/${hostelId}/rooms`);

export const getRoomById = (id) =>
    request(`${API_BASE}/rooms/${id}`);

export const createRoom = (hostelId, data, token) =>
    request(`${API_BASE}/hostels/${hostelId}/rooms`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const updateRoom = (id, data, token) =>
    request(`${API_BASE}/rooms/${id}`, {
        method: 'PUT',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const deleteRoom = (id, token) =>
    request(`${API_BASE}/rooms/${id}`, {
        method: 'DELETE',
        headers: authHeaders(token),
    });

// ── Bookings ──────────────────────────────────────────────────────────────────

export const createBooking = (data, token) =>
    request(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const getMyBookings = (token) =>
    request(`${API_BASE}/bookings/my`, { headers: authHeaders(token) });

export const getCustodianBookings = (token, status = '') =>
    request(`${API_BASE}/bookings/custodian${status ? `?status=${status}` : ''}`, {
        headers: authHeaders(token),
    });

export const getBookingById = (id, token) =>
    request(`${API_BASE}/bookings/${id}`, { headers: authHeaders(token) });

export const approveBooking = (id, token) =>
    request(`${API_BASE}/bookings/${id}/approve`, {
        method: 'PUT',
        headers: authHeaders(token),
    });

export const declineBooking = (id, token) =>
    request(`${API_BASE}/bookings/${id}/decline`, {
        method: 'PUT',
        headers: authHeaders(token),
    });

export const cancelBooking = (id, token) =>
    request(`${API_BASE}/bookings/${id}/cancel`, {
        method: 'PUT',
        headers: authHeaders(token),
    });

export const getAllBookings = (token) =>
    request(`${API_BASE}/bookings`, { headers: authHeaders(token) });

// ── Payments ──────────────────────────────────────────────────────────────────

export const makePayment = (data, token) =>
    request(`${API_BASE}/payments`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const getMyPayments = (token) =>
    request(`${API_BASE}/payments/my`, { headers: authHeaders(token) });

export const getPaymentById = (id, token) =>
    request(`${API_BASE}/payments/${id}`, { headers: authHeaders(token) });

// ── Reviews ───────────────────────────────────────────────────────────────────

export const createReview = (data, token) =>
    request(`${API_BASE}/reviews`, {
        method: 'POST',
        headers: authHeaders(token),
        body: JSON.stringify(data),
    });

export const getHostelReviews = (hostelId) =>
    request(`${API_BASE}/hostels/${hostelId}/reviews`);

export const getMyReviews = (token) =>
    request(`${API_BASE}/reviews/my`, { headers: authHeaders(token) });
