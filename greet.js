const person = document.querySelector('input[type="text"]');
const greetBtn = document.querySelector(".greetBtn");
const result = document.querySelector(".result");
const numGreeted = document.querySelector(".timesGreeted");
const resetBtn = document.querySelector(".resetBtn");
const err = document.querySelector(".errMsg");
const radBtns = document.querySelectorAll('input[type="radio"]');

const greetings = Greetings();

let counter = 0;

let namesGreeted = {};

function Greetings() {

    let greeting = "";

    function setGreeting(name) {
        const engGreeting = "Hello";
        const araGreeting = "Marhaba";
        const urdGreeting = "Salaam";

        const checkedBtn = document.querySelector('input[name="lang"]:checked');

        if (checkedBtn) {
            if(checkedBtn.value === "eng") {
                greeting = `${engGreeting}, ${name}`;
            } else if (checkedBtn.value === "ara") {
                greeting = `${araGreeting}, ${name}`;
            } else if (checkedBtn.value === "urd") {
                greeting = `${urdGreeting}, ${name}`;
            }
        }
    }

    function getGreeting() {
        return greeting;
    }

    return {
        setGreeting,
        getGreeting
    }
}

function greetingsClicked() {

    const checkBtn = document.querySelector('input[name="lang"]:checked');
    
    if(person.value !== "" && checkBtn) {
        
        greetings.setGreeting(person.value);

        result.innerHTML = greetings.getGreeting();
        result.style.visibility = "visible";
 
        if(namesGreeted[person.value] === undefined) {
            counter++;
    
            namesGreeted[person.value] = 1;
        } else {
            namesGreeted[person.value]++;
        }
    
        localStorage['greetedTimes'] = counter;
    
        numGreeted.innerText = localStorage['greetedTimes'];
        
    } else if (!person.value && !checkBtn) {

        err.innerText = "A name and language is required";
        err.style.visibility = "visible";
    } else if (!checkBtn) {
        err.innerText = "A language is required";
        err.style.visibility = "visible";
    }
}

if(localStorage['greetedTimes']) {
    counter = Number(localStorage['greetedTimes']);
    numGreeted.innerText = localStorage['greetedTimes'];
}

function reset() {
    counter = 0;
    localStorage['greetedTimes'] = counter;
    numGreeted.innerText = localStorage['greetedTimes'];
    namesGreeted = {};
    person.value = "";
    result.style.visibility = "hidden";
    radBtns.forEach((item) => {
        if (item.checked) {
            item.checked = false;s
        }
    })

}

greetBtn.addEventListener("click", greetingsClicked);
resetBtn.addEventListener("click", reset);
person.addEventListener("focus", () => {
    if(err.innerText) {
        err.style.visibility = "hidden";
    }
} );

radBtns.forEach((item) => {
    item.addEventListener("click", () => {
        err.style.visibility = "hidden";
    })
})