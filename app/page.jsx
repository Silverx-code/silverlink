import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';

// Drop this in as app/page.jsx. Navbar/Footer are already rendered here rather than
// in a shared layout, since ProtectedRoute-wrapped pages may want a different chrome —
// adjust if your layout.jsx already renders them globally.
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
