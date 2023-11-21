module.exports = {
    'xs': {'max': '579.9px'},

    'sm': {'min':'580px', 'max': '767.9px'},
    // => @media (min-width: 640px and max-width: 767px) { ... }

    'md': {'min': '768px', 'max': '1023.9px'},
    // => @media (min-width: 768px and max-width: 1023px) { ... }

    'lg': {'min': '1024px', 'max': '1279.9px'},
    // => @media (min-width: 1024px and max-width: 1279px) { ... }

    'xl': {'min': '1280px', 'max': '1535.9px'},
    // => @media (min-width: 1280px and max-width: 1535px) { ... }

    '2xl': {'min': '1536px'},
    // => @media (min-width: 1536px) { ... }
};