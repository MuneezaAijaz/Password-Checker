
// GET HTML ELEMENTS


let passwordInput = document.getElementById("password");
let strengthBar = document.getElementById("strengthBar");
let strengthText = document.getElementById("strengthText");
let suggestionText = document.getElementById("suggestionText");
let togglePassword = document.getElementById("togglePassword");
let generateBtn = document.getElementById("generateBtn");

// Requirement Indicators

let lengthReq = document.getElementById("length");
let upperReq = document.getElementById("uppercase");
let lowerReq = document.getElementById("lowercase");
let numberReq = document.getElementById("number");
let specialReq = document.getElementById("special");


// SHOW / HIDE PASSWORD

// Waits for button clicked 
togglePassword.addEventListener("click", () => { 

    if(passwordInput.type === "password"){
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    }
    else{
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});

// ======================================
// PASSWORD ANALYSIS
// ======================================

passwordInput.addEventListener("input", () => {
    checkPassword(passwordInput.value);
});

function checkPassword(password){

    let score = 0;

    // Check conditions

    const hasLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    // Update checklist

    updateRequirement(lengthReq, hasLength, "At least 8 characters");
    updateRequirement(upperReq, hasUpper, "Uppercase letter");
    updateRequirement(lowerReq, hasLower, "Lowercase letter");
    updateRequirement(numberReq, hasNumber, "Number");
    updateRequirement(specialReq, hasSpecial, "Special character");

    // Score

    if(hasLength) score++;
    if(hasUpper) score++;
    if(hasLower) score++;
    if(hasNumber) score++;
    if(hasSpecial) score++;

    updateStrength(score);

    generateSuggestions(
        hasLength,
        hasUpper,
        hasLower,
        hasNumber,
        hasSpecial
    );
}

// ======================================
// UPDATE CHECKLIST
// ======================================

function updateRequirement(element, valid, text){

    if(valid){
        element.innerHTML = "✓ " + text;
        element.className = "valid";
    }
    else{
        element.innerHTML = "✗ " + text;
        element.className = "invalid";
    }

}

// ======================================
// STRENGTH BAR
// ======================================

function updateStrength(score){

    let width = 0;
    let color = "";
    let text = "";

    switch(score){

        case 0:
        case 1:
            width = 20;
            color = "#ff3b30";
            text = "Very Weak";
            break;

        case 2:
            width = 40;
            color = "#ff9500";
            text = "Weak";
            break;

        case 3:
            width = 60;
            color = "#ffcc00";
            text = "Medium";
            break;

        case 4:
            width = 80;
            color = "#34c759";
            text = "Strong";
            break;

        case 5:
            width = 100;
            color = "#00b894";
            text = "Very Strong";
            break;
    }

    strengthBar.style.width = width + "%";
    strengthBar.style.background = color;

    strengthText.textContent =
        "Password Strength: " + text;
}

// ======================================
// SUGGESTIONS
// ======================================

function generateSuggestions(
    length,
    upper,
    lower,
    number,
    special
){

    let suggestions = [];

    if(!length){
        suggestions.push("Use at least 8 characters.");
    }

    if(!upper){
        suggestions.push("Add uppercase letters.");
    }

    if(!lower){
        suggestions.push("Add lowercase letters.");
    }

    if(!number){
        suggestions.push("Include numbers.");
    }

    if(!special){
        suggestions.push("Use special characters.");
    }

    if(suggestions.length === 0){

        suggestionText.innerHTML =
            "Excellent! Your password is very secure. 🔒";

    }
    else{

        suggestionText.innerHTML =
            suggestions.join("<br>");

    }
}

// ======================================
// GENERATE STRONG PASSWORD
// ======================================

generateBtn.addEventListener("click", () => {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*()_+{}[]<>?/";

    let password = "";

    for(let i = 0; i < 14; i++){

        const randomIndex =
            Math.floor(
                Math.random() * chars.length
            );

        password += chars[randomIndex];
    }

    passwordInput.value = password;

    checkPassword(password);
});