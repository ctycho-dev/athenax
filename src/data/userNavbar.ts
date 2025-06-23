import { UserRole } from "@/enums";

export const navbar = [
    {
        id: 'search',
        display: true,
        name: 'Search',
        path: '/search',
        icon: `
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_7_37)">
                    <path d="M11.6667 12.1667L14.6667 15.1667" stroke="#949FA8" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13.3333 7.83334C13.3333 4.51963 10.6471 1.83334 7.33333 1.83334C4.01963 1.83334 1.33333 4.51963 1.33333 7.83334C1.33333 11.1471 4.01963 13.8333 7.33333 13.8333C10.6471 13.8333 13.3333 11.1471 13.3333 7.83334Z" stroke="#949FA8" strokeWidth="1.75" strokeLinejoin="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_7_37">
                        <rect width="16" height="16" fill="white" transform="translate(0 0.5)"/>
                    </clipPath>
                </defs>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'dashboard',
        display: true,
        name: 'Dashboard',
        path: '/dashboard',
        icon: `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.72565 3.17575L4.05898 3.69635C3.04788 4.48591 2.54232 4.88069 2.27116 5.43733C2 5.99397 2 6.63701 2 7.92306V9.31779C2 11.842 2 13.1041 2.78105 13.8883C3.40977 14.5195 4.34695 14.6427 6 14.6667V12.0038C6 11.3825 6 11.0719 6.10149 10.8269C6.23682 10.5001 6.49639 10.2406 6.82307 10.1053C7.06813 10.0038 7.37873 10.0038 8 10.0038C8.62127 10.0038 8.93187 10.0038 9.17693 10.1053C9.5036 10.2406 9.7632 10.5001 9.89853 10.8269C10 11.0719 10 11.3825 10 12.0038V14.6667C11.6531 14.6427 12.5902 14.5195 13.2189 13.8883C14 13.1041 14 11.842 14 9.31779V7.92306C14 6.63701 14 5.99397 13.7289 5.43733C13.4577 4.88069 12.9521 4.48591 11.941 3.69635L11.2743 3.17575C9.7014 1.94747 8.91493 1.33333 8 1.33333C7.08507 1.33333 6.29858 1.94747 4.72565 3.17575Z" stroke="#949FA8" strokeLinejoin="round"/>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'news_feed',
        display: true,
        name: 'News Feed',
        path: '/news-feed',
        icon: `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10V6C12 4.11438 12 3.17157 11.4142 2.58579C10.8284 2 9.8856 2 8 2H5.33333C3.44771 2 2.50491 2 1.91912 2.58579C1.33333 3.17157 1.33333 4.11438 1.33333 6V10C1.33333 11.8856 1.33333 12.8284 1.91912 13.4142C2.50491 14 3.44771 14 5.33333 14H13.3333" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 5.33333H9.33333" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 8H9.33333" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 10.6667H6.66667" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5.33333H12.6667C13.6095 5.33333 14.0809 5.33333 14.3738 5.62622C14.6667 5.91911 14.6667 6.39052 14.6667 7.33333V12.6667C14.6667 13.4031 14.0697 14 13.3333 14C12.5969 14 12 13.4031 12 12.6667V5.33333Z" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'top_cryptos',
        display: true,
        name: 'Top Cryptos',
        path: '/top-cryptos',
        icon: `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_7_92)">
                    <path d="M10.3333 8.66667C12.7266 8.66667 14.6667 8.06971 14.6667 7.33333C14.6667 6.59695 12.7266 6 10.3333 6C7.9401 6 6 6.59695 6 7.33333C6 8.06971 7.9401 8.66667 10.3333 8.66667Z" stroke="#949FA8"/>
                    <path d="M14.6667 10.3333C14.6667 11.0697 12.7266 11.6667 10.3333 11.6667C7.94007 11.6667 6 11.0697 6 10.3333" stroke="#949FA8"/>
                    <path d="M14.6667 7.33333V13.2C14.6667 14.01 12.7266 14.6667 10.3333 14.6667C7.94007 14.6667 6 14.01 6 13.2V7.33333" stroke="#949FA8"/>
                    <path d="M5.66667 3.99999C8.0599 3.99999 10 3.40304 10 2.66666C10 1.93028 8.0599 1.33333 5.66667 1.33333C3.27343 1.33333 1.33333 1.93028 1.33333 2.66666C1.33333 3.40304 3.27343 3.99999 5.66667 3.99999Z" stroke="#949FA8"/>
                    <path d="M4 7.33333C2.73879 7.17987 1.57994 6.783 1.33333 6M4 10.6667C2.73879 10.5132 1.57994 10.1163 1.33333 9.33333" stroke="#949FA8" strokeLinecap="round"/>
                    <path d="M4 14C2.73879 13.8465 1.57994 13.4497 1.33333 12.6667V2.66667" stroke="#949FA8" strokeLinecap="round"/>
                    <path d="M10 4.00001V2.66667" stroke="#949FA8" strokeLinecap="round"/>
                </g>
                <defs>
                    <clipPath id="clip0_7_92">
                        <rect width="16" height="16" fill="white"/>
                    </clipPath>
                </defs>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'market_insights',
        display: true,
        name: 'Market Insights',
        path: '/market-insights',
        icon: `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.33333 10.6667V5.33333C9.33333 4.70479 9.33333 4.39053 9.13807 4.19526C8.9428 4 8.62853 4 8 4C7.37147 4 7.0572 4 6.86193 4.19526C6.66667 4.39053 6.66667 4.70479 6.66667 5.33333V10.6667C6.66667 11.2952 6.66667 11.6095 6.86193 11.8047C7.0572 12 7.37147 12 8 12C8.62853 12 8.9428 12 9.13807 11.8047C9.33333 11.6095 9.33333 11.2952 9.33333 10.6667Z" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 6.00001V4.66668C14 4.03814 14 3.72387 13.8047 3.5286C13.6095 3.33334 13.2952 3.33334 12.6667 3.33334C12.0381 3.33334 11.7239 3.33334 11.5286 3.5286C11.3333 3.72387 11.3333 4.03814 11.3333 4.66668V6.00001C11.3333 6.62855 11.3333 6.94281 11.5286 7.13808C11.7239 7.33334 12.0381 7.33334 12.6667 7.33334C13.2952 7.33334 13.6095 7.33334 13.8047 7.13808C14 6.94281 14 6.62855 14 6.00001Z" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.66667 9.33332V7.99999C4.66667 7.37146 4.66667 7.05719 4.47141 6.86192C4.27614 6.66666 3.96187 6.66666 3.33333 6.66666C2.70479 6.66666 2.39053 6.66666 2.19526 6.86192C2 7.05719 2 7.37146 2 7.99999V9.33332C2 9.96186 2 10.2761 2.19526 10.4714C2.39053 10.6667 2.70479 10.6667 3.33333 10.6667C3.96187 10.6667 4.27614 10.6667 4.47141 10.4714C4.66667 10.2761 4.66667 9.96186 4.66667 9.33332Z" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 14V12" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.6667 8.66668V7.33334" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 4V2" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.6667 3.33333V2" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33333 12V10.6667" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3.33333 6.66668V5.33334" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'trends',
        display: true,
        name: 'Trends',
        path: '/trends',
        icon: `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12.6667L12.1197 6.6628C12.6184 6.1735 12.8677 5.92885 13.0829 6.01812C13.2979 6.10739 13.3017 6.45711 13.3093 7.15653L13.3333 9.36393" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 3.33334L3.88037 9.33721C3.38163 9.82654 3.13226 10.0711 2.91715 9.98188C2.70204 9.89261 2.69824 9.54288 2.69065 8.84348L2.66667 6.6361" stroke="#949FA8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'researches',
        display: true,
        name: 'Researches',
        path: '/researches',
        icon: `
            <svg width="16" height="17" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.3333 14.0003V13.3337C25.3333 8.30534 25.3333 5.79119 23.7712 4.22909C22.2092 2.66699 19.6949 2.66699 14.6667 2.66699C9.63835 2.66699 7.1242 2.66699 5.56209 4.22909C4 5.79119 4 8.30534 4 13.3337V21.3337C4 23.8187 4 25.0611 4.40597 26.0413C4.94728 27.3481 5.98553 28.3863 7.29236 28.9277C8.27247 29.3337 9.51497 29.3337 12 29.3337" stroke="#949FA8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9.3335 9.33301H20.0002M9.3335 14.6663H14.6668" stroke="#949FA8" stroke-linecap="round"/>
            <path d="M20.3767 25.3389C20.298 24.154 20.1573 22.8874 19.5756 21.4553C19.0793 20.2338 19.2176 17.3604 22 17.3604C24.7824 17.3604 24.8885 20.2338 24.3923 21.4553C23.8104 22.8874 23.702 24.154 23.6233 25.3389M28 29.333H16V27.6721C16 27.0768 16.3552 26.5536 16.8704 26.3901L19.8768 25.4357C20.0912 25.3676 20.3131 25.333 20.5361 25.333H23.4639C23.6869 25.333 23.9088 25.3676 24.1232 25.4357L27.1296 26.3901C27.6448 26.5536 28 27.0768 28 27.6721V29.333Z" stroke="#949FA8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'audits',
        display: true,
        name: 'Audits',
        path: '/audits',
        icon: `
            <svg width="16" height="17" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9741 9.35449C19.9741 9.35449 20.6408 10.0212 21.3075 11.3545C21.3075 11.3545 23.4251 8.02116 25.3075 7.35449" stroke="#949FA8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.3263 2.6952C9.99501 2.55416 7.42133 2.93792 7.42133 2.93792C5.7962 3.05412 2.68178 3.96522 2.68181 9.28614C2.68184 14.5618 2.64736 21.0658 2.68181 23.6586C2.68181 25.2428 3.66264 28.9378 7.05752 29.1358C11.184 29.3766 18.6168 29.4278 22.0271 29.1358C22.94 29.0844 25.9794 28.3677 26.364 25.0609C26.7626 21.6352 26.6832 19.2544 26.6832 18.6877" stroke="#949FA8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M29.3334 9.35417C29.3334 13.0361 26.3458 16.0209 22.6604 16.0209C18.9749 16.0209 15.9873 13.0361 15.9873 9.35417C15.9873 5.67227 18.9749 2.6875 22.6604 2.6875C26.3458 2.6875 29.3334 5.67227 29.3334 9.35417Z" stroke="#949FA8" stroke-linecap="round"/>
            <path d="M9.30762 17.3545H14.6409" stroke="#949FA8" stroke-linecap="round"/>
            <path d="M9.30762 22.6875H19.9742" stroke="#949FA8" stroke-linecap="round"/>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'x',
        display: true,
        name: 'Twitter Score',
        path: '/x-score',
        icon: `
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0201 2H14.1566L9.48996 7.57083L15 15.125H10.6707L7.29719 10.5458L3.41767 15.125H1.28112L6.28514 9.175L1 2H5.44177L8.50602 6.2L12.0201 2ZM11.261 13.7833H12.4418L4.79518 3.25417H3.50201L11.261 13.7833Z" fill="#949FA8"/>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    },
    {
        id: 'audit-bd',
        display: true,
        name: 'Twitter Score',
        path: '/audit-dashboard',
        icon: `
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.0201 2H14.1566L9.48996 7.57083L15 15.125H10.6707L7.29719 10.5458L3.41767 15.125H1.28112L6.28514 9.175L1 2H5.44177L8.50602 6.2L12.0201 2ZM11.261 13.7833H12.4418L4.79518 3.25417H3.50201L11.261 13.7833Z" fill="#949FA8"/>
            </svg>
        `,
        role: [UserRole.USER, UserRole.BD]
    }
];