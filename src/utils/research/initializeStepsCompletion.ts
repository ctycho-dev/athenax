import { STEPS_STORAGE_KEY } from '@/constants/research';
import { getLocalStorageObject } from '../useLocalStorage';

export const initializeStepsCompletion = () => {
    const savedSteps = getLocalStorageObject(STEPS_STORAGE_KEY);
    if (savedSteps) {
        try {
            return {
                1: savedSteps[1] ?? false,
                2: savedSteps[2] ?? false,
                3: savedSteps[3] ?? false,
                4: savedSteps[4] ?? false,
                5: savedSteps[5] ?? false,
                6: savedSteps[6] ?? false,
                7: savedSteps[7] ?? false,
                8: savedSteps[8] ?? false,
                9: savedSteps[9] ?? false,
                10: savedSteps[10] ?? false
            };
        } catch (e) {
            console.error('Failed to parse saved steps', e);
        }
    }
    // Default values if nothing in localStorage
    return {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false
    };
}