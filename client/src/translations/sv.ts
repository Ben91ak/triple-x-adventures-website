export const sv = {
  // Header Navigation
  nav: {
    home: "Hem",
    packages: "Paket",
    about: "Om oss",
    accommodations: "Boende",
    restaurant: "Restaurang",
    gallery: "Galleri",
    contact: "Kontakt",
    experiences: "Upplevelser",
    bookNow: "Boka nu"
  },
  
  // Hero Section
  hero: {
    title: "DISCOVER THE REAL ARCTIC",
    subtitle: "Unforgettable Adventures in Swedish Lapland",
    cta: "Utforska Paket",
  },
  
  // Hero Section - Adding paragraphs
  heroSection: {
    welcome: "VÄLKOMMEN TILL VÄRLDEN AV",
    adventure: "Ditt äventyr i <strong>Arvidsjaur Svenska Lappland</strong>",
    paragraph1: "Upptäck oförglömliga äventyr nära polcirkeln. Upplev hisnande <strong>utomhusäventyr</strong> och exceptionell mat i en av världens vackraste regioner.",
    paragraph2: "Se fram emot en mängd <strong>actionfyllda och adrenalinstinna aktiviteter</strong> som får ditt hjärta att slå snabbare.",
    paragraph3: "Koppla av efter en spännande dag i vårt spa och njut av naturens lugn. Våra <strong>utomhus-bubbelpooler och bastur</strong> erbjuder den perfekta reträtten. Till sist, se de vackra <strong>norrskenen</strong> dansa på himlen."
  },
  
  // Experiences/Packages Section
  experiences: {
    title: "OUR EXPERIENCES",
    subtitle: "Authentic Arctic Adventures",
    viewAll: "Visa Alla Paket",
    sendInquiry: "Skicka Förfrågan",
    nextExperience: "Nästa",
    previousExperience: "Föregående",
    closeModal: "Stäng",
    viewDetails: "Visa detaljer",
    bookNow: "Boka nu",
    
    // Experience List
    list: [
      {
        id: 1,
        title: "Snöskoter Äventyr",
        description: "Kör genom orörd snö i Svenska Lappland med toppmoderna Ski-doo skotrar. Välj mellan 2-, 4- eller 6-timmars turer för ditt perfekta äventyr.",
        price: 299,
        duration: "2-6 Timmar",
        intensityLevel: "Spännande",
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
          adventureOptionsTitle: "VÄLJ DITT ÄVENTYR",
          tours: [
            {
              title: "2-TIMMARS BACKCOUNTRY TUR",
              description: "Great if you're looking for a short, exciting trip into the wild. Includes tea and a tasty snack.",
              details: ["En-sits snöskoter", "Två-sits finns på begäran"]
            },
            {
              title: "4-TIMMARS BACKCOUNTRY TUR",
              description: "Explore deeper into nature, with extra time to relax and enjoy the views. Take a break for tea and a sweet snack in beautiful surroundings.",
              details: ["En-sits snöskoter", "Två-sits finns på begäran"]
            },
            {
              title: "6-TIMMARS BACKCOUNTRY ÄVENTYR",
              description: "The ultimate tour for adventure lovers! Spend the day exploring different terrains and breathtaking sights. This tour includes tea, a sweet snack, and a tasty outdoor lunch.",
              details: ["En-sits snöskoter", "Två-sits finns på begäran"]
            }
          ],
          importantInfoTitle: "VIKTIG INFORMATION",
          importantInfo: [
            "Children can join as passengers, making it perfect for family fun",
            "Minimum age for drivers: 18 years with valid B driver's license",
            "Two-seater snowmobiles available for families or couples"
          ],
          closingRemark: "More than just a ride—it's about unforgettable moments and exciting adventures in the beautiful Lapland wilderness!"
        },
        tag: {
          text: "Bästsäljare",
          type: "bestseller"
        },
        features: [
          "Guided Tour",
          "High-Performance Snowmobiles",
          "Warm Clothing & Gear Provided",
          "Fika (Kaffe & Snack) Inkluderat",
          "Multiple Duration Options"
        ]
      },

      {
        id: 3,
        title: "JayJay's Restaurant",
        description: "Njut av äkta lappländsk mat i en mysig atmosfär med utsikt över norrskenet. Vår restaurang erbjuder en unik matupplevelse med lokala råvaror.",
        image: "/images/JayJays-Restaurant.jpg",
        gallery: [
          "/images/JayJays-Restaurant.jpg"
        ],
        fullDescription: "JayJay's Restaurant erbjuder en oförglömlig kulinarisk upplevelse i hjärtat av Svenska Lappland. Beläget i Sameland, hemmabasen för Triple X Adventures, kan du njuta av gourmetmåltider tillagade över öppen eld. Våra talangfulla kockar skapar utsökta rätter med färska, lokalt anskaffade ingredienser inklusive röding, ren, vilda bär och skogsvampar. Den intima atmosfären kombinerar rustik charm med elegant matlagning, vilket gör den perfekt för både vardagliga måltider och speciella tillfällen. Vår meny ändras med säsongerna för att framhäva de bästa smakerna från Lappland, och varje rätt berättar en historia om regionens rika kulinariska arv. Avsluta din matupplevelse med vårt urval av fina viner och hantverksmässiga cocktails med lokala sprit."
      },
      {
        id: 4,
        title: "Iskart Upplevelse",
        description: "Kör specialdesignade karts på en frusen sjöbana med expertvägledning. En adrenalinfylld vinterupplevelse.",
        image: "/images/Ice Kart.jpg",
        gallery: [
          "/images/Ice Kart.jpg"
        ],
        fullDescription: "Upplev den unika spänningen av att köra på is med vårt specialiserade Iskart-äventyr. Känn spänningen när du glider runt hörn och bemästrar konsten att kontrollera ett fordon under utmanande vinterförhållanden. Denna upplevelse passar alla färdighetsnivåer, från nybörjare till erfarna förare som vill testa sina färdigheter. All nödvändig utrustning tillhandahålls, inklusive hjälmar, FXR-overaller och handskar. Tävla mot vänner och familj om den snabbaste varvtiden i denna oförglömliga arktiska motorsportupplevelse."
      },
      {
        id: 5,
        title: "Renbesök",
        description: "Träffa Lapplands ikoniska renar, lär dig om samisk kultur och njut av en traditionell måltid i en autentisk miljö.",
        image: "/images/Reindeers.jpg",
        gallery: [
          "/images/Reindeers.jpg"
        ],
        fullDescription: "Kliv in i samernas värld och deras mest värdefulla djur - renen. Besök våra renar och få chansen att fånga ett äkta minne med dessa magnifika varelser. Kom nära renarna, mata dem och lär dig om deras säsongsmässiga migration och anpassning till det stränga arktiska klimatet."
      },
      {
        id: 6,
        title: "Helikopter Sightseeingtur",
        description: "Sväva över det arktiska landskapet för ett hisnande flygperspektiv över berg, skogar och frusna sjöar.",
        image: "/images/Helikopter.jpg",
        gallery: [
          "/images/Helikopter.jpg"
        ],
        fullDescription: "Ta till skyarna för ett oförglömligt perspektiv av Svenska Lapplands andlösa landskap på vår sceniska helikoptertur. Från din privilegierade utsiktsplats kommer du att bevittna den arktiska vildmarkens vidd som sträcker sig till horisonten - snötäckta skogar, frusna sjöar, bergskedjor och kanske även vilda djur. Din pilot kommer att ge informativa kommentarer genom ditt headset, peka ut anmärkningsvärda landmärken och dela intressanta fakta om regionen. Denna exklusiva upplevelse erbjuder oöverträffade fotomöjligheter och en känsla av Lapplands verkliga omfattning och skönhet som inte kan uppskattas från marken. Varje flygväg är noggrant planerad för att visa upp den mest spektakulära naturen samtidigt som miljöpåverkan minimeras.",
        tag: {
          text: "Ny",
          type: "new"
        }
      },
      {
        id: 7,
        title: "Isdrift Upplevelse",
        description: "Bemästra konsten att kontrollera driften på en frusen sjö i en prestandabil med professionella instruktörer.",
        image: "/images/Drifting.jpg",
        gallery: [
          "/images/Drifting.jpg"
        ],
        fullDescription: "Känn spänningen av att glida i sidled på is i vår Isdrift-upplevelse. Under ledning av professionella körinstruktörer kommer du att lära dig teknikerna för att kontrollera ett fordon under extrema vinterförhållanden. Med specialpreparerade prestandabilar utrustade med dubbdäck kommer du att öva driftteknik på vår särskilt byggda isbana. Börja med grundläggande övningar och gå vidare till mer komplexa manövrer när ditt självförtroende växer. Denna upplevelse är perfekt för körningsintresserade som vill förbättra sina vinterkörningsfärdigheter i en säker och kontrollerad miljö. Alla förare får grundlig instruktion och har möjlighet till flera körsessioner för att perfekta sin teknik."
      },
      {
        id: 8,
        title: "Pimpelfiske Äventyr",
        description: "Prova på traditionellt pimpelfiske på en frusen sjö. Lär dig tekniker från expertguider och njut av din nyfångade fisk tillagad över öppen eld.",
        image: "/images/Ice-Fishing.jpg",
        gallery: [
          "/images/Ice-Fishing.jpg"
        ],
        fullDescription: "Upplev den fridfulla traditionen av pimpelfiske i hjärtat av Lapplands vinterlandskap. Ditt äventyr börjar med en snöskotertur till en avskild frusen sjö omgiven av orörd skogsmiljö. Våra erfarna guider kommer att lära dig traditionella pimpelfisketekniker och hjälpa dig att borra hål i den tjocka isen. Medan du väntar på att arktiska fiskarter som abborre och röding ska nappa, värmer du dig vid en sprakande eld och lyssnar på berättelser om lokala fisketraditioner. Denna mindfulness-upplevelse kopplar dig till naturen medan du njuter av den rofyllda skönheten i den arktiska vildmarken. Höjdpunkten på turen är att njuta av din nyfångade fisk, beredd och tillagad av din guide över öppen eld - den ultimata vildmarksmatupplevelsen."
      },
      {
        id: 9,
        title: "Side-by-Side Buggy Äventyr",
        description: "Navigera i snötäckt terräng i en kraftfull terrängbuggy. Upplev spänningen med att drifta och utforska orörda vinterlandskap.",
        image: "/images/Side-By-Side-Buggy-Drifting.jpg",
        gallery: [
          "/images/Side-By-Side-Buggy-Drifting.jpg"
        ],
        fullDescription: "Upplev det ultimata arktiska terrängäventyret i våra kraftfulla side-by-side-buggies. Dessa specialiserade terrängfordon är utformade för att erövra det utmanande vinterlandskapet med lätthet, så att du kan nå avlägsna områden och njuta av den orörda vildmarken. Efter en omfattande säkerhetsgenomgång tar du ratten på din egen buggy och följer våra expertguider längs särskilt utformade spår genom skogar, över frusna sjöar och snötäckta kullar. Känn rysningen när du glider runt hörn och kör genom snödrivor i dessa smidiga, responsiva fordon. Turen inkluderar stopp vid natursköna utsiktsplatser och en lunchpaus i vildmarken. Detta äventyr erbjuder en perfekt blandning av spänning och naturskönhet, lämpligt för förare på alla färdighetsnivåer.",
        tag: {
          text: "Ny",
          type: "new"
        }
      },
      {
        id: 10,
        title: "Huskyturer Äventyr",
        description: "Upplev spänningen med hundspann genom orörda arktiska landskap med våra vänliga huskyteam. Känn kopplingen till traditionell nordlig transport.",
        image: "/images/Huskys/Husky 1_result.webp",
        gallery: [
          "/images/Huskys/Husky 1_result.webp",
          "/images/Huskys/Husky 2_result.webp",
          "/images/Huskys/Husky 3_result.webp",
          "/images/Huskys/Husky 4_result.webp"
        ],
        fullDescription: "Ge dig ut på en oförglömlig resa genom de snötäckta landskapen i svenska Lappland med våra fantastiska huskyteam. Denna traditionella arktiska upplevelse kombinerar äventyr med det unika bandet mellan människor och hundar som har varit viktigt för nordlig transport i århundraden.\n\nUnder ledning av erfarna mushers kommer du att lära dig hur du hanterar ditt eget team av energiska sibiriska och alaskan huskies. Känn spänningen när hundarna ivrigt väntar på turen, och upplev sedan den fridfulla glidan över orörda snöleder, med endast ljudet av tassar och medar som bryter den arktiska tystnaden.\n\nVåra huskyturer erbjuder olika alternativ från korta 1-timmars upplevelser som är perfekta för nybörjare till halvdagsäventyr som låter dig ta dig längre in i vildmarken. Alla turer inkluderar instruktion, lämplig vinterklädutrustning och gott om tid att interagera med och fotografera dessa otroliga arbetshundar.\n\nTuren avslutas med varma drycker och traditionell svensk fika vid en öppen eld, där din guide delar berättelser om livet med dessa anmärkningsvärda djur och hundspanningens roll i nordisk kultur.",
        tag: {
          text: "Ny",
          type: "new"
        }
      }
    ]
  },
  
  // Accommodations Section
  accommodations: {
    title: "STAY WITH US",
    subtitle: "Comfort in the Wilderness",
    viewAll: "Visa Alla Boenden",
  },
  
  // Restaurant Section
  restaurant: {
    title: "TASTE THE ARCTIC",
    subtitle: "Local Flavors & Warm Hospitality",
    description: "Upplev autentisk nordisk mat tillagad med färska, lokala råvaror.",
    menu: "Visa Meny",
    book: "Boka Bord",
  },
  
  // About Section
  about: {
    title: "VARFÖR VI LEVER FÖR DETTA",
    subtitle: "Vår historia, vårt team och vårt engagemang för autentiska arktiska äventyr",
    storyTitle: "VÅR HISTORIA",
    story: {
      paragraph1: "Triple X Adventures föddes ur en enkel passion: att dela den råa skönheten och äventyret i Svenska Lappland med dem som söker autentiska upplevelser. Grundad av Janina Möller år 2017 med bara några snöskotrar och en dröm att visa våra gäster magin i Svenska Lappland.",
      paragraph2: "Idag har vi växt till ett premiumäventyrsföretag, men vårt hjärta förblir detsamma. Vi arbetar fortfarande med små grupper, arbetar fortfarande med lokala partners och tror fortfarande att Arktis inte bara är en destination – det är en upplevelse som förändrar dig.",
      paragraph3: "Till skillnad från massturismsverksamheter har vi valt att förbli trogna våra rötter: personliga, exklusiva och djupt anslutna till landet vi kallar hem."
    },
    valuesTitle: "VÅRA VÄRDERINGAR",
    values: [
      { title: "Autenticitet", description: "Vi visar upp den verkliga Arktis, utan filter eller låtsas. Vad du upplever med oss är genuina Lappland.", icon: "mountain" },
      { title: "Hållbarhet", description: "Vi går lätt på landet vi älskar och använder hållbara metoder som bevarar Arktis för framtida generationer.", icon: "leaf" },
      { title: "Passion", description: "Våra guider är inte bara anställda – de är entusiaster som älskar att dela sin kunskap och spänning för Arktis.", icon: "heart" }
    ],
    teamTitle: "TRÄFFA VÅRT TEAM",
    teamImageAlt: "Teammedlemmar i arktisk utrustning",
    teamMembers: [
      { id: 1, name: "Janina JayJay Möller", role: "Grundare & VD", bio: "Grundade Triple X Adventures med en passion för autentiska arktiska upplevelser.", image: "/images/Team/jayjay.jpg" },
      { id: 2, name: "Benni Fichtner", role: "Projektledare", bio: "Leder våra projekt med precision och kreativitet.", image: "/images/Team/Benni.jpg" },
      { id: 3, name: "Jesper Axelsson", role: "Tourguide", bio: "Erfaren guide med många års erfarenhet i den arktiska vildmarken.", image: "/images/Team/Jeppe.jpg" },
      { id: 4, name: "Henni Eriksson", role: "Upplevelsekoordinator", bio: "Skapar oförglömliga kundresor och äventyrsplaner.", image: "/images/Team/Henni.jpg" },
      { id: 5, name: "Fanny Johannson", role: "Projektledare", bio: "Ser till att alla våra äventyr löper smidigt från början till slut.", image: "/images/Team/Fanny.jpg" }
    ]
  },
  
  // Contact Section
  contact: {
    title: "LET'S MAKE WINTER LEGENDARY",
    subtitle: "Ready to experience the real Arctic? Contact us to start planning your adventure",
    formTitle: "Kontakta Oss",
    firstName: "Förnamn",
    lastName: "Efternamn",
    email: "E-postadress",
    phone: "Telefonnummer",
    visitDate: "När planerar du att besöka oss?",
    visitDatePlaceholder: "Välj en tidsperiod",
    visitDateOptions: {
      decJan: "December - Januari",
      febMar: "Februari - Mars",
      aprMay: "April - Maj",
      other: "Annat / Vet inte än",
    },
    interests: "Jag är intresserad av (välj alla som gäller)",
    message: "Ditt Meddelande",
    sending: "Skickar...",
    send: "Skicka Meddelande",
    successTitle: "Meddelandet har skickats",
    successMessage: "Vi har mottaget din förfrågan och återkommer till dig inom kort.",
    errorTitle: "Skickandet misslyckades",
    errorMessage: "Vänligen försök igen senare.",
    
    // Adding keys for the form itself
    form: {
      contactUsLabel: "Kontakt",
      desiredPackagesLabel: "Önskade paket",
      desiredActivitiesLabel: "Önskade aktiviteter",
      packages: {
        arcticWeek: "Arctic Adventure (Vecka)",
        arcticWeekend: "Arctic Adventure (Helg)",
        sidewaysWeek: "Sideways Adventure (Vecka)",
        sidewaysWeekend: "Sideways Adventure (Helg)",
        performanceWeek: "Performance Paket (Vecka)",
        performanceWeekend: "Performance Paket (Helg)",
        incentive: "Incentive Events",
        custom: "Skräddarsydda Event"
      },
      activities: {
        snowmobile: "Snöskoter Tur",
        reindeer: "Besök Renarna",
        snowshoe: "Snösko Vandring",
        spa: "Arctic Spa",
        restaurant: "Jay Jays Restaurang",
        helicopter: "Helikopter Flygningar",
        aurora: "Norrskensjakt"
      }
    },
    
    // Contact Info Section
    info: {
      title: "Kontakta Oss",
      location: "Vår Plats",
      locationText: "Storgatan 6F, 93331 Arvidsjaur, Svenska Lappland, Sverige",
      phone: "Telefon",
      phoneText1: "+49 (0) 151 2411 5455",
      phoneText2: "+46 (0) 70 357 5455",
      email: "E-post",
      emailText: "info@triple-x-adventures.com",
      restaurant: "Reservationer @JayJay's",
      restaurantPhone: "+46 (0) 70 387 5455",
    },
    
    // FAQ Section
    faq: {
      title: "Vanliga Frågor",
      q1: "Vilken är den bästa tiden att besöka?",
      a1: "Högsäsongen löper från december till april, där januari till mars erbjuder de bästa snöförhållandena och synligheten för norrsken.",
      q2: "Hur tar jag mig till Arvidsjaur?",
      a2: "Arvidsjaur har sin egen flygplats med förbindelser till Stockholm. Vi erbjuder transfer från flygplatsen till vår plats.",
      q3: "Behöver jag speciell utrustning?",
      a3: "Vi tillhandahåller all specialutrustning inklusive termiska dräkter, stövlar och hjälmar. Ta bara med dig varma basplagg och ditt äventyrsinne!",
      q4: "Behöver jag ett giltigt körkort?",
      a4: "För att köra en snöskoter eller delta i vårt bilglidningsprogram på is behöver du vara över 18 år med ett giltigt körkort. Vänligen ha alltid ditt körkort med dig, eftersom polisen kan kontrollera körkortets giltighet.",
      q5: "Kan jag köra min egen snöskoter?",
      a5: "Ja, våra snöskotrar är alla ensitsiga. Om du vill följa med på en tur som passagerare, vänligen informera vårt team.",
      q6: "Vad händer om jag blir kall?",
      a6: "Vintern i Svenska Lappland kan vara omkring -20°C eller kallare. Vänligen se till att du bär vår utrustning när du är utomhus. Olika lager av kläder kommer att hålla dig varm. Vi ställer inte in våra turer på grund av kylan.",
      q7: "Hur mycket dagsljus har vi?",
      a7: "Kontrollera de olika dagsljustimmarna i Arvidsjaur, Sverige: Mitten av december (10:48-14:23, 3tim 35min), Mitten av januari (10:47-14:55, 4tim 8min), Mitten av februari (09:10-16:47, 7tim 37min), Mitten av mars (07:23-18:26, 11tim 3min), Mitten av april (05:26-20:06, 14tim 40min).",
      q8: "Kan jag boka 'bara' en skotertur?",
      a8: "Ja, du kan boka varje aktivitet individuellt. TXA är specialiserade och fokuserade på premiumpaketresor, men vi är glada att kolla våra scheman och ge dig ett erbjudande för enstaka aktiviteter.",
      q9: "När är den bästa tiden att se norrsken?",
      a9: "Det mystiska norrskenet är ett naturligt fenomen och kan därför inte garanteras. Om förhållandena är goda (oktober - mars, inga moln, hög KP-prognos) hoppas vi kunna titta på detta fenomen tillsammans med dig.",
      q10: "Vilken är den bästa säsongen att resa?",
      a10: "Vi har vår vintersäsong från december till april.",
      q11: "Vad ingår i premiumpaketen?",
      a11: "Våra premiumpaket inkluderar allt, från det första erbjudandet till uppföljningen av evenemangen. I princip måste bara alkoholen på plats betalas extra. Kolla in våra premiumpaketexempel!",
      q12: "Vad gäller reseinformation?",
      a12: "Möjligheterna att resa till långt norr är mycket begränsade. Planera därför alltid tillräckligt med tid (minst 1 timme 30 minuter före avgång). Kom ihåg att ta med ditt giltiga ID-kort eller pass och ditt körkort. Bagage: 20 kg och 1 handbagage ingår i din biljett. I Arvidsjaur på flygplatsen möter du vårt team vid Triple X-disken i ankomsthallen. Flygningarna drivs av Populair och charterföretagen PAS, Polar Flights och Prosky.",
      q13: "Hur är det med ansvarsfriskrivning?",
      a13: "En ansvarsfriskrivning kommer att utfärdas på plats. Följande självrisker gäller: 2 200,00 EUR snöskoter | 500,00 EUR is-karts | 2 200,00 EUR side-by-sides | 7 500,00 EUR AUDI RS3.",
      q14: "Vad gäller för försäkringar?",
      a14: "Att resa till ett främmande land kan innebära olika risker. Oavsett hur försiktig du är. Sedan starten av Triple X 2017 har vi inte haft några allvarliga skador, men vi vill påpeka att det finns ytterligare försäkringar som kan bokas online. Reseförsäkring samt ansvarsförsäkring, som kan minska självrisken vid en olycka. www.allianz-reiseversicherung.de. Föraren av våra fordon hålls ansvarig för skador på fordonet. Det maximala personliga ansvaret hittar du i vår ansvarsfriskrivning.",
    },
    
    // Social Media Section
    social: {
      title: "Följ Oss",
    },
  },
  
  // Footer
  footer: {
    copyright: "© 2025 Triple X Adventures. Alla rättigheter förbehållna.",
    privacyPolicy: "Integritetspolicy",
    termsConditions: "Villkor",
    imprint: "Avtryck",
  },
  
  // Language Selector
  language: {
    title: "Språk",
    en: "English",
    de: "Deutsch",
    sv: "Svenska",
  },
  
  // Weather Widget removed as requested
  
  // Not Found Page
  notFound: {
    title: "404 Sidan hittades inte",
    message: "Sidan du letar efter finns inte eller har flyttats.",
    returnHome: "Återgå till startsidan",
  },
  
  // Animations Showcase
  animationsShowcase: {
    title: "Interaktiva Element",
    description: "Utforska våra förstklassiga mikrointeraktioner och animationer som förbättrar din arktiska äventyrsupplevelse.",
    entranceAnimations: "Introduktionsanimationer",
    hoverAnimations: "Svävningseffekter",
    continuousAnimations: "Kontinuerliga Animationer",
    hoverCards: "Interaktiv Information",
    staggeredAnimations: "Sekvenserade Element",
    specialEffects: "Specialeffekter",
  },
  
  // Adventure Map Page
  adventureMap: {
    pageTitle: "Äventyrskarta",
    pageSubtitle: "Utforska den arktiska vildmarken med vår interaktiva karta",
    interactive: "INTERAKTIV",
    locationCount: "Upptäck alla",
    locationsText: "äventyrsplatser",
    description: "Vår äventyrskarta visar alla otroliga platser i och runt Arvidsjaur där vi erbjuder våra förstklassiga arktiska upplevelser. Från vårt huvudkontor på Storgatan 6F till Sameland restaurang och stugor på Karlavagnen 1, och våra förstklassiga boenden på Hotel Laponia - denna interaktiva guide hjälper dig att visualisera din ultimata resa genom svenska Lappland.",
    legendText: "Klicka på en markör för att lära dig mer om platsen. Färgen indikerar typen av plats: grön för boenden, blå för upplevelser och lila för intressepunkter."
  },
  
  // CTA Section
  ctaSection: {
    title: "REDO FÖR ETT ÄKTA ARKTISKT ÄVENTYR?",
    description: "Följ med oss till Svenska Lappland för en upplevelse som går bortom turism – en resa som kommer att stanna hos dig för alltid.",
    buttonText: "Låt oss göra vintern legendarisk",
    adventureAwaits: "Ditt äventyr väntar"
  },
  
  // Booking Section
  bookingSection: {
    title: "BOKA DITT ÄVENTYR",
    subtitle: "Säkra din plats för en oförglömlig upplevelse",
    nameLabel: "Namn",
    namePlaceholder: "Ditt namn",
    emailLabel: "E-post",
    emailPlaceholder: "Din e-post",
    phoneLabel: "Telefon",
    phonePlaceholder: "Telefonnummer",
    dateLabel: "Datum",
    datePlaceholder: "Önskat datum",
    participantsLabel: "Deltagare",
    participantsPlaceholder: "Antal deltagare",
    experienceLabel: "Upplevelse",
    experiencePlaceholder: "Välj upplevelse",
    messageLabel: "Meddelande",
    messagePlaceholder: "Ytterligare önskemål eller frågor",
    submitButton: "Boka Nu",
    successMessage: "Tack! Din bokningsförfrågan har tagits emot.",
    successConfirmation: "Vi kontaktar dig inom kort för att bekräfta dina bokningsuppgifter.",
    experiences: {
      snowmobile: "Snöskotersafari",
      husky: "Hundspannsäventyr",
      aurora: "Norrskenstur",
      iceFishing: "Isfiskeupplevelse",
      survival: "Arktisk överlevnadskurs"
    }
  },

  // Adventure Locations Data (Types)
  adventureLocations: {
    types: {
      accommodation: "Boende",
      experience: "Upplevelse",
      landmark: "Intressepunkt"
    }
  }
};