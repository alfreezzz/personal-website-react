import internshipCertificate from "../assets/files/certificates/Internship Certificate.pdf";
import introToSoftwareEngineering from "../assets/files/certificates/Intro to Software Engineering - RevoU.pdf";
import uiuxCompetition from "../assets/files/certificates/UI&UX Competition - Crowd IT.pdf";

export interface Certificate {
    name: string;
    issuer: string;
    startDate: string;
    endDate?: string;
    credentialId?: string;
    url: string;
}

export const certificate: Certificate[] = [
    {
        name: "Belajar Dasar Data Science",
        issuer: "Dicoding Indonesia",
        startDate: "2026 August",
        endDate: "2029 August",
        credentialId: "KEXLMG410ZG2",
        url: "https://www.dicoding.com/certificates/KEXLMG410ZG2"
    },
    {
        name: "EF SET English Certificate 62/100 (C1 Advanced)",
        issuer: "EF Standard English Test (EF SET)",
        startDate: "2026 April",
        url: "https://cert.efset.org/en/yquAtE"
    },
    {
        name: "Internship Certificate",
        issuer: "PT Matik Creative Technology",
        startDate: "2025 November",
        credentialId: "05/PKL/MATIK/XI/2025",
        url: internshipCertificate
    },
    {
        name: "Belajar Dasar AI",
        issuer: "Dicoding Indonesia",
        startDate: "2025 November",
        endDate: "2025 November",
        credentialId: "N9ZO2L0DRPG5",
        url: "https://www.dicoding.com/certificates/N9ZO2L0DRPG5"
    },
    {
        name: "Intro to Software Engineering",
        issuer: "RevoU",
        startDate: "2025 October",
        credentialId: "CCSE 271025-01-1-00033",
        url: introToSoftwareEngineering
    },
    {
        name: "UI & UX Competition",
        issuer: "Institut Bisnis dan Informatika Kesatuan",
        startDate: "2024 July",
        credentialId: "018/CIT/HIMA-TI/VII/2024",
        url: uiuxCompetition
    },
];