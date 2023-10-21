# g = """
# {
#     "product": {
#         "A1": {
#             "name": "Margherita",
#             "price": {
#                 "24cm": "5,00",
#                 "28cm": "6,00",
#                 "38cm": "12,50"
#             },
#             "desO": "Tomatensoße mit Käse",
#             "desT": "",
#             "zusatz": "A,G,1,2",
#             "section": "ANGEBOTE"
#         },
#         "1": {
#             "name": "Margherita",
#             "price": {
#                 "24cm": "5,00",
#                 "28cm": "6,00",
#                 "38cm": "12,50"
#             },
#             "desO": "Tomatensoße mit Käse",
#             "desT": "",
#             "zusatz": "A,G,1,2",
#             "section": "PIZZEN"
#         },
#         "2": {
#             "name": "Prosciutto",
#             "price": {
#                 "24cm": "5,50",
#                 "28cm": "7,00",
#                 "38cm": "14,00"
#             },
#             "desO": "Formfleischvorderschinken",
#             "desT": "",
#             "zusatz": "A,G,3,4,5",
#             "section": "PIZZEN"
#         },
#         "3": {
#             "name": "Salami",
#             "price": {
#                 "24cm": "5,50",
#                 "28cm": "7,00",
#                 "38cm": "14,00"
#             },
#             "desO": "Salami",
#             "desT": "",
#             "zusatz": "A,G,1,2,4,9",
#             "section": "PIZZEN"
#         },
#         "4": {
#             "name": "Cipolla",
#             "price": {
#                 "24cm": "5,50",
#                 "28cm": "7,00",
#                 "38cm": "13,50"
#             },
#             "desO": "mit Zwiebeln",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "5": {
#             "name": "Spinaci",
#             "price": {
#                 "24cm": "5,50",
#                 "28cm": "7,00",
#                 "38cm": "14,00"
#             },
#             "desO": "mit Spinat",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "6": {
#             "name": "Funghi",
#             "price": {
#                 "24cm": "5,50",
#                 "28cm": "7,00",
#                 "38cm": "14,00"
#             },
#             "desO": "mit Champignons",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "7": {
#             "name": "Broccoli",
#             "price": {
#                 "24cm": "5,50",
#                 "28cm": "7,00",
#                 "38cm": "14,00"
#             },
#             "desO": "mit Broccoli",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "8": {
#             "name": "Tonno",
#             "price": {
#                 "24cm": "6,50",
#                 "28cm": "7,50",
#                 "38cm": "16,00"
#             },
#             "desO": "mit Thunfisch",
#             "desT": "",
#             "zusatz": "A,G,F",
#             "section": "PIZZEN"
#         },
#         "9": {
#             "name": "Tonno Spezial",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "mit Thunfisch & Zwiebeln",
#             "desT": "",
#             "zusatz": "A,G,F",
#             "section": "PIZZEN"
#         },
#         "10": {
#             "name": "Napoli",
#             "price": {
#                 "24cm": "6,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "mit Sardellen,Oliven & Knoblauch",
#             "desT": "",
#             "zusatz": "A,G,F,9",
#             "section": "PIZZEN"
#         },
#         "11": {
#             "name": "Prosciutto Funghi",
#             "price": {
#                 "24cm": "6,00",
#                 "28cm": "7,50",
#                 "38cm": "15,40"
#             },
#             "desO": "mit Formfleischvorderschinken, Champignons",
#             "desT": "",
#             "zusatz": "A,G,3,4,5",
#             "section": "PIZZEN"
#         },
#         "12": {
#             "name": "Bacon",
#             "price": {
#                 "24cm": "6,50",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Bacon, Zweibeln",
#             "desT": "",
#             "zusatz": "A,G,1,2",
#             "section": "PIZZEN"
#         },
#         "13": {
#             "name": "Tonno Paprika",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Thunfisch & Paprika",
#             "desT": "",
#             "zusatz": "A,G,F",
#             "section": "PIZZEN"
#         },
#         "14": {
#             "name": "Valentina",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Formfleischvorderschinken Rührei",
#             "desT": "",
#             "zusatz": "A,G,3,4,5",
#             "section": "PIZZEN"
#         },
#         "15": {
#             "name": "Diavolo",
#             "price": {
#                 "24cm": "6,00",
#                 "28cm": "7,50",
#                 "38cm": "15,40"
#             },
#             "desO": "Salami, Peperoni",
#             "desT": "",
#             "zusatz": "A,G,F,1,2,4,9",
#             "section": "PIZZEN"
#         },
#         "16": {
#             "name": "Inferno",
#             "price": {
#                 "24cm": "7,50",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Champignons, Salami",
#             "desT": "",
#             "zusatz": "A,G,F,K,1,2,4,9",
#             "section": "PIZZEN"
#         },
#         "17": {
#             "name": "Hawaii",
#             "price": {
#                 "24cm": "6,00",
#                 "28cm": "7,50",
#                 "38cm": "15,40"
#             },
#             "desO": "Formfleischvorderschinken, Annans",
#             "desT": "",
#             "zusatz": "A,G,3,4,5",
#             "section": "PIZZEN"
#         },
#         "18": {
#             "name": "Mista",
#             "price": {
#                 "24cm": "7,50",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Formfleischvorderschinken, Salami, Thunfisch, Champignons",
#             "desT": "",
#             "zusatz": "A,G,F,1,2,3,4,5,9",
#             "section": "PIZZEN"
#         },
#         "19": {
#             "name": "4 Jahreszeiten",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,50",
#                 "38cm": "15,40"
#             },
#             "desO": "mit Thunfisch, parkia ,schinken, Spinat",
#             "desT": "",
#             "zusatz": "A,G,F,1,2,4,9",
#             "section": "PIZZEN"
#         },
#         "20": {
#             "name": "Bari",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Formfleischvorderschinken, Salami, Thunfisch, Artischocken",
#             "desT": "",
#             "zusatz": "A,G,F,1,2,3,4,9",
#             "section": "PIZZEN"
#         },
#         "21": {
#             "name": "Calzone",
#             "price": {
#                 "stand": "8,00"
#             },
#             "desO": "Käse, Thunfisch, Champignons, Formfleischvorderschinken",
#             "desT": "",
#             "zusatz": "A,G,F,3,4,5",
#             "section": "PIZZEN"
#         },
#         "22": {
#             "name": "Scampi",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Krabben",
#             "desT": "",
#             "zusatz": "G,A,K",
#             "section": "PIZZEN"
#         },
#         "23": {
#             "name": "Salmone",
#             "price": {
#                 "24cm": "7,50",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Spinat, Lachsfilet",
#             "desT": "",
#             "zusatz": "A,G,F,9",
#             "section": "PIZZEN"
#         },
#         "24": {
#             "name": "Frutti di Mare",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Meeresfrüchte, Knoblauch",
#             "desT": "",
#             "zusatz": "A,G,F,1,2",
#             "section": "PIZZEN"
#         },
#         "25": {
#             "name": "Grotta di Mare",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Meeresfrüchte, Thunfisch, Krabben",
#             "desT": "",
#             "zusatz": "A,G,F,1,2",
#             "section": "PIZZEN"
#         },
#         "26": {
#             "name": "Mozzarella",
#             "price": {
#                 "24cm": "6,00",
#                 "28cm": "7,50",
#                 "38cm": "15,40"
#             },
#             "desO": "Tomaten, Mozzarella",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "27": {
#             "name": "Vegetaria",
#             "price": {
#                 "24cm": "7,50",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Champignons, Zwiebeln, Spinat, Broccoli",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "28": {
#             "name": "Romantika",
#             "price": {
#                 "24cm": "6,50",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Oliven, Krabben, Gorgonzolakäse",
#             "desT": "",
#             "zusatz": "A,G,1,3",
#             "section": "PIZZEN"
#         },
#         "29": {
#             "name": "Italia",
#             "price": {
#                 "24cm": "6,00",
#                 "28cm": "7,00",
#                 "38cm": "14,40"
#             },
#             "desO": "Salami, Zwiebeln, Spinat",
#             "desT": "",
#             "zusatz": "A,G,1,2,4,9",
#             "section": "PIZZEN"
#         },
#         "30": {
#             "name": "Toscana",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Formfleischvorderschinken, Champions, Artischocken",
#             "desT": "",
#             "zusatz": "A,G,3,4,5",
#             "section": "PIZZEN"
#         },
#         "31": {
#             "name": "Bolognese",
#             "price": {
#                 "24cm": "6,50",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Bolognesesauce, Käse",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "32": {
#             "name": "Bolognese Spezial",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Bolognesesauce, Spaghetti, Käse",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "33": {
#             "name": "Capricciosa",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Salami, Formfleischvorderschinken, Champignons, Spinat",
#             "desT": "",
#             "zusatz": "A,G,1,2,3,4,5,9",
#             "section": "PIZZEN"
#         },
#         "34": {
#             "name": "Quattro-Formaggi",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Tomatensauce und 4 Käsesorten",
#             "desT": "",
#             "zusatz": "A,G,3",
#             "section": "PIZZEN"
#         },
#         "35": {
#             "name": "Sucuk",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Knoblauchwurst",
#             "desT": "",
#             "zusatz": "A,G,1,3,4,",
#             "section": "PIZZEN"
#         },
#         "36": {
#             "name": "Hollandaise",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Formfleischvorderschinken, Broccoli, Hollandaisesauce",
#             "desT": "",
#             "zusatz": "A,G,B,C,3,4,5",
#             "section": "PIZZEN"
#         },
#         "37": {
#             "name": "Ala-Turka",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Champignons, Broccoli, Hähnchenbrust",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "38": {
#             "name": "Chef",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Spinat, Oliven, Hirtenkäse",
#             "desT": "",
#             "zusatz": "A,G,B,1,3",
#             "section": "PIZZEN"
#         },
#         "39": {
#             "name": "Gyros",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Schweinefleisch, Hirtenkäse",
#             "desT": "",
#             "zusatz": "A,G,B.3,5",
#             "section": "PIZZEN"
#         },
#         "40": {
#             "name": "Deluxe",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Hähnchenbrustfilets, Ananas",
#             "desT": "",
#             "zusatz": "A,G,3,4,5",
#             "section": "PIZZEN"
#         },
#         "41": {
#             "name": "Serrano",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Serrano-Schinken, Rucola, Parmesan",
#             "desT": "",
#             "zusatz": "A,G,3,5",
#             "section": "PIZZEN"
#         },
#         "42": {
#             "name": "Pollo Verdura",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Hähnchenbrust, Spinat, Champignons",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "43": {
#             "name": "Indiana",
#             "price": {
#                 "24cm": "8,00",
#                 "28cm": "8,40",
#                 "38cm": "16,40"
#             },
#             "desO": "Rinderhackfl., BBQ-Sauce, Zwiebeln, Mozzarella",
#             "desT": "",
#             "zusatz": "A,G,E",
#             "section": "PIZZEN"
#         },
#         "44": {
#             "name": "Numex",
#             "price": {
#                 "24cm": "8,40",
#                 "28cm": "9,40",
#                 "38cm": "17,40"
#             },
#             "desO": "BBQ-Sauce, Mozzarella, Rinderhackfleisch, Zwiebeln, Bacon",
#             "desT": "",
#             "zusatz": "A,G,E,1,2",
#             "section": "PIZZEN"
#         },
#         "45": {
#             "name": "Rustika",
#             "price": {
#                 "24cm": "6,40",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Thunfisch, Paprika, Oliven",
#             "desT": "",
#             "zusatz": "A,G,F,1,3",
#             "section": "PIZZEN"
#         },
#         "46": {
#             "name": "Boston",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Hähnchenbrust, Zwiebeln, Paprika, Mais",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "47": {
#             "name": "Ufo",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "17,40"
#             },
#             "desO": "Thunfisch, Paprika, Zwiebeln",
#             "desT": "",
#             "zusatz": "A,G,F",
#             "section": "PIZZEN"
#         },
#         "48": {
#             "name": "Borussia",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Spinat, Zwiebeln",
#             "desT": "",
#             "zusatz": "A,G",
#             "section": "PIZZEN"
#         },
#         "49": {
#             "name": "Rex",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Gyros, Zwiebeln, Hirtenkäse",
#             "desT": "",
#             "zusatz": "A,G,B",
#             "section": "PIZZEN"
#         },
#         "50": {
#             "name": "Verna",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Thunfisch, Paprika, Krabben",
#             "desT": "",
#             "zusatz": "A,G,F",
#             "section": "PIZZEN"
#         },
#         "51": {
#             "name": "Siciliana",
#             "price": {
#                 "24cm": "6,50",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Sardellen, Oiliven, Kapern",
#             "desT": "",
#             "zusatz": "A,G,F,1,3",
#             "section": "PIZZEN"
#         },
#         "52": {
#             "name": "Kabara",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Spinat, Lachs, Zwiebeln",
#             "desT": "",
#             "zusatz": "A,G,F",
#             "section": "PIZZEN"
#         },
#         "53": {
#             "name": "Mafia",
#             "price": {
#                 "24cm": "7,00",
#                 "28cm": "8,00",
#                 "38cm": "16,40"
#             },
#             "desO": "Salami, Thunfisch, Zwiebeln",
#             "desT": "",
#             "zusatz": "A,G,F,1,2,4,9",
#             "section": "PIZZEN"
#         },
#         "54": {
#             "name": "Milano",
#             "price": {
#                 "24cm": "7,50",
#                 "28cm": "8,50",
#                 "38cm": "17,40"
#             },
#             "desO": "Thunfisch, Krabben, Artischocken",
#             "desT": "",
#             "zusatz": "A,G,F,2",
#             "section": "PIZZEN"
#         },
#         "55": {
#             "name": "Carciofini",
#             "price": {
#                 "24cm": "5,50",
#                 "28cm": "6,50",
#                 "38cm": "13,40"
#             },
#             "desO": "Artischocken",
#             "desT": "",
#             "zusatz": "A,G,2",
#             "section": "PIZZEN"
#         },
#         "56": {
#             "name": "Pizzabrötchen",
#             "price": {
#                 "stand": "3,00"
#             },
#             "options": {
#                 "Ihre Dip": {
#                     "showprice": false,
#                     "name": "Ihre Dip",
#                     "options": {
#                         "Kräuterbutter": {
#                             "price": "0,00"
#                         },
#                         "Aioli": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "6 Stück",
#             "desT": "",
#             "zusatz": "G",
#             "section": "PIZZABRÖTCHEN"
#         },
#         "57": {
#             "name": "Gefüllte Pizzabrötchen",
#             "price": {
#                 "stand": "5,50"
#             },
#             "options": {
#                 "Ihre Dip": {
#                     "showprice": true,
#                     "name": "Ihre Dip",
#                     "options": {
#                         "Kräuterbutter": {
#                             "price": "1,00"
#                         },
#                         "Aioli": {
#                             "price": "1,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "Formfleischvorderschinken und Käse",
#             "desT": "",
#             "zusatz": "3,4,5,G",
#             "section": "PIZZABRÖTCHEN"
#         },
#         "58": {
#             "name": "Gefüllte Pizzabrötchen",
#             "price": {
#                 "stand": "5,50"
#             },
#             "options": {
#                 "Ihre Dip": {
#                     "showprice": true,
#                     "name": "Ihre Dip",
#                     "options": {
#                         "Kräuterbutter": {
#                             "price": "1,00"
#                         },
#                         "Aioli": {
#                             "price": "1,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "Salami und Käse",
#             "desT": "",
#             "zusatz": "1,2,4,9,G",
#             "section": "PIZZABRÖTCHEN"
#         },
#         "59": {
#             "name": "Gefüllte Pizzabrötchen",
#             "price": {
#                 "stand": "5,50"
#             },
#             "options": {
#                 "Ihre Dip": {
#                     "showprice": true,
#                     "name": "Ihre Dip",
#                     "options": {
#                         "Kräuterbutter": {
#                             "price": "1,00"
#                         },
#                         "Aioli": {
#                             "price": "1,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "Thunfisch und Käse",
#             "desT": "",
#             "zusatz": "G,F",
#             "section": "PIZZABRÖTCHEN"
#         },
#         "60": {
#             "name": "Gefüllte Pizzabrötchen",
#             "price": {
#                 "stand": "6,00"
#             },
#             "options": {
#                 "Ihre Dip": {
#                     "showprice": true,
#                     "name": "Ihre Dip",
#                     "options": {
#                         "Kräuterbutter": {
#                             "price": "1,00"
#                         },
#                         "Aioli": {
#                             "price": "1,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "Peperoni und Hirtenkäse",
#             "desT": "",
#             "zusatz": "1,3,G",
#             "section": "PIZZABRÖTCHEN"
#         },
#         "61": {
#             "name": "Gefüllte Pizzabrötchen",
#             "price": {
#                 "stand": "6,00"
#             },
#             "options": {
#                 "Ihre Dip": {
#                     "showprice": true,
#                     "name": "Ihre Dip",
#                     "options": {
#                         "Kräuterbutter": {
#                             "price": "1,00"
#                         },
#                         "Aioli": {
#                             "price": "1,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "Formfleischvorderschinken ,Ananas und Käse",
#             "desT": "",
#             "zusatz": "3,4,5,G",
#             "section": "PIZZABRÖTCHEN"
#         },
#         "62": {
#             "name": "Gefüllte Pizzabrötchen",
#             "price": {
#                 "stand": "6,00"
#             },
#             "options": {
#                 "Ihre Dip": {
#                     "showprice": true,
#                     "name": "Ihre Dip",
#                     "options": {
#                         "Kräuterbutter": {
#                             "price": "1,00"
#                         },
#                         "Aioli": {
#                             "price": "1,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "Spinat und Hirtenkäse",
#             "desT": "",
#             "zusatz": "1,3,G",
#             "section": "PIZZABRÖTCHEN"
#         },
#         "63": {
#             "name": "Käse Baguette",
#             "price": {
#                 "stand": "5,00"
#             },
#             "desO": "mit Salat, Tomaten, Gurken und Mais",
#             "desT": "",
#             "zusatz": "G",
#             "section": "BAGUETTE"
#         },
#         "64": {
#             "name": "Thunfisch Baguette",
#             "price": {
#                 "stand": "5,90"
#             },
#             "desO": "mit Salat, Tomaten, Ei und Mais",
#             "desT": "",
#             "zusatz": "G,E,F",
#             "section": "BAGUETTE"
#         },
#         "65": {
#             "name": "Salami Baguette",
#             "price": {
#                 "stand": "5,00"
#             },
#             "desO": "mit Salat, Tomaten und Mais",
#             "desT": "",
#             "zusatz": "1,2,4,9,G",
#             "section": "BAGUETTE"
#         },
#         "66": {
#             "name": "Formfleischvorderschinken Baguette",
#             "price": {
#                 "stand": "5,00"
#             },
#             "desO": "mit Salat, Tomaten und Mais",
#             "desT": "",
#             "zusatz": "3,4,5,G",
#             "section": "BAGUETTE"
#         },
#         "67": {
#             "name": "Hähnchen Baguette",
#             "price": {
#                 "stand": "5,90"
#             },
#             "desO": "mit Salat, Tomaten und Mais",
#             "desT": "",
#             "zusatz": "G",
#             "section": "BAGUETTE"
#         },
#         "68": {
#             "name": "Mozzarella Baguette",
#             "price": {
#                 "stand": "5,90"
#             },
#             "desO": "mit Salat, Tomaten und Mais",
#             "desT": "",
#             "zusatz": "1,4,G",
#             "section": "BAGUETTE"
#         },
#         "69": {
#             "name": "Sauce Vedura",
#             "price": {
#                 "stand": "6,90"
#             },
#             "desO": "mit Champignons, Broccoli, Paprika, Sahne- oder Napolisauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "70": {
#             "name": "sauce Bolognese",
#             "price": {
#                 "stand": "6,90"
#             },
#             "desO": "mit Rindergehacktes",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "71": {
#             "name": "Napolisauce",
#             "price": {
#                 "stand": "5,90"
#             },
#             "desO": "mit Tomatensauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "72": {
#             "name": "Funghi",
#             "price": {
#                 "stand": "6,50"
#             },
#             "desO": "mit Champignons, Sahnessauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "73": {
#             "name": "Sauce Carbonara",
#             "price": {
#                 "stand": "7,00"
#             },
#             "desO": "mit Formfleischvorderschinken, Ei, Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A,3,4,5",
#             "section": "PASTA"
#         },
#         "74": {
#             "name": "Frutti di Mare",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Meeresfrüchte, Napolisauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A,K,,1,2",
#             "section": "PASTA"
#         },
#         "75": {
#             "name": "Matriciana",
#             "price": {
#                 "stand": "7,00"
#             },
#             "desO": "mit Formfleischvorderschinken, Zwiebeln, Napolisauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A,3,4,5",
#             "section": "PASTA"
#         },
#         "76": {
#             "name": "AL Gamberetti",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Krabben, Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A,K",
#             "section": "PASTA"
#         },
#         "77": {
#             "name": "AL Tonno",
#             "price": {
#                 "stand": "7,00"
#             },
#             "desO": "mit Thunfisch, Napolisahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "B,9,G,A,F",
#             "section": "PASTA"
#         },
#         "78": {
#             "name": "Borussia",
#             "price": {
#                 "stand": "7,50"
#             },
#             "desO": "mit Champignons, Thunfisch, Spinat, Napolisauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A,F",
#             "section": "PASTA"
#         },
#         "79": {
#             "name": "Valentina",
#             "price": {
#                 "stand": "6,90"
#             },
#             "desO": "mit Formfleischvorderschinken, Champignons, Napolisahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A,3,4,5",
#             "section": "PASTA"
#         },
#         "80": {
#             "name": "Rimini",
#             "price": {
#                 "stand": "6,90"
#             },
#             "desO": "mit Champignons, formfleischvorderschinken, Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A,3,4,5",
#             "section": "PASTA"
#         },
#         "81": {
#             "name": "Alla Panna",
#             "price": {
#                 "stand": "6,50"
#             },
#             "desO": "mit Formfleischvorderschinken, Paprika, Broccoli, Sahne- oder Napolisauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A,3,4,5",
#             "section": "PASTA"
#         },
#         "82": {
#             "name": "Stella",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "mit Hähnchen, Champignons, Napolisahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "83": {
#             "name": "Broccoli",
#             "price": {
#                 "stand": "6,50"
#             },
#             "desO": "mit Brokkoli, Knoblauch, sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "84": {
#             "name": "Salmone",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Lachsstück, Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "85": {
#             "name": "Gorgonzola",
#             "price": {
#                 "stand": "6,90"
#             },
#             "desO": "mit Gorgonzola-Käse, Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "86": {
#             "name": "Curry",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "mit Hähnchenfleisch & Curry-Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "87": {
#             "name": "Di Pollo",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "mit Hähnchenfleisch, Spinat, Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "88": {
#             "name": "Hawaii",
#             "price": {
#                 "stand": "7,50"
#             },
#             "desO": "mit Formfleischvorderschinken, Ananas, Sahnesauce, mit Käse überbacken",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "89": {
#             "name": "Paesana",
#             "price": {
#                 "stand": "6,90"
#             },
#             "desO": "mit Paprika, Zwiebeln, Bolognese",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "90": {
#             "name": "Hähnchen-Broccoli",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "mit Hähnchen, Broccoli, Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "91": {
#             "name": "Alla Fiorentina",
#             "price": {
#                 "stand": "7,50"
#             },
#             "desO": "mit Spinat, Gorgonzola, Sahnesauce",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "92": {
#             "name": "Lasagne",
#             "price": {
#                 "stand": "6,90"
#             },
#             "desO": "mit Fleischsauce, überbacken",
#             "desT": "",
#             "options": {
#                 "Ihre Nudelsorte": {
#                     "showprice": false,
#                     "name": "Ihre Nudelsorte",
#                     "options": {
#                         "Penne": {
#                             "price": "0,00"
#                         },
#                         "Tortellini": {
#                             "price": "0,00"
#                         },
#                         "Tagliatelle": {
#                             "price": "0,00"
#                         },
#                         "Spaghetti": {
#                             "price": "0,00"
#                         }
#                     }
#                 },
#                 "Ihre Sauce": {
#                     "showprice": false,
#                     "name": "Ihre Sauce",
#                     "options": {
#                         "Sahnesauce": {
#                             "price": "0,00"
#                         },
#                         "Napolisauce": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "zusatz": "G,A",
#             "section": "PASTA"
#         },
#         "93": {
#             "name": "Kartoffelauflauf",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Broccoli, fr. Champignons, Sahnesauce, überbacken",
#             "desT": "",
#             "zusatz": "A",
#             "section": "Kartoffelgerichte"
#         },
#         "94": {
#             "name": "Kartoffelauflauf Della Casa",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Formfleischvorderschinken, Paprika, Bolognese",
#             "desT": "",
#             "zusatz": "3,4,5",
#             "section": "Kartoffelgerichte"
#         },
#         "95": {
#             "name": "Kartoffelauflauf Hollandaise",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Hähnchenbrust, Broccoli, Paprika, Käse, überbacken",
#             "desT": "",
#             "zusatz": "",
#             "section": "Kartoffelgerichte"
#         },
#         "96": {
#             "name": "Lachs-Kartoffelauflauf",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Lachs, Kartoffeln, Zwiebeln, Sahnesauce, Käse, überbacken",
#             "desT": "",
#             "zusatz": "A",
#             "section": "Kartoffelgerichte"
#         },
#         "97": {
#             "name": "Salat Verde",
#             "price": {
#                 "stand": "4,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit grünen Salat, Zwiebeln",
#             "desT": "",
#             "zusatz": "A",
#             "section": "SALATE"
#         },
#         "98": {
#             "name": "Gemischter Salat",
#             "price": {
#                 "stand": "5,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit Eisbergsalat, Rucola, Tomaten, Gurken, Mais, Weißkohl",
#             "desT": "",
#             "zusatz": "",
#             "section": "SALATE"
#         },
#         "99": {
#             "name": "Capricciosa Salat",
#             "price": {
#                 "stand": "7,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gemischten Salat, Schinken, Thunfisch, Käse",
#             "desT": "",
#             "zusatz": "",
#             "section": "SALATE"
#         },
#         "100": {
#             "name": "Lachsfilet Salat",
#             "price": {
#                 "stand": "9,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gemischten Salat, Hirtenkase & Lachsfilets",
#             "desT": "",
#             "zusatz": "B,F",
#             "section": "SALATE"
#         },
#         "101": {
#             "name": "Emiri Salat",
#             "price": {
#                 "stand": "7,50"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gemischten Salat, Oliven, Paprika, Käse, Ei",
#             "desT": "",
#             "zusatz": "1,3,E",
#             "section": "SALATE"
#         },
#         "102": {
#             "name": "Salat Tonno",
#             "price": {
#                 "stand": "7,50"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gemischten Salat, Thunfisch, Paprika, Mais",
#             "desT": "",
#             "zusatz": "A",
#             "section": "SALATE"
#         },
#         "103": {
#             "name": "Italia Salat",
#             "price": {
#                 "stand": "7,50"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gem. Salat, Paprika, Oliven, Zwiebeln, Artischocken",
#             "desT": "",
#             "zusatz": "1,2,3",
#             "section": "SALATE"
#         },
#         "104": {
#             "name": "Hawaii Salat",
#             "price": {
#                 "stand": "6,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gemischten Salat, Schinken, Ananas",
#             "desT": "",
#             "zusatz": "A",
#             "section": "SALATE"
#         },
#         "105": {
#             "name": "Pescator Salat",
#             "price": {
#                 "stand": "9,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gem., Meeresfruchte, Krabben, Thunfisch",
#             "desT": "",
#             "zusatz": "1,2,F",
#             "section": "SALATE"
#         },
#         "106": {
#             "name": "Bella Salat",
#             "price": {
#                 "stand": "7,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gem. Salat, Thunfisch, Krabben, Ananas, Schinken",
#             "desT": "",
#             "zusatz": "3,4,5,F",
#             "section": "SALATE"
#         },
#         "107": {
#             "name": "Paesana Salat",
#             "price": {
#                 "stand": "7,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gem. Salat, Thunfisch, Paprika, Oliven, Zwiebeln",
#             "desT": "",
#             "zusatz": "A",
#             "section": "SALATE"
#         },
#         "108": {
#             "name": "Valentina Salat",
#             "price": {
#                 "stand": "7,50"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gem., Mais, Hirtenkase, Peperoni, Oliven, Paprika",
#             "desT": "",
#             "zusatz": "1,3,B",
#             "section": "SALATE"
#         },
#         "109": {
#             "name": "Kabara Salat",
#             "price": {
#                 "stand": "8,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gem. Salat, Hähnchenbrust, Champignons, Paprika, Artischocken",
#             "desT": "",
#             "zusatz": "2",
#             "section": "SALATE"
#         },
#         "110": {
#             "name": "Roma Salat",
#             "price": {
#                 "stand": "8,90"
#             },
#             "options": {
#                 "Ihr Lieblingsdressing": {
#                     "showprice": false,
#                     "name": "Ihr Lieblingsdressing",
#                     "options": {
#                         "Essig Öl": {
#                             "price": "0,00"
#                         },
#                         "Honig Balsamico": {
#                             "price": "0,00"
#                         },
#                         "Cocktail Dressing": {
#                             "price": "0,00"
#                         },
#                         "Joghurt Dressing": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "mit gem, Salat, Hähnchenbrust, Champignons, Zwiebeln",
#             "desT": "",
#             "zusatz": "",
#             "section": "SALATE"
#         },
#         "111": {
#             "name": "Hamburger Einzeln",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "180g mit Burgersauce, Ketchup, Tomaten, Gurken, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "111M": {
#             "name": "Hamburger Menü",
#             "price": {
#                 "stand": "9,90"
#             },
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "180g mit Burgersauce, Ketchup, Tomaten, Gurken, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "112": {
#             "name": "Cheeseburger Einzeln",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "180g mit Cheddarkäse, Ketchup, Burgersauce, Tomaten, Gurken, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "112M": {
#             "name": "Cheeseburger Menü",
#             "price": {
#                 "stand": "9,90"
#             },
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "180g mit Cheddarkäse, Ketchup, Burgersauce, Tomaten, Gurken, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "113": {
#             "name": "Bacon Chili Cheeseburger Einzeln",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "180g mit Cheddarkäse, Bacon, Burgersauce, Jalapenos, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "113M": {
#             "name": "Bacon Chili Cheeseburger Menü",
#             "price": {
#                 "stand": "10,90"
#             },
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "180g mit Cheddarkäse, Bacon, Burgersauce, Jalapenos, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "114M": {
#             "name": "Acadran burger Menü",
#             "price": {
#                 "stand": "9,90"
#             },
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "180g mit Barbecuesauce, Käse, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "114": {
#             "name": "Acadran burger Einzeln",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "180g mit Barbecuesauce, Käse, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "115": {
#             "name": "Spicy American Einzeln",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "180g mit Cheddarkäse, Röstzwiebeln, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "115M": {
#             "name": "Spicy American Menü",
#             "price": {
#                 "stand": "9,90"
#             },
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "180g mit Cheddarkäse, Röstzwiebeln, Salat",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "116": {
#             "name": "Switzerland Einzeln",
#             "price": {
#                 "stand": "8,90"
#             },           
#             "desO": "180g mit Cheddarkäse, gegrillte Zwiebeln, Champignons",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "116M": {
#             "name": "Switzerland Menü",
#             "price": {
#                 "stand": "9,90"
#             },
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "180g mit Cheddarkäse, gegrillte Zwiebeln, Champignons",
#             "desT": "",
#             "zusatz": "",
#             "section": "American Big Burger"
#         },
#         "117": {
#             "name": "Schnitzel Wiener Art",
#             "price": {
#                 "stand": "8,90"
#             },
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "Schnitzel"
#         },
#         "118": {
#             "name": "Schnitzel Jäger Art",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "section": "Schnitzel"
#         },
#         "119": {
#             "name": "Schnitzel Zigeuner Art",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "section": "Schnitzel"
#         },
#         "120": {
#             "name": "Schnitzel Zwiebel Art",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "section": "Schnitzel"
#         },
#         "121": {
#             "name": "Schnitzel Hawaii Art",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "section": "Schnitzel"
#         },
#         "122": {
#             "name": "Schnitzel Funghi Art",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "options": {
#                 "Ihre Wahl": {
#                     "showprice": false,
#                     "name": "Ihre Wahl",
#                     "options": {
#                         "Pommes": {
#                             "price": "0,00"
#                         },
#                         "Twister": {
#                             "price": "0,00"
#                         }
#                     }
#                 }
#             },
#             "section": "Schnitzel"
#         },
#         "123": {
#             "name": "Beef Chili Cheese Fries",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "mit Rinderhackfleisch, Jalapenos, Cheddarkäse, überbacken",
#             "desT": "",
#             "zusatz": "1,3",
#             "section": "CHILLICHEESEFRIES"
#         },
#         "124": {
#             "name": "Chicken Chili Cheese Fries",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "mit saftigen Hähnchenbrustfilet, Jalapenos, Cheddarkäse, überbacken",
#             "desT": "",
#             "zusatz": "1,3",
#             "section": "CHILLICHEESEFRIES"
#         },
#         "125": {
#             "name": "Vegetarier Chili Cheese Fries",
#             "price": {
#                 "stand": "8,90"
#             },
#             "desO": "mit Paprika, Champignons, Broccoli, Jalapenos, Cheddarkäse, überbacken",
#             "desT": "",
#             "zusatz": "1,3",
#             "section": "CHILLICHEESEFRIES"
#         },
#         "126": {
#             "name": "6 Chicken Nuggets",
#             "price": {
#                 "stand": "5,90"
#             },
#             "desO": "mit Pommes und Süß-Sauersauce",
#             "desT": "",
#             "zusatz": "",
#             "section": "Kindermenü"
#         },
#         "127": {
#             "name": "13 Chicken Nuggets",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Pommes und Süß-Sauersauce",
#             "desT": "",
#             "zusatz": "",
#             "section": "Kindermenü"
#         },
#         "128": {
#             "name": "7 Chicken Wings",
#             "price": {
#                 "stand": "7,90"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "Kindermenü"
#         },
#         "129": {
#             "name": "7 Chicken wings",
#             "price": {
#                 "stand": "9,90"
#             },
#             "desO": "mit Pommes",
#             "desT": "",
#             "zusatz": "",
#             "section": "Kindermenü"
#         },
#         "130": {
#             "name": "Pommes mit Ketchup oder Mayonnaise",
#             "price": {
#                 "stand": "3,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "Beilagen und Desserts"
#         },
#         "131": {
#             "name": "Twister mit Ketchup oder Mayonnaise",
#             "price": {
#                 "stand": "3,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "Beilagen und Desserts"
#         },
#         "132": {
#             "name": "Bratkartoffeln mit Zwiebeln",
#             "price": {
#                 "stand": "4,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "Beilagen und Desserts"
#         },
#         "133": {
#             "name": "Spinat oder Brokkoli",
#             "price": {
#                 "stand": "4,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "Beilagen und Desserts"
#         },
#         "134": {
#             "name": "Tiramisu",
#             "price": {
#                 "stand": "5,00"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "3,5",
#             "section": "Beilagen und Desserts"
#         },
#         "135": {
#             "name": "Coca-Cola",
#             "price": {
#                 "0.33L": "1,80"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "6,7,8",
#             "section": "GETRÄNKE"
#         },
#         "136": {
#             "name": "Fanta, Sprite",
#             "price": {
#                 "1.00L": "2,20"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "6,7,8",
#             "section": "GETRÄNKE"
#         },
#         "137": {
#             "name": "Coca-Cola light",
#             "price": {
#                 "1.00L": "2,20"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "6,7,8",
#             "section": "GETRÄNKE"
#         },
#         "138": {
#             "name": "Durstlöscher Multivitamin, orange oder Eistee Pfirsisch",
#             "price": {
#                 "0.5L": "1,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "GETRÄNKE"
#         },
#         "139": {
#             "name": "Bitburger",
#             "price": {
#                 "0.5L": "1,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "GETRÄNKE"
#         },
#         "140": {
#             "name": "Becks grün",
#             "price": {
#                 "0.5L": "1,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "GETRÄNKE"
#         },
#         "141": {
#             "name": "Becks gold",
#             "price": {
#                 "0.7L": "1,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "GETRÄNKE"
#         },
#         "142": {
#             "name": "Lambrusco",
#             "price": {
#                 "0.75L": "7,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "GETRÄNKE"
#         },
#         "143": {
#             "name": "Rose",
#             "price": {
#                 "0.75L": "7,50"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "GETRÄNKE"
#         },
#         "144": {
#             "name": "Wasser",
#             "price": {
#                 "stand": "2,20"
#             },
#             "desO": "",
#             "desT": "",
#             "zusatz": "",
#             "section": "GETRÄNKE"
#         }
#     }
# }
# """
# import json 
# g = json.loads(g)
# v = {
                     
# }
# for l in g["product"]:
#     if g["product"][l]["section"]=="SALATE" or g["product"][l]["section"]=="PASTA":
#       v[g["product"][l]["section"]+" - " +g["product"][l]["name"]] ={"price": "0,00"}
# print(v)

