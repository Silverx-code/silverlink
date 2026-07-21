import Hero from '../src/components/Hero';
import HowItWorks from '../src/components/HowItWorks';

// Navbar/Footer are already rendered globally in app/layout.jsx, so this page
// only needs the content that goes between them.
export default function LandingPage() {
  return (
    <>
      <Hero />
      <HowItWorks />
    </>
  );
}