import Navbar from "./components/common/nav/Navbar";
import Home from "./Home";
import AdsSection from "./components/landingPage/AdsSection";
import AboutUsSection from "./components/landingPage/AboutUsSection";
import OfferSection from "./components/landingPage/OfferSection";
import ContactSection from "./components/landingPage/ContactSection";
import Footer from "./components/landingPage/Footer";

function App() {
  return (
    <>
      <Navbar />
      <header id="home">
        <Home />
      </header>
      <section
        className="z-0 pt-17 mt-12 lg:mt-0 custom-offset-mobile"
        id="ads"
      >
        <AdsSection />
      </section>
      <section
        className="flex flex-wrap relative w-full px-4 lg:px-16 py-16 pt-17 pt-23"
        id="about"
      >
        <AboutUsSection />
      </section>
      <section className="mx-8 lg:mx-16 mt-20 overflow-hidden" id="offer">
        <OfferSection />
      </section>
      <section className="w-full flex pt-17 pb-16 pt-23" id="contact">
        <ContactSection />
      </section>
      <footer className="border-t-2 border-slate-900 bg-slate-800 w-full text-slate-200 px-12 pt-8 pb-4 text-sm relative z-0 font-light flex justify-between items-end">
        <Footer />
      </footer>
    </>
  );
}

export default App;
