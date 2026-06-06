
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
// Agr password hiddent hoga tu ye condition true hogi 
    if(passwordInput.type === "password"){  
        // password ki type "password" ki jagah text ho jyegi or password vivsible ho jaygea
        passwordInput.type = "text";
        // Button per Hide ajayega 
        togglePassword.textContent = "Hide";
    }
    // Agar password pehle se hi visible ho tu : 
    else{
        // password ki type phir se password ho jayegi 
        passwordInput.type = "password";
        // Button per show likha hoa jaygea 
        togglePassword.textContent = "Show";
    }

});


// PASSWORD ANALYSIS

// ye code her baar jb koi password type karega , usse check kerne ke liye istemal hota he 
passwordInput.addEventListener("input", () => {
    // jb bhi koii password likhe tu neeche wala code chaalega
    checkPassword(passwordInput.value);
});

function checkPassword(password){

    let score = 0;

    // Check conditions

    let hasLength = password.length >= 8;
    let hasUpper = /[A-Z]/.test(password);
    let hasLower = /[a-z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSpecial = /[^A-Za-z0-9]/.test(password);

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


// UPDATE CHECKLIST

// element : jo element update kerna he 
// valid : Booleab value True / false 
// text : wo text jo requirement ke tour per dikhana he 
function updateRequirement(element, valid, text){
// agar valid ki value true he tu ye block chalega 
    if(valid){
        element.innerHTML = "✓ " + text;
        element.className = "valid";
    }
    else{
        element.innerHTML = "✗ " + text;
        element.className = "invalid";
    }

}


// STRENGTH BAR


function updateStrength(score){

    let width = 0;
    let color = "";
    let text = "";

    switch(score){
// agr password me  0 or 1 point sahi ho tu : 
        case 0:
        case 1:
            width = 20;
            color = "#ff3b30";
            text = "Very Weak";
            break;
// agr password me 2 point sahi ho tu : 

        case 2:
            width = 40;
            color = "#ff9500";
            text = "Weak";
            break;
// agr password me 3point sahi ho tu : 

        case 3:
            width = 60;
            color = "#ffcc00";
            text = "Medium";
            break;
// agr password me 4 point sahi ho tu : 

        case 4:
            width = 80;
            color = "#34c759";
            text = "Strong";
            break;
// agr password me 5 point sahi ho tu : 

        case 5:
            width = 100;
            color = "#00b894";
            text = "Very Strong";
            break;
    }
// update bar width : example : 80   + % = 80%
    strengthBar.style.width = width + "%";
    strengthBar.style.background = color;

    strengthText.textContent =
    // element ke andr text change kerta he 
        "Password Strength: " + text;
}


// SUGGESTIONS


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


// GENERATE STRONG PASSWORD


generateBtn.addEventListener("click", () => {

    let chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*()_+{}[]<>?/";
    let password = "";
// ye loop 14 baar chalega / 0 se shuru hoga / 13 tk
    for(let i = 0; i < 14; i++){

        let randomIndex =
        // neeche wala number round off kerga  
            Math.floor(
                // chars.lenght upper diye hoe saare characters ko ginta he / total 88
                Math.random() * chars.length
            );

        password += chars[randomIndex];
    }

    passwordInput.value = password;

    checkPassword(password);
});