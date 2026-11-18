/*
! Created On Wed November 18 2:11 PM 2026

! @author: Talha Usman
! Status: Developer
*/


const billingControls = document.querySelector(".billing-controls");

const billingOptions = document.querySelectorAll(
    'input[name="billing-period"]'
);

const currencySelect = document.querySelector("#currency-select");
const pricingCards = document.querySelectorAll(".pricing-card");
const billingStatus = document.querySelector("#billing-status");

const exchangeRates = {
    PKR: 1,
    USD: 278.50,
    GBP: 355.00
};

function formatCurrency(amount, currency) {
    const decimalPlaces = currency === "PKR" ? 0 : 2;

    return new Intl.NumberFormat("en", {
        style: "currency",
        currency,
        currencyDisplay: "code",
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces
    }).format(amount);
}

function getSelectedBilling() {
    const selectedOption = document.querySelector(
        'input[name="billing-period"]:checked'
    );

    return selectedOption?.value === "annual" ? "annual" : "monthly";
}

function getSelectedCurrency() {
    const currency = currencySelect?.value;

    return Object.hasOwn(exchangeRates, currency) ? currency : "PKR";
}

function updatePricing() {
    if (!currencySelect || pricingCards.length === 0) {
        return;
    }

    const billing = getSelectedBilling();
    const currency = getSelectedCurrency();
    const exchangeRate = exchangeRates[currency];

    pricingCards.forEach((card) => {
        const priceElement = card.querySelector(".price-amount");
        const periodElement = card.querySelector(".price-period");
        const annualDetails = card.querySelector(".annual-details");

        const annualTotalElement = annualDetails?.querySelector(
            ".annual-total-amount"
        );

        const savingsElement = annualDetails?.querySelector(
            ".annual-savings"
        );

        if (!priceElement || !periodElement) {
            return;
        }

        const monthlyPKR = Number(priceElement.dataset.monthlyPkr);

        if (!Number.isFinite(monthlyPKR) || monthlyPKR <= 0) {
            return;
        }

        let displayedPKR = monthlyPKR;

        if (billing === "annual") {
            if (!annualDetails || !annualTotalElement || !savingsElement) {
                return;
            }

            const annualTotalPKR = monthlyPKR * 10;
            const savingsPKR = monthlyPKR * 2;

            displayedPKR = annualTotalPKR / 12;

            annualTotalElement.textContent = formatCurrency(
                annualTotalPKR / exchangeRate,
                currency
            );

            savingsElement.textContent = `You save ${formatCurrency(
                savingsPKR / exchangeRate,
                currency
            )} per year`;

            annualDetails.hidden = false;
        } else if (annualDetails) {
            annualDetails.hidden = true;
        }

        priceElement.textContent = formatCurrency(
            displayedPKR / exchangeRate,
            currency
        );

        periodElement.textContent = "/ month";
    });

    if (billingStatus) {
        billingStatus.textContent =
            `Showing ${billing} prices in ${currency}.`;
    }
}

billingOptions.forEach((option) => {
    option.addEventListener("change", updatePricing);
});

currencySelect?.addEventListener("change", updatePricing);

if (billingControls && currencySelect && pricingCards.length > 0) {
    updatePricing();
    billingControls.hidden = false;
}
