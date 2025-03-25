export function CTASection() {
  return (
    <section className="py-16 md:py-20 bg-forest text-white relative">
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="font-montserrat font-bold text-3xl md:text-5xl mb-6">READY FOR A REAL ARCTIC ADVENTURE?</h2>
        <p className="text-lg max-w-2xl mx-auto mb-10 opacity-90">Join us in Swedish Lapland for an experience that goes beyond tourism—a journey that will stay with you forever.</p>
        <a href="#contact" className="custom-button inline-block font-montserrat text-base uppercase bg-fire px-10 py-4 rounded tracking-wide font-semibold hover:bg-opacity-90 transition">Let's Make Winter Legendary</a>
      </div>
    </section>
  );
}
