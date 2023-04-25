(function (){


    const formulario = document.querySelector('#formulario');
    
    document.addEventListener('DOMContentLoaded', ()=>{

        formulario.addEventListener('submit', validarInfo);
        conectDB();
    });


    function validarInfo(e){
        e.preventDefault();
        
        const estado = document.querySelector('#estado').value;
        const marca = document.querySelector('#marca').value;
        const modelo = document.querySelector('#modelo').value;
        const color = document.querySelector('#color').value;


        if(estado === '' || marca === '' || modelo === '' || color === ''){
            imprimirAlerta('Por favor diligencie todos los campos', 'error');
            return;
        };

        const auto ={
            estado,
            marca,
            modelo,
            color,
        }

        auto.id = Date.now();

       crearNuevoAuto(auto);
    };


    function crearNuevoAuto(auto){

        const transaction = DB.transaction(['car'], 'readwrite');

        const objectStore = transaction.objectStore('car');

        objectStore.add(auto);

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error', 'error')
        }

        transaction.oncomplete = function(){
            imprimirAlerta('Auto agregado correctamente');

            setTimeout(()=>{
                window.location.href = "index.html"
            },1500)
        };
    };



})();