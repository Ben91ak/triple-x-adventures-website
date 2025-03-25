export function RestaurantSection() {
  return (
    <section id="restaurant" className="py-16 md:py-24 bg-forest text-white relative">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4">JAYJAY'S RESTAURANT</h2>
          <p className="text-lg opacity-90">Experience authentic Arctic cuisine in our cozy wilderness restaurant</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="aspect-w-4 aspect-h-3 mb-6">
              <img 
                src="https://images.unsplash.com/photo-1528659882437-b89a74bc157f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Rustic restaurant interior with fireplace" 
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1617196123643-bab924c7a9f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Traditional Swedish food" 
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
              <img 
                src="https://images.unsplash.com/photo-1563245440-ad2c9507d76e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Dining by firelight" 
                className="w-full h-40 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-2xl mb-6">A CULINARY JOURNEY THROUGH LAPLAND</h3>
            <p className="mb-6 leading-relaxed">At JayJay's, we celebrate the flavors of Swedish Lapland with a menu focused on local, seasonal ingredients. From freshly caught Arctic char to wild berries and game meat, our dishes tell the story of our region's rich culinary heritage.</p>
            <p className="mb-8 leading-relaxed">Dine around our crackling open fire in a timber-framed setting that blends traditional design with contemporary comfort. Every meal at JayJay's is more than just food—it's an integral part of your Arctic experience.</p>
            
            <div className="mb-8">
              <h4 className="font-montserrat font-semibold text-lg mb-3">SIGNATURE OFFERINGS:</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-utensils mt-1 mr-3 text-fire"></i>
                  <span>Traditional Sami cuisine with a modern twist</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-utensils mt-1 mr-3 text-fire"></i>
                  <span>Wilderness dinner experiences under the northern lights</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-utensils mt-1 mr-3 text-fire"></i>
                  <span>Locally brewed beers and craft cocktails featuring Arctic ingredients</span>
                </li>
              </ul>
            </div>
            
            <a href="#" className="inline-block bg-fire text-white font-montserrat font-semibold py-3 px-6 rounded hover:bg-opacity-90 transition">Reserve a Table</a>
          </div>
        </div>
      </div>
    </section>
  );
}
