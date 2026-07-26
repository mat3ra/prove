import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable jsx-a11y/anchor-is-valid */
import IconByName from "@exabyte-io/cove.js/dist/mui/components/icon";
import { Workflow } from "@mat3ra/wode";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
export function WorkflowLink({ data, extraConfig }) {
    const workflow = new Workflow(data);
    const { workflowUrl } = extraConfig;
    return (_jsxs(Box, { className: "name-entity WorkflowLink", sx: { display: "flex", p: 4 }, children: [_jsx(Box, { sx: { display: "flex", pr: 1, alignItems: "center" }, children: _jsx(IconByName, { name: "entities.workflow", fontSize: "large" }) }), _jsxs(Box, { children: [_jsx(Typography, { variant: "h6", className: "WorkflowLink-name", children: _jsx(Link, { href: workflowUrl, children: workflow.name }) }), _jsxs(Typography, { variant: "body2", color: "text.primary", children: ["applications: ", workflow.usedApplicationNames] })] })] }));
}
