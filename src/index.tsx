import ThemeProvider from "@exabyte-io/cove.js/dist/theme/provider";
import React from "react";
import ReactDOM from "react-dom";

import { ResultsView } from "./ResultsView";
import type { PropertiesProveExtraConfig, PropertyData } from "./types";

type ResultsInput = PropertyData[];

// eslint-disable-next-line  react/no-render-return-value
const renderResults = (
    results: ResultsInput,
    newDomElement?: HTMLElement,
    extraConfig?: PropertiesProveExtraConfig,
) => {
    const domElement = newDomElement || document.getElementById("root");
    if (!domElement) {
        console.warn("No root element found for rendering results");
        return;
    }

    ReactDOM.render(
        <ThemeProvider>
            <ResultsView results={results} extraConfig={extraConfig} />
        </ThemeProvider>,
        domElement,
    );
};

(window as any).renderResults = renderResults;
export { renderResults };
