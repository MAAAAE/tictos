// utils/navLinks.ts

export interface NavLink {
    name: string;
    path: string;
}

export const navLinks: NavLink[] = [
    // { name: 'Home', path: '/' },
    // { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
];
