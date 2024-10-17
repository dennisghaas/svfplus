import { Navigation, RadioItem } from './interface'

export const VITE_APP_API = import.meta.env.VITE_APP_API

export const navigation: Navigation[] = [
  {
    linkName: 'Dashboard',
    linkUrl: '/',
    openNewTab: false,
    showInMobileBar: true,
    properties: [
      {
        hasIcon: true,
        isProfile: false,
        iconName: 'icon-dashboard',
      },
    ],
    accessibleRouteFrom: [
        'svf_private', 'svf_corporal', 'svf_sergeant', 'svf_major', 'svf_commander'
    ]
  },
  {
    linkName: 'Termine',
    linkUrl: '/termine',
    openNewTab: false,
    showInMobileBar: true,
    properties: [
      {
        hasIcon: true,
        isProfile: false,
        iconName: 'icon-calendar',
      },
    ],
    accessibleRouteFrom: [
      'svf_private', 'svf_corporal', 'svf_sergeant', 'svf_major', 'svf_commander'
    ]
  },
  {
    linkName: 'Mannschaft',
    linkUrl: '/team',
    openNewTab: false,
    showInMobileBar: true,
    properties: [
      {
        hasIcon: true,
        isProfile: false,
        iconName: 'icon-svf',
      },
    ],
    accessibleRouteFrom: [
      'svf_private', 'svf_corporal', 'svf_sergeant', 'svf_major', 'svf_commander'
    ]
  },
  {
    linkName: 'Profil',
    linkUrl: '/dein-profil',
    openNewTab: false,
    showInMobileBar: true,
    properties: [
      {
        hasIcon: false,
        isProfile: true,
      },
    ],
    accessibleRouteFrom: [
      'svf_private', 'svf_corporal', 'svf_sergeant', 'svf_major', 'svf_commander'
    ]
  },
  {
    linkName: 'Erstellen',
    linkUrl: '/erstellen',
    openNewTab: false,
    showInMobileBar: true,
    properties: [
      {
        hasIcon: true,
        isProfile: false,
        iconName: 'icon-add',
      },
    ],
    accessibleRouteFrom: [
     'svf_major', 'svf_commander'
    ]
  },
  {
    linkName: 'Einstellungen',
    linkUrl: '/einstellungen',
    openNewTab: false,
    showInMobileBar: false,
    properties: [
      {
        hasIcon: true,
        isProfile: false,
        iconName: 'icon-settings-outline',
      },
    ],
    accessibleRouteFrom: [
      'svf_major', 'svf_commander'
    ]
  },
]

export const breakpoints = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px) and (max-width: 767px)',
  md: '(min-width: 768px) and (max-width: 1023px)',
  lg: '(min-width: 1024px) and (max-width: 1439px)',
  xl: '(min-width: 1440px) and (max-width: 1599px)',
  xxl: '(min-width: 1600px)',
}

export const accessibleRoles = [
  'Trainer',
  'Co-Trainer',
  'Kassenwart',
  'Mannschaftsrat',
  'Spieler',
]

export const accessibleEventTypes = ['Training', 'Spiel', 'Feier']
// export const accessibleEventTypes = ['Training', 'Spiel', 'Feier', 'Abstimmung'] /* Abstimmung mit Reaktion muss noch umgesetzt werden, allerdings nicht relevant erstmal für launch */

export const accessibleWeekday = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
]

export const accessibleAccessRights = [
  'svf_commander',
  'svf_major',
  'svf_sergeant',
  'svf_corporal',
  'svf_private',
]

export const venueOptions: RadioItem[] = [
  { id: 'home', label: 'Heimspiel', checked: false },
  { id: 'away', label: 'Auswärtsspiel', checked: true },
]

export const steps = [
  {
    name: 'Meta',
    step: 'Schritt 1',
    id: 'meta',
  },
  {
    name: 'Beschreibung',
    step: 'Schritt 2',
    id: 'desc',
  },
  {
    name: 'Ansicht',
    step: 'Schritt 3',
    id: 'result',
  },
]
