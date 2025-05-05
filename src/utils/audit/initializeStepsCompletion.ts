import { STEPS_STORAGE_KEY } from '@/constants/audit';
import { getLocalStorageObject } from '../useLocalStorage';

export const initializeStepsCompletion = () => {
    const savedSteps = getLocalStorageObject(STEPS_STORAGE_KEY);
    if (savedSteps) {
        return {
            1: savedSteps[1] ?? false,
            2: savedSteps[2] ?? false,
            3: savedSteps[3] ?? false,
            4: savedSteps[4] ?? false
        };
    }
    // Default values if nothing in localStorage
    return {
        1: false,
        2: false,
        3: false,
        4: false
    };
}