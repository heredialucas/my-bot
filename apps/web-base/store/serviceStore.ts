import { create } from 'zustand';
import { ServiceStore, ServiceOption } from './types';

// Create the Zustand store
const useServiceStore = create<ServiceStore>()((set) => ({
    selectedOption: 'internet-hogar',
    setSelectedOption: (option: ServiceOption) => set(() => ({ selectedOption: option })),
}));

export default useServiceStore; 