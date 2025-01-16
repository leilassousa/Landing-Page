// products.js - Central source for all product data
export const products = [
    {
        id: 1,
        category: 'shoes',
        name: 'Penalty Max 1000 Locker Ecoknit Futsal Shoes',
        highlighted: true,
        price: 'request a quote',
        description: 'When it comes to perfect fit and ball touch, the Max 1000 Penalty Locker Ecoknit is the right product.',
        image: 'images/shoes/Max-1000/image1-max1000.png',
        variants: [
            {
                color: 'black', 
                size: '10'
            },
            {
                color: 'white', 
                size: '10'
            }
        ],
        features: [
            'FIFA Quality Pro certified',
            'Premium PU leather cover',
            'Butyl bladder for optimal air retention',
            'Thermal bonded seamless construction'
        ],
        details: [
            'Professional-grade synthetic upper',
            'Enhanced grip rubber outsole',
            'Reinforced heel counter for stability',
            'Breathable Ecoknit technology'
        ]
    },
    {
        id: 2,
        category: 'shoes',
        name: 'Penalty Max 500 Ecoknit Xxi',
        highlighted: true,
        price: 'request a quote',
        description: 'The Penalty Max 500 Ecoknit XXI Futsal Boot is designed for high-level indoor athletes.',
        image: 'images/shoes/Max-500/image1-max500.jpg',
        variants: [
            {
                color: 'black', 
                size: '10'
            },
            {
                color: 'blue', 
                size: '10'
            }
        ],
        features: [
            'Lightweight synthetic upper',
            'Reinforced heel counter',
            'Anti-slip insole',
            'Optimized stud configuration'
        ],
        details: [
            'Durable synthetic construction',
            'Precision-engineered grip pattern',
            'Impact-absorbing midsole',
            'Professional-grade lacing system'
        ]
    },
    {
        id: 3,
        category: 'shoes',
        name: 'Penalty Max 300 Y-1 Futsal',
        highlighted: false,
        price: 'request a quote',
        description: 'A high-performance option designed specifically for futsal players.',
        image: 'images/shoes/Max-300/image1-max300.png',
        variants: [
            {
                color: 'black', 
                size: '10'
            },
            {
                color: 'red', 
                size: '10'
            }
        ],
        features: [
            'Responsive cushioning system',
            'Durable rubber outsole',
            'Breathable mesh upper',
            'Enhanced ball control surface'
        ],
        details: [
            'Specialized futsal-specific design',
            'Non-marking sole technology',
            'Anatomical fit system',
            'Reinforced high-wear areas'
        ]
    },
    {
        id: 4,
        category: 'kids',
        name: 'Y-3 Penalty Rx Locker Kids Society',
        highlighted: true,
        price: 'request a quote',
        description: 'The ideal product for future stars to score a great goal',
        image: 'images/shoes/rx-society-kids/image1-rx-locker-kids.png',
        variants: [
            {
                color: 'black', 
                size: '5'
            },
            {
                color: 'blue', 
                size: '5'
            }
        ],
        features: [
            'Lightweight design for young players',
            'Extra ankle support',
            'Easy-to-use closure system',
            'Durable construction'
        ],
        details: [
            'Child-specific ergonomic design',
            'Non-marking sole',
            'Breathable materials',
            'Growth space consideration'
        ]
    },
    {
        id: 5,
        category: 'kids',
        name: 'Penalty Max 200 Kids Y-1 Futsal Shoes',
        highlighted: false,
        price: 'request a quote',
        description: 'The ideal product for future stars to score a great goal',
        image: 'images/shoes/Max-200-kids/image5-max-200-kids.png',
        variants: [
            {
                color: 'black', 
                size: '4'
            },
            {
                color: 'red', 
                size: '4'
            }
        ],
        features: [
            'Junior-specific cushioning',
            'Secure velcro closure',
            'Flexible sole design',
            'Reinforced toe area'
        ],
        details: [
            'Developed for growing feet',
            'Impact-absorbing insole',
            'Lightweight construction',
            'Easy-care materials'
        ]
    },
    {
        id: 6,
        category: 'shoes',
        name: 'Penalty Se7e Pro Futsal Shoes',
        highlighted: false,
        price: 'request a quote',
        description: 'Professional grade futsal shoes with enhanced grip and control',
        image: 'images/shoes/se7e-5000px/image1-se7e-pro.png',
        variants: [
            {
                color: 'black', 
                size: '10'
            },
            {
                color: 'white', 
                size: '10'
            }
        ],
        features: [
            'Professional-grade construction',
            'Enhanced grip technology',
            'Precision control surface',
            'Advanced cushioning system'
        ],
        details: [
            'Premium synthetic materials',
            'Specialized futsal outsole',
            'Anatomical support structure',
            'Professional-grade durability'
        ]
    },
    {
        id: 7,
        category: 'balls',
        name: 'Futsal Penalty Ball Rx 500 Xxiii',
        highlighted: false,
        price: 'request a quote',
        description: 'Professional futsal ball with optimal bounce and control characteristics',
        image: 'images/balls/max-500/image1-max-500.png',
        variants: [
            {
                color: 'white/blue',
                size: 'standard'
            }
        ],
        features: [
            'FIFA Quality Pro certified',
            'Controlled bounce technology',
            'Premium PU cover',
            'Precision-engineered panels'
        ],
        details: [
            'Professional match standard',
            'Optimal weight distribution',
            'Enhanced durability coating',
            'Competition-grade construction'
        ]
    },
    {
        id: 8,
        category: 'balls',
        name: 'Futsal Ball Penalty Max 1000 Xxiv',
        highlighted: true,
        price: 'request a quote',
        description: 'Top-tier professional futsal ball with exceptional control characteristics',
        image: 'images/balls/max-1000/image1-max-1000.png',
        variants: [
            {
                color: 'white/gold',
                size: 'standard'
            }
        ],
        features: [
            'FIFA Quality Pro certified',
            'Premium match ball standard',
            'Advanced panel technology',
            'Superior air retention'
        ],
        details: [
            'Professional competition ball',
            'Thermal bonded construction',
            'Ultra-responsive surface',
            'Maximum durability rating'
        ]
    },
    {
        id: 9,
        category: 'balls',
        name: 'Penalty Field Ball S11 R2 Xxiv',
        highlighted: false,
        price: 'request a quote',
        description: 'Professional field soccer ball designed for maximum performance',
        image: 'images/balls/s11-r2/image1-s11-r2.png',
        variants: [
            {
                color: 'white/black',
                size: 'standard'
            }
        ],
        features: [
            'FIFA Quality Pro certified',
            'All-weather performance',
            'Enhanced visibility design',
            'Professional match standard'
        ],
        details: [
            'Official match ball specification',
            'Advanced aerodynamic design',
            'Water-resistant technology',
            'Premium material construction'
        ]
    }
]; 