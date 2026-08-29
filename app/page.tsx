import Hero from '@/components/sections/hero';
import Banner from '@/components/sections/banner';
import About from '@/components/sections/about';
import Skills from '@/components/sections/skills';
import Projects from '@/components/sections/projects';
import Services from '@/components/sections/services';

export default function Home() {
  return (
    <main>
      <Hero />
      <Banner />
      <About />
      <Skills />
      <Projects />
      <Services />
    </main>
  );
}
