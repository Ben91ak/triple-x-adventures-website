import { TeamMember } from "@/types";

// Team member data
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Erik Lindström",
    role: "Founder & Lead Guide",
    bio: "Born and raised in Arvidsjaur, Erik has been exploring these mountains since childhood.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Anna Bergman",
    role: "Experience Director",
    bio: "With a background in hospitality, Anna ensures every aspect of your stay exceeds expectations.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Johan Nilsson",
    role: "Master Dog Sledder",
    bio: "Johan has been training huskies for over 15 years and treats each dog as family.",
    image: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Lars Johansson",
    role: "Chef at JayJay's",
    bio: "A culinary artist who specializes in traditional Arctic cuisine with a modern twist.",
    image: "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-montserrat font-bold text-3xl md:text-4xl mb-4 text-midnight">WHY WE LIVE FOR THIS</h2>
          <p className="text-lg max-w-3xl mx-auto text-slate">Our story, our team, and our commitment to authentic Arctic adventures</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="font-montserrat font-semibold text-2xl mb-4 text-midnight">OUR STORY</h3>
            <p className="mb-4 text-slate leading-relaxed">Triple X Adventures was born from a simple passion: sharing the raw beauty and adventure of Swedish Lapland with those who seek authentic experiences. Founded by local adventurers who grew up in these forests and mountains, we started with just a few snowmobiles and a deep knowledge of the land.</p>
            <p className="mb-4 text-slate leading-relaxed">Today, we've grown into a premium adventure company, but our heart remains the same. We still operate with small groups, still work with local partners, and still believe that the Arctic isn't just a destination—it's an experience that changes you.</p>
            <p className="text-slate leading-relaxed">Unlike mass tourism operations, we've chosen to stay true to our roots: personal, exclusive, and deeply connected to the land we call home.</p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Team members in Arctic gear" 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        <div className="bg-ice rounded-lg p-8 md:p-12 mb-16">
          <h3 className="font-montserrat font-semibold text-2xl mb-6 text-center text-midnight">OUR VALUES</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-forest text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-mountain text-2xl"></i>
              </div>
              <h4 className="font-montserrat font-semibold text-lg mb-2 text-midnight">Authenticity</h4>
              <p className="text-slate">We showcase the real Arctic, without filters or pretense. What you experience with us is genuine Lapland.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-fire text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-leaf text-2xl"></i>
              </div>
              <h4 className="font-montserrat font-semibold text-lg mb-2 text-midnight">Sustainability</h4>
              <p className="text-slate">We tread lightly on the land we love, employing sustainable practices that preserve the Arctic for future generations.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-midnight text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-heart text-2xl"></i>
              </div>
              <h4 className="font-montserrat font-semibold text-lg mb-2 text-midnight">Passion</h4>
              <p className="text-slate">Our guides aren't just employees—they're enthusiasts who love sharing their knowledge and excitement for the Arctic.</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-montserrat font-semibold text-2xl mb-8 text-center text-midnight">MEET OUR TEAM</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="mb-4 aspect-square overflow-hidden rounded-full mx-auto w-48">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-montserrat font-semibold text-lg mb-1 text-midnight">{member.name}</h4>
                <p className="text-fire font-semibold mb-2">{member.role}</p>
                <p className="text-slate">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
