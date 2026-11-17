import { ChurchInfo } from '../types';

export const churchInfo: ChurchInfo = {
  name: "Faith United Church of Christ",
  tagline: "An Open and Affirming (ONA) Progressive Christian Sanctuary in the Texas Hill Country",
  denomination: "United Church of Christ (UCC) • Open and Affirming (ONA)",
  address: {
    street: "970 Loop 337",
    city: "New Braunfels",
    state: "TX",
    zip: "78130",
    full: "970 Loop 337, New Braunfels, TX 78130",
    mapsUrl: "https://maps.google.com/?q=Faith+United+Church+of+Christ+970+Loop+337+New+Braunfels+TX+78130"
  },
  contact: {
    phone: "(830) 625-6761",
    email: "faithuccinfo@faithuccnb.org",
    officeHours: "Tuesday – Thursday: 9:00 AM – 2:00 PM"
  },
  service: {
    day: "Every Sunday Morning",
    time: "10:00 AM CST",
    locationNote: "In-Person in our Sanctuary & Live Online via Zoom",
    zoomUrl: "https://us04web.zoom.us/j/586745671?pwd=aG0wUnZTR3NIKzBXUXp1Vkh2KzJXQT09",
    zoomPasscode: "Meeting ID: 586 745 671",
    sundaySchoolTime: "11:20 AM – 12:20 PM CST",
    communionNote: "Celebrated on the first Sunday of every month. Christ’s communion table is unconditionally open to all—no prerequisites, no barriers, and no doctrinal tests."
  },
  realmGiveUrl: "https://onrealm.org/FaithUnitedChur/give/now",
  youtubeUrl: "https://www.youtube.com/@faithunitedchurchofchinesnb",
  facebookUrl: "https://www.facebook.com/FaithUCCNewBraunfels"
};

export const onaDeclaration = {
  headline: "An Open and Affirming (ONA) Sanctuary",
  motto: "Never place a period where God has placed a comma.",
  subhead: "No matter who you are, or where you are on life’s journey, you are welcome here.",
  covenantText: `Faith United Church of Christ in New Braunfels is an Open and Affirming (ONA) congregation of the United Church of Christ. We explicitly and joyfully covenant to welcome, affirm, and celebrate people of every sexual orientation, gender identity, and gender expression into the full life, sacraments, leadership, and ministries of our church.

We believe that every human being is created in the holy image of God, and that human diversity is a sacred gift to be cherished rather than merely tolerated. Whether you are lesbian, gay, bisexual, transgender, non-binary, queer, questioning, straight, cisgender, single, partnered, married, exploring faith for the first time, or healing from religious exclusion—you have a sacred home with us.

At Faith UCC, Christ’s table has no walls, no checkpoints, and no qualifications. Grace meets you just as you are.`,
  shortStatement: "We explicitly welcome, affirm, and celebrate people of all sexual orientations, gender identities, and gender expressions in every aspect of our church life, worship, and leadership.",
  commitments: [
    {
      title: "Full LGBTQ+ Inclusion & Ordination",
      description: "Lesbian, gay, bisexual, transgender, non-binary, and queer siblings lead our worship, teach our classes, serve on council, and bless our sacraments."
    },
    {
      title: "A Haven of Healing from Religious Hurt",
      description: "For anyone told that God’s love is conditional or that their identity is broken, we offer sacred space for spiritual recovery, authentic grief, and renewed joy."
    },
    {
      title: "All Families Cherished",
      description: "We celebrate couples of all genders, single parents, adoptive and foster families, blended homes, and chosen families as sacred reflections of God’s grace."
    },
    {
      title: "Christ’s Table Has No Walls",
      description: "On the first Sunday of each month, we share communion. There are no doctrinal hurdles or membership requirements—Christ is the host and everyone is invited."
    }
  ]
};

export const onaStatement = onaDeclaration.covenantText;

export const pastorData = {
  name: "Rev. Dr. Carla Cheatham",
  title: "Pastor & Teacher",
  credentials: "M.Div., Ph.D., M.A. in Psychology",
  quote: "Faith is not about having all the answers wrapped in a bow. It is about daring to bring our whole, authentic selves—with our questions, hopes, grief, and joy—into sacred community.",
  bio: `Rev. Dr. Carla Cheatham has served as Pastor and Teacher of Faith UCC since January 1, 2021. 

Holding a Master of Divinity from Perkins School of Theology at Southern Methodist University, a Ph.D. in Health & Kinesiology from Texas A&M University (specializing in spirituality and wellness), and a Master’s degree in Psychology with certification in trauma therapy, Pastor Carla brings a pastoral ministry rooted in unconditional compassion, emotional intelligence, and restorative healing.

Prior to her call to Faith UCC, she directed an interfaith worker justice coalition, served ten years as a hospice chaplain and bereavement coordinator in Austin, and founded a national consulting group educating healthcare and mental health professionals in healthy boundaries and grief support. She is the author of "Hospice Whispers: Stories of Life" and "Sharing Our Stories: An Interactive Grief Journal".

Pastor Carla's ministry reflects the core conviction that God is still speaking, that love is an active commitment to justice, and that every soul is irreplaceable.`,
  specialties: [
    "Trauma-Informed Pastoral Care & Healing",
    "Grief Accompaniment & Bereavement Support",
    "Author of 'Hospice Whispers: Stories of Life'",
    "Open & Affirming LGBTQ+ Spiritual Care",
    "Interfaith Solidarity & Community Advocacy"
  ]
};

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
  detail: string;
}

export const sanctuaryMilestones: MilestoneItem[] = [
  {
    year: "1975",
    title: "Gathering in Faith",
    description: "Gifted land along Loop 337, the congregation held its very first worship service on December 21, 1975, creating a community of open inquiry and loving fellowship in New Braunfels.",
    detail: "Gifted land along Loop 337, the congregation held its very first worship service on December 21, 1975, creating a community of open inquiry and loving fellowship in New Braunfels."
  },
  {
    year: "1998",
    title: "Groundbreaking for a Permanent Home",
    description: "To provide an enduring home for expanding mission work and worship, the congregation broke ground on our current sanctuary building along Loop 337.",
    detail: "To provide an enduring home for expanding mission work and worship, the congregation broke ground on our current sanctuary building along Loop 337."
  },
  {
    year: "1999",
    title: "Sanctuary Dedication on July 4th",
    description: "On Independence Day 1999, the congregation celebrated its first service in our permanent sanctuary at 970 Loop 337, dedicated to spiritual freedom and compassionate service.",
    detail: "On Independence Day 1999, the congregation celebrated its first service in our permanent sanctuary at 970 Loop 337, dedicated to spiritual freedom and compassionate service."
  },
  {
    year: "2004",
    title: "Open and Affirming Covenant",
    description: "Faith UCC officially adopted its Open and Affirming covenant, becoming a visible beacon of unconditional LGBTQ+ welcome and affirmation in Comal County.",
    detail: "Faith UCC officially adopted its Open and Affirming covenant, becoming a visible beacon of unconditional LGBTQ+ welcome and affirmation in Comal County."
  },
  {
    year: "2021",
    title: "Calling Rev. Dr. Carla Cheatham",
    description: "Pastor Carla began her pastorate on New Year’s Day 2021, bringing profound trauma-informed care, hospice bereavement expertise, and passionate justice advocacy.",
    detail: "Pastor Carla began her pastorate on New Year’s Day 2021, bringing profound trauma-informed care, hospice bereavement expertise, and passionate justice advocacy."
  },
  {
    year: "Today",
    title: "A Vibrant, Living Sanctuary",
    description: "Under Pastor Carla's leadership, Faith UCC continues to expand hunger relief with the SOS Food Bank, civil rights with the MLK Association, the joyful vocal ministry of the Love Choir, and hybrid worship for friends near and far.",
    detail: "Under Pastor Carla's leadership, Faith UCC continues to expand hunger relief with the SOS Food Bank, civil rights with the MLK Association, the joyful vocal ministry of the Love Choir, and hybrid worship for friends near and far."
  }
];

export const historyMilestones = sanctuaryMilestones;

export const guidingPillars = [
  {
    title: "Faith as a Quest",
    summary: "We do not believe faith means checking your brain at the sanctuary door. We encourage rigorous thinking, honest inquiry, and listening for God's voice in contemporary scholarship and science."
  },
  {
    title: "Love as an Action",
    summary: "Love is more than sentiment. We demonstrate our love through hands-on service: feeding families via the SOS Food Bank, marching with the MLK Association, and advocating for civil rights and bodily autonomy."
  },
  {
    title: "Radical Community",
    summary: "In a polarized culture, we cultivate a sacred space where generations, backgrounds, and diverse lives sit together at Christ’s table, bound not by dogma, but by love."
  }
];
