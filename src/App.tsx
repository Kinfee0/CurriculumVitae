import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BrandsSection } from './components/BrandsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] font-kanit" style={{ overflowX: 'clip' }}>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <BrandsSection />
      <BlogSection />
      <Footer />
    </div>
  );
}

export default App;
