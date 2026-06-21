export interface ProductVariant {
  id: string;
  weight: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  ingredients?: string;
  origin?: string;
  nutritionInfo: {
    servingSize: string;
    calories: string;
    protein: string;
    fat: string;
    carbs: string;
    fiber: string;
  };
  images: string[];
  categoryId: string;
  category: string;
  isBestseller: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isOrganic: boolean;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  weight: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  readTime: number;
  publishedAt: string;
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Almonds",
    slug: "almonds",
    description: "Premium quality almonds sourced from California and Kashmir",
    image: "https://images.unsplash.com/photo-1613255348581-8237e6f84503?w=400&h=500&fit=crop",
    productCount: 5,
  },
  {
    id: "2",
    name: "Cashews",
    slug: "cashews",
    description: "Creamy, crunchy cashews from Goa and Kerala",
    image: "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=400&h=500&fit=crop",
    productCount: 4,
  },
  {
    id: "3",
    name: "Walnuts",
    slug: "walnuts",
    description: "Brain-boosting walnuts from Kashmir and California",
    image: "https://images.unsplash.com/photo-1575481636764-7f226094aa96?w=400&h=500&fit=crop",
    productCount: 3,
  },
  {
    id: "4",
    name: "Pistachios",
    slug: "pistachios",
    description: "Vibrant green pistachios from Iran and California",
    image: "https://images.unsplash.com/photo-1525706040509-3e6a86e67a7c?w=400&h=500&fit=crop",
    productCount: 3,
  },
  {
    id: "5",
    name: "Raisins & Dates",
    slug: "raisins-dates",
    description: "Naturally sweet dried fruits from Afghanistan and the Middle East",
    image: "https://images.unsplash.com/photo-1596401057633-0f02cd18db7b?w=400&h=500&fit=crop",
    productCount: 4,
  },
  {
    id: "6",
    name: "Mixed & Gifts",
    slug: "mixed-gifts",
    description: "Curated assortments and festive gift boxes",
    image: "https://images.unsplash.com/photo-1604467707321-70c1b85d7cd5?w=400&h=500&fit=crop",
    productCount: 3,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Premium California Almonds",
    slug: "premium-california-almonds",
    description:
      "Our Premium California Almonds are hand-selected from the finest orchards in the Central Valley. These raw, unpasteurized almonds retain their maximum nutritional value with a delicate sweetness and satisfying crunch. Rich in vitamin E, magnesium, and healthy monounsaturated fats, they make the perfect snack or addition to your favorite recipes. Each batch is carefully inspected to ensure only the highest quality nuts reach your home.",
    ingredients: "100% Raw California Almonds",
    origin: "California, USA",
    nutritionInfo: {
      servingSize: "28g (about 23 almonds)",
      calories: "164 kcal",
      protein: "6g",
      fat: "14g",
      carbs: "6g",
      fiber: "3.5g",
    },
    images: [
      "https://images.unsplash.com/photo-1613255348581-8237e6f84503?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1623428067635-4a5a83945cec?w=800&h=600&fit=crop",
    ],
    categoryId: "1",
    category: "Almonds",
    isBestseller: true,
    isFeatured: true,
    isNew: false,
    isOrganic: true,
    rating: 4.9,
    reviewCount: 203,
    variants: [
      { id: "1a", weight: "250g", price: 249, compareAtPrice: 299, stock: 45 },
      { id: "1b", weight: "500g", price: 449, compareAtPrice: 549, stock: 32 },
      { id: "1c", weight: "1kg", price: 849, compareAtPrice: 999, stock: 18 },
    ],
  },
  {
    id: "2",
    name: "Organic Kashmiri Walnuts",
    slug: "organic-kashmiri-walnuts",
    description:
      "Sourced directly from the pristine valleys of Kashmir, these organic walnuts are nature's brain food. Each walnut is carefully cracked to preserve the beautiful halves inside. Known for their superior taste and higher omega-3 content compared to other varieties, Kashmiri walnuts have been prized for centuries. Their rich, earthy flavor makes them perfect for baking, salads, or simply enjoying as a wholesome snack.",
    ingredients: "100% Organic Kashmiri Walnuts",
    origin: "Kashmir, India",
    nutritionInfo: {
      servingSize: "28g (about 7 halves)",
      calories: "185 kcal",
      protein: "4.3g",
      fat: "18.5g",
      carbs: "3.9g",
      fiber: "1.9g",
    },
    images: [
      "https://images.unsplash.com/photo-1575481636764-7f226094aa96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599599810769-c09bdf02b426?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603408209093-cd3c2af497b3?w=800&h=600&fit=crop",
    ],
    categoryId: "3",
    category: "Walnuts",
    isBestseller: true,
    isFeatured: true,
    isNew: false,
    isOrganic: true,
    rating: 4.8,
    reviewCount: 147,
    variants: [
      { id: "2a", weight: "250g", price: 349, compareAtPrice: 419, stock: 28 },
      { id: "2b", weight: "500g", price: 649, compareAtPrice: 799, stock: 22 },
      { id: "2c", weight: "1kg", price: 1199, compareAtPrice: 1499, stock: 12 },
    ],
  },
  {
    id: "3",
    name: "Golden Afghan Raisins",
    slug: "golden-afghan-raisins",
    description:
      "These plump, sun-dried Golden Afghan Raisins are a testament to centuries of traditional drying techniques. Grown in the fertile valleys of Afghanistan and dried naturally under the warm sun, they retain an unmatched sweetness and soft texture. Unlike conventional raisins, our Afghan variety has a distinctive golden hue and a more complex, honey-like flavor profile. Perfect for baking, adding to cereals, or enjoying as nature's candy.",
    ingredients: "100% Sun-Dried Afghan Raisins",
    origin: "Afghanistan",
    nutritionInfo: {
      servingSize: "40g",
      calories: "120 kcal",
      protein: "1g",
      fat: "0.2g",
      carbs: "31g",
      fiber: "1.5g",
    },
    images: [
      "https://images.unsplash.com/photo-1596401057633-0f02cd18db7b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1590548020477-a700846b4443?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1537640538965-17506cca5b85?w=800&h=600&fit=crop",
    ],
    categoryId: "5",
    category: "Raisins & Dates",
    isBestseller: false,
    isFeatured: false,
    isNew: true,
    isOrganic: false,
    rating: 4.7,
    reviewCount: 89,
    variants: [
      { id: "3a", weight: "250g", price: 149, compareAtPrice: 179, stock: 55 },
      { id: "3b", weight: "500g", price: 279, compareAtPrice: 349, stock: 40 },
      { id: "3c", weight: "1kg", price: 499, compareAtPrice: 649, stock: 25 },
    ],
  },
  {
    id: "4",
    name: "Royal Mixed Dry Fruits Box",
    slug: "royal-mixed-dry-fruits-box",
    description:
      "The Royal Mixed Dry Fruits Box is our signature gift collection, carefully curated to offer the finest selection of premium dry fruits. Each box contains a generous assortment of California almonds, Kashmiri walnuts, Goan cashews, Iranian pistachios, golden raisins, and premium dates. Beautifully packaged in an elegant gift box with golden accents, it's the perfect present for Diwali, weddings, corporate gifting, or any special occasion.",
    ingredients: "California Almonds, Kashmiri Walnuts, Goan Cashews, Iranian Pistachios, Golden Raisins, Premium Dates",
    origin: "Multiple Origins",
    nutritionInfo: {
      servingSize: "30g",
      calories: "175 kcal",
      protein: "5g",
      fat: "13g",
      carbs: "12g",
      fiber: "2.5g",
    },
    images: [
      "https://images.unsplash.com/photo-1604467707321-70c1b85d7cd5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596386461350-326256694e69?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606923829579-0cb9d4d9b0?w=800&h=600&fit=crop",
    ],
    categoryId: "6",
    category: "Mixed & Gifts",
    isBestseller: true,
    isFeatured: true,
    isNew: false,
    isOrganic: false,
    rating: 4.9,
    reviewCount: 312,
    variants: [
      { id: "4a", weight: "500g", price: 899, compareAtPrice: 1099, stock: 20 },
      { id: "4b", weight: "1kg", price: 1699, compareAtPrice: 1999, stock: 15 },
    ],
  },
  {
    id: "5",
    name: "Premium Goan Cashews",
    slug: "premium-goan-cashews",
    description:
      "Our Premium Goan Cashews are the finest W320 grade, known for their perfect balance of creaminess and crunch. Sourced directly from the cashew belt of Goa and Kerala, these whole cashews are carefully roasted to bring out their natural buttery flavor. Cashews are rich in heart-healthy fats, plant protein, and essential minerals like copper and magnesium. Enjoy them as a luxurious snack or add them to curries, desserts, and stir-fries.",
    ingredients: "100% Premium Goan Cashews (W320)",
    origin: "Goa & Kerala, India",
    nutritionInfo: {
      servingSize: "28g (about 18 cashews)",
      calories: "157 kcal",
      protein: "5.2g",
      fat: "12.4g",
      carbs: "8.6g",
      fiber: "0.9g",
    },
    images: [
      "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1600189020840-e9918c25268d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616680213665-4e7c5c15ebac?w=800&h=600&fit=crop",
    ],
    categoryId: "2",
    category: "Cashews",
    isBestseller: true,
    isFeatured: false,
    isNew: false,
    isOrganic: true,
    rating: 4.8,
    reviewCount: 178,
    variants: [
      { id: "5a", weight: "250g", price: 349, compareAtPrice: 419, stock: 38 },
      { id: "5b", weight: "500g", price: 649, compareAtPrice: 799, stock: 25 },
      { id: "5c", weight: "1kg", price: 1199, compareAtPrice: 1499, stock: 14 },
    ],
  },
  {
    id: "6",
    name: "Iranian Pistachios",
    slug: "iranian-pistachios",
    description:
      "Our Iranian Pistachios are the prized Akbari variety, renowned for their extra-large size and vibrant green kernel. Sourced from the legendary pistachio orchards of Iran, these nuts offer an incomparable rich, slightly sweet flavor with a satisfying crunch. Pistachios are one of the most nutrient-dense nuts, packed with antioxidants, protein, and fiber. They're perfect for snacking, garnishing desserts, or adding a touch of luxury to your favorite dishes.",
    ingredients: "100% Iranian Pistachios (Akbari)",
    origin: "Iran",
    nutritionInfo: {
      servingSize: "28g (about 49 kernels)",
      calories: "159 kcal",
      protein: "6g",
      fat: "13g",
      carbs: "8g",
      fiber: "3g",
    },
    images: [
      "https://images.unsplash.com/photo-1525706040509-3e6a86e67a7c?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1498594645872-1f3d0c7cf1c6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=800&h=600&fit=crop",
    ],
    categoryId: "4",
    category: "Pistachios",
    isBestseller: false,
    isFeatured: false,
    isNew: false,
    isOrganic: false,
    rating: 4.7,
    reviewCount: 96,
    variants: [
      { id: "6a", weight: "250g", price: 449, compareAtPrice: 529, stock: 30 },
      { id: "6b", weight: "500g", price: 849, compareAtPrice: 999, stock: 20 },
      { id: "6c", weight: "1kg", price: 1599, compareAtPrice: 1899, stock: 10 },
    ],
  },
  {
    id: "7",
    name: "Premium Medjool Dates",
    slug: "premium-medjool-dates",
    description:
      "Known as the 'King of Dates,' our Premium Medjool Dates are nature's caramel. These large, plump dates have a rich, sweet flavor and a soft, creamy texture that melts in your mouth. Grown in the date palm groves of the Middle East, each date is hand-picked at peak ripeness. Medjool dates are an excellent natural sweetener, rich in fiber, potassium, and antioxidants. Perfect for energy balls, smoothies, or a healthy dessert alternative.",
    ingredients: "100% Premium Medjool Dates",
    origin: "Middle East",
    nutritionInfo: {
      servingSize: "24g (1 date)",
      calories: "66 kcal",
      protein: "0.4g",
      fat: "0g",
      carbs: "18g",
      fiber: "1.6g",
    },
    images: [
      "https://images.unsplash.com/photo-1606923829579-0cb9d4d9b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596386461350-326256694e69?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1613758235402-74576631d367?w=800&h=600&fit=crop",
    ],
    categoryId: "5",
    category: "Raisins & Dates",
    isBestseller: false,
    isFeatured: true,
    isNew: false,
    isOrganic: true,
    rating: 4.8,
    reviewCount: 134,
    variants: [
      { id: "7a", weight: "250g", price: 199, compareAtPrice: 249, stock: 42 },
      { id: "7b", weight: "500g", price: 379, compareAtPrice: 469, stock: 30 },
      { id: "7c", weight: "1kg", price: 699, compareAtPrice: 899, stock: 18 },
    ],
  },
  {
    id: "8",
    name: "Raw Pumpkin Seeds",
    slug: "raw-pumpkin-seeds",
    description:
      "Our Raw Pumpkin Seeds, also known as pepitas, are a nutritional powerhouse packed into a tiny package. These flat, green seeds are rich in magnesium, zinc, iron, and plant-based protein. With a mild, nutty flavor and pleasant crunch, they're incredibly versatile—sprinkle on salads, blend into smoothies, or roast with your favorite spices for a healthy snack. A true superfood for the health-conscious.",
    ingredients: "100% Raw Pumpkin Seeds",
    origin: "India",
    nutritionInfo: {
      servingSize: "28g",
      calories: "151 kcal",
      protein: "7g",
      fat: "13g",
      carbs: "5g",
      fiber: "1.7g",
    },
    images: [
      "https://images.unsplash.com/photo-1606923829579-0cb9d4d9b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1623428067635-4a5a83945cec?w=800&h=600&fit=crop",
    ],
    categoryId: "2",
    category: "Cashews",
    isBestseller: false,
    isFeatured: false,
    isNew: true,
    isOrganic: true,
    rating: 4.6,
    reviewCount: 67,
    variants: [
      { id: "8a", weight: "250g", price: 179, compareAtPrice: 219, stock: 50 },
      { id: "8b", weight: "500g", price: 329, compareAtPrice: 419, stock: 35 },
      { id: "8c", weight: "1kg", price: 599, compareAtPrice: 799, stock: 20 },
    ],
  },
  {
    id: "9",
    name: "Festive Diwali Gift Hamper",
    slug: "festive-diwali-gift-hamper",
    description:
      "Celebrate the festival of lights with our exquisite Festive Diwali Gift Hamper. This luxurious gift box includes a curated selection of our finest dry fruits: Premium California Almonds (200g), Organic Kashmiri Walnuts (200g), Premium Goan Cashews (200g), Iranian Pistachios (200g), Golden Afghan Raisins (200g), and Premium Medjool Dates (200g). All beautifully arranged in a handcrafted box with traditional Indian design elements and a personalized greeting card.",
    ingredients: "California Almonds, Kashmiri Walnuts, Goan Cashews, Iranian Pistachios, Afghan Raisins, Medjool Dates",
    origin: "Multiple Origins",
    nutritionInfo: {
      servingSize: "30g",
      calories: "170 kcal",
      protein: "5g",
      fat: "13g",
      carbs: "11g",
      fiber: "2g",
    },
    images: [
      "https://images.unsplash.com/photo-1604467707321-70c1b85d7cd5?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596386461350-326256694e69?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1606923829579-0cb9d4d9b0?w=800&h=600&fit=crop",
    ],
    categoryId: "6",
    category: "Mixed & Gifts",
    isBestseller: false,
    isFeatured: true,
    isNew: true,
    isOrganic: false,
    rating: 4.9,
    reviewCount: 87,
    variants: [
      { id: "9a", weight: "1.2kg", price: 2499, compareAtPrice: 2999, stock: 12 },
    ],
  },
  {
    id: "10",
    name: "Salted Roasted Cashews",
    slug: "salted-roasted-cashews",
    description:
      "Our Salted Roasted Cashews are roasted to golden perfection in small batches and lightly seasoned with Himalayan pink salt. The slow-roasting process brings out the natural sweetness and creates an irresistible crunchy texture. These make the ultimate party snack or a sophisticated addition to your charcuterie board. Once you start, you won't be able to stop!",
    ingredients: "Cashews, Himalayan Pink Salt, Vegetable Oil",
    origin: "Goa, India",
    nutritionInfo: {
      servingSize: "28g",
      calories: "163 kcal",
      protein: "4.3g",
      fat: "13.2g",
      carbs: "8.6g",
      fiber: "0.9g",
    },
    images: [
      "https://images.unsplash.com/photo-1600189020840-e9918c25268d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1616680213665-4e7c5c15ebac?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599599810694-b5b37304c041?w=800&h=600&fit=crop",
    ],
    categoryId: "2",
    category: "Cashews",
    isBestseller: false,
    isFeatured: false,
    isNew: false,
    isOrganic: false,
    rating: 4.7,
    reviewCount: 112,
    variants: [
      { id: "10a", weight: "250g", price: 299, compareAtPrice: 349, stock: 40 },
      { id: "10b", weight: "500g", price: 549, compareAtPrice: 649, stock: 28 },
      { id: "10c", weight: "1kg", price: 999, compareAtPrice: 1199, stock: 15 },
    ],
  },
  {
    id: "11",
    name: "California Walnut Halves",
    slug: "california-walnut-halves",
    description:
      "Our California Walnut Halves are carefully selected for their size, color, and freshness. These premium-grade halves are perfect for baking, cooking, or topping your morning oatmeal. Walnuts are the only nut significantly high in omega-3 ALA fatty acids, making them exceptional for heart and brain health. Their mild, earthy flavor pairs beautifully with both sweet and savory dishes.",
    ingredients: "100% California Walnut Halves",
    origin: "California, USA",
    nutritionInfo: {
      servingSize: "28g",
      calories: "185 kcal",
      protein: "4.3g",
      fat: "18.5g",
      carbs: "3.9g",
      fiber: "1.9g",
    },
    images: [
      "https://images.unsplash.com/photo-1603408209093-cd3c2af497b3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1575481636764-7f226094aa96?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1599599810769-c09bdf02b426?w=800&h=600&fit=crop",
    ],
    categoryId: "3",
    category: "Walnuts",
    isBestseller: false,
    isFeatured: false,
    isNew: true,
    isOrganic: false,
    rating: 4.6,
    reviewCount: 78,
    variants: [
      { id: "11a", weight: "250g", price: 329, compareAtPrice: 389, stock: 35 },
      { id: "11b", weight: "500g", price: 599, compareAtPrice: 749, stock: 22 },
      { id: "11c", weight: "1kg", price: 1099, compareAtPrice: 1399, stock: 14 },
    ],
  },
  {
    id: "12",
    name: "Mixed Nut Trail Pack",
    slug: "mixed-nut-trail-pack",
    description:
      "Our Mixed Nut Trail Pack is the ultimate on-the-go snack for health-conscious individuals. A perfectly balanced blend of roasted almonds, cashews, walnuts, and pistachios with a touch of dried cranberries for a sweet-tart contrast. No added oils, no preservatives—just pure, wholesome goodness in a resealable pack that keeps your snacks fresh wherever you go.",
    ingredients: "Roasted Almonds, Cashews, Walnuts, Pistachios, Dried Cranberries",
    origin: "Mixed Origins",
    nutritionInfo: {
      servingSize: "30g",
      calories: "178 kcal",
      protein: "5.5g",
      fat: "14g",
      carbs: "10g",
      fiber: "2g",
    },
    images: [
      "https://images.unsplash.com/photo-1606923829579-0cb9d4d9b0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1604467707321-70c1b85d7cd5?w=800&h=600&fit=crop",
    ],
    categoryId: "6",
    category: "Mixed & Gifts",
    isBestseller: true,
    isFeatured: false,
    isNew: false,
    isOrganic: false,
    rating: 4.8,
    reviewCount: 156,
    variants: [
      { id: "12a", weight: "250g", price: 279, compareAtPrice: 349, stock: 33 },
      { id: "12b", weight: "500g", price: 499, compareAtPrice: 629, stock: 24 },
      { id: "12c", weight: "1kg", price: 899, compareAtPrice: 1199, stock: 16 },
    ],
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The quality of Divya's walnuts is unmatched. I've been ordering for 2 years and every batch is fresh, crunchy, and perfectly flavored. My family's favorite!",
    author: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
  },
  {
    id: 2,
    quote: "Finally found a brand that truly delivers organic dry fruits. The almonds are consistently fresh and the packaging keeps them that way. Highly recommended.",
    author: "Rajesh Patel",
    location: "Ahmedabad",
    rating: 5,
  },
  {
    id: 3,
    quote: "The Royal Mixed Box was a hit at Diwali! Beautiful packaging and premium quality nuts. Will definitely be gifting these every year.",
    author: "Ananya Gupta",
    location: "Delhi",
    rating: 5,
  },
  {
    id: 4,
    quote: "As a nutritionist, I recommend Divya Dry Fruits to all my clients. The purity and nutritional value are evident in every bite.",
    author: "Dr. Sneha Reddy",
    location: "Bangalore",
    rating: 5,
  },
  {
    id: 5,
    quote: "Fast delivery, excellent quality, and the prices are fair for organic products. The cashews are the best I've ever had!",
    author: "Vikram Malhotra",
    location: "Pune",
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "health-benefits-of-almonds",
    title: "10 Amazing Health Benefits of Almonds You Need to Know",
    excerpt: "Discover why almonds are called a superfood and how they can transform your health with just a handful a day.",
    content: "Almonds are one of the most nutrient-dense nuts on the planet. Packed with vitamin E, magnesium, protein, and healthy fats, they offer numerous health benefits...",
    image: "https://images.unsplash.com/photo-1613255348581-8237e6f84503?w=800&h=500&fit=crop",
    category: "Health",
    author: "Divya Nutrition Team",
    readTime: 5,
    publishedAt: "2025-12-15",
  },
  {
    id: "2",
    slug: "why-organic-dry-fruits-matter",
    title: "Why Organic Dry Fruits Matter for Your Family's Health",
    excerpt: "Learn about the difference between organic and conventional dry fruits and why choosing organic makes a real impact.",
    content: "When you choose organic dry fruits, you're not just making a healthier choice for yourself...",
    image: "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=800&h=500&fit=crop",
    category: "Organic Living",
    author: "Dr. Sneha Reddy",
    readTime: 4,
    publishedAt: "2025-11-28",
  },
  {
    id: "3",
    slug: "dry-fruits-energy-balls-recipe",
    title: "No-Bake Dry Fruit Energy Balls Recipe",
    excerpt: "A simple, delicious recipe for homemade energy balls using premium dry fruits—perfect for a healthy snack.",
    content: "These no-bake energy balls are the perfect healthy snack...",
    image: "https://images.unsplash.com/photo-1604467707321-70c1b85d7cd5?w=800&h=500&fit=crop",
    category: "Recipes",
    author: "Chef Meera Kapoor",
    readTime: 3,
    publishedAt: "2025-11-10",
  },
  {
    id: "4",
    slug: "walnuts-for-brain-health",
    title: "Walnuts: Nature's Brain Food Backed by Science",
    excerpt: "Explore the scientific evidence behind walnuts' reputation as the ultimate brain-boosting snack.",
    content: "The distinctive shape of walnuts isn't the only thing that resembles the human brain...",
    image: "https://images.unsplash.com/photo-1575481636764-7f226094aa96?w=800&h=500&fit=crop",
    category: "Health",
    author: "Divya Nutrition Team",
    readTime: 6,
    publishedAt: "2025-10-22",
  },
  {
    id: "5",
    slug: "perfect-gift-guide-diwali",
    title: "The Perfect Dry Fruit Gift Guide for Diwali 2025",
    excerpt: "Make this Diwali special with our curated guide to choosing the perfect dry fruit gifts for everyone on your list.",
    content: "Diwali is the festival of lights, joy, and giving...",
    image: "https://images.unsplash.com/photo-1596386461350-326256694e69?w=800&h=500&fit=crop",
    category: "Gifting",
    author: "Divya Editorial Team",
    readTime: 4,
    publishedAt: "2025-10-05",
  },
  {
    id: "6",
    slug: "morning-routine-dry-fruits",
    title: "How to Include Dry Fruits in Your Morning Routine",
    excerpt: "Start your day with energy and nutrition by incorporating dry fruits into your morning meals.",
    content: "A healthy morning routine sets the tone for the entire day...",
    image: "https://images.unsplash.com/photo-1606923829579-0cb9d4d9b0?w=800&h=500&fit=crop",
    category: "Wellness",
    author: "Divya Wellness Team",
    readTime: 5,
    publishedAt: "2025-09-18",
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((p) => p.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter((p) => {
    const cat = categories.find((c) => c.slug === categorySlug);
    return cat ? p.categoryId === cat.id : false;
  });
};

export const getRelatedProducts = (productId: string, limit = 4): Product[] => {
  const product = products.find((p) => p.id === productId);
  if (!product) return products.slice(0, limit);
  return products
    .filter((p) => p.id !== productId && p.categoryId === product.categoryId)
    .slice(0, limit);
};
