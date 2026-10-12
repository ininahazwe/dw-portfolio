-- =====================================================================
-- Portfolio — données initiales (générées depuis src/data/portfolio.js)
-- À exécuter APRÈS 001_schema.sql. Ré-exécutable (upsert).
-- =====================================================================
begin;

-- Périodes
insert into public.periods (id,title,subtitle,description,summary,start_month,end_month,highlights) values (0,'Avril - Octobre 2025','Fondations et Diversification','Premier semestre couvrant l''intégration initiale à MFWA. Établissement des bases en développement digital, communication visuelle, traduction et analytics. Mise en place des outils numériques essentiels et des fondations pour les opérations.','From April to October, my work at MFWA took me across diverse disciplines, from crafting digital solutions and designing compelling visual communication, to delivering precision in translation and content writing, all while managing great projects through analytics and strategic oversight. Each endeavor reflects a commitment to transforming ideas into impactful outcomes that enhance work life through digitalization.','2025-04-01','2025-10-01',array['Mise en place de 6 outils numériques','100+ articles traduits','24+ rapports analytics générés']::text[])
  on conflict (id) do update set title=excluded.title, subtitle=excluded.subtitle, description=excluded.description, summary=excluded.summary, start_month=excluded.start_month, end_month=excluded.end_month, highlights=excluded.highlights;
insert into public.periods (id,title,subtitle,description,summary,start_month,end_month,highlights) values (1,'Octobre 2025 - Avril 2026','Approfondissement et Impact','Deuxième semestre marqué par l''optimisation des systèmes existants et l''expansion des capacités. Renforcement des métriques, amélioration de l''efficacité organisationnelle et montée en expertise technique.','From October to April, my mission at MFWA centered on two pillars: advancing the applications built in the first semester, and developing new platforms addressing specific digitalization needs. This period reflects a strategic focus on evolving existing solutions while creating innovative systems that transform how teams work, embedding digital transformation into the core of organizational processes.','2025-10-01','2026-04-01',array['Optimisation des dashboards','Refactorisation des plateformes','Intégrations avancées']::text[])
  on conflict (id) do update set title=excluded.title, subtitle=excluded.subtitle, description=excluded.description, summary=excluded.summary, start_month=excluded.start_month, end_month=excluded.end_month, highlights=excluded.highlights;
insert into public.periods (id,title,subtitle,description,summary,start_month,end_month,highlights) values (2,'Octobre 2026 - Avril 2027','À venir','','Content for this period is coming soon.','2026-10-01','2027-04-01','{}')
  on conflict (id) do update set title=excluded.title, subtitle=excluded.subtitle, description=excluded.description, summary=excluded.summary, start_month=excluded.start_month, end_month=excluded.end_month, highlights=excluded.highlights;

-- Catégories
insert into public.categories (id,title,short,icon,color,position) values ('dev','Development & Digital','Development','Code','#2C2C2C',0)
  on conflict (id) do update set title=excluded.title, short=excluded.short, icon=excluded.icon, color=excluded.color, position=excluded.position;
insert into public.categories (id,title,short,icon,color,position) values ('analytics','Analytics & Project Management','Analytics','BarChart3','#9B8B7E',1)
  on conflict (id) do update set title=excluded.title, short=excluded.short, icon=excluded.icon, color=excluded.color, position=excluded.position;
insert into public.categories (id,title,short,icon,color,position) values ('visual','Visual Communication','Visual','Palette','#8B7355',2)
  on conflict (id) do update set title=excluded.title, short=excluded.short, icon=excluded.icon, color=excluded.color, position=excluded.position;
insert into public.categories (id,title,short,icon,color,position) values ('translation','Translation & Writing','Translation','Languages','#6B5B4F',3)
  on conflict (id) do update set title=excluded.title, short=excluded.short, icon=excluded.icon, color=excluded.color, position=excluded.position;

-- Projets (position = ordre du fichier d'origine)
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('interactive-data-visualization-map','dev','Interactive data visualization map','Application','https://leaflet-map-sigma.vercel.app/',false,0)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('assets-management','dev','Assets management','Application','https://inventory-app-two-sigma.vercel.app/',false,1)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('articles-catalog','dev','Articles catalog','Application','https://mfwa-articles-directory.vercel.app/',false,2)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('registration-platform','dev','Registration platform','Application','https://wameca-checkin.vercel.app/',false,3)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('live-event-agenda','dev','Live event agenda','Application','https://wameca-agenda.vercel.app/',false,4)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('activity-tracker-platform','dev','Activity Tracker Platform',null,null,false,5)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('memorial-website','dev','Memorial Website',null,null,false,6)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('looker-studio-dashboard','analytics','Looker Studio Dashboard',null,'https://lookerstudio.google.com/u/1/reporting/994c23fb-e32e-45ea-9863-4691340ed88d/page/6zXD',false,7)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('social-media-reports','analytics','Social Media Reports',null,null,false,8)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('google-drive-and-calendars-setup','analytics','Google Drive & Calendars Setup',null,null,false,9)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('articles-metrics','analytics','Articles Metrics',null,'https://lookerstudio.google.com/u/1/reporting/994c23fb-e32e-45ea-9863-4691340ed88d/page/p_mxyw8ocfvd',false,10)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('evaluation-tables','analytics','Evaluation Tables',null,null,false,11)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('meetings-and-minutes','analytics','Meetings & Minutes',null,null,false,12)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('nss-scandals-campaigns','visual','NSS Scandals Campaigns','Campaign',null,false,13)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('ivory-coast-elections','visual','Ivory Coast Elections','Current Affairs',null,false,14)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('social-media-series','visual','Social Media Series','Social Media',null,false,15)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('ogbv-campaign','visual','OGBV Campaign',null,null,false,16)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('article-translations','translation','Article Translations',null,null,false,17)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('event-content','translation','Event Content',null,null,false,18)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('social-media','translation','Social Media',null,null,false,19)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;
insert into public.projects (id,category_id,title,tag,link,featured,position) values ('profiles-and-biographies','translation','Profiles & Biographies',null,null,false,20)
  on conflict (id) do update set category_id=excluded.category_id, title=excluded.title, tag=excluded.tag, link=excluded.link, featured=excluded.featured, position=excluded.position;

-- Phases
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('interactive-data-visualization-map',0,null,'Dynamic mapping platform for West African media data visualization, with backend administration system',null,'{}')
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('interactive-data-visualization-map',1,'Octobre 2025 - Avril 2026','Plateforme de données médias pour l''Afrique de l''Ouest avec interface cartographique interactive.','En optimisation pour SEO',array['Frontend','Mapping','Data Management']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('assets-management',0,null,'Management of furniture inventory and IT assets - This application provides comprehensive tracking and management of the organization"s furniture and IT equipment throughout their entire lifecycle. The system generates a unique QR code for each asset unit, which can be affixed directly to the item. By scanning this QR code, users can instantly access the complete history of the asset, including purchase information (acquisition date, supplier, cost), assignment details (current user, department, location), condition status, maintenance and repair history, and total cost of ownership. The system provides real-time, accurate data on the entire furniture and IT asset inventory, enabling instant visibility into asset availability and utilization, proactive maintenance planning, budget tracking and cost optimization, streamlined asset allocation and transfers, and automated reporting and compliance tracking.',null,'{}')
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('articles-catalog',0,null,'Comprehensive catalog of MFWA website articles with advanced search functionality',null,'{}')
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('registration-platform',0,null,'Participant registration platform for events with real-time data visualization',null,'{}')
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('live-event-agenda',0,null,'Real-time schedule platform with QR code for events',null,'{}')
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('activity-tracker-platform',0,'Avril - Octobre 2025','Plateforme de suivi des activités internes avec gestion des données statiques et graphiques dynamiques.','5 modules en production',array['Tracking','Analytics','Dynamic Charts']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('memorial-website',1,'Octobre 2025 - Avril 2026','Plateforme de données sur les parcours de carrière des journalistes décédés en ligne du devoir.','100+ journalistes documentés',array['Frontend Design','Carte Interactive','Gestion de contenu']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('looker-studio-dashboard',0,'August 2025','Configuration of automated dashboards for real-time monitoring of communication metrics.','Automated interactive dashboard',array['Looker Studio','Google Sheets API','Data Studio']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('looker-studio-dashboard',1,'Août 2025','Configuration de dashboards automatisés pour le suivi en temps réel des métriques de communication.','Dashboard interactif automatisé',array['Looker Studio','Google Sheets API','Data Studio']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('social-media-reports',0,'April - October 2025','Detailed weekly and monthly performance reports on all social networks (Twitter, Facebook, LinkedIn).','24+ reports produced',array['Excel','Analytics','Visualization']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('google-drive-and-calendars-setup',0,'May - June 2025','Complete structuring and organization of shared Google Drive with permissions management. Setup and synchronization of shared calendars for team collaboration and scheduling.','Fully structured system',array['Google Workspace','Google Drive','Google Calendar','Organization','Permissions']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('articles-metrics',0,'April - October 2025','Tracking and performance analysis of published articles: views, engagement, geographic reach.','Monthly tracking',array['Google Analytics','Web metrics']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('articles-metrics',1,'Octobre 2025 - Avril 2026','Suivi et analyse des performances des articles publiés : vues, engagement, portée géographique.','Suivi mensuel',array['Google Analytics','Web Metrics']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('evaluation-tables',0,'June 2025','Creation of evaluation grids for social networks and content performance.',null,array['Excel','KPI tracking']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('meetings-and-minutes',0,'April - October 2025','Participation and documentation of weekly communication team and project managers meetings.','50+ documented meetings',array['Documentation','Note-taking']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('nss-scandals-campaigns',0,null,'Awareness campaign on NSS scandals',null,'{}')
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('ivory-coast-elections',0,null,'Current affairs visual series',null,'{}')
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('social-media-series',0,null,'Instagram and Facebook post designs',null,'{}')
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('ogbv-campaign',0,'Avril - Juin 2025','Campagne contre la violence basée sur le genre en ligne.','10+ assets créés',array['Design Graphique','Awareness']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('article-translations',0,'April - October 2025','Translation and revision of press articles on press freedom and violations (FR/EN), including urgent alerts.','60+ articles translated',array['French','English','Revision']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('event-content',0,'April - October 2025','Translation of flyers, video scripts, press releases for MFWA and affiliate projects.','30+ documents translated',array['Official documents','Marketing']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('social-media',0,'April - October 2025','Translation of Facebook and Twitter posts, captions, and newsletters for bilingual engagement.','Daily content',array['Copywriting','Cultural adaptation']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;
insert into public.phases (project_id,period_id,dates,description,metrics,tech) values ('profiles-and-biographies',0,'August - October 2025','Translation of Wameca jury profiles, speakers, and participants for official documentation.','20+ profiles translated',array['Professional translation']::text[])
  on conflict (project_id,period_id) do update set dates=excluded.dates, description=excluded.description, metrics=excluded.metrics, tech=excluded.tech;

-- Images (remplacées à chaque exécution)
delete from public.project_images where project_id in ('interactive-data-visualization-map','assets-management','articles-catalog','registration-platform','live-event-agenda','memorial-website','looker-studio-dashboard','social-media-reports','google-drive-and-calendars-setup','nss-scandals-campaigns','ivory-coast-elections','social-media-series');
insert into public.project_images (project_id,path,full_path,description,category,position) values ('interactive-data-visualization-map','projects/map1.png',null,null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('assets-management','projects/inventory.png',null,null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('articles-catalog','projects/directory.png',null,null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('registration-platform','projects/checkin.png',null,null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('live-event-agenda','projects/agenda.png',null,null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('memorial-website','projects/memorial.png',null,null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('looker-studio-dashboard','projects/lookerStudio1.png',null,'Linking data sheets to Looker Studio to visualize them interactively - This application seamlessly connects data sheets to Looker Studio, enabling dynamic and interactive visualization of key metrics and performance indicators. The system allows users to perform complex analysis of results through comprehensive data exploration, filtering, and comparison capabilities. Users can apply multiple filters to drill down into specific datasets, identify trends, and generate customized views tailored to their analytical needs. The application also enables the download of filtered data in various formats, making it easy to create detailed reports, share insights with stakeholders, and conduct further offline analysis. This integration transforms raw data into actionable intelligence through intuitive dashboards and real-time reporting.','Metrics',0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('looker-studio-dashboard','projects/lookerStudio3.png',null,'Linking data sheets to Looker Studio to visualize them interactively - This application seamlessly connects data sheets to Looker Studio, enabling dynamic and interactive visualization of key metrics and performance indicators. The system allows users to perform complex analysis of results through comprehensive data exploration, filtering, and comparison capabilities. Users can apply multiple filters to drill down into specific datasets, identify trends, and generate customized views tailored to their analytical needs. The application also enables the download of filtered data in various formats, making it easy to create detailed reports, share insights with stakeholders, and conduct further offline analysis. This integration transforms raw data into actionable intelligence through intuitive dashboards and real-time reporting.','Metrics',1);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-reports','projects/sheet1.png',null,null,'Analytics',0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('google-drive-and-calendars-setup','projects/drive1.png',null,null,'Analytics',0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('nss-scandals-campaigns','projects/fourth2.png',null,null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('nss-scandals-campaigns','projects/fourth1.png',null,null,'Flyers',1);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('nss-scandals-campaigns','projects/fourth3.png',null,null,null,2);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('nss-scandals-campaigns','projects/fourth4.png',null,null,'Institutional',3);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('ivory-coast-elections','projects/ci1.png','projects/ci2.png',null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('ivory-coast-elections','projects/ci2.png',null,'Custom thumbnail designs for media','Media',1);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('ivory-coast-elections','projects/ci3.png',null,'Email marketing visual designs','Newsletter',2);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/forum1.png',null,null,null,0);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/forum2.png',null,null,null,1);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/dw.png',null,null,null,2);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/giz.png',null,null,null,3);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/dipl1.png',null,null,null,4);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/ngij1.png',null,null,null,5);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/ngij2.png',null,null,null,6);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/ngij3.png',null,null,null,7);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/proj1.png',null,null,null,8);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/proj2.png',null,null,null,9);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/proj3.png',null,null,null,10);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/proj4.png',null,null,null,11);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/trombi.png',null,null,null,12);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/table.png',null,null,null,13);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/togo1.png',null,null,null,14);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/togo2.png',null,null,null,15);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/wameca.png',null,null,null,16);
insert into public.project_images (project_id,path,full_path,description,category,position) values ('social-media-series','projects/webinar.png',null,null,null,17);

commit;
