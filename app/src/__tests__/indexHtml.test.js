const fs = require("fs");
const path = require("path");

const INDEX_HTML_PATH = path.resolve(__dirname, "..", "..", "..", "index.html");

describe("index.html", () => {
  let html;

  beforeAll(() => {
    html = fs.readFileSync(INDEX_HTML_PATH, "utf8");
  });

  it("defines the expected document metadata and frame layout", () => {
    expect(html).toContain("<!DOCTYPE html>");
    expect(html).toContain('<meta charset="UTF-8" />');
    expect(html).toContain(
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    );
    expect(html).toContain("<title>Hello world</title>");
    expect(html).toContain('<html lang="en">');

    expect(html).toContain(".frame {");
    expect(html).toContain("width: 393px;");
    expect(html).toContain("height: 852px;");
    expect(html).toContain("background-color: #ffffff;");
    expect(html).toContain("overflow: hidden;");
  });

  it("renders the expected text node content and styling", () => {
    expect(html).toContain('<span class="text-node">Hello world!</span>');
    expect(html).toContain(".text-node {");
    expect(html).toContain("left: 163px;");
    expect(html).toContain("top: 399px;");
    expect(html).toContain('font-family: "Inter", sans-serif;');
    expect(html).toContain("font-size: 12px;");
    expect(html).toContain("line-height: 14.522727012634277px;");
    expect(html).toContain("color: #000000;");
    expect(html).toContain("white-space: nowrap;");
  });

  it("keeps the Figma canvas background color on body", () => {
    expect(html).toContain("body {");
    expect(html).toContain("background-color: #1e1e1e;");
    expect(html).toContain("min-height: 100vh;");
  });
});
