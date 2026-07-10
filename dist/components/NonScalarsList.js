import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react/jsx-props-no-spreading */
import { PropertyFactory, PropertyName } from "@mat3ra/prode";
import Grid from "@mui/material/Grid";
import React from "react";
import s from "underscore.string";
import { calculatePointsPath } from "../utils/calculatePointsPath";
import { BandGaps } from "./BandGaps";
import { DielectricTensor } from "./DielectricTensor";
import { FileContent } from "./FileContent";
import { HubbardU } from "./HubbardU";
import { HubbardV } from "./HubbardV";
import { HubbardVNN } from "./HubbardVNN";
import { ArrayOfObjects, OneLevelObject } from "./primitive/Object";
import { Tensor } from "./primitive/Tensor";
import { Structure } from "./Structure";
import { TwoDimensionalPlot } from "./TwoDimensionalPlot";
import { WorkflowLink } from "./WorkflowLink";
const SMALL = { xs: 12, md: 6, xl: 4 };
const LARGE = { xs: 12 };
const TWO_DIMENSIONAL_PLOT = { component: TwoDimensionalPlot, size: LARGE };
const TENSOR = { component: Tensor, size: SMALL };
const FORMATION_ENERGY_CONTRIBUTIONS = "formation_energy_contributions";
const PROPERTY_VIEWS = {
    [PropertyName.convergence_electronic]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.convergence_ionic]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.phonon_dispersions]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.phonon_dos]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.density_of_states]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.band_structure]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.reaction_energy_profile]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.potential_profile]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.wavefunction_amplitude]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.charge_density_profile]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.average_potential_profile]: TWO_DIMENSIONAL_PLOT,
    [PropertyName.atomic_forces]: TENSOR,
    [PropertyName.atomic_constraints]: TENSOR,
    [PropertyName.stress_tensor]: TENSOR,
    [PropertyName.magnetic_moments]: TENSOR,
    [PropertyName.final_structure]: { component: Structure, size: LARGE },
    [PropertyName.total_energy_contributions]: { component: OneLevelObject, size: LARGE },
    [FORMATION_ENERGY_CONTRIBUTIONS]: { component: ArrayOfObjects, size: LARGE, useRawData: true },
    [PropertyName.jupyter_notebook_endpoint]: { component: OneLevelObject, size: LARGE },
    [PropertyName.band_gaps]: { component: BandGaps, size: LARGE },
    [PropertyName.file_content]: { component: FileContent, size: SMALL },
    [PropertyName.dielectric_tensor]: { component: DielectricTensor, size: LARGE },
    [PropertyName.hubbard_u]: { component: HubbardU, size: LARGE },
    [PropertyName.hubbard_v]: { component: HubbardV, size: LARGE },
    [PropertyName.hubbard_v_nn]: { component: HubbardVNN, size: LARGE },
    [PropertyName.workflow_pyml_predict]: { component: WorkflowLink, size: SMALL },
};
function addPointsPath(data, extraConfig) {
    var _a;
    if (![PropertyName.band_structure, PropertyName.phonon_dispersions].includes(data === null || data === void 0 ? void 0 : data.name) ||
        (data === null || data === void 0 ? void 0 : data.pointsPath)) {
        return data;
    }
    const material = (extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.material) || ((_a = extraConfig === null || extraConfig === void 0 ? void 0 : extraConfig.materials) === null || _a === void 0 ? void 0 : _a[0]);
    const pointsPath = material ? calculatePointsPath(material, data) : undefined;
    return Array.isArray(pointsPath) && pointsPath.length ? { ...data, pointsPath } : data;
}
export function NonScalarsList({ results = [], extraConfig }) {
    const nonScalarResults = React.useMemo(() => {
        const nonScalarResultsNames = PropertyFactory.getScalarPropertyNames();
        return results.filter((x) => {
            return (!nonScalarResultsNames.includes(x.name) && Object.keys(x).length > 1);
        });
    }, [results]);
    const widgets = React.useMemo(() => {
        const widgetElements = [];
        nonScalarResults.forEach((data, index) => {
            const updatedData = addPointsPath(data, extraConfig);
            const componentConfig = PROPERTY_VIEWS[data.name];
            const propertyId = s.slugify(data.name);
            if (componentConfig) {
                const { component: ResultComponent, size, useRawData } = componentConfig;
                const property = useRawData
                    ? undefined
                    : PropertyFactory.createProperty(updatedData);
                widgetElements.push(
                // We add the index to propertyID here to ensure a unique key exists for each property
                // If we run into a bug in the future where we try to update the results dynamically, but they don't
                // actually update, see https://stackoverflow.com/q/41703160/
                _jsx(Grid, { item: true, "data-tid": propertyId, ...size, children: _jsx(ResultComponent, { property: property, data: updatedData, title: s.humanize(data.name), extraConfig: extraConfig }, propertyId) }, propertyId + index.toString()));
            }
        });
        return widgetElements;
    }, [nonScalarResults, extraConfig]);
    if (!widgets.length)
        return null;
    return (_jsx(Grid, { container: true, wrap: "wrap", children: widgets }));
}
