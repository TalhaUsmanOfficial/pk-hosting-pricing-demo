# PKHosting VPS Hosting — Pricing Page

A responsive, static VPS hosting pricing page created as a technical assessment project for TechAbout Private Limited.

The page presents four VPS plan cards, monthly and annual billing options, currency conversion, a plan comparison table, an FAQ accordion, and payment information.

## Features

- Responsive layout for desktop, tablet, and mobile screens.
- Four VPS pricing plans: Starter, Growth, Scale, and Dedicated Core.
- Monthly and annual billing selection.
- Dynamic annual pricing calculations and savings display.
- PKR, USD, and GBP currency selection.
- Browser preference persistence using `localStorage`.
- VPS plan comparison table with ten specification rows.
- Accessible FAQ accordion.
- Footer with publicly identified payment options.
- Static implementation that does not require a backend or build process.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage` API

## Project Structure

```text
pkhosting-vps-pricing/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── screenshots/
├── README.md
├── NOTES.md
└── .gitignore
```

## How to Run

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` directly in Chrome or Firefox.

No package installation, build command, development server, or internet connection is required to render the page.

## Pricing Logic

The four demonstration monthly prices are:

| Plan           | Monthly Price |
| -------------- | ------------: |
| Starter        |     PKR 2,400 |
| Growth         |     PKR 4,800 |
| Scale          |     PKR 9,600 |
| Dedicated Core |    PKR 19,500 |

### Annual Billing

Annual billing is calculated using the following rules:

- Annual total = Monthly price × 10
- Effective monthly price = Annual total ÷ 12
- Annual savings = Monthly price × 2

The annual total is displayed separately to make the upfront billing amount clear.

### Currency Conversion

The implementation uses fixed demonstration exchange rates:

| Currency | Conversion Rate |
| -------- | --------------: |
| PKR      |               1 |
| USD      |      278.50 PKR |
| GBP      |      355.00 PKR |

Conversion formula:

`Converted amount = PKR amount ÷ exchange rate`

PKR values are displayed without decimal places. USD and GBP values use two decimal places.

These exchange rates are fixed assessment values, not live market rates.

## Preference Persistence

The selected billing period and currency are saved in browser `localStorage`.

On page load, the application:

1. Reads saved preferences.
2. Validates the stored billing and currency values.
3. Falls back to Monthly and PKR when data is missing or invalid.
4. Applies the selected preferences and updates the displayed prices.

Storage access and JSON parsing are protected with error handling so that unavailable or invalid storage does not prevent the pricing interface from working.

Browser storage behaviour for pages opened through `file://` can vary by browser. The project should be tested in the target browsers using the supplied opening method.

## Accessibility

Accessibility considerations include:

- Semantic HTML elements and meaningful page sections.
- A single primary page heading and hierarchical section headings.
- Native buttons for interactive FAQ questions.
- `aria-expanded` and `aria-controls` for FAQ state and relationships.
- Keyboard-operable controls and visible focus indicators.
- Accessible labels for billing and currency controls.
- A caption and scoped headers for the comparison table.
- A horizontally scrollable comparison table region on smaller screens.
- A live status message for pricing updates.

## Design and Responsive Behaviour

The stylesheet uses CSS custom properties for the colour palette, spacing, typography, borders, and shadows.

Responsive CSS layouts adapt the navigation, pricing cards, comparison table, and footer to narrower viewports.

## Testing Status

Feature-level browser checks were performed during implementation for the pricing cards, billing toggle, currency conversion, comparison table, FAQ accordion, and preference persistence.

The final full-project verification should include:

- Chrome and Firefox.
- 360px, 768px, and 1440px viewport widths.
- 200% browser zoom.
- Keyboard navigation.
- JavaScript-disabled behaviour.
- Offline operation.
- Browser console errors.

## Important Implementation Notes

- The VPS plan specifications are illustrative assessment data and are not represented as verified live PKHosting product specifications.
- The currency conversion rates are fixed values supplied for this assessment.
- The page does not connect to a payment gateway or process orders.
- Payment options shown in the footer are informational labels based on publicly available PKHosting payment information.
- The project is a static frontend demonstration, not a production hosting checkout system.

## AI Usage Disclosure

AI assistance was used during development for fast development, code suggestions and documentation drafting. The project was assembled and tested through the developer's own implementation and browser verification process.
