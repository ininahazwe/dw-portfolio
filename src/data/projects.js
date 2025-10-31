import { Code, Palette, Languages, BarChart3 } from 'lucide-react';
import ci1 from '../assets/ci1.png';
import ci2 from '../assets/ci2.png';
import ci3 from '../assets/ci3.png';
import dipl1 from '../assets/dipl1.png';
import dw from '../assets/dw.png';
import forum1 from '../assets/forum1.png';
import forum2 from '../assets/forum2.png';
import fourth1 from '../assets/fourth1.png';
import fourth2 from '../assets/fourth2.png';
import fourth3 from '../assets/fourth3.png';
import fourth4 from '../assets/fourth4.png';
import giz from '../assets/giz.png';
import ngij1 from '../assets/ngij1.png';
import ngij2 from '../assets/ngij2.png';
import ngij3 from '../assets/ngij3.png';
import proj1 from '../assets/proj1.png';
import proj2 from '../assets/proj2.png';
import proj3 from '../assets/proj3.png';
import proj4 from '../assets/proj4.png';
import table from '../assets/table.png';
import togo1 from '../assets/togo1.png';
import togo2 from '../assets/togo2.png';
import trombi from '../assets/trombi.png';
import wameca from '../assets/wameca.png';
import webinar from '../assets/webinar.png';
import map1 from '../assets/map1.png';
import map2 from '../assets/map2.png';
import checkin from '../assets/checkin.png';
import agenda from '../assets/agenda.png';
import directory from '../assets/directory.png';

export const categories = [
  {
    id: 'dev',
    title: 'Development & Digital',
    icon: Code,
    color: '#2C2C2C',
    gallery: [
      {
        id: 'visual-1',
        title: 'NSS Scandals Campaign',
        description: 'Awareness campaign on NSS scandals',
        thumbnail: map1,
        fullsize: map1,
        link: 'https://leaflet-map-sigma.vercel.app/',
        category: 'Campaign'
      },
      {
        id: 'visual-2',
        title: 'WAMECA Flyers',
        description: 'Event design and promotional materials',
        thumbnail: map2,
        fullsize: map2,
        category: 'Flyers'
      },
      {
        id: 'visual-3',
        title: 'OGBV Campaign',
        description: 'Campaign against online gender-based violence',
        thumbnail: directory,
        fullsize: directory,
        link: 'https://mfwa-articles-directory.vercel.app/',
        category: 'Campaign'
      },
      {
        id: 'visual-4',
        title: 'Institutional Design',
        description: 'NGIJ and partner events visuals',
        thumbnail: map1,
        fullsize: map1,
        link: 'https://inventory-app-two-sigma.vercel.app/',
        category: 'Institutional'
      },
      {
        id: 'visual-4',
        title: 'Institutional Design',
        description: 'NGIJ and partner events visuals',
        thumbnail: checkin,
        fullsize: checkin,
        link: 'https://wameca-checkin.vercel.app/',
        category: 'Institutional'
      },
      {
        id: 'visual-4',
        title: 'Institutional Design',
        description: 'NGIJ and partner events visuals',
        thumbnail: agenda,
        fullsize: agenda,
        link: 'https://mfwa-articles-directory.vercel.app/',
        category: 'Institutional'
      },
    ],
  },
  {
    id: 'visual',
    title: 'Visual Communication',
    icon: Palette,
    color: '#8B7355',
    gallery: [
      {
        id: 'visual-1',
        title: 'NSS Scandals Campaign',
        description: 'Awareness campaign on NSS scandals',
        thumbnail: fourth2,
        fullsize: fourth2,
        category: 'Campaign'
      },
      {
        id: 'visual-2',
        title: 'WAMECA Flyers',
        description: 'Event design and promotional materials',
        thumbnail: fourth1,
        fullsize: fourth1,
        category: 'Flyers'
      },
      {
        id: 'visual-3',
        title: 'OGBV Campaign',
        description: 'Campaign against online gender-based violence',
        thumbnail: fourth3,
        fullsize: fourth3,
        category: 'Campaign'
      },
      {
        id: 'visual-4',
        title: 'Institutional Design',
        description: 'NGIJ and partner events visuals',
        thumbnail: fourth4,
        fullsize: fourth4,
        category: 'Institutional'
      },
      {
        id: 'visual-5',
        title: 'Ivory Coast Elections',
        description: 'Current affairs visual series',
        thumbnail: ci1,
        fullsize: ci2,
        category: 'Current Affairs'
      },
      {
        id: 'visual-6',
        title: 'Video Thumbnails',
        description: 'Custom thumbnail designs for media',
        thumbnail: ci2,
        fullsize: ci2,
        category: 'Media'
      },
      {
        id: 'visual-7',
        title: 'Newsletter Headers',
        description: 'Email marketing visual designs',
        thumbnail: ci3,
        fullsize: ci3,
        category: 'Newsletter'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: forum1,
        fullsize: forum1,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: forum2,
        fullsize: forum2,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: dw,
        fullsize: dw,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: giz,
        fullsize: giz,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: dipl1,
        fullsize: dipl1,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: ngij1,
        fullsize: ngij1,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: ngij2,
        fullsize: ngij2,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: ngij3,
        fullsize: ngij3,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: proj1,
        fullsize: proj1,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: proj2,
        fullsize: proj2,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: proj3,
        fullsize: proj3,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: proj4,
        fullsize: proj4,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: trombi,
        fullsize: trombi,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: table,
        fullsize: table,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: togo1,
        fullsize: togo1,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: togo2,
        fullsize: togo2,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: wameca,
        fullsize: wameca,
        category: 'Social Media'
      },
      {
        id: 'visual-8',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: webinar,
        fullsize: webinar,
        category: 'Social Media'
      },
    ],
    projects: [
      
    ]
  },
  {
    id: 'translation',
    title: 'Translation & Writing',
    icon: Languages,
    color: '#6B5B4F',
    projects: [
      {
        name: 'Article Translations',
        description: 'Translation and revision of press articles on press freedom and violations (FR/EN), including urgent alerts.',
        period: 'April - October 2025',
        metrics: '100+ articles translated',
        tech: ['French', 'English', 'Revision']
      },
      {
        name: 'Event Content',
        description: 'Translation of flyers, video scripts, press releases for MFWA and WAMECA events.',
        period: 'April - October 2025',
        metrics: '50+ documents translated',
        tech: ['Official documents', 'Marketing']
      },
      {
        name: 'Social Media',
        description: 'Translation of Facebook and Twitter posts, captions, and newsletters for bilingual engagement.',
        period: 'April - October 2025',
        metrics: 'Daily content',
        tech: ['Copywriting', 'Cultural adaptation']
      },
      {
        name: 'Profiles & Biographies',
        description: 'Translation of Wameca jury profiles, speakers, and participants for official documentation.',
        period: 'August - October 2025',
        metrics: '20+ profiles translated',
        tech: ['Professional translation']
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Project Management',
    icon: BarChart3,
    color: '#9B8B7E',
    projects: [
      {
        name: 'Looker Studio Dashboard',
        description: 'Configuration of automated dashboards for real-time monitoring of communication metrics.',
        tech: ['Looker Studio', 'Google Sheets API', 'Data Studio'],
        period: 'August 2025',
        metrics: 'Automated interactive dashboard'
      },
      {
        name: 'Social Media Reports',
        description: 'Detailed weekly and monthly performance reports on all social networks (Twitter, Facebook, LinkedIn).',
        period: 'April - October 2025',
        metrics: '24+ reports produced',
        tech: ['Excel', 'Analytics', 'Visualization']
      },
      {
        name: 'Google Drive & Calendars Setup',
        description: 'Complete structuring and organization of shared Google Drive with permissions management. Setup and synchronization of shared calendars for team collaboration and scheduling.',
        period: 'May - June 2025',
        metrics: 'Fully restructured system',
        tech: ['Google Workspace', 'Google Drive', 'Google Calendar', 'Organization', 'Permissions']
      },
      {
        name: 'Articles Metrics',
        description: 'Tracking and performance analysis of published articles: views, engagement, geographic reach.',
        period: 'April - October 2025',
        metrics: 'Monthly tracking',
        tech: ['Google Analytics', 'Web metrics']
      },
      {
        name: 'Evaluation Tables',
        description: 'Creation of evaluation grids for social networks and content performance.',
        period: 'June 2025',
        tech: ['Excel', 'KPI tracking']
      },
      {
        name: 'Meetings & Minutes',
        description: 'Participation and documentation of weekly communication team and project managers meetings.',
        period: 'April - October 2025',
        metrics: '50+ documented meetings',
        tech: ['Documentation', 'Note-taking']
      },
      {
        name: 'Digital Tools Survey',
        description: 'Creation and deployment of survey on digital tools used by communication team.',
        period: 'May 2025',
        metrics: 'Interactive form',
        tech: ['Google Forms', 'Analysis']
      }
    ]
  }
];