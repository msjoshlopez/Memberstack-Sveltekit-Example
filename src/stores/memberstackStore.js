import { writable } from "svelte/store";
import { browser } from "$app/environment";
import { memberstack } from "$lib/memberstack";
import { goto } from "$app/navigation";

// This is a svelte store for all of Memberstack's DOM methods
// We chose to go this route because it allows us to use all of the DOM methods in one place


// Memberstack member data - Uses local storage to persist data
const memberstackLocalStorageKey = "_ms-mem";
// @ts-ignore
export const memberData = writable(browser && JSON.parse(localStorage.getItem(memberstackLocalStorageKey)) || null);
memberData.subscribe((data) => { if (browser) localStorage.setItem(memberstackLocalStorageKey, JSON.stringify(data)); });
// Sets the member data in svelte store
// @ts-ignore
export async function setMemberData(data) {
    memberData.set(data);
}

// Memberstack app data - Uses local storage to persist data
const memberstackAppStorageKey = "_ms-app";
// @ts-ignore
export const appData = writable(browser && JSON.parse(localStorage.getItem(memberstackAppStorageKey)) || null);
appData.subscribe((data) => { if (browser) localStorage.setItem(memberstackAppStorageKey, JSON.stringify(data)); });
// Sets the app data in svelte store
// @ts-ignore
export async function setAppData(data) {
    appData.set(data);
}

// Memberstack DOM methods to get the current member and app data

// function to get the current memberstack member
export async function getCurrentMember() {
    await memberstack.getCurrentMember().then(({ data: member }) => {
        if (member) {
            // Member is logged in
            setMemberData(member)
        } else {
            // Member is logged out
            setMemberData(null);
        }
    });
}

// function to get the current memberstack app data
export async function getCurrentApp() {
    await memberstack.getApp().then(({ data: app }) => {
        if (app) {
            setAppData(app)
        } else {
            setAppData(null);
        }
    });
}

// function to add an auth listener
export async function addAuthListener() {
    // @ts-ignore
    memberstack.onAuthChange((member) => {
        if (member) {
            // Member is logged in
            setMemberData(member)
            goto('/profile');
        } else {
            // Member is logged out
            setMemberData(null);
            goto('/');
        }
    });
}

// function to logout the Memberstack member
export async function logoutMember() {
    if (browser) await memberstack.logout();
}


// Memberstack Pre-built Modals

// function to open the Memberstack pre-built login modal
export async function openLoginModal() {
    if (browser) await memberstack.openModal("LOGIN", {
        // Attention: uncomment the following if you want to show a signup link in the login modal.
        // replace the plan ID with your own free plan ID
        // signup: {
        //     plans: ["pln_free-plan-uz1w0rju"], // must be free plans
        // }
    }).then((data) => {
        // hide modal because it doesnt hide automatically
        memberstack.hideModal();
    })
}

// function to open the Memberstack pre-built signup modal
export async function openSignupModal() {
    if (browser) await memberstack.openModal("SIGNUP", {
        // Attention: uncomment the following if you want the new member to be added to a free plan on signup.
        // replace the plan ID with your own free plan ID
        // signup: {
        //     plans: ["pln_free-plan-uz1w0rju"], // must be free plans
        // }
    }).then((data) => {
        // hide modal because it doesnt hide automatically
        memberstack.hideModal();
    })
}

// function to open the Memberstack pre-built forgot password modal
export async function openForgotPasswordModal() {
    if (browser) await memberstack.openModal("FORGOT_PASSWORD").then((data) => {
        // hide modal because it doesnt hide automatically
        memberstack.hideModal();
    })
}

// function to open the Memberstack pre-built reset password modal
export async function openResetPasswordModal() {
    if (browser) await memberstack.openModal("RESET_PASSWORD").then((data) => {
        // hide modal because it doesnt hide automatically
        memberstack.hideModal();
    })
}

// function to open the Memberstack pre-built profile modal
export async function openProfileModal() {
    if (browser) await memberstack.openModal("PROFILE").then((data) => {
        // hide modal because it doesnt hide automatically
        memberstack.hideModal();
    })
}


//  Memberstack Authentication

// function to login the Memberstack member
// @ts-ignore
export async function loginMemberWithEmailPassword(email, password) {
    await memberstack.loginMemberEmailPassword({
        email: email,
        password: password,
    })
}

// function to send the Memberstack member a magic link/passwordless 
// first step
// @ts-ignore
export async function sendMemberPasswordlessEmail(email) {
    await memberstack.sendMemberLoginPasswordlessEmail({
        email: email
      })
}

// function to login the Memberstack member with a magic link/passwordless
// second step
// @ts-ignore
export async function loginMemberWithPasswordless(passwordlessToken, email) {
    await memberstack.loginMemberPasswordless({
        passwordlessToken: passwordlessToken,
        email: email,
      })
}

// function to set the Memberstack member password (Only use if the member has no password)
// @ts-ignore
export async function setMemberPassword(password) {
    await memberstack.setPassword({
        password: password,
    })
}

// function to login the Memberstack member with auth provider
// provider can be "google", "facebook", "apple", "github", "twitter", "linkedin"
// @ts-ignore
export async function loginMemberWithAuthProvider(provider) {
    await memberstack.loginWithProvider({
        provider: provider,
      })
}

// function to connect the Memberstack member with auth provider
// provider can be "google", "facebook", "apple", "github", "twitter", "linkedin"
// @ts-ignore
export async function connectMemberWithAuthProvider(provider) {
    await memberstack.connectProvider({
        provider: provider
    })
}

// function to disconnect the Memberstack member from auth provider
// provider can be "google", "facebook", "apple", "github", "twitter", "linkedin"
// @ts-ignore
export async function disconnectMemberWithAuthProvider(provider) {
    await memberstack.disconnectProvider({
        provider: provider
    })
}

// function to send reset password email to the Memberstack member
// @ts-ignore
export async function sendMemberResetPasswordEmail(email) {
    try {
        await memberstack.sendMemberResetPasswordEmail({
            email: email,
        })
    } catch (error) {
        console.log(error)
    }
}

// function to reset the Memberstack member password
// @ts-ignore
export async function resetMemberPassword(resetToken, newPassword) {
    await memberstack.resetMemberPassword({
        token: resetToken,
        newPassword: newPassword,
      })
}

// function to send member verification email to the Memberstack member
// @ts-ignore
export async function sendMemberVerificationEmail() {
    await memberstack.sendMemberVerificationEmail()
}

// function to signup the Memberstack member with email and password and custom fields and meta data and free plans
// @ts-ignore
export async function signupMemberWithEmailPassword(email, password, customFields, metaData, planId) {
    await memberstack.signupMemberEmailPassword({
        email: email,
        password: password,
        customFields: customFields ? customFields : {},
        metaData: metaData ? metaData : {},
        plans:  planId ? [
            {planId: planId} // must be free plans and is optional
        ] : []
    })
}

// function to send the Memebrstack member a magic link/passwordless email
// step one
// @ts-ignore
export async function sendMemberSignupPasswordlessEmail(email) {
    await memberstack.sendMemberSignupPasswordlessEmail({
        email: email
      })
}

// function to signup the Memberstack member with magic link/passwordless and custom fields and meta data and free plans
// step two
// @ts-ignore
export async function signupMemberWithPasswordless(passwordlessToken, email, customFields, metaData, planId) {
    await memberstack.signupMemberPasswordless({
        passwordlessToken: passwordlessToken,
        email: email,
        customFields: customFields ? customFields : {},
        metaData: metaData ? metaData : {},
        plans: planId ? [
            {planId: planId} // must be free plans
        ] : []
    })
}

// function to signup the Memberstack member with auth provider and custom fields and free plans
// provider can be "google", "facebook", "apple", "github", "twitter", "linkedin"
// @ts-ignore
export async function signupMemberWithAuthProvider(provider, customFields, planId) {
    await memberstack.signupWithProvider({
        provider: provider,
        customFields: customFields ? customFields : {},
        plans: planId ? [
            {planId: planId} // must be free plans
        ] : []
    })
}


// Memberstack Checkout and Billing

// function to purchase a plan for the Memberstack member with checkout
// @ts-ignore
export async function purchasePlansWithCheckout(priceId, canelUrl, successUrl, autoRedirect) {
    await memberstack.purchasePlansWithCheckout({
        priceId: priceId, // must be paid plans and required
        cancelUrl: canelUrl ? canelUrl : "", // optional
        successUrl: successUrl ? successUrl : "", // optional
        autoRedirect: autoRedirect ? autoRedirect : true, // optional
    })
}

// function to signup member and purchase a plan with checkout
// @ts-ignore
export async function signupMemberAndPurchasePlansWithCheckout(email, password, customFields, metaData, planId, priceId, cancelUrl, successUrl, autoRedirect) {
    try {
        // first signup the member
        await memberstack.signupMemberEmailPassword({
            email: email,
            password: password,
            customFields: customFields ? customFields : {},
            metaData: metaData ? metaData : {},
            plans: planId ? [
                {planId: planId} // must be free plans and is optional
            ] : []
        })

        // after successful signup, redirect them to the stripe checkout
        await memberstack.purchasePlansWithCheckout({
            priceId: priceId, // required
            cancelUrl: cancelUrl ? cancelUrl : "", // optional
            successUrl: successUrl ? successUrl : "", // optional
            autoRedirect: autoRedirect ? autoRedirect : true, // optional
        })

    } catch (error) {
        console.log(error)
    }
}

// function to launch the stripe customer billing portal.
// You can find configuration options here:https://stripe.com/docs/api/customer_portal/configuration#portal_configuration_object-features
// @ts-ignore
export async function launchMemberBillingPortal(priceIds, configuration, returnUrl, autoRedirect) {
    await memberstack.launchStripeCustomerPortal({ 
        priceIds: priceIds, // required
        configuration: configuration ? configuration : {}, // optional
        returnUrl: returnUrl ? returnUrl : "", // optional
        autoRedirect: autoRedirect ? autoRedirect : true, // optional
      })
}


// Memberstack Member Management

// function to update the current Memberstack member custom fields
// @ts-ignore
export async function updateMemberCustomFields(customFields) {
    const updatedMemberData = await memberstack.updateMember({
        customFields: customFields
    }).then(({ data }) => {
        const spreadedButter = { ...memberData, ...data }
        if (data.id) {
            // Member is logged in
            setMemberData(spreadedButter)
        } else {
            // Member is logged out
            setMemberData(null);
        }
    });
}

// function to get the current Memberstack member json
// @ts-ignore
export async function getMemberJSON() {
    const memberJSON = await memberstack.getMemberJSON()
    // add memberJSON data to memberData without overwriting existing data
    if (memberJSON.data) {
        setMemberData(memberJSON.data)
    }
}

// function to update the current Memberstack member json
// @ts-ignore
export async function updateMemberJSON(data) {
    await memberstack.updateMemberJSON({ 
        json: data
      })
}

// function to add a free plan to the current Memberstack member
// @ts-ignore
export async function addFreePlanToMember(planId) {
    await memberstack.addPlan({ 
        planId: planId
      })
}

// function to remove a free plan from the current Memberstack member
// @ts-ignore
export async function removeFreePlanFromMember(planId) {
    await memberstack.removePlan({ 
        planId: planId
      })
}