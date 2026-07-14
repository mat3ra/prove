import { PropertyName } from "@mat3ra/prode";
type ViewConfig = {
    icon?: string;
    title?: string;
    color?: string;
    decimals?: number;
};
export type PropertyWithConfig = PropertyName.pressure | PropertyName.total_force | PropertyName.total_energy | PropertyName.homo_energy | PropertyName.lumo_energy | PropertyName.surface_energy | PropertyName.interfacial_energy | PropertyName.formation_energy | PropertyName.fermi_energy | PropertyName.reaction_energy_barrier | PropertyName.thermal_correction_to_energy | PropertyName.thermal_correction_to_enthalpy | PropertyName.zero_point_energy | PropertyName.is_relaxed | PropertyName.valence_band_offset;
/**
 * The property view for scalars does not contain a component attribute.
 * This function makes sure the right view config is returned for a scalar property.
 * @summary Safely return view config for scalar properties.
 */
export declare function getScalarViewConfig(propertyName: PropertyName): ViewConfig | undefined;
export {};
