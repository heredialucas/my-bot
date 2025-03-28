import { create } from 'zustand';
import { ServiceStore, ServiceOption, Promotion, Service, Plan, AddOn } from './types';

// Create the Zustand store
const useServiceStore = create<ServiceStore>()((set, get) => ({
    // Estado básico
    selectedOption: 'internet-hogar',
    setSelectedOption: (option: ServiceOption) => {
        // If switching to internet-hogar from internet-tv, clear the selected plan (Zapping)
        if (option === 'internet-hogar' && get().selectedOption === 'internet-tv') {
            set({ selectedOption: option, selectedPlan: null });
        } else {
            set({ selectedOption: option });
        }
    },

    // Estado detallado
    selectedPromotion: null,
    setSelectedPromotion: (promotion: Promotion | null) => set({ selectedPromotion: promotion }),

    selectedService: null,
    setSelectedService: (service: Service | null) => set({ selectedService: service }),

    selectedPlan: null,
    setSelectedPlan: (plan: Plan | null) => set({ selectedPlan: plan }),

    selectedAddons: [],
    setSelectedAddons: (addons: AddOn[]) => set({ selectedAddons: addons }),

    addAddon: (addon: AddOn) => set((state) => ({
        selectedAddons: [...state.selectedAddons, addon]
    })),

    removeAddon: (addonId: string) => set((state) => ({
        selectedAddons: state.selectedAddons.filter(addon => addon.id !== addonId)
    })),

    toggleAddon: (addon: AddOn) => {
        const { selectedAddons } = get();
        const addonExists = selectedAddons.some(item => item.id === addon.id);

        if (addonExists) {
            set((state) => ({
                selectedAddons: state.selectedAddons.filter(item => item.id !== addon.id)
            }));
        } else {
            set((state) => ({
                selectedAddons: [...state.selectedAddons, addon]
            }));
        }
    },

    clearSelections: () => set({
        selectedPromotion: null,
        selectedService: null,
        selectedPlan: null,
        selectedAddons: []
    }),

    getFormattedSelectionText: () => {
        const state = get();
        const parts = ['Hola, me gustaría contratar:'];

        // Agregar servicio de internet si está seleccionado
        if (state.selectedService) {
            const speed = state.selectedService.speed ? `${state.selectedService.speed} Mbps` : '';
            parts.push(`- Plan Fibra ${speed}`);
        }

        // Agregar plan de TV si está seleccionado
        if (state.selectedPlan) {
            const channels = state.selectedPlan.channelCount ? `con ${state.selectedPlan.channelCount} canales` : '';
            parts.push(`- Plan ${state.selectedPlan.name} ${channels}`);
        }

        // Agregar complementos si hay seleccionados
        if (state.selectedAddons.length > 0) {
            const addonNames = state.selectedAddons.map(addon => addon.name).join(', ');
            parts.push(`- Complementos: ${addonNames}`);
        }

        // Si no hay nada seleccionado, usar mensaje por defecto
        if (parts.length === 1) {
            return 'Hola, me gustaría contratar Fibra Óptica Netfull';
        }

        return parts.join('\n');
    }
}));

export default useServiceStore; 