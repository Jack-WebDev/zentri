"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import CTA from "./_components/cta";
import Feature from "./_components/feature";
import Hero from "./_components/hero";
import Pricing from "./_components/pricing";

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <Feature />
      <CTA />
      <Pricing />
      <Footer />
    </>
  );
}
