import { videoUrls } from '../config/videoUrls';

export const de = {
  // Header Navigation
  nav: {
    home: "Startseite",
    packages: "Pakete",
    about: "Über Uns",
    accommodations: "Unterkünfte",
    contact: "Kontakt",
    experiences: "Erlebnisse",
    professionalServices: "Professionelle Dienstleistungen",
    bookNow: "Jetzt Buchen"
  },
  
  // Hero Section
  hero: {
    title: "ENTDECKE DIE ECHTE ARKTIS",
    subtitle: "Unvergessliche Abenteuer in Schwedisch-Lappland",
    cta: "Pakete Entdecken",
  },
  
  // Hero Section - Adding paragraphs
  heroSection: {
    welcome: "WILLKOMMEN IN DER WELT VON",
    adventure: "Dein Abenteuer in <strong>Arvidsjaur Schwedisch-Lappland</strong>",
    paragraph1: "Entdecke unvergessliche Abenteuer nahe dem Polarkreis. Erlebe atemberaubende <strong>Outdoor-Abenteuer</strong> und außergewöhnliche Küche in einer der schönsten Regionen der Welt.",
    paragraph2: "Freue dich auf eine Vielzahl von <strong>actionreichen und adrenalingeladenen Aktivitäten</strong>, die dein Herz höher schlagen lassen.",
    paragraph3: "Entspanne nach einem aufregenden Tag in unserem Spa und genieße die Ruhe der Natur. Unsere <strong>Outdoor-Whirlpools und Saunen</strong> bieten den perfekten Rückzugsort. Zum Abschluss kannst du die wunderschönen <strong>Nordlichter</strong> am Himmel tanzen sehen."
  },
  
  // Experiences/Packages Section
  experiences: {
    title: "UNSERE REISEPAKETE",
    subtitle: "All-Inclusive Arktische Abenteuer",
    viewAll: "Alle Pakete Anzeigen",
    sendInquiry: "Anfrage Senden",
    nextExperience: "Weiter",
    previousExperience: "Zurück",
    closeModal: "Schließen",
    viewDetails: "Details anzeigen",
    bookNow: "Jetzt Buchen",
    durationOptions: ["3 Nächte", "4 Nächte"],
    weekendWeekText: "Verfügbar an Wochentagen und Wochenenden",
    premiumPackagesTitle: "Premium-Pakete",
    premiumPackagesDescription: "Unsere All-inclusive-Premiumpakete kombinieren mehrere Aktivitäten mit luxuriösen Unterkünften für das ultimative Arktis-Erlebnis.",
    hideActivitiesButton: "Aktivitäten Ausblenden",
    exploreActivitiesButton: "Unsere Aktivitäten Entdecken",
    individualActivitiesTitle: "Individuelle Aktivitäten",
    individualActivitiesDescription: "Wählen Sie aus unserer Auswahl an aufregenden individuellen Aktivitäten, um Ihr arktisches Abenteuer individuell zu gestalten",
    
    // Experience List - First few experiences
    list: [
      {
        id: 0,
        title: "Arktisches Abenteuerpaket",
        description: "Unser Signature All-Inclusive-Paket mit den besten Winteraktivitäten, die Schwedisch-Lappland zu bieten hat. Erleben Sie Schneemobilfahren, Hundeschlittenfahrten und mehr in einem umfassenden Paket.",
        price: 1299,
        duration: "3-4 Nächte",
        intensityLevel: "Moderate",
        keyHighlights: ["All-Inclusive Erlebnis", "Premium-Unterkünfte", "Mehrere Aktivitäten", "Professionelle Guides"],
        image: "/images/Snowmobile/Snowmobile 2_result.webp",
        gallery: [
          "/images/Snowmobile/Snowmobile 2_result.webp",
          "/images/Husky/Husky 1_result.webp",
          "/images/Snowmobile/Snowmobile 3_result.webp",
          "/images/Snowmobile/Snowmobile 4_result.webp"
        ],
        detailedInfo: {
          introduction: "Das Arktische Abenteuerpaket ist unser umfassendstes Angebot und bietet Ihnen das komplette Schwedisch-Lappland-Erlebnis. Dieses All-Inclusive-Paket kombiniert die besten Aktivitäten mit Premium-Unterkünften und authentischer lokaler Küche.",
          adventureOptionsTitle: "PAKET BEINHALTET",
          tours: [
            {
              title: "3-NÄCHTE-PAKET",
              description: "Perfekt für einen langen Wochenendausflug. Erleben Sie die Highlights von Schwedisch-Lappland in einem kompakten Zeitrahmen.",
              details: ["2-stündige Schneemobiltour", "Hundeschlittenerlebnis", "Nordlicht-Beobachtung", "3 Nächte Premium-Unterkunft", "Alle Mahlzeiten inklusive"]
            },
            {
              title: "4-NÄCHTE-PAKET",
              description: "Unser erweitertes Paket ermöglicht es Ihnen, vollständig in das arktische Erlebnis einzutauchen, mit zusätzlichen Aktivitäten und Entspannungszeit.",
              details: ["4-stündige Schneemobiltour", "Hundeschlittenerlebnis", "Eisfischen-Abenteuer", "Nordlicht-Beobachtung", "4 Nächte Premium-Unterkunft", "Alle Mahlzeiten inklusive"]
            }
          ],
          importantInfoTitle: "WICHTIGE INFORMATIONEN",
          importantInfo: [
            "3-NÄCHTE-PAKET verfügbar an ausgewählten Wochenenden Freitag - Montag",
            "4-NÄCHTE-PAKET verfügbar in ausgewählten Wochen Montag - Freitag",
            "Flughafentransfers inklusive",
            "Alle notwendigen Ausrüstungen und Kleidung werden gestellt",
            "Geeignet für alle Erfahrungsstufen",
            "Anpassungsoptionen auf Anfrage verfügbar"
          ],
          closingRemark: "Das Arktische Abenteuerpaket bietet die perfekte Balance aus Aufregung, Entspannung und authentischen arktischen Erlebnissen in einem bequemen Paket!"
        },
        tag: {
          text: "Bestseller",
          type: "bestseller"
        },
        features: [
          "All-Inclusive",
          "Mehrere Aktivitäten",
          "Premium-Unterkünfte",
          "Authentische Küche",
          "Professionelle Guides"
        ]
      },
      {
        id: 9,
        title: "Sideways-Paket",
        description: "Erleben Sie den ultimativen Adrenalinkick mit unserem Eisfahrtraining. Meistern Sie das Driften auf Eis unter Anleitung von Rennprofis in einer exklusiven Umgebung.",
        price: 1499,
        duration: "3-4 Nächte",
        intensityLevel: "Fortgeschritten",
        keyHighlights: ["Professionelles Eisfahrtraining", "Mehrere Fahrzeugtypen", "Premium-Unterkünfte", "All-Inclusive Verpflegung"],
        image: "/images/Experiences/ice-driving.jpg",
        gallery: [
          "/images/Experiences/ice-driving.jpg",
          "/images/Experiences/ice-driving2.jpg",
          "/images/Accommodations/hotel-room1.jpg",
          "/images/Restaurant/restaurant-interior.jpg"
        ],
        detailedInfo: {
          introduction: "Das Sideways-Paket bietet ein aufregendes Eisfahrerlebnis unter professioneller Anleitung. Verbessern Sie Ihre Fahrtechnik auf speziell präparierten Eisflächen und genießen Sie den Luxus unserer erstklassigen Unterkünfte.",
          adventureOptionsTitle: "PAKET BEINHALTET",
          tours: [
            {
              title: "3-NÄCHTE-PAKET",
              description: "Unser Wochenendpaket bietet intensive Eisfahrtrainings mit verschiedenen Fahrzeugen.",
              details: ["Tägliches Eisfahrtraining (4 Stunden)", "Verschiedene Fahrzeugtypen", "3 Nächte Premium-Unterkunft", "Alle Mahlzeiten inklusive", "Flughafentransfers"]
            },
            {
              title: "4-NÄCHTE-PAKET",
              description: "Unser erweitertes Paket bietet zusätzliche Trainingszeit und fortgeschrittene Techniken.",
              details: ["Tägliches Eisfahrtraining (6 Stunden)", "Erweiterte Drifttechniken", "Verschiedene Fahrzeugtypen", "4 Nächte Premium-Unterkunft", "Alle Mahlzeiten inklusive", "Flughafentransfers"]
            }
          ],
          importantInfoTitle: "WICHTIGE INFORMATIONEN",
          importantInfo: [
            "Gültiger Führerschein erforderlich",
            "Geeignet für alle Fahrerfahrungsstufen",
            "Alle notwendigen Sicherheitsausrüstungen werden gestellt",
            "Flughafentransfers inklusive",
            "Versicherung im Paketpreis enthalten"
          ],
          closingRemark: "Das Sideways-Paket bietet die perfekte Mischung aus adrenalingeladenen Eisfahrerlebnissen und luxuriösem arktischen Komfort!"
        },
        tag: {
          text: "Empfohlen",
          type: "featured"
        },
        features: [
          "Professioneller Unterricht",
          "Verschiedene Fahrzeugtypen",
          "Premium-Unterkünfte",
          "All-Inclusive Mahlzeiten",
          "Flughafentransfers"
        ]
      },
      {
        id: 10,
        title: "Eis-Performance-Paket",
        description: "Unser Premium-Eisfahrerlebnis für Enthusiasten. Fahren Sie Hochleistungsfahrzeuge auf Eis unter Anleitung von Rennprofis in einer exklusiven Umgebung.",
        price: 2499,
        duration: "3-4 Nächte",
        intensityLevel: "Experte",
        keyHighlights: ["Hochleistungsfahrzeuge", "Professionelle Renninstruktoren", "Luxus-Unterkünfte", "Gourmet-Verpflegung"],
        image: "/images/Experiences/ice-performance.jpg",
        gallery: [
          "/images/Experiences/ice-performance.jpg",
          "/images/Experiences/ice-performance2.jpg",
          "/images/Accommodations/luxury-suite.jpg",
          "/images/Restaurant/dining-experience.jpg"
        ],
        detailedInfo: {
          introduction: "Das Eis-Performance-Paket ist unser exklusivstes Angebot für Fahrbegeisterte. Erleben Sie das ultimative Eisfahrerlebnis mit Hochleistungsfahrzeugen und professionellen Renninstruktoren in einer luxuriösen Umgebung.",
          adventureOptionsTitle: "PAKET BEINHALTET",
          tours: [
            {
              title: "3-NÄCHTE-PAKET",
              description: "Unser Wochenendpaket bietet ein intensives Hochleistungs-Eisfahrerlebnis.",
              details: ["Tägliches Performance-Training (4 Stunden)", "Hochleistungsfahrzeuge", "Persönlicher Renninstruktor", "3 Nächte Luxus-Unterkunft", "Gourmet-Verpflegung", "VIP-Transfers"]
            },
            {
              title: "4-NÄCHTE-PAKET",
              description: "Unser erweitertes Paket bietet zusätzliche Trainingszeit und exklusive Erlebnisse.",
              details: ["Tägliches Performance-Training (6 Stunden)", "Erweiterte Renntechniken", "Hochleistungsfahrzeuge", "Persönlicher Renninstruktor", "4 Nächte Luxus-Unterkunft", "Gourmet-Verpflegung", "VIP-Transfers"]
            }
          ],
          importantInfoTitle: "WICHTIGE INFORMATIONEN",
          importantInfo: [
            "Gültiger Führerschein erforderlich",
            "Vorherige Performance-Fahrerfahrung empfohlen",
            "Alle notwendigen Sicherheitsausrüstungen werden gestellt",
            "Premium-Versicherungspaket inklusive",
            "Helikoptertransfers auf Anfrage verfügbar"
          ],
          closingRemark: "Das Eis-Performance-Paket bietet die ultimative Kombination aus Hochleistungs-Fahrthrills und arktischem Luxus für den anspruchsvollen Enthusiasten!"
        },
        tag: {
          text: "Premium",
          type: "featured"
        },
        features: [
          "Hochleistungsfahrzeuge",
          "Professionelle Renninstruktoren",
          "Luxus-Unterkünfte",
          "Gourmet-Verpflegung",
          "Exklusiver Streckenzugang"
        ]
      },
      {
        id: 1,
        title: "Schneemobil-Abenteuer",
        description: "Fahren Sie über unberührten Schnee in Schwedisch-Lappland mit erstklassigen Ski-doo Modellen. Wählen Sie zwischen 2-, 4- und 6-stündigen Touren für Ihr perfektes Abenteuer.",
        price: 299,
        duration: "2-6 Stunden",
        intensityLevel: "Variabel",
        keyHighlights: ["Erstklassige Schneemobile", "Verschiedene Tourdauern", "Atemberaubende Landschaften", "Erfahrene Guides"],
        image: "/images/Snowmobile/Snowmobile 1_result.webp",
        gallery: [
          "/images/Snowmobile/Snowmobile 1_result.webp",
          "/images/Snowmobile/Snowmobile 2_result.webp",
          "/images/Snowmobile/Snowmobile 3_result.webp",
          "/images/Snowmobile/Snowmobile 4_result.webp"
        ],
        video: videoUrls.snowmobileAdventure,
        detailedInfo: {
          introduction: "Unser Schneemobil-Abenteuer bietet ein aufregendes Erlebnis in der verschneiten Wildnis von Schwedisch-Lappland. Fahren Sie mit erstklassigen Ski-doo Modellen über gefrorene Seen und durch verschneite Wälder.",
          adventureOptionsTitle: "WÄHLEN SIE IHR ABENTEUER",
          tours: [
            {
              title: "2-STUNDEN HINTERLAND-TOUR",
              description: "Ideal, wenn Sie einen kurzen, aufregenden Ausflug in die Wildnis suchen. Inklusive Tee und einem leckeren Snack.",
              details: ["Einpersonen-Schneemobil", "Zweipersonen-Schneemobil auf Anfrage verfügbar"]
            },
            {
              title: "4-STUNDEN HINTERLAND-TOUR",
              description: "Erkunden Sie die Natur noch tiefer, mit zusätzlicher Zeit zum Entspannen und Genießen der Aussicht. Machen Sie eine Pause für Tee und einen süßen Snack in wunderschöner Umgebung.",
              details: ["Einpersonen-Schneemobil", "Zweipersonen-Schneemobil auf Anfrage verfügbar"]
            },
            {
              title: "6-STUNDEN HINTERLAND-ABENTEUER",
              description: "Die ultimative Tour für Abenteuerliebhaber! Verbringen Sie den Tag damit, verschiedene Gelände und atemberaubende Aussichten zu erkunden. Diese Tour beinhaltet Tee, einen süßen Snack und ein leckeres Mittagessen im Freien.",
              details: ["Einpersonen-Schneemobil", "Zweipersonen-Schneemobil auf Anfrage verfügbar"]
            }
          ],
          importantInfoTitle: "WICHTIGE INFORMATIONEN",
          importantInfo: [
            "Kinder können als Beifahrer teilnehmen, was es perfekt für Familienspaß macht",
            "Mindestalter für Fahrer: 18 Jahre mit gültigem Führerschein Klasse B",
            "Zweipersonen-Schneemobile für Familien oder Paare verfügbar"
          ],
          closingRemark: "Mehr als nur eine Fahrt - es geht um unvergessliche Momente und aufregende Abenteuer in der wunderschönen Wildnis Lapplands!"
        },
        tag: {
          text: "Bestseller",
          type: "bestseller"
        },
        features: [
          "Geführte Tour",
          "Hochleistungs-Schneemobile",
          "Warme Kleidung & Ausrüstung gestellt",
          "Fika (Kaffee & Snack) inklusive",
          "Mehrere Daueroptionen"
        ]
      },
      {
        id: 2,
        title: "Hundeschlittenexpedition",
        description: "Führen Sie Ihr eigenes Team von eifrigen Huskys durch stille, schneebedeckte Wälder. Ein authentisches und unvergessliches arktisches Erlebnis.",
        price: 220,
        duration: "1,5 Stunden",
        intensityLevel: "Aktiv / Entspannt",
        keyHighlights: ["Führen Sie Ihr eigenes Team", "Gemütliche Beifahrerfahrt", "Authentische arktische Tradition"],
        image: "/images/Huskys/Husky 1_result.webp",
        gallery: [
          "/images/Huskys/Husky 1_result.webp",
          "/images/Huskys/Husky 2_result.webp",
          "/images/Huskys/Husky 3_result.webp",
          "/images/Huskys/Husky 4_result.webp"
        ],
        video: videoUrls.huskyExpedition,
        "detailedInfo": {
            "introduction": "Machen Sie sich bereit, die Kraft der Schlittenhunde zu spüren, während Sie durch verschneite Wälder und über gefrorene Seen gleiten. Egal, ob Sie Ihr eigenes Team führen oder als Beifahrer entspannen möchten, unsere Husky-Erlebnisse bieten die perfekte Balance aus Aufregung und Gelassenheit.",
            "adventureOptionsTitle": "WÄHLEN SIE IHR ERLEBNIS",
            "tours": [
                {
                    "title": "AKTIVE HUSKY-TOUR",
                    "description": "Fahren Sie Ihren eigenen Schlitten und führen Sie ein Team energiegeladener Huskys durch die arktische Wildnis.",
                    "details": ["Geführt von erfahrenen Mushern", "Keine Vorkenntnisse erforderlich"]
                },
                {
                    "title": "PASSIVE HUSKY-TOUR",
                    "description": "Lehnen Sie sich zurück und genießen Sie die Fahrt, während unsere erfahrenen Musher Sie durch atemberaubende Landschaften führen.",
                    "details": ["Geführt von erfahrenen Mushern", "Familienfreundlich"]
                }
            ],
            "importantInfoTitle": "WICHTIGE INFORMATIONEN",
            "importantInfo": [
                "Geeignet für Anfänger und erfahrene Gäste",
                "Kinder als Beifahrer willkommen",
                "Warme Kleidung bei Bedarf gestellt",
                "Geführt von professionellen Mushern"
            ],
            "closingRemark": "Mehr als nur eine Fahrt - es ist ein authentisches arktisches Erlebnis, das Sie nie vergessen werden!"
        },
        "tag": {
            "text": "Familienliebling",
            "type": "family"
        },
        "features": [
            "Geführt von Mushern",
            "Fahren oder Mitfahren möglich",
            "Warme Kleidung gestellt",
            "Kleingruppenerleben"
        ]
      },
      {
        id: 3,
        title: "Schneeschuhwanderung",
        description: "Erleben Sie die Magie des arktischen Waldes auf Schneeschuhen und entdecken Sie die Schönheit der verschneiten Winterlandschaft Lapplands.",
        price: 40,
        duration: "1,5 Stunden",
        intensityLevel: "Moderat",
        keyHighlights: ["Geführtes Schneeschuh-Abenteuer", "Unberührte Waldpfade", "Warme Getränke & Snacks"],
        image: "/images/Snowshoe_Torchwalk/snowtorch3webp.webp",
        gallery: [
          "/images/Snowshoe_Torchwalk/snowtorch1.webp",
          "/images/Snowshoe_Torchwalk/snowtorch2.webp",
          "/images/Snowshoe_Torchwalk/snowtorch3.webp",
          "/images/Snowshoe_Torchwalk/snowtorch4.webp"
        ],
        video: videoUrls.snowshoeAdventure,
    "detailedInfo": {
      "introduction": "Erleben Sie den Zauber der lappländischen Wälder auf Schneeschuhen, während Sie durch unberührte schneebedeckte Landschaften wandern. Dieses Tagesabenteuer ist perfekt für Naturliebhaber jeden Alters, die die winterliche Wildnis erkunden möchten.",
      "adventureOptionsTitle": "ABENTEUER-DETAILS",
      "tours": [
        {
          "title": "GEFÜHRTE SCHNEESCHUHWANDERUNG",
          "description": "Tagestour durch verschneite Wälder und gefrorene Seen auf Schneeschuhen.",
          "details": [
            "Professioneller Guide mit lokalem Wissen",
            "Hochwertige Schneeschuhe werden gestellt",
            "Heiße Getränke und Snacks inklusive",
            "Fotomöglichkeiten in unberührter Natur"
          ]
        }
      ],
      "importantInfoTitle": "WICHTIGE INFORMATIONEN",
      "importantInfo": [
        "Geeignet für alle Altersgruppen und Fitnesslevel",
        "Keine Vorkenntnisse erforderlich",
        "Alle Ausrüstung wird gestellt",
        "Warme Kleidung empfohlen",
        "Kleine Gruppen für persönliches Erlebnis"
      ],
      "closingRemark": "Unsere Schneeschuhwanderung bietet eine friedliche Möglichkeit, die arktische Wildnis zu erkunden und mit der Natur in ihrer reinsten Winterform in Verbindung zu treten."
    },
    "tag": {
      "text": "Naturerlebnis",
      "type": "nature"
    },
    "features": [
      "Geführte Schneeschuhwanderung",
      "Komplette Ausrüstung gestellt",
      "Heiße Getränke & Snacks inklusive",
      "Familienfreundlich"
    ]
      },
      {
        id: 11,
        title: "Abendliche Fackelwanderung",
        description: "Nehmen Sie teil an einer faszinierenden abendlichen Fackelwanderung unter den Sternen, bei der der dunkle arktische Himmel und das warme Leuchten der Fackeln eine magische Atmosphäre im Winterwald schaffen.",
        price: 40,
        duration: "1,5 Stunden",
        intensityLevel: "Leicht",
        keyHighlights: ["Abendliches Fackelerlebnis", "Sternbeobachtungsmöglichkeit", "Warme Getränke am Feuer"],
        image: "/images/Snowshoe_Torchwalk/snowtorch1.webp",
        gallery: [
          "/images/Snowshoe_Torchwalk/snowtorch4.webp",
          "/images/Snowshoe_Torchwalk/snowtorch3webp.webp",
          "/images/Snowshoe_Torchwalk/snowtorch2.webp",
          "/images/Snowshoe_Torchwalk/snowtorch1.webp"
        ],
        video: videoUrls.torchWalkAdventure,
    "detailedInfo": {
      "introduction": "Nehmen Sie teil an einer atmosphärischen Abendwanderung mit Fackeln unter dem arktischen Himmel. Wenn die Dunkelheit hereinbricht, verwandelt sich der Wald in ein magisches Reich, beleuchtet vom warmen Schein der Fackeln, und schafft unvergessliche Erinnerungen an Ihr arktisches Abenteuer.",
      "adventureOptionsTitle": "ABENTEUER-DETAILS",
      "tours": [
        {
          "title": "ABENDLICHE FACKELWANDERUNG",
          "description": "Abendlicher Spaziergang durch den Winterwald, beleuchtet von Fackeln, mit warmen Getränken am Feuer.",
          "details": [
            "Traditionelle Fackeln werden gestellt",
            "Professioneller Guide mit lokalen Geschichten",
            "Heiße Getränke und Snacks am Lagerfeuer",
            "Mögliche Nordlicht-Beobachtung (wetterabhängig)"
          ]
        }
      ],
      "importantInfoTitle": "WICHTIGE INFORMATIONEN",
      "importantInfo": [
        "Geeignet für alle Altersgruppen",
        "Keine besonderen Fähigkeiten erforderlich",
        "Alle Ausrüstung wird gestellt",
        "Warme Kleidung unbedingt erforderlich",
        "Aktivität findet unabhängig von den Wetterbedingungen statt"
      ],
      "closingRemark": "Unsere Abendliche Fackelwanderung bietet eine friedliche und zugleich magische Art, die arktische Nacht zu erleben, und verbindet Tradition mit der natürlichen Schönheit der lappländischen Winterlandschaft."
    },
    "tag": {
      "text": "Abendaktivität",
      "type": "nature"
    },
    "features": [
      "Geführte Fackelwanderung",
      "Fackeln werden gestellt",
      "Heiße Getränke & Snacks inklusive",
      "Familienfreundlich"
    ]
      },
      {
        id: 4,
        title: "Eisfischen-Abenteuer",
        description: "Bohren Sie durch das Eis auf einem gefrorenen See und versuchen Sie Ihr Glück beim Fangen von arktischem Saibling oder Barsch. Eine friedliche und traditionelle Lappland-Aktivität.",
        price: 149,
        duration: "3-4 Stunden",
        intensityLevel: "Entspannt / Aufregend",
        keyHighlights: ["Authentischer arktischer Lebensstil", "Fischereiausrüstung gestellt", "Testen Sie Ihr Geschick"],
        image: "/images/Ice-Fishing.jpg",
        gallery: [
          "/images/Ice Fishing/Icefish 1_result.webp",
          "/images/Ice Fishing/Icefish 2_result.webp",
          "/images/Ice Fishing/Shoot 3_result.webp",
          "/images/Ice Fishing/Shoot 4_result.webp"
        ],
        "detailedInfo": {
          "introduction": "Beginnen Sie Ihren Tag an einem gefrorenen See mit einer traditionellen Eisfisch-Session, geführt von Einheimischen. Wechseln Sie dann den Gang und fordern Sie sich selbst mit Tontaubenschießen in der verschneiten Wildnis heraus. Dies ist das perfekte arktische Kombi-Erlebnis für alle Niveaus.",
          "adventureOptionsTitle": "WÄHLEN SIE IHR ERLEBNIS",
          "tours": [
            {
              "title": "HALBTAGES ARKTISCHES OUTDOOR-ERLEBNIS",
              "description": "Beginnen Sie mit Eisfischen und genießen Sie dann eine Tontaubenschieß-Session in der arktischen Wildnis. Inklusive Führung, Ausrüstung und Snacks.",
              "details": [
                "Komplette Ausrüstung gestellt",
                "Heiße Getränke inklusive"
              ]
            }
          ],
          "importantInfoTitle": "WICHTIGE INFORMATIONEN",
          "importantInfo": [
            "Geeignet für alle Niveaus",
            "Geführt von erfahrenen Einheimischen",
            "Komplette Ausrüstung gestellt",
            "Warme Outdoor-Kleidung empfohlen"
          ],
          "closingRemark": "Ein echter arktischer Tag - Fischen, Schießen und unvergessliche Erinnerungen in Schwedisch-Lappland schaffen!"
        },
        "tag": {
          "text": "Lokaler Favorit",
          "type": "local"
        },
        "features": [
          "Geführt von Einheimischen",
          "Fischen & Schießen Kombi",
          "Komplette Ausrüstung gestellt",
          "Heiße Getränke inklusive"
        ]
      },
      {
        id: 5,
        title: "Rentierbesuch",
        description: "Treffen und füttern Sie Lapplands bekanntestes Tier aus der Hand und machen Sie unvergessliche Fotos mit unseren freundlichen Rentieren.",
        price: 45,
        duration: "40 Minuten",
        intensityLevel: "Entspannt",
        keyHighlights: ["Rentiere aus der Hand füttern", "Fotogelegenheit", "Familienfreundliche Aktivität"],
        image: "/images/Reindeers.jpg",
        gallery: [
          "/images/Reindeers/Reindeers 1_result.webp",
          "/images/Reindeers/Reindeers 2_result.webp",
          "/images/Reindeers/Reindeers 3_result.webp",
          "/images/Reindeers/Reindeers 5_result.webp"
        ],
        video: videoUrls.reindeerVisit,
        "detailedInfo": {
          "introduction": "Kommen Sie unseren freundlichen Rentieren ganz nahe, füttern Sie sie aus der Hand und halten Sie unvergessliche Erinnerungen im Herzen Lapplands fest.",
          "adventureOptionsTitle": "WÄHLEN SIE IHR ERLEBNIS",
          "tours": [
            {
              "title": "RENTIERFÜTTERUNGS-ERLEBNIS",
              "description": "Treffen, füttern und fotografieren Sie Rentiere in einer gemütlichen natürlichen Umgebung.",
              "details": [
                "Tierfutter inklusive",
                "Tolle Fotomöglichkeiten"
              ]
            }
          ],
          "importantInfoTitle": "WICHTIGE INFORMATIONEN",
          "importantInfo": [
            "Geeignet für alle Altersgruppen",
            "Tierfutter inklusive",
            "Perfekt für Familien und Paare",
            "Keine spezielle Ausrüstung nötig"
          ],
          "closingRemark": "Kurz, einfach und unvergesslich - kommen Sie, treffen Sie die Rentiere und machen Sie Ihr arktisches Erlebnis komplett!"
        },
        "tag": {
          "text": "Familienliebling",
          "type": "family"
        },
        "features": [
          "Rentiere treffen & füttern",
          "Fotogelegenheit",
          "Familienfreundlich"
        ]
      },
      {
        id: 6,
        title: "Hubschrauber-Sightseeing-Tour",
        description: "Genießen Sie einen atemberaubenden Blick aus der Vogelperspektive auf die weite arktische Wildnis, gefrorene Seen und schneebedeckte Wälder von einem Hubschrauber aus.",
        price: 599,
        duration: "30 Minuten Flug",
        intensityLevel: "Aufregend",
        keyHighlights: ["Panoramische Arktisaussichten", "Einzigartige Perspektive", "Erfahrener Pilot"],
        image: "/images/Helikopter.jpg",
        gallery: [
          "/images/Helicopter/Helicopter 1_result.webp",
          "/images/Helicopter/Helicopter 2_result.webp",
          "/images/Helicopter/Helicopter 3_result.webp",
          "/images/Helicopter/Helicopter 4_result.webp"
        ],
        video: videoUrls.helicopterTour,
        "detailedInfo": {
            "introduction": "Genießen Sie einen atemberaubenden Blick aus der Vogelperspektive auf die weite arktische Wildnis, gefrorene Seen und schneebedeckte Wälder von einem Hubschrauber aus. Erleben Sie die Landschaft wie nie zuvor, während Sie über Schwedisch-Lappland schweben.",
            "adventureOptionsTitle": "WÄHLEN SIE IHR ERLEBNIS",
            "tours": [
                {
                    "title": "30-MINÜTIGER PANORAMAFLUG",
                    "description": "Unsere Standardtour bietet Panoramablicke auf das winterliche Wunderland des arktischen Lapplands.",
                    "details": ["Erfahrener Pilot", "Kopfhörer werden gestellt"]
                },
                {
                    "title": "INDIVIDUELLER FLUG ODER PRIVATER SHUTTLE",
                    "description": "Suchen Sie nach etwas Längerem oder Exklusiverem? Kontaktieren Sie uns für maßgeschneiderte Flugdauern oder privaten Transport.",
                    "details": ["Private Buchung auf Anfrage", "Verfügbarkeit vorbehalten"]
                }
            ],
            "importantInfoTitle": "WICHTIGE INFORMATIONEN",
            "importantInfo": [
                "Mindestens 4 Passagiere erforderlich für Standardflug",
                "Wetterabhängige Aktivität",
                "Private Flüge auf Anfrage verfügbar"
            ],
            "closingRemark": "Schweben Sie über die Arktis und genießen Sie Aussichten, die nur wenige jemals zu sehen bekommen - ein unvergesslicher Höhepunkt Ihrer Reise."
        },
        "tag": {
            "text": "Landschaftlich",
            "type": "scenic"
        },
        "features": [
            "Professioneller Pilot",
            "Landschaftliche Lufttour",
            "Winter-Exklusiv",
            "Individuelle Flüge verfügbar"
        ]
      },
      {
        id: 7,
        title: "Eisdrift-Erlebnis",
        description: "Meistern Sie die Kunst des Driftens auf Eis mit unseren professionellen Instruktoren auf speziell präparierten gefrorenen Strecken in Schwedisch-Lappland.",
        price: 1800,
        duration: "Ganzer Tag",
        intensityLevel: "Extrem",
        keyHighlights: ["Performance-Fahren", "Profi-Instruktoren", "Hochgeschwindigkeits-Arktisaction"],
        image: "/images/Drifting.jpg",
        gallery: [
          "/images/Drifting.jpg",
          "/images/Ice Drift/Cars 1_result.webp",
          "/images/Ice Drift/Cars 2_result.webp",
          "/images/Ice Drift/Cars 3_result.webp"
        ],
        video: videoUrls.iceDriftExperience,
        "detailedInfo": {
          "introduction": "Spüren Sie den Nervenkitzel des Gleitens und Driftens auf dem Eis, wobei Experteninstruktoren Sie bei jedem Schritt anleiten. Geeignet für alle Niveaus, ist dies Ihre Chance, Ihre Grenzen auf gefrorenen Seen zu erweitern.",
          "adventureOptionsTitle": "WÄHLEN SIE IHR ERLEBNIS",
          "tours": [
            {
              "title": "1-STUNDEN EISDRIFT-SESSION",
              "description": "Lassen Sie sich mit Expertenanleitung auf unseren gefrorenen Strecken in das Eisdriften einführen.",
              "details": [
                "Professioneller Instruktor inklusive",
                "Fahrzeuge für das Driften vorbereitet"
              ]
            },
            {
              "title": "HALBTAGES-EISDRIFT-ERLEBNIS",
              "description": "Erweitern Sie Ihre Fähigkeiten mit verlängerter Streckenzeit und professionellem Coaching.",
              "details": [
                "Sicherheitsausrüstung gestellt",
                "Mehrere Streckenlayouts verfügbar"
              ]
            }
          ],
          "importantInfoTitle": "WICHTIGE INFORMATIONEN",
          "importantInfo": [
            "Keine vorherige Drifterfahrung erforderlich",
            "Sicherheitsausrüstung gestellt",
            "Heiße Getränke inklusive",
            "Perfekt für Einzelpersonen, Gruppen oder Firmenveranstaltungen"
          ],
          "closingRemark": "Buchen Sie jetzt Ihren Platz und erleben Sie das aufregendste Motorsportabenteuer der Arktis!"
        },
        "tag": {
          "text": "Adrenalinkick",
          "type": "adrenaline"
        },
        "features": [
          "Professioneller Unterricht",
          "Präparierte Eisstrecken",
          "Sicherheitsausrüstung gestellt"
        ]
      },
      {
        id: 8,
        title: "Buggy-Drift-Abenteuer",
        description: "Fahren und driften Sie Buggys auf schneebedeckten Strecken mit sofortiger Beschleunigung und maximaler Kontrolle - perfekt für Adrenalinjunkies.",
        price: 249,
        duration: "1 Stunde",
        intensityLevel: "Aufregend",
        keyHighlights: ["Off-Road Buggy-Spaß", "Navigation auf verschneiten Pfaden", "Beheizte Kabinenoption"],
        image: "/images/Side-By-Side-Buggy-Drifting.jpg",
        gallery: [
          "/images/Side by Side/SBS 1_result.webp",
          "/images/Side by Side/SBS 2_result.webp",
          "/images/Side by Side/SBS 3_result.webp",
          "/images/Side by Side/SBS 4_result.webp"
        ],
        video: videoUrls.buggyDriftAdventure,
        "detailedInfo": {
          "introduction": "Erleben Sie den Rausch des Buggy-Driftens auf präparierten Schneestrecken. Fordern Sie sich selbst heraus oder bringen Sie einen Freund als Beifahrer mit für extra Spaß.",
          "adventureOptionsTitle": "WÄHLEN SIE IHR ERLEBNIS",
          "tours": [
            {
              "title": "1-STUNDEN BUGGY-DRIFT-SESSION",
              "description": "Eine Stunde Renn- und Drift-Action auf Schneestrecken.",
              "details": [
                "Sicherheitsgurte und Anweisungen inklusive",
                "Beifahreroption verfügbar"
              ]
            }
          ],
          "importantInfoTitle": "WICHTIGE INFORMATIONEN",
          "importantInfo": [
            "Ein oder zwei Personen pro Buggy (Fahrer + Beifahrer)",
            "Geeignet für alle Erfahrungsstufen",
            "Sicherheitsgurte und Anweisungen gestellt",
            "Warme Outdoor-Kleidung empfohlen"
          ],
          "closingRemark": "Machen Sie sich bereit zum Driften, Rasen und Fühlen des arktischen Rausches - buchen Sie Ihr Buggy-Abenteuer noch heute!"
        },
        "tag": {
          "text": "Adrenalinkick",
          "type": "adrenaline"
        },
        "features": [
          "Ein oder zwei Personen pro Buggy",
          "Sicherheitsausrüstung gestellt",
          "Präparierte Schneestrecken",
          "Adrenalingeladenes Erlebnis"
        ]
      }
    ]
  },
  
  // Accommodations Section
  accommodations: {
    title: "UNTERKÜNFTE",
    subtitle: "Komfortable Unterkünfte in der Arktis",
    viewAll: "Alle Unterkünfte anzeigen",
    whereYouWillStay: "Wo Sie Übernachten",
    comingSoon: "Demnächst",
    from: "Ab",
    night: "Nacht",
    registerInterest: "Vormerken",
    checkAvailability: "Verfügbarkeit prüfen",
    viewOptions: "Optionen anzeigen",
    // Accommodation data
    cabinHotel: {
      title: "CABIN HOTEL SAMELAND",
      description: "Erleben Sie Luxus in unserem Premium-Mirror-Glass-Cabin-Hotel mit raumhohen Glaswänden, die einen ungehinderten Blick auf die arktische Wildnis und die Nordlichter bieten. Ein wahrhaft unvergesslicher Aufenthalt in der Natur.",
      features: [
        "Für 2-4 Gäste",
        "13 Cabins",
        "Klimatisiert",
        "Luxuriöses Kingsize-Bett",
        "eigene Küche",
        "SameLand, Arvidsjaur"
      ]
    },
    txaChalet: {
      title: "TXA - CHALET",
      description: "Übernachte im eigenen TXA - Chalet und erlebe ein Höchstmaß an Komfort. Unser exklusives Chalet bietet eine perfekte Mischung aus rustikalem Charme und modernem Luxus.",
      features: [
        "Bis zu 24 Gäste",
        "12 Schlafzimmer",
        "Private Sauna",
        "Private Lounge / Restaurant"
      ]
    },
    hotelLaponia: {
      title: "HOTEL LAPONIA",
      description: "Eine komfortable Alternative zu unserem TXA Chalet. Das Hotel Laponia bietet Ihnen einen angenehmen Aufenthalt vor und nach Ihren Abenteuern, mit allen Annehmlichkeiten, die Sie benötigen.",
      features: [
        "Zentrale Lage",
        "Arktisches Ambiente",
        "nur 10km vom Flughafen entfernt",
        "Fjälls Pub & Bistro"
      ]
    },
    description: "Nach einem Tag voller Abenteuer bieten unsere erstklassigen Unterkünfte den perfekten Ort zum Entspannen und Erholen.",
    types: {
      hotel: {
        title: "Hotel Laponia",
        description: "Unser Partnerhotel bietet luxuriöse Zimmer mit allen Annehmlichkeiten für einen komfortablen Aufenthalt.",
        features: ["Luxuriöse Zimmer", "Spa-Bereich", "Restaurant", "Zentrale Lage", "WLAN"]
      },
      cabins: {
        title: "Arktische Hütten",
        description: "Unsere gemütlichen Hütten bieten Privatsphäre und einen authentischen Aufenthalt in der arktischen Wildnis.",
        features: ["Voll ausgestattete Küche", "Privater Whirlpool", "Kamin", "Nordlicht-Aussicht", "Naturnahe Lage"]
      },
      glamping: {
        title: "Arctic Glamping",
        description: "Erleben Sie Luxus-Camping mit allen Annehmlichkeiten in einer atemberaubenden natürlichen Umgebung.",
        features: ["Beheiztes Zelt", "Komfortable Betten", "Panoramafenster", "Nordlicht-Aussicht", "Authentisches Erlebnis"]
      }
    }
  },

  
  // About Section - Simplified
  about: {
    title: "ÜBER UNS",
    subtitle: "Unser Engagement für authentische arktische Abenteuer"
  },
  

  // Contact Section
  contact: {
    title: "MACHEN WIR DEN WINTER LEGENDÄR", 
    subtitle: "Bereit, die echte Arktis zu erleben? Kontaktieren Sie uns, um Ihr Abenteuer zu planen", 
    formTitle: "Kontaktieren Sie Uns", 
    firstName: "Vorname", 
    lastName: "Nachname", 
    email: "E-Mail-Adresse", 
    phone: "Telefonnummer", 
    visitDate: "Wann planen Sie Ihren Besuch?", 
    visitDatePlaceholder: "Wählen Sie einen Zeitraum", 
    visitDateOptions: {
      decJan: "Dezember - Januar", 
      febMar: "Februar - März", 
      aprMay: "April - Mai", 
      other: "Andere / Noch nicht sicher", 
    },
    interests: "Ich interessiere mich für (zutreffendes auswählen)", 
    charterFlight: "Wählen Sie Ihren Abflugort",
    charterFlightPlaceholder: "Wählen Sie eine Charterflug-Option",
    message: "Ihre Nachricht", 
    messagePlaceholder: "Haben Sie Fragen, Ideen oder sind Sie bereit, Ihr Abenteuer zu planen? Schreiben Sie uns eine Nachricht – wir melden uns schneller bei Ihnen als ein Schneemobil im Neuschnee!", 
    sending: "Wird gesendet...", 
    send: "Nachricht Senden", 
    successTitle: "Nachricht Gesendet", 
    successMessage: "Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.", 
    errorTitle: "Übermittlung Fehlgeschlagen", 
    errorMessage: "Bitte versuchen Sie es später erneut.", 
    // Form subsection with nested objects
    form: {
      contactUsLabel: "Kontaktieren Sie Uns",
      desiredPackagesLabel: "Gewünschte Pakete",
      desiredActivitiesLabel: "Gewünschte Aktivitäten",
      packages: {
        arcticWeek: "Arctic Adventure (Woche)",
        arcticWeekend: "Arctic Adventure (Wochenende)",
        sidewaysWeek: "Sideways Adventure (Woche)",
        sidewaysWeekend: "Sideways Adventure (Wochenende)",
        performanceWeek: "Performance Paket (Woche)",
        performanceWeekend: "Performance Paket (Wochenende)",
        incentive: "Incentive Events",
        custom: "Maßgeschneiderte Events"
      },
      activities: {
        snowmobile: "Schneemobil Tour",
        reindeer: "Besuchen Sie die Rentiere",
        snowshoe: "Schneeschuhwanderung",
        spa: "Arktisches Spa",
        restaurant: "Jay Jays Restaurant",
        helicopter: "Hubschrauberflüge",
        aurora: "Nordlichter"
      },
      flight: {
        none: "Kein Charterflug benötigt",
        privateJet: "Privatjet"
      }
    },
    
    // FAQ Section
    faq: {
      title: "Häufig gestellte Fragen",
      showMore: "Mehr anzeigen",
      showLess: "Weniger anzeigen",
      q1: "Was ist die beste Reisezeit?",
      a1: "Die Hauptsaison dauert von Dezember bis April, wobei Januar bis März die besten Schneeverhältnisse und Nordlicht-Sichtbarkeit bieten.",
      q2: "Wie komme ich nach Arvidsjaur?",
      a2: "Arvidsjaur verfügt über einen eigenen Flughafen mit Verbindungen nach Stockholm. Wir bieten Transfers vom Flughafen zu unserem Standort an.",
      q3: "Benötige ich spezielle Ausrüstung?",
      a3: "Wir stellen alle Spezialausrüstungen zur Verfügung, einschließlich Thermoanzüge, Stiefel und Helme. Bringen Sie einfach warme Basisschichten und Ihren Abenteuersinn mit!",
      q4: "Brauche ich einen gültigen Führerschein?",
      a4: "Um ein Schneemobil zu fahren oder an unserem Auto-Drift-auf-Eis-Programm teilzunehmen, müssen Sie über 18 Jahre alt sein und einen gültigen Führerschein besitzen. Bitte haben Sie Ihren Führerschein immer dabei, da die Polizei die Gültigkeit des Führerscheins überprüfen kann.",
      q5: "Kann ich mein eigenes Schneemobil fahren?",
      a5: "Ja, unsere Schneemobile sind alle einsitzig. Wenn Sie als Beifahrer an einer Tour teilnehmen möchten, informieren Sie bitte unser Team.",
      q6: "Was ist, wenn mir kalt wird?",
      a6: "Der Winter in Schwedisch-Lappland kann etwa -20°C oder kälter sein. Bitte stellen Sie sicher, dass Sie unsere Ausrüstung jederzeit tragen, wenn Sie im Freien sind. Verschiedene Kleidungsschichten halten Sie warm. Wir sagen unsere Touren nicht wegen Kälte ab.",
      q7: "Wie viel Tageslicht haben wir?",
      a7: "Prüfen Sie die verschiedenen Tageslichtzeiten in Arvidsjaur, Schweden: Mitte Dezember (10:48-14:23, 3 Std. 35 Min.), Mitte Januar (10:47-14:55, 4 Std. 8 Min.), Mitte Februar (09:10-16:47, 7 Std. 37 Min.), Mitte März (07:23-18:26, 11 Std. 3 Min.), Mitte April (05:26-20:06, 14 Std. 40 Min.).",
      q8: "Kann ich 'nur' eine Schneemobiltour buchen?",
      a8: "Ja, Sie können jede Aktivität einzeln buchen. TXA ist auf Premium-Paketreisen spezialisiert und fokussiert, aber wir prüfen gerne unsere Termine und machen Ihnen ein Angebot für einzelne Aktivitäten.",
      q9: "Wann ist die beste Zeit, um die Aurora Borealis zu sehen?",
      a9: "Die mystischen Nordlichter sind ein Naturschauspiel und können daher nicht garantiert werden. Wenn die Bedingungen gut sind (Oktober - März, keine Wolken, hohe KP-Vorhersage), hoffen wir, dieses Phänomen mit Ihnen beobachten zu können.",
      q10: "Was ist die beste Reisesaison?",
      a10: "Wir haben unsere Wintersaison von Dezember bis April.",
      q11: "Was ist in den Premium-Paketen enthalten?",
      a11: "Unsere Premium-Pakete beinhalten alles, vom ersten Angebot bis zur Nachbereitung der Events. Grundsätzlich muss nur der Alkohol vor Ort extra bezahlt werden. Schauen Sie sich unsere Premium-Paketbeispiele an!",
      q12: "Was ist mit Reiseinformationen?",
      a12: "Die Möglichkeiten, in den hohen Norden zu reisen, sind sehr begrenzt. Planen Sie daher bitte immer genügend Zeit ein (mindestens 1,5 Stunden vor Abflug). Denken Sie daran, Ihren gültigen Personalausweis oder Reisepass und Ihren Führerschein mitzubringen. Gepäck: 20 kg und 1 Handgepäck sind in Ihrem Ticket enthalten. In Arvidsjaur am Flughafen treffen Sie unser Team am Triple X Counter in der Ankunftshalle. Die Flüge werden von Populair und den Chartergesellschaften PAS, Polar Flights und Prosky durchgeführt.",
      q13: "Was ist mit Haftungsausschlüssen?",
      a13: "Ein Haftungsausschluss wird vor Ort ausgestellt. Es gelten folgende Selbstbeteiligungen: 2.200,00 EUR Schneemobil | 500,00 EUR Ice-Karts | 2.200,00 EUR Side-by-Sides | 7.500,00 EUR AUDI RS3.",
      q14: "Was ist mit Versicherungen?",
      a14: "Reisen in ein fremdes Land kann mit verschiedenen Risiken verbunden sein. Egal wie vorsichtig Sie sind. Seit der Gründung von Triple X im Jahr 2017 hatten wir keine schweren Verletzungen, aber wir möchten darauf hinweisen, dass es zusätzliche Versicherungen gibt, die online gebucht werden können. Reiserücktrittsversicherung sowie Haftpflichtversicherung, die die Selbstbeteiligung im Schadensfall reduzieren kann. www.allianz-reiseversicherung.de. Der Fahrer unserer Fahrzeuge haftet für Schäden am Fahrzeug. Die maximale persönliche Haftung finden Sie in unserem Haftungsausschluss."
    },
    
    // Social Media Section
    social: {
      title: "Folgen Sie Uns",
    },
    
    // Contact Info Section
    info: {
      title: "Kontaktieren Sie Uns",
      location: "Unser Standort",
      locationText: "Storgatan 6F, 93331 Arvidsjaur, Schwedisch-Lappland, Schweden",
      phone: "Telefon",
      phoneText1: "+49 (0) 151 2411 5455",
      phoneText2: "+46 (0) 70 357 5455",
      email: "E-Mail",
      emailText: "info@triple-x-adventures.com",
      restaurant: "Reservierungen @JayJay's",
      restaurantPhone: "+46 (0) 70 387 5455",
    }
  },

  // Footer
  footer: {
    copyright: " 2025 Triple X Adventures. Alle Rechte vorbehalten.",
    privacyPolicy: "Datenschutzrichtlinie",
    termsConditions: "AGB",
    imprint: "Impressum",
    allRightsReserved: "Alle Rechte vorbehalten.",
    openingHours: "Öffnungszeiten",
    monday: "Montag - Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
    byAppointment: "Nach Vereinbarung",
    // Privacy Policy Modal
    privacyPolicyTitle: "DATENSCHUTZRICHTLINIE",
    privacyPolicyIntro: "Diese Datenschutzrichtlinie (\"Richtlinie\") beschreibt, wie Triple X Adventures AB (\"Triple X Adventures AB\", \"wir\", \"uns\" oder \"unser\") die persönlich identifizierbaren Informationen (\"Persönliche Informationen\") sammelt, schützt und verwendet, die Sie (\"Benutzer\", \"Sie\" oder \"Ihr\") auf der Website triple-x-adventures.com und allen ihren Produkten oder Dienstleistungen (zusammen \"Website\" oder \"Dienste\") angeben können. Sie beschreibt auch die Möglichkeiten, die Sie bezüglich der Verwendung Ihrer persönlichen Daten haben und wie Sie auf diese zugreifen und sie aktualisieren können. Diese Richtlinie gilt nicht für die Praktiken von Unternehmen, die wir nicht besitzen oder kontrollieren, oder für Personen, die wir nicht beschäftigen oder verwalten.",
    automaticCollection: "Automatische Erfassung von Informationen",
    automaticCollectionText: "Unsere oberste Priorität ist die Sicherheit der Kundendaten, und wir üben eine No-Logs-Politik aus. Wir verarbeiten möglicherweise nur minimale Benutzerdaten, nur so viel wie unbedingt notwendig ist, um die Website oder Dienste zu betreiben. Automatisch gesammelte Informationen werden nur verwendet, um potenzielle Missbrauchsfälle zu identifizieren und statistische Informationen über die Website-Nutzung zu erstellen. Diese statistischen Informationen werden nicht auf eine Weise aggregiert, die einen bestimmten Benutzer des Systems identifizieren würde.",
    personalInfoCollection: "Sammlung persönlicher Informationen",
    personalInfoCollectionText: "Sie können die Website besuchen, ohne uns mitzuteilen, wer Sie sind oder Informationen preiszugeben, anhand derer jemand Sie als bestimmte, identifizierbare Person identifizieren könnte. Wenn Sie jedoch einige Funktionen der Website nutzen möchten, werden Sie möglicherweise gebeten, bestimmte persönliche Informationen anzugeben (z. B. Ihren Namen und Ihre E-Mail-Adresse). Wir erhalten und speichern alle Informationen, die Sie uns wissentlich zur Verfügung stellen, wenn Sie einen Kauf tätigen oder ein Online-Formular auf der Website ausfüllen. Diese Informationen können Folgendes umfassen:",
    personalInfoItems: ["Persönliche Angaben wie Name, Wohnsitzland usw.", "Kontaktinformationen wie E-Mail-Adresse, Adresse usw."],
    personalInfoChoice: "Sie können sich dafür entscheiden, uns Ihre persönlichen Daten nicht zur Verfügung zu stellen, dann können Sie jedoch möglicherweise einige Funktionen der Website nicht nutzen. Benutzer, die sich nicht sicher sind, welche Informationen obligatorisch sind, können uns gerne kontaktieren.",
    // Terms and Conditions Modal
    termsTitle: "ALLGEMEINE GESCHÄFTSBEDINGUNGEN",
    termsIntro: "Die folgenden Allgemeinen Geschäftsbedingungen gelten für Pakete, die von Triple X Adventures AB (im Folgenden als \"TXA\" bezeichnet) durch seine Paketprogramme an folgenden Orten angeboten und geliefert werden: Arvidsjaur, Schwedisch-Lappland und alle anderen Gebiete, in denen die Dienstleistungen erbracht werden.",
    commercialTerms: "GESCHÄFTSBEDINGUNGEN",
    contactUs: "Kontakt",
    contactUsText: "Wenn Sie uns zu diesem Thema kontaktieren möchten, können Sie dies über das Kontaktformular tun, eine E-Mail an info@triple-x-adventures.com senden oder einen Brief an folgende Adresse schreiben:"
  },
  
  // Language Selector
  language: {
    title: "Sprache",
    en: "English",
    de: "Deutsch",
    sv: "Svenska",
  },
  
  // Not Found Page
  notFound: {
    title: "404 Seite nicht gefunden",
    message: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    returnHome: "Zurück zur Startseite",
  },
  
  
  
  // CTA Section
  ctaSection: {
    title: "BEREIT FÜR EIN ECHTES ARKTISCHES ABENTEUER?",
    description: "Begleiten Sie uns in Schwedisch-Lappland für ein Erlebnis, das über Tourismus hinausgeht - eine Reise, die für immer bei Ihnen bleiben wird.",
    buttonText: "Machen wir den Winter legendär",
    adventureAwaits: "Ihr Abenteuer wartet"
  },
  
  
  
  // Professional Services Page
  professionalServices: {
    hero: {
      title: "Professionelle Dienstleistungen in Schwedisch-Lappland",
      subtitle: "Maßgeschneiderte Lösungen für Unternehmensgruppen, Filmproduktionen und exklusive Kooperationen in der arktischen Wildnis.",
      cta: {
        contact: "KONTAKT AUFNEHMEN",
        explore: "DIENSTLEISTUNGEN ENTDECKEN"
      }
    },
    services: {
      title: "UNSERE DIENSTLEISTUNGEN",
      subtitle: "Maßgeschneiderte arktische Lösungen für Marken, Produktionen & Veranstaltungen im hohen Norden",
      corporate: {
        title: "Unternehmens- & Branchenveranstaltungen",
        description: "Vollservice-Planung und -Durchführung für Unternehmen, Teams und Automobilmarken.",
        subtitle: "Von kreativen Konzepten bis hin zur Logistik vor Ort - wir verwirklichen arktische Träume.",
        drivingEvents: {
          title: "Fahrevents & Fahrzeugtests",
          items: [
            "Eispisten, schneebedeckte Strecken und maßgeschneiderte Kurse für Winterfahrerlebnisse",
            "Fahrzeugtests unter extremen arktischen Bedingungen",
            "Unterstützung bei Genehmigungen, Sicherheit und lokalen Partnerschaften"
          ]
        },
        teambuilding: {
          title: "Teambuilding-Abenteuer",
          items: [
            "Schneemobilsafaris, Überlebenstraining, Hundeschlittenfahrten - konzipiert für Teambildung und Herausforderung",
            "Maßgeschneiderte Gruppenprogramme mit individuellen Reiseplänen"
          ]
        },
        retreats: {
          title: "Winter-Retreats & Führungskräftetraining",
          items: [
            "Gemütliche Aufenthalte in Chalets, Abendessen am Kamin bei JayJay's und Workshops in der Wildnis",
            "Konzipiert, um Vertrauen, Widerstandsfähigkeit und Teamgeist aufzubauen"
          ]
        },
        productLaunches: {
          title: "Produkteinführungen & Masterclasses",
          items: [
            "Herausragende Locations, vollständige Veranstaltungsplanung, arktische Logistik & Medienunterstützung",
            "Schaffen Sie unvergessliche Markenmomente unter den Nordlichtern"
          ]
        }
      },
      production: {
        title: "Produktionsunterstützung",
        description: "Die perfekte arktische Kulisse - und alles hinter den Kulissen, um sie zum Laufen zu bringen.",
        items: [
          "Standorterkundung & Genehmigungen (Gefrorene Seen, Wälder, abgelegene Wildnis)",
          "Arktische Logistik: Transport, Treibstoff, Satellitenkommunikation & beheizte Einrichtungen",
          "Erfahrene Führer & Sicherheitsexperten für Unterstützung bei abgelegenen Dreharbeiten",
          "Schneemobile und Geländefahrzeuge für raue Bedingungen"
        ]
      },
      vip: {
        title: "Maßgeschneiderte VIP-Erlebnisse",
        description: "Exklusive Erlebnisse für Markenbotschafter, hochkarätige Kunden und Presse.",
        items: [
          "Luxuriöse arktische Abenteuer mit privaten Führern & Premium-Extras",
          "Zugang zu unberührter Natur & geheimen Orten",
          "Markenkooperationen & Veranstaltungsausrichtung",
          "Botschafterreisen, Content-Erstellung und arktisches Storytelling"
        ]
      },
      consulting: {
        title: "Beratung & Planung",
        description: "Ihr strategischer Partner für Projekte im Norden.",
        items: [
          "Konzeptentwicklung & Logistik für arktische Veranstaltungen",
          "Expertise im Umgang mit rauen Klimabedingungen und abgelegenen Umgebungen",
          "Lokale Partnerschaften mit Grundbesitzern und Lieferanten",
          "Vollservice-Koordination von der Idee bis zur Umsetzung"
        ]
      }
    },
    stats: {
      clients: {
        number: "500+",
        text: "Zufriedene Kunden und Abenteuerbegeisterte"
      },
      services: {
        number: "25+",
        text: "Professionelle Dienstleistungen und maßgeschneiderte Erlebnisse"
      },
      satisfaction: {
        number: "98.3%",
        text: "Kundenzufriedenheitsbewertung"
      }
    },
    drivecenter: {
      title: "Partnerschaft mit Drivecenter Arena",
      subtitle: "Arktische Motorsporterlebnisse auf höchstem Niveau",
      description: "Wir freuen uns, mit der Drivecenter Arena zusammenzuarbeiten, Skandinaviens längster und vielseitigster Rennstrecke, die sich in Fällfors, Provinz Västerbotten, befindet. Diese aus einem ehemaligen Militärflugplatz umgebaute 4.270 Meter lange Strecke ist Schwedens führendes Motorsportziel.",
      highlights: {
        title: "Hauptmerkmale:",
        items: [
          "<strong>Skandinaviens längste Strecke:</strong> Eine 4.270 Meter lange Rennstrecke, entworfen von TTI GmbH, mit 16 anspruchsvollen Kurven, die selbst die Fähigkeiten der erfahrensten Fahrer auf die Probe stellen.",
          "<strong>Ganzjähriges Motorsportzentrum:</strong> Von Veranstaltungen wie dem Mitternachtssonnenrennen bis zur FIM Snowcross-Weltmeisterschaft ist die Drivecenter Arena das ganze Jahr über ein Anziehungspunkt für Motorsportbegeisterte.",
          "<strong>Hochmoderne Einrichtungen:</strong> Ausgestattet mit 24 modernen Boxengaragen, Tribünen für 5.000 Zuschauer und Unterkünften vor Ort, darunter ein Hotel mit 76 Zimmern, wird ein umfassendes Erlebnis für Teilnehmer und Besucher gleichermaßen gewährleistet.",
          "<strong>Vielfältige Fahrerlebnisse:</strong> Von Hochgeschwindigkeits-Trackdays und Drift-Herausforderungen bis hin zu Offroad-Abenteuern mit Polaris RZRs bietet die Arena eine große Auswahl an Aktivitäten und Dienstleistungen für alle Adrenalinstufen.",
          "<strong>Umfassende Trainingsprogramme:</strong> Angebot von Risiko- und Sicherheitstrainings, Fahrerausbildung und Fahrzeugtestdiensten, wodurch sie zu einem Zentrum sowohl für Freizeit- als auch für berufliche Entwicklung wird."
        ]
      },
      experience: {
        title: "Erleben Sie die Verschmelzung von Geschwindigkeit und arktischer Wildnis",
        description: "Dank unserer Partnerschaft mit der Drivecenter Arena können wir einzigartige Motorsporterlebnisse in der atemberaubenden Natur Nordschwedens anbieten. Ob Sie nach Action mit hoher Geschwindigkeit oder ruhigen arktischen Aussichten suchen, diese Zusammenarbeit bietet Ihnen eine perfekte Mischung aus beidem."
      },
      cta: {
        title: "Bereit, die Drivecenter Arena zu erleben?",
        subtitle: "Kontaktieren Sie uns, um Ihr Motorsportabenteuer zu planen",
        button: "KONTAKT AUFNEHMEN"
      }
    },
    contact: {
      title: "Lassen Sie uns über arktische Geschäfte sprechen",
      description: "Haben Sie eine Idee, ein Team oder ein Projekt? Wir sind bereit, es gemeinsam in der Arktis aufzubauen.",
      form: {
        name: {
          label: "Ihr Name",
          placeholder: "Max Mustermann"
        },
        email: {
          label: "Ihre E-Mail",
          placeholder: "ihre@email.com"
        },
        message: {
          label: "Ihre Nachricht",
          placeholder: "Erzählen Sie uns von Ihrem Projekt oder Ihrer Idee..."
        },
        button: "Nachricht senden",
        sending: "Wird gesendet...",
        directEmail: "Oder schreiben Sie uns direkt an",
        success: {
          title: "Nachricht erfolgreich gesendet",
          message: "Vielen Dank für Ihre Nachricht. Wir werden uns so schnell wie möglich bei Ihnen melden.",
          newMessage: "Eine weitere Nachricht senden"
        },
        error: {
          title: "Nachricht nicht gesendet",
          message: "Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt per E-Mail."
        }
      }
    },
    partners: {
      title: "Unsere vertrauenswürdigen Partner"
    }
  },

  // Testimonials Section
  testimonials: {
    title: "WAS ABENTEURER SAGEN",
    subtitle: "Geschichten von denen, die das echte arktische Erlebnis erfahren haben",
    sectionTitle: "Erfahrungen",
    loadingText: "Bewertungen werden geladen...",
    errorText: "Bewertungen konnten nicht geladen werden",
    leaveReview: "Bewertung abgeben",
    testimonialsList: [
      {
        id: 1,
        text: "Triple X Adventures hat ein Erlebnis geliefert, das einfach unbeschreiblich ist. Die Schneemobilfahrt durch unberührte Wälder fühlte sich an, als würde man eine andere Welt betreten, und das Wissen unseres Guides Erik hat der Reise so viel Tiefe verliehen.",
        author: "Sarah J.",
        location: "London, UK",
        image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5
      },
      {
        id: 2,
        text: "Das Hundeschlittenabenteuer war unglaublich! Dies sind keine Touristenfabrikerlebnisse, sondern echte, authentische arktische Abenteuer. Das TXA-Chalet war auch erstaunlich – die Nordlichter von der Sauna aus zu beobachten war unvergesslich.",
        author: "Michael T.",
        location: "Berlin, Deutschland",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5
      },
      {
        id: 3,
        text: "Was Triple X auszeichnet, ist die persönliche Note. Wir haben anderswo Winteraktivitäten unternommen, aber hier fühlten wir uns wie Gäste und nicht wie Touristen. Das Essen bei JayJay's war ein Highlight – ich träume immer noch von diesem Rentiereintopf!",
        author: "Emma L.",
        location: "Sydney, Australien",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
        rating: 5
      }
    ]
  }
};
