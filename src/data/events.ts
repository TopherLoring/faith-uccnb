import { ChurchEvent } from '../types';

export const upcomingEvents: ChurchEvent[] = [
  {
    id: 'sunday-worship-weekly',
    title: 'Sunday Worship Service',
    date: 'Every Sunday Morning',
    time: '10:00 AM – 11:15 AM CST',
    location: 'Sanctuary (970 Loop 337, New Braunfels) & Live on Zoom',
    category: 'worship',
    description: 'Our core gathering for inclusive liturgy, soul-stirring music by the Love Choir, pastoral reflection by Rev. Dr. Carla Cheatham, and open prayer. Communion is celebrated on the first Sunday of every month—Christ’s table has no walls, and all are welcome.',
    isRecurring: true,
    recurrenceRule: 'Weekly on Sundays at 10:00 AM',
    actionUrl: 'https://us04web.zoom.us/j/586745671?pwd=aG0wUnZTR3NIKzBXUXp1Vkh2KzJXQT09'
  },
  {
    id: 'sunday-school-discussion',
    title: 'Sunday School & Faith Forum',
    date: 'Every Sunday Morning',
    time: '11:20 AM – 12:20 PM CST',
    location: 'Fellowship Hall & Zoom',
    category: 'fellowship',
    description: 'Thoughtful discussions exploring progressive Christian theology, contemporary ethical issues, and inspiring books. A relaxed space where hard questions, diverse viewpoints, and honest doubts are honored as sacred.',
    isRecurring: true,
    recurrenceRule: 'Weekly on Sundays following worship'
  },
  {
    id: 'fellowship-coffee-hour',
    title: 'Fellowship & Coffee Hour',
    date: 'Every Sunday Morning',
    time: '11:15 AM – 12:00 PM CST',
    location: 'Fellowship Hall (970 Loop 337)',
    category: 'fellowship',
    description: 'Join us right after worship for hot coffee, tea, homemade treats, and friendly conversation. An unhurried, pressure-free time to connect with Pastor Carla and make new friends.',
    isRecurring: true,
    recurrenceRule: 'Weekly on Sundays at 11:15 AM'
  },
  {
    id: 'theology-on-tap-monthly',
    title: 'Theology on Tap',
    date: 'Third Sunday of the Month',
    time: '5:00 PM – 7:00 PM CST',
    location: 'Local New Braunfels Gathering Spot',
    category: 'fellowship',
    description: 'Pull up a chair at a local New Braunfels patio for honest, relaxed conversation about spirituality, culture, justice, and life over food and drinks. All perspectives and beverage preferences warmly welcome!',
    isRecurring: true,
    recurrenceRule: '3rd Sunday of each month'
  },
  {
    id: 'youth-family-social',
    title: 'Youth & Family First-Sunday Social',
    date: 'First Sunday of the Month',
    time: '11:30 AM – 1:00 PM CST',
    location: 'Fellowship Hall & Campus Grounds',
    category: 'social',
    description: 'A special time for kids, youth, and families of every configuration to bond over a shared lunch, creative crafts, outdoor lawn games, and hands-on community service projects.',
    isRecurring: true,
    recurrenceRule: '1st Sunday of each month'
  },
  {
    id: 'game-night-monthly',
    title: 'Intergenerational Community Game Night',
    date: 'Last Saturday of the Month',
    time: '6:00 PM – 8:30 PM CST',
    location: 'Fellowship Hall (970 Loop 337)',
    category: 'social',
    description: 'All-ages board game and card night with delicious snacks and lots of laughter. Bring your favorite tabletop game or join an open group for friendly, relaxed fun.',
    isRecurring: true,
    recurrenceRule: 'Last Saturday of each month'
  },
  {
    id: 'sos-food-collection',
    title: 'SOS Food Bank In-Gathering',
    date: 'Every Sunday Morning',
    time: 'During Worship (10:00 AM)',
    location: 'Sanctuary Narthex Collection Baskets',
    category: 'service',
    description: 'Bring non-perishable food essentials (canned meats, peanut butter, brown rice, whole grain cereals) and toiletries to support our neighbors through the Spirit of Sharing Food Bank in New Braunfels.',
    isRecurring: true,
    recurrenceRule: 'Ongoing weekly'
  },
  {
    id: 'love-choir-rehearsal',
    title: 'The Love Choir Rehearsal',
    date: 'Every Thursday Evening',
    time: '6:30 PM – 8:00 PM CST',
    location: 'Sanctuary (970 Loop 337)',
    category: 'worship',
    description: 'Singing anthems of hope, justice, and extravagant love. All voices and experience levels are warmly welcomed—no auditions required. Come add your voice to our joyful song.',
    isRecurring: true,
    recurrenceRule: 'Weekly on Thursdays'
  },
  {
    id: 'mlk-community-march',
    title: 'MLK Community March & Interfaith Witness',
    date: 'Annual Commemoration',
    time: '10:00 AM CST',
    location: 'Downtown New Braunfels to Main Plaza',
    category: 'service',
    description: 'Walking in solidarity with the MLK New Braunfels Association and local leaders for racial justice, civil rights, and peace across our region.',
    isRecurring: true,
    recurrenceRule: 'Annual Martin Luther King Jr. holiday weekend'
  }
];
