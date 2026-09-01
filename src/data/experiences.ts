export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
}

export const experience: Experience[] = [
    {
        company: "PT Matik Creative Technology",
        position: "Full Stack Developer",
        startDate: "2025 July",
        endDate: "November",
        description: "During my internship as a Web Developer at PT Matik Creative Technology, I worked on tasks assigned by the project lead, primarily focusing on the development and improvement of dashboards for several applications. My responsibilities included implementing features based on given specifications, integrating APIs, optimizing data presentation, and ensuring smooth functionality of the dashboards. I collaborated with the development team to deliver maintainable, efficient, and user-friendly administrative interfaces in accordance with the company's standards.",
    },
    {
        company: "SMK Amaliah 1&2 Ciawi Bogor",
        position: "Back End Developer",
        startDate: "2024 October",
        endDate: "2025 June",
        description: "As a back-end developer for AM Agenda Pembelajaran Harian, I was responsible for designing and implementing the system architecture to ensure seamless attendance management for both teachers and students at Amaliah Ciawi Vocational School. I optimized database performance, and integrated authentication mechanisms to enhance user experience. Additionally, I contributed to the web interface, ensuring a responsive and user-friendly design that simplifies daily learning management for teachers.",
    }
];