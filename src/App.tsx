import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { FreelanceSection } from './components/FreelanceSection';
import { BrandsSection } from './components/BrandsSection';
import { BlogSection } from './components/BlogSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0C0C0C] font-kanit" style={{ overflowX: 'clip' }}>
      {/* <main> sin estilos propios: solo da el landmark a lectores de pantalla y
          buscadores. El footer queda fuera, como corresponde. */}
      <main>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <FreelanceSection />
        <BrandsSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
