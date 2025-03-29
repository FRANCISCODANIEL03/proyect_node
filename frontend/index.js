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
