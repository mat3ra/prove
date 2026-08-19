import { Property } from "@mat3ra/prode";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React from "react";
import _ from "underscore";
import s from "underscore.string";

function toFixed(number: number | string, precision = 3) {
    if (_.isNumber(number)) {
        return number.toFixed(precision);
    }
    return number;
}

interface OneLevelObjectProps {
    data: any;
    title?: string;
    property?: Property;
}

interface ObjectTableCell {
    key: string;
    value: React.ReactNode;
}

interface ObjectTableProps {
    title?: string;
    headers: ObjectTableCell[];
    rows: ObjectTableCell[][];
}

function getArrayHeaders(values: Record<string, unknown>[]) {
    return Array.from(new Set(values.flatMap((row) => Object.keys(row))));
}

function formatTableValue(value: unknown) {
    if (_.isNumber(value) || _.isString(value)) return toFixed(value);
    if (_.isBoolean(value)) return value ? "Yes" : "No";
    return value;
}

function getRowKey(row: ObjectTableCell[]) {
    return row.map(({ key, value }) => `${key}:${String(value)}`).join("|");
}

function ObjectTable({ title, headers, rows }: ObjectTableProps) {
    return (
        <Box p={4} sx={{ overflow: "auto" }}>
            <Typography variant="subtitle2" color="text.primary">
                {title}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header) => (
                            <TableCell key={header.key}>{header.value}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={getRowKey(row)}>
                            {row.map((cell) => (
                                <TableCell key={cell.key}>{cell.value}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}

export function OneLevelObject({ title, data, property }: OneLevelObjectProps) {
    const defaultTitle = React.useMemo(() => {
        if (property) {
            return Property.prettifyName(property.name);
        }
        return undefined;
    }, [property]);

    const { headers, rows } = React.useMemo(() => {
        const entries = Object.keys(data || {}).filter((key) => data[key]?.value);
        return {
            headers: entries.map((key) => ({
                key,
                value: `${s.humanize(data[key].name)} (${data.units || ""})`,
            })),
            rows: [
                entries.map((key) => ({
                    key,
                    value: toFixed(data[key].value),
                })),
            ],
        };
    }, [data]);

    return <ObjectTable title={title || defaultTitle} headers={headers} rows={rows} />;
}

export function ArrayOfObjects({ title, data, property }: OneLevelObjectProps) {
    const values = React.useMemo(
        () => data?.values || property?.prop("values" as Parameters<Property["prop"]>[0]) || [],
        [data, property],
    );
    const headers = React.useMemo(() => getArrayHeaders(values), [values]);

    const rows = React.useMemo(() => {
        return values.map((row: Record<string, unknown>) => {
            return headers.map((header) => ({
                key: header,
                value: formatTableValue(row[header]),
            }));
        });
    }, [headers, values]);

    return (
        <ObjectTable
            title={title}
            headers={headers.map((header) => ({ key: header, value: s.humanize(header) }))}
            rows={rows}
        />
    );
}
