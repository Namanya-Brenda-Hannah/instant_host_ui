/**
 * AppRouter.jsx — Ostello Application Routing
 *
 * Decodes the JWT on the client to read { id, email, full_name, role }.
 * ProtectedRoute enforces auth; RoleRoute enforces role access.
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import ModernLayout from './layouts/ModernLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import HostelList from './pages/HostelList';
import HostelDetail from './pages/HostelDetail';
import MyBookings from './pages/MyBookings';
import ManageHostels from './pages/ManageHostels';
import BookingRequests from './pages/BookingRequests';
import Users from './pages/Users';

// ── Decode JWT payload ────────────────────────────────────────────────────────
function decodeToken(token) {
    try {
        if (!token) return null;
        const payload = token.split('.')[1];
        const json = atob(payload.replaceAll('-', '+').replaceAll('_', '/'));
        return JSON.parse(json);
    } catch {
        return null;
    }
}

// ── Guards ────────────────────────────────────────────────────────────────────
function ProtectedRoute({ token, children }) {
    return token ? children : <Navigate to="/login" replace />;
}

function RoleRoute({ user, roles, children }) {
    if (!user) return <Navigate to="/login" replace />;
    if (!roles.includes(user.role)) return <Navigate to="/dashboard" replace />;
    return children;
}

// ── Wrap a page in the layout + auth guard ────────────────────────────────────
function Page({ token, user, handleLogout, children }) {
    return (
        <ProtectedRoute token={token}>
            <ModernLayout onLogout={handleLogout} user={user}>
                {children}
            </ModernLayout>
        </ProtectedRoute>
    );
}

// ── AppRouter ──────────────────────────────────────────────────────────────────
export default function AppRouter() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const user = decodeToken(token);

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <Router>
            <Routes>
                {/* Public */}
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/register" element={<Register />} />

                {/* Root redirect */}
                <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />

                {/* Dashboard — all roles */}
                <Route path="/dashboard" element={
                    <Page token={token} user={user} handleLogout={handleLogout}>
                        <Dashboard token={token} user={user} />
                    </Page>
                } />

                {/* Browse Hostels — STUDENT + ADMIN */}
                <Route path="/hostels" element={
                    <Page token={token} user={user} handleLogout={handleLogout}>
                        <HostelList token={token} />
                    </Page>
                } />

                {/* Single Hostel — all authenticated */}
                <Route path="/hostels/:id" element={
                    <Page token={token} user={user} handleLogout={handleLogout}>
                        <HostelDetail token={token} user={user} />
                    </Page>
                } />

                {/* My Bookings — STUDENT */}
                <Route path="/my-bookings" element={
                    <Page token={token} user={user} handleLogout={handleLogout}>
                        <RoleRoute user={user} roles={['STUDENT']}>
                            <MyBookings token={token} />
                        </RoleRoute>
                    </Page>
                } />

                {/* Manage Hostels — CUSTODIAN */}
                <Route path="/manage-hostels" element={
                    <Page token={token} user={user} handleLogout={handleLogout}>
                        <RoleRoute user={user} roles={['CUSTODIAN']}>
                            <ManageHostels token={token} />
                        </RoleRoute>
                    </Page>
                } />

                {/* Booking Requests — CUSTODIAN */}
                <Route path="/booking-requests" element={
                    <Page token={token} user={user} handleLogout={handleLogout}>
                        <RoleRoute user={user} roles={['CUSTODIAN']}>
                            <BookingRequests token={token} />
                        </RoleRoute>
                    </Page>
                } />

                {/* Users — ADMIN */}
                <Route path="/users" element={
                    <Page token={token} user={user} handleLogout={handleLogout}>
                        <RoleRoute user={user} roles={['ADMIN']}>
                            <Users token={token} />
                        </RoleRoute>
                    </Page>
                } />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}
