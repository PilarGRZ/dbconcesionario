(function(){

    let DB;
    let idAuto;
    const estadoInput = document.querySelector('#estado');
    const marcaInput = document.querySelector('#marca');
    const modeloInput = document.querySelector('#modelo');
    const colorInput = document.querySelector('#color');

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', ()=>{


        formulario.addEventListener('submit', actualizaRegistro);

        conectDB()

        const parametrosUrl = new URLSearchParams(window.location.search);

        idAuto = parametrosUrl.get('id');

        if(idAuto){
            setTimeout(()=>{
                obtenerAuto(idAuto);
            },100)
        };
    });


    function obtenerAuto(id){

        const transaction = DB.transaction(['car'], 'readwrite');

        const objectStore = transaction.objectStore('car');

        const auto = objectStore.openCursor();

        auto.onsuccess = function(e){
        const cursor = e.target.result;

        if(cursor){
            if(cursor.value.id === Number(id)){

                llenarFormulario(cursor.value);
               
            }
            cursor.continue();
        };
        };
    };


    function llenarFormulario(llenar){

        const{estado, marca, modelo, color}= llenar;

        estadoInput.value = estado,
        marcaInput.value = marca,
        modeloInput.value = modelo,
        colorInput.value = color
        
    };

    
    function conectDB(){

        const conexion = window.indexedDB.open('car', 1);

        conexion.onerror = function(){
            console.log('Hubo un error');
        };

        conexion.onsuccess = function(){

            DB = conexion.result;
        };
    };


    function actualizaRegistro(e){
        e.preventDefault();

        if(estadoInput.value === '' || marcaInput.value === '' || modeloInput.value === '' || colorInput.value===''){
            imprimirAlerta('Por favor diligencie todos los campos', 'error')
            return;
        }

        const autoActualizado ={

            estado: estadoInput.value,
            marca:  marcaInput.value,
            modelo: modeloInput.value,
            color: colorInput.value,
            id: Number(idAuto),
        }


        const transaction = DB.transaction(['car'], 'readwrite');

        const objectStore = transaction.objectStore('car');

        objectStore.put(autoActualizado);

        transaction.onerror = function(){
            console.log('Hubo un error')
        }

        transaction.oncomplete = function(){
            imprimirAlerta('¡Auto actualizado!');

            setTimeout(()=>{

                window.location.href = "index.html";
            },1500)
        };

    }
})();