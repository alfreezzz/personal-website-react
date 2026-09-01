export interface TechStackItem {
    name: string;
    logo: string;
    type: "devicon" | "image";
}

export const techStackRegistry = {
    laravel: {
        name: "Laravel",
        logo: "devicon-laravel-original colored",
        type: "devicon",
    },
    tailwindcss: {
        name: "Tailwind CSS",
        logo: "devicon-tailwindcss-original colored",
        type: "devicon",
    },
    react: {
        name: "React",
        logo: "devicon-react-original colored",
        type: "devicon",
    },
    nextjs: {
        name: "Next.js",
        logo: "devicon-nextjs-plain",
        type: "devicon",
    },
    nestjs: {
        name: "NestJS",
        logo: "devicon-nestjs-original colored",
        type: "devicon",
    },
    golang: {
        name: "Golang",
        logo: "devicon-go-original-wordmark colored",
        type: "devicon",
    },
    mysql: {
        name: "MySQL",
        logo: "devicon-mysql-original colored",
        type: "devicon",
    },
    alpinejs: {
        name: "Alpine.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/alpinejs/alpinejs-original.svg",
        type: "image",
    },
    figma: {
        name: "Figma",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
        type: "image",
    },
    php: {
        name: "PHP",
        logo: "devicon-php-plain colored",
        type: "devicon",
    },
    css: {
        name: "CSS3",
        logo: "devicon-css3-plain colored",
        type: "devicon",
    },
    javascript: {
        name: "JavaScript",
        logo: "devicon-javascript-plain colored",
        type: "devicon",
    }
} as const satisfies Record<string, TechStackItem>;

export type TechStackKey = keyof typeof techStackRegistry;