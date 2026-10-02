/**
 * SOURCE UNIQUE DES DONNÉES DU PORTFOLIO
 *
 * Remplace projects.js et timelinePeriods.js (conservés tels quels dans ./legacy/ pour
 * la page /apr-oct25 et l'ancienne timeline).
 *
 * Modèle :
 *   periods     Les cycles de 6 mois (titre, résumé, points clés).
 *   categories  Les domaines de travail. layout = présentation dans l'ancienne page prod
 *               ('gallery' : galerie d'images, 'projects' : sous-sections texte).
 *   projects    UN projet = UNE entrée, même s'il s'étale sur plusieurs périodes.
 *     images    Visuels (src, + description/category facultatives si propres à l'image).
 *     phases    Une étape par période où le projet a avancé : { periodId, dates, description, tech, metrics }.
 *
 * Ajouter une période   -> une entrée dans "periods", puis des "phases" avec ce periodId.
 * Faire avancer un projet -> ajouter une phase avec le nouveau periodId à un projet existant.
 * Nouveau projet        -> une entrée dans "projects" (id unique, category = id de catégorie).
 */
import { Code, Palette, Languages, BarChart3 } from 'lucide-react';
import map1 from '../assets/map1.png';
import inventory from '../assets/inventory.png';
import directory from '../assets/directory.png';
import checkin from '../assets/checkin.png';
import agenda from '../assets/agenda.png';
import looker1 from '../assets/lookerStudio1.png';
import looker3 from '../assets/lookerStudio3.png';
import sheet1 from '../assets/sheet1.png';
import drive1 from '../assets/drive1.png';
import fourth2 from '../assets/fourth2.png';
import fourth1 from '../assets/fourth1.png';
import fourth3 from '../assets/fourth3.png';
import fourth4 from '../assets/fourth4.png';
import ci1 from '../assets/ci1.png';
import ci2 from '../assets/ci2.png';
import ci3 from '../assets/ci3.png';
import forum1 from '../assets/forum1.png';
import forum2 from '../assets/forum2.png';
import dw from '../assets/dw.png';
import giz from '../assets/giz.png';
import dipl1 from '../assets/dipl1.png';
import ngij1 from '../assets/ngij1.png';
import ngij2 from '../assets/ngij2.png';
import ngij3 from '../assets/ngij3.png';
import proj1 from '../assets/proj1.png';
import proj2 from '../assets/proj2.png';
import proj3 from '../assets/proj3.png';
import proj4 from '../assets/proj4.png';
import trombi from '../assets/trombi.png';
import table from '../assets/table.png';
import togo1 from '../assets/togo1.png';
import togo2 from '../assets/togo2.png';
import wameca from '../assets/wameca.png';
import webinar from '../assets/webinar.png';

export const periods = [
    {
        id: 0,
        title: 'Avril - Octobre 2025',
        subtitle: 'Fondations et Diversification',
        description: 'Premier semestre couvrant l\'intégration initiale à MFWA. Établissement des bases en développement digital, communication visuelle, traduction et analytics. Mise en place des outils numériques essentiels et des fondations pour les opérations.',
        summary: 'From April to October, my work at MFWA took me across diverse disciplines, from crafting digital solutions and designing compelling visual communication, to delivering precision in translation and content writing, all while managing great projects through analytics and strategic oversight. Each endeavor reflects a commitment to transforming ideas into impactful outcomes that enhance work life through digitalization.',
        startDate: 'Avril 2025',
        endDate: 'Octobre 2025',
        highlights: [
            'Mise en place de 6 outils numériques',
            '100+ articles traduits',
            '24+ rapports analytics générés',
        ],
    },
    {
        id: 1,
        title: 'Octobre 2025 - Avril 2026',
        subtitle: 'Approfondissement et Impact',
        description: 'Deuxième semestre marqué par l\'optimisation des systèmes existants et l\'expansion des capacités. Renforcement des métriques, amélioration de l\'efficacité organisationnelle et montée en expertise technique.',
        summary: 'From October to April, my mission at MFWA centered on two pillars: advancing the applications built in the first semester, and developing new platforms addressing specific digitalization needs. This period reflects a strategic focus on evolving existing solutions while creating innovative systems that transform how teams work, embedding digital transformation into the core of organizational processes.',
        startDate: 'Octobre 2025',
        endDate: 'Avril 2026',
        highlights: ['Optimisation des dashboards', 'Refactorisation des plateformes', 'Intégrations avancées'],
    },
];

export const categories = [
    { id: 'dev', title: 'Development & Digital', short: 'Development', layout: 'gallery', icon: Code, color: '#2C2C2C' },
    { id: 'analytics', title: 'Analytics & Project Management', short: 'Analytics', layout: 'projects', icon: BarChart3, color: '#9B8B7E' },
    { id: 'visual', title: 'Visual Communication', short: 'Visual', layout: 'gallery', icon: Palette, color: '#8B7355' },
    { id: 'translation', title: 'Translation & Writing', short: 'Translation', layout: 'projects', icon: Languages, color: '#6B5B4F' },
];

export const projects = [
    {
        id: 'interactive-data-visualization-map',
        category: 'dev',
        title: 'Interactive data visualization map',
        tag: 'Application',
        link: 'https://leaflet-map-sigma.vercel.app/',
        images: [
            { src: map1 },
        ],
        phases: [
            {
                periodId: 0,
                description: 'Dynamic mapping platform for West African media data visualization, with backend administration system',
            },
            {
                periodId: 1,
                dates: 'Octobre 2025 - Avril 2026',
                description: 'Plateforme de données médias pour l\'Afrique de l\'Ouest avec interface cartographique interactive.',
                tech: ['Frontend', 'Mapping', 'Data Management'],
                metrics: 'En optimisation pour SEO',
            },
        ],
    },
    {
        id: 'assets-management',
        category: 'dev',
        title: 'Assets management',
        tag: 'Application',
        link: 'https://inventory-app-two-sigma.vercel.app/',
        images: [
            { src: inventory },
        ],
        phases: [
            {
                periodId: 0,
                description: 'Management of furniture inventory and IT assets - This application provides comprehensive tracking and management of the organization"s furniture and IT equipment throughout their entire lifecycle. The system generates a unique QR code for each asset unit, which can be affixed directly to the item. By scanning this QR code, users can instantly access the complete history of the asset, including purchase information (acquisition date, supplier, cost), assignment details (current user, department, location), condition status, maintenance and repair history, and total cost of ownership. The system provides real-time, accurate data on the entire furniture and IT asset inventory, enabling instant visibility into asset availability and utilization, proactive maintenance planning, budget tracking and cost optimization, streamlined asset allocation and transfers, and automated reporting and compliance tracking.',
            },
        ],
    },
    {
        id: 'articles-catalog',
        category: 'dev',
        title: 'Articles catalog',
        tag: 'Application',
        link: 'https://mfwa-articles-directory.vercel.app/',
        images: [
            { src: directory },
        ],
        phases: [
            {
                periodId: 0,
                description: 'Comprehensive catalog of MFWA website articles with advanced search functionality',
            },
        ],
    },
    {
        id: 'registration-platform',
        category: 'dev',
        title: 'Registration platform',
        tag: 'Application',
        link: 'https://wameca-checkin.vercel.app/',
        images: [
            { src: checkin },
        ],
        phases: [
            {
                periodId: 0,
                description: 'Participant registration platform for events with real-time data visualization',
            },
        ],
    },
    {
        id: 'live-event-agenda',
        category: 'dev',
        title: 'Live event agenda',
        tag: 'Application',
        link: 'https://wameca-agenda.vercel.app/',
        images: [
            { src: agenda },
        ],
        phases: [
            { periodId: 0, description: 'Real-time schedule platform with QR code for events' },
        ],
    },
    {
        id: 'activity-tracker-platform',
        category: 'dev',
        title: 'Activity Tracker Platform',
        phases: [
            {
                periodId: 0,
                dates: 'Avril - Octobre 2025',
                description: 'Plateforme de suivi des activités internes avec gestion des données statiques et graphiques dynamiques.',
                tech: ['Tracking', 'Analytics', 'Dynamic Charts'],
                metrics: '5 modules en production',
            },
        ],
    },
    {
        id: 'memorial-website',
        category: 'dev',
        title: 'Memorial Website',
        phases: [
            {
                periodId: 1,
                dates: 'Octobre 2025 - Avril 2026',
                description: 'Plateforme de données sur les parcours de carrière des journalistes décédés en ligne du devoir.',
                tech: ['Frontend Design', 'Carte Interactive', 'Gestion de contenu'],
                metrics: '100+ journalistes documentés',
            },
        ],
    },
    {
        id: 'looker-studio-dashboard',
        category: 'analytics',
        title: 'Looker Studio Dashboard',
        link: 'https://lookerstudio.google.com/u/1/reporting/994c23fb-e32e-45ea-9863-4691340ed88d/page/6zXD',
        images: [
            {
                src: looker1,
                description: 'Linking data sheets to Looker Studio to visualize them interactively - This application seamlessly connects data sheets to Looker Studio, enabling dynamic and interactive visualization of key metrics and performance indicators. The system allows users to perform complex analysis of results through comprehensive data exploration, filtering, and comparison capabilities. Users can apply multiple filters to drill down into specific datasets, identify trends, and generate customized views tailored to their analytical needs. The application also enables the download of filtered data in various formats, making it easy to create detailed reports, share insights with stakeholders, and conduct further offline analysis. This integration transforms raw data into actionable intelligence through intuitive dashboards and real-time reporting.',
                category: 'Metrics',
            },
            {
                src: looker3,
                description: 'Linking data sheets to Looker Studio to visualize them interactively - This application seamlessly connects data sheets to Looker Studio, enabling dynamic and interactive visualization of key metrics and performance indicators. The system allows users to perform complex analysis of results through comprehensive data exploration, filtering, and comparison capabilities. Users can apply multiple filters to drill down into specific datasets, identify trends, and generate customized views tailored to their analytical needs. The application also enables the download of filtered data in various formats, making it easy to create detailed reports, share insights with stakeholders, and conduct further offline analysis. This integration transforms raw data into actionable intelligence through intuitive dashboards and real-time reporting.',
                category: 'Metrics',
            },
        ],
        phases: [
            {
                periodId: 0,
                dates: 'August 2025',
                description: 'Configuration of automated dashboards for real-time monitoring of communication metrics.',
                tech: ['Looker Studio', 'Google Sheets API', 'Data Studio'],
                metrics: 'Automated interactive dashboard',
            },
            {
                periodId: 1,
                dates: 'Août 2025',
                description: 'Configuration de dashboards automatisés pour le suivi en temps réel des métriques de communication.',
                tech: ['Looker Studio', 'Google Sheets API', 'Data Studio'],
                metrics: 'Dashboard interactif automatisé',
            },
        ],
    },
    {
        id: 'social-media-reports',
        category: 'analytics',
        title: 'Social Media Reports',
        images: [
            { src: sheet1, category: 'Analytics' },
        ],
        phases: [
            {
                periodId: 0,
                dates: 'April - October 2025',
                description: 'Detailed weekly and monthly performance reports on all social networks (Twitter, Facebook, LinkedIn).',
                tech: ['Excel', 'Analytics', 'Visualization'],
                metrics: '24+ reports produced',
            },
        ],
    },
    {
        id: 'google-drive-and-calendars-setup',
        category: 'analytics',
        title: 'Google Drive & Calendars Setup',
        images: [
            { src: drive1, category: 'Analytics' },
        ],
        phases: [
            {
                periodId: 0,
                dates: 'May - June 2025',
                description: 'Complete structuring and organization of shared Google Drive with permissions management. Setup and synchronization of shared calendars for team collaboration and scheduling.',
                tech: [
                    'Google Workspace',
                    'Google Drive',
                    'Google Calendar',
                    'Organization',
                    'Permissions',
                ],
                metrics: 'Fully structured system',
            },
        ],
    },
    {
        id: 'articles-metrics',
        category: 'analytics',
        title: 'Articles Metrics',
        link: 'https://lookerstudio.google.com/u/1/reporting/994c23fb-e32e-45ea-9863-4691340ed88d/page/p_mxyw8ocfvd',
        phases: [
            {
                periodId: 0,
                dates: 'April - October 2025',
                description: 'Tracking and performance analysis of published articles: views, engagement, geographic reach.',
                tech: ['Google Analytics', 'Web metrics'],
                metrics: 'Monthly tracking',
            },
            {
                periodId: 1,
                dates: 'Octobre 2025 - Avril 2026',
                description: 'Suivi et analyse des performances des articles publiés : vues, engagement, portée géographique.',
                tech: ['Google Analytics', 'Web Metrics'],
                metrics: 'Suivi mensuel',
            },
        ],
    },
    {
        id: 'evaluation-tables',
        category: 'analytics',
        title: 'Evaluation Tables',
        phases: [
            {
                periodId: 0,
                dates: 'June 2025',
                description: 'Creation of evaluation grids for social networks and content performance.',
                tech: ['Excel', 'KPI tracking'],
            },
        ],
    },
    {
        id: 'meetings-and-minutes',
        category: 'analytics',
        title: 'Meetings & Minutes',
        phases: [
            {
                periodId: 0,
                dates: 'April - October 2025',
                description: 'Participation and documentation of weekly communication team and project managers meetings.',
                tech: ['Documentation', 'Note-taking'],
                metrics: '50+ documented meetings',
            },
        ],
    },
    {
        id: 'nss-scandals-campaigns',
        category: 'visual',
        title: 'NSS Scandals Campaigns',
        tag: 'Campaign',
        images: [
            { src: fourth2 },
            { src: fourth1, category: 'Flyers' },
            { src: fourth3 },
            { src: fourth4, category: 'Institutional' },
        ],
        phases: [
            { periodId: 0, description: 'Awareness campaign on NSS scandals' },
        ],
    },
    {
        id: 'ivory-coast-elections',
        category: 'visual',
        title: 'Ivory Coast Elections',
        tag: 'Current Affairs',
        images: [
            { src: ci1, full: ci2 },
            { src: ci2, description: 'Custom thumbnail designs for media', category: 'Media' },
            { src: ci3, description: 'Email marketing visual designs', category: 'Newsletter' },
        ],
        phases: [
            { periodId: 0, description: 'Current affairs visual series' },
        ],
    },
    {
        id: 'social-media-series',
        category: 'visual',
        title: 'Social Media Series',
        tag: 'Social Media',
        images: [
            { src: forum1 },
            { src: forum2 },
            { src: dw },
            { src: giz },
            { src: dipl1 },
            { src: ngij1 },
            { src: ngij2 },
            { src: ngij3 },
            { src: proj1 },
            { src: proj2 },
            { src: proj3 },
            { src: proj4 },
            { src: trombi },
            { src: table },
            { src: togo1 },
            { src: togo2 },
            { src: wameca },
            { src: webinar },
        ],
        phases: [
            { periodId: 0, description: 'Instagram and Facebook post designs' },
        ],
    },
    {
        id: 'ogbv-campaign',
        category: 'visual',
        title: 'OGBV Campaign',
        phases: [
            {
                periodId: 0,
                dates: 'Avril - Juin 2025',
                description: 'Campagne contre la violence basée sur le genre en ligne.',
                tech: ['Design Graphique', 'Awareness'],
                metrics: '10+ assets créés',
            },
        ],
    },
    {
        id: 'article-translations',
        category: 'translation',
        title: 'Article Translations',
        phases: [
            {
                periodId: 0,
                dates: 'April - October 2025',
                description: 'Translation and revision of press articles on press freedom and violations (FR/EN), including urgent alerts.',
                tech: ['French', 'English', 'Revision'],
                metrics: '60+ articles translated',
            },
        ],
    },
    {
        id: 'event-content',
        category: 'translation',
        title: 'Event Content',
        phases: [
            {
                periodId: 0,
                dates: 'April - October 2025',
                description: 'Translation of flyers, video scripts, press releases for MFWA and affiliate projects.',
                tech: ['Official documents', 'Marketing'],
                metrics: '30+ documents translated',
            },
        ],
    },
    {
        id: 'social-media',
        category: 'translation',
        title: 'Social Media',
        phases: [
            {
                periodId: 0,
                dates: 'April - October 2025',
                description: 'Translation of Facebook and Twitter posts, captions, and newsletters for bilingual engagement.',
                tech: ['Copywriting', 'Cultural adaptation'],
                metrics: 'Daily content',
            },
        ],
    },
    {
        id: 'profiles-and-biographies',
        category: 'translation',
        title: 'Profiles & Biographies',
        phases: [
            {
                periodId: 0,
                dates: 'August - October 2025',
                description: 'Translation of Wameca jury profiles, speakers, and participants for official documentation.',
                tech: ['Professional translation'],
                metrics: '20+ profiles translated',
            },
        ],
    },
];
