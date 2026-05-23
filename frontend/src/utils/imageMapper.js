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

const imageMap = {
  "coffee-mug.webp": coffeeMug,
  "dinner-plate.webp": dinnerPlate,
  "dinner-set.webp": dinnerSet,
  "soup-bowl.webp": soupBowl,
  "product-bowl.jpg": productBowl,
  "fork-spoon.jpg": forkSpoon,
  "spoon.webp": spoonImg,
  "product-utensils.jpg": productUtensils,
  "water-bottle.webp": waterBottle,
  "water-bottle1.webp": waterBottle1,
  "water-bottle2.webp": waterBottle2,
  "water-bottle3.jpeg": waterBottle3,
  "glass.jpg": glassImg,
  "product-glassjars.jpg": productGlassjars,
  "product-bottle.jpg": productBottle,
  "product-kettle.jpg": productKettle,
  "fry-pan.jpg": fryPan,
  "tawa.jpg": tawa,
  "roti-maker.jpg": rotiMaker,
  "cooker.jpg": cooker,
  "rice-cooker.jpg": riceCooker,
  "microwave oven.jpg": microwaveOven,
  "product-cookware.jpg": productCookware,
  "flower-vase.jpg": flowerVase,
  "lamp.jpg": lamp,
  "wall-mirror.jpg": wallMirror,
  "clock.jpg": clock,
  "table.jpg": tableImg,
  "sofa.jpg": sofa,
  "art.jpg": art,
  "bedsheet.jpg": bedsheet,
};

const nameMap = {
  "ceramic coffee mug": coffeeMug,
  "bamboo dinner plate": dinnerPlate,
  "artisan dinner set": dinnerSet,
  "organic soup bowl": soupBowl,
  "natural serving bowl": productBowl,
  "fork & spoon set": forkSpoon,
  "bamboo stirring spoon": spoonImg,
  "kitchen utensil set": productUtensils,
  "eco bottle 1l": waterBottle,
  "insulated sport bottle": waterBottle1,
  "stainless steel bottle": waterBottle2,
  "premium glass bottle": waterBottle3,
  "crystal drinking glass": glassImg,
  "glass storage jar set": productGlassjars,
  "bamboo fibre bottle": productBottle,
  "stainless kettle 1.5l": productKettle,
  "cast iron fry pan": fryPan,
  "ceramic non-stick tawa": tawa,
  "roti maker electric": rotiMaker,
  "pressure cooker 5l": cooker,
  "rice cooker 1.8l": riceCooker,
  "microwave oven 25l": microwaveOven,
  "ceramic casserole dish": productCookware,
  "handpainted flower vase": flowerVase,
  "bamboo floor lamp": lamp,
  "rattan wall mirror": wallMirror,
  "wooden wall clock": clock,
  "reclaimed wood side table": tableImg,
  "linen & oak sofa": sofa,
  "botanical wall art print": art,
  "luxury bedsheet set": bedsheet,
};

const normalize = (str) => {
  if (!str) return "";
  return str
    .toLowerCase()
    .replace(/[–—-]/g, " ")
    .replace(/[^a-z0-9\s&]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export const getProductImage = (imagePath, productName) => {
  if (productName) {
    const normalizedName = normalize(productName);
    for (const [key, value] of Object.entries(nameMap)) {
      if (normalizedName.includes(key)) {
        return value;
      }
    }
  }

  if (imagePath && typeof imagePath === "string") {
    const filename = imagePath.split("/").pop().toLowerCase();
    if (imageMap[filename]) {
      return imageMap[filename];
    }
  }

  if (productName) {
    const lowerName = productName.toLowerCase();
    if (lowerName.includes("mug") || lowerName.includes("cup"))
      return coffeeMug;
    if (lowerName.includes("bottle")) return waterBottle;
    if (lowerName.includes("plate")) return dinnerPlate;
    if (lowerName.includes("bowl")) return soupBowl;
    if (lowerName.includes("pan") || lowerName.includes("tawa")) return fryPan;
    if (lowerName.includes("lamp")) return lamp;
    if (lowerName.includes("sofa")) return sofa;
    if (lowerName.includes("vase") || lowerName.includes("flower"))
      return flowerVase;
    if (lowerName.includes("mirror")) return wallMirror;
    if (lowerName.includes("clock")) return clock;
    if (lowerName.includes("table")) return tableImg;
    if (lowerName.includes("art")) return art;
    if (lowerName.includes("bedsheet")) return bedsheet;
    if (
      lowerName.includes("spoon") ||
      lowerName.includes("fork") ||
      lowerName.includes("utensil")
    )
      return productUtensils;
    if (lowerName.includes("kettle")) return productKettle;
    if (lowerName.includes("cooker")) return cooker;
    if (lowerName.includes("oven")) return microwaveOven;
  }

  return coffeeMug;
};
