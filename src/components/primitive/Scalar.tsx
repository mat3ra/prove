import IconByName from "@mat3ra/cove/dist/mui/components/icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

interface ScalarProps {
    value: string | number;
    icon: string;
    title: string;
    units?: string;
}

// unit symbols as ESSE spells them (ASCII) -> as a reader expects them
const UNIT_SYMBOLS: Record<string, string> = { um: "µm" };

export function Scalar({ icon, title, units, value }: ScalarProps) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box className="chart" px={2}>
                <IconByName name={icon} fontSize="large" />
            </Box>
            <Box className="count">
                <Typography variant="body2" color="text.primary" className="scalar-title">
                    {title} ({(units && UNIT_SYMBOLS[units]) || units})
                </Typography>
                <Typography variant="h5" className="scalar-value">
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}
