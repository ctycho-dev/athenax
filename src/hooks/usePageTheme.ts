// src/hooks/usePageTheme.js
import { FC, useEffect } from 'react';
import { useMantineColorScheme, MantineColorScheme } from '@mantine/core';


export function usePageColorScheme(scheme: MantineColorScheme = 'dark') {
    const { setColorScheme } = useMantineColorScheme();

    useEffect(() => {
        setColorScheme(scheme);
    }, []);
}
