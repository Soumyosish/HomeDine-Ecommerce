import categoryCups from "../assets/category-cups.jpg";
import categoryWater from "../assets/category-pitcher.jpg";
import categoryCooking from "../assets/category-naturesip.jpg";
import categoryDecor from "../assets/sculptures.jpg";

import coffeeMug from "../assets/coffee-mug.webp";
import dinnerPlate from "../assets/dinner-plate.webp";
import dinnerSet from "../assets/dinner-set.webp";
import soupBowl from "../assets/soup-bowl.webp";
import productBowl from "../assets/product-bowl.jpg";
import forkSpoon from "../assets/fork-spoon.jpg";
import spoonImg from "../assets/spoon.webp";
import productUtensils from "../assets/product-utensils.jpg";

import waterBottle from "../assets/water-bottle.webp";
import waterBottle1 from "../assets/water-bottle1.webp";
import waterBottle2 from "../assets/water-bottle2.webp";
import waterBottle3 from "../assets/water-bottle3.jpeg";
import glassImg from "../assets/glass.jpg";
import productGlassjars from "../assets/product-glassjars.jpg";
import productBottle from "../assets/product-bottle.jpg";
import productKettle from "../assets/product-kettle.jpg";

import fryPan from "../assets/fry-pan.jpg";
import tawa from "../assets/tawa.jpg";
import rotiMaker from "../assets/roti-maker.jpg";
import cooker from "../assets/cooker.jpg";
import riceCooker from "../assets/rice-cooker.jpg";
import microwaveOven from "../assets/microwave oven.jpg";
import productCookware from "../assets/product-cookware.jpg";

import flowerVase from "../assets/flower-vase.jpg";
import lamp from "../assets/lamp.jpg";
import wallMirror from "../assets/wall-mirror.jpg";
import clock from "../assets/clock.jpg";
import tableImg from "../assets/table.jpg";
import sofa from "../assets/sofa.jpg";
import art from "../assets/art.jpg";
import bedsheet from "../assets/bedsheet.jpg";

export const categories = [
  { id: "cupeco", name: "CupEco & Spoons", image: categoryCups },
  { id: "water", name: "Water Bottles", image: categoryWater },
  { id: "cooking", name: "Cooking Utensils", image: categoryCooking },
  { id: "homedecor", name: "Home Decor", image: categoryDecor },
];

export const products = [
  {
    id: 1,
    categoryId: "cupeco",
    name: "Ceramic Coffee Mug",
    price: "₹2,070",
    numericPrice: 2070,
    image: coffeeMug,
    badges: ["New"],
    description:
      "Durable ceramic coffee mug. Keeps your drink warm and is easy to clean.",
  },
  {
    id: 2,
    categoryId: "cupeco",
    name: "Bamboo Dinner Plate",
    price: "₹1,665",
    numericPrice: 1665,
    image: dinnerPlate,
    badges: [],
    description:
      "Lightweight and strong bamboo dinner plate. Perfect for daily use.",
  },
  {
    id: 3,
    categoryId: "cupeco",
    name: "Dinner Set",
    price: "₹5,850",
    numericPrice: 5850,
    image: dinnerSet,
    badges: ["Best Seller"],
    description:
      "Complete dining set with plates and bowls. High-quality finish for a great look.",
  },
  {
    id: 4,
    categoryId: "cupeco",
    name: "Soup Bowl",
    price: "₹1,440",
    numericPrice: 1440,
    image: soupBowl,
    badges: [],
    description:
      "Large soup bowl for your kitchen. Strong and looks great on any table.",
  },
  {
    id: 5,
    categoryId: "cupeco",
    name: "Serving Bowl",
    price: "₹1,800",
    numericPrice: 1800,
    image: productBowl,
    badges: ["Promotion"],
    description:
      "Wide serving bowl for food. Safe for microwave and easy to wash.",
  },
  {
    id: 6,
    categoryId: "cupeco",
    name: "Premium Spoon Set",
    price: "₹1,350",
    numericPrice: 1350,
    image: forkSpoon,
    badges: ["New"],
    description:
      "High-quality stainless steel spoon set. Easy to wash and lasts for years.",
  },
  {
    id: 7,
    categoryId: "cupeco",
    name: "Bamboo Spoon",
    price: "₹990",
    numericPrice: 990,
    image: spoonImg,
    badges: [],
    description:
      "Natural bamboo spoon for cooking. Safe to use with all types of pans.",
  },
  {
    id: 8,
    categoryId: "cupeco",
    name: "Kitchen Tool Set",
    price: "₹3,600",
    numericPrice: 3600,
    image: productUtensils,
    badges: ["Customer favorite"],
    description:
      "Complete 8-piece kitchen tool set for all your cooking needs.",
  },

  {
    id: 9,
    categoryId: "water",
    name: "Strong Water Bottle 1L",
    price: "₹3,150",
    numericPrice: 3150,
    image: waterBottle,
    badges: ["New"],
    description:
      "Strong 1-litre water bottle. Keeps water cold and is easy to carry.",
  },
  {
    id: 10,
    categoryId: "water",
    name: "Sport Bottle",
    price: "₹2,655",
    numericPrice: 2655,
    image: waterBottle1,
    badges: ["Customer favorite"],
    description:
      "Leak-proof water bottle for gym and sports. Easy to use and carry anywhere.",
  },
  {
    id: 11,
    categoryId: "water",
    name: "Stainless Steel Bottle",
    price: "₹2,340",
    numericPrice: 2340,
    image: waterBottle2,
    badges: [],
    description:
      "Strong stainless steel bottle. Keeps your drinks cold or hot for a long time.",
  },
  {
    id: 12,
    categoryId: "water",
    name: "Premium Glass Bottle",
    price: "₹2,970",
    numericPrice: 2970,
    image: waterBottle3,
    badges: ["Promotion"],
    description:
      "High-quality glass bottle with a cover. Safe to use and easy to clean.",
  },
  {
    id: 13,
    categoryId: "water",
    name: "Drinking Glass",
    price: "₹1,350",
    numericPrice: 1350,
    image: glassImg,
    badges: [],
    description:
      "Strong and clear drinking glass. Perfect for water, juice, or any drink.",
  },
  {
    id: 14,
    categoryId: "water",
    name: "Glass Storage Jar Set",
    price: "₹2,520",
    numericPrice: 2520,
    image: productGlassjars,
    badges: [],
    description:
      "Set of four glass jars with bamboo lids. Great for keeping your kitchen organized.",
  },
  {
    id: 15,
    categoryId: "water",
    name: "Strong Eco Bottle",
    price: "₹2,070",
    numericPrice: 2070,
    image: productBottle,
    badges: ["New"],
    description:
      "Strong and beautiful water bottle that is good for the environment.",
  },
  {
    id: 16,
    categoryId: "water",
    name: "Stainless Steel Kettle",
    price: "₹3,420",
    numericPrice: 3420,
    image: productKettle,
    badges: [],
    description:
      "Large kettle for boiling water. Safe to use and works on all stoves.",
  },

  {
    id: 17,
    categoryId: "cooking",
    name: "Cast Iron Fry Pan",
    price: "₹5,400",
    numericPrice: 5400,
    image: fryPan,
    badges: ["Customer favorite"],
    description:
      "Strong cast iron pan for best cooking. Lasts for a lifetime and easy to use.",
  },
  {
    id: 18,
    categoryId: "cooking",
    name: "Non-stick Tawa",
    price: "₹2,700",
    numericPrice: 2700,
    image: tawa,
    badges: ["New"],
    description:
      "High-quality non-stick tawa for making rotis and dosas. Easy to clean.",
  },
  {
    id: 19,
    categoryId: "cooking",
    name: "Electric Roti Maker",
    price: "₹4,005",
    numericPrice: 4005,
    image: rotiMaker,
    badges: [],
    description: "Electric machine to make perfect rotis easily at home.",
  },
  {
    id: 20,
    categoryId: "cooking",
    name: "Pressure Cooker 5L",
    price: "₹7,110",
    numericPrice: 7110,
    image: cooker,
    badges: [],
    description:
      "Safe and strong pressure cooker. Cooks your food quickly and saves time.",
  },
  {
    id: 21,
    categoryId: "cooking",
    name: "Rice Cooker 1.8L",
    price: "₹3,600",
    numericPrice: 3600,
    image: riceCooker,
    badges: ["Promotion"],
    description:
      "Easy to use rice cooker. Makes perfect rice and steals vegetables too.",
  },
  {
    id: 22,
    categoryId: "cooking",
    name: "Microwave Oven 25L",
    price: "₹8,100",
    numericPrice: 8100,
    image: microwaveOven,
    badges: [],
    description:
      "Powerful microwave oven with many modes. Good for all types of cooking.",
  },
  {
    id: 23,
    categoryId: "cooking",
    name: "Ceramic Serving Dish",
    price: "₹4,680",
    numericPrice: 4680,
    image: productCookware,
    badges: [],
    description:
      "Beautiful ceramic dish for serving food. Safe for oven and looks great on the table.",
  },

  {
    id: 24,
    categoryId: "homedecor",
    name: "Flower Vase",
    price: "₹4,050",
    numericPrice: 4050,
    image: flowerVase,
    badges: ["New"],
    description:
      "Beautiful hand-painted vase for your flowers. Makes your room look great.",
  },
  {
    id: 25,
    categoryId: "homedecor",
    name: "Bamboo Floor Lamp",
    price: "₹11,700",
    numericPrice: 11700,
    image: lamp,
    badges: ["Customer favorite"],
    description:
      "Simple and elegant lamp made of bamboo. Gives a warm light to your home.",
  },
  {
    id: 26,
    categoryId: "homedecor",
    name: "Wall Mirror",
    price: "₹6,795",
    numericPrice: 6795,
    image: wallMirror,
    badges: [],
    description: "Round mirror for your wall. Adds a nice touch to any room.",
  },
  {
    id: 27,
    categoryId: "homedecor",
    name: "Wooden Wall Clock",
    price: "₹4,950",
    numericPrice: 4950,
    image: clock,
    badges: [],
    description:
      "Solid wooden clock that works quietly. Simple and elegant design.",
  },
  {
    id: 28,
    categoryId: "homedecor",
    name: "Side Table",
    price: "₹13,410",
    numericPrice: 13410,
    image: tableImg,
    badges: ["Promotion"],
    description:
      "Strong side table made of wood. Very useful for your living room or bedroom.",
  },
  {
    id: 29,
    categoryId: "homedecor",
    name: "Soft Sofa",
    price: "₹53,910",
    numericPrice: 53910,
    image: sofa,
    badges: ["Limited Edition"],
    description:
      "Very comfortable and soft sofa for your home. Made to last many years.",
  },
  {
    id: 30,
    categoryId: "homedecor",
    name: "Wall Art",
    price: "₹2,430",
    numericPrice: 2430,
    image: art,
    badges: [],
    description:
      "Beautiful wall art to decorate your home. High-quality print of plants.",
  },
  {
    id: 31,
    categoryId: "homedecor",
    name: "Soft Cotton Bedsheet Set",
    price: "₹3,600",
    numericPrice: 3600,
    image: bedsheet,
    badges: ["New"],
    description:
      "Soft and comfortable 100% cotton bedsheets for a good night sleep.",
  },
];

export const featuredHomepageProducts = [
  products.find((p) => p.id === 1), // CupEco – Ceramic Coffee Mug
  products.find((p) => p.id === 9), // AquaSip – Eco Bottle 1L
  products.find((p) => p.id === 24), // Decor – Handpainted Flower Vase
];

export const testimonials = [
  {
    id: 1,
    text: "The quality is simply unmatched. It feels great to use products that are good for the planet without sacrificing aesthetics.",
    author: "Jane Cooper",
    role: "Nutritionist",
    rating: 5,
  },
  {
    id: 2,
    text: "I replaced all my plastic containers with HomeDine's glass jars. My kitchen looks amazing and my food stays fresh longer.",
    author: "Robert Fox",
    role: "Home Chef",
    rating: 5,
  },
  {
    id: 3,
    text: "Beautiful design and truly sustainable. The wooden utensils have become my absolute favourite tools in the kitchen.",
    author: "Esther Howard",
    role: "Food Blogger",
    rating: 5,
  },
];

export const faqItems = [
  {
    id: "sustainability",
    title: "Sustainability at our core",
    content:
      "We use only ethically sourced, renewable materials like bamboo, recycled glass, and natural ceramics. Our entire supply chain minimises carbon footprint.",
  },
  {
    id: "quality",
    title: "Unrivalled quality",
    content:
      "Each piece is meticulously crafted to withstand daily use for years. The most sustainable product is one you never have to replace.",
  },
  {
    id: "variety",
    title: "Unmatched variety",
    content:
      "From essential cooking utensils to elegant home decor, our collection lets you build a completely eco-friendly home that matches your personal style.",
  },
  {
    id: "legacy",
    title: "Legacy of excellence",
    content:
      "With over a decade of experience in sustainable design, we continuously refine products based on customer feedback and material innovations.",
  },
];
