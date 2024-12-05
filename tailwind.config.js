/** @type {import('tailwindcss').Config} */module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        xs: { max: '639px' }, // Custom extra-small breakpoint for screens less than 640px
      },
      fontSize: {
        '5xl': '4.0rem',
        'sm': '1.7rem',
        'lg': '1.93rem',
        'xl': '2.575rem',
        'smButton': '1.5rem',
        'mdButton': '1rem',
        'lgButton': '1.5rem',
        'customSm': '0.85rem',
        'customXS1': '1.4rem',
        'customXS2': '1.95rem',
        'customXS3': '0.9rem',
        'customXS4': '0.85rem',
      },
      colors: {
        customYellow: '#FF4E50 ',
        customBlack: '#010101',
        bodyBlack: '#080808',

        navBarColor: '#121212',      /* Deep Black for Nav Bar */
        bodyColor: '#F5F5F5',       /* Off-White for Body */
        customGray: '#282828',       /* Custom Black for Text */
        darkGray: '#343a40', /* Vibrant Yellow for Highlighted Text */
        mutedTextColor: '#A4A4A4',  /* Cool Gray for Muted Text */
        linkColor: '#E1B12C', 
        'custom-red': 'rgba(255, 0, 0, 0.5)',
        /* Muted Gold for Links */
      },
      lineHeight: {
        custom: '0.9',   // Adding a new custom line height (1.75)
        relaxed: '0.3',  // Overriding Tailwind's 'relaxed' line height
      },
      zIndex: {
        '1': '1',
      },
      boxShadow: {
        'bottom': '0 5px 25px -20px rgba(0, 0, 0, 0.3)',
        'customYellowShadow': '0 5px 15px rgba(75, 0, 20, 0.5)',
        'customYellowCircleShadow': '0 5px 50px rgba(75, 0, 20, 0.7)',
        // Custom bottom-only shadow
      },
      padding: {
        '5p': '5%',     // 5% padding
        '10p': '15%',     // 5% padding
        '20p': '20%',   // 10% padding
        '30p': '30%',   // 15% padding
        '40p': '40%',   // 15% padding
        '50p': '50%',   // 15% padding
        '75p': '75%',    // 15% padding
        '80p': '80%',   // 15% padding
        '85p': '82%', // 15% padding
        '100p': '100%',
        'screen-50': '50vh',
        'screen-20': '20vh',
        'screen-15': '15vh',
        'screen-10': '10vh',   // 20% padding
      },
      backgroundImage: {
        'me-photo': "url('/assets/images/kmv.png')",
        'no-photo': "none",
      },
      width: {
        '25p': '25%',  // Custom width of 320 pixels
        'custom-2': '450px',  // Custom width of 450 pixels
        'custom-3': '600px',  // Custom width of 600 pixels
      },
      keyframes: {
        phpPercentage: {
          '0%': { width: '0' },
          '100%': { width: '50%' }, // Equivalent to w-96 in Tailwind
        },
        flutterPercentage: {
          '0%': { width: '0' },
          '100%': { width: '75%' },
        },
        sqlPercentage: {
          '0%': { width: '0' },
          '100%': { width: '25rem' },
        },
        cppPercentage: {
          '0%': { width: '0' },
          '100%': { width: '70%' }, // Equivalent to w-96 in Tailwind
        },
        expandFromCenter: {
          '0%': { width: '0' },
          '100%': { width: '100%' }, // Equivalent to w-96 in Tailwind
        },
        fadeIn: {
          '0%': { opacity: '0.25' },
          '100%': { opacity: '1' },
        },
        swipeDown: {
          '0%': {
            transform: 'translateY(-100%)', // Start above the viewport
            opacity: '0', // Fully transparent
          },
          '100%': {
            transform: 'translateY(0)', // End in its original position
            opacity: '1', // Fully opaque
          },
        },
      },
        animation: {
          phpPercentage: 'phpPercentage 5s ease-in-out forwards', // 1s duration, ease-in-out timing
          flutterPercentage: 'flutterPercentage 5s ease-in-out forwards',
          sqlPercentage: 'sqlPercentage 5s ease-in-out forwards',
          cppPercentage: 'cppPercentage 5s ease-in-out forwards',
          expandFromCenter: 'expandFromCenter 0.5s ease-in-out forwards',
          fadeIn: 'fadeIn 0.75s ease-in-out forwards', 
          swipeDown: 'swipeDown 0.5s ease-in-out forwards',

        },
      },
    },
    plugins: [],
  }