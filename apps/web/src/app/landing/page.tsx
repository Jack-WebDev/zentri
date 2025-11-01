"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import CTA from "../landing/_components/cta";
import Feature from "../landing/_components/feature";
import Hero from "../landing/_components/hero";
import Pricing from "../landing/_components/pricing";

export default function LandingPage() {
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
