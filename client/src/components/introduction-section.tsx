export function IntroductionSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-6 text-midnight">Not Just Another Tour Company</h2>
          <p className="text-lg mb-10 leading-relaxed">Triple X Adventures offers authentic Arctic experiences rooted in Swedish Lapland. Based in Akkavare near Arvidsjaur, we combine thrill, comfort, and authenticity in every adventure. Whether it's carving through snow-covered forests, dining around a crackling open fire, or staying in our premium accommodations, you'll leave with stories, not just memories.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-fire text-4xl mb-4">
                <i className="fas fa-user-group"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3 text-midnight">Small Groups</h3>
              <p>Personal attention and authentic experiences with small, intimate group sizes</p>
            </div>
            <div className="p-6">
              <div className="text-fire text-4xl mb-4">
                <i className="fas fa-mountain"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3 text-midnight">Local Experts</h3>
              <p>Our guides are passionate locals with deep knowledge of the Arctic wilderness</p>
            </div>
            <div className="p-6">
              <div className="text-fire text-4xl mb-4">
                <i className="fas fa-crown"></i>
              </div>
              <h3 className="font-montserrat font-semibold text-xl mb-3 text-midnight">Premium Service</h3>
              <p>High-quality equipment, accommodation and dining experiences throughout</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
