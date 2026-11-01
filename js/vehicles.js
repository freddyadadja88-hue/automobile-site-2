// ================================
// LISTE DES VÉHICULES
// ⚠️ TOUS CES VÉHICULES SONT FICTIFS
// (démonstration). À remplacer par
// les vrais véhicules de l'agence.
// ================================
window.VEHICLES = [
  {
    id: 1, demo: true,
    marque: "Toyota", modele: "Corolla",
    annee: 2018, prix: 7500000, km: 82000,
    carburant: "Essence", transmission: "Automatique",
    localisation: "Cotonou", statut: "disponible",
    populaire: true,
    photos: ["assets/images/vehicules/corolla-1.jpg"],
    description: "Berline fiable et économique, idéale pour la ville comme pour la route. Exemple fictif.",
    caracteristiques: { Moteur: "1.8 L", Puissance: "140 ch", Couleur: "Gris", Portes: "4", Places: "5" },
    equipements: ["Climatisation", "Bluetooth", "Caméra de recul", "Vitres électriques"],
    etat: "Très bon état"
  },
  {
    id: 2, demo: true,
    marque: "Hyundai", modele: "Tucson",
    annee: 2020, prix: 14500000, km: 45000,
    carburant: "Diesel", transmission: "Automatique",
    localisation: "Cotonou", statut: "disponible",
    populaire: true,
    photos: ["assets/images/vehicules/tucson-1.jpg"],
    description: "SUV confortable et spacieux. Exemple fictif.",
    caracteristiques: { Moteur: "2.0 L", Puissance: "185 ch", Couleur: "Noir", Portes: "5", Places: "5" },
    equipements: ["Climatisation", "Écran tactile", "GPS", "Sièges en cuir"],
    etat: "Excellent état"
  },
  {
    id: 3, demo: true,
    marque: "Mercedes-Benz", modele: "C220",
    annee: 2017, prix: 12000000, km: 98000,
    carburant: "Diesel", transmission: "Automatique",
    localisation: "Porto-Novo", statut: "disponible",
    populaire: true,
    photos: ["assets/images/vehicules/c220-1.jpg"],
    description: "Berline premium élégante. Exemple fictif.",
    caracteristiques: { Moteur: "2.1 L", Puissance: "170 ch", Couleur: "Blanc", Portes: "4", Places: "5" },
    equipements: ["Climatisation automatique", "Sièges en cuir", "Toit ouvrant", "Bluetooth"],
    etat: "Bon état"
  },
  {
    id: 4, demo: true,
    marque: "Kia", modele: "Picanto",
    annee: 2019, prix: 4800000, km: 60000,
    carburant: "Essence", transmission: "Manuelle",
    localisation: "Calavi", statut: "disponible",
    populaire: false,
    photos: ["assets/images/vehicules/picanto-1.jpg"],
    description: "Citadine économique, parfaite pour la ville. Exemple fictif.",
    caracteristiques: { Moteur: "1.0 L", Puissance: "67 ch", Couleur: "Rouge", Portes: "5", Places: "5" },
    equipements: ["Climatisation", "Radio USB", "Vitres électriques"],
    etat: "Bon état"
  },
  {
    id: 5, demo: true,
    marque: "Toyota", modele: "Hilux",
    annee: 2016, prix: 11000000, km: 120000,
    carburant: "Diesel", transmission: "Manuelle",
    localisation: "Parakou", statut: "vendu",
    populaire: false,
    photos: ["assets/images/vehicules/hilux-1.jpg"],
    description: "Pick-up robuste, 4x4. Exemple fictif.",
    caracteristiques: { Moteur: "2.5 L", Puissance: "144 ch", Couleur: "Blanc", Portes: "4", Places: "5" },
    equipements: ["4x4", "Climatisation", "Barres de toit"],
    etat: "Bon état"
  },
  {
    id: 6, demo: true,
    marque: "Honda", modele: "CR-V",
    annee: 2015, prix: 8200000, km: 110000,
    carburant: "Essence", transmission: "Automatique",
    localisation: "Cotonou", statut: "disponible",
    populaire: false,
    photos: ["assets/images/vehicules/crv-1.jpg"],
    description: "SUV familial polyvalent. Exemple fictif.",
    caracteristiques: { Moteur: "2.4 L", Puissance: "185 ch", Couleur: "Bleu", Portes: "5", Places: "5" },
    equipements: ["Climatisation", "Caméra de recul", "Bluetooth"],
    etat: "Bon état"
  }
];
