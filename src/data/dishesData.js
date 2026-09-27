export const CATEGORIES = [
  { id: 'all', label: 'All Delicacies', amharic: 'ሁሉም ምግቦች' },
  { id: 'wats', label: 'Traditional Wats', amharic: 'ወጦች' },
  { id: 'tibs', label: 'Sizzling Tibs', amharic: 'ጥብሶች' },
  { id: 'kitfo', label: 'Prime Kitfo', amharic: 'ክትፎ' },
  { id: 'fasting', label: 'Fasting & Vegan', amharic: 'የጾም ምግቦች' },
  { id: 'drinks', label: 'Tej & Buna', amharic: 'መጠጦችና ቡና' }
];

export const DISHES = [
  {
    id: 'doro-wat',
    title: 'Heritage Doro Wat',
    amharic: 'የሀገር ባህል ዶሮ ወጥ',
    category: 'wats',
    priceETB: 780,
    spiceLevel: 'Habesha Fire',
    spiceScore: 3,
    isFasting: false,
    isGlutenFree: true,
    isChefSpecial: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Doro_wat.jpg/800px-Doro_wat.jpg',
    description: 'Slow-simmered tender chicken leg gently cooked for 5 hours in caramelized red onions, spiced berbere, and herbal niter kibbeh butter, served with hard-boiled eggs and rolled teff injera.',
    ingredients: ['Free-range Chicken', 'Slow-Caramelized Shallots', 'Highland Berbere', 'Clarified Niter Kibbeh', 'Hard-Boiled Eggs', 'Garlic & Ginger']
  },
  {
    id: 'siga-derek-tibs',
    title: 'Siga Derek Tibs',
    amharic: 'የበሬ ደረቅ ጥብስ',
    category: 'tibs',
    priceETB: 690,
    spiceLevel: 'Medium',
    spiceScore: 2,
    isFasting: false,
    isGlutenFree: true,
    isChefSpecial: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Ethiopian_food_tibs.jpg/800px-Ethiopian_food_tibs.jpg',
    description: 'High-heat pan-charred prime beef tenderloin seasoned with mountain rosemary, sliced green chilies, red onions, and accompanied by awaze dipping sauce.',
    ingredients: ['Prime Beef Tenderloin', 'Fresh Rosemary', 'Sliced Jalapeños', 'Red Onions', 'Garlic Butter', 'Awaze Dip']
  },
  {
    id: 'full-vegan-beyaynetu',
    title: 'Grand Vegan Beyaynetu',
    amharic: 'ሙሉ የጾም በያይነቱ',
    category: 'fasting',
    priceETB: 580,
    spiceLevel: 'Mild to Medium',
    spiceScore: 1,
    isFasting: true,
    isGlutenFree: true,
    isChefSpecial: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Ethiopian_cuisine_at_Abyssinia%2C_Melbourne.jpg/800px-Ethiopian_cuisine_at_Abyssinia%2C_Melbourne.jpg',
    description: 'An expansive communal fasting feast on a wide injera canvas: Misir Wat (spicy lentils), Kik Alicha (yellow split peas), Gomen (braised collards), Shiro, Fasolia, and cold Timatim Fitfit.',
    ingredients: ['Red Lentils', 'Yellow Split Peas', 'Braised Highland Collards', 'Chickpea Flour Shiro', 'Carrots & Green Beans', '100% Teff Injera']
  },
  {
    id: 'shiro-tegamino',
    title: 'Shiro Tegamino in Clay Pot',
    amharic: 'ሽሮ ተጋሚኖ በሸክላ',
    category: 'fasting',
    priceETB: 420,
    spiceLevel: 'Medium',
    spiceScore: 2,
    isFasting: true,
    isGlutenFree: true,
    isChefSpecial: false,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Taita_and_shiro.jpg/800px-Taita_and_shiro.jpg',
    description: 'Bubbling chickpea and broad bean stew seasoned with minced garlic, ginger, and cardamom, served sizzling hot in a traditional earthenware tegamino.',
    ingredients: ['Ground Spiced Chickpeas', 'Sun-Dried Herbs', 'Shallots', 'Garlic', 'Jalapeño slices', 'Sunflower Oil']
  },
  {
    id: 'prime-beef-kitfo',
    title: 'Prime Highland Kitfo',
    amharic: 'ልዩ የጉራጌ ክትፎ',
    category: 'kitfo',
    priceETB: 740,
    spiceLevel: 'Habesha Fire',
    spiceScore: 3,
    isFasting: false,
    isGlutenFree: true,
    isChefSpecial: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Kitfo.jpg/800px-Kitfo.jpg',
    description: 'Gurage-style minced lean highland beef gently warmed with fragrant kardamom-infused niter kibbeh and fiery mitmita chili powder, served with fresh ayib cheese and gomen kitfo.',
    ingredients: ['Prime Lean Beef Mince', 'Koseret Spiced Clarified Butter', 'Mitmita Chili', 'Herbed Ayib (Farmer Cheese)', 'Steamed Collards']
  },
  {
    id: 'awaze-lamb-tibs',
    title: 'Awaze Highland Lamb Tibs',
    amharic: 'የበግ አዋዜ ጥብስ',
    category: 'tibs',
    priceETB: 720,
    spiceLevel: 'Habesha Fire',
    spiceScore: 3,
    isFasting: false,
    isGlutenFree: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'Tender diced Debre Berhan lamb seared with red shallots and finished in a glossy homemade spicy Awaze paste and clarified herb butter.',
    ingredients: ['Debre Berhan Lamb', 'Homemade Awaze Paste', 'Red Onions', 'Rosemary Sprigs', 'Niter Kibbeh']
  },
  {
    id: 'fresh-timatim-fitfit',
    title: 'Chilled Timatim Fitfit',
    amharic: 'ትኩስ ቲማቲም ፍትፍት',
    category: 'fasting',
    priceETB: 350,
    spiceLevel: 'Mild',
    spiceScore: 1,
    isFasting: true,
    isGlutenFree: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Refreshing salad of rolled, torn injera tossed in ripe diced plum tomatoes, crisp shallots, olive oil, and fiery minced green jalapeños.',
    ingredients: ['Cold Teff Injera Pieces', 'Plum Tomatoes', 'Shallots', 'Green Chilies', 'Lemon Juice & Olive Oil']
  },
  {
    id: 'house-tej-carafe',
    title: 'Artisanal Tej (Honey Wine)',
    amharic: 'የማር ጠጅ በበረሌ',
    category: 'drinks',
    priceETB: 320,
    spiceLevel: 'Sweet & Crisp',
    spiceScore: 0,
    isFasting: true,
    isGlutenFree: true,
    isChefSpecial: false,
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    description: 'Golden fermented Ethiopian honey wine brewed naturally with highland forest honey and gesho shrub leaves, poured in traditional round-bottom berele glass decanters.',
    ingredients: ['Raw Highland Honey', 'Fermented Gesho Leaves', 'Filtered Mountain Water']
  },
  {
    id: 'jebena-spiced-coffee',
    title: 'Sacred Jebena Buna Pot',
    amharic: 'የጀበና ቡና ስነ-ስርዓት',
    category: 'drinks',
    priceETB: 180,
    spiceLevel: 'Aromatic',
    spiceScore: 0,
    isFasting: true,
    isGlutenFree: true,
    isChefSpecial: true,
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ethiopian_coffee_ceremony.jpg/800px-Ethiopian_coffee_ceremony.jpg',
    description: 'Fresh Arabica coffee beans pan-roasted over hot coals, ground by mortar, and brewed three consecutive times (Awel, Bereka, Bereka) in a black clay Jebena pot with fresh rue herb and popcorn.',
    ingredients: ['Single-Origin Yirgacheffe Arabica Beans', 'Tenaadam (Rue Sprig)', 'Clay Pot Water', 'Popped Corn Kernels']
  }
];

export const BUNA_CEREMONY = {
  time: 'Daily at 4:00 PM',
  location: 'Central Bole Hearth, Mesob House',
  rounds: [
    { name: 'Awel (አወል)', desc: 'The first and strongest brew, representing vitality and deep conversation.' },
    { name: 'Kalei (ካሌይ)', desc: 'The second steeped pour, symbolizing nourishment and communal joy.' },
    { name: 'Bereka (በረካ)', desc: 'The final blessed pour, imparting tranquility and blessings on all guests.' }
  ]
};
