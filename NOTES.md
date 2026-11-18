# PKHosting Website — Research Notes

This document records six observations from reviewing the publicly accessible PKHosting website and its hosting-related pages. These observations informed the structure and user experience decisions of the assessment implementation.

## 1. Product Category Navigation

**Observed element:** The website's product navigation separates hosting categories, including VPS hosting, shared hosting, WordPress hosting, reseller hosting, and dedicated server products.

**What it does:** It allows visitors to explore different hosting product categories instead of presenting every service on one page.

**UX consequence:** Clear product categorisation helps visitors identify relevant services and reduces the effort required to find a suitable hosting solution.

**Reference:** https://www.pkhosting.com/

## 2. Billing Period Selection

**Observed element:** Hosting plan pages provide billing-period choices.

**What it does:** Visitors can compare pricing across different subscription terms instead of viewing only one billing period.

**UX consequence:** Showing billing options helps customers understand the financial commitment before proceeding to checkout.

**Reference:** https://www.pkhosting.com/

## 3. Pricing Plan Cards

**Observed element:** Hosting pricing pages present plans as separate cards with plan names, pricing, and included features.

**What it does:** Each card groups the information associated with a particular hosting plan.

**UX consequence:** A card-based layout makes it easier to scan plan differences and compare options without reading a long block of text.

**Reference:** https://www.pkhosting.com/vps/

## 4. Plan Recommendation Labels

**Observed element:** Pricing pages use visual labels such as popularity or value indicators to highlight selected plans.

**What it does:** These labels draw attention to plans the provider wants visitors to consider.

**UX consequence:** Recommendation labels can reduce decision effort, but should not replace clear specifications and pricing information.

**Reference:** https://www.pkhosting.com/vps/

## 5. Order and Checkout Actions

**Observed element:** Hosting plan pages provide ordering actions that take visitors towards the purchase process.

**What it does:** The actions connect plan discovery with the next step in the customer journey.

**UX consequence:** A clear call to action reduces uncertainty about how to proceed after choosing a plan.

**Reference:** https://www.pkhosting.com/vps/

## 6. Payment Options and Currency Restrictions

**Observed element:** PKHosting's public FAQ describes card payments through Stripe (Visa and Mastercard), PayPal, bank transfer, JazzCash, and EasyPaisa.

**What it does:** The FAQ explains payment options and specifies currency restrictions. For example, PayPal is listed for USD, GBP, and EUR invoices, while JazzCash and EasyPaisa wallet payments are for PKR invoices.

**UX consequence:** Explaining payment availability before checkout helps customers choose a suitable payment method and avoid payment-currency confusion.

**Research limitation:** The assessment brief refers to eight existing payment methods. The publicly accessible FAQ identifies payment providers and card brands, but this research did not establish eight distinct methods matching that requirement. No additional methods have been invented for the implementation. The footer therefore uses the publicly identified payment categories as text labels.

**References:**

- https://www.pkhosting.com/faq/
- https://www.pkhosting.com/terms/

---

## Implementation Assumptions and Limitations

- The four VPS plan prices in this assessment are supplied project values.
- VPS specifications shown in the comparison table are illustrative and have not been verified as current PKHosting product specifications.
- USD and GBP conversion rates are fixed assessment values, not live exchange rates.
- Payment labels are informational only. No payment gateway integration is included.
- The page does not implement a live checkout or order-processing flow.
- Public website content may change after the research date.
