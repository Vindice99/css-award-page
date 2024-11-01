let imgbox = document.getElementById("imgBox")
let qrImage = document.getElementById("qrImage")
const inputBox = document.getElementById("input-box")
const apiURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="


async function Generate()
{
    let qrUrl = inputBox.value
    /*qrUrl is defined outside the Generate function, so it only captures the value of inputBox when the code is first loaded. 
    This means if the user changes the input, qrUrl won’t update dynamically. */
    if(qrUrl.length > 0)
    {
        qrImage.src = apiURL + encodeURIComponent(qrUrl)
        imgbox.classList.add("show-img")
    }
    else{
        inputBox.classList.add("error")
        setTimeout(() =>{
            inputBox.classList.remove("error") // remove the class name after the animation
        },1000)
    }
}