import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		typography: {
  			DEFAULT: {
  				css: {
  					color: '#ffffff',
  					h1: {
  						color: '#AAFFA9',
  						fontWeight: '700'
  					},
  					h2: {
  						color: '#AAFFA9',
  						fontWeight: '600'
  					},
  					blockquote: {
  						borderLeftColor: '#AAFFA9',
  						fontStyle: 'italic',
  						color: '#ccc'
  					},
  					strong: {
  						color: '#ffffff'
  					},
  					a: {
  						color: '#AAFFA9',
  						textDecoration: 'underline'
  					},
  					table: {
  						color: '#ffffff',
  						borderColor: '#ffffff'
  					},
  					th: {
  						color: '#ffffff'
  					},
  					td: {
  						color: '#ffffff'
  					},
  					thead: {
  						color: '#ffffff'
  					},
  					tbody: {
  						color: '#ffffff'
  					}
  				}
  			}
  		},
  	}
  },
  plugins: [typography],
};

export default config;
