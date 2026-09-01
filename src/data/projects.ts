import type { TechStackKey } from "./techStack";
import laravelDashboardTemplateImage from "../assets/images/projects/Laravel Dashboard Template.webp";
import amAgendaPembelajaranHarianImage from "../assets/images/projects/AM Agenda Pembelajaran Harian.webp";
import adventureOutImage from "../assets/images/projects/AdventureOut.webp";
import eStoreImage from "../assets/images/projects/E-Store.webp";
import restaurantReservationImage from "../assets/images/projects/Restaurant Reservation.webp";

export interface Project {
    title: string;
    url?: string;
    image: string;
    date: string;
    category: string;
    description: string;
    techStack: TechStackKey[];
}

export const projects: Project[] = [
    {
        title: "Laravel Dashboard Template",
        url: "https://github.com/alfreezzz/laravel-dashboard-template",
        image: laravelDashboardTemplateImage,
        date: "2026 April",
        category: "Web app",
        description:
        "Laravel-based dashboard template designed to help you quickly start building modern admin panels and data-driven applications.",
        techStack: ["laravel", "tailwindcss", "alpinejs", "mysql"],
    },
    {
        title: "AM Agenda Pembelajaran Harian",
        url: "https://github.com/alfreezzz/AM1_AGENDA",
        image: amAgendaPembelajaranHarianImage,
        date: "2025 May",
        category: "Web app",
        description:
        "AM Agenda Pembelajaran Harian, was created to make it easier for Amaliah Ciawi Vocational School's teachers and students to manage attendance.",
        techStack: ["laravel", "tailwindcss", "alpinejs", "mysql"],
    },
    {
        title: "AdventureOut",
        url: "https://alfreezzz.github.io/outbound-react-and-tailwind-css/",
        image: adventureOutImage,
        date: "2025 April",
        category: "Web app",
        description:
        "Outbound website, made for information about activities, packages, and promotions.",
        techStack: ["react", "tailwindcss"],
    },
    {
        title: "E-Store",
        url: "https://www.figma.com/proto/FjOuIRPRoaJe8Id7DoIrBK/devOps?node-id=22-31&p=f&t=lFsNJrbsmuO0yBEY-1&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=22%3A31",
        image: eStoreImage,
        date: "2024 July",
        category: "UI/UX",
        description:
        "UI/UX design for E-Commerce web interface.",
        techStack: ["figma"],
    },
    {
        title: "Restaurant Reservation",
        image: restaurantReservationImage,
        date: "2024 June",
        category: "Web app",
        description:
        "Alam Sunda reservation website, made for table reservations and ordering food online.",
        techStack: ["php", "css", "javascript", "mysql"],
    },
];