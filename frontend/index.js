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

        data = {
            "nombre": name,
            "precio": price,
            "stock": stock 
        }

        if (editando) {
            const response = await fetch('http://localhost:3000/api/v1/prod/'+productoId, {
                method: "PATCH",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Producto actualizado correctamente");
                resetFormulario();
                obtenerProductosAPI();
            } else {
                const respuesta = await response.json();
                alert(respuesta.message || "Error al actualizar producto");
            }
        } else {
        const response = await fetch('http://localhost:3000/api/v1/prod',{
                method:"POST",
                headers:{
                    "Content-type": "application/json"
                },
                body:JSON.stringify(data)
                }   
        );

        if(response.status == 201){
            alert("producto agregado correctamente")
            obtenerProductosAPI()
            return
        }else{
            const respuesta = await response.json()
            if(response.ok){
                alert(respuesta.message || "Error al agregar producto")
            }else{
                alert(respuesta.message)
            }
        }
    }
    })

    // Función para restablecer el formulario
    const resetFormulario = () => {
        form.reset();
        editando = false;
        productoId = null;
        btnSubmit.textContent = "Agregar";
        btnReset.textContent = "Limpiar";
        btnReset.classList.remove('bg-red-400', 'hover:red-500')
        btnReset.classList.add('bg-sky-300', 'hover:sky-500')
    };

    // Asignar función de cancelar al botón reset
    btnReset.addEventListener('click', resetFormulario);
    
    const obtenerProductosAPI = async()=>{
        const response = await fetch('http://localhost:3000/api/v1/prod');

        if (response.ok){
            const productos = await response.json();
            contenedor.innerHTML = "";
            productos.map(producto=>{
                contenedor.innerHTML += `
                <li id="${producto.id}" class="w-10/12 max-md:w-auto flex max-lg:flex-col bg-sky-200 
                transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-103 
                hover:bg-sky-400 rounded-xl justify-between p-3">
                <div>
                <h3 class="ml-5 py-1 font-bold">${producto.nombre}</h3>
                <div class="ml-4 py-2 flex flex-col">
                <span class="ml-2 text-green-600 font-semibold">$${producto.precio}</span>
                <span class="ml-2 mt-2 font-semibold">Stock: ${producto.stock}</span>
                </div>
                </div>
                <div class="flex flex-col my-2 mr-6">
                <button
                onclick="editar(${producto.id}, '${producto.nombre}', ${producto.precio}, ${producto.stock})"
                class="bg-sky-300 px-8 py-1 mb-2 font-bold border-2 border-sky-300 hover:border-sky-50 rounded-xl">
                <i class="bi bi-pencil"></i> Editar</button>
                <button 
                onclick="eliminar(${producto.id})" 
                class="bg-red-400 px-8 py-1 font-bold border-2 border-red-400 hover:border-red-50 rounded-xl">
                <i class="bi bi-trash3"></i>
                Eliminar</button>
                </div>
                </li>
                `
            });
        }
    }
    obtenerProductosAPI();
})
    
