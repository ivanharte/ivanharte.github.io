const featured = {
    featured: [0, 1, 2],        //array of ids of featured entries
    activeID: 1
};

const entries = [
    /*----------- MODELO ---------------------------
    {
        id: 0   //autogenerado, igual a posición en array
        date: "2020-01-16",
        title: "Torta de zanahoria sin gluten con cobertura de crema de coco",
            //ver si coincide con metadato HTML, y si puede ser igual que primer párrafo
        description: "Una deliciosa variante de la clásica carrot cake apta para personas celíacas y con intolerancia al gluten. Ideal como postre o para acompañar un té.",
        category: "receta", //otras: nutrición, veganismo, barcelona
        mainTopic: "torta de zanahoria",
        tags: ["zanahoria", "torta", "merienda", "postre", "té", "sin gluten", "celíacos"],
        URL: "2020-01-16-receta-torta-de-zanahoria-sin-gluten-con-cobertura-de-crema-de-coco.html", //autogenerado
        thumbnail: {
            large: "2020-01-2016-torta-de-zanahoria-thumbnail-large.jpg", //autogenerado
            small: "2020-01-2016-torta-de-zanahoria-thumbnail-small.jpg", //autogenerado
            altText: "Porción de torta de zanahoria presentada con una taza de té"
        },
        images: [   //autogenerado
            {
                url: "2020-01-2016-algunos-ingredientes-de-la-torta-de-zanahoria.jpg",
                alt: "Algunos ingredientes de la torta de zanahoria: zanahorias, harina sin gluten, leche vegetal, azúcar."
            }
        ],
        receipt: {                  //o false
            mainIngredient: [],
            course: [],         //plato principal, guarnición, desayuno, bebida
            cookingMethod: [],  //hervido, guiso, horneado, ensalada,
            style: [],          //oriental, mexicana, rioplatense, andina, mediterránea, árabe, centroeuropea
            glutenFree: [true],
            ingredients: []
        }
    }, ----------------------------------------------*/
    {
        id: 0,
        date: "2020-01-05",
        title: "Fajitas de vegetales",
        description: "Una combinación de vegetales y salsas veganas únicas para rellenar fajitas de estilo mexicano",
        category: "receta",
        mainTopic: "",
        tags: [],
        URL: "2020-01-05-fajitas-de-vegetales.html",
        thumbnail: {
            large: "2020-01-05-fajitas-de-vegetales-large.jpg",
            small: "2020-01-05-fajitas-de-vegetales-small.jpg",
            altText: "Fajitas de vegetales servidas en una bandeja"
        },
        images: [],
        receipt: {
            mainIngredient: ["tortillas de maíz", "alubias rojas", "pimientos"],
            course: ["plato principal"],
            cookingMethod: ["salteado"],
            style: ["mexicano"],
            glutenFree: [true],
            ingredients: ["tortillas de maíz", "alubias rojas", "pimientos", "cebollas", "chile", "aguacate", "tomate triturado", "ajo"]
        }
    },
    {
        id: 1,
        date: "2020-01-12",
        title: "Tapas veganas",
        description: "Una selección de platillos veganos para acompañar las cervezas de la tardecita",
        category: "receta",
        mainTopic: "",
        tags: [],
        URL: "2020-01-12-tapas-veganas.html",
        thumbnail: {
            large: "2020-01-12-tapas-veganas-large.jpg",
            small: "2020-01-12-tapas-veganas-small.jpg",
            altText: "Tapas veganas presentadas sobre una bandeja"
        },
        images: [],
        receipt: {
            mainIngredient: ["alubias rojas", "patatas"],
            course: ["aperitivo"],
            cookingMethod: ["guisado"],
            style: ["oriental"],
            glutenFree: [true],
            ingredients: ["alubias negras", "leche de coco", "patatas", "ajo", "jengibre", "mostaza", "curry", "cebolla"]
        }
    },
    {
        id: 2,
        date: "2020-01-16",
        title: "Ensalada de kale",
        description: "Una deliciosa y nutritiva ensalada de kale para acompañar cualquier plato principal",
        category: "receta",
        mainTopic: "",
        tags: [],
        URL: "2020-01-16-ensalada-de-kale.html",
        thumbnail: {
            large: "2020-01-16-ensalada-de-kale-large.jpg",
            small: "2020-01-16-ensalada-de-kale-small.jpg",
            altText: "Bowl de ensalada kale"
        },
        images: [],
        receipt: {
            mainIngredient: ["kale"],
            course: ["guarnición"],
            cookingMethod: ["ensalada"],
            style: ["mediterráneo"],
            glutenFree: [false],
            ingredients: ["kale", "croutons", "tomates", "champignones", "limón", "aceite"]
        }
    },
    {
        id: 3,
        date: "2020-01-18",
        title: "Manifestación mundial contra el maltrato animal",
        description: "El día 29 de abril se realizará en todo el mundo una enorme manifestación en contra del especismo y el maltrato animal",
        category: "veganismo",
        mainTopic: "",
        tags: [],
        URL: "",
        thumbnail: {
            large: "",
            small: "2020-01-18-manifestacion-mundial-contra-el-maltrato-animal-small.jpg",
            altText: ""
        },
        images: [],
        receipt: false
    }
];