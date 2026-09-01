import type { TechStackKey } from "./techStack";

export interface Skill {
    techStack: TechStackKey;
    color: string;
}

export const skills: Skill[] = [
    {
        techStack: "laravel",
        color: "red"
    },
    {
        techStack: "tailwindcss",
        color: "cyan"
    },
    {
        techStack: "react",
        color: "sky"
    },
    {
        techStack: "nextjs",
        color: "neutral"
    },
    {
        techStack: "nestjs",
        color: "rose"
    },
    {
        techStack: "golang",
        color: "sky"
    },
];