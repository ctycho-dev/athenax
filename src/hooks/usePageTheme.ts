// src/hooks/usePageTheme.js
import { FC, useEffect } from 'react';
import { useMantineColorScheme, MantineColorScheme } from '@mantine/core';


export function usePageColorScheme(scheme: MantineColorScheme = 'dark') {
    const { setColorScheme } = useMantineColorScheme();

    setColorScheme(scheme);
    // Update the HTML attribute (works for all schemes including 'gray')
    document.documentElement.setAttribute('data-mantine-color-scheme', scheme);
}
