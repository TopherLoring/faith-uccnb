// Every fact here is drawn from faithuccnb.org (home, About, ONA Statement, Church History,
// Mission & Outreach, About our Pastor) or Pastor Carla's published bios. Don't add claims that
// can't be traced to one of those.

export const church = {
  name: 'Faith United Church of Christ',
  short: 'Faith UCC',
  city: 'New Braunfels, Texas',
  address: { street: '970 Loop 337', city: 'New Braunfels', state: 'TX', zip: '78130' },
  addressLine: '970 Loop 337, New Braunfels, TX 78130',
  phone: '(830) 625-6761',
  phoneHref: 'tel:+18306256761',
  email: 'faithuccinfo@faithuccnb.org',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Faith+United+Church+of+Christ+970+Loop+337+New+Braunfels+TX+78130',
  mapsEmbed: 'https://maps.google.com/maps?q=970%20Loop%20337%2C%20New%20Braunfels%2C%20TX%2078130&z=15&output=embed',
  zoomUrl: 'https://us04web.zoom.us/j/586745671?pwd=aG0wUnZTR3NIKzBXUXp1Vkh2KzJXQT09',
  zoomMeetingId: '586 745 671',
  missionCore:
    'A welcoming community that seeks to embrace diversity, empower a spirit of service, explore the mysteries of God and life’s complexities while engaging as Christians in the work of justice for all creation.',
  giveUrl: 'https://onrealm.org/FaithUnitedChur/give/now',
  pledgeUrl: 'https://www.faithuccnb.org/2022pledge/',
  facebookUrl: 'https://www.facebook.com/FaithUCCNewBraunfels',
  twitterUrl: 'https://twitter.com/FaithUCCNB',
  photosUrl: 'http://photos.faithuccnb.org',
  newsletterUrl: 'https://www.faithuccnb.org/newsletters/',
  rentalUrl: 'https://www.faithuccnb.org/estimates/',
  directoryUrl: 'https://www.faithuccnb.org/church-directory/',
  onaStatementUrl: 'https://www.faithuccnb.org/ona-statement/',
  mission:
    'Faith United Church of Christ – New Braunfels is a welcoming community that seeks to embrace diversity, empower a spirit of service, explore the mysteries of God and life’s complexities while engaging as Christians in the work of justice for all creation!',
};

/** Worship runs 10:00–11:20 a.m. Central, Sundays. */
export const worship = { startHour: 10, startMinute: 0, endHour: 11, endMinute: 20, zoomOpensMinutesBefore: 10 };

export type RecurrenceRule =
  | { kind: 'weekly'; weekday: number }
  | { kind: 'nth'; weekday: number; n: number }
  | { kind: 'last'; weekday: number };

export interface Gathering {
  id: string;
  title: string;
  when: string;
  time?: string;
  rule: RecurrenceRule;
  blurb: string;
}

export const gatherings: Gathering[] = [
  {
    id: 'worship',
    title: 'Sunday worship',
    when: 'Every Sunday',
    time: '10:00–11:20 a.m.',
    rule: { kind: 'weekly', weekday: 0 },
    blurb: 'In the sanctuary and on Zoom. Hymns, scripture, a sermon, the children’s message, and the choir.',
  },
  {
    id: 'sunday-school',
    title: 'Sunday school',
    when: 'Every Sunday',
    time: '11:20 a.m.–12:20 p.m.',
    rule: { kind: 'weekly', weekday: 0 },
    blurb: 'For kids and families, right after worship.',
  },
  {
    id: 'book-group',
    title: 'Book discussion group',
    when: 'Every Sunday',
    time: '11:30 a.m.–12:30 p.m.',
    rule: { kind: 'weekly', weekday: 0 },
    blurb: 'Adults reading and arguing together. Currently: Leslie Weatherhead’s The Will of God. Everyone welcome.',
  },
  {
    id: 'communion',
    title: 'Communion',
    when: 'First Sundays',
    rule: { kind: 'nth', weekday: 0, n: 1 },
    blurb: 'Shared during worship. The table is open to everyone, no membership or background required.',
  },
  {
    id: 'youth-family',
    title: 'Youth & family social',
    when: 'First Sundays',
    rule: { kind: 'nth', weekday: 0, n: 1 },
    blurb: 'Kids, parents, and whoever came with them, hanging out after church.',
  },
  {
    id: 'theology-on-tap',
    title: 'Theology on Tap',
    when: 'Third Sundays',
    rule: { kind: 'nth', weekday: 0, n: 3 },
    blurb: 'Open-minded conversation where every question is fair game. Bring the one you’re not supposed to ask.',
  },
  {
    id: 'game-night',
    title: 'Game night',
    when: 'Last Saturdays',
    rule: { kind: 'last', weekday: 6 },
    blurb: 'Board games, cards, snacks. All ages.',
  },
];

export interface Milestone {
  year: string;
  title: string;
  body: string;
  tag?: 'welcome' | 'home' | 'service';
}

export const milestones: Milestone[] = [
  {
    year: '1966',
    title: 'Thirty people and an idea',
    body: 'First Protestant UCC sponsors a second congregation in town. Faith is commissioned on September 4 with 21 adults and 9 children.',
    tag: 'home',
  },
  {
    year: '1966–74',
    title: 'Church without a building',
    body: 'Worship moves between Eden Home, the Landa Professional Building, Comal Middle School, and Slumber Falls Camp.',
    tag: 'home',
  },
  {
    year: '1974',
    title: 'The Baese family gives the land',
    body: 'Construction starts on the first building, today’s Baese Fellowship Hall.',
    tag: 'home',
  },
  {
    year: '1975',
    title: 'First service on Loop 337',
    body: 'December 21, in a building that wasn’t finished yet.',
    tag: 'home',
  },
  {
    year: '1976',
    title: 'The cross',
    body: 'Rev. Robert Shock, Faith’s first pastor, builds the wooden cross that still hangs in the sanctuary.',
    tag: 'home',
  },
  {
    year: '1999',
    title: 'A new sanctuary',
    body: 'Ground broken in 1998; first worship on July 4, 1999. Art glass windows dedicated in 2001.',
    tag: 'home',
  },
  {
    year: '2002',
    title: 'Blessing same-sex unions',
    body: 'Faith begins celebrating same-sex unions, more than a decade before Obergefell.',
    tag: 'welcome',
  },
  {
    year: '2007',
    title: 'Lending with Kiva',
    body: 'Members start making microloans. The total is now over $63,000, to borrowers in 85 countries.',
    tag: 'service',
  },
  {
    year: '2009',
    title: 'Open and Affirming',
    body: 'After discernment and a church-wide conversation, the congregation votes to become ONA.',
    tag: 'welcome',
  },
  {
    year: '2010',
    title: 'Burning the note',
    body: 'The sanctuary mortgage is called with about 45 days’ notice. Elmo Fischer offers a 1:1 match, the congregation raises the rest, and the note is burned in February.',
    tag: 'home',
  },
  {
    year: '2015',
    title: 'First in Comal County',
    body: 'Two Faith members become the first couple legally married in the county.',
    tag: 'welcome',
  },
  {
    year: '2015',
    title: 'LEAP begins',
    body: 'Faith founds LEAP, free tutoring for adults who struggle to read.',
    tag: 'service',
  },
  {
    year: '2021',
    title: 'Pride comes to New Braunfels',
    body: 'The city’s Pride festival begins, and Faith shows up for it.',
    tag: 'welcome',
  },
  {
    year: '2021',
    title: 'Pastor Carla arrives',
    body: 'Rev. Dr. Carla Cheatham begins as pastor on January 1.',
    tag: 'home',
  },
];

export interface Partner {
  id: string;
  name: string;
  role: string;
  body: string;
  since?: string;
  url?: string;
  photo?: string;
}

export const partners: Partner[] = [
  {
    id: 'sos',
    name: 'SOS Food Bank',
    role: 'Feeding neighbors',
    since: '40+ years',
    body: 'Members serve at Spirit of Sharing, New Braunfels’ food bank. Faith has backed it for more than four decades.',
    url: 'https://sosfoodbank.org',
    photo: '/photos/sos-food-bank.webp',
  },
  {
    id: 'family-promise',
    name: 'Family Promise',
    role: 'Housing families',
    since: 'Founding member',
    body: 'Faith helped start the local Family Promise network, which supports families experiencing homelessness.',
    url: 'https://fpgnb.org',
  },
  {
    id: 'leap',
    name: 'LEAP',
    role: 'Adult literacy',
    since: 'Founded by Faith, 2015',
    body: 'Free one-on-one tutoring for adults who struggle to read. Started here, still running.',
  },
  {
    id: 'kiva',
    name: 'Kiva',
    role: 'Microlending',
    since: 'Since 2007',
    body: 'Over $63,000 lent to borrowers in underserved communities across 85 countries, repaid and lent again.',
    url: 'https://www.kiva.org',
  },
  {
    id: 'mlk',
    name: 'MLK New Braunfels',
    role: 'Racial justice',
    since: 'Since the first march',
    body: 'Faith has walked in the city’s MLK march since it began, and works with the MLK New Braunfels Association year-round.',
    url: 'https://nbmlk.com',
  },
  {
    id: 'pride',
    name: 'Local Pride',
    role: 'Showing up',
    since: 'Since 2021',
    body: 'When New Braunfels Pride started, Faith was there. We support local Pride events every year.',
  },
];

export const pastor = {
  name: 'Rev. Dr. Carla Cheatham',
  role: 'Pastor',
  since: 'January 1, 2021',
  photo: '/photos/pastor-carla.webp',
  bio: [
    'Carla started out in social services, with an M.A. in psychology, certification in trauma therapy, and years in counseling and treatment centers. She went on to earn a Ph.D. in Health & Kinesiology and an M.Div.',
    'Before Faith, she directed an interfaith nonprofit supporting worker justice, then spent a decade as a hospice chaplain and bereavement coordinator in Austin. She is the author of Hospice Whispers: Stories of Life and its companion grief workbook, and still teaches nationally on grief, compassion fatigue, and healthy boundaries.'
  ],
};

export const uccFirsts = [
  { year: '1785', text: 'Ordains its first African American pastor' },
  { year: '1853', text: 'Ordains its first woman' },
  { year: '1972', text: 'Ordains its first openly gay pastor' },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: 'What should I wear?',
    a: 'There’s no dress code. Wear what you’re comfortable in.',
  },
  {
    q: 'Do I have to be a Christian? Or believe a certain thing?',
    a: 'No. Faith is a place to explore the mysteries of God and life’s complexities, not a place to sign off on a list. Doubters, seekers, and people healing from churches that hurt them are all here.',
  },
  {
    q: 'I’m LGBTQ+. Is this actually safe?',
    a: 'Yes, and not just on paper. We voted to become Open and Affirming in 2009, have blessed same-sex unions since 2002, and members of this church were the first couple legally married in Comal County. You’re welcome into full membership and participation, as yourself.',
  },
  {
    q: 'Can I take communion?',
    a: 'Yes. Communion is on the first Sunday of each month and the table is open to everyone. No membership, baptism, or background required.',
  },
  {
    q: 'What about my kids?',
    a: 'Kids are welcome in worship. There’s a children’s message during the service, Sunday school from 11:20 to 12:20, and a youth and family social on first Sundays.',
  },
  {
    q: 'Can I just watch first?',
    a: 'Absolutely. Worship is live on Zoom every Sunday at 10. No sign-up, and you can keep your camera off.',
  },
  {
    q: 'Accessibility questions?',
    a: 'Call the church office at (830) 625-6761 or email us and we’ll make sure you have what you need before you arrive.',
  },
];
