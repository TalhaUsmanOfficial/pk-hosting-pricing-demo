/*
! Created On Wed November 18 2:11 PM 2026

! @author: Talha Usman
! Status: Developer
*/


// ? Pricing Section
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



// ? FAQ Section


const faqItems = document.querySelectorAll(".faq-item");

function setFaqState(button, answer, isOpen) {
    button.setAttribute("aria-expanded", String(isOpen));
    answer.hidden = !isOpen;

    const icon = button.querySelector(".faq-icon");

    if (icon) {
        icon.textContent = isOpen ? "−" : "+";
    }
}

faqItems.forEach((item, index) => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!button || !answer) {
        return;
    }

    // First answer stays open; remaining answers start collapsed.
    setFaqState(button, answer, index === 0);

    button.addEventListener("click", () => {
        const isCurrentlyOpen =
            button.getAttribute("aria-expanded") === "true";

        // Close all FAQ answers first.
        faqItems.forEach((faqItem) => {
            const otherButton = faqItem.querySelector(".faq-question");
            const otherAnswer = faqItem.querySelector(".faq-answer");

            if (otherButton && otherAnswer) {
                setFaqState(otherButton, otherAnswer, false);
            }
        });

        // Open the clicked answer only if it was previously closed.
        if (!isCurrentlyOpen) {
            setFaqState(button, answer, true);
        }
    });
});


// ? Preferences Storage

const PREFERENCES_KEY = "pkhosting-vps-preferences";

function loadPreferences() {
    const defaultPreferences = {
        billing: "monthly",
        currency: "PKR"
    };

    try {
        const savedData = localStorage.getItem(PREFERENCES_KEY);

        if (!savedData) {
            return defaultPreferences;
        }

        const preferences = JSON.parse(savedData);

        if (!preferences || typeof preferences !== "object") {
            return defaultPreferences;
        }

        return {
            billing: preferences.billing === "annual"
                ? "annual"
                : "monthly",

            currency: Object.hasOwn(
                exchangeRates,
                preferences.currency
            )
                ? preferences.currency
                : "PKR"
        };

    } catch (error) {
        // Storage may be unavailable or saved JSON may be invalid.
        return defaultPreferences;
    }
}

function savePreferences() {
    const preferences = {
        billing: getSelectedBilling(),
        currency: getSelectedCurrency()
    };

    try {
        localStorage.setItem(
            PREFERENCES_KEY,
            JSON.stringify(preferences)
        );
    } catch (error) {
        // Pricing still works even if browser storage is unavailable.
    }
}

function applyPreferences(preferences) {
    const billingOption = document.querySelector(
        `input[name="billing-period"][value="${preferences.billing}"]`
    );

    if (billingOption) {
        billingOption.checked = true;
    }

    if (
        currencySelect &&
        Object.hasOwn(exchangeRates, preferences.currency)
    ) {
        currencySelect.value = preferences.currency;
    }
}


function handlePreferenceChange() {
    updatePricing();
    savePreferences();
}

billingOptions.forEach((option) => {
    option.addEventListener("change", handlePreferenceChange);
});

currencySelect?.addEventListener(
    "change",
    handlePreferenceChange
);

if (billingControls && currencySelect && pricingCards.length > 0) {
    const preferences = loadPreferences();

    applyPreferences(preferences);
    updatePricing();

    billingControls.hidden = false;
}
