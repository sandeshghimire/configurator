import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Tailwind CSS v4 uses CSS variables automatically
            // No need to explicitly define colors here as they're in globals.css
        },
    },
    plugins: [],
} satisfies Config;

export default config;
