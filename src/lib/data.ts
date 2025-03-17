
// Mock data for the sustainable living app

// PMI Related Data
export const plasticUsageExamples = [
  { id: 1, name: 'Plastic Water Bottle', weight: 15, unit: 'grams', image: '/plastic-bottle.png' },
  { id: 2, name: 'Plastic Bag', weight: 5, unit: 'grams', image: '/plastic-bag.png' },
  { id: 3, name: 'Food Container', weight: 25, unit: 'grams', image: '/food-container.png' },
  { id: 4, name: 'Plastic Wrap', weight: 3, unit: 'grams', image: '/plastic-wrap.png' },
  { id: 5, name: 'Plastic Cutlery', weight: 6, unit: 'grams', image: '/plastic-cutlery.png' },
  { id: 6, name: 'Plastic Straw', weight: 0.5, unit: 'grams', image: '/plastic-straw.png' }
];

export const plasticAlternatives = [
  { 
    id: 1, 
    type: 'Plastic Bottle',
    alternatives: [
      { name: 'Stainless Steel Water Bottle', benefits: ['Durable', 'Reusable for years', 'No microplastics'] },
      { name: 'Glass Water Bottle', benefits: ['No chemical leaching', 'Recyclable', 'Pure taste'] }
    ]
  },
  { 
    id: 2, 
    type: 'Plastic Bag',
    alternatives: [
      { name: 'Cotton Tote Bag', benefits: ['Reusable hundreds of times', 'Washable', 'Biodegradable'] },
      { name: 'Jute Shopping Bag', benefits: ['Durable', 'Sustainable material', 'Biodegradable'] }
    ]
  },
  { 
    id: 3, 
    type: 'Food Packaging',
    alternatives: [
      { name: 'Beeswax Wraps', benefits: ['Reusable for up to a year', 'Biodegradable', 'Natural materials'] },
      { name: 'Silicone Food Pouches', benefits: ['Durable', 'Dishwasher safe', 'No single-use waste'] }
    ]
  }
];

// Mock PMI historical data
export const pmiHistoricalData = [
  { month: 'Jan', pmi: 78 },
  { month: 'Feb', pmi: 72 },
  { month: 'Mar', pmi: 65 },
  { month: 'Apr', pmi: 60 },
  { month: 'May', pmi: 63 },
  { month: 'Jun', pmi: 55 },
  { month: 'Jul', pmi: 48 },
  { month: 'Aug', pmi: 43 },
  { month: 'Sep', pmi: 40 }
];

// EV Related Data
export const evModels = [
  {
    id: 1,
    brand: 'Tata',
    model: 'Nexon EV',
    price: '₹14.99 Lakhs',
    range: '312 km',
    charging: '0-80% in 60 minutes',
    image: '/tata-nexon-ev.png',
    highlights: ['Affordable', 'Compact SUV', 'Made in India'],
    incentives: '₹1.5 Lakh subsidy in some states'
  },
  {
    id: 2,
    brand: 'Tata',
    model: 'Punch EV',
    price: '₹10.99 Lakhs',
    range: '250 km',
    charging: '0-80% in 55 minutes',
    image: '/tata-punch-ev.png',
    highlights: ['Entry-level EV', 'Compact design', 'Low running cost'],
    incentives: '₹1.5 Lakh subsidy in some states'
  },
  {
    id: 3,
    brand: 'MG',
    model: 'Comet EV',
    price: '₹7.98 Lakhs',
    range: '230 km',
    charging: '0-100% in 7 hours',
    image: '/mg-comet-ev.png',
    highlights: ['City commuter', 'Ultra compact', 'Lowest price point'],
    incentives: '₹1.5 Lakh subsidy in some states'
  },
  {
    id: 4,
    brand: 'Hyundai',
    model: 'Kona Electric',
    price: '₹23.79 Lakhs',
    range: '452 km',
    charging: '0-80% in 57 minutes',
    image: '/hyundai-kona-ev.png',
    highlights: ['Premium features', 'Long range', 'International design'],
    incentives: 'Free home charger installation'
  }
];

// Clean Energy Related Data
export const solarPanelOptions = [
  {
    id: 1,
    type: 'Monocrystalline',
    efficiency: '20-22%',
    lifespan: '25-30 years',
    cost: '₹40-50 per watt',
    bestFor: 'Limited roof space, efficiency-focused',
    image: '/mono-solar.png'
  },
  {
    id: 2,
    type: 'Polycrystalline',
    efficiency: '15-17%',
    lifespan: '23-27 years',
    cost: '₹35-40 per watt',
    bestFor: 'Budget-conscious, larger roof areas',
    image: '/poly-solar.png'
  },
  {
    id: 3,
    type: 'Thin Film',
    efficiency: '10-12%',
    lifespan: '15-20 years',
    cost: '₹30-35 per watt',
    bestFor: 'Flexible installation, less affected by high temps',
    image: '/thin-film-solar.png'
  }
];

export const roofGardenPlants = [
  {
    id: 1,
    name: 'Sedum',
    care: 'Low maintenance',
    benefits: ['Drought resistant', 'Insulation', 'Absorbs rainwater'],
    image: '/sedum-plant.png'
  },
  {
    id: 2,
    name: 'Lavender',
    care: 'Medium maintenance',
    benefits: ['Aromatic', 'Attracts pollinators', 'Drought tolerant'],
    image: '/lavender-plant.png'
  },
  {
    id: 3,
    name: 'Native Grasses',
    care: 'Low maintenance',
    benefits: ['Wind resistant', 'Biodiversity', 'Soil stabilization'],
    image: '/native-grass.png'
  },
  {
    id: 4,
    name: 'Herbs (Thyme, Rosemary)',
    care: 'Medium maintenance',
    benefits: ['Edible', 'Aromatic', 'Drought tolerant'],
    image: '/herbs.png'
  }
];

// Diet Carbon Footprint Data
export const foodCarbonFootprint = [
  {
    id: 1,
    type: 'Beef',
    emissions: 27,
    unit: 'kg CO2e per kg',
    alternatives: ['Chicken', 'Plant-based meat', 'Legumes'],
    image: '/beef.png'
  },
  {
    id: 2,
    type: 'Lamb',
    emissions: 25.8,
    unit: 'kg CO2e per kg',
    alternatives: ['Chicken', 'Turkey', 'Tofu'],
    image: '/lamb.png'
  },
  {
    id: 3,
    type: 'Cheese',
    emissions: 13.5,
    unit: 'kg CO2e per kg',
    alternatives: ['Plant-based cheese', 'Nutritional yeast', 'Hummus'],
    image: '/cheese.png'
  },
  {
    id: 4,
    type: 'Pork',
    emissions: 12.1,
    unit: 'kg CO2e per kg',
    alternatives: ['Chicken', 'Tempeh', 'Jackfruit'],
    image: '/pork.png'
  },
  {
    id: 5,
    type: 'Farmed Salmon',
    emissions: 11.9,
    unit: 'kg CO2e per kg',
    alternatives: ['Wild-caught local fish', 'Mussels', 'Plant-based fish'],
    image: '/salmon.png'
  },
  {
    id: 6,
    type: 'Turkey',
    emissions: 10.9,
    unit: 'kg CO2e per kg',
    alternatives: ['Chicken', 'Tofu', 'Seitan'],
    image: '/turkey.png'
  },
  {
    id: 7,
    type: 'Chicken',
    emissions: 6.9,
    unit: 'kg CO2e per kg',
    alternatives: ['Tofu', 'Tempeh', 'Legumes'],
    image: '/chicken.png'
  },
  {
    id: 8,
    type: 'Eggs',
    emissions: 4.8,
    unit: 'kg CO2e per kg',
    alternatives: ['Tofu', 'Chickpea flour', 'Flax seeds'],
    image: '/eggs.png'
  },
  {
    id: 9,
    type: 'Rice',
    emissions: 2.7,
    unit: 'kg CO2e per kg',
    alternatives: ['Quinoa', 'Millet', 'Barley'],
    image: '/rice.png'
  },
  {
    id: 10,
    type: 'Tofu',
    emissions: 2.0,
    unit: 'kg CO2e per kg',
    alternatives: ['Tempeh', 'Seitan', 'Legumes'],
    image: '/tofu.png'
  },
  {
    id: 11,
    type: 'Vegetables',
    emissions: 0.4,
    unit: 'kg CO2e per kg',
    alternatives: ['Local & seasonal vegetables'],
    image: '/vegetables.png'
  },
  {
    id: 12,
    type: 'Fruits',
    emissions: 0.4,
    unit: 'kg CO2e per kg',
    alternatives: ['Local & seasonal fruits'],
    image: '/fruits.png'
  },
  {
    id: 13,
    type: 'Legumes',
    emissions: 0.3,
    unit: 'kg CO2e per kg',
    alternatives: ['Varied types of beans and lentils'],
    image: '/legumes.png'
  },
  {
    id: 14,
    type: 'Nuts',
    emissions: 0.3,
    unit: 'kg CO2e per kg',
    alternatives: ['Varied nuts and seeds'],
    image: '/nuts.png'
  }
];

// Sample low-carbon recipes
export const lowCarbonRecipes = [
  {
    id: 1,
    name: 'Lentil Bolognese',
    ingredients: [
      '1 cup red lentils',
      '1 onion, diced',
      '2 carrots, diced',
      '2 celery stalks, diced',
      '3 garlic cloves, minced',
      '1 can (400g) diced tomatoes',
      '2 tbsp tomato paste',
      '1 tsp dried oregano',
      '1 tsp dried basil',
      'Salt and pepper to taste',
      'Whole grain pasta of choice'
    ],
    instructions: 'Sauté onions, carrots, celery, and garlic. Add lentils, tomatoes, paste, and herbs. Simmer for 25 minutes. Serve over pasta.',
    carbonFootprint: 'Very Low',
    image: '/lentil-bolognese.png'
  },
  {
    id: 2,
    name: 'Chickpea Curry',
    ingredients: [
      '2 cans chickpeas, drained',
      '1 onion, diced',
      '2 tbsp curry paste',
      '1 can coconut milk',
      '1 cup vegetable stock',
      '2 cups spinach',
      'Fresh cilantro',
      'Brown rice for serving'
    ],
    instructions: 'Sauté onion, add curry paste, chickpeas, coconut milk, and stock. Simmer for 15 minutes. Add spinach at the end. Serve with rice.',
    carbonFootprint: 'Low',
    image: '/chickpea-curry.png'
  }
];
