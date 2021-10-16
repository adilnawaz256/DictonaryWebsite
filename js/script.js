let input = document.querySelector('#input');
let search = document.querySelector('#search');
const not_found = document.querySelector('.not_found')
let heading = document.createElement('h3');
let suggestion = document.createElement('span');
suggestion.classList.add('suggested');
let defbox = document.querySelector('.def');
let audiobox = document.querySelector('.audio');
let load = document.querySelector('.loading');
let apikey ='c9939716-712b-4b85-94ae-098d4fda2b32';
search.addEventListener('click' , function(e){
e.preventDefault();

// cleardata
audiobox.innerHTML='';
not_found.innerText ='';
defbox.innerText='';
// Get Input data for input value
let word = input.value;
// Call Api
if(word ==""){
    alert("Word is required!")
    return;
}
getData(word);
})
async function  getData(word) {
  load.style.display = 'block';
// Ajax api
const respone= await fetch(`https://dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apikey}`);
 const data = await respone.json();
    if(!data.length){
        load.style.display = 'none';
        not_found.innerText='No result found'
        return;
    }
    function getsuggestions(){
        data.forEach(element => {
            suggestion.innerText =element;
            not_found.appendChild(suggestion);
        });
    }
    // if result is suggestion
    if(typeof data[0]==='string'){
        load.style.display = 'none';
        heading.innerText = 'Did You mean?';
      not_found.appendChild(heading);
     getsuggestions();

    }
    // Result found
    load.style.display = 'none';
    let defintion = data[0].shortdef[0];
    defbox.innerText = defintion;

    // Sound get 
    const soundname = data[0].hwi.prs[0].sound.audio;
    if(soundname){
        renderSound(soundname);
    }

 console.log(data);
}
function renderSound(soundname){
let subfolder = soundname.charAt(0);
let soundSrc =  `https://media.merriam-webster.com/soundc11/${subfolder}/${soundname}.wav?key=${apikey}`;

let aud =document.createElement('audio');
aud.src=soundSrc;
aud.controls=true;
audiobox.appendChild(aud);
}