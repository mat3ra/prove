import { jsx as _jsx } from "react/jsx-runtime";
import ThemeProvider from "@exabyte-io/cove.js/dist/theme/provider";
import ReactDOM from "react-dom";
import { ResultsView } from "./ResultsView";
// eslint-disable-next-line  react/no-render-return-value
const renderResults = (results, newDomElement, extraConfig) => {
    const domElement = newDomElement || document.getElementById("root");
    if (!domElement) {
        console.warn("No root element found for rendering results");
        return;
    }
    ReactDOM.render(_jsx(ThemeProvider, { children: _jsx(ResultsView, { results: results, extraConfig: extraConfig }) }), domElement);
};
window.renderResults = renderResults;
export { renderResults };
