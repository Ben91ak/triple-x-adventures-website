import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-midnight text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-montserrat font-bold text-xl mb-6">Triple X Adventures</h3>
            <p className="opacity-80 mb-6">Authentic Arctic experiences in the heart of Swedish Lapland. Small groups, local expertise, and unforgettable adventures.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-fire transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-white hover:text-fire transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-white hover:text-fire transition">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-white hover:text-fire transition">
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#experiences" className="opacity-80 hover:opacity-100 hover:text-fire transition">Our Experiences</a></li>
              <li><a href="#stay" className="opacity-80 hover:opacity-100 hover:text-fire transition">Accommodations</a></li>
              <li><a href="#restaurant" className="opacity-80 hover:opacity-100 hover:text-fire transition">JayJay's Restaurant</a></li>
              <li><a href="#about" className="opacity-80 hover:opacity-100 hover:text-fire transition">About Us</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 hover:text-fire transition">Contact</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Popular Adventures</h3>
            <ul className="space-y-3">
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">Snowmobile Safari</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">Dog Sledding</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">Northern Lights Tours</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">Ice Fishing</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 hover:text-fire transition">Arctic Survival</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Contact Information</h3>
            <ul className="space-y-3 opacity-80">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-fire"></i>
                <span>Akkavare, near Arvidsjaur<br />Swedish Lapland, Sweden</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-3 text-fire"></i>
                <span>+46 123 456 789</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-3 text-fire"></i>
                <span>adventures@triplexarctic.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 mt-8 text-center text-sm opacity-70">
          <p>&copy; {new Date().getFullYear()} Triple X Adventures. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-fire transition">Privacy Policy</a>
            <a href="#" className="hover:text-fire transition">Terms of Service</a>
            <a href="#" className="hover:text-fire transition">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
