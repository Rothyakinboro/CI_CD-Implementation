const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

describe("Web Application HTML", () => {
  let document;

  // Load the HTML file before running tests
  beforeAll(() => {
    const filePath = path.join(__dirname, 'index.html');
    const html = fs.readFileSync(filePath, 'utf8');
    const dom = new JSDOM(html);
    document = dom.window.document;
  });

  test("should have a heading with text 'Hello!'", () => {
    const heading = document.querySelector('h1');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('Hello!');
  });

  test("should have an image with src 'wave.png'", () => {
    const img = document.querySelector('img[src="wave.png"]');
    expect(img).not.toBeNull();
  });

  test("should have a heading with text 'Its Rotimi'", () => {
    const headings = document.querySelectorAll('h1');
    const heading = Array.from(headings).find(h => h.textContent === 'Its Rotimi');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('Its Rotimi');
  });

  test("should have an image with src 'whale.png'", () => {
    const img = document.querySelector('img[src="whale.png"]');
    expect(img).not.toBeNull();
  });

  test("should have a heading with text 'It works on my machine...'", () => {
    const headings = document.querySelectorAll('h1');
    const heading = Array.from(headings).find(h => h.textContent === 'It works on my machine...');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('It works on my machine...');
  });

  test("should have a heading with text 'and every other machines!!'", () => {
    const headings = document.querySelectorAll('h1');
    const heading = Array.from(headings).find(h => h.textContent === 'and every other machines!!');
    expect(heading).not.toBeNull();
    expect(heading.textContent).toBe('and every other machines!!');
  });
});
