"use client";

import { useEffect } from 'react';

/**
 * AMST Console Signature Component
 * Prints ASCII art and styled message to browser console on app init
 */
export function AMSTConsoleSignature() {
    useEffect(() => {
        // Only run on client-side and once
        if (typeof window !== 'undefined') {
            const hasShown = sessionStorage.getItem('amst-console-shown');
            if (!hasShown) {
                console.log(
                    `%c
    ╔══════════════════════════════════════════════════════════╗
    ║                                                          ║
    ║     █████╗ ███╗   ███╗███████╗████████╗                 ║
    ║    ██╔══██╗████╗ ████║██╔════╝╚══██╔══╝                 ║
    ║    ███████║██╔████╔██║███████╗   ██║                    ║
    ║    ██╔══██║██║╚██╔╝██║╚════██║   ██║                    ║
    ║    ██║  ██║██║ ╚═╝ ██║███████║   ██║                    ║
    ║    ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝   ╚═╝                    ║
    ║                                                          ║
    ║           🚀 Engineered by AMST Digital Solutions        ║
    ║              https://ataberkdudu.info                    ║
    ║                                                          ║
    ╚══════════════════════════════════════════════════════════╝
          `,
                    'color: #1e3a8a; font-weight: bold; font-family: monospace;'
                );

                console.log(
                    '%c🌟 AVM Platform - Digital Architecture by AMST',
                    'color: #ca8a04; font-size: 14px; font-weight: bold;'
                );

                console.log(
                    '%cBuilt with Next.js 14+, TypeScript, Tailwind CSS & shadcn/ui',
                    'color: #666; font-size: 11px;'
                );

                sessionStorage.setItem('amst-console-shown', 'true');
            }
        }
    }, []);

    return null;
}
