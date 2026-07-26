/* eslint-disable react/no-array-index-key */
import IconByName from "@exabyte-io/cove.js/dist/mui/components/icon/IconByName";
import { Utils } from "@mat3ra/utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";

const { numberPadArray } = Utils.str;

interface EigenvalueData {
    spin?: number;
    energies?: number[];
    occupations?: number[];
}

export interface EigenvaluesAtKpointData {
    kpoint?: [number, number, number];
    weight?: number;
    eigenvalues?: EigenvalueData[];
}

interface EigenvaluesAtKpointProps {
    data?: EigenvaluesAtKpointData[];
}

interface EigenvaluesAtKpointState {
    isExpanded: boolean;
}

export class EigenvaluesAtKpoint extends React.Component<
    EigenvaluesAtKpointProps,
    EigenvaluesAtKpointState
> {
    constructor(props: EigenvaluesAtKpointProps) {
        super(props);
        this.state = {
            isExpanded: false,
        };
    }

    renderEigenvaluesAtKpoint(eigenvalues: EigenvaluesAtKpointData) {
        const result: React.ReactElement[] = [];
        (eigenvalues.eigenvalues || []).forEach((value, index) => {
            result.push(
                <TableRow key={index}>
                    <TableCell>
                        {eigenvalues.kpoint ? numberPadArray(eigenvalues.kpoint) : "-"}
                    </TableCell>
                    <TableCell align="right">
                        {eigenvalues.weight ? eigenvalues.weight.toFixed(4) : "-"}
                    </TableCell>
                    <TableCell align="right">{value.spin ?? "-"}</TableCell>
                    <TableCell align="right">
                        {(value.energies || []).map((element, idx) => {
                            return <div key={idx}>{element}</div>;
                        })}
                    </TableCell>
                    <TableCell align="right">
                        {(value.occupations || []).map((element, idx) => {
                            return <div key={idx}>{element}</div>;
                        })}
                    </TableCell>
                </TableRow>,
            );
        });
        return result;
    }

    renderAllKpoints() {
        const { data = [] } = this.props;
        return data.map((eigenvalues) => {
            return this.renderEigenvaluesAtKpoint(eigenvalues);
        });
    }

    renderSwitch() {
        const { isExpanded } = this.state;

        return (
            <Button onClick={() => this.setState({ isExpanded: !isExpanded })}>
                <IconByName
                    name={isExpanded ? "actions.collapse" : "shapes.dots.horizontal"}
                    fontSize="small"
                />
            </Button>
        );
    }

    render() {
        const { isExpanded } = this.state;

        return (
            <Box>
                <Typography variant="subtitle2" color="text.primary">
                    Eigenvalues
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Kpoint</TableCell>
                            <TableCell align="right">Weight</TableCell>
                            <TableCell align="right">Spin</TableCell>
                            <TableCell align="right">Energies</TableCell>
                            <TableCell align="right">Occupations</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isExpanded && this.renderAllKpoints()}
                        {this.renderSwitch()}
                    </TableBody>
                </Table>
            </Box>
        );
    }
}
