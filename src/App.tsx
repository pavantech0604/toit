import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import HomePage from './pages/Home/Home';
import MenuPage from './pages/Menu/Menu';
import AdminLayout from './pages/admin/AdminLayout';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './contexts/AuthContext';
import BeerFinder from './pages/BeerFinder';
import Reservations from './pages/Reservations';

// Placeholder Pages for other routes
const EventsPage = () => <div className="pt-32 pb-20 container mx-auto px-6 text-center text-5xl font-heading">Events & Experiences Coming Soon</div>;
const AboutPage = () => <div className="pt-32 pb-20 container mx-auto px-6 text-center text-5xl font-heading">Our Heritage Industrial Story</div>;
const ContactPage = () => <div className="pt-32 pb-20 container mx-auto px-6 text-center text-5xl font-heading">Find Us in Indiranagar</div>;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="reservations" element={<Reservations />} />
            <Route path="beer-finder" element={<BeerFinder />} />
            <Route path="order" element={<div className="pt-32 pb-20 container mx-auto px-6 text-center text-5xl font-heading italic text-brand-gold">Delivery Shop Loading...</div>} />
          </Route>
          
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin/*" element={<AdminLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
