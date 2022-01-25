const form = document.querySelector('#form');
const resultados = document.querySelector('#resultados');
const texto = document.querySelector('#texto');
const header = document.querySelector('.header');
const buscaste = document.querySelector('.buscaste');
const buscaste2 = document.querySelector('.buscaste2');


// speech
const speechRecongnition = webkitSpeechRecognition;
const recognition = new speechRecongnition();

form.addEventListener('click', (e)=>{
    e.preventDefault();
  
    //click buscar
    if(e.target.classList.contains('search__btn')){
        const textoValue = texto.value
        if(textoValue === ''){

            return;

        }

        
        buscarImagen(textoValue);

        //limpiar formulario
        texto.value = '';
    }

    if(e.target.classList.contains('micro')){
        const microfono = document.querySelector('.microfono');

        // const micro = e.target.classList.contains('microfono');
        recognition.start();

        recognition.onstart = function(){ 
            
            microfono.children[0].classList.add('micro2');
            microfono.children[1].textContent = 'Grabando..';

        }

        recognition.onspeechend = function(){
            microfono.children[0].classList.remove('micro2');
            microfono.children[1].textContent = 'Se dejó de grabar';
            setTimeout(()=>{
                microfono.children[1].textContent = '';
            },3000)
            recognition.stop();
        }

        recognition.onresult = function(e){
 
            const texto = e.results[0][0].transcript;
            buscarImagen(texto);
          
        }
    }

})


async function buscarImagen(textoValue){
   
    

   
   //respuesta
   const text = `
   <span class="header__search">Buscaste:<span class="header__search2"> ${textoValue}</span></span>`;
   mostrarResultado(buscaste,text)
  
    // consumiendo api
    const api = '25333438-f293927903b48674f7f821e02';
    const url = `https://pixabay.com/api/?key=${api}&q=${textoValue}`;

    try{
        const resolve = await fetch(url);
        const response = await resolve.json();
        const result = response.hits;


        const text = `<span class="header__search3">Encontramos ${result.length} resultados</span>`;
        mostrarResultado(buscaste2,text)

        limpiarHTMl(resultados);
        mostrarHtml(result);
    }catch(error){

    }
}

// mostrarHtml
function mostrarHtml(result){
   

    result.forEach(element => {
        const { id, largeImageURL, downloads, likes, views } = element;
        crearResultado = `
        <div class="resultado">
                <img src="${largeImageURL}" alt="">
            </div>
        `;

        const div = document.createElement('div');

        div.innerHTML = crearResultado;

        resultados.appendChild(div.firstElementChild);
        
    });
}

//limpiar Html
function limpiarHTMl(result){
    while(result.firstElementChild){
        result.removeChild(result.firstElementChild);
    }
}

// resultados

function mostrarResultado(padre,text){
                
    limpiarHTMl(padre)
    const buscamos = text;
    const div = document.createElement('div');
    div.innerHTML = buscamos;
    padre.appendChild(div);
   
}

