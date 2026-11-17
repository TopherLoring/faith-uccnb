export interface ChurchInfo {
  name: string;
  tagline: string;
  denomination: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    full: string;
    mapsUrl: string;
  };
  contact: {
    phone: string;
    email: string;
    officeHours: string;
  };
  service: {
    day: string;
    time: string;
    locationNote: string;
    zoomUrl: string;
    zoomPasscode?: string;
    sundaySchoolTime: string;
    communionNote: string;
  };
  realmGiveUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
}

export interface Ministry {
  id: string;
  title: string;
  category: 'justice' | 'fellowship' | 'music' | 'youth' | 'care';
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  meetingTime?: string;
  leader?: string;
  impactHighlight?: string;
  externalLink?: string;
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: 'worship' | 'fellowship' | 'service' | 'social';
  description: string;
  isRecurring?: boolean;
  recurrenceRule?: string;
  actionUrl?: string;
}

export interface SermonMedia {
  id: string;
  title: string;
  date: string;
  scripture: string;
  speaker: string;
  summary: string;
  youtubeId?: string;
  bulletinPdfUrl?: string;
  tags: string[];
}

export interface JourneyPath {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: 'new' | 'belonging' | 'action' | 'community' | 'worship' | 'support';
  actionLabel: string;
  targetView: string;
  icon: string;
}

export type ViewState = 
  | 'home'
  | 'plan-visit'
  | 'about'
  | 'pastor'
  | 'ministries'
  | 'worship'
  | 'calendar'
  | 'give'
  | 'contact';
