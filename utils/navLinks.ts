// utils/navLinks.ts

export interface NavLink {
    name: string;
    path: string;
}

export const navLinks: NavLink[] = [
    // { name: 'Home', path: '/' },
    // { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/' },
    { name: 'your account', path: '/account' },
    { name: 'Settings', path: '/settings' },
];
