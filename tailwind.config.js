/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,scss}"],
  theme: {
    extend: {
      backdropBlur: {
        'none': 'none',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      }
    },
  },
  variants: {
    extend: {
      backdropBlur: ['responsive', 'hover', 'focus'],
    },
  },
  corePlugins: {
    preflight:false
  },
  plugins: [
    function({ addUtilities, e, theme, variants }) {
      const backdropBlur = theme('backdropBlur', {});
      const backdropBlurUtilities = Object.keys(backdropBlur).map(key => {
        return {
          [`.${e(`backdrop-blur-${key}`)}`]: {
            'backdrop-filter': `blur(${backdropBlur[key]})`,
          },
        };
      });

      addUtilities(backdropBlurUtilities, variants('backdropBlur'));
    },
  
  ],
}

