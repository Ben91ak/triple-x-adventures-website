import { videoUrls } from '../config/videoUrls';

export const sv = {
  // Header Navigation
  nav: {
    home: "Hem",
    packages: "Paket",
    about: "Om Oss",
    accommodations: "Boende",
    contact: "Kontakt",
    experiences: "Upplevelser",
    professionalServices: "Professionella Tjänster",
    bookNow: "Boka Nu"
  },
  
  // Hero Section
  hero: {
    title: "UPPTÄCK DEN VERKLIGA ARKTIS",
    subtitle: "Oförglömliga Äventyr i Svenska Lappland",
    cta: "Utforska Paket",
  },
  
  // Hero Section - Adding paragraphs
  heroSection: {
    welcome: "VÄLKOMMEN TILL VÄRLDEN AV",
    adventure: "Ditt äventyr i <strong>Arvidsjaur Svenska Lappland</strong>",
    paragraph1: "Upplev oförglömliga <strong>utomhusäventyr</strong> och exceptionell mat nära polcirkeln i en av världens vackraste regioner.",
    paragraph2: "Se fram emot en mängd <strong>actionfyllda och adrenalinfyllda aktiviteter</strong> som får ditt hjärta att slå snabbare.",
    paragraph3: "Koppla av efter en spännande dag i vårt spa och njut av naturens lugn. Våra <strong>utomhus-bubbelpooler och bastu </strong> erbjuder den perfekta tillflyktsorten. Avsluta med att titta på de vackra <strong>norrskenen</strong> som dansar på himlen."
  },
  
  // Accommodations Section
  accommodations: {
    title: "NÄRHET TILL NATUREN",
    subtitle: "Där unik design möter komfort",
    viewAll: "Visa alla boenden",
    whereYouWillStay: "Bo Exklusivt",
    comingSoon: "Kommer snart",
    from: "Från",
    night: "natt",
    registerInterest: "Intresseanmälan",
    checkAvailability: "Kontrollera tillgänglighet",
    viewOptions: "Visa alternativ",
    // Accommodation data
    cabinHotel: {
      title: "CABIN HOTEL SAMELAND",
      description: "Upplev lyx i vårt premium Glass Cabin Hotel, med glasväggar från golv till tak som ger obrutna vyer över den arktiska vildmarken och norrskenet. En verkligt oförglömlig vistelse i naturen.",
      features: [
        { text: "För 2 gäster", iconKey: "capacity" },
        { text: "13 Cabins", iconKey: "bed" },
        { text: "AC", iconKey: "climate" },
        { text: "Kingsize-säng", iconKey: "bed" },
        { text: "Eget kök", iconKey: "kitchen" },
        { text: "Sameland, Arvidsjaur", iconKey: "location" }
      ]
    },
    txaChalet: {
      title: "TXA - CHALET",
      description: "Välkommen hem till ditt privata TXA Chalet – där exklusiv komfort möter avskildhet. Det perfekta boendet för privata grupper som vill uppleva Lappland tillsammans.",
      features: [
        { text: "Upp till 24 gäster", iconKey: "capacity" },
        { text: "12 sovrum", iconKey: "bed" },
        { text: "Privat bastu", iconKey: "hottub" },
        { text: "Privat lounge / restaurang", iconKey: "kitchen" }
      ]
    },
    hotelLaponia: {
      title: "HOTEL LAPONIA",
      description: "Hotel Laponia erbjuder en bekväm vistelse före och efter dina äventyr, med alla bekvämligheter du behöver.",
      features: [
        { text: "Centralt läge", iconKey: "location" },
        { text: "Norrländsk atmosfär", iconKey: "default" },
        { text: "Endast 10 km från flygplatsen", iconKey: "transport" },
        { text: "Fjälls Pub & Bistro", iconKey: "kitchen" }
      ]
    },
    description: "Efter en dag full av äventyr erbjuder vårt förstklassiga boende den perfekta platsen för att koppla av och återhämta sig.",
    types: {
      hotel: {
        title: "Hotel Laponia",
        description: "Vårt partnerhotell erbjuder lyxiga rum med alla bekvämligheter för en bekväm vistelse.",
        features: [
          { text: "Lyxiga Rum", iconKey: "bed" },
          { text: "Spa-område", iconKey: "hottub" },
          { text: "Restaurang", iconKey: "kitchen" },
          { text: "Centralt Läge", iconKey: "location" },
          { text: "WiFi", iconKey: "wifi" }
        ]
      },
      cabins: {
        title: "Mirror Glass Cabins",
        description: "Våra mysiga stugor erbjuder avskildhet och en autentisk vistelse i den arktiska vildmarken.",
        features: [
          { text: "Fullt Utrustat Kök", iconKey: "kitchen" },
          { text: "Privat Bubbelpool", iconKey: "hottub" },
          { text: "Öppen Spis", iconKey: "fireplace" },
          { text: "Norrskensutsikt", iconKey: "default" },
          { text: "Naturnära Läge", iconKey: "location" }
        ]
      },
      glamping: {
        title: "Arctic Glamping",
        description: "Upplev lyxcamping med alla bekvämligheter i en hisnande naturlig miljö.",
        features: [
          { text: "Uppvärmt Tält", iconKey: "climate" },
          { text: "Bekväma Sängar", iconKey: "bed" },
          { text: "Panoramafönster", iconKey: "default" },
          { text: "Norrskensutsikt", iconKey: "default" },
          { text: "Autentisk Upplevelse", iconKey: "default" }
        ]
      }
    }
  },
  
  // About Section
  about: {
    title: "OM OSS",
    subtitle: "Vårt engagemang för autentiska arktiska äventyr"
  },
  
  // About Section Features
  aboutSection: {
    features: {
      smallGroups: {
        title: "Små Grupper",
        description: "Personlig uppmärksamhet och autentiska upplevelser med begränsad gruppstorlek"
      },
      localExperts: {
        title: "Lokala Experter",
        description: "Våra guider är passionerade lokalinvånare med djup kunskap om den arktiska vildmarken"
      },
      premiumService: {
        title: "Premium Service",
        description: "Högkvalitativ utrustning, boende och matupplevelser genomgående"
      }
    }
  },
  
  // Contact Section
  contact: {
    title: "LÅT OSS GÖRA VINTERN LEGENDARISK",
    subtitle: "Redo för det norrländska äventyret? Kontakta oss!",
    formTitle: "Kontakta oss",
    firstName: "Förnamn",
    lastName: "Efternamn",
    email: "E-postadress",
    phone: "Telefonnummer",
    visitDate: "När planerar du att besöka?",
    visitDatePlaceholder: "Välj en tidsram",
    visitDateOptions: {
      decJan: "December - Januari",
      febMar: "Februari - Mars",
      aprMay: "April - Maj",
      other: "Annan / Inte säker ännu",
    },
    interests: "Jag är intresserad av (välj alla som gäller)",
    charterFlight: "Välj din avreseort",
    charterFlightPlaceholder: "Välj ett charterflygalternativ",
    message: "Ditt meddelande",
    messagePlaceholder: "Har du frågor, idéer eller är du redo att planera ditt äventyr? Skicka ett meddelande - vi återkommer snabbare än en snöskoter i nysnö!",
    sending: "Skickar...",
    send: "Skicka meddelande",
    successTitle: "Meddelande skickat",
    successMessage: "Vi har mottagit din förfrågan och återkommer inom kort.",
    errorTitle: "Inskickning misslyckades",
    errorMessage: "Försök igen senare.",
    
    // Form subsection with nested objects
    form: {
      contactUsLabel: "Kontakta oss",
      desiredPackagesLabel: "Önskade paket",
      desiredActivitiesLabel: "Önskade aktiviteter",
      packages: {
        arcticWeek: "Arctic Adventure (Week)",
        arcticWeekend: "Arctic Adventure (Weekend)",
        sidewaysWeek: "Sideways Adventure (Week)",
        sidewaysWeekend: "Sideways Adventure (Weekend)",
        performanceWeek: "Performance Package (Week)",
        performanceWeekend: "Performance Package (Weekend)",
        incentive: "Incentive Event",
        custom: "Custom Event"
      },
      activities: {
        snowmobile: "Snöskotertur",
        reindeer: "Besök renarna",
        snowshoe: "Snöskovandring",
        spa: "Arktiskt spa",
        restaurant: "Jay Jays restaurang",
        helicopter: "Helikopterflygning",
        aurora: "Norrskensjakt"
      },
      flight: {
        none: "Inget charterflyg behövs",
        privateJet: "Privatjet"
      }
    },
    
    // FAQ Section
    faq: {
      title: "Vanliga frågor",
      showMore: "Visa mer",
      showLess: "Visa mindre",
      q1: "När är bästa tiden att besöka?",
      a1: "Högsäsongen pågår från december till april, med januari till mars som erbjuder de bästa snöförhållandena och norrskenets synlighet.",
      q2: "Hur tar jag mig till Arvidsjaur?",
      a2: "Arvidsjaur har en egen flygplats med förbindelser till Stockholm. Vi erbjuder transfer från flygplatsen till vår anläggning.",
      q3: "Behöver jag speciell utrustning?",
      a3: "Vi tillhandahåller all specialutrustning inklusive termiska dräkter, kängor och hjälmar. Ta bara med varma baslager och din äventyrsanda!",
      q4: "Behöver jag ett giltigt körkort?",
      a4: "För att köra en snöskoter eller delta i vårt bildrift på isprogram måste du vara över 18 år med ett giltigt körkort. Ha alltid ditt körkort med dig, eftersom polisen kan kontrollera körkortets giltighet.",
      q5: "Kan jag köra min egen snöskoter?",
      a5: "Ja, våra snöskotrar är alla ensitsiga. Om du vill följa en tur som passagerare, vänligen informera vårt team.",
      q6: "Vad händer om jag blir kall?",
      a6: "Vintern i Svenska Lappland kan vara runt -20°C eller lägre. Se till att du bär vår utrustning hela tiden när du är utomhus. Olika lager av kläder håller dig varm. Vi ställer inte in våra turer på grund av kylan.",
      q7: "Hur mycket dagsljus har vi?",
      a7: "Kontrollera de olika dagsljustimmarna i Arvidsjaur, Sverige: Mitten av december (10:48-14:23, 3 timmar 35 minuter), mitten av januari (10:47-14:55, 4 timmar 8 minuter), mitten av februari (09:10-16:47, 7 timmar 37 minuter), mitten av mars (07:23-18:26, 11 timmar 3 minuter), mitten av april (05:26-20:06, 14 timmar 40 minuter).",
      q8: "Kan jag boka 'bara' en snöskotertur?",
      a8: "Ja, du kan boka varje aktivitet individuellt. TXA är specialiserat och fokuserat på premium paketresor, men vi är glada att kontrollera våra scheman och göra dig ett erbjudande för enskilda aktiviteter.",
      q9: "När är bästa tiden att se norrsken?",
      a9: "Det mystiska norrskenet är ett naturfenomen och kan därför inte garanteras. Om förhållandena är goda (oktober - mars, inga moln, hög KP-prognos) hoppas vi kunna titta på detta fenomen med dig.",
      q10: "Vilken är den bästa säsongen att resa?",
      a10: "Vi har vår vintersäsong från december - april.",
      q11: "Vad ingår i premiumpaketen?",
      a11: "Våra premiumpaket inkluderar allt, från det första erbjudandet till uppföljningen av evenemangen. I princip är det bara alkohol på plats som måste betalas extra. Kolla in våra exempel på premiumpaket!",
      q12: "Vad gäller för reseinformation?",
      a12: "Möjligheterna att resa långt norrut är mycket begränsade. Planera därför alltid tillräckligt med tid (minst 1 timme 30 minuter före avresa). Kom ihåg att ta med ditt giltiga ID-kort eller pass och ditt körkort. Bagage: 20 kg och 1 handbagage ingår i din biljett. I Arvidsjaur på flygplatsen kommer du att träffa vårt team vid Triple X-disken i ankomsthallen. Flygningarna drivs av Populair och charterbolagen PAS, Polar Flights och Prosky.",
      q13: "Vad gäller för ansvarsfriskrivningar?",
      a13: "En ansvarsfriskrivning kommer att utfärdas på plats. Följande självrisk gäller: 2 200,00 EUR snöskoter | 500,00 EUR iskarts | 2 200,00 EUR side-by-sides | 7 500,00 EUR AUDI RS3.",
      q14: "Vad gäller för försäkring?",
      a14: "Att resa till ett främmande land kan innebära olika risker. Oavsett hur försiktig du är. Sedan lanseringen av Triple X 2017 har vi inte haft några allvarliga skador, men vi vill påpeka att det finns ytterligare försäkringar som kan bokas online. Reseavbeställningsförsäkring samt ansvarsförsäkring, som kan minska självrisken vid en olycka. www.allianz-reiseversicherung.de. Föraren av våra fordon hålls ansvarig för skador som orsakas på fordonet. Den maximala personliga ansvarsskyldigheten hittar du i vår ansvarsfriskrivning.",
    },
    
    // Social Media Section
    social: {
      title: "Anslut med oss",
    },
    
    // Contact Info Section
    info: {
      title: "Kontakta oss",
      location: "Vår plats",
      address: "Storgatan 6F, 93331 Arvidsjaur",
      locationText: "Storgatan 6F, 93331 Arvidsjaur, Svenska Lappland, Sverige",
      phone: "Telefon",
      phoneText1: "+49 (0) 151 2411 5455",
      phoneText2: "+46 70 357 5455",
      email: "E-post",
      emailText: "info@t-x-a.com",
      restaurant: "Bokningar @JayJay's",
      restaurantPhone: "+46 (0) 70 387 5455",
    },
  },
  
  // Experiences/Packages Section
  experiences: {
    title: "VÅRA RESEPAKET",
    subtitle: "All-Inclusive Arktiska Äventyr",
    viewAll: "Visa Alla Paket",
    sendInquiry: "Skicka Förfrågan",
    nextExperience: "Nästa",
    previousExperience: "Föregående",
    closeModal: "Stäng",
    viewDetails: "Visa detaljer",
    bookNow: "Boka Nu",
    durationOptions: ["3 Nätter", "4 Nätter"],
    weekendWeekText: "Tillgänglig på vardagar och helger",
    premiumPackagesTitle: "Premiumpaket",
    premiumPackagesDescription: "Våra skräddarsydd premiumpaket kombinerar flera aktiviteter med lyxigt boende för den ultimata arktiska upplevelsen.",
    hideActivitiesButton: "Dölj Aktiviteter",
    exploreActivitiesButton: "Utforska Våra Aktiviteter",
    featuredTitle: "Utvalda Aktiviteter",
    featuredDescription: "Bläddra bland våra mest populära och rekommenderade enskilda aktiviteter",
    individualActivitiesTitle: "Individuella Aktiviteter",
    individualActivitiesDescription: "Välj från vårt urval av spännande individuella aktiviteter för att anpassa ditt arktiska äventyr",
    
    // Experience List
    list: [
      {
        id: 0,
        title: "Arctic Adventure",
        description: "Vårt signatur all-inclusive-paket med de bästa vinteraktiviteterna som Svenska Lappland har att erbjuda. Upplev snöskoter, hundspann och mer i vårt magiska paket.",
        price: 3650,
        duration: "3-4 Nätter",
        intensityLevel: "Moderate",
        keyHighlights: [
          "All-Inclusive Upplevelse", 
          "Premium Boende", 
          "Flera Aktiviteter", 
          "Professionella Guider"
        ],
        image: "/images/Packages/Adventure Package.png",
        video: "arcticAdventure",
        gallery: [
          "/images/Snowmobile/Snowmobile 2_result.webp",
          "/images/Husky/Husky 1_result.webp",
          "/images/Snowmobile/Snowmobile 3_result.webp",
          "/images/Snowmobile/Snowmobile 4_result.webp"
        ],
        detailedInfo: {
          introduction: "Arctic Adventure-paketet är vårt mest omfattande erbjudande som ger dig den kompletta norrländska upplevelsen. Detta all-inclusive-paket kombinerar de bästa aktiviteterna med förstklassigt boende och autentisk lokal mat.",
          adventureOptionsTitle: "PAKETET INKLUDERAR",
          tours: [
            {
              title: "3-NÄTTERS PAKET",
              description: "Upplev höjdpunkterna i Norrland. Perfekt för en långhelg.",
              details: [
                "2-timmars Snöskotertur", 
                "Hundspannsupplevelse", 
                "Norrskensskådning", 
                "3 Nätter Premium Boende", 
                "Alla Måltider Ingår"
              ]
            },
            {
              title: "4-NÄTTERS PAKET",
              description: "Vårt utökade paket låter dig helt fördjupa dig i den norrländska upplevelsen med ytterligare aktiviteter och avkopplingstid.",
              details: [
                "4-timmars Snöskotertur", 
                "Hundspannsupplevelse", 
                "Isfiskeäventyr", 
                "Norrskensskådning", 
                "4 Nätter Premium Boende", 
                "Alla Måltider Ingår"
              ]
            }
          ],
          importantInfoTitle: "VIKTIG INFORMATION",
          importantInfo: [
            "3-NÄTTERS PAKET tillgängligt på utvalda helger fredag - måndag",
            "4-NÄTTERS PAKET tillgängligt på utvalda veckor måndag - fredag",
            "Flygplatstransfer ingår",
            "All nödvändig utrustning och kläder tillhandahålls",
            "Lämpligt för alla erfarenhetsnivåer",
            "Paket kan anpassas helt efter dina specifika intressen och behov."
          ],
          closingRemark: "Den perfekta blandningen av spänning, komfort och autentiskt arktiskt under - sömlöst paketerat just för dig."
        },
        tag: {
          text: "Bästsäljare",
          type: "bestseller"
        },
        features: [
          "All-Inclusive",
          "Snöskoterturer",
          "Hundspann",
          "Premium Boende",
          "Gourmetmåltider",
          "Professionella Guider"
        ]
      },
      {
        id: 9,
        title: "Sideways Package",
        description: "Det ultimata vinterköräventyret för motorentusiaster och driftfantaster. Bemästra konsten att köra med precision på is under expertguidning, kombinerat med lyxiga vistelser och lokala gourmetupplevelser.",
        price: 4500,
        duration: "3-4 Nätter",
        intensityLevel: "Thrilling",
        keyHighlights: [
          "Professionell Iskörningsinstruktion",
          "Upplev Flera Fordonstyper",
          "Arktiskt Äventyr Sidoprogram",
          "All-Inclusive Gourmetmåltider"
        ],
        image: "/images/Packages/Sideways Package.png",
        video: "sidewayPackage",
        gallery: [
          "/images/Experiences/ice-driving.jpg",
          "/images/Experiences/ice-driving2.jpg",
          "/images/Accommodations/hotel-room1.jpg",
          "/images/Restaurant/restaurant-interior.jpg"
        ],
        detailedInfo: {
          introduction: "Sideways Package är designat för körningsentusiaster som vill uppleva spänningen med iskörning i Svenska Lappland. Lär dig professionella tekniker för att kontrollera fordon på is medan du njuter av förstklassigt boende och utmärkt mat. Paket kan anpassas helt efter dina specifika intressen och behov.",
          adventureOptionsTitle: "VAD SOM INGÅR",
          tours: [
            {
              title: "3-NÄTTERS SIDEWAYS PACKAGE",
              description: "En koncentrerad iskörningsupplevelse med professionell instruktion och förstklassigt boende.",
              details: [
                "Heldags Iskörningssessioner",
                "2-timmars Snöskotertur",
                "Passiv Hundspannsupplevelse",
                "Side by Side Drifting med Yamaha YXZ",
                "Bränsle & Nödvändig Utrustning Ingår",
                "3 Nätter Premium Boende",
                "All-Inclusive Gourmetmåltider",
                "Arktiskt Äventyr Sidoprogram"
              ]
            },
            {
              title: "4-NÄTTERS SIDEWAYS PACKAGE",
              description: "Vårt utökade paket ger mer bantid och ytterligare fordonsupplevelser för ett omfattande iskörningsäventyr.",
              details: [
                "Heldags Iskörningssessioner (potentiellt mer tid eller avancerad session)",
                "2-timmars Snöskotertur",
                "Passiv Hundspannsupplevelse",
                "Side by Side Drifting med Yamaha YXZ",
                "Bränsle & Nödvändig Utrustning Ingår",
                "4 Nätter Premium Boende",
                "All-Inclusive Gourmetmåltider",
                "Arktiskt Äventyr Sidoprogram"
              ]
            }
          ],
          importantInfoTitle: "VIKTIG INFORMATION",
          importantInfo: [
            "Giltigt körkort krävs",
            "Lämpligt för alla körfärdighetsnivåer",
            "All nödvändig säkerhetsutrustning tillhandahålls",
            "Flygplatstransfer ingår",
            "Försäkring ingår i paketpriset",
            "Paket kan anpassas helt efter dina specifika intressen och behov."
          ],
          closingRemark: "Inte bara körning - detta är en adrenalinfylld mästarklass i isprestanda."
        },
        tag: {
          text: "Utvald",
          type: "featured"
        },
        features: [
          "Professionell Iskörningsinstruktion",
          "Flera Fordonstyper",
          "Snöskotertur",
          "Hundspann",
          "Yamaha YXZ Drifting",
          "Premium Boende",
          "All-Inclusive Måltider"
        ]
      },
      {
        id: 10,
        title: "Ice Performance Package",
        description: "Upplev vårt elitdrivande paket, speciellt anpassat för motorsportfanatiker. Kör högprestandabilar på precisionsbyggda isbanor designade för hisnande hastighet, överlägsen kontroll och oförglömliga spänningar.",
        price: 5900,
        duration: "3-4 Nätter",
        intensityLevel: "Extreme",
        keyHighlights: [
          "Exklusiva Högprestandafordon",
          "Professionella Racinginstruktörer",
          "Specialdesignade Isbanor",
          "Premium Boende & Matupplevelser"
        ],
        image: "/images/Packages/Ice Performance Package.jpg",
        video: "icePerformance",
        gallery: [
          "/images/Experiences/ice-performance.jpg",
          "/images/Experiences/ice-performance2.jpg",
          "/images/Accommodations/luxury-suite.jpg",
          "/images/Restaurant/dining-experience.jpg"
        ],
        detailedInfo: {
          introduction: "Ice Performance Package är vår mest exklusiva körupplevelse, designad för de som vill tänja sina gränser med högprestandafordon på is. Lär dig av professionella racingförare medan du njuter av lyxboende och gourmetmat. Paket kan anpassas helt efter dina specifika intressen och behov.",
          adventureOptionsTitle: "VAD SOM INGÅR",
          tours: [
            {
              title: "3-NÄTTERS ICE PERFORMANCE PACKAGE",
              description: "En intensiv högprestandakörningsupplevelse med professionell instruktion och lyxboende.",
              details: [
                "2 Dagars Drifting på Is",
                "2h Snöskotertur",
                "Personliga Coachningsessioner",
                "Premium Boende (3 Nätter)",
                "Alla Måltider, Utrustning & Flygplatstransfer Ingår"
              ]
            },
            {
              title: "4-NÄTTERS ICE PERFORMANCE PACKAGE",
              description: "Vårt utökade paket ger mer bantid med ytterligare fordonsalternativ och avancerade tekniker för den ultimata iskörningsupplevelsen.",
              details: [
                "2 Dagars Drifting på Is (potentiellt mer tid eller avancerad session)",
                "2h Snöskotertur",
                "Personliga Coachningsessioner",
                "Premium Boende (4 Nätter)",
                "Alla Måltider, Utrustning & Flygplatstransfer Ingår",
                "Avancerade Körtekniker",
                "Exklusiv Bantid"
              ]
            }
          ],
          importantInfoTitle: "VIKTIG INFORMATION",
          importantInfo: [
            "Giltigt körkort krävs",
            "Tidigare prestandakörningserfarenhet rekommenderas",
            "All nödvändig utrustning tillhandahålls",
            "Helikoptertransfer tillgänglig på begäran",
            "Paket kan anpassas helt efter dina specifika intressen och behov."
          ],
          closingRemark: "Ta dina körkunskaper till det extrema - tänja dina gränser tillsammans med proffs på världsklass isbanor."
        },
        tag: {
          text: "Premium",
          type: "featured"
        },
        features: [
          "Högprestandafordon",
          "Professionella Racinginstruktörer",
          "Specialdesignade Isbanor",
          "Lyxboende & Matupplevelser",
          "2 Dagars Drifting på Is",
          "2h Snöskotertur",
          "Personlig Coaching"
        ]
      },
      {
        id: 1,
        title: "Snöskoter-Äventyr",
        description: "Kör över orörd snö i Svenska Lappland med toppmoderna Ski-doo modeller. Välj mellan 2-, 4- och 6-timmars turer för ditt perfekta äventyr.",
        price: 299,
        duration: "2-6 Timmar",
        intensityLevel: "Varierande",
        keyHighlights: ["Förstklassiga Snöskotrar", "Olika Turlängder", "Hisnande Landskap", "Erfarna Guider"],
        image: "/images/Snowmobile/Snowmobile 1_result.webp",
        gallery: [
          "/images/Snowmobile/Snowmobile 1_result.webp",
          "/images/Snowmobile/Snowmobile 2_result.webp",
          "/images/Snowmobile/Snowmobile 3_result.webp",
          "/images/Snowmobile/Snowmobile 4_result.webp"
        ],
        video: videoUrls.snowmobileAdventure,
        detailedInfo: {
          introduction: "Vårt Snöskoter-Äventyr erbjuder en spännande upplevelse i den snötäckta vildmarken i Svenska Lappland. Kör med förstklassiga Ski-doo modeller över frusna sjöar och genom snötäckta skogar.",
          adventureOptionsTitle: "VÄLJ DITT ÄVENTYR",
          tours: [
            {
              title: "2-TIMMARS VILDMARKSTUR",
              description: "Perfekt om du söker en kort, spännande resa ut i vildmarken. Inklusive te och en god snacks.",
              details: ["Ensitsig snöskoter", "Tvåsitsig tillgänglig på begäran"]
            },
            {
              title: "4-TIMMARS VILDMARKSTUR",
              description: "Utforska djupare in i naturen, med extra tid att koppla av och njuta av vyerna. Ta en paus för te och en söt snacks i vacker miljö.",
              details: ["Ensitsig snöskoter", "Tvåsitsig tillgänglig på begäran"]
            },
            {
              title: "6-TIMMARS VILDMARKSÄVENTYR",
              description: "Den ultimata turen för äventyrslystna! Tillbringa dagen med att utforska olika terränger och hisnande vyer. Denna tur inkluderar te, en söt snacks och en smakrik lunch utomhus.",
              details: ["Ensitsig snöskoter", "Tvåsitsig tillgänglig på begäran"]
            }
          ],
          importantInfoTitle: "VIKTIG INFORMATION",
          importantInfo: [
            "Barn kan delta som passagerare, vilket gör det perfekt för familjekul",
            "Minimiålder för förare: 18 år med giltigt B-körkort",
            "Tvåsitsiga snöskotrar tillgängliga för familjer eller par"
          ],
          closingRemark: "Mer än bara en åktur - det handlar om oförglömliga stunder och spännande äventyr i den vackra lappska vildmarken!"
        },
        tag: {
          text: "Bästsäljare",
          type: "bestseller"
        },
        features: [
          "Guidad Tur",
          "Högpresterande Snöskotrar",
          "Varma Kläder & Utrustning Tillhandahålls",
          "Fika (Kaffe & Snacks) Ingår",
          "Flera Tidslängdsalternativ"
        ]
      },
      {
        id: 2,
        title: "Hundspannsexpedition",
        description: "Led ditt eget team av ivriga huskies genom tysta, snötäckta skogar. En autentisk och oförglömlig arktisk upplevelse.",
        price: 220,
        duration: "1.5 Timmar",
        intensityLevel: "Aktiv / Avslappnad",
        keyHighlights: ["Led Ditt Eget Team", "Mysig Passagerartur", "Autentisk Arktisk Tradition"],
        image: "/images/Huskys/Husky 1_result.webp",
        gallery: [
          "/images/Huskys/Husky 1_result.webp",
          "/images/Huskys/Husky 2_result.webp",
          "/images/Huskys/Husky 3_result.webp",
          "/images/Huskys/Husky 4_result.webp"
        ],
        video: videoUrls.huskyExpedition,
        "detailedInfo": {
            "introduction": "Gör dig redo att känna kraften från slädhundar när du glider genom snöiga skogar och frusna sjöar. Oavsett om du vill leda ditt eget team eller koppla av som passagerare, erbjuder våra huskyupplevelser den perfekta balansen mellan spänning och lugn.",
            "adventureOptionsTitle": "VÄLJ DIN UPPLEVELSE",
            "tours": [
                {
                    "title": "AKTIV HUSKYTUR",
                    "description": "Kör din egen släde och led ett team av energiska huskies genom den arktiska vildmarken.",
                    "details": ["Guidad av expertmushers", "Ingen tidigare erfarenhet krävs"]
                },
                {
                    "title": "PASSIV HUSKYTUR",
                    "description": "Luta dig tillbaka och njut av turen medan våra erfarna mushers guidar dig genom hisnande landskap.",
                    "details": ["Guidad av expertmushers", "Familjevänlig"]
                }
            ],
            "importantInfoTitle": "VIKTIG INFORMATION",
            "importantInfo": [
                "Lämplig för nybörjare och erfarna gäster",
                "Barn välkomna som passagerare",
                "Varma kläder tillhandahålls vid behov",
                "Guidad av professionella mushers"
            ],
            "closingRemark": "Mer än bara en tur—det är en autentisk arktisk upplevelse du aldrig kommer att glömma!"
        },
        "tag": {
            "text": "Familjefavorit",
            "type": "family"
        },
        "features": [
            "Guidad av Mushers",
            "Kör eller Åk Alternativ",
            "Varma Kläder Tillhandahålls",
            "Liten Gruppupplevelse"
        ]
      },
      {
        id: 11,
        title: "Kvällsfackelpromenad",
        description: "Delta i en förtrollande kvällspromenad med facklor under stjärnorna, där den mörka arktiska himlen och facklors varma glöd skapar en magisk atmosfär i vinterskogen.",
        price: 40,
        duration: "1.5 Timmar",
        intensityLevel: "Lätt",
        keyHighlights: ["Kvällsfackelupplevelse", "Stjärnskådningsmöjlighet", "Varma drycker vid elden"],
        image: "/images/Snowshoe_Torchwalk/snowtorch1.webp",
        gallery: [
          "/images/Snowshoe_Torchwalk/snowtorch4.webp",
          "/images/Snowshoe_Torchwalk/snowtorch3.webp",
          "/images/Snowshoe_Torchwalk/snowtorch2.webp",
          "/images/Snowshoe_Torchwalk/snowtorch1.webp"
        ],
        video: videoUrls.torchWalkAdventure,
        detailedInfo: {
          introduction: "Vår kvällsfackelpromenad erbjuder en magisk upplevelse i den arktiska natten. Vandra genom den tysta vinterskogen, upplyst endast av facklor och stjärnorna ovanför, och känn den speciella stämningen som bara den arktiska vintern kan erbjuda.",
          adventureOptionsTitle: "UPPLEVELSEN INKLUDERAR",
          importantInfoTitle: "VIKTIG INFORMATION",
          importantInfo: [
            "Lämplig för alla åldrar och konditionsnivåer",
            "Varm kläder och skor rekommenderas",
            "Varma drycker ingår",
            "Möjlighet att se norrsken beroende på väderförhållanden"
          ],
          closingRemark: "Kvällsfackelpromenaden är en perfekt avslutning på en dag fylld med arktiska äventyr, där du kan koppla av och ta in den magiska atmosfären i den arktiska natten."
        },
        tag: {
          text: "Magisk",
          type: "featured"
        },
        features: [
          "Fackelpromenad",
          "Stjärnskådning",
          "Varma drycker",
          "Möjlig norrskensskådning",
          "Lätt aktivitet"
        ]
      },
      {
        id: 3,
        title: "Snöskovandringäventyr",
        description: "Upplev magin i den arktiska skogen på snöskor när du vandrar genom orörda snötäckta landskap och upptäcker skönheten i Lapplands vintervildmark.",
        price: 40,
        duration: "1.5 Timmar",
        intensityLevel: "Måttlig",
        keyHighlights: ["Guidad Snöskoäventyr", "Orörda Skogsstigar", "Varma Drycker & Snacks"],
        image: "/images/Snowshoe_Torchwalk/snowtorch3webp.webp",
        gallery: [
          "/images/Snowshoe_Torchwalk/snowtorch1.webp",
          "/images/Snowshoe_Torchwalk/snowtorch2.webp",
          "/images/Snowshoe_Torchwalk/snowtorch3.webp",
          "/images/Snowshoe_Torchwalk/snowtorch4.webp"
        ],
        video: videoUrls.snowshoeAdventure,
        "detailedInfo": {
          "introduction": "Upplev magin i Lapplands skogar på snöskor när du vandrar genom orörda snötäckta landskap. Detta dagäventyr är perfekt för naturentusiaster i alla åldrar som vill utforska vintervildmarken.",
          "adventureOptionsTitle": "ÄVENTYRSDETALJER",
          "tours": [
            {
              "title": "GUIDAD SNÖSKOÄVENTYR",
              "description": "Dagstur genom snöiga skogar och frusna sjöar på snöskor.",
              "details": [
                "Professionell guide med lokalkännedom",
                "Högkvalitativa snöskor tillhandahålls",
                "Varma drycker och snacks ingår",
                "Fotomöjligheter i orörd natur"
              ]
            }
          ],
          "importantInfoTitle": "VIKTIG INFORMATION",
          "importantInfo": [
            "Lämplig för alla åldrar och konditionsnivåer",
            "Ingen tidigare erfarenhet krävs",
            "All utrustning tillhandahålls",
            "Varma kläder rekommenderas",
            "Små grupper för personlig upplevelse"
          ],
          "closingRemark": "Vårt Snöskovandringäventyr erbjuder ett fridfullt sätt att utforska den arktiska vildmarken och komma i kontakt med naturen i dess renaste vinterform."
        },
        "tag": {
          "text": "Naturupplevelse",
          "type": "nature"
        },
        "features": [
          "Guidad Snöskovandring",
          "All Utrustning Ingår",
          "Varma Drycker & Snacks Ingår",
          "Familjevänlig"
        ]
      },
      {
        id: 4,
        title: "Pimpeläventyr",
        description: "Borra genom isen på en frusen sjö och pröva lyckan med att fånga röding eller abborre. En fridfull och traditionell Lapplands-aktivitet.",
        price: 149,
        duration: "3-4 Timmar",
        intensityLevel: "Avslappnad / Spännande",
        keyHighlights: ["Äkta Arktisk Livsstil", "Fiskeutrustning Ingår", "Testa Din Träffsäkerhet"],
        image: "/images/Ice-Fishing.jpg",
        gallery: [
          "/images/Ice Fishing/Icefish 1_result.webp",
          "/images/Ice Fishing/Icefish 2_result.webp",
          "/images/Ice Fishing/Shoot 3_result.webp",
          "/images/Ice Fishing/Shoot 4_result.webp"
        ],
        video: videoUrls.icefishing,
        "detailedInfo": {
      "introduction": "Börja din dag på en frusen sjö med en traditionell pimpelsession, guidad av lokalbefolkningen. Byt sedan inriktning och utmana dig själv med lerduveskytte i den snöiga vildmarken. Detta är den perfekta arktiska komboupplevelsen för alla nivåer.",
      "adventureOptionsTitle": "VÄLJ DIN UPPLEVELSE",
      "tours": [
        {
          "title": "HALV DAGS ARKTISK UTOMHUSUPPLEVELSE",
          "description": "Börja med pimpelfiske och njut sedan av en lerduveskyttesession i den arktiska vildmarken. Inkluderar guidning, utrustning och snacks.",
          "details": [
            "All utrustning ingår",
            "Varma drycker ingår"
          ]
        }
      ],
      "importantInfoTitle": "VIKTIG INFORMATION",
      "importantInfo": [
        "Lämplig för alla nivåer",
        "Guidad av erfarna lokalinvånare",
        "All utrustning ingår",
        "Varma utomhuskläder rekommenderas"
      ],
      "closingRemark": "En äkta arktisk dag—fiske, skytte och skapande av oförglömliga minnen i svenska Lappland!"
    },
    "tag": {
      "text": "Lokal Favorit",
      "type": "local"
    },
    "features": [
      "Guidad av Lokalbefolkningen",
      "Fiske & Skytte Kombo",
      "All Utrustning Ingår",
      "Varma Drycker Ingår"
    ]
      },
      {
        id: 5,
        title: "Renupplevelse",
        description: "Möt och mata Lapplands mest ikoniska djur för hand och fånga oförglömliga foton med våra vänliga renar.",
        price: 45,
        duration: "40 Minuter",
        intensityLevel: "Avslappnad",
        keyHighlights: ["Mata Renar för Hand", "Fotomöjlighet", "Familjevänlig Aktivitet"],
        image: "/images/Reindeers.jpg",
        gallery: [
          "/images/Reindeers/Reindeers 1_result.webp",
          "/images/Reindeers/Reindeers 2_result.webp",
          "/images/Reindeers/Reindeers 3_result.webp",
          "/images/Reindeers/Reindeers 5_result.webp"
        ],
        video: videoUrls.reindeerVisit,
        "detailedInfo": {
          "introduction": "Kom nära våra vänliga renar, mata dem för hand och fånga oförglömliga minnen i hjärtat av Lappland.",
          "adventureOptionsTitle": "VÄLJ DIN UPPLEVELSE",
          "tours": [
            {
              "title": "RENMATNINGSUPPLEVELSE",
              "description": "Möt, mata och fotografera renar i en mysig naturmiljö.",
              "details": [
                "Djurfoder ingår",
                "Utmärkta fotomöjligheter"
              ]
            }
          ],
          "importantInfoTitle": "VIKTIG INFORMATION",
          "importantInfo": [
            "Lämplig för alla åldrar",
            "Djurfoder ingår",
            "Perfekt för familjer och par",
            "Ingen speciell utrustning krävs"
          ],
          "closingRemark": "Kort, enkel och oförglömlig—kom och möt renarna och gör din arktiska upplevelse komplett!"
        },
        "tag": {
          "text": "Familjefavorit",
          "type": "family"
        },
        "features": [
          "Möt & Mata Renar",
          "Fotomöjlighet",
          "Familjevänlig"
        ]
      },
      {
        id: 6,
        title: "Helicopter Sightseeing Tour",
        description: "Get a breathtaking bird's-eye view of the vast Arctic wilderness, frozen lakes, and snow-covered forests from a helicopter.",
        price: 599,
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
        video: videoUrls.helicopterTour,
        "detailedInfo": {
            "introduction": "Få en hisnande fågelperspektiv över den vidsträckta arktiska vildmarken, frusna sjöar och snötäckta skogar från en helikopter. Upplev landskapet som aldrig förr när du svävar över Svenska Lappland.",
            "adventureOptionsTitle": "VÄLJ DIN UPPLEVELSE",
            "tours": [
                {
                    "title": "30-MINUTE SCENIC FLIGHT",
                    "description": "Our standard tour offering panoramic views of Arctic Lapland's winter wonderland.",
                    "details": ["Experienced pilot", "Headsets provided"]
                },
                {
                    "title": "CUSTOM FLIGHT OR PRIVATE SHUTTLE",
                    "description": "Looking for something longer or more exclusive? Contact us for tailored flight durations or private transport.",
                    "details": ["Private booking on request", "Subject to availability"]
                }
            ],
            "importantInfoTitle": "IMPORTANT INFORMATION",
            "importantInfo": [
                "Minimum 4 passengers required for standard flight",
                "Weather-dependent activity",
                "Private flights available on request"
            ],
            "closingRemark": "Soar above the Arctic and capture views that few ever get to see—an unforgettable highlight of your trip."
        },
        "tag": {
            "text": "Scenic",
            "type": "scenic"
        },
        "features": [
            "Professional Pilot",
            "Scenic Aerial Tour",
            "Winter Exclusive",
            "Custom Flights Available"
        ]
      },
      {
        id: 7,
        title: "Isdriftupplevelse",
        description: "Lär dig prestandakörning på is med professionella instruktörer. Behärska kontrollerade drifter i specialutrustade bilar på vår frusna sjöbana.",
        price: 349,
        duration: "Halv Dag",
        intensityLevel: "Extrem",
        keyHighlights: ["Prestandakörning", "Professionella Instruktörer", "Frusen Sjöbana"],
        image: "/images/Drifting.jpg",
        gallery: [
          "/images/Drifting.jpg",
          "/images/Ice Drift/Cars 1_result.webp",
          "/images/Ice Drift/Cars 2_result.webp",
          "/images/Ice Drift/Cars 3_result.webp"
        ],
        video: videoUrls.iceDriftExperience,
        "detailedInfo": {
          "introduction": "Känn spänningen av att glida sidledes på is i vår Isdriftupplevelse. Under ledning av professionella körinstruktörer lär du dig teknikerna för att kontrollera ett fordon under extrema vinterförhållanden. Med specialförberedda prestandabilar utrustade med dubbdäck övar du drifttekniker på vår specialbyggda isbana. Börja med grundläggande övningar och gå vidare till mer komplexa manövrer när ditt självförtroende växer. Denna upplevelse är perfekt för körentusiaster som vill förbättra sina vinterkörfärdigheter i en säker och kontrollerad miljö. Alla förare får grundlig instruktion och har möjlighet till flera körsessioner för att perfekta sin teknik.",
          "adventureOptionsTitle": "PICK YOUR EXPERIENCE",
          "tours": [
            {
              "title": "HALVDAGS ISDRIFTUPPLEVELSE",
              "description": "Lär dig grunderna i isdrift med professionell handledning på vår frusna sjöbana.",
              "details": [
                "Professionell instruktör inkluderad",
                "Fordon förberedda för isdrift"
              ]
            },
            {
              "title": "HELDAGS ISDRIFTUPPLEVELSE",
              "description": "Förbättra dina färdigheter med förlängd körtid och professionell coaching.",
              "details": [
                "Säkerhetsutrustning tillhandahålls",
                "Flera banlayouter tillgängliga"
              ]
            }
          ],
          "importantInfoTitle": "VIKTIG INFORMATION",
          "importantInfo": [
            "Ingen tidigare isdriftserfarenhet krävs",
            "Säkerhetsutrustning tillhandahålls",
            "Varm dryck ingår",
            "Lämplig för individer, grupper eller företagsevent"
          ],
          "closingRemark": "Boka din plats nu och upplev Arktis mest spännande motorsportäventyr!"
        },
        "tag": {
          "text": "Adrenalinkick",
          "type": "adrenaline"
        },
        "features": [
          "Professionell Instruktör",
          "Förberedd Isbana",
          "Säkerhetsutrustning Tillhandahålls"
        ]
      },
      {
        id: 8,
        title: "Buggy Driftäventyr",
        description: "Tävla och drifta buggys på snötäckta spår med omedelbar acceleration och maximal kontroll—perfekt för adrenalinsökare.",
        price: 249,
        duration: "1 Timme",
        intensityLevel: "Spännande",
        keyHighlights: ["Off-Road Buggykul", "Navigering på Snöiga Spår", "Uppvärmt Hyttalternativ"],
        image: "/images/Side-By-Side-Buggy-Drifting.jpg",
        gallery: [
          "/images/Side by Side/SBS 1_result.webp",
          "/images/Side by Side/SBS 2_result.webp",
          "/images/Side by Side/SBS 3_result.webp",
          "/images/Side by Side/SBS 4_result.webp"
        ],
        video: videoUrls.buggyDriftAdventure,
        "detailedInfo": {
          "introduction": "Upplev rusningen av buggydrifting på preparerade snöspår. Utmana dig själv eller ta med en vän som medpassagerare för extra kul.",
          "adventureOptionsTitle": "VÄLJ DIN UPPLEVELSE",
          "tours": [
            {
              "title": "1-TIMMES BUGGY DRIFT-SESSION",
              "description": "En timme av racing- och driftingaction på snöspår.",
              "details": [
                "Säkerhetsbälten och instruktioner ingår",
                "Medpassageraralternativ tillgängligt"
              ]
            }
          ],
          "importantInfoTitle": "VIKTIG INFORMATION",
          "importantInfo": [
            "En eller två personer per buggy (förare + medpassagerare)",
            "Lämplig för alla erfarenhetsnivåer",
            "Säkerhetsbälten och instruktioner tillhandahålls",
            "Varma utomhuskläder rekommenderas"
          ],
          "closingRemark": "Gör dig redo att drifta, tävla och känna den arktiska rusningen—boka ditt buggyäventyr idag!"
        },
        "tag": {
          "text": "Adrenalinkick",
          "type": "adrenaline"
        },
        "features": [
          "En eller Två Personer per Buggy",
          "Säkerhetsutrustning Ingår",
          "Preparerade Snöspår",
          "Adrenalinfylld Upplevelse"
        ]
      }
    ],
    
    // Social Media Section
    social: {
      title: "Följ Oss",
    },
  },
  
  // Terms and Conditions
  terms: {
    title: "VILLKOR",
    intro: "Följande villkor ska tillämpas på paket som erbjuds och levereras under alla säsonger av Triple X Adventures AB (nedan kallat \"TXA\") genom dess paketprogram på följande destinationer: Arvidsjaur, Svenska Lappland och alla andra områden där tjänsterna levereras.",
    commercialTerms: "KOMMERSIELLA VILLKOR",
    contactUs: "Kontakta oss",
    contactUsText: "Om du vill kontakta oss angående något ärende relaterat till detta kan du göra det via kontaktformuläret, skicka ett e-postmeddelande till info@triple-x-adventures.com eller skriva ett brev till:"
  },
  
  // Language Selector
  language: {
    title: "Språk",
    en: "English",
    de: "Deutsch",
    sv: "Svenska",
  },
  
  // Not Found Page
  notFound: {
    title: "404 Sidan Hittades Inte",
    message: "Sidan du letar efter finns inte eller har flyttats.",
    returnHome: "Återgå till Startsidan",
    buttonText: "Låt oss göra vintern legendarisk",
    adventureAwaits: "Ditt äventyr väntar"
  },
  
  // Animations Showcase
  
  
  // CTA Section
  ctaSection: {
    title: "REDO FÖR ETT RIKTIGT ARKTISKT ÄVENTYR?",
    description: "Följ med oss i Svenska Lappland för en upplevelse som går bortom turism—en resa som kommer att stanna hos dig för alltid.",
    buttonText: "Låt oss göra vintern legendarisk",
    adventureAwaits: "Ditt Äventyr Väntar"
  },
  
  // Professional Services Page
  professionalServices: {
    hero: {
      title: "Professionella Tjänster i Svenska Lappland",
      subtitle: "Skräddarsydda lösningar för företagsgrupper, filmproduktioner och exklusiva samarbeten i den arktiska vildmarken.",
      cta: {
        contact: "KONTAKTA OSS",
        explore: "UTFORSKA TJÄNSTER"
      }
    },
    services: {
      title: "VÅRA TJÄNSTER",
      subtitle: "Skräddarsydda arktiska lösningar för varumärken, produktioner & evenemang i höga norden",
      corporate: {
        title: "Företags- & Branschevenemang",
        description: "Fullservice-planering och genomförande för företag, team och bilmärken.",
        subtitle: "Från kreativa koncept till logistik på plats - vi förverkligar arktiska drömmar.",
        drivingEvents: {
          title: "Körevenemang & Biltester",
          items: [
            "Isbanor, snötäckta spår och skräddarsydda banor för vinterkörningsupplevelser",
            "Fordonstester under extrema arktiska förhållanden",
            "Stöd med tillstånd, säkerhet och lokala partnerskap"
          ]
        },
        teambuilding: {
          title: "Teambuilding-Äventyr",
          items: [
            "Snöskotersafaris, överlevnadsträning, hundspann - utformade för teambuilding och utmaning",
            "Skräddarsydda grupprogram med anpassade resplaner"
          ]
        },
        retreats: {
          title: "Vinterretreater & Ledarskapsutbildning",
          items: [
            "Mysiga vistelser i stugor, middagar vid brasan hos JayJay's och workshops i vildmarken",
            "Utformade för att bygga förtroende, motståndskraft och laganda"
          ]
        },
        productLaunches: {
          title: "Produktlanseringar & Masterclasses",
          items: [
            "Utmärkta platser, fullständig evenemangsplanering, arktisk logistik & mediastöd",
            "Skapa oförglömliga varumärkesmoment under norrskenet"
          ]
        }
      },
      production: {
        title: "Produktionsstöd",
        description: "Den perfekta arktiska bakgrunden - och allt bakom kulisserna för att få det att fungera.",
        items: [
          "Platsletning & Tillstånd (Frusna sjöar, skogar, avlägsen vildmark)",
          "Arktisk logistik: Transport, bränsle, satellitkommunikation & uppvärmda anläggningar",
          "Erfarna guider & säkerhetsexperter för avlägset filmstöd",
          "Snöskotrar och terrängfordon designade för hårda förhållanden"
        ]
      },
      vip: {
        title: "Skräddarsydda VIP-Upplevelser",
        description: "Exklusiva upplevelser för varumärkesambassadörer, högprofilerade kunder och press.",
        items: [
          "Lyxiga arktiska äventyr med privata guider & premiumdetaljer",
          "Tillgång till orörd natur & hemliga platser",
          "Varumärkessamarbeten & Eventvärdskap",
          "Ambassadörsresor, innehallsskapande och arktiskt storytelling"
        ]
      },
      consulting: {
        title: "Konsulttjänster & Planering",
        description: "Din strategiska partner för projekt i norr.",
        items: [
          "Konceptutveckling & logistik för arktiska evenemang",
          "Expertis i att hantera hårda klimat och avlägsna miljöer",
          "Lokala partnerskap med markägare och leverantörer",
          "Fullservice-koordinering från idé till genomförande"
        ]
      }
    },
    stats: {
      clients: {
        number: "500+",
        text: "Nöjda kunder och äventyrsintresserade"
      },
      services: {
        number: "25+",
        text: "Professionella tjänster och skräddarsydda upplevelser"
      },
      satisfaction: {
        number: "98.3%",
        text: "Kundnöjdhetsbetyg"
      }
    },
    drivecenter: {
      title: "Partnerskap med Drivecenter Arena",
      subtitle: "Förhöjda arktiska motorsportupplevelser",
      description: "Vi är glada att samarbeta med Drivecenter Arena, Skandinaviens längsta och mest mångsidiga racingfacilitet, belägen i Fällfors, Västerbottens län. Omvandlad från en tidigare militär flygbas, står denna 4 270 meter långa bana som Sveriges främsta motorsportdestination.",
      highlights: {
        title: "Viktiga höjdpunkter:",
        items: [
          "<strong>Skandinaviens längsta bana:</strong> En 4 270 meter lång bana designad av TTI GmbH, med 16 utmanande kurvor som testar färdigheterna hos även de mest erfarna förarna.",
          "<strong>Åretruntmotorsportcenter:</strong> Från evenemang som Midnattssolsloppet under midnattssolen till FIM Snowcross-världsmästerskapet, är Drivecenter Arena ett centrum för motorsportentusiaster året runt.",
          "<strong>Toppmoderna anläggningar:</strong> Utrustad med 24 moderna depågarage, läktare med plats för 5 000 åskådare och boende på plats, inklusive ett hotell med 76 rum, vilket säkerställer en omfattande upplevelse för både deltagare och besökare.",
          "<strong>Mångfaldiga körupplevelser:</strong> Från höghastighets-trackdays och driftutmaningar till terrängäventyr med Polaris RZRs, erbjuder arenan ett stort utbud av aktiviteter och tjänster för alla adrenalinnivåer.",
          "<strong>Omfattande träningsprogram:</strong> Tillhandahåller risk- och säkerhetsträning, förarutbildning och fordonstesttjänster, vilket gör det till ett nav för både fritids- och professionell utveckling."
        ]
      },
      experience: {
        title: "Upplev fusionen av hastighet och arktisk vildmark",
        description: "Tack vare vårt partnerskap med Drivecenter Arena kan vi erbjuda unika motorsportupplevelser i norra Sveriges fantastiska natur. Oavsett om du söker höghastighetsaktion eller fridfulla arktiska vyer, ger detta samarbete dig en perfekt blandning av båda."
      },
      cta: {
        title: "Redo att uppleva Drivecenter Arena?",
        subtitle: "Kontakta oss för att planera ditt motorsportäventyr",
        button: "KONTAKTA OSS"
      }
    },
    contact: {
      title: "Låt oss prata arktiska affärer",
      description: "Har du en idé, ett team eller ett projekt? Vi är redo att bygga det tillsammans i Arktis.",
      callUs: "Ring oss",
      form: {
        name: {
          label: "Ditt namn",
          placeholder: "Anders Andersson"
        },
        email: {
          label: "Din e-post",
          placeholder: "din@epost.com"
        },
        message: {
          label: "Ditt meddelande",
          placeholder: "Berätta om ditt projekt eller din idé..."
        },
        button: "Skicka meddelande",
        sending: "Skickar...",
        directEmail: "Eller maila oss direkt på",
        success: {
          title: "Meddelande skickat",
          message: "Tack för ditt meddelande. Vi återkommer till dig så snart som möjligt.",
          newMessage: "Skicka ett nytt meddelande"
        },
        error: {
          title: "Meddelandet kunde inte skickas",
          message: "Det uppstod ett fel när ditt meddelande skulle skickas. Vänligen försök igen eller kontakta oss direkt via e-post."
        }
      }
    },
    partners: {
      title: "Våra partners"
    }
  },
  
  // Testimonials Section
  testimonials: {
    title: "VAD ÄVENTYRARE SÄGER",
    subtitle: "Berättelser från de som har upplevt den äkta arktiska upplevelsen",
    sectionTitle: "Upplevelser",
    loadingText: "Laddar omdömen...",
    errorText: "Kunde inte ladda omdömen",
    leaveReview: "Lämna ett omdöme",
    testimonialsList: [
      {
        id: 1,
        text: "Triple X Adventures levererade en upplevelse som var helt enkelt bortom ord. Snöskoterturen genom orörda skogar kändes som att komma in i en annan värld, och vår guide Eriks kunskap tillförde så mycket djup till resan.",
        author: "Sarah J.",
        location: "London, Storbritannien",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5
      },
      {
        id: 2,
        text: "Hundspannsäventyret var otroligt! Dessa är inte turistfabriksupplevelser utan riktiga, autentiska arktiska äventyr. TXA-chaléet var också fantastiskt – att titta på norrsken från bastun var oförglömligt.",
        author: "Michael T.",
        location: "Berlin, Tyskland",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5
      },
      {
        id: 3,
        text: "Det som skiljer Triple X från mängden är den personliga touchen. Vi har gjort vinteraktiviteter på andra ställen, men här kände vi oss som gäster snarare än turister. Måltiden på JayJay's var en höjdpunkt – jag drömmer fortfarande om den rengrytan!",
        author: "Emma L.",
        location: "Sydney, Australien",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5
      }
    ]
  },
  
  // Footer
  footer: {
    copyright: " 2025 Triple X Adventures. Alla rättigheter förbehållna.",
    privacyPolicy: "Integritetspolicy",
    termsConditions: "Villkor",
    imprint: "Avtryck",
    allRightsReserved: "Alla rättigheter förbehållna.",
    openingHours: "Öppettider",
    monday: "Måndag - Fredag",
    mondayHours: "09:00 - 17:00",
    saturday: "Lördag",
    saturdayHours: "10:00 - 16:00",
    sunday: "Söndag",
    sundayHours: "Stängt",
    byAppointment: "Enligt överenskommelse",
    privacyPolicyTitle: "INTEGRITETSPOLICY",
    privacyPolicyIntro: "Denna integritetspolicy (\"Policy\") beskriver hur Triple X Adventures AB (\"Triple X Adventures AB\", \"vi\", \"oss\" eller \"vår\") samlar in, skyddar och använder personligt identifierbar information (\"Personlig information\") som du (\"Användare\", \"du\" eller \"din\") kan tillhandahålla på webbplatsen triple-x-adventures.com och någon av dess produkter eller tjänster (kollektivt, \"Webbplats\" eller \"Tjänster\"). Den beskriver också vilka val du har gällande användningen av din personliga information och hur du kan komma åt och uppdatera den informationen. Denna policy gäller inte för praxis hos företag som vi inte äger eller kontrollerar, eller för individer som vi inte anställer eller hanterar.",
    automaticCollection: "Automatisk insamling av information",
    automaticCollectionText: "Vår högsta prioritet är kunddatasäkerhet, och vi utövar en policy utan loggar. Vi kan behandla endast minimala användardata, endast så mycket som är absolut nödvändigt för att upprätthålla webbplatsen eller tjänsterna. Information som samlas in automatiskt används endast för att identifiera potentiella fall av missbruk och etablera statistisk information om webbplatsanvändning. Denna statistiska information aggregeras inte på ett sådant sätt att den skulle identifiera någon särskild användare av systemet.",
    personalInfoCollection: "Insamling av personlig information",
    personalInfoCollectionText: "Du kan besöka webbplatsen utan att berätta vem du är eller avslöja någon information genom vilken någon skulle kunna identifiera dig som en specifik, identifierbar individ. Om du dock vill använda några av webbplatsens funktioner kan du bli ombedd att tillhandahålla viss personlig information (till exempel ditt namn och e-postadress). Vi tar emot och lagrar all information som du medvetet tillhandahåller oss när du gör ett köp eller fyller i något onlineformulär på webbplatsen. Denna information kan inkludera:",
    personalInfoItems: ["Personuppgifter som namn, bosättningsland, etc.", "Kontaktinformation som e-postadress, adress, etc."],
    personalInfoChoice: "Du kan välja att inte ge oss din personliga information, men då kanske du inte kan dra nytta av vissa av webbplatsens funktioner. Användare som är osäkra på vilken information som är obligatorisk är välkomna att kontakta oss.",
    storingInfo: "Denna integritetspolicy beskriver hur Triple X Adventures AB samlar in, använder och skyddar din personliga information när du använder vår webbplats eller tjänster. Vi är engagerade i att säkerställa att din integritet skyddas i enlighet med tillämpliga dataskyddslagar.",
    storingPersonalInfo: "Lagring av personlig information",
    termsTitle: "VILLKOR",
    termsIntro: "Följande villkor ska tillämpas på paket som erbjuds och levereras under alla säsonger av Triple X Adventures AB (härefter kallat \"TXA\") genom dess paketprogram på följande destinationer: Arvidsjaur, Svenska Lappland, och alla andra områden där tjänsterna levereras.",
    commercialTerms: "KOMMERSIELLA VILLKOR",
    contactUs: "Kontakta oss",
    contactUsText: "Om du vill kontakta oss angående något ärende relaterat till detta kan du göra det via kontaktformuläret, skicka ett e-postmeddelande till info@triple-x-adventures.com, eller skriva ett brev till:"
  },
  
  partners: {
    title: "Våra betrodda partners"
  }
};