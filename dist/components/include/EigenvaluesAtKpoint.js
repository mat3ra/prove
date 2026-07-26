import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
export class EigenvaluesAtKpoint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false,
        };
    }
    renderEigenvaluesAtKpoint(eigenvalues) {
        const result = [];
        (eigenvalues.eigenvalues || []).forEach((value, index) => {
            var _a;
            result.push(_jsxs(TableRow, { children: [_jsx(TableCell, { children: eigenvalues.kpoint ? numberPadArray(eigenvalues.kpoint) : "-" }), _jsx(TableCell, { align: "right", children: eigenvalues.weight ? eigenvalues.weight.toFixed(4) : "-" }), _jsx(TableCell, { align: "right", children: (_a = value.spin) !== null && _a !== void 0 ? _a : "-" }), _jsx(TableCell, { align: "right", children: (value.energies || []).map((element, idx) => {
                            return _jsx("div", { children: element }, idx);
                        }) }), _jsx(TableCell, { align: "right", children: (value.occupations || []).map((element, idx) => {
                            return _jsx("div", { children: element }, idx);
                        }) })] }, index));
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
        return (_jsx(Button, { onClick: () => this.setState({ isExpanded: !isExpanded }), children: _jsx(IconByName, { name: isExpanded ? "actions.collapse" : "shapes.dots.horizontal", fontSize: "small" }) }));
    }
    render() {
        const { isExpanded } = this.state;
        return (_jsxs(Box, { children: [_jsx(Typography, { variant: "subtitle2", color: "text.primary", children: "Eigenvalues" }), _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Kpoint" }), _jsx(TableCell, { align: "right", children: "Weight" }), _jsx(TableCell, { align: "right", children: "Spin" }), _jsx(TableCell, { align: "right", children: "Energies" }), _jsx(TableCell, { align: "right", children: "Occupations" })] }) }), _jsxs(TableBody, { children: [isExpanded && this.renderAllKpoints(), this.renderSwitch()] })] })] }));
    }
}
