let options;
let randomCountry;
let countryName;
let flag;
let contador=0;

async function getApiCountries() {
    const response = await fetch("./api.json");
    const countries = await response.json();

    return countries;
}

async function getFourRandomCountries() {
    const countries = await getApiCountries();
    const randomCountries = [];
    for (let i = 0; i < 4; i++) {
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        randomCountries.push(randomCountry);
    }
    return randomCountries;
}

async function loadFlagData(){

    options = await getFourRandomCountries(); //creating 4 posibble options for the user to choose from
    randomCountry = options[Math.floor(Math.random() * options.length)]; //selecting one of the 4 options randomly

    //saving main country data in variables to use later
    countryName = randomCountry.translations.spa.common;
    flag =  `https://flagcdn.com/w320/${randomCountry.cca2.toLowerCase()}.png`;

    //html elements to display the data
    const flagElement = document.getElementById("flag");
    const option1Element = document.getElementById("option1");
    const option2Element = document.getElementById("option2");
    const option3Element = document.getElementById("option3");
    const option4Element = document.getElementById("option4");

    //displaying the data in the html elements
    flagElement.src = flag;
    option1Element.textContent = options[0].translations.spa.common;
    option2Element.textContent = options[1].translations.spa.common;
    option3Element.textContent = options[2].translations.spa.common;
    option4Element.textContent = options[3].translations.spa.common;

}

async function checkAnswer(selectedOption) {

    const selectedOptionElement = document.getElementById(`option${selectedOption}`);
    if (selectedOptionElement.textContent == countryName) {
        console.log("Correct answer!");
        contador++;
        document.getElementById("score").textContent = `Puntuación: ${contador}`;
        selectedOptionElement.style.backgroundColor = "green";
    }else{
        console.log("Incorrect answer!");
        selectedOptionElement.style.backgroundColor = "red";
    }
    
    //esperar un segundo antes de cargar la nueva bandera
    setTimeout(() => {
        selectedOptionElement.style.backgroundColor = ""; //reset the button color
        loadFlagData(); //loading new flag after the user selects an option
    }, 1000);
    
}

async function main() {
   
    await loadFlagData(); //loading the data in the html elements

    document.getElementById("option1").addEventListener("click", () => checkAnswer(1));
    document.getElementById("option2").addEventListener("click", () => checkAnswer(2));
    document.getElementById("option3").addEventListener("click", () => checkAnswer(3));
    document.getElementById("option4").addEventListener("click", () => checkAnswer(4));

}

main();