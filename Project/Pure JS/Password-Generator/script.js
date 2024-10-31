const passwordBox = document.getElementById('password')
const showPasswordIcon = document.getElementById('show')
const lengtht = 12

const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCase = "abcdefghijklmnopqrstuvwxyz"
const number ="0123456789"
const specialCharacer = "!@#$%^&*><+-/"

const allChar = upperCase + lowerCase + number + specialCharacer

function CreatePassword(){
let password = ""
passwordBox.type = "password"

 password += upperCase[Math.floor(Math.random()*upperCase.length)]
 password += lowerCase[Math.floor(Math.random()*lowerCase.length)]
 password += number[Math.floor(Math.random()*number.length)]
 password += specialCharacer[Math.floor(Math.random()*specialCharacer.length)]  

while (lengtht > password.length){
    password += allChar[Math.floor(Math.random()*allChar.length)]
}
passwordBox.value = password
}

function copyPassword(){
    passwordBox.select()
    navigator.clipboard.writeText(passwordBox.value); // to copy clipboard
    alert("Text has been copied");
}

function showPassword() {
    if (passwordBox.type === "password") {
        showPasswordIcon.src = './images/show.png'   
     passwordBox.type = "text"; // change the type so it hide the password
    } else {
    passwordBox.type = "password";
    showPasswordIcon.src = './images/hide.png'
    }
  }
//