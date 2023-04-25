
function conectDB(){

    const conexion = window.indexedDB.open('car', 1);

    conexion.onerror = function(){
        console.log('Hubo un error');
    };

    conexion.onsuccess = function(){

        DB = conexion.result;
    };
};




function imprimirAlerta(mensaje, tipo){

    const alerta = document.querySelector('.alerta');

    if(!alerta){

        const divMensaje = document.createElement('div');
        divMensaje.classList.add('px-4', 'py-3', 'border', 'rounded', 'max-w-lg', 'mt-6', 'text-center', 'alerta');

        if(tipo === 'error'){
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }
        else{
            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }

        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

       

        setTimeout(()=>{
          divMensaje.remove();
        },1500)
    };
};