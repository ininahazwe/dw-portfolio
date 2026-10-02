import { Code, Palette, Languages, BarChart3 } from 'lucide-react';
import ci1 from '../../assets/ci1.png';
import ci2 from '../../assets/ci2.png';
import ci3 from '../../assets/ci3.png';
import dipl1 from '../../assets/dipl1.png';
import dw from '../../assets/dw.png';
import forum1 from '../../assets/forum1.png';
import forum2 from '../../assets/forum2.png';
import fourth1 from '../../assets/fourth1.png';
import fourth2 from '../../assets/fourth2.png';
import fourth3 from '../../assets/fourth3.png';
import fourth4 from '../../assets/fourth4.png';
import giz from '../../assets/giz.png';
import ngij1 from '../../assets/ngij1.png';
import ngij2 from '../../assets/ngij2.png';
import ngij3 from '../../assets/ngij3.png';
import proj1 from '../../assets/proj1.png';
import proj2 from '../../assets/proj2.png';
import proj3 from '../../assets/proj3.png';
import proj4 from '../../assets/proj4.png';
import table from '../../assets/table.png';
import togo1 from '../../assets/togo1.png';
import togo2 from '../../assets/togo2.png';
import trombi from '../../assets/trombi.png';
import wameca from '../../assets/wameca.png';
import webinar from '../../assets/webinar.png';
import map1 from '../../assets/map1.png';
import checkin from '../../assets/checkin.png';
import agenda from '../../assets/agenda.png';
import directory from '../../assets/directory.png';
import inventory from '../../assets/inventory.png';
import looker1 from '../../assets/lookerStudio1.png';
import sheet1 from '../../assets/sheet1.png';
import looker3 from '../../assets/lookerStudio3.png';
import drive1 from '../../assets/drive1.png';

export const categories = [
  {
    id: 'dev',
    title: 'Development & Digital',
    icon: Code,
    color: '#2C2C2C',
    gallery: [
      {
        id: 'dev-img-01',
        title: 'Interactive data visualization map',
        description: 'Dynamic mapping platform for West African media data visualization, with backend administration system',
        thumbnail: map1,
        fullsize: map1,
        link: 'https://leaflet-map-sigma.vercel.app/',
        category: 'Application'
      },
      {
        id: 'dev-img-02',
        title: 'Assets management',
        description: 'Management of furniture inventory and IT assets - This application provides comprehensive tracking and management of the organization"s furniture and IT equipment throughout their entire lifecycle. The system generates a unique QR code for each asset unit, which can be affixed directly to the item. By scanning this QR code, users can instantly access the complete history of the asset, including purchase information (acquisition date, supplier, cost), assignment details (current user, department, location), condition status, maintenance and repair history, and total cost of ownership. The system provides real-time, accurate data on the entire furniture and IT asset inventory, enabling instant visibility into asset availability and utilization, proactive maintenance planning, budget tracking and cost optimization, streamlined asset allocation and transfers, and automated reporting and compliance tracking.',
        thumbnail: inventory,
        fullsize: inventory,
        category: 'Application',
        link: 'https://inventory-app-two-sigma.vercel.app/'
      },
      {
        id: 'dev-img-03',
        title: 'Articles catalog',
        description: 'Comprehensive catalog of MFWA website articles with advanced search functionality',
        thumbnail: directory,
        fullsize: directory,
        link: 'https://mfwa-articles-directory.vercel.app/',
        category: 'Application',
      },
      {
        id: 'dev-img-04',
        title: 'Registration platform',
        description: 'Participant registration platform for events with real-time data visualization',
        thumbnail: checkin,
        fullsize: checkin,
        link: 'https://wameca-checkin.vercel.app/',
        category: 'Application',
      },
      {
        id: 'dev-img-05',
        title: 'Live event agenda',
        description: 'Real-time schedule platform with QR code for events',
        thumbnail: agenda,
        fullsize: agenda,
        link: 'https://wameca-agenda.vercel.app/',
        category: 'Application',
      },
    ],
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
        metrics: 'Automated interactive dashboard',
        gallery: [
          {
            id: 'analytics-img-01',
            title: 'Looker Studio Dashboard',
            description: 'Linking data sheets to Looker Studio to visualize them interactively - This application seamlessly connects data sheets to Looker Studio, enabling dynamic and interactive visualization of key metrics and performance indicators. The system allows users to perform complex analysis of results through comprehensive data exploration, filtering, and comparison capabilities. Users can apply multiple filters to drill down into specific datasets, identify trends, and generate customized views tailored to their analytical needs. The application also enables the download of filtered data in various formats, making it easy to create detailed reports, share insights with stakeholders, and conduct further offline analysis. This integration transforms raw data into actionable intelligence through intuitive dashboards and real-time reporting.',
            thumbnail: looker1,
            fullsize: looker1,
            link: 'https://lookerstudio.google.com/u/1/reporting/994c23fb-e32e-45ea-9863-4691340ed88d/page/6zXD',
            category: 'Metrics'
          },
          {
            id: 'analytics-img-02',
            title: 'Looker Studio Dashboard',
            description: 'Linking data sheets to Looker Studio to visualize them interactively - This application seamlessly connects data sheets to Looker Studio, enabling dynamic and interactive visualization of key metrics and performance indicators. The system allows users to perform complex analysis of results through comprehensive data exploration, filtering, and comparison capabilities. Users can apply multiple filters to drill down into specific datasets, identify trends, and generate customized views tailored to their analytical needs. The application also enables the download of filtered data in various formats, making it easy to create detailed reports, share insights with stakeholders, and conduct further offline analysis. This integration transforms raw data into actionable intelligence through intuitive dashboards and real-time reporting.',
            thumbnail: looker3,
            fullsize: looker3,
            link: 'https://lookerstudio.google.com/u/1/reporting/994c23fb-e32e-45ea-9863-4691340ed88d/page/6zXD',
            category: 'Metrics'
          },
        ]
      },
      {
        name: 'Social Media Reports',
        description: 'Detailed weekly and monthly performance reports on all social networks (Twitter, Facebook, LinkedIn).',
        period: 'April - October 2025',
        metrics: '24+ reports produced',
        tech: ['Excel', 'Analytics', 'Visualization'],
        gallery: [
          {
            id: 'analytics-img-03',
            title: 'Social Media Reports',
            description: 'Detailed weekly and monthly performance reports on all social networks (Twitter, Facebook, LinkedIn).',
            thumbnail: sheet1,
            fullsize: sheet1,
            category: 'Analytics'
          }
        ]
      },
      {
        name: 'Google Drive & Calendars Setup',
        description: 'Complete structuring and organization of shared Google Drive with permissions management. Setup and synchronization of shared calendars for team collaboration and scheduling.',
        period: 'May - June 2025',
        metrics: 'Fully structured system',
        tech: ['Google Workspace', 'Google Drive', 'Google Calendar', 'Organization', 'Permissions'],
        gallery: [
          {
            id: 'analytics-img-04',
            title: 'Google Drive & Calendars Setup',
            description: 'Complete structuring and organization of shared Google Drive with permissions management. Setup and synchronization of shared calendars for team collaboration and scheduling.',
            thumbnail: drive1,
            fullsize: drive1,
            category: 'Analytics'
          }
        ]
      },
      {
        name: 'Articles Metrics',
        description: 'Tracking and performance analysis of published articles: views, engagement, geographic reach.',
        period: 'April - October 2025',
        metrics: 'Monthly tracking',
        tech: ['Google Analytics', 'Web metrics'],
        link: 'https://lookerstudio.google.com/u/1/reporting/994c23fb-e32e-45ea-9863-4691340ed88d/page/p_mxyw8ocfvd',
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
      }
    ]
  },
  {
    id: 'visual',
    title: 'Visual Communication',
    icon: Palette,
    color: '#8B7355',
    gallery: [
      {
        id: 'visual-img-01',
        title: 'NSS Scandals Campaigns',
        description: 'Awareness campaign on NSS scandals',
        thumbnail: fourth2,
        fullsize: fourth2,
        category: 'Campaign'
      },
      {
        id: 'visual-img-02',
        title: 'NSS Scandals Campaigns',
        description: 'Awareness campaign on NSS scandals',
        thumbnail: fourth1,
        fullsize: fourth1,
        category: 'Flyers'
      },
      {
        id: 'visual-img-03',
        title: 'NSS Scandals Campaigns',
        description: 'Awareness campaign on NSS scandals',
        thumbnail: fourth3,
        fullsize: fourth3,
        category: 'Campaign'
      },
      {
        id: 'visual-img-04',
        title: 'NSS Scandals Campaigns',
        description: 'Awareness campaign on NSS scandals',
        thumbnail: fourth4,
        fullsize: fourth4,
        category: 'Institutional'
      },
      {
        id: 'visual-img-05',
        title: 'Ivory Coast Elections',
        description: 'Current affairs visual series',
        thumbnail: ci1,
        fullsize: ci2,
        category: 'Current Affairs'
      },
      {
        id: 'visual-img-06',
        title: 'Ivory Coast Elections',
        description: 'Custom thumbnail designs for media',
        thumbnail: ci2,
        fullsize: ci2,
        category: 'Media'
      },
      {
        id: 'visual-img-07',
        title: 'Ivory Coast Elections',
        description: 'Email marketing visual designs',
        thumbnail: ci3,
        fullsize: ci3,
        category: 'Newsletter'
      },
      {
        id: 'visual-img-08',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: forum1,
        fullsize: forum1,
        category: 'Social Media'
      },
      {
        id: 'visual-img-09',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: forum2,
        fullsize: forum2,
        category: 'Social Media'
      },
      {
        id: 'visual-img-10',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: dw,
        fullsize: dw,
        category: 'Social Media'
      },
      {
        id: 'visual-img-11',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: giz,
        fullsize: giz,
        category: 'Social Media'
      },
      {
        id: 'visual-img-12',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: dipl1,
        fullsize: dipl1,
        category: 'Social Media'
      },
      {
        id: 'visual-img-13',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: ngij1,
        fullsize: ngij1,
        category: 'Social Media'
      },
      {
        id: 'visual-img-14',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: ngij2,
        fullsize: ngij2,
        category: 'Social Media'
      },
      {
        id: 'visual-img-15',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: ngij3,
        fullsize: ngij3,
        category: 'Social Media'
      },
      {
        id: 'visual-img-16',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: proj1,
        fullsize: proj1,
        category: 'Social Media'
      },
      {
        id: 'visual-img-17',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: proj2,
        fullsize: proj2,
        category: 'Social Media'
      },
      {
        id: 'visual-img-18',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: proj3,
        fullsize: proj3,
        category: 'Social Media'
      },
      {
        id: 'visual-img-19',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: proj4,
        fullsize: proj4,
        category: 'Social Media'
      },
      {
        id: 'visual-img-20',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: trombi,
        fullsize: trombi,
        category: 'Social Media'
      },
      {
        id: 'visual-img-21',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: table,
        fullsize: table,
        category: 'Social Media'
      },
      {
        id: 'visual-img-22',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: togo1,
        fullsize: togo1,
        category: 'Social Media'
      },
      {
        id: 'visual-img-23',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: togo2,
        fullsize: togo2,
        category: 'Social Media'
      },
      {
        id: 'visual-img-24',
        title: 'Social Media Series',
        description: 'Instagram and Facebook post designs',
        thumbnail: wameca,
        fullsize: wameca,
        category: 'Social Media'
      },
      {
        id: 'visual-img-25',
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
        metrics: '60+ articles translated',
        tech: ['French', 'English', 'Revision']
      },
      {
        name: 'Event Content',
        description: 'Translation of flyers, video scripts, press releases for MFWA and affiliate projects.',
        period: 'April - October 2025',
        metrics: '30+ documents translated',
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
];