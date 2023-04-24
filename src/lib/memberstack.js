import memberstackDOM from "@memberstack/dom"

export const memberstack = memberstackDOM.init({
    publicKey: "YOUR_PUBLIC_KEY",
    sessionDurationDays: 7,
});