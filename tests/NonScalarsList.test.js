const fs = require("fs");
const path = require("path");
const { expect } = require("chai");

describe("NonScalarsList property views", () => {
  const source = fs.readFileSync(
    path.join(__dirname, "..", "src", "components", "NonScalarsList.tsx"),
    "utf8",
  );

  it("maps hysteresis_loop to the same view as band_structure", () => {
    const bandStructureEntry = source.match(/\[PropertyName\.band_structure\]:\s*(\w+),/);
    const hysteresisLoopEntry = source.match(/\[PropertyName\.hysteresis_loop\]:\s*(\w+),/);
    expect(hysteresisLoopEntry, "hysteresis_loop is not mapped in PROPERTY_VIEWS").to.not.equal(null);
    expect(hysteresisLoopEntry[1]).to.equal(bandStructureEntry[1]);
  });
});
