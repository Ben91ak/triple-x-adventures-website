export function RestaurantSection() {
  return (
    <section id="restaurant" className="py-16 md:py-24 bg-midnight text-white relative">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">TRIPLE X TASTE</h2>
          <p className="text-lg opacity-90">Genießen Sie authentische arktische Küche in unserem gemütlichen Live-Cooking-Restaurant</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-w-4 aspect-h-3 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1528659882437-b89a74bc157f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Rustikales Restaurant-Interieur mit Kamin" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1617196123643-bab924c7a9f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Traditionelle schwedische Küche" 
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1563245440-ad2c9507d76e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Abendessen bei Kerzenschein" 
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-2xl mb-6">EINE KULINARISCHE REISE DURCH LAPPLAND</h3>
            <p className="mb-6 leading-relaxed">Lass den Abend in unserem eigenen Live-Cooking-Restaurant ausklingen, wo köstliche Gerichte in einer einzigartigen Atmosphäre für dich zubereitet werden.</p>
            <p className="mb-8 leading-relaxed">Wir feiern die Aromen Schwedisch-Lapplands mit einem Menü, das sich auf lokale, saisonale Zutaten konzentriert. Von frisch gefangenem arktischen Saibling bis hin zu Wildbeeren und Wildfleisch erzählen unsere Gerichte die Geschichte des reichen kulinarischen Erbes unserer Region.</p>
            
            <div className="mb-8">
              <h4 className="font-montserrat font-semibold text-lg mb-3">UNSERE SPEZIALITÄTEN:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-utensils mt-1 mr-3 text-green-400"></i>
                  <span>Traditionelle samische Küche mit modernem Twist</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-utensils mt-1 mr-3 text-green-400"></i>
                  <span>Wilderness-Dinner-Erlebnisse unter Nordlichtern</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-utensils mt-1 mr-3 text-green-400"></i>
                  <span>Lokal gebraute Biere und Craft-Cocktails mit arktischen Zutaten</span>
                </li>
              </ul>
            </div>
            
            <a href="#contact" className="inline-block bg-green-600 text-white font-montserrat font-semibold py-3 px-6 rounded hover:bg-green-700 transition">Tisch reservieren</a>
          </div>
        </div>
      </div>
    </section>
  );
}
