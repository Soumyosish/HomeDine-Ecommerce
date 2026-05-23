import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import ProductGrid from "../components/home/ProductGrid";
import CategoryGrid from "../components/home/CategoryGrid";
import Testimonials from "../components/home/Testimonials";
import AccordionSection from "../components/home/AccordionSection";
import Newsletter from "../components/home/Newsletter";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      <Navbar />

      <main className="grow pt-18 animate-fade-in">
        {" "}
        {/* pt-[72px] offsets the fixed navbar */}
        <Hero />
        <Features />
        <ProductGrid />
        <CategoryGrid />
        <Testimonials />
        <AccordionSection />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
