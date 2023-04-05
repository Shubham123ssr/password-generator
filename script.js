//fetch everything u want to work on
const inputSlider= document.querySelector("[data-lengthSlider]");
const lengthDisplay= document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copyMsg]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generateButton");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");

const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();

//set password Length
function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText= passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor= color;
    //shadow
}

function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,10);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));//convert number to character
}

function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbol(){
    const randNum= getRndInteger(0,symbols.length);
    return symbols.charAt(randNum);//randNum mai konsa symbol hai array mai wo batata hai
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");//green
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");//yellow
    } else {
      setIndicator("#f00");//red
    }
}

async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);//clipboard pe write karta hai
        copyMsg.innerText= "copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }

    //copyMsg.classList.add("active");//active namki class hogi css mai wo add ho jayegi.
    setTimeout(() =>{
        //copyMsg.classList.remove("active")
    }, 2000);
}

// function handleCheckBoxChange(){
//     checkCount=0;
//     allCheckBox.forEach((checkbox) => {
//         if(checkbox.checked)
//         checkCount++;
//     });

//     if(passwordLength<checkCount){
//         passwordLength=checkCount;
//         handleSlider();
//     }
// }

// allCheckBox.forEach((checkbox) => {
//     checkbox.addEventListener('change', handleCheckBoxChange);
// })


inputSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;//e slider element dikhata hai nd iska value copy kardiya passwordLength mai
    handleSlider();
})

copyBtn.addEventListener('click', () => 
{
    if(passwordDisplay.value)
    copyContent();
})

function shufflePassword(array){
    //fisher Yates Method(array pe apply karke shuffle kar sakte hai)
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

generateBtn.addEventListener('click', () =>
{
    //none of checkBox is ticked
    if(checkCount<=0)
    return;

    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }

    //start finding new password 

    //remove old password
    password="";

    //lets put the stuffs mentioned in checkbox
    // if(uppercaseCheck.checked){
    //     password+= generateUpperCase();
    // }

    // if(lowercaseCheck.checked){
    //     password+= generateLowerCase();
    // }

    // if(numbersCheck.checked){
    //     password+= generateRandomNumber();
    // }

    // if(symbolsCheck.checked){
    //     password+= generateSymbol();
    // }

    let funcArr= [];

    if(uppercaseCheck.checked)
    funcArr.push(generateUpperCase);

    if(lowercaseCheck.checked)
    funcArr.push(generateLowerCase);
    

    if(numbersCheck.checked)
    funcArr.push(generateRandomNumber);
    

    if(symbolsCheck.checked)
    funcArr.push(generateSymbol);
    
    //compulsary addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }

    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex= getRndInteger(0,funcArr.length);
        password+=funcArr[randIndex]();
    }

    //shuffling the password
    password= shufflePassword(Array.from(password));

    //show in UI
    passwordDisplay.value= password;

    //calculation of strength
    calcStrength();
});


    
