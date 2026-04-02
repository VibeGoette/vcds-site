export const sections = [
  {
    id: 'registrierung',
    title: 'Registrierung & Aktivierung',
    icon: 'shield',
    problems: [
      { q: 'Ich habe keine Bestätigungsmail erhalten', a: 'Nach dem Absenden des Registrierungsformulars in VCDS kann es bis zu 20 Minuten dauern. Prüfen Sie auch Ihren Spam-Ordner. Falls nach 30 Minuten keine Mail angekommen ist, kontaktieren Sie unseren Support.' },
      { q: 'VCDS zeigt "Nicht registriert" an', a: 'Stellen Sie sicher, dass Ihr Interface am USB-Port angeschlossen und mit dem Fahrzeug verbunden ist. Die Registrierung wird erst nach einem erfolgreichen Verbindungstest auf dem Fahrzeug abgeschlossen.' },
      { q: 'Transaktions-ID kommt nicht', a: 'In den meisten Fällen kommt die Transaktions-ID innerhalb von 15 Minuten. Manchmal wird die Registrierung manuell seitens Ross-Tech geprüft — Sie erhalten dann eine entsprechende Info-Mail.' },
    ],
  },
  {
    id: 'verbindung',
    title: 'Verbindungsprobleme',
    icon: 'plug',
    problems: [
      { q: 'VCDS findet kein Interface', a: 'Prüfen Sie: 1) USB-Kabel richtig eingesteckt, 2) Treiber korrekt installiert (Geräte-Manager → „Ross-Tech USB Interface"), 3) Anderer USB-Port probieren. Vermeiden Sie USB-Hubs.' },
      { q: 'Verbindung zum Steuergerät schlägt fehl', a: 'Stellen Sie sicher, dass die Zündung eingeschaltet ist (nicht nur Standlicht). Prüfen Sie den OBD-Stecker auf festen Sitz. Bei älteren Fahrzeugen kann ein direkter Anschluss an die Batterie helfen.' },
      { q: 'HEX-NET wird im WLAN nicht gefunden', a: 'Das HEX-NET eröffnet ein eigenes WLAN-Netzwerk. Verbinden Sie sich direkt mit dem Netzwerk „HEX-NET-..." auf Ihrem Laptop. Prüfen Sie, ob die blaue WLAN-LED am Interface blinkt.' },
    ],
  },
  {
    id: 'installation',
    title: 'Installation & Treiber',
    icon: 'download',
    problems: [
      { q: 'Treiber-Installation schlägt unter Windows 11 fehl', a: 'Laden Sie den aktuellen USB-Treiber von unserer Download-Seite herunter. Führen Sie die Installation als Administrator aus (Rechtsklick → „Als Administrator ausführen").' },
      { q: 'VCDS startet nicht nach dem Update', a: 'Deinstallieren Sie die alte Version vollständig, starten Sie den PC neu und installieren Sie die neueste Version von unserer Download-Seite.' },
      { q: 'Windows Defender blockiert VCDS', a: 'VCDS ist signierte Software. Falls Windows Defender oder ein Virenscanner die Installation blockiert, fügen Sie eine Ausnahme für den VCDS-Ordner hinzu (Standard: C:\\Ross-Tech\\VCDS).' },
    ],
  },
  {
    id: 'allgemein',
    title: 'Allgemeine Fehler',
    icon: 'search',
    problems: [
      { q: 'Fehlermeldung: "Can\'t Synch to controller"', a: 'Diese Meldung deutet auf ein Kommunikationsproblem hin. Prüfen Sie den OBD-Stecker, die Zündung und versuchen Sie es erneut. Bei anhaltenden Problemen nutzen Sie unsere Fernwartung.' },
      { q: 'Auto-Scan bricht ab', a: 'Ein Abbruch kann durch instabile Stromversorgung verursacht werden. Schließen Sie ggf. ein Ladegerät an die Fahrzeugbatterie an. Stellen Sie sicher, dass keine Verbraucher (Licht, Radio) aktiv sind.' },
      { q: 'Codierung wird nicht übernommen', a: 'Manche Steuergeräte erfordern einen Zugriffsberechtigungscode. Prüfen Sie, ob VCDS nach einem Code fragt. Nicht jede Codierung ist bei jedem Fahrzeug freigeschaltet — im Zweifel im Wiki nachschlagen.' },
    ],
  },
]
