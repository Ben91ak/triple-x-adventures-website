export const en = {
  // Header Navigation
  nav: {
    home: "Home",
    packages: "Packages",
    about: "About Us",
    accommodations: "Accommodations",
    restaurant: "Restaurant",
    gallery: "Gallery",
    contact: "Contact",
    experiences: "Experiences",
    bookNow: "Book Now"
  },
  
  // Hero Section
  hero: {
    title: "DISCOVER THE REAL ARCTIC",
    subtitle: "Unforgettable Adventures in Swedish Lapland",
    cta: "Explore Packages",
  },
  
  // Hero Section - Adding paragraphs
  heroSection: {
    welcome: "WELCOME TO THE WORLD OF",
    adventure: "Your adventure in <strong>Arvidsjaur Swedish Lapland</strong>",
    paragraph1: "Discover unforgettable adventures near the Arctic Circle. Experience breathtaking <strong>outdoor adventures</strong> and exceptional cuisine in one of the most beautiful regions in the world.",
    paragraph2: "Look forward to a variety of <strong>action-packed and adrenaline-fueled activities</strong> that will make your heart beat faster.",
    paragraph3: "Relax after an exciting day in our spa and enjoy the tranquility of nature. Our <strong>outdoor hot tubs and saunas</strong> offer the perfect retreat. Finally, watch the beautiful <strong>Northern Lights</strong> dance in the sky."
  },
  
  // Experiences/Packages Section
  experiences: {
    title: "OUR EXPERIENCES",
    subtitle: "Authentic Arctic Adventures",
    viewAll: "View All Experiences",
    sendInquiry: "Send Inquiry",
    nextExperience: "Next",
    previousExperience: "Previous",
    closeModal: "Close",
    viewDetails: "View details",
    bookNow: "Book Now",
    
    // Experience List
    list: [
      {
        id: 1,
        title: "Snowmobile Adventure",
        description: "Ride across pristine snow in Swedish Lapland with top-of-the-line Ski-doo models. Choose from 2hr, 4hr & 6hr tours for your perfect adventure.",
        price: 299,
        duration: "2-6 Hours",
        intensityLevel: "Thrilling",
        keyHighlights: ["Backcountry Exploration", "Modern Ski-doo Fleet", "Scenic Routes"],
        image: "/images/Snowmobile/Snowmobile 1_result.webp",
        gallery: [
          "/images/Snowmobile/Snowmobile 1_result.webp",
          "/images/Snowmobile/Snowmobile 2_result.webp",
          "/images/Snowmobile/Snowmobile 3_result.webp",
          "/images/Snowmobile/Snowmobile 4_result.webp"
        ],
        detailedInfo: {
          introduction: "Feel the excitement as you ride across untouched snow and beautiful winter landscapes. Enjoy the fresh Arctic air and stunning views of Swedish Lapland. Our tours are designed to let you experience the magic of the area with friendly, local guides who love showing you special spots and helping you create great memories. We use the newest Ski-doo Backcountry Adrenalin models, making your ride safe, comfortable, and fun.",
          adventureOptionsTitle: "PICK YOUR ADVENTURE",
          tours: [
            {
              title: "2-HOUR BACKCOUNTRY TOUR",
              description: "Great if you're looking for a short, exciting trip into the wild. Includes tea and a tasty snack.",
              details: ["One-seater snowmobile", "Two-seater available on request"]
            },
            {
              title: "4-HOUR BACKCOUNTRY TOUR",
              description: "Explore deeper into nature, with extra time to relax and enjoy the views. Take a break for tea and a sweet snack in beautiful surroundings.",
              details: ["One-seater snowmobile", "Two-seater available on request"]
            },
            {
              title: "6-HOUR BACKCOUNTRY ADVENTURE",
              description: "The ultimate tour for adventure lovers! Spend the day exploring different terrains and breathtaking sights. This tour includes tea, a sweet snack, and a tasty outdoor lunch.",
              details: ["One-seater snowmobile", "Two-seater available on request"]
            }
          ],
          importantInfoTitle: "IMPORTANT INFORMATION",
          importantInfo: [
            "Children can join as passengers, making it perfect for family fun",
            "Minimum age for drivers: 18 years with valid B driver's license",
            "Two-seater snowmobiles available for families or couples"
          ],
          closingRemark: "More than just a ride—it's about unforgettable moments and exciting adventures in the beautiful Lapland wilderness!"
        },
        tag: {
          text: "Bestseller",
          type: "bestseller"
        },
        features: [
          "Guided Tour",
          "High-Performance Snowmobiles",
          "Warm Clothing & Gear Provided",
          "Fika (Coffee & Snack) Included",
          "Multiple Duration Options"
        ]
      },
      {
        id: 2,
        title: "Husky Sledding Expedition",
        description: "Lead your own team of eager huskies through silent, snow-covered forests. An authentic and unforgettable Arctic experience.",
        price: 450,
        duration: "4 Hours",
        intensityLevel: "Moderate",
        keyHighlights: ["Drive Your Own Sled", "Friendly Husky Team", "Forest Trails"],
        image: "/images/Huskys/Husky 1_result.webp",
        gallery: [
          "/images/Huskys/Husky 1_result.webp",
          "/images/Huskys/Husky 2_result.webp",
          "/images/Huskys/Husky 3_result.webp",
          "/images/Huskys/Husky 4_result.webp"
        ],
        fullDescription: "Experience the pure joy and power of husky sledding. After a brief introduction to your team and the sled, you'll embark on a journey through magical winter landscapes. The silence is broken only by the panting of the dogs and the runners gliding over the snow. This tour offers a deep connection with nature and these incredible animals. A warming break with hot drinks and snacks is included halfway."
      },
      {
        id: 3,
        title: "Snowshoe Hike and Torchwalk",
        description: "Experience the magic of the Arctic forest on snowshoes, followed by a mesmerizing evening torchlight walk under the stars.",
        price: 149,
        duration: "3 Hours",
        intensityLevel: "Moderate",
        keyHighlights: ["Guided Snowshoe Adventure", "Evening Torchlight Walk", "Warm Drinks & Snacks"],
        image: "/images/Snowshoe_Torchwalk/snowtorch1.webp",
        gallery: [
          "/images/Snowshoe_Torchwalk/snowtorch1.webp",
          "/images/Snowshoe_Torchwalk/snowtorch2.webp",
          "/images/Snowshoe_Torchwalk/snowtorch3webp.webp",
          "/images/Snowshoe_Torchwalk/snowtorch4.webp"
        ],
        fullDescription: "Discover the serene beauty of the Arctic forest on our guided snowshoe adventure. As daylight fades, we'll transition to a magical torchlight walk under the stars. Our expert guides will lead you through pristine snow-covered landscapes, sharing stories of local culture and wildlife. No prior experience needed - just a sense of adventure! Warm drinks and traditional snacks will be provided to keep your energy up throughout this unforgettable winter experience.",
        tag: {
          text: "New",
          type: "featured"
        }
      },
      {
        id: 4,
        title: "Ice Fishing Adventure",
        description: "Drill through the ice on a frozen lake and try your luck catching Arctic char or perch. A peaceful and traditional Lapland activity.",
        price: 149,
        duration: "3 Hours",
        intensityLevel: "Relaxed",
        keyHighlights: ["Traditional Arctic Activity", "Fishing Equipment Provided", "Hot Drinks Included"],
        image: "/images/Ice-Fishing.jpg",
        gallery: [
          "/images/Ice Fishing/Icefish 1_result.webp",
          "/images/Ice Fishing/Icefish 2_result.webp",
          "/images/Ice Fishing/Shoot 3_result.webp",
          "/images/Ice Fishing/Shoot 4_result.webp"
        ],
        fullDescription: "Experience the tranquility of ice fishing on a secluded frozen lake. We'll provide all the necessary equipment, including augers, rods, and bait. Your guide will teach you the techniques and share stories about life in the Arctic. Enjoy the crisp winter air and the silence of the wilderness. Warm drinks are provided to keep you comfortable."
      },
      {
        id: 5,
        title: "Visit a Reindeer",
        description: "Meet these gentle Arctic animals up close, take photos, and feed them. If you're lucky, you might even get to pet them!",
        price: 89,
        duration: "1 Hour",
        intensityLevel: "Relaxed",
        keyHighlights: ["Reindeer Feeding", "Photo Opportunities", "Hot Drinks"],
        image: "/images/Reindeers.jpg",
        gallery: [
          "/images/Reindeers/Reindeers 1_result.webp",
          "/images/Reindeers/Reindeers 2_result.webp",
          "/images/Reindeers/Reindeers 3_result.webp",
          "/images/Reindeers/Reindeers 5_result.webp"
        ],
        fullDescription: "Get up close with these beautiful Arctic animals during this short but memorable experience. You'll have the chance to feed the reindeer, take plenty of photos, and if you're very lucky, you might even get to pet them. Our guide will share interesting facts about reindeer and their importance in the Arctic region. Hot drinks are provided to keep you warm during your visit. This activity is perfect for families and animal lovers of all ages.",
        tag: {
          text: "Family Friendly",
          type: "featured"
        }
      },
      {
        id: 6,
        title: "Helicopter Sightseeing Tour",
        description: "Get a breathtaking bird's-eye view of the vast Arctic wilderness, frozen lakes, and snow-covered forests from a helicopter.",
        price: 599, // Example price, adjust as needed
        duration: "30 Minutes Flight",
        intensityLevel: "Thrilling",
        keyHighlights: ["Panoramic Arctic Views", "Unique Perspective", "Experienced Pilot"],
        image: "/images/Helikopter.jpg",
        gallery: [
          "/images/Helicopter/Helicopter 1_result.webp",
          "/images/Helicopter/Helicopter 2_result.webp",
          "/images/Helicopter/Helicopter 3_result.webp",
          "/images/Helicopter/Helicopter 4_result.webp"
        ],
        fullDescription: "Soar above the stunning landscapes of Swedish Lapland on an unforgettable helicopter tour. Witness the scale of the wilderness, spot wildlife from above, and gain a unique perspective on the frozen world below. Our experienced pilots provide commentary on the points of interest. This is a truly spectacular way to appreciate the beauty of the Arctic."
      },
      {
        id: 7,
        title: "Ice Drifting Experience",
        description: "Learn performance driving on ice with pro instructors. Master controlled drifts in specially equipped cars on our frozen lake circuit.",
        price: 349,
        duration: "Half Day",
        intensityLevel: "Extreme",
        keyHighlights: ["Performance Driving", "Pro Instructors", "Frozen Lake Track"],
        image: "/images/Drifting.jpg",
        gallery: [
          "/images/Drifting.jpg",
          "/images/Ice Drift/Cars 1_result.webp",
          "/images/Ice Drift/Cars 2_result.webp",
          "/images/Ice Drift/Cars 3_result.webp"
        ],
        fullDescription: "Feel the exhilaration of sliding sideways on ice in our Ice Drifting Experience. Under the guidance of professional driving instructors, you'll learn the techniques of controlling a vehicle in extreme winter conditions. Using specially prepared performance cars equipped with studded tires, you'll practice drifting techniques on our purpose-built ice course. Start with basic exercises and progress to more complex maneuvers as your confidence grows. This experience is perfect for driving enthusiasts looking to improve their winter driving skills in a safe and controlled environment. All drivers receive thorough instruction and have the opportunity for multiple driving sessions to perfect their technique.",
        tag: {
          text: "Featured",
          type: "featured"
        }
      },
      {
        id: 8,
        title: "Side-By-Side Buggy Adventure",
        description: "Navigate snowy trails and frozen terrain in a powerful Side-By-Side (SBS) buggy. Thrills and fun for pairs or solo drivers.",
        price: 249,
        duration: "2 Hours",
        intensityLevel: "Thrilling",
        keyHighlights: ["Off-Road Buggy Fun", "Snowy Trail Navigation", "Heated Cabin Option"],
        image: "/images/Side-By-Side-Buggy-Drifting.jpg",
        gallery: [
          "/images/Side by Side/SBS 1_result.webp",
          "/images/Side by Side/SBS 2_result.webp",
          "/images/Side by Side/SBS 3_result.webp",
          "/images/Side by Side/SBS 4_result.webp"
        ],
        fullDescription: "Embark on an exciting off-road adventure in our Side-By-Side buggies. These versatile vehicles are perfect for navigating the challenging winter terrain. Follow your guide through forests and across frozen grounds, enjoying the power and agility of the buggy. Suitable for drivers and passengers looking for an adrenaline-fueled exploration."
      }
    ]
  },
  
  // Accommodations Section
  accommodations: {
    title: "STAY WITH US",
    subtitle: "Comfort in the Wilderness",
    viewAll: "View All Accommodations",
  },
  
  // Restaurant Section
  restaurant: {
    title: "TASTE THE ARCTIC",
    subtitle: "Local Flavors & Warm Hospitality",
    description: "Experience authentic Nordic cuisine made with fresh, locally-sourced ingredients.",
    menu: "View Menu",
    book: "Book a Table",
  },
  
  // About Section
  about: {
    title: "WHY WE LIVE FOR THIS",
    subtitle: "Our story, our team, and our commitment to authentic Arctic adventures",
    storyTitle: "OUR STORY",
    story: {
      paragraph1: "Triple X Adventures was born from a simple passion: sharing the raw beauty and adventure of Swedish Lapland with those who seek authentic experiences. Founded by Janina Möller in 2017 with just a few snowmobiles and a dream to show our guests the magic of Swedish Lapland.",
      paragraph2: "Today, we've grown into a premium adventure company, but our heart remains the same. We still operate with small groups, still work with local partners, and still believe that the Arctic isn't just a destination—it's an experience that changes you.",
      paragraph3: "Unlike mass tourism operations, we've chosen to stay true to our roots: personal, exclusive, and deeply connected to the land we call home."
    },
    valuesTitle: "OUR VALUES",
    values: [
      { title: "Authenticity", description: "We showcase the real Arctic, without filters or pretense. What you experience with us is genuine Lapland.", icon: "mountain" },
      { title: "Sustainability", description: "We tread lightly on the land we love, employing sustainable practices that preserve the Arctic for future generations.", icon: "leaf" },
      { title: "Passion", description: "Our guides aren't just employees—they're enthusiasts who love sharing their knowledge and excitement for the Arctic.", icon: "heart" }
    ],
    teamTitle: "MEET OUR TEAM",
    teamImageAlt: "Team members in Arctic gear",
    teamMembers: [
      { id: 1, name: "Janina JayJay Möller", role: "Founder & CEO", bio: "Founded Triple X Adventures with a passion for authentic Arctic experiences.", image: "/images/Team/jayjay.jpg" },
      { id: 2, name: "Benni Fichtner", role: "Project Lead", bio: "Manages our projects with precision and creativity.", image: "/images/Team/Benni.jpg" },
      { id: 3, name: "Jesper Axelsson", role: "Head Guide", bio: "Expert guide with years of experience in the Arctic wilderness.", image: "/images/Team/Jeppe.jpg" },
      { id: 4, name: "Henni Bruhn", role: "Experience Coordinator", bio: "Creates unforgettable customer journeys and adventure itineraries.", image: "/images/Team/Henni.jpg" },
      { id: 5, name: "Fanny Johannson", role: "Project Manager", bio: "Ensures all our adventures run smoothly from start to finish.", image: "/images/Team/Fanny.jpg" }
    ]
  },
  
  // Contact Section
  contact: {
    title: "LET'S MAKE WINTER LEGENDARY",
    subtitle: "Ready to experience the real Arctic? Contact us to start planning your adventure",
    formTitle: "Contact Us",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    visitDate: "When are you planning to visit?",
    visitDatePlaceholder: "Select a time frame",
    visitDateOptions: {
      decJan: "December - January",
      febMar: "February - March",
      aprMay: "April - May",
      other: "Other / Not sure yet",
    },
    interests: "I'm interested in (select all that apply)",
    message: "Your Message",
    sending: "Sending...",
    send: "Send Message",
    successTitle: "Message Sent",
    successMessage: "We've received your inquiry and will get back to you shortly.",
    errorTitle: "Submission Failed",
    errorMessage: "Please try again later.",
    
    // Adding keys for the form itself
    form: {
      contactUsLabel: "Contact Us",
      desiredPackagesLabel: "Desired Packages",
      desiredActivitiesLabel: "Desired Activities",
      packages: {
        arcticWeek: "Arctic Adventure (Week)",
        arcticWeekend: "Arctic Adventure (Weekend)",
        sidewaysWeek: "Sideways Adventure (Week)",
        sidewaysWeekend: "Sideways Adventure (Weekend)",
        performanceWeek: "Performance Package (Week)",
        performanceWeekend: "Performance Package (Weekend)",
        incentive: "Incentive Events",
        custom: "Customized Events"
      },
      activities: {
        snowmobile: "Snowmobile Tour",
        reindeer: "Visit the Reindeers",
        snowshoe: "Snowshoe Hike",
        spa: "Arctic Spa",
        restaurant: "Jay Jays Restaurant",
        helicopter: "Helicopter Flights",
        aurora: "Northern Lights"
      }
    },
    
    // Contact Info Section
    info: {
      title: "Get In Touch",
      location: "Our Location",
      locationText: "Storgatan 6F, 93331 Arvidsjaur, Swedish Lapland, Sweden",
      phone: "Phone",
      phoneText1: "+49 (0) 151 2411 5455",
      phoneText2: "+46 (0) 70 357 5455",
      email: "Email",
      emailText: "info@triple-x-adventures.com",
      restaurant: "Reservations @JayJay's",
      restaurantPhone: "+46 (0) 70 387 5455",
    },
    
    // FAQ Section
    faq: {
      title: "Frequently Asked Questions",
      q1: "What's the best time to visit?",
      a1: "The prime season runs from December to April, with January to March offering the best snow conditions and northern lights visibility.",
      q2: "How do I get to Arvidsjaur?",
      a2: "Arvidsjaur has its own airport with connections to Stockholm. We offer transfers from the airport to our location.",
      q3: "Do I need special gear?",
      a3: "We provide all specialist equipment including thermal suits, boots, and helmets. Just bring warm base layers and your sense of adventure!",
      q4: "Do I need a valid driver licence?",
      a4: "To drive a snowmobile or participate in our car drift on ice program, you need to be over 18 years old with a valid driver license. Please always have your license with you, as the police may check the validity of the license.",
      q5: "Can I ride my own snowmobile?",
      a5: "Yes, our snowmobiles are all one seated. If you want to follow a tour as a passenger, please kindly inform our team.",
      q6: "What if I get cold?",
      a6: "The winter in Swedish Lapland can be around -20°C or below. Please make sure you are wearing our equipment at any time when you are outside. Different layers of clothing will keep you warm. We do not cancel our tours due to the coldness.",
      q7: "How much daylight do we have?",
      a7: "Check the different daylight hours in Arvidsjaur, Sweden: Mid-December (10:48-14:23, 3hrs 35min), Mid-January (10:47-14:55, 4hrs 8min), Mid-February (09:10-16:47, 7hrs 37min), Mid-March (07:23-18:26, 11hrs 3min), Mid-April (05:26-20:06, 14hrs 40min).",
      q8: "Can I book 'just' a snowmobile tour?",
      a8: "Yes, you can book every activity individually. TXA is specialized and focused on premium package traveling, but we are happy to check our schedules and make you an offer for single activities.",
      q9: "When is the best time to see the Aurora Borealis?",
      a9: "The mystical Northern Lights are a natural spectacle and can therefore not be guaranteed. If the conditions are good (October - March, no clouds, high KP forecast) we hope to be able to watch this phenomenon with you.",
      q10: "What is the best season to travel?",
      a10: "We have our winter season from December - April.",
      q11: "What is included in the premium packages?",
      a11: "Our premium packages include everything, from the first offer to the follow up of the events. Basically, just the alcohol on site has to be paid extra. Check out our premium packages examples!",
      q12: "What about travel information?",
      a12: "The possibilities to travel far north are very limited. Therefore please always plan enough time (at least 1h 30min before departure). Remember to bring your valid identity card or passport and your driving license. Luggage: 20kg and 1 hand luggage is included in your ticket. In Arvidsjaur at the airport you will meet our team at the Triple X counter in the arrival hall. The flights are operated by Populair and the charter companies PAS, Polar Flights and Prosky.",
      q13: "What about waivers?",
      a13: "A waiver will be issued on site. The following deductibles apply: 2,200.00 EUR snowmobile | 500,00 EUR ice-karts | 2,200.00 EUR side-by-sides | 7,500.00 EUR AUDI RS3.",
      q14: "What about insurance?",
      a14: "Travelling to a foreign country can involve different risks. No matter how careful you are. Since the launch of Triple X in 2017, we have not had any serious injuries, but we would like to point out that there are additional insurances that can be booked online. Travel cancellation insurance as well as liability insurance, which can reduce the deductible in case of an accident. www.allianz-reiseversicherung.de. The driver of our vehicles is held liable for damages caused to the vehicle. The maximum personal liability you can find in our waiver.",
    },
    
    // Social Media Section
    social: {
      title: "Connect With Us",
    },
  },
  
  // Footer
  footer: {
    copyright: "© 2025 Triple X Adventures. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsConditions: "Terms & Conditions",
    imprint: "Imprint",
  },
  
  // Language Selector
  language: {
    title: "Language",
    en: "English",
    de: "Deutsch",
    sv: "Svenska",
  },
  
  // Weather Widget removed as requested
  
  // Not Found Page
  notFound: {
    title: "404 Page Not Found",
    message: "The page you're looking for doesn't exist or has been moved.",
    returnHome: "Return to Homepage",
  },
  
  // Animations Showcase
  animationsShowcase: {
    title: "Interactive Elements",
    description: "Explore our premium micro-interactions and animations that enhance your Arctic adventure experience.",
    entranceAnimations: "Entrance Animations",
    hoverAnimations: "Hover Effects",
    continuousAnimations: "Continuous Animations",
    hoverCards: "Interactive Information",
    staggeredAnimations: "Sequenced Elements",
    specialEffects: "Special Effects",
  },
  
  // Adventure Map Page
  adventureMap: {
    pageTitle: "Adventure Map",
    pageSubtitle: "Explore the Arctic wilderness with our interactive map",
    interactive: "INTERACTIVE",
    locationCount: "Discover all",
    locationsText: "adventure locations",
    description: "Our adventure map showcases all the incredible locations in and around Arvidsjaur where we offer our premium Arctic experiences. From our main office at Storgatan 6F to Sameland restaurant and cabins at Karlavagnen 1, and our premium accommodations at Hotel Laponia - this interactive guide will help you visualize your ultimate Swedish Lapland journey.",
    legendText: "Click on any marker to learn more about the location. The color indicates the type of location: green for accommodations, blue for experiences, and purple for points of interest."
  },
  
  // CTA Section
  ctaSection: {
    title: "READY FOR A REAL ARCTIC ADVENTURE?",
    description: "Join us in Swedish Lapland for an experience that goes beyond tourism—a journey that will stay with you forever.",
    buttonText: "Let's Make Winter Legendary",
    adventureAwaits: "Your Adventure Awaits"
  },
  
  // Booking Section
  bookingSection: {
    title: "BOOK YOUR ADVENTURE",
    subtitle: "Secure your spot for an unforgettable experience",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "Your email",
    phoneLabel: "Phone",
    phonePlaceholder: "Phone number",
    dateLabel: "Date",
    datePlaceholder: "Preferred date",
    participantsLabel: "Participants",
    participantsPlaceholder: "Number of participants",
    experienceLabel: "Experience",
    experiencePlaceholder: "Select experience",
    messageLabel: "Message",
    messagePlaceholder: "Additional requests or questions",
    submitButton: "Book Now",
    successMessage: "Thank you! Your booking request has been received.",
    successConfirmation: "We'll contact you shortly to confirm your booking details.",
    experiences: {
      snowmobile: "Snowmobile Safari",
      husky: "Dog Sledding Adventure",
      aurora: "Northern Lights Tour",
      iceFishing: "Ice Fishing Experience",
      survival: "Arctic Survival Course"
    }
  },
  
  // Adventure Locations Data (Types)
  adventureLocations: {
    types: {
      accommodation: "Accommodation",
      experience: "Experience",
      landmark: "Point of Interest"
    }
  }
};