import type { Payload } from 'payload'

/**
 * VCDS.de Seed Data — Vollständige Daten aus vcds.de
 * 
 * Ausführen: npm run seed
 * In package.json: "seed": "tsx src/seed/index.ts"
 */

export async function seed(payload: Payload): Promise<void> {
  console.log('🌱 VCDS.de Seed: Start...')

  // ════════════════════════════════════════
  // 1. TEAM MEMBERS
  // ════════════════════════════════════════
  console.log('  → Team-Mitglieder...')

  const teamMembers = [
    {
      name: 'Nils',
      role: 'VCDS Support',
      bio: 'Nils ist aus der VCDS Community zu unserem Team gestoßen. Sein Wissen in diesem Bereich hat er sich in vielen Jahren der VCDS Nutzung erarbeitet. Gerade bei den Themen Umbauten, Codierungen und Retrofit ist er der Ansprechpartner für eine Lösung.',
      motto: '„Man kann nicht alles aus dem 255 wissen!"',
      specialties: ['Codierungen', 'Retrofit', 'Umbauten'],
      sortOrder: 1,
      isActive: true,
      // photo: '/images/team/nils.webp' — upload separately
    },
    {
      name: 'Wolfgang',
      role: 'VCDS Support · KFZ-Meister',
      bio: 'Wenn Lehrbücher laufen und kommunizieren könnten, dann würde das Lehrbuch seinen Namen tragen. Kaum jemand in dieser Branche hat so viel Wissen und Sachverstand wie Wolfgang. Bevor ein Problem existiert, kennt Wolfgang meistens schon die Lösung.',
      motto: '„Es gibt kein schlechtes Wetter für Motorradfahren, nur falsche Ausstattung!"',
      specialties: ['Diagnose', 'KFZ-Technik', 'Problemlösung'],
      sortOrder: 2,
      isActive: true,
    },
    {
      name: 'Jürgen',
      role: 'VCDS Support · KFZ-Meister',
      bio: 'Jürgen hat sein ganzes Berufsleben der KFZ Branche gewidmet und über die Jahre ein unfassbar großes Wissen in diesem Bereich aufgebaut. Seine große Stärke ist es dieses Wissen anderen Menschen einfach und trotzdem umfangreich zu vermitteln. Neben dem Oszilloskop beherrscht er auch VCDS wie kaum ein anderer.',
      motto: '„Probleme sind wie dafür gemacht, dass mein Oszilloskop und ich tätig werden!"',
      specialties: ['Oszilloskop', 'VCDS', 'Wissensvermittlung'],
      sortOrder: 3,
      isActive: true,
    },
  ]

  for (const member of teamMembers) {
    await payload.create({ collection: 'team-members', data: member })
  }

  // ════════════════════════════════════════
  // 2. DEALERS (Fachhändler)
  // ════════════════════════════════════════
  console.log('  → Fachhändler...')

  const dealers = [
    {
      companyName: 'CCD Car Diagnostics',
      country: 'DE' as const,
      street: 'Herner Straße 299, Gebäude 29B',
      zipCode: '44809',
      city: 'Bochum',
      phone: '+49 (0) 234 58 545 800',
      shopUrl: 'https://car-diagnostics.eu',
      sortOrder: 1,
      isActive: true,
    },
    {
      companyName: 'Auto-Intern',
      country: 'DE' as const,
      street: 'Herner Straße 299, Gebäude 29B',
      zipCode: '44809',
      city: 'Bochum',
      phone: '+49 (0) 234 58 545 800',
      shopUrl: 'https://www.auto-intern.de/shop/',
      sortOrder: 2,
      isActive: true,
    },
    {
      companyName: 'SLSpeed',
      country: 'DE' as const,
      street: 'Eichenweg 10',
      zipCode: '34513',
      city: 'Waldeck',
      phone: '+49 5634 3583220',
      shopUrl: 'https://www.slspeed.de/de/',
      sortOrder: 3,
      isActive: true,
    },
    {
      companyName: 'KFZ-Verlag',
      country: 'DE' as const,
      street: 'Petershof 4–6',
      zipCode: '41334',
      city: 'Nettetal',
      phone: '02157 3025682',
      shopUrl: 'https://www.kfz-verlag.de/diagnosesysteme/c-442.html',
      sortOrder: 4,
      isActive: true,
    },
    {
      companyName: 'reichelt Elektronik',
      country: 'DE' as const,
      street: 'Elektronikring 1',
      zipCode: '26452',
      city: 'Sande',
      phone: '+49 4422 955-333',
      shopUrl: 'https://www.reichelt.de',
      sortOrder: 5,
      isActive: true,
    },
    {
      companyName: 'VCDS-Shop.at',
      country: 'AT' as const,
      street: 'Wirtschaftspark 22',
      zipCode: '8530',
      city: 'Deutschlandsberg',
      phone: '+43 676 3097413',
      shopUrl: 'https://www.vcds-shop.at',
      sortOrder: 6,
      isActive: true,
    },
    {
      companyName: 'Spezialwerkstatt Egger',
      country: 'AT' as const,
      shopUrl: 'https://www.spezialwerkzeug.at',
      sortOrder: 7,
      isActive: true,
    },
    {
      companyName: 'Wertec Werkstattbedarf',
      country: 'CH' as const,
      street: 'Hegnaustrasse 60',
      zipCode: 'CH-8602',
      city: 'Wangen',
      phone: '+41 44 880 74 33',
      shopUrl: 'https://www.wertec.ch/online-store/VCDS-VAG-Diagnose-c33978104',
      sortOrder: 8,
      isActive: true,
    },
    {
      companyName: 'Autotronic',
      country: 'CH' as const,
      shopUrl: 'https://www.autotronic-shop.ch/search/?q=vcds',
      sortOrder: 9,
      isActive: true,
    },
  ]

  for (const dealer of dealers) {
    await payload.create({ collection: 'dealers', data: dealer })
  }

  // ════════════════════════════════════════
  // 3. PRODUCTS
  // ════════════════════════════════════════
  console.log('  → Produkte...')

  const products = [
    {
      name: 'VCDS HEX-V2',
      slug: 'hex-v2',
      category: 'hex-v2' as const,
      price: 'ab 294 €',
      shopUrl: 'https://www.auto-intern.de/shop/diagnose-adapter/198/hex-v2-inkl.-vcds-lizenz',
      shortDescription: 'Der HEX-V2 ist die kostengünstige Variante der neuen Diagnosegeneration und der kleine Bruder des HEX-NET. Er bietet den gleichen Funktionsumfang, ist jedoch kabelgebunden.',
      highlights: [
        { text: 'Voller Funktionsumfang der VCDS-Diagnosesoftware' },
        { text: 'Mehrplatzfähig' },
        { text: 'Sicheres und stabiles Kunststoffgehäuse' },
        { text: 'Gut sichtbare Status-LEDs' },
        { text: 'Schnellster Auto-Scan aller Zeiten' },
        { text: 'Kostenloser Telefon-Support' },
        { text: 'Kostenloser Zugang zum VCDS-Forum' },
        { text: 'Kostenloser Zugang zum englischen VCDS-Wiki' },
      ],
      variants: [
        {
          name: '3 VIN – Hobby',
          description: 'Für die Familienflotte. Bis zu drei Fahrzeuge auslesen, codieren und diagnostizieren.',
          price: 'ab 294 €',
        },
        {
          name: '10 VIN – Enthusiast',
          description: 'Für den erfahrenen Hobbyschrauber. Bis zu zehn Fahrzeuge auslesen, codieren und diagnostizieren.',
          price: 'ab 364 €',
        },
        {
          name: 'Unlimited – Professional',
          description: 'Für Werkstätten und Service-Dienstleister. Unbegrenzt viele Fahrzeuge auslesen, codieren und diagnostizieren.',
          price: 'ab 594 €',
        },
      ],
      compatibility: 'Alle VW-Modelle bis 2025',
      connection: 'usb' as const,
      sortOrder: 1,
      isActive: true,
      // featuredImage: '/images/produkte/hex-v2/hex-v2-freigestellt.png'
    },
    {
      name: 'VCDS HEX-NET',
      slug: 'hex-net',
      category: 'hex-net' as const,
      price: 'ab 514 €',
      shopUrl: 'https://www.auto-intern.de/shop/diagnose-adapter/199/hex-net-wifi-inkl.-vcds-lizenz',
      shortDescription: 'Dank der WLAN-Technologie ist es ohne großen Aufwand möglich, den HEX-NET in das eigene Netzwerk einzubinden oder als eigenständigen Router zu konfigurieren. Ein MUST-HAVE in jeder professionellen Kfz-Werkstatt.',
      highlights: [
        { text: 'Alles, was der HEX-V2 kann, und ergänzend:' },
        { text: 'Verbesserte WLAN-Technologie für schnellere, kabelfreie Auto-Scans' },
        { text: 'Aufnahme von Messwerten während der Fahrt' },
        { text: 'Konfigurierbare LEDs zur besseren Sichtbarkeit während der Diagnose' },
        { text: 'USB-Steckerbuchse mit Schraubsicherung' },
      ],
      variants: [
        {
          name: '10 VIN – Enthusiast',
          description: 'Kabellos bis zu zehn Fahrzeuge auslesen, codieren und diagnostizieren.',
          price: 'ab 514 €',
        },
        {
          name: 'Unlimited – Professional',
          description: 'Kabellos unbegrenzt viele Fahrzeuge auslesen, codieren und diagnostizieren.',
          price: 'ab 794 €',
        },
      ],
      compatibility: 'Geeignet für neueste Fahrzeuge der Baujahre bis 2024 (größtenteils auch schon Modelljahr 2025)',
      connection: 'wifi-usb' as const,
      sortOrder: 2,
      isActive: true,
      // featuredImage: '/images/produkte/hex-net/hex-net-freigestellt.png'
    },
    {
      name: 'Diagnose-Adapter',
      slug: 'diagnose-adapter',
      category: 'adapter' as const,
      price: 'Variabel',
      shopUrl: 'https://auto-intern.de/shop/',
      shortDescription: 'Diverse Adapter zur Fahrzeugdiagnose mit VCDS-Software, robust gebaut, mit Funktionen wie Fehlercode-Auslesung und Messwertaufzeichnung.',
      sortOrder: 3,
      isActive: true,
    },
    {
      name: 'Diagnose-Komplettsysteme',
      slug: 'komplettsysteme',
      category: 'komplettsysteme' as const,
      price: 'Variabel',
      shopUrl: 'https://auto-intern.de/shop/',
      shortDescription: 'Komplettsets für professionelle Fahrzeugdiagnose, inklusive Adapter, Software und Zubehör, ideal für Werkstätten.',
      sortOrder: 4,
      isActive: true,
    },
    {
      name: 'Upgrades',
      slug: 'upgrades',
      category: 'upgrades' as const,
      price: 'Variabel',
      shopUrl: 'https://www.auto-intern.de/shop/upgrades-erweiterungsmodule/',
      shortDescription: 'Upgrades für ältere Adapter auf den neuesten Standard (z.B. HEX-V2), um auch neuere Fahrzeuge diagnostizieren zu können.',
      sortOrder: 5,
      isActive: true,
    },
    {
      name: 'Zubehör',
      slug: 'zubehoer',
      category: 'zubehoer' as const,
      price: 'Variabel',
      shopUrl: 'https://auto-intern.de/shop/',
      shortDescription: 'Ergänzendes Zubehör wie Adapterkabel, Transportkoffer und USB-Sticks mit Software.',
      sortOrder: 6,
      isActive: true,
    },
  ]

  for (const product of products) {
    await payload.create({ collection: 'products', data: product })
  }

  // ════════════════════════════════════════
  // 4. TESTIMONIALS
  // ════════════════════════════════════════
  console.log('  → Testimonials...')

  const testimonials = [
    {
      quote: 'Super Service, sehr netter Kontakt haben uns unheimlich geholfen! Kann man nur empfehlen!!',
      authorName: 'Verifizierter VCDS-Kunde',
      rating: 5,
      source: 'google' as const,
      sortOrder: 1,
      isActive: true,
    },
    {
      quote: 'Ich hatte gestern Mittag ein Problem mit meinem Interface. Ich hatte dann ein Ticket geschrieben und sofort einen Rückruf bekommen. Mir wurde schnelle Hilfe zugesagt, und das wurde auch umgesetzt. Gestern das Problem geschildert und keine 24h später hatte ich ein Leihgerät. Schneller geht\'s nicht. Absolut Top der Service.',
      authorName: 'Autohaus Nordost Berlin',
      company: 'Autohaus Nordost Berlin',
      rating: 5,
      source: 'google' as const,
      sortOrder: 2,
      isActive: true,
    },
    {
      quote: 'Bester Laden überhaupt. Die Mitarbeiter sind super drauf und haben von der Materie Ahnung. Support ist 1A - würde jeden empfehlen dort sein VCDS zu kaufen. Wenn was nicht klappt, erreicht man dort jemanden und einem wird weiter geholfen. Die Konkurrenz kann sich eine Scheibe abschneiden - weiter so!',
      authorName: 'Verifizierter VCDS-Kunde',
      rating: 5,
      source: 'google' as const,
      sortOrder: 3,
      isActive: true,
    },
  ]

  for (const testimonial of testimonials) {
    await payload.create({ collection: 'testimonials', data: testimonial })
  }

  // ════════════════════════════════════════
  // 5. DOWNLOADS
  // ════════════════════════════════════════
  console.log('  → Downloads...')

  const downloads = [
    {
      title: 'VCDS DRV (DE)',
      category: 'vcds' as const,
      version: '25.3.2',
      dataDate: '29.01.2026',
      downloadUrl: 'https://download.ross-tech.de/drv',
      changelogUrl: 'https://vcds.de/changelog/',
      compatibleAdapters: ['Auto-Intern Multiscan', 'HEX+CAN', 'Uni-CAN', 'Micro-CAN', 'HEX-V2', 'HEX-NET'],
      sortOrder: 1,
      isActive: true,
    },
    {
      title: 'VCDS (EN)',
      category: 'vcds' as const,
      version: '25.3.2',
      dataDate: '20.10.2025',
      downloadUrl: 'https://www.ross-tech.com/vcds/download/current.php',
      compatibleAdapters: ['Auto-Intern Multiscan', 'HEX+CAN', 'Uni-CAN', 'Micro-CAN', 'HEX-V2', 'HEX-NET'],
      sortOrder: 2,
      isActive: true,
    },
    {
      title: 'VCDS Beta (EN)',
      category: 'vcds' as const,
      downloadUrl: 'https://www.ross-tech.com/vcds/download/beta/current.php',
      compatibleAdapters: ['HEX-V2', 'HEX-NET'],
      notice: 'Der Adapter muss für die Nutzung in VCI-Konfig auf den Beta-Kanal umgestellt werden.',
      sortOrder: 3,
      isActive: true,
    },
    {
      title: 'VCDS Label Update',
      category: 'vcds' as const,
      version: '25.3.2',
      dataDate: '29.01.2026',
      downloadUrl: 'https://ross-tech.de/downloads/upd',
      notice: 'Dieses Update sollte nur auf Anweisung des Support erfolgen.',
      sortOrder: 4,
      isActive: true,
    },
    {
      title: 'VCDS Mobile Assistant (Play Store)',
      category: 'vcds' as const,
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.ross_tech.vcds_mobile_assistant&hl=de',
      requirements: 'Android 4.1+, nur mit HEX-NET',
      sortOrder: 5,
      isActive: true,
    },
    {
      title: 'VCDS Mobile Assistant (APK)',
      category: 'vcds' as const,
      downloadUrl: 'https://www.vcds.de/downloads/VCDS-MobileAssistant.apk',
      requirements: 'Android 4.1+, nur mit HEX-NET',
      sortOrder: 6,
      isActive: true,
    },
    {
      title: 'Fernwartung (AnyDesk)',
      category: 'support' as const,
      downloadUrl: 'https://www.vcds.de/wp-content/uploads/2024/08/AnyDesk_VCDSde_Client.zip',
      sortOrder: 7,
      isActive: true,
    },
    {
      title: 'USB Treiber (Auto-Intern Multiscan)',
      category: 'multiscan' as const,
      downloadUrl: 'https://www.vcds.de/wp-content/uploads/2024/08/usb-driver.zip',
      notice: 'NICHT mit Windows 11 kompatibel!',
      sortOrder: 8,
      isActive: true,
    },
    {
      title: 'VCDServiceReset',
      category: 'tools' as const,
      version: '1.1',
      downloadUrl: 'https://www.vcds.de/wp-content/uploads/2024/08/VCDServiceResetV1.1.zip',
      sortOrder: 9,
      isActive: true,
    },
    {
      title: 'CodingCompare',
      category: 'tools' as const,
      version: '2.3.0',
      downloadUrl: 'https://www.vcds.de/wp-content/uploads/2024/08/CodingCompareV2.3.0.zip',
      sortOrder: 10,
      isActive: true,
    },
    {
      title: 'VCDScripter',
      category: 'tools' as const,
      version: '1.8.0',
      downloadUrl: 'https://www.vcds.de/wp-content/uploads/2024/08/VCDScripter_V1.8.0.zip',
      sortOrder: 11,
      isActive: true,
    },
  ]

  for (const download of downloads) {
    await payload.create({ collection: 'downloads', data: download })
  }

  // ════════════════════════════════════════
  // 6. FAQ (Auswahl — die wichtigsten pro Teil)
  // ════════════════════════════════════════
  console.log('  → FAQ-Einträge...')

  const faqs = [
    // Teil 1 — Allgemein
    { question: 'Für welche Fahrzeugmarken ist VCDS geeignet?', category: 'teil-1-allgemein' as const, sortOrder: 1 },
    { question: 'Welche Folgekosten habe ich nach dem Kauf?', category: 'teil-1-allgemein' as const, sortOrder: 2 },
    { question: 'Kann ich VCDS auf meinem Mac Computer nutzen?', category: 'teil-1-allgemein' as const, sortOrder: 3 },
    { question: 'Wird mein Fahrzeug von VCDS unterstützt?', category: 'teil-1-allgemein' as const, sortOrder: 4 },
    { question: 'Wie bekomme ich Hilfe bei Fragen oder Problemen?', category: 'teil-1-allgemein' as const, sortOrder: 5 },
    { question: 'Unterstützt VCDS auch mein Elektrofahrzeug?', category: 'teil-1-allgemein' as const, sortOrder: 6 },
    { question: 'Wie ist VCDS beim Thema SFD aufgestellt?', category: 'teil-1-allgemein' as const, sortOrder: 7 },
    // Teil 2
    { question: 'Wird VCDS mit meinem Auto funktionieren?', category: 'teil-2-kompatibilitaet' as const, sortOrder: 1 },
    { question: 'Wird VCDS auch funktionieren, wenn mein Auto „gechippt" ist?', category: 'teil-2-kompatibilitaet' as const, sortOrder: 2 },
    { question: 'Welche Mindestanforderungen hat VCDS?', category: 'teil-2-kompatibilitaet' as const, sortOrder: 3 },
    { question: 'Wird es eine Mac- oder Linux-Version geben?', category: 'teil-2-kompatibilitaet' as const, sortOrder: 4 },
    { question: 'Was ist der Unterschied zwischen VCDS und einem OBD-II-Scan-Tool?', category: 'teil-2-kompatibilitaet' as const, sortOrder: 5 },
    { question: 'Kann ich mit VCDS meinen elektronischen Kilometerzähler zurücksetzen?', category: 'teil-2-kompatibilitaet' as const, sortOrder: 6 },
    { question: 'Welche Windows-Versionen unterstützt VCDS?', category: 'teil-2-kompatibilitaet' as const, sortOrder: 7 },
    // Teil 3
    { question: 'Wie registriere/aktiviere ich meine Software?', category: 'teil-3-registrierung' as const, sortOrder: 1 },
    { question: 'Ist Produktsupport im Preis inbegriffen?', category: 'teil-3-registrierung' as const, sortOrder: 2 },
    { question: 'Warum kann VCDS überhaupt nicht kommunizieren?', category: 'teil-3-registrierung' as const, sortOrder: 3 },
    // Teil 4
    { question: 'Kann ich VCDS während der Fahrt verwenden?', category: 'teil-4-nutzung' as const, sortOrder: 1 },
    { question: 'Wie aktualisiere ich meine bestehende VCDS-Software?', category: 'teil-4-nutzung' as const, sortOrder: 2 },
    // Teil 5 — HEX-NET
    { question: 'Was ist ein HEX-NET?', category: 'teil-5-hexnet' as const, sortOrder: 1 },
    { question: 'Was ist der Unterschied zwischen der Personal- und der Unlimited-Version?', category: 'teil-5-hexnet' as const, sortOrder: 2 },
    { question: 'Was bedeuten die 3 LEDs auf dem HEX-NET?', category: 'teil-5-hexnet' as const, sortOrder: 3 },
    { question: 'Wie konfiguriere ich das WiFi?', category: 'teil-5-hexnet' as const, sortOrder: 4 },
    { question: 'Kann ich das HEX-NET dauerhaft in meinem Auto lassen?', category: 'teil-5-hexnet' as const, sortOrder: 5 },
  ]

  for (const faq of faqs) {
    await payload.create({
      collection: 'faqs',
      data: {
        ...faq,
        // Rich-text answer placeholder — full answers from content extract to be added
        answer: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: `[Antwort aus vcds.de/faq übernehmen — Frage: "${faq.question}"]` }],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
        status: 'published',
      },
    })
  }

  // ════════════════════════════════════════
  // 7. BLOG POSTS (Stubs mit Metadaten)
  // ════════════════════════════════════════
  console.log('  → Blog-Posts...')

  const posts = [
    {
      title: 'VCDS Crack Download Deutsch',
      slug: 'warum-kein-vcds-crack',
      category: 'beratung' as const,
      status: 'published' as const,
      publishedAt: '2025-10-27T00:00:00.000Z',
      excerpt: 'VCDS Cracks in Deutschland? Kann das legal sein? Nein? Ist es denn wenigstens risikoarm für die Nutzer? Auch nicht.',
      tags: ['VCDS', 'Crack', 'Sicherheit', 'Fälschungen'],
    },
    {
      title: 'HEX-V2 vs. HEX-NET – Die Qual der Wahl!',
      slug: 'qual-der-wahl-vcds',
      category: 'beratung' as const,
      status: 'published' as const,
      publishedAt: '2025-05-22T00:00:00.000Z',
      excerpt: 'Was findest du wichtiger? Ein kabelloses System oder ist doch der Preis ausschlaggebend?',
      tags: ['HEX-V2', 'HEX-NET', 'Kaufberatung', 'Vergleich'],
    },
    {
      title: 'FIN-Verbrauch bei VCDS – Komplette Liste der Funktionen & Tipps',
      slug: 'fin-verbrauch-bei-vcds',
      category: 'beratung' as const,
      status: 'published' as const,
      publishedAt: '2025-04-04T00:00:00.000Z',
      excerpt: 'Erfahre, welche Funktionen eine FIN verbrauchen und wie du dein Interface optimal nutzt.',
      tags: ['FIN', 'Lizenz', 'Funktionen', 'Tipps'],
    },
    {
      title: 'Fragen zum Kauf? – Welches VCDS Gerät ist das richtige für mich?',
      slug: 'welches-vcds-kaufen',
      category: 'beratung' as const,
      status: 'published' as const,
      publishedAt: '2025-02-05T00:00:00.000Z',
      excerpt: 'Welches VCDS Gerät ist passend? Erfahre das Wesentliche, um eine solide Kaufentscheidung treffen zu können.',
      tags: ['Kaufberatung', 'HEX-V2', 'HEX-NET', 'SFD'],
    },
    {
      title: 'Eine gute Wahl für Diagnosearbeiten bei VW, Audi & Co.',
      slug: 'gute-wahl-vcds',
      category: 'beratung' as const,
      status: 'published' as const,
      publishedAt: '2025-01-31T00:00:00.000Z',
      excerpt: 'VCDS hat die Fahrzeugdiagnose-Landschaft nachhaltig verändert. Erfahre, wie VCDS funktioniert und welche Vorteile es bietet.',
      tags: ['VCDS', 'Diagnose', 'VW', 'Audi'],
    },
    {
      title: 'Zugriffsberechtigungscodes – PDF notwendig für VCDS?',
      slug: 'zugriffsberechtigungscodes-was-man-wissen-sollte',
      category: 'beratung' as const,
      status: 'published' as const,
      publishedAt: '2024-10-21T00:00:00.000Z',
      excerpt: 'Zugriffsberechtigungscodes sind ein zentraler Bestandteil der Arbeit mit VCDS. Viele Missverständnisse führen oft zu Verwirrung.',
      tags: ['Zugriffsberechtigungscodes', 'PDF', 'Codierung'],
    },
    {
      title: 'Update 25.3.1 – Datenstand: 22.04.2025',
      slug: 'update-25-3-1',
      category: 'versionshistorie' as const,
      status: 'published' as const,
      publishedAt: '2025-04-23T00:00:00.000Z',
      excerpt: 'Neues VCDS-Update: HEX-NET v3 Support, Modelljahr 2025+ (R-Mode), überarbeitete Druckfunktion.',
      tags: ['Update', 'Changelog', 'HEX-NET v3'],
    },
    {
      title: 'Vorsicht vor gefälschten VCDS-Interfaces',
      slug: 'vorsicht-vor-gefaelschten-vcds-interfaces',
      category: 'beratung' as const,
      status: 'published' as const,
      publishedAt: '2025-01-17T00:00:00.000Z',
      excerpt: 'Clone-Produkte täuschen mit niedrigeren Preisen, verursachen jedoch häufig fehlerhafte Diagnosen und können Steuergeräte beschädigen.',
      tags: ['Fälschungen', 'Clone', 'Sicherheit', 'Original'],
    },
  ]

  for (const post of posts) {
    await payload.create({
      collection: 'posts',
      data: {
        ...post,
        content: {
          root: {
            type: 'root',
            children: [
              {
                type: 'paragraph',
                children: [{ type: 'text', text: `[Blog-Inhalt aus vcds.de übernehmen — Artikel: "${post.title}"]` }],
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
          },
        },
      },
    })
  }

  // ════════════════════════════════════════
  // 8. PAGES (Stubs für alle Hauptseiten)
  // ════════════════════════════════════════
  console.log('  → Seiten...')

  const pages = [
    {
      title: 'Startseite',
      slug: 'startseite',
      template: 'homepage' as const,
      status: 'published' as const,
      heroHeadline: 'VCDS.de – Ihr Partner für schnelle Fahrzeugdiagnose',
      heroSubtext: 'Passenden Diagnoseadapter von VCDS bestellen, oder informieren Sie sich erst einmal über HEX-V2, HEX-NET & FINs. Profitieren Sie vom erstklassigen technischen Support und angenehmer Beratung per Chat, E-Mail und Telefon.',
      seo: {
        metaTitle: 'VCDS – Das Diagnosegerät für schnelle Fehleranalysen und Codierungen | HEX-V2 & HEX-NET',
        metaDescription: 'VCDS Diagnoseadapter von Ross-Tech für VW, Audi, Skoda, Seat. HEX-V2 ab 294€, HEX-NET ab 514€. Erstklassiger Support aus Bochum.',
      },
    },
    {
      title: 'Über VCDS',
      slug: 'ueber-vcds',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'Über VCDS – Funktionen, Vorteile & Lizenzmodelle',
        metaDescription: 'VCDS von Ross-Tech: 32.445 Fehlercodes, Auto-Scan, Codierung für VW, Audi, Skoda, Seat. Made in Germany. Kostenloser Support.',
      },
    },
    {
      title: 'Produktübersicht',
      slug: 'produkte',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS Produkte – HEX-V2, HEX-NET, Adapter & Zubehör',
        metaDescription: 'Alle VCDS Diagnoseadapter im Überblick. HEX-V2 ab 294€, HEX-NET ab 514€. Komplettsysteme, Upgrades und Zubehör.',
      },
    },
    {
      title: 'Download – VCDS Software',
      slug: 'download',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS Software Download – Aktuelle Version & Tools',
        metaDescription: 'VCDS Software kostenlos herunterladen. Aktuelle Version DRV 25.3.2. Tools: VCDServiceReset, CodingCompare, VCDScripter.',
      },
    },
    {
      title: 'FAQ – Häufig gestellte Fragen',
      slug: 'faq',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS FAQ – Häufig gestellte Fragen zu VCDS, HEX-V2 & HEX-NET',
        metaDescription: 'Antworten auf die häufigsten Fragen zu VCDS. Kompatibilität, Installation, Funktionen, HEX-NET WiFi-Setup und mehr.',
      },
    },
    {
      title: 'Kontakt',
      slug: 'kontakt',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'Kontakt – VCDS Support von Auto-Intern GmbH',
        metaDescription: 'VCDS Support: Mo-Fr 9-16 Uhr. Tel: +49 234 58 545 800. KFZ-Meister beraten Sie zu VCDS, Codierungen und Diagnose.',
      },
    },
    {
      title: 'Quickstart und Registrierung',
      slug: 'quickstart',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS Quickstart – Installation & Registrierung Schritt für Schritt',
        metaDescription: 'VCDS installieren und registrieren in 17 Schritten. Bebilderte Anleitung für HEX-V2 und HEX-NET.',
      },
    },
    {
      title: 'VCDS Fachhändler',
      slug: 'fachhaendler',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS Fachhändler – Autorisierte Händler in DE, AT & CH',
        metaDescription: 'Offizielle VCDS Fachhändler in Deutschland, Österreich und der Schweiz. Kaufen Sie nur bei autorisierten Händlern.',
      },
    },
    {
      title: 'VCDS Upgrades',
      slug: 'upgrade',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS Upgrade – HEX-V2 & HEX-NET FIN-Erweiterung',
        metaDescription: 'VCDS Interface upgraden: 3→10 FIN, 10→Unlimited, Hardware-Upgrade. Meist innerhalb von 24h bearbeitet.',
      },
    },
    {
      title: 'Kaufberatung – Welches VCDS ist das richtige?',
      slug: 'kaufberatung',
      template: 'info' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS Kaufberatung 2025 – HEX-V2 vs HEX-NET, Preise & Empfehlung',
        metaDescription: 'Welches VCDS Interface passt? HEX-V2 ab 294€ für Hobby, HEX-NET ab 514€ für Werkstätten. Vergleich, SFD-Status & Tipps.',
      },
    },
    {
      title: 'Fernwartung',
      slug: 'fernwartung',
      template: 'info' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS Fernwartung – Remote Support via AnyDesk',
        metaDescription: 'VCDS Fernwartung: AnyDesk-Tool herunterladen, ID mitteilen, Support-Mitarbeiter hilft direkt auf Ihrem Bildschirm.',
      },
    },
    { title: 'Impressum', slug: 'impressum', template: 'info' as const, status: 'published' as const },
    { title: 'Datenschutzerklärung', slug: 'datenschutz', template: 'info' as const, status: 'published' as const },
    {
      title: 'AHK Codieren – Anhängerkupplung freischalten',
      slug: 'ahk-codieren',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'AHK Codieren – Anhängerkupplung freischalten mit VCDS',
        metaDescription: 'Übersicht aller Anleitungen zur Codierung einer nachgerüsteten Anhängerkupplung (AHK) mit VCDS — sortiert nach Fahrzeugplattform.',
      },
    },
    {
      title: 'VCDS User Map',
      slug: 'usermap',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS User Map – Nutzer & Werkstätten in Ihrer Nähe',
        metaDescription: 'Die VCDS.de User Map vernetzt Werkstätten, Diagnosetechniker und VCDS-Nutzer. Finden Sie Hilfe in Ihrer Nähe.',
      },
    },
    {
      title: 'Troubleshooting – Fehlerbehebung',
      slug: 'troubleshooting',
      template: 'default' as const,
      status: 'published' as const,
      seo: {
        metaTitle: 'VCDS Troubleshooting – Lösungen für häufige Probleme',
        metaDescription: 'VCDS Troubleshooting: Lösungen für Verbindungsprobleme, Registrierung, Treiber-Installation und häufige Fehlermeldungen.',
      },
    },
  ]

  for (const page of pages) {
    await payload.create({ collection: 'pages', data: { ...page, showBreadcrumb: page.slug !== 'startseite' } })
  }

  // ════════════════════════════════════════
  // 9. NAVIGATION (Global)
  // ════════════════════════════════════════
  console.log('  → Navigation...')

  await payload.updateGlobal({
    slug: 'navigation',
    data: {
      mainNav: [
        {
          label: 'Start',
          href: '/',
          children: [
            { label: 'VCDS Fachhändler', href: '/fachhaendler' },
            { label: 'VCDS User Map', href: '/usermap' },
            { label: 'Registrierung', href: '/quickstart' },
            { label: 'AHK Codieren', href: '/ahk-codieren' },
            { label: 'Wiki', href: 'https://wiki.vcds.de/de/home', isExternal: true },
            { label: 'Forum', href: 'https://forum.vcds.de/', isExternal: true },
            { label: 'VCDS Blog', href: '/blog' },
          ],
        },
        {
          label: 'Produkte',
          href: '/produkte',
          children: [
            { label: 'Über VCDS', href: '/ueber-vcds' },
            { label: 'Übersicht', href: '/produkte' },
            { label: 'Upgrade', href: '/upgrade' },
          ],
        },
        {
          label: 'Kontakt',
          href: '/kontakt',
          children: [
            { label: 'Kontaktformular', href: '/kontakt' },
          ],
        },
        {
          label: 'Start & Hilfe',
          href: '/faq',
          children: [
            { label: 'Fernwartung', href: '/fernwartung' },
            { label: 'Troubleshooting', href: '/troubleshooting' },
            { label: 'Quickstart', href: '/quickstart' },
            { label: 'FAQ', href: '/faq' },
          ],
        },
        {
          label: 'Download – VCDS Software',
          href: '/download',
        },
      ],
      footerNav: [
        { label: 'Impressum', href: '/impressum' },
        { label: 'Datenschutz', href: '/datenschutz' },
        { label: 'Kontakt', href: '/kontakt' },
        { label: 'Forum', href: 'https://forum.vcds.de/', isExternal: true },
        { label: 'Wiki', href: 'https://wiki.vcds.de/', isExternal: true },
      ],
    },
  })

  // ════════════════════════════════════════
  // 10. SITE SETTINGS (Global)
  // ════════════════════════════════════════
  console.log('  → Site-Settings...')

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      company: {
        name: 'Auto-Intern GmbH',
        street: 'Herner Straße 299, Gebäude 29B',
        zipCode: '44809',
        city: 'Bochum',
        country: 'Deutschland',
        phone: '+49 (0) 234 58 545 800',
        email: 'support@vcds.de',
        emailSales: 'info@vcds.de',
      },
      hours: {
        weekdays: 'Mo–Fr: 09:00 – 16:00 Uhr',
        note: 'Bei Supportanfragen bitte vor dem Anruf einen Auto-Scan per Mail schicken!',
      },
      social: {
        facebook: 'https://www.facebook.com/VCDS.de/',
        facebookGroup: 'https://www.facebook.com/groups/557864484381349',
        telegram: 'https://dechat.vcds.de/',
        youtube: 'https://www.youtube.com/@vcdsde7922',
      },
      external: {
        shopUrl: 'https://auto-intern.de/shop/',
        forumUrl: 'https://forum.vcds.de/',
        wikiUrl: 'https://wiki.vcds.de/de/home',
      },
      seoGlobal: {
        siteName: 'VCDS.de',
        titleSuffix: ' | VCDS.de',
        defaultDescription: 'VCDS Diagnoseadapter von Ross-Tech für VW, Audi, Skoda, Seat. Erstklassiger Support aus Bochum.',
      },
    },
  })

  console.log('✅ VCDS.de Seed: Fertig!')
  console.log('   → 3 Team-Mitglieder')
  console.log('   → 9 Fachhändler')
  console.log('   → 6 Produkte')
  console.log('   → 3 Testimonials')
  console.log('   → 11 Downloads')
  console.log(`   → ${faqs.length} FAQ-Einträge`)
  console.log(`   → ${posts.length} Blog-Posts`)
  console.log(`   → ${pages.length} Seiten`)
  console.log('   → Navigation (Haupt + Footer)')
  console.log('   → Site-Settings')

  // ════════════════════════════════════════
  // THEME SETTINGS (Defaults)
  // ════════════════════════════════════════
  console.log('  → Theme-Settings...')
  await payload.updateGlobal({
    slug: 'theme-settings',
    data: {
      colors: {
        primaryColor: '#2563eb',
        accentColor: '#dc2626',
        textColor: '#0f172a',
        backgroundColor: '#ffffff',
      },
      // PERF-08: Typography is fixed to Quicksand (VCDS corporate font).
      // The `typography` group was removed from ThemeSettings in 70a751a.
      layout: {
        buttonRadius: 'md',
        sectionSpacing: 'default',
      },
    },
  })
  console.log('   → Theme-Settings (Defaults)')
}
