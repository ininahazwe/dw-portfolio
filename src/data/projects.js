import { Code, Palette, Languages, BarChart3, Video, FolderKanban, Globe, Wrench } from 'lucide-react';

export const categories = [
    {
        id: 'dev',
        title: 'Développement',
        icon: Code,
        color: '#2C2C2C',
        projects: [
            {
                name: 'Application Wameca Check-in',
                description: 'Système de check-in avec impression automatique pour événements. Gestion des participants en temps réel avec génération de badges.',
                tech: ['React', 'Node.js', 'Impression thermique', 'MySQL'],
                period: 'Août - Octobre 2025',
                metrics: 'Déployée pour événements Wameca'
            },
            {
                name: 'Inventory Management',
                description: 'Application complète de gestion du matériel informatique avec suivi des attributions, historique et alertes.',
                tech: ['PHP', 'MySQL', 'React', 'Bootstrap'],
                period: 'Mai - Septembre 2025',
                metrics: 'Gestion de l\'inventaire complet MFWA'
            },
            {
                name: 'Dynamic Map App',
                description: 'Carte interactive avec tooltips personnalisés et visualisation de données géographiques pour le suivi régional.',
                tech: ['React', 'Leaflet', 'API REST', 'Tailwind'],
                period: 'Septembre - Octobre 2025',
                metrics: 'Visualisation multi-pays'
            },
            {
                name: 'Contacts CRM',
                description: 'Système de gestion de contacts et relations avec organisations partenaires, journalistes et intervenants.',
                tech: ['React', 'Backend API', 'Database'],
                period: 'Octobre 2025',
                metrics: 'Base de données centralisée'
            },
            {
                name: 'Articles Tracker',
                description: 'Application de suivi et répertoire d\'articles avec métriques de performance et catégorisation.',
                tech: ['React', 'Database', 'Charts'],
                period: 'Octobre 2025',
                metrics: 'Suivi automatisé des publications'
            },
            {
                name: 'Agenda App',
                description: 'Application de gestion d\'agenda partagé pour l\'équipe communication avec synchronisation calendriers.',
                tech: ['React', 'Calendar API', 'Google Calendar'],
                period: 'Octobre 2025',
                metrics: 'Coordination équipe communication'
            }
        ]
    },
    {
        id: 'design',
        title: 'Design Graphique',
        icon: Palette,
        color: '#8B7355',
        projects: [
            {
                name: 'Campagne NSS Scandals',
                description: 'Série complète de posts et stories pour campagne de sensibilisation sur les scandales NSS avec identité visuelle cohérente.',
                tech: ['Canva', 'Design System', 'Brand Guidelines'],
                period: 'Juin 2025',
                metrics: 'Série de 10+ designs'
            },
            {
                name: 'Visuels WAMECA',
                description: 'Création de flyers, throwback templates et designs événementiels pour West Africa Media Excellence Conference & Awards.',
                tech: ['Canva', 'Brand Guidelines', 'Print Design'],
                period: 'Avril - Octobre 2025',
                metrics: '30+ designs produits'
            },
            {
                name: 'Campagne OGBV',
                description: 'Série de visuels pour campagne contre la violence en ligne basée sur le genre avec génération AI.',
                tech: ['Canva', 'AI Generation', 'ChatGPT'],
                period: 'Juillet 2025',
                metrics: 'Campagne multi-supports'
            },
            {
                name: 'Designs institutionnels',
                description: 'Visuels pour NGIJ, CEDEAO 50 ans, webinaires GIZ, formations DW Akademie et événements partenaires.',
                tech: ['Canva', 'Mailchimp', 'AI Tools'],
                period: 'Mai - Octobre 2025',
                metrics: '50+ créations graphiques'
            },
            {
                name: 'Élections Côte d\'Ivoire',
                description: 'Série de visuels et statements pour couverture des élections en Côte d\'Ivoire.',
                tech: ['Canva', 'Brainstorming visuel'],
                period: 'Octobre 2025',
                metrics: 'Campagne d\'actualité'
            }
        ]
    },
    {
        id: 'translation',
        title: 'Traduction',
        icon: Languages,
        color: '#6B5B4F',
        projects: [
            {
                name: 'Traductions articles',
                description: 'Traduction et révision d\'articles de presse sur liberté de presse et violations (FR/EN), incluant alertes urgentes.',
                period: 'Avril - Octobre 2025',
                metrics: '100+ articles traduits',
                tech: ['Français', 'Anglais', 'Révision']
            },
            {
                name: 'Contenus événementiels',
                description: 'Traduction de flyers, scripts vidéo, communiqués de presse pour événements MFWA et WAMECA.',
                period: 'Avril - Octobre 2025',
                metrics: '50+ documents traduits',
                tech: ['Documents officiels', 'Marketing']
            },
            {
                name: 'Social Media',
                description: 'Traduction de posts Facebook, Twitter, captions et newsletters pour engagement bilingue.',
                period: 'Avril - Octobre 2025',
                metrics: 'Contenu quotidien',
                tech: ['Copywriting', 'Adaptation culturelle']
            },
            {
                name: 'Profils & Biographies',
                description: 'Traduction de profils de jurés Wameca, speakers et intervenants pour documentation officielle.',
                period: 'Août - Octobre 2025',
                metrics: '20+ profils traduits',
                tech: ['Traduction professionnelle']
            }
        ]
    },
    {
        id: 'analytics',
        title: 'Analytics & Reporting',
        icon: BarChart3,
        color: '#9B8B7E',
        projects: [
            {
                name: 'Looker Studio Dashboard',
                description: 'Configuration de tableaux de bord automatisés pour suivi en temps réel des métriques de communication.',
                tech: ['Looker Studio', 'Google Sheets API', 'Data Studio'],
                period: 'Août 2025',
                metrics: 'Dashboard interactif automatisé'
            },
            {
                name: 'Social Media Reports',
                description: 'Rapports hebdomadaires et mensuels détaillés des performances sur tous les réseaux sociaux (Twitter, Facebook, LinkedIn).',
                period: 'Avril - Octobre 2025',
                metrics: '24+ rapports produits',
                tech: ['Excel', 'Analytics', 'Visualisation']
            },
            {
                name: 'Articles Metrics',
                description: 'Suivi et analyse de performance des articles publiés : vues, engagement, portée géographique.',
                period: 'Avril - Octobre 2025',
                metrics: 'Tracking mensuel',
                tech: ['Google Analytics', 'Métriques web']
            },
            {
                name: 'Tableaux d\'évaluation',
                description: 'Création de grilles d\'évaluation pour réseaux sociaux et performance de contenu.',
                period: 'Juin 2025',
                tech: ['Excel', 'KPI tracking']
            }
        ]
    },
    {
        id: 'video',
        title: 'Production Vidéo',
        icon: Video,
        color: '#7A6B5D',
        projects: [
            {
                name: 'Doublage vidéos WAMECA',
                description: 'Doublage en français de documentaires : Sénégal pêcheurs, filière riz Guinée, phosphates Togo.',
                tech: ['DaVinci Resolve', 'Audio editing', 'Voice-over'],
                period: 'Septembre 2025',
                metrics: '3 vidéos doublées (20+ min chacune)'
            },
            {
                name: 'Sous-titrage & Transcription',
                description: 'Transcription automatique et ajustement manuel de sous-titres pour vidéos événementielles.',
                period: 'Août - Septembre 2025',
                metrics: 'Multiple vidéos sous-titrées',
                tech: ['Subtitle editing', 'Transcription']
            },
            {
                name: 'Storyboards AI',
                description: 'Génération d\'illustrations pour storyboards de vidéos FOE Violation et contenus visuels.',
                tech: ['ChatGPT', 'Midjourney', 'Canva', 'AI Tools'],
                period: 'Mai - Juin 2025',
                metrics: 'Storyboards illustrés'
            },
            {
                name: 'Feedback vidéos',
                description: 'Critique et retours sur vidéos CEDEAO 50 ans et productions externes.',
                period: 'Mai - Juin 2025',
                tech: ['Review', 'Quality control']
            }
        ]
    },
    {
        id: 'project',
        title: 'Gestion de Projet',
        icon: FolderKanban,
        color: '#8B7355',
        projects: [
            {
                name: 'Organisation Google Drive',
                description: 'Structuration complète et standardisation du Google Drive de la communication avec système de permissions.',
                period: 'Juin 2025',
                metrics: 'Drive complet restructuré',
                tech: ['Google Workspace', 'Organisation']
            },
            {
                name: 'Coordination événements',
                description: 'Organisation et suivi de Forum, webinaires GIZ, formations DW Akademie et événements partenaires.',
                period: 'Avril - Octobre 2025',
                metrics: '10+ événements coordonnés',
                tech: ['Project management', 'Coordination']
            },
            {
                name: 'Calendriers partagés',
                description: 'Mise en place et synchronisation Google Calendar et Zoho Calendar pour équipe communication.',
                period: 'Mai - Juin 2025',
                metrics: 'Système de calendriers unifié',
                tech: ['Google Calendar', 'Zoho', 'Integration']
            },
            {
                name: 'Réunions & Comptes-rendus',
                description: 'Participation et documentation de réunions hebdomadaires équipe communication et project managers.',
                period: 'Avril - Octobre 2025',
                metrics: '50+ réunions documentées',
                tech: ['Documentation', 'Note-taking']
            }
        ]
    },
    {
        id: 'audit',
        title: 'Audit Web',
        icon: Globe,
        color: '#6B5B4F',
        projects: [
            {
                name: 'Audit MFWA Website',
                description: 'Analyse complète du nouveau site MFWA : UX, bugs CSS, wording et recommandations d\'amélioration.',
                period: 'Juin - Juillet 2025',
                metrics: 'Rapport détaillé de bugs',
                tech: ['Web audit', 'UX analysis', 'CSS']
            },
            {
                name: 'Audit mediagb.org',
                description: 'Analyse site Media Gambia avec création de cahier des charges et profil de recrutement développeur.',
                period: 'Juin - Juillet 2025',
                metrics: 'Cahier des charges complet',
                tech: ['Technical specs', 'Recruitment']
            },
            {
                name: 'Audit WAMECA Website',
                description: 'Analyse du site WAMECA et recommandations techniques pour amélioration.',
                period: 'Août 2025',
                metrics: 'Rapport d\'audit',
                tech: ['Website review', 'Recommendations']
            },
            {
                name: 'CSS Bugs Report',
                description: 'Détection systématique et documentation des bugs CSS avec solutions proposées.',
                period: 'Juillet 2025',
                metrics: 'Tableau Excel des bugs',
                tech: ['CSS debugging', 'Quality assurance']
            }
        ]
    },
    {
        id: 'tools',
        title: 'Outils & Formation',
        icon: Wrench,
        color: '#9B8B7E',
        projects: [
            {
                name: 'Autoformations techniques',
                description: 'Apprentissage autonome : PHP, Looker Studio, WebFlow, ClickUp, DaVinci Resolve.',
                period: 'Avril - Octobre 2025',
                metrics: '5 outils maîtrisés',
                tech: ['Self-learning', 'Documentation']
            },
            {
                name: 'Formations GIZ',
                description: 'Participation aux formations GIZ EU Communication Standards et Peer Learning.',
                period: 'Mai - Septembre 2025',
                metrics: '2 formations certifiées',
                tech: ['EU Standards', 'Best practices']
            },
            {
                name: 'Webinaires IA',
                description: 'Participation à 3 webinaires sur l\'intelligence artificielle et ses applications médias.',
                period: 'Avril 2025',
                metrics: '3 webinaires suivis',
                tech: ['AI', 'Innovation']
            },
            {
                name: 'Enquête outils numériques',
                description: 'Création et déploiement d\'enquête sur les outils numériques utilisés par l\'équipe communication.',
                period: 'Mai 2025',
                metrics: 'Formulaire interactif',
                tech: ['Google Forms', 'Analysis']
            }
        ]
    }
];