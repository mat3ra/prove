import IconByName from "@exabyte-io/cove.js/dist/mui/components/icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React from "react";

interface ScalarProps {
    value: string | number;
    icon: string;
    title: string;
    units?: string;
}

export function Scalar({ icon, title, units, value }: ScalarProps) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box className="chart" px={2}>
                <IconByName name={icon} fontSize="large" />
            </Box>
            <Box className="count">
                <Typography variant="body2" color="text.primary" className="scalar-title">
                    {title} ({units})
                </Typography>
                <Typography variant="h5" className="scalar-value">
                    {value}
                </Typography>
            </Box>
        </Box>
    );
}
