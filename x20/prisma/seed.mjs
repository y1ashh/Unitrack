import fs from 'node:fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const marketRows = [
  ['IN', 'India', 'INR'], ['GB', 'United Kingdom', 'GBP'], ['US', 'United States', 'USD'], ['CA', 'Canada', 'CAD'],
  ['AE', 'United Arab Emirates', 'AED'], ['IE', 'Ireland', 'EUR'], ['IT', 'Italy', 'EUR'], ['FR', 'France', 'EUR'],
  ['JP', 'Japan', 'JPY'], ['HK', 'Hong Kong SAR', 'HKD'], ['CN', 'China', 'CNY'],
];

const institutions = [
  { key: 'inst-oxford', name: 'University of Oxford', short: 'Oxford', country: 'GB', city: 'Oxford', type: 'RESEARCH', website: 'https://www.ox.ac.uk' },
  { key: 'inst-toronto', name: 'University of Toronto', short: 'Toronto', country: 'CA', city: 'Toronto', type: 'RESEARCH', website: 'https://www.utoronto.ca' },
  { key: 'inst-ashoka', name: 'Ashoka University', short: 'Ashoka', country: 'IN', city: 'Sonipat', type: 'PRIVATE', website: 'https://www.ashoka.edu.in' },
  { key: 'inst-nyuad', name: 'NYU Abu Dhabi', short: 'NYUAD', country: 'AE', city: 'Abu Dhabi', type: 'PRIVATE', website: 'https://nyuad.nyu.edu' },
  { key: 'inst-tokyo', name: 'The University of Tokyo', short: 'UTokyo', country: 'JP', city: 'Tokyo', type: 'NATIONAL', website: 'https://www.u-tokyo.ac.jp' },
  { key: 'inst-iit-bombay', name: 'Indian Institute of Technology Bombay', short: 'IIT Bombay', country: 'IN', city: 'Mumbai', type: 'RESEARCH', website: 'https://www.iitb.ac.in' },
  { key: 'inst-iisc', name: 'Indian Institute of Science', short: 'IISc', country: 'IN', city: 'Bengaluru', type: 'RESEARCH', website: 'https://www.iisc.ac.in' },
  { key: 'inst-imperial', name: 'Imperial College London', short: 'Imperial', country: 'GB', city: 'London', type: 'RESEARCH', website: 'https://www.imperial.ac.uk' },
  { key: 'inst-edinburgh', name: 'University of Edinburgh', short: 'Edinburgh', country: 'GB', city: 'Edinburgh', type: 'RESEARCH', website: 'https://www.ed.ac.uk' },
  { key: 'inst-mit', name: 'Massachusetts Institute of Technology', short: 'MIT', country: 'US', city: 'Cambridge', type: 'RESEARCH', website: 'https://www.mit.edu' },
  { key: 'inst-berkeley', name: 'University of California, Berkeley', short: 'UC Berkeley', country: 'US', city: 'Berkeley', type: 'RESEARCH', website: 'https://www.berkeley.edu' },
  { key: 'inst-mcgill', name: 'McGill University', short: 'McGill', country: 'CA', city: 'Montreal', type: 'RESEARCH', website: 'https://www.mcgill.ca' },
  { key: 'inst-ubc', name: 'University of British Columbia', short: 'UBC', country: 'CA', city: 'Vancouver', type: 'RESEARCH', website: 'https://www.ubc.ca' },
  { key: 'inst-khalifa', name: 'Khalifa University', short: 'Khalifa', country: 'AE', city: 'Abu Dhabi', type: 'RESEARCH', website: 'https://www.ku.ac.ae' },
  { key: 'inst-ud', name: 'University of Dubai', short: 'UD', country: 'AE', city: 'Dubai', type: 'PRIVATE', website: 'https://www.ud.ac.ae' },
  { key: 'inst-trinity-dublin', name: 'Trinity College Dublin', short: 'Trinity', country: 'IE', city: 'Dublin', type: 'COLLEGIATE', website: 'https://www.tcd.ie' },
  { key: 'inst-ucd', name: 'University College Dublin', short: 'UCD', country: 'IE', city: 'Dublin', type: 'RESEARCH', website: 'https://www.ucd.ie' },
  { key: 'inst-bologna', name: 'University of Bologna', short: 'Bologna', country: 'IT', city: 'Bologna', type: 'RESEARCH', website: 'https://www.unibo.it' },
  { key: 'inst-polimi', name: 'Politecnico di Milano', short: 'PoliMi', country: 'IT', city: 'Milan', type: 'RESEARCH', website: 'https://www.polimi.it' },
  { key: 'inst-sorbonne', name: 'Sorbonne University', short: 'Sorbonne', country: 'FR', city: 'Paris', type: 'RESEARCH', website: 'https://www.sorbonne-universite.fr' },
  { key: 'inst-psl', name: 'Paris Sciences et Lettres University', short: 'PSL', country: 'FR', city: 'Paris', type: 'RESEARCH', website: 'https://psl.eu' },
  { key: 'inst-kyoto', name: 'Kyoto University', short: 'Kyoto', country: 'JP', city: 'Kyoto', type: 'NATIONAL', website: 'https://www.kyoto-u.ac.jp' },
  { key: 'inst-osaka', name: 'Osaka University', short: 'Osaka', country: 'JP', city: 'Suita', type: 'NATIONAL', website: 'https://www.osaka-u.ac.jp' },
  { key: 'inst-hku', name: 'The University of Hong Kong', short: 'HKU', country: 'HK', city: 'Pok Fu Lam', type: 'RESEARCH', website: 'https://www.hku.hk' },
  { key: 'inst-cuhk', name: 'The Chinese University of Hong Kong', short: 'CUHK', country: 'HK', city: 'Shatin', type: 'COLLEGIATE', website: 'https://www.cuhk.edu.hk' },
  { key: 'inst-tsinghua', name: 'Tsinghua University', short: 'Tsinghua', country: 'CN', city: 'Beijing', type: 'RESEARCH', website: 'https://www.tsinghua.edu.cn' },
  { key: 'inst-peking', name: 'Peking University', short: 'PKU', country: 'CN', city: 'Beijing', type: 'RESEARCH', website: 'https://english.pku.edu.cn' },
];

const countryCodes = new Map([
  ['India', 'IN'], ['United Kingdom', 'GB'], ['United States', 'US'], ['Canada', 'CA'], ['United Arab Emirates', 'AE'],
  ['Ireland', 'IE'], ['Italy', 'IT'], ['France', 'FR'], ['Japan', 'JP'], ['Hong Kong SAR', 'HK'], ['China', 'CN'],
]);

const officialSites = new Map(Object.entries({
  'Indian Institute of Technology Bombay': 'https://www.iitb.ac.in',
  'Indian Institute of Technology Delhi': 'https://home.iitd.ac.in',
  'Indian Institute of Technology Madras': 'https://www.iitm.ac.in',
  'Indian Institute of Technology Kanpur': 'https://www.iitk.ac.in',
  'Indian Institute of Technology Kharagpur': 'https://www.iitkgp.ac.in',
  'Indian Institute of Technology Roorkee': 'https://www.iitr.ac.in',
  'Indian Institute of Technology Guwahati': 'https://www.iitg.ac.in',
  'Indian Institute of Technology Hyderabad': 'https://iith.ac.in',
  'Indian Institute of Technology (BHU) Varanasi': 'https://iitbhu.ac.in',
  'Indian Institute of Technology Indore': 'https://www.iiti.ac.in',
  'Indian Institute of Technology Gandhinagar': 'https://iitgn.ac.in',
  'Indian Institute of Technology Ropar': 'https://www.iitrpr.ac.in',
  'Indian Institute of Science Bangalore': 'https://iisc.ac.in',
  'Indian Institute of Management Ahmedabad': 'https://www.iima.ac.in',
  'Indian Institute of Management Bangalore': 'https://www.iimb.ac.in',
  'Indian Institute of Management Calcutta': 'https://www.iimcal.ac.in',
  'Delhi University': 'https://www.du.ac.in',
  'Jawaharlal Nehru University': 'https://www.jnu.ac.in',
  'Banaras Hindu University': 'https://www.bhu.ac.in',
  'Jadavpur University': 'https://jaduniv.edu.in',
  'Anna University': 'https://www.annauniv.edu',
  'BITS Pilani': 'https://www.bits-pilani.ac.in',
  'Vellore Institute of Technology': 'https://vit.ac.in',
  'SRM Institute of Science and Technology': 'https://www.srmist.edu.in',
  'Manipal Academy of Higher Education': 'https://www.manipal.edu',
  'Ashoka University': 'https://www.ashoka.edu.in',
  'National Institute of Technology Trichy': 'https://www.nitt.edu',
  'National Institute of Technology Surathkal': 'https://www.nitk.ac.in',
  'University of Hyderabad': 'https://uohyd.ac.in',
  'Amrita Vishwa Vidyapeetham': 'https://www.amrita.edu',
  'University of Oxford': 'https://www.ox.ac.uk',
  'University of Cambridge': 'https://www.cam.ac.uk',
  'Imperial College London': 'https://www.imperial.ac.uk',
  'University College London': 'https://www.ucl.ac.uk',
  'London School of Economics': 'https://www.lse.ac.uk',
  'University of Edinburgh': 'https://www.ed.ac.uk',
  "King's College London": 'https://www.kcl.ac.uk',
  'University of Manchester': 'https://www.manchester.ac.uk',
  'University of Bristol': 'https://www.bristol.ac.uk',
  'University of Warwick': 'https://warwick.ac.uk',
  'University of Glasgow': 'https://www.gla.ac.uk',
  'Durham University': 'https://www.durham.ac.uk',
  'University of St Andrews': 'https://www.st-andrews.ac.uk',
  'University of Southampton': 'https://www.southampton.ac.uk',
  'University of Birmingham': 'https://www.birmingham.ac.uk',
  'University of Leeds': 'https://www.leeds.ac.uk',
  'University of Sheffield': 'https://www.sheffield.ac.uk',
  'University of Nottingham': 'https://www.nottingham.ac.uk',
  'University of York': 'https://www.york.ac.uk',
  'University of Exeter': 'https://www.exeter.ac.uk',
  'Cardiff University': 'https://www.cardiff.ac.uk',
  'Queen Mary University of London': 'https://www.qmul.ac.uk',
  'Lancaster University': 'https://www.lancaster.ac.uk',
  'University of Bath': 'https://www.bath.ac.uk',
  'Loughborough University': 'https://www.lboro.ac.uk',
  'Newcastle University': 'https://www.ncl.ac.uk',
  'University of Liverpool': 'https://www.liverpool.ac.uk',
  'University of Aberdeen': 'https://www.abdn.ac.uk',
  "Queen's University Belfast": 'https://www.qub.ac.uk',
  'University of Sussex': 'https://www.sussex.ac.uk',
  'University of Surrey': 'https://www.surrey.ac.uk',
  'University of Reading': 'https://www.reading.ac.uk',
  'Royal Holloway University of London': 'https://www.royalholloway.ac.uk',
  'SOAS University of London': 'https://www.soas.ac.uk',
  "City St George's University of London": 'https://www.citystgeorges.ac.uk',
  'University of Strathclyde': 'https://www.strath.ac.uk',
  'Heriot-Watt University': 'https://www.hw.ac.uk',
  'University of Dundee': 'https://www.dundee.ac.uk',
  'Harvard University': 'https://www.harvard.edu',
  'Yale University': 'https://www.yale.edu',
  'Princeton University': 'https://www.princeton.edu',
  'Columbia University': 'https://www.columbia.edu',
  'University of Pennsylvania': 'https://www.upenn.edu',
  'Brown University': 'https://www.brown.edu',
  'Dartmouth College': 'https://home.dartmouth.edu',
  'Cornell University': 'https://www.cornell.edu',
  'Massachusetts Institute of Technology': 'https://www.mit.edu',
  'Stanford University': 'https://www.stanford.edu',
  'California Institute of Technology': 'https://www.caltech.edu',
  'University of Chicago': 'https://www.uchicago.edu',
  'Duke University': 'https://duke.edu',
  'Northwestern University': 'https://www.northwestern.edu',
  'Johns Hopkins University': 'https://www.jhu.edu',
  'University of California Berkeley': 'https://www.berkeley.edu',
  'University of California Los Angeles': 'https://www.ucla.edu',
  'University of California San Diego': 'https://ucsd.edu',
  'University of California Davis': 'https://www.ucdavis.edu',
  'University of California Irvine': 'https://uci.edu',
  'University of California Santa Barbara': 'https://www.ucsb.edu',
  'University of Michigan': 'https://umich.edu',
  'University of Texas at Austin': 'https://www.utexas.edu',
  'University of Illinois Urbana-Champaign': 'https://illinois.edu',
  'Georgia Institute of Technology': 'https://www.gatech.edu',
  'Carnegie Mellon University': 'https://www.cmu.edu',
  'New York University': 'https://www.nyu.edu',
  'University of Southern California': 'https://www.usc.edu',
  'Boston University': 'https://www.bu.edu',
  'Boston College': 'https://www.bc.edu',
  'Tufts University': 'https://www.tufts.edu',
  'University of Notre Dame': 'https://www.nd.edu',
  'Vanderbilt University': 'https://www.vanderbilt.edu',
  'Rice University': 'https://www.rice.edu',
  'Emory University': 'https://www.emory.edu',
  'Georgetown University': 'https://www.georgetown.edu',
  'Wake Forest University': 'https://about.wfu.edu',
  'College of William and Mary': 'https://www.wm.edu',
  'University of North Carolina at Chapel Hill': 'https://www.unc.edu',
  'University of Virginia': 'https://www.virginia.edu',
  'University of Wisconsin-Madison': 'https://www.wisc.edu',
  'Ohio State University': 'https://www.osu.edu',
  'Purdue University': 'https://www.purdue.edu',
  'Pennsylvania State University': 'https://psu.edu',
  'Texas A&M University': 'https://www.tamu.edu',
  'University of Florida': 'https://www.ufl.edu',
  'Arizona State University': 'https://www.asu.edu',
  'University of Washington': 'https://www.washington.edu',
  'University of Toronto': 'https://www.utoronto.ca',
  'University of British Columbia': 'https://www.ubc.ca',
  'McGill University': 'https://www.mcgill.ca',
  'University of Waterloo': 'https://uwaterloo.ca',
  'University of Alberta': 'https://www.ualberta.ca',
  'Universite de Montreal': 'https://umontreal.ca',
  'McMaster University': 'https://www.mcmaster.ca',
  'Western University': 'https://www.uwo.ca',
  "Queen's University": 'https://www.queensu.ca',
  'University of Ottawa': 'https://www.uottawa.ca',
  'University of Calgary': 'https://www.ucalgary.ca',
  'Dalhousie University': 'https://www.dal.ca',
  'Simon Fraser University': 'https://www.sfu.ca',
  'University of Victoria': 'https://www.uvic.ca',
  'York University': 'https://www.yorku.ca',
  'Concordia University': 'https://www.concordia.ca',
  'Carleton University': 'https://carleton.ca',
  'University of Manitoba': 'https://umanitoba.ca',
  'University of Saskatchewan': 'https://www.usask.ca',
  'NYU Abu Dhabi': 'https://nyuad.nyu.edu',
  'American University of Sharjah': 'https://www.aus.edu',
  'Khalifa University': 'https://www.ku.ac.ae',
  'United Arab Emirates University': 'https://www.uaeu.ac.ae',
  'American University in Dubai': 'https://www.aud.edu',
  'Zayed University': 'https://www.zu.ac.ae',
  'University of Sharjah': 'https://www.sharjah.ac.ae',
  'Heriot-Watt University Dubai': 'https://www.hw.ac.uk/dubai',
  'Middlesex University Dubai': 'https://www.mdx.ac.ae',
  'Trinity College Dublin': 'https://www.tcd.ie',
  'University College Dublin': 'https://www.ucd.ie',
  'University College Cork': 'https://www.ucc.ie',
  'University of Galway': 'https://www.universityofgalway.ie',
  'Dublin City University': 'https://www.dcu.ie',
  'University of Limerick': 'https://www.ul.ie',
  'Maynooth University': 'https://www.maynoothuniversity.ie',
  'Bocconi University': 'https://www.unibocconi.it',
  'Politecnico di Milano': 'https://www.polimi.it',
  'Sapienza University of Rome': 'https://www.uniroma1.it',
  'University of Bologna': 'https://www.unibo.it',
  'Politecnico di Torino': 'https://www.polito.it',
  'University of Padua': 'https://www.unipd.it',
  'University of Milan': 'https://www.unimi.it',
  'Scuola Normale Superiore di Pisa': 'https://www.sns.it',
  "Sant'Anna School of Advanced Studies": 'https://www.santannapisa.it',
  'Sorbonne University': 'https://www.sorbonne-universite.fr',
  'Universite PSL': 'https://psl.eu',
  'Ecole Polytechnique': 'https://www.polytechnique.edu',
  'Sciences Po': 'https://www.sciencespo.fr',
  'HEC Paris': 'https://www.hec.edu',
  'Ecole Normale Superieure Paris': 'https://www.ens.psl.eu',
  'Universite Paris-Saclay': 'https://www.universite-paris-saclay.fr',
  'INSEAD': 'https://www.insead.edu',
  'ESSEC Business School': 'https://www.essec.edu',
  'ESCP Business School': 'https://www.escp.eu',
  'University of Tokyo': 'https://www.u-tokyo.ac.jp',
  'Kyoto University': 'https://www.kyoto-u.ac.jp',
  'Osaka University': 'https://www.osaka-u.ac.jp',
  'Tohoku University': 'https://www.tohoku.ac.jp',
  'Tokyo Institute of Technology': 'https://www.isct.ac.jp',
  'Nagoya University': 'https://www.nagoya-u.ac.jp',
  'Kyushu University': 'https://www.kyushu-u.ac.jp',
  'Hokkaido University': 'https://www.hokudai.ac.jp',
  'Waseda University': 'https://www.waseda.jp',
  'Keio University': 'https://www.keio.ac.jp',
  'University of Hong Kong': 'https://www.hku.hk',
  'Hong Kong University of Science and Technology': 'https://hkust.edu.hk',
  'Chinese University of Hong Kong': 'https://www.cuhk.edu.hk',
  'City University of Hong Kong': 'https://www.cityu.edu.hk',
  'Hong Kong Polytechnic University': 'https://www.polyu.edu.hk',
  'Hong Kong Baptist University': 'https://www.hkbu.edu.hk',
  'Lingnan University': 'https://www.ln.edu.hk',
  'Tsinghua University': 'https://www.tsinghua.edu.cn',
  'Peking University': 'https://english.pku.edu.cn',
  'Fudan University': 'https://www.fudan.edu.cn',
  'Shanghai Jiao Tong University': 'https://en.sjtu.edu.cn',
  'Zhejiang University': 'https://www.zju.edu.cn',
  'University of Science and Technology of China': 'https://www.ustc.edu.cn',
  'Nanjing University': 'https://www.nju.edu.cn',
  'Wuhan University': 'https://www.whu.edu.cn',
  'Sun Yat-sen University': 'https://www.sysu.edu.cn',
  'Harbin Institute of Technology': 'https://www.hit.edu.cn',
  'Beihang University': 'https://www.buaa.edu.cn',
  'Tongji University': 'https://www.tongji.edu.cn',
}));

function slugify(value) { return value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function canonicalName(value) { return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').replace(/\bthe\b/g, '').replace(/\s+/g, ' ').trim(); }

function importedInstitutions() {
  const csv = fs.readFileSync(new URL('../data/universities.csv', import.meta.url), 'utf8');
  return csv.split(/\r?\n/).slice(1).filter(Boolean).map((line) => {
    const separator = line.indexOf(',');
    const countryName = line.slice(0, separator).trim();
    const name = line.slice(separator + 1).trim();
    return { key: `csv-${slugify(`${countryName}-${name}`)}`, name, short: name, country: countryCodes.get(countryName), city: null, type: 'RESEARCH', website: officialSites.get(name) || null };
  }).filter((row) => row.country);
}

const catalogInstitutions = [...institutions, ...importedInstitutions()].filter((row, index, rows) => {
  const identity = `${row.country}|${canonicalName(row.name)}`;
  return rows.findIndex((candidate) => `${candidate.country}|${canonicalName(candidate.name)}` === identity) === index;
});

const programRows = [
  { key: 'prog-oxford-data', slug: 'msc-social-data-science', name: 'MSc Social Data Science', institution: 'inst-oxford', subject: 'Data science & society', degree: 'Master of Science', level: "Master's", duration: '10 months' },
  { key: 'prog-toronto-info', slug: 'master-information', name: 'Master of Information', institution: 'inst-toronto', subject: 'Information studies', degree: 'Master of Information', level: "Master's", duration: '2 years' },
  { key: 'prog-ashoka-cs', slug: 'ba-computer-science', name: 'BA (Hons) Computer Science', institution: 'inst-ashoka', subject: 'Computer science', degree: 'Bachelor of Arts (Honours)', level: 'Undergraduate', duration: '4 years' },
  { key: 'prog-nyuad-cs', slug: 'ba-computer-science-nyuad', name: 'BA Computer Science', institution: 'inst-nyuad', subject: 'Computer science', degree: 'Bachelor of Arts', level: 'Undergraduate', duration: '4 years' },
  { key: 'prog-tokyo-data', slug: 'msc-social-data-science-tokyo', name: 'Master’s Program in Data Science', institution: 'inst-tokyo', subject: 'Data science', degree: 'Master of Science', level: "Master's", duration: '2 years' },
];

async function ensureMarket(code, name, currencyCode) {
  return prisma.country.upsert({ where: { code }, update: { name, currencyCode }, create: { code, name, currencyCode } });
}

async function ensureCity(countryId, name) {
  const found = await prisma.city.findFirst({ where: { countryId, name } });
  return found || prisma.city.create({ data: { countryId, name } });
}

async function main() {
  const countries = new Map();
  for (const [code, name, currencyCode] of marketRows) countries.set(code, await ensureMarket(code, name, currencyCode));
  const ae = countries.get('AE');
  if (ae) await ensureCity(ae.id, 'Dubai');

  const institutionMap = new Map();
  for (const row of catalogInstitutions) {
    const country = countries.get(row.country);
    const city = country && row.city ? await ensureCity(country.id, row.city) : null;
    const institution = await prisma.institution.upsert({
      where: { stableKey: row.key },
      update: { officialName: row.name, commonName: row.short, website: row.website, cityId: city?.id, countryId: country?.id },
      create: { stableKey: row.key, officialName: row.name, commonName: row.short, type: row.type, website: row.website, countryId: country.id, cityId: city?.id },
    });
    institutionMap.set(row.key, institution);
  }

  for (const row of programRows) {
    const institution = institutionMap.get(row.institution);
    if (!institution) continue;
    const faculty = await prisma.faculty.upsert({ where: { institutionId_name: { institutionId: institution.id, name: 'Academic Studies' } }, update: {}, create: { institutionId: institution.id, name: 'Academic Studies' } });
    const department = await prisma.department.upsert({ where: { facultyId_name: { facultyId: faculty.id, name: row.subject } }, update: {}, create: { facultyId: faculty.id, name: row.subject } });
    const subject = await prisma.subject.upsert({ where: { name: row.subject }, update: {}, create: { name: row.subject } });
    const existingDegree = await prisma.degree.findFirst({ where: { name: row.degree, level: row.level, countryId: null } });
    const degree = existingDegree || await prisma.degree.create({ data: { name: row.degree, level: row.level } });
    await prisma.program.upsert({
      where: { stableKey: row.key },
      update: { officialName: row.name, slug: row.slug, duration: row.duration },
      create: { stableKey: row.key, slug: row.slug, officialName: row.name, institutionId: institution.id, facultyId: faculty.id, departmentId: department.id, subjectId: subject.id, degreeId: degree.id, level: row.level, mode: 'FULL_TIME', duration: row.duration, language: 'English', overview: 'Seed record — verify against the current official program source before publishing.' },
    });
  }

  console.log(`Seeded ${countries.size} markets, ${institutionMap.size} institutions, and ${programRows.length} programs.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => { await prisma.$disconnect(); });
