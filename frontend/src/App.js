import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Manifesto from "@/components/Manifesto";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import LocationHours from "@/components/LocationHours";
import Footer from "@/components/Footer";
import AppointmentModal from "@/components/AppointmentModal";

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [presetService, setPresetService] = useState("");

  const openModal = (serviceId = "") => {
    setPresetService(serviceId);
    setModalOpen(true);
  };

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Navbar onBook={() => openModal()} />
      <main>
        <Hero onBook={() => openModal()} />
        <Marquee />
        <Manifesto />
        <Services onBook={openModal} />
        <Reviews />
        <LocationHours />
      </main>
      <Footer />
      <AppointmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        presetService={presetService}
      />
      <Toaster position="top-center" richColors theme="dark" />
    </div>
  );
}
