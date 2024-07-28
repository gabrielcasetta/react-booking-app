import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ManageBookings from './pages/ManageBookings';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bookings/:id" element={<ManageBookings />} />
    </Routes>
  </Router>
);

export default AppRouter;
