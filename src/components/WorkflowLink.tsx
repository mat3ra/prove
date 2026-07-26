/* eslint-disable jsx-a11y/anchor-is-valid */
import IconByName from "@exabyte-io/cove.js/dist/mui/components/icon";
import type { WorkflowSchema } from "@mat3ra/esse/dist/js/types";
import { Workflow } from "@mat3ra/wode";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import React from "react";

interface WorkflowLinkProps {
    data: WorkflowSchema;
    extraConfig: {
        workflowUrl: string;
    };
}

export function WorkflowLink({ data, extraConfig }: WorkflowLinkProps) {
    const workflow = new Workflow(data);
    const { workflowUrl } = extraConfig;
    return (
        <Box className="name-entity WorkflowLink" sx={{ display: "flex", p: 4 }}>
            <Box sx={{ display: "flex", pr: 1, alignItems: "center" }}>
                <IconByName name="entities.workflow" fontSize="large" />
            </Box>
            <Box>
                <Typography variant="h6" className="WorkflowLink-name">
                    <Link href={workflowUrl}>{workflow.name}</Link>
                </Typography>
                <Typography variant="body2" color="text.primary">
                    applications: {workflow.usedApplicationNames}
                </Typography>
            </Box>
        </Box>
    );
}
