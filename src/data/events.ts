import { ChurchEvent } from '../types';

export const upcomingEvents: ChurchEvent[] = [
  {
    id: 'sunday-worship-weekly',
    title: 'Sunday Worship Service',
    date: 'Every Sunday',
    time: '10:00 AM – 11:20 AM CST',
    location: 'Sanctuary (970 Loop 337) & Zoom Livestream',
    category: 'worship',
    description: 'Our core gathering for worship, inclusive prayer, scripture reflection by Pastor Carla, and uplifting choral music. Communion celebrated 1st Sundays.',
    isRecurring: true,
    recurrenceRule: 'Weekly on Sundays'
  },
  {
    id: 'sunday-school-weekly',
    title: 'Sunday School & Book Discussion',
    date: 'Every Sunday',
    time: '11:20 AM – 12:20 PM CST',
    location: 'Fellowship Hall & Zoom',
    category: 'fellowship',
    description: 'Engaging, thoughtful discussions on contemporary spiritual books, theology, and ethical living. Bring your questions and insights!',
    isRecurring: true,
    recurrenceRule: 'Weekly on Sundays after service'
  },
  {
    id: 'youth-family-social',
    title: 'Youth & Family Social',
    date: 'First Sunday of the Month',
    time: '11:30 AM – 1:00 PM CST',
    location: 'Fellowship Grounds & Hall',
    category: 'social',
    description: 'A special time for families and young people to connect with fun activities, crafts, lunch, and community bonding.',
    isRecurring: true,
    recurrenceRule: '1st Sunday of each month'
  },
  {
    id: 'theology-on-tap-monthly',
    title: 'Theology on Tap',
    date: 'Third Sunday of the Month',
    time: '5:00 PM – 7:00 PM CST',
    location: 'Local New Braunfels Gathering Spot',
    category: 'fellowship',
    description: 'Casual, spirited conversation on life, faith, doubts, and hope over your favorite beverage. An extravagant welcome for all.',
    isRecurring: true,
    recurrenceRule: '3rd Sunday of each month'
  },
  {
    id: 'game-night-monthly',
    title: 'Monthly Game Night',
    date: 'Last Saturday of the Month',
    time: '6:00 PM – 8:30 PM CST',
    location: 'Fellowship Hall',
    category: 'social',
    description: 'All-ages board game and card night with snacks and fellowship. Bring a game to share or join an existing table!',
    isRecurring: true,
    recurrenceRule: 'Last Saturday of each month'
  },
  {
    id: 'sos-food-drive',
    title: 'SOS Food Bank In-Gathering',
    date: 'Ongoing Sundays',
    time: 'During Worship',
    location: 'Narthex Collection Bins',
    category: 'service',
    description: 'Bring non-perishable canned goods, peanut butter, whole grains, and hygiene items for New Braunfels families in need.',
    isRecurring: true,
    recurrenceRule: 'Ongoing weekly'
  }
];
