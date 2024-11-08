interface userImage {
  name: string;
  bgColor: string;
  bgImage: string;
  initials: string;
}

export interface UserData {
  id: number;
  accessRights: string;
  birthday: Date;
  debts: number;
  email: string;
  gotRejected: boolean;
  gotSuit: boolean;
  isInjured: boolean;
  isInjuredType: string;
  isInjuredUntil: Date;
  jerseyNumber: number | null;
  name: string;
  password: string;
  position: string;
  role: string;
  surname: string;
  userIsActivated: boolean;
  userImage: userImage;
  username: string;
  tutorial: boolean;
}

interface EventDescription {
  title: string;
  subtitle: string;
  description: string;
  meetAt: string | null;
  beginAt: string | null;
  endAt: string | null;
  deadlineToStart: string | null;
}

export interface VoteOption {
  text: string;
}

export interface Event {
  author: string;
  id: number;
  eventDate: string | null;
  eventDescription: EventDescription;
  eventType: string;
  linkExtern: string;
  playerWithNoAccess: number[];
  showInDashboard: boolean;
  standingOrderID: number;
  venue: string;
  venuePostalCode: string;
  venueStreet: string;
  voteOptions: VoteOption[];
  voteQuestion: string;
  voteMultipleSelection: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NavigationProperty {
  hasIcon: boolean;
  isProfile?: boolean;
  iconName?: string;
}

export interface Navigation {
  linkName: string;
  linkUrl: string;
  openNewTab: boolean;
  showInMobileBar: boolean;
  properties: NavigationProperty[];
  accessibleRouteFrom: Array<
    | 'svf_private'
    | 'svf_corporal'
    | 'svf_sergeant'
    | 'svf_major'
    | 'svf_commander'
  >;
}

export interface BirthdayEntry {
  userID: number;
  buildBirthday: string;
}

export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

export interface RadioItem {
  id: string;
  label: string;
  checked?: boolean;
  text?: string;
}

export interface StandingOrder {
  id: number;
  eventIDs: number[];
}

export interface Reaction {
  eventId: number;
  id: number;
  response: string;
  userId: number;
  reason: string;
}

export interface BlockList {
  email: string;
  username: string;
  id: number;
}

export interface EventResponse {
  userId: number;
  response: 'Zusagen' | 'Absagen' | 'Unsicher';
  reason: string;
}

export interface answer {
  text: string;
  index: number;
}

export interface Positions {
  pos: string;
  x: string;
  y: string;
  id: number | null;
  isSelected: boolean;
  user: UserData | null;
}

export interface Option {
  id?: number | null;
  name: string;

  [key: string]: any;
}

export interface LineUpStep {
  index: number;
  name: string;
  active: boolean;
}
