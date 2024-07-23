import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateBooking from './pages/CreateBooking';
import UpdateBooking from './pages/UpdateBooking';
import ManageProperties from './pages/ManageProperties';
import ManageBookings from './pages/ManageBookings';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreateBooking />} />
      <Route path="/booking/:id" element={<UpdateBooking />} />
      <Route path="/properties" element={<ManageProperties />} />
      <Route path="/bookings/:id" element={<ManageBookings />} />
    </Routes>
  </Router>
);

export default AppRouter;
