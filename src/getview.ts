import { PropertyName } from "@mat3ra/prode";

type ViewConfig = {
    icon?: string;
    title?: string;
    color?: string;
    decimals?: number;
};

export type PropertyWithConfig =
    | PropertyName.pressure
    | PropertyName.total_force
    | PropertyName.total_energy
    | PropertyName.homo_energy
    | PropertyName.lumo_energy
    | PropertyName.surface_energy
    | PropertyName.interfacial_energy
    | PropertyName.formation_energy
    | PropertyName.fermi_energy
    | PropertyName.reaction_energy_barrier
    | PropertyName.thermal_correction_to_energy
    | PropertyName.thermal_correction_to_enthalpy
    | PropertyName.zero_point_energy
    | PropertyName.is_relaxed
    | PropertyName.valence_band_offset;

const PROPERTY_VIEWS: Record<PropertyWithConfig, ViewConfig> = {
    [PropertyName.pressure]: {
        icon: "entities.property.pressure",
        title: "Pressure",
        color: "white",
        decimals: 0,
    },
    [PropertyName.total_force]: {
        icon: "entities.property.force",
        title: "Total force",
        color: "white",
        decimals: 6,
    },
    [PropertyName.total_energy]: {
        icon: "entities.property.energy",
        title: "Total energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.homo_energy]: {
        icon: "entities.property.energy",
        title: "HOMO energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.lumo_energy]: {
        icon: "entities.property.energy",
        title: "LUMO energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.formation_energy]: {
        icon: "entities.property.energy",
        title: "Formation energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.surface_energy]: {
        icon: "entities.property.energy",
        title: "Surface energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.interfacial_energy]: {
        icon: "entities.property.energy",
        title: "Interfacial energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.fermi_energy]: {
        icon: "entities.property.fermiEnergy",
        title: "Fermi energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.zero_point_energy]: {
        icon: "entities.property.energy",
        title: "Zero point energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.thermal_correction_to_energy]: {
        icon: "entities.property.energy",
        title: "Thermal correction to energy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.thermal_correction_to_enthalpy]: {
        icon: "entities.property.energy",
        title: "Thermal correction to enthalpy",
        color: "white",
        decimals: 3,
    },
    [PropertyName.reaction_energy_barrier]: {
        icon: "entities.property.energy",
        title: "Reaction Energy Barrier",
        color: "white",
        decimals: 3,
    },
    [PropertyName.valence_band_offset]: {
        icon: "entities.property.bandGap",
        title: "Valence Band Offset",
        color: "white",
        decimals: 3,
    },
    [PropertyName.is_relaxed]: {},
};

/**
 * The property view for scalars does not contain a component attribute.
 * This function makes sure the right view config is returned for a scalar property.
 * @summary Safely return view config for scalar properties.
 */
export function getScalarViewConfig(propertyName: PropertyName): ViewConfig | undefined {
    return (PROPERTY_VIEWS as Partial<Record<PropertyName, ViewConfig>>)[propertyName];
}
