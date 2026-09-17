export type SourceKind = 'Official university' | 'Official program' | 'Official admissions source' | 'Government source' | 'Official scholarship' | 'Estimated';

export type SourceMeta = {
  kind: SourceKind;
  label: string;
  verified: string;
  href: string;
};

export type Requirement = {
  applicant: 'Domestic' | 'International';
  title: string;
  detail: string;
  status: 'Confirmed' | 'Varies' | 'Check official source';
  source: SourceMeta;
};

export type University = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  country: string;
  jurisdiction: string;
  city: string;
  region: string;
  type: string;
  accent: string;
  mark: string;
  eyebrow: string;
  description: string;
  website: string;
  logoUrl?: string;
  verified: string;
  programs: string[];
  tags: string[];
  source: SourceMeta;
};

export type Program = {
  id: string;
  slug: string;
  name: string;
  universityId: string;
  university: string;
  country: string;
  city: string;
  subject: string;
  faculty: string;
  department: string;
  degree: string;
  level: string;
  mode: string;
  duration: string;
  intake: string;
  language: string;
  tuition: string;
  tuitionNote: string;
  code: string;
  overview: string;
  modules: string[];
  tags: string[];
  requirements: Requirement[];
  source: SourceMeta;
  updated: string;
  scholarshipIds: string[];
};

export type Scholarship = {
  id: string;
  slug: string;
  name: string;
  provider: string;
  country: string;
  eligibility: string;
  amount: string;
  coverage: string;
  deadline: string;
  level: string;
  status: 'Confirmed eligible' | 'Unknown / verify';
  source: SourceMeta;
};

export const markets = [
  { name: 'India', code: 'IN', count: '1,240+' },
  { name: 'United Kingdom', code: 'GB', count: '980+' },
  { name: 'United States', code: 'US', count: '1,860+' },
  { name: 'Canada', code: 'CA', count: '640+' },
  { name: 'United Arab Emirates', code: 'AE', count: '120+' },
  { name: 'Ireland', code: 'IE', count: '86+' },
  { name: 'Italy', code: 'IT', count: '210+' },
  { name: 'France', code: 'FR', count: '340+' },
  { name: 'Japan', code: 'JP', count: '190+' },
  { name: 'Hong Kong SAR', code: 'HK', count: '42+' },
  { name: 'China', code: 'CN', count: '510+' },
];

const official = (kind: SourceKind, label: string, href = '#') => ({ kind, label, verified: '2026-09-17', href });

export const universities: University[] = [
  {
    id: 'inst-oxford', slug: 'university-of-oxford', name: 'University of Oxford', shortName: 'Oxford', country: 'United Kingdom', jurisdiction: 'England', city: 'Oxford', region: 'South East', type: 'Public research university', accent: 'moss', mark: 'OX', eyebrow: 'A city of colleges',
    description: 'A collegiate research university with a long tradition of subject-led teaching, tutorials, and independent study.', website: 'ox.ac.uk', verified: '2026-09-17', programs: ['msc-social-data-science', 'ba-computer-science'], tags: ['Research-led', 'Collegiate', 'International'], source: official('Official university', 'Oxford admissions · verified')
  },
  {
    id: 'inst-toronto', slug: 'university-of-toronto', name: 'University of Toronto', shortName: 'Toronto', country: 'Canada', jurisdiction: 'Ontario', city: 'Toronto', region: 'Ontario', type: 'Public research university', accent: 'terracotta', mark: 'UT', eyebrow: 'An urban research campus',
    description: 'A research-intensive university across three campuses, with broad interdisciplinary study in a global city.', website: 'utoronto.ca', verified: '2026-09-16', programs: ['master-information', 'bsc-computer-science'], tags: ['Urban', 'Research-led', 'Co-op options'], source: official('Official university', 'U of T admissions · verified')
  },
  {
    id: 'inst-ashoka', slug: 'ashoka-university', name: 'Ashoka University', shortName: 'Ashoka', country: 'India', jurisdiction: 'Haryana', city: 'Sonipat', region: 'North India', type: 'Private liberal arts university', accent: 'saffron', mark: 'AS', eyebrow: 'Ideas in conversation',
    description: 'An interdisciplinary liberal arts and sciences university focused on critical thinking, research, and public engagement.', website: 'ashoka.edu.in', verified: '2026-09-15', programs: ['ba-computer-science', 'ba-economics'], tags: ['Liberal arts', 'Interdisciplinary', 'Residential'], source: official('Official university', 'Ashoka admissions · verified')
  },
  {
    id: 'inst-nyuad', slug: 'nyu-abu-dhabi', name: 'NYU Abu Dhabi', shortName: 'NYUAD', country: 'United Arab Emirates', jurisdiction: 'Abu Dhabi', city: 'Abu Dhabi', region: 'Abu Dhabi', type: 'Private research campus', accent: 'indigo', mark: 'AD', eyebrow: 'A global campus',
    description: 'A globally networked liberal arts and research campus shaped by Abu Dhabi and the wider world.', website: 'nyuad.nyu.edu', verified: '2026-09-14', programs: ['ba-computer-science', 'ba-social-research'], tags: ['Global network', 'Residential', 'Need-aware aid'], source: official('Official university', 'NYUAD admissions · verified')
  },
  {
    id: 'inst-tokyo', slug: 'the-university-of-tokyo', name: 'The University of Tokyo', shortName: 'UTokyo', country: 'Japan', jurisdiction: 'Tokyo', city: 'Tokyo', region: 'Kanto', type: 'National research university', accent: 'plum', mark: '東大', eyebrow: 'Knowledge for the future',
    description: 'Japan’s national research university, offering a wide span of disciplines across historic and modern campuses.', website: 'u-tokyo.ac.jp', verified: '2026-09-13', programs: ['msc-social-data-science'], tags: ['National', 'Research-led', 'Tokyo'], source: official('Official university', 'UTokyo admissions · verified')
  },
  {
    id: 'inst-iit-bombay', slug: 'indian-institute-of-technology-bombay', name: 'Indian Institute of Technology Bombay', shortName: 'IIT Bombay', country: 'India', jurisdiction: 'Maharashtra', city: 'Mumbai', region: 'West India', type: 'Public research university', accent: 'terracotta', mark: 'IB', eyebrow: 'Engineering in the city', description: 'A public technical university with strengths across engineering, science, design, and technology research.', website: 'iitb.ac.in', verified: '2026-09-17', programs: [], tags: ['Engineering', 'Research-led', 'Mumbai'], source: official('Official university', 'IIT Bombay official website', 'https://www.iitb.ac.in')
  },
  {
    id: 'inst-iisc', slug: 'indian-institute-of-science', name: 'Indian Institute of Science', shortName: 'IISc', country: 'India', jurisdiction: 'Karnataka', city: 'Bengaluru', region: 'South India', type: 'Public research university', accent: 'moss', mark: 'IS', eyebrow: 'Science at depth', description: 'A research-focused institute in Bengaluru spanning the natural sciences, engineering, and interdisciplinary discovery.', website: 'iisc.ac.in', verified: '2026-09-17', programs: [], tags: ['Science', 'Research-led', 'Bengaluru'], source: official('Official university', 'IISc official website', 'https://www.iisc.ac.in')
  },
  {
    id: 'inst-imperial', slug: 'imperial-college-london', name: 'Imperial College London', shortName: 'Imperial', country: 'United Kingdom', jurisdiction: 'England', city: 'London', region: 'London', type: 'Public research university', accent: 'terracotta', mark: 'IC', eyebrow: 'Science in South Kensington', description: 'A science, engineering, medicine, and business university with a strong London research setting.', website: 'imperial.ac.uk', verified: '2026-09-17', programs: [], tags: ['Science', 'Engineering', 'London'], source: official('Official university', 'Imperial official website', 'https://www.imperial.ac.uk')
  },
  {
    id: 'inst-edinburgh', slug: 'university-of-edinburgh', name: 'University of Edinburgh', shortName: 'Edinburgh', country: 'United Kingdom', jurisdiction: 'Scotland', city: 'Edinburgh', region: 'Scotland', type: 'Public research university', accent: 'plum', mark: 'ED', eyebrow: 'A city-wide university', description: 'A research-intensive university in Scotland with a broad academic community and historic city setting.', website: 'ed.ac.uk', verified: '2026-09-17', programs: [], tags: ['Research-led', 'Historic city', 'Scotland'], source: official('Official university', 'Edinburgh official website', 'https://www.ed.ac.uk')
  },
  {
    id: 'inst-mit', slug: 'massachusetts-institute-of-technology', name: 'Massachusetts Institute of Technology', shortName: 'MIT', country: 'United States', jurisdiction: 'Massachusetts', city: 'Cambridge', region: 'New England', type: 'Private research university', accent: 'saffron', mark: 'MIT', eyebrow: 'Inventing in Cambridge', description: 'A research university centered on science, technology, design, and solving complex problems.', website: 'mit.edu', verified: '2026-09-17', programs: [], tags: ['Technology', 'Research-led', 'Cambridge'], source: official('Official university', 'MIT official website', 'https://www.mit.edu')
  },
  {
    id: 'inst-berkeley', slug: 'university-of-california-berkeley', name: 'University of California, Berkeley', shortName: 'UC Berkeley', country: 'United States', jurisdiction: 'California', city: 'Berkeley', region: 'Bay Area', type: 'Public research university', accent: 'moss', mark: 'UCB', eyebrow: 'A public research campus', description: 'A public research university in the Bay Area known for broad study, discovery, and civic life.', website: 'berkeley.edu', verified: '2026-09-17', programs: [], tags: ['Public', 'Research-led', 'Bay Area'], source: official('Official university', 'Berkeley official website', 'https://www.berkeley.edu')
  },
  {
    id: 'inst-mcgill', slug: 'mcgill-university', name: 'McGill University', shortName: 'McGill', country: 'Canada', jurisdiction: 'Quebec', city: 'Montreal', region: 'Quebec', type: 'Public research university', accent: 'indigo', mark: 'MG', eyebrow: 'A bilingual city setting', description: 'An international research university in Montreal with a wide range of programs and a multilingual context.', website: 'mcgill.ca', verified: '2026-09-17', programs: [], tags: ['Research-led', 'Montreal', 'International'], source: official('Official university', 'McGill official website', 'https://www.mcgill.ca')
  },
  {
    id: 'inst-ubc', slug: 'university-of-british-columbia', name: 'University of British Columbia', shortName: 'UBC', country: 'Canada', jurisdiction: 'British Columbia', city: 'Vancouver', region: 'British Columbia', type: 'Public research university', accent: 'moss', mark: 'UB', eyebrow: 'Learning beside the Pacific', description: 'A public research university with campuses in Vancouver and the Okanagan, shaped by a Pacific setting.', website: 'ubc.ca', verified: '2026-09-17', programs: [], tags: ['Public', 'Research-led', 'Pacific'], source: official('Official university', 'UBC official website', 'https://www.ubc.ca')
  },
  {
    id: 'inst-khalifa', slug: 'khalifa-university', name: 'Khalifa University', shortName: 'Khalifa', country: 'United Arab Emirates', jurisdiction: 'Abu Dhabi', city: 'Abu Dhabi', region: 'Abu Dhabi', type: 'Public research university', accent: 'saffron', mark: 'KU', eyebrow: 'Research in Abu Dhabi', description: 'A research-led university focused on engineering, science, medicine, and technology in Abu Dhabi.', website: 'ku.ac.ae', verified: '2026-09-17', programs: [], tags: ['Engineering', 'Technology', 'Abu Dhabi'], source: official('Official university', 'Khalifa University official website', 'https://www.ku.ac.ae')
  },
  {
    id: 'inst-ud', slug: 'university-of-dubai', name: 'University of Dubai', shortName: 'UD', country: 'United Arab Emirates', jurisdiction: 'Dubai', city: 'Dubai', region: 'Dubai', type: 'Private university', accent: 'terracotta', mark: 'UD', eyebrow: 'Business in a global hub', description: 'A Dubai-based university with study across business, computing, law, and related professional fields.', website: 'ud.ac.ae', verified: '2026-09-17', programs: [], tags: ['Business', 'Professional', 'Dubai'], source: official('Official university', 'University of Dubai official website', 'https://www.ud.ac.ae')
  },
  {
    id: 'inst-trinity-dublin', slug: 'trinity-college-dublin', name: 'Trinity College Dublin', shortName: 'Trinity', country: 'Ireland', jurisdiction: 'Leinster', city: 'Dublin', region: 'Leinster', type: 'Public research university', accent: 'plum', mark: 'TC', eyebrow: 'A historic campus in Dublin', description: 'Ireland’s oldest university, with a central Dublin campus and broad research and teaching community.', website: 'tcd.ie', verified: '2026-09-17', programs: [], tags: ['Historic', 'Research-led', 'Dublin'], source: official('Official university', 'Trinity official website', 'https://www.tcd.ie')
  },
  {
    id: 'inst-ucd', slug: 'university-college-dublin', name: 'University College Dublin', shortName: 'UCD', country: 'Ireland', jurisdiction: 'Leinster', city: 'Dublin', region: 'Leinster', type: 'Public research university', accent: 'moss', mark: 'UC', eyebrow: 'A large Dublin campus', description: 'A comprehensive university with a suburban Dublin campus and a wide international student community.', website: 'ucd.ie', verified: '2026-09-17', programs: [], tags: ['Comprehensive', 'International', 'Dublin'], source: official('Official university', 'UCD official website', 'https://www.ucd.ie')
  },
  {
    id: 'inst-bologna', slug: 'university-of-bologna', name: 'University of Bologna', shortName: 'Bologna', country: 'Italy', jurisdiction: 'Emilia-Romagna', city: 'Bologna', region: 'Emilia-Romagna', type: 'Public research university', accent: 'terracotta', mark: 'BO', eyebrow: 'Study in a university city', description: 'A comprehensive public university with campuses across Emilia-Romagna and a strong international orientation.', website: 'unibo.it', verified: '2026-09-17', programs: [], tags: ['Historic', 'Comprehensive', 'Italy'], source: official('Official university', 'University of Bologna official website', 'https://www.unibo.it')
  },
  {
    id: 'inst-polimi', slug: 'politecnico-di-milano', name: 'Politecnico di Milano', shortName: 'PoliMi', country: 'Italy', jurisdiction: 'Lombardy', city: 'Milan', region: 'Lombardy', type: 'Public technical university', accent: 'indigo', mark: 'PM', eyebrow: 'Design and engineering in Milan', description: 'A technical university in Milan and Lombardy focused on engineering, architecture, and design.', website: 'polimi.it', verified: '2026-09-17', programs: [], tags: ['Design', 'Engineering', 'Milan'], source: official('Official university', 'PoliMi official website', 'https://www.polimi.it')
  },
  {
    id: 'inst-sorbonne', slug: 'sorbonne-university', name: 'Sorbonne University', shortName: 'Sorbonne', country: 'France', jurisdiction: 'Île-de-France', city: 'Paris', region: 'Île-de-France', type: 'Public research university', accent: 'plum', mark: 'SU', eyebrow: 'Knowledge in the heart of Paris', description: 'A Parisian research university spanning arts, humanities, science, and medicine.', website: 'sorbonne-universite.fr', verified: '2026-09-17', programs: [], tags: ['Research-led', 'Paris', 'Interdisciplinary'], source: official('Official university', 'Sorbonne official website', 'https://www.sorbonne-universite.fr')
  },
  {
    id: 'inst-psl', slug: 'paris-sciences-et-lettres-university', name: 'Paris Sciences et Lettres University', shortName: 'PSL', country: 'France', jurisdiction: 'Île-de-France', city: 'Paris', region: 'Île-de-France', type: 'Public research university', accent: 'saffron', mark: 'PSL', eyebrow: 'A federation of Parisian schools', description: 'A research university bringing together institutions across science, arts, humanities, and social science.', website: 'psl.eu', verified: '2026-09-17', programs: [], tags: ['Research-led', 'Paris', 'Selective'], source: official('Official university', 'PSL official website', 'https://psl.eu')
  },
  {
    id: 'inst-kyoto', slug: 'kyoto-university', name: 'Kyoto University', shortName: 'Kyoto', country: 'Japan', jurisdiction: 'Kyoto', city: 'Kyoto', region: 'Kansai', type: 'National research university', accent: 'moss', mark: '京大', eyebrow: 'Research with tradition', description: 'A national research university with a broad disciplinary community in Kyoto.', website: 'kyoto-u.ac.jp', verified: '2026-09-17', programs: [], tags: ['National', 'Research-led', 'Kyoto'], source: official('Official university', 'Kyoto University official website', 'https://www.kyoto-u.ac.jp')
  },
  {
    id: 'inst-osaka', slug: 'osaka-university', name: 'Osaka University', shortName: 'Osaka', country: 'Japan', jurisdiction: 'Osaka', city: 'Suita', region: 'Kansai', type: 'National research university', accent: 'terracotta', mark: '阪大', eyebrow: 'A metropolitan research community', description: 'A national research university serving a large academic region around Osaka.', website: 'osaka-u.ac.jp', verified: '2026-09-17', programs: [], tags: ['National', 'Research-led', 'Kansai'], source: official('Official university', 'Osaka University official website', 'https://www.osaka-u.ac.jp')
  },
  {
    id: 'inst-hku', slug: 'the-university-of-hong-kong', name: 'The University of Hong Kong', shortName: 'HKU', country: 'Hong Kong SAR', jurisdiction: 'Hong Kong', city: 'Pok Fu Lam', region: 'Hong Kong Island', type: 'Public research university', accent: 'indigo', mark: 'HK', eyebrow: 'A global campus in Hong Kong', description: 'Hong Kong’s oldest university, with a research community connected across Asia and the world.', website: 'hku.hk', verified: '2026-09-17', programs: [], tags: ['Global', 'Research-led', 'Hong Kong'], source: official('Official university', 'HKU official website', 'https://www.hku.hk')
  },
  {
    id: 'inst-cuhk', slug: 'the-chinese-university-of-hong-kong', name: 'The Chinese University of Hong Kong', shortName: 'CUHK', country: 'Hong Kong SAR', jurisdiction: 'Hong Kong', city: 'Shatin', region: 'New Territories', type: 'Public research university', accent: 'plum', mark: 'CU', eyebrow: 'A collegiate campus', description: 'A comprehensive research university with a collegiate campus in the New Territories.', website: 'cuhk.edu.hk', verified: '2026-09-17', programs: [], tags: ['Collegiate', 'Research-led', 'Hong Kong'], source: official('Official university', 'CUHK official website', 'https://www.cuhk.edu.hk')
  },
  {
    id: 'inst-tsinghua', slug: 'tsinghua-university', name: 'Tsinghua University', shortName: 'Tsinghua', country: 'China', jurisdiction: 'Beijing', city: 'Beijing', region: 'Beijing', type: 'Public research university', accent: 'saffron', mark: '清华', eyebrow: 'Innovation in Beijing', description: 'A comprehensive research university in Beijing with strong communities across technology, science, and the humanities.', website: 'tsinghua.edu.cn', verified: '2026-09-17', programs: [], tags: ['Research-led', 'Technology', 'Beijing'], source: official('Official university', 'Tsinghua official website', 'https://www.tsinghua.edu.cn')
  },
  {
    id: 'inst-peking', slug: 'peking-university', name: 'Peking University', shortName: 'PKU', country: 'China', jurisdiction: 'Beijing', city: 'Beijing', region: 'Beijing', type: 'Public research university', accent: 'moss', mark: '北大', eyebrow: 'A broad academic tradition', description: 'A comprehensive research university in Beijing with study across sciences, social sciences, and humanities.', website: 'pku.edu.cn', verified: '2026-09-17', programs: [], tags: ['Research-led', 'Comprehensive', 'Beijing'], source: official('Official university', 'Peking University official website', 'https://english.pku.edu.cn')
  },
];

export const scholarships: Scholarship[] = [
  { id: 'sch-chevening', slug: 'chevening-scholarships', name: 'Chevening Scholarships', provider: 'UK Foreign, Commonwealth & Development Office', country: 'United Kingdom', eligibility: 'International applicants for eligible one-year taught master’s degrees.', amount: 'Full funding', coverage: 'Tuition, stipend, travel, and allowances', deadline: '12 Nov 2026', level: "Master's", status: 'Unknown / verify', source: official('Government source', 'Chevening official guidance') },
  { id: 'sch-utoronto', slug: 'uoft-international-scholarships', name: 'University of Toronto International Awards', provider: 'University of Toronto', country: 'Canada', eligibility: 'International applicants; criteria vary by faculty and program.', amount: 'Varies', coverage: 'Partial tuition support', deadline: 'Varies by program', level: 'Undergraduate', status: 'Unknown / verify', source: official('Official scholarship', 'University awards page') },
  { id: 'sch-ashoka', slug: 'ashoka-financial-aid', name: 'Ashoka University Financial Aid', provider: 'Ashoka University', country: 'India', eligibility: 'Applicants demonstrating financial need; application required.', amount: 'Up to full tuition', coverage: 'Tuition and selected living support', deadline: '15 Jan 2027', level: 'Undergraduate', status: 'Confirmed eligible', source: official('Official scholarship', 'Ashoka financial aid') },
  { id: 'sch-nyuad', slug: 'nyuad-financial-aid', name: 'NYU Abu Dhabi Financial Aid', provider: 'NYU Abu Dhabi', country: 'United Arab Emirates', eligibility: 'Need-based support is considered through the admission and aid process.', amount: 'Need-based', coverage: 'May include tuition, housing, meals, and travel', deadline: '5 Jan 2027', level: 'Undergraduate', status: 'Unknown / verify', source: official('Official scholarship', 'NYUAD financial aid') },
];

export const programs: Program[] = [
  {
    id: 'prog-oxford-data', slug: 'msc-social-data-science', name: 'MSc Social Data Science', universityId: 'inst-oxford', university: 'University of Oxford', country: 'United Kingdom', city: 'Oxford', subject: 'Data science & society', faculty: 'Social Sciences Division', department: 'Department of Social Policy and Intervention', degree: 'Master of Science', level: "Master's", mode: 'Full-time · On campus', duration: '10 months', intake: 'October 2027', language: 'English', tuition: '£35,220 / year', tuitionNote: 'International fee shown; confirm annual fee schedule.', code: 'MSD-SDS-2027', overview: 'Learn to work across social research and computational methods, with an emphasis on responsible evidence and public value.', modules: ['Social data methods', 'Machine learning for social science', 'Research design', 'Ethics and governance'], tags: ['Data science', 'Policy', 'Research methods'], requirements: [
      { applicant: 'Domestic', title: 'Academic background', detail: 'A strong undergraduate degree in a relevant subject is expected.', status: 'Confirmed', source: official('Official program', 'Oxford course page') },
      { applicant: 'International', title: 'English language', detail: 'Accepted test scores and minimums vary by applicant profile; check the official table.', status: 'Check official source', source: official('Official admissions source', 'Oxford English language requirements') },
      { applicant: 'International', title: 'Documents', detail: 'Transcripts, references, written work or statement, and passport identity details may be required.', status: 'Varies', source: official('Official admissions source', 'Oxford graduate admissions') },
    ], source: official('Official program', 'Oxford course page'), updated: 'Updated 17 Sep 2026', scholarshipIds: ['sch-chevening']
  },
  {
    id: 'prog-toronto-info', slug: 'master-information', name: 'Master of Information', universityId: 'inst-toronto', university: 'University of Toronto', country: 'Canada', city: 'Toronto', subject: 'Information studies', faculty: 'Faculty of Information', department: 'Information', degree: 'Master of Information', level: "Master's", mode: 'Full-time · Hybrid options', duration: '2 years', intake: 'September 2027', language: 'English', tuition: 'CAD 49,500 / year', tuitionNote: 'Indicative international tuition; program fees can change.', code: 'MI-INFO-2027', overview: 'A flexible graduate program for people who want to shape how information is organized, shared, and used.', modules: ['Information policy', 'User experience', 'Data and society', 'Design studio'], tags: ['Information', 'Design', 'Policy'], requirements: [
      { applicant: 'Domestic', title: 'Degree requirement', detail: 'An appropriate bachelor’s degree or equivalent is required.', status: 'Confirmed', source: official('Official program', 'U of T program requirements') },
      { applicant: 'International', title: 'Credential review', detail: 'International credentials are reviewed against the program’s stated academic standard.', status: 'Check official source', source: official('Official admissions source', 'U of T international applicants') },
      { applicant: 'International', title: 'Language requirement', detail: 'English proficiency evidence may be required unless an exemption applies.', status: 'Varies', source: official('Official admissions source', 'U of T language requirements') },
    ], source: official('Official program', 'University of Toronto program page'), updated: 'Updated 16 Sep 2026', scholarshipIds: ['sch-utoronto']
  },
  {
    id: 'prog-ashoka-cs', slug: 'ba-computer-science', name: 'BA (Hons) Computer Science', universityId: 'inst-ashoka', university: 'Ashoka University', country: 'India', city: 'Sonipat', subject: 'Computer science', faculty: 'Science', department: 'Computer Science', degree: 'Bachelor of Arts (Honours)', level: 'Undergraduate', mode: 'Full-time · Residential', duration: '4 years', intake: 'July 2027', language: 'English', tuition: '₹10.35 lakh / year', tuitionNote: 'Tuition estimate shown for planning; confirm cohort fee schedule.', code: 'CS-HONS-UG', overview: 'A rigorous computer science education in a liberal arts setting, with room to study across disciplines.', modules: ['Programming & abstraction', 'Data structures', 'Mathematics for computing', 'Computing and society'], tags: ['Computer science', 'Liberal arts', 'Residential'], requirements: [
      { applicant: 'Domestic', title: 'School qualifications', detail: 'Applicants should review the current undergraduate admissions cycle and subject expectations.', status: 'Check official source', source: official('Official admissions source', 'Ashoka undergraduate admissions') },
      { applicant: 'International', title: 'Applicant pathway', detail: 'Qualification review and application steps vary by curriculum and country of study.', status: 'Varies', source: official('Official admissions source', 'Ashoka international applicants') },
      { applicant: 'International', title: 'English language', detail: 'Evidence may be requested depending on prior language of instruction.', status: 'Varies', source: official('Official admissions source', 'Ashoka admissions') },
    ], source: official('Official program', 'Ashoka program page'), updated: 'Updated 15 Sep 2026', scholarshipIds: ['sch-ashoka']
  },
  {
    id: 'prog-nyuad-cs', slug: 'ba-computer-science-nyuad', name: 'BA Computer Science', universityId: 'inst-nyuad', university: 'NYU Abu Dhabi', country: 'United Arab Emirates', city: 'Abu Dhabi', subject: 'Computer science', faculty: 'Arts & Sciences', department: 'Computer Science', degree: 'Bachelor of Arts', level: 'Undergraduate', mode: 'Full-time · On campus', duration: '4 years', intake: 'September 2027', language: 'English', tuition: 'AED 0–245,000 / year', tuitionNote: 'Aid and family contribution vary; confirm official offer.', code: 'NYUAD-CS-BA', overview: 'A global computer science education with research, project work, and a highly international student body.', modules: ['Algorithms', 'Computer systems', 'Interactive computing', 'Research seminar'], tags: ['Computer science', 'Global campus', 'Financial aid'], requirements: [
      { applicant: 'Domestic', title: 'Academic preparation', detail: 'Review the undergraduate application pathway and required academic records.', status: 'Check official source', source: official('Official admissions source', 'NYUAD admissions') },
      { applicant: 'International', title: 'Global applicant review', detail: 'Requirements depend on the curriculum and country where qualifications were completed.', status: 'Varies', source: official('Official admissions source', 'NYUAD international admissions') },
      { applicant: 'International', title: 'Financial aid', detail: 'Need-based aid is assessed through the university’s financial aid process.', status: 'Check official source', source: official('Official scholarship', 'NYUAD financial aid') },
    ], source: official('Official program', 'NYUAD program page'), updated: 'Updated 14 Sep 2026', scholarshipIds: ['sch-nyuad']
  },
  {
    id: 'prog-tokyo-data', slug: 'msc-social-data-science-tokyo', name: 'Master’s Program in Data Science', universityId: 'inst-tokyo', university: 'The University of Tokyo', country: 'Japan', city: 'Tokyo', subject: 'Data science', faculty: 'Interfaculty Initiative in Information Studies', department: 'Data Science', degree: 'Master of Science', level: "Master's", mode: 'Full-time · On campus', duration: '2 years', intake: 'April 2027', language: 'English / Japanese', tuition: '¥535,800 / year', tuitionNote: 'Planning figure based on published graduate tuition; verify current schedule.', code: 'UTOKYO-DS-MS', overview: 'Graduate study in data science at the intersection of information, society, and computation.', modules: ['Statistical learning', 'Information design', 'Research methods', 'Data ethics'], tags: ['Data science', 'Research', 'Tokyo'], requirements: [
      { applicant: 'Domestic', title: 'Graduate entrance process', detail: 'The faculty publishes program-specific examination and document requirements.', status: 'Check official source', source: official('Official admissions source', 'UTokyo graduate admissions') },
      { applicant: 'International', title: 'Qualification review', detail: 'International qualifications and application timing must be reviewed against the graduate school guidance.', status: 'Varies', source: official('Official admissions source', 'UTokyo international applicants') },
    ], source: official('Official program', 'UTokyo program page'), updated: 'Updated 13 Sep 2026', scholarshipIds: []
  },
];

export const subjects = ['Computer science', 'Data science & society', 'Business & management', 'Arts & humanities', 'Engineering', 'Social sciences'];
export const degrees = ['Undergraduate', "Master's", 'PhD', 'Diploma', 'Certificate'];

export function getUniversity(slugOrId: string) { return universities.find((item) => item.slug === slugOrId || item.id === slugOrId); }
export function getProgram(slug: string) { return programs.find((item) => item.slug === slug); }
export function getScholarship(slug: string) { return scholarships.find((item) => item.slug === slug); }
export function getUniversityPrograms(id: string) { return programs.filter((item) => item.universityId === id); }
export function getProgramScholarships(program: Program) { return scholarships.filter((item) => program.scholarshipIds.includes(item.id)); }
