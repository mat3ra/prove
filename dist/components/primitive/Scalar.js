import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IconByName from "@exabyte-io/cove.js/dist/mui/components/icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
export function Scalar({ icon, title, units, value }) {
    return (_jsxs(Box, { sx: { display: "flex", alignItems: "center", justifyContent: "center" }, children: [_jsx(Box, { className: "chart", px: 2, children: _jsx(IconByName, { name: icon, fontSize: "large" }) }), _jsxs(Box, { className: "count", children: [_jsxs(Typography, { variant: "body2", color: "text.primary", className: "scalar-title", children: [title, " (", units, ")"] }), _jsx(Typography, { variant: "h5", className: "scalar-value", children: value })] })] }));
}
