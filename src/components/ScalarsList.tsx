import type { PropertyName } from "@mat3ra/prode";
import { PropertyFactory } from "@mat3ra/prode";
import { Utils } from "@mat3ra/utils";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import s from "underscore.string";

import { getScalarViewConfig } from "../getview";
import type { PropertyData } from "../types";
import { Scalar } from "./primitive/Scalar";

const { numberFormat } = Utils.str;

// fields that tell apart several values of one property on one result, e.g. Sq and Sa, Al and Sc
const QUALIFIER_FIELDS = ["parameter", "statistic", "element"] as const;

// NOTE: asserting that the data is a scalar property data
type ScalarPropertyData = Extract<PropertyData, { value: number }>;

interface ScalarsListProps {
    results?: PropertyData[];
}

export class ScalarsList extends React.Component<ScalarsListProps> {
    isScalarPropertyData(
        data: PropertyData,
        scalarResultsNames: PropertyName[],
    ): data is ScalarPropertyData {
        return (
            scalarResultsNames.includes(data.name as PropertyName) &&
            "value" in data &&
            typeof data.value === "number" &&
            Object.keys(data).length > 1
        );
    }

    get scalarResults(): ScalarPropertyData[] {
        const scalarResultsNames = PropertyFactory.getScalarPropertyNames();

        return (
            this.props.results?.filter((x): x is ScalarPropertyData =>
                this.isScalarPropertyData(x, scalarResultsNames),
            ) || []
        );
    }

    render() {
        const widgets: JSX.Element[] = [];
        this.scalarResults.forEach((result) => {
            const config = getScalarViewConfig(result.name as PropertyName) || {};
            const propertyId = s.slugify(result.name);
            const units = "units" in result ? result.units : undefined;
            const qualifier = QUALIFIER_FIELDS.map(
                (field) => (result as Record<string, unknown>)[field],
            ).find((value) => typeof value === "string");
            const title = config.title || s.humanize(result.name);
            if (config) {
                widgets.push(
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={3}
                        key={qualifier ? `${propertyId}-${qualifier}` : propertyId}
                        data-tid={propertyId}
                    >
                        <Box mb={2}>
                            <Scalar
                                icon={config.icon || ""}
                                value={numberFormat(result.value, config.decimals)}
                                title={qualifier ? `${title} ${qualifier}` : title}
                                units={units}
                            />
                        </Box>
                    </Grid>,
                );
            }
        });

        // auto-hide the component if no scalar results
        if (!widgets.length) return null;

        return (
            <Grid container p={4}>
                {widgets}
            </Grid>
        );
    }
}
