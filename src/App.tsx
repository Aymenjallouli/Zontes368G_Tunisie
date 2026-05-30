import { useState } from 'react';
import { ColorKey } from './data/colors';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Esprit from './components/Esprit';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Specs from './components/Specs';
import Equipment from './components/Equipment';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

export default function App() {
  const [activeColor, setActiveColor] = useState<ColorKey>('blanc');

  return (
    <>
      <Nav />
      <Hero activeColor={activeColor} onColorChange={setActiveColor} />
      <Esprit activeColor={activeColor} />
      <Features />
      <Gallery activeColor={activeColor} onColorChange={setActiveColor} />
      <Specs />
      <Equipment />
      <Pricing />
      <Footer />
    </>
  );
}
