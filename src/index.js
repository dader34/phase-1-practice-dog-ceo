const imageContainer = document.querySelector("#dog-image-container")
const breedContainer = document.querySelector("#dog-breeds")
const dogSortOptions = document.querySelector("#breed-dropdown")
const allBreeds = []
const addDogs = () =>{
    fetch("https://dog.ceo/api/breeds/image/random/4",{
        headers:{
            "Accept":"application/json"
        }
    })
    .then(resp => resp.json())
    .then(body => {
        body.message.forEach(e => {
            const dogPic = document.createElement("img")
            dogPic.src = e
            imageContainer.append(dogPic)
        });
    })
}
const addBreeds = () =>{
    fetch("https://dog.ceo/api/breeds/list/all",{
        headers:{
            "Accept":"application/json"
        }
    })
    .then(resp => resp.json())
    .then(body =>{
        for(let breed in body.message){
            const dogBreed = document.createElement("li")
            dogBreed.textContent = breed
            allBreeds.push(breed)
            dogBreed.addEventListener("click",()=>{
                dogBreed.style.color = "red"
            })
            breedContainer.append(dogBreed)
        }
    }).catch(e=>{
        console.error("Couldnt access image")
    })
}

dogSortOptions.addEventListener("change",(e)=>{
    sortBreed(e.target.value)
})

const sortBreed = (letter) =>{
    breedContainer.innerHTML = ''
    for(let breed of allBreeds){
        if(breed.startsWith(letter)){
            const dogBreed = document.createElement("li")
            dogBreed.textContent = breed
            breedContainer.append(dogBreed)
        }
    }
}

addDogs()
addBreeds()