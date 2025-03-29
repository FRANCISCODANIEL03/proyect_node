let editando = false;
let productoId = null;

const eliminar = async(id)=>{
    const response = await fetch(
        'http://localhost:3000/api/v1/prod/'+id,{
            method:"DELETE",
            headers:{
                "Content-type": "application/json"
            }
    });
    
    if(response.status == 204){
        alert("producto eliminado correctamente")
        const elementoactual = document.querySelector(`[id="${id}"]`)
        if(elementoactual){
            elementoactual.remove()
        }
        
        return
    }else{
        if(response.ok){
            const respuesta = await response.json()
            alert(respuesta.message || "Error al eliminar producto")
        }else{
            alert("Ocurrio un problema con el servidor intenta de nuevo mas tarde")
        }
    }
}

// Función para editar un producto
const editar = (id, nombre, precio, stock) => {
    document.getElementById('name').value = nombre;
    document.getElementById('price').value = precio;
    document.getElementById('stock').value = stock;
    const btnSubmit = form.querySelector('button[type="submit"]'); 
    const btnReset = form.querySelector('button[type="button"]'); 

    productoId = id;
    editando = true;

    // Cambiar los textos de los botones
    btnSubmit.textContent = "Guardar";
    btnReset.textContent = "Cancelar";
    btnReset.classList.remove('bg-sky-300', 'hover:bg-sky-500')
    btnReset.classList.add('bg-red-400', 'hover:red-500')
};

document.addEventListener('DOMContentLoaded', ()=>{
    const contenedor = document.getElementById('contenedor-cards');
    const form = document.getElementById('form');
    const btnSubmit = form.querySelector('button[type="submit"]'); 
    const btnReset = form.querySelector('button[type="button"]'); 

    form.addEventListener('submit', async(e)=>{
        e.preventDefault()
        const name = document.getElementById('name').value
        const price = parseFloat(document.getElementById('price').value)
        const stock = parseInt(document.getElementById('stock').value)

    })

})
    
