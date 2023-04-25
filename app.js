(function(){

    let DB;
    const listadoAutos = document.querySelector('#listado-autos');
    const deleteMensaje = document.querySelector('.delete');

    document.addEventListener('DOMContentLoaded', ()=>{

        listadoAutos.addEventListener('click', eliminarRegistro);
        createDB();


        if(window.indexedDB.open('car', 1)){
            obtenerAutos();
        };
    });

    function createDB(){

        const createDB = window.indexedDB.open('car', 1);

        createDB.onerror = function(){
            console.log('Hubo un error');
        };

        createDB.onsuccess = function(){

            DB = createDB.result;
        };

        createDB.onupgradeneeded = function(e){

            const db = e.target.result;

            const objectStore = db.createObjectStore('car', {keyPath: 'id', autoIncrement: true});

            //Crear Columnas

            objectStore.createIndex('estado', 'estado', {unique: false});
            objectStore.createIndex('marca', 'marca', {unique: false});
            objectStore.createIndex('modelo', 'modelo', {unique: false});
            objectStore.createIndex('color', 'color', {unique: false});
            objectStore.createIndex('id', 'id', {unique: false});

            console.log('Columnas creadas')
        };
    };


    function obtenerAutos(){

        const conexion = window.indexedDB.open('car');

        conexion.onerror = function(){
            console.log('Hubo un error')
        };

        conexion.onsuccess = function(){
            DB = conexion.result;

            const transaction = DB.transaction(['car'], 'readwrite');

            const objectStore = transaction.objectStore('car');

            objectStore.openCursor().onsuccess = function(e){
                const cursor = e.target.result;

                if(cursor){

                    const {estado, marca, modelo, color, id} = cursor.value;

                  

                    listadoAutos.innerHTML +=
                    ` <tr>
         <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
             <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${estado} </p>
         </td>

         <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
         <p class="text-sm leading-10 text-gray-700"> ${marca} </p>
         </td>

         <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
             <p class="text-gray-700">${modelo}</p>
         </td>

         <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">   
             <p class="text-gray-600">${color}</p>
         </td>

         <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
             <a href="editarInfo.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
             <a href="#" data-auto="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
         </td>
`;

cursor.continue();
                }
                else{
                    console.log('No hay más información')
                }
            };
        };
    };

    function eliminarRegistro(e){

        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.auto);

            console.log(idEliminar);

            const confirmar = confirm('¿Desea eliminar este registro?');

            if(confirmar){

                const transaction = DB.transaction(['car'], 'readwrite');

                const objectStore = transaction.objectStore('car');

                objectStore.delete(idEliminar);

                transaction.oncomplete= function(){
                   imprimirAlerta('Registro eliminado')

                    e.target.parentElement.parentElement.remove();
                };

                transaction.onerror = function(){
                    console.log('Hubo un error');
                };
            };


        }
    };


    function imprimirAlerta(mensaje, tipo){

        const alerta = document.querySelector('.alerta');
    
        if(!alerta){
    
            const divMensaje = document.createElement('div');
            divMensaje.classList.add('px-4', 'py-3', 'border', 'rounded','m-auto', 'max-w-md','mt-6', 'text-center', 'alerta');
    
            if(tipo === 'error'){
                divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
            }
            else{
                divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
            }
    
            divMensaje.textContent = mensaje;
    
            deleteMensaje.appendChild(divMensaje);
    
           
    
            setTimeout(()=>{
              divMensaje.remove();
            },1500)
        };
    };
})();