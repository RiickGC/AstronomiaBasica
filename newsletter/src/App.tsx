import Header from './components/Header';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import ProcessSection from './components/ProcessSection';
import CommitmentSection from './components/CommitmentSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import ShootingStars from './components/ShootingStars';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <ShootingStars />
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <ProcessSection />
        <CommitmentSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
