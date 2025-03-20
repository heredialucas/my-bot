// Define option types
export type ServiceOption = 'internet-hogar' | 'internet-tv';

// Define the store interface
export interface ServiceStore {
    selectedOption: ServiceOption;
    setSelectedOption: (option: ServiceOption) => void;
}