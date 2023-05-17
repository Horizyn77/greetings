const person = document.querySelector('input[type="text"]');
const greetBtn = document.querySelector(".greetBtn");
const result = document.querySelector(".result");
const numGreeted = document.querySelector(".timesGreeted");
const resetBtn = document.querySelector(".resetBtn");
const err = document.querySelector(".errMsg");
const radBtns = document.querySelectorAll('input[type="radio"]');
let buttonCheck;

const greetings = Greetings();

let counter = 0;

let namesGreeted = [];

function Greetings() {

    let greeting = "";
    let errorMsg;
    let errorVisibility = "hidden";
    

    function setGreeting(name, radioBtn) {
        const engGreeting = "Hello";
        const araGreeting = "Marhaba";
        const urdGreeting = "Salaam";

        if (radioBtn) {
            if(radioBtn === "eng") {
                greeting = `${engGreeting}, ${name}`;
            } else if (radioBtn === "ara") {
                greeting = `${araGreeting}, ${name}`;
            } else if (radioBtn === "urd") {
                greeting = `${urdGreeting}, ${name}`;
            }
        }
    }

    function getGreeting() {
        return greeting;
    }

    function setCounter(name) {
        
        name = name.toLowerCase();

        if (!namesGreeted.includes(name)) {

            namesGreeted.push(name);
            counter++;
        }

        let stringNames = JSON.stringify(namesGreeted);

        localStorage['greetedNames'] = stringNames;

        localStorage['greetedTimes'] = counter;
        
    }

    function getCounter() {
        return counter;
    }

    function setReset() {
        counter = 0;
        namesGreeted = [];
        localStorage.clear();
        localStorage['greetedTimes'] = counter;
    }

    function setErrMsg(input, checked, nums) {
        if(input && checked && nums) {
            errorMsg = "Numbers are not allowed";
            errorVisibility = "visible";
        } else if (input && !checked && nums) {
            errorMsg = "Numbers are not allowed";
            errorVisibility = "visible";
        } else if(input && checked && !nums) {
            displayGreeting();
            errorVisibility = "hidden";
        } else if (!input && !checked) {
            errorMsg = "A name and language is required";
            errorVisibility = "visible";
        } else if (input && !checked) {
            errorMsg = "A language is required";
            errorVisibility = "visible";
        } else if (!input && checked) {
            errorMsg = "A name is required";
            errorVisibility = "visible";
        }
    }

    function getErrMsg() {
        return errorMsg;
    }

    function getErrorVisibility() {
        return errorVisibility;
    }
    return {
        setGreeting,
        getGreeting,
        setCounter,
        getCounter,
        setReset,
        setErrMsg,
        getErrMsg,
        getErrorVisibility
    }
}

function displayGreeting() {
        greetings.setGreeting(person.value, buttonCheck.value);
        
        result.innerHTML = greetings.getGreeting();
        result.style.visibility = "visible";
 
        greetings.setCounter(person.value);
    
        numGreeted.innerText = localStorage['greetedTimes'];

        person.value = "";

        radBtns.forEach((item) => {
            if (item.checked) {
                item.checked = false;
            }
        })
}

function greetingsClicked() {

    const checkedBtn = document.querySelector('input[name="lang"]:checked');

    buttonCheck = checkedBtn;

    const pattern = /\d/;

    const containNums = pattern.test(person.value)

    greetings.setErrMsg(person.value, checkedBtn, containNums);

    err.innerText = greetings.getErrMsg();
    err.style.visibility = greetings.getErrorVisibility();
}

if (localStorage['greetedTimes']) {
    counter = Number(localStorage['greetedTimes']);
    numGreeted.innerText = localStorage['greetedTimes'];
}

if (localStorage['greetedNames']) {
    namesGreeted = JSON.parse(localStorage['greetedNames']);
}

function reset() {
    greetings.setReset();
    numGreeted.innerText = localStorage['greetedTimes'];
    person.value = "";
    result.style.visibility = "hidden";
    err.style.visibility = "hidden";
    radBtns.forEach((item) => {
        if (item.checked) {
            item.checked = false;
        }
    })
}

greetBtn.addEventListener("click", greetingsClicked);
resetBtn.addEventListener("click", reset);
person.addEventListener("focus", () => {
    if (err.innerText) {
        err.style.visibility = "hidden";
    }
} );

radBtns.forEach((item) => {
    item.addEventListener("click", () => {
        err.style.visibility = "hidden";
    })
})