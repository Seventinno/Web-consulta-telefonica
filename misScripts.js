

async function obtenerTodos() {
    try {
        fetch('https://my-json-server.typicode.com/fedegaray/telefonos/db', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(respuesta => respuesta.json())
        .then(data => {
            let cuerpoTabla = document.getElementById("productos");
            let salida = "";
            for(let elemento of data.dispositivos){
                salida += `
                    <tr>
                        <td>${elemento.id}</td>
                        <td>${elemento.marca}</td>
                        <td>${elemento.modelo}</td>
                        <td>${elemento.color}</td>
                        <td>${elemento.almacenamiento} </td>
                        <td>${elemento.procesador}</td>
                    </tr>
                `;
            } 
            cuerpoTabla.innerHTML = salida;
        })
        .catch(error => { throw new Error("Error en la solicitud: " + error) })
    } catch (error) {
        console.error(error)
    }
}

async function mostrarModelo(){
    let idBusqueda = document.getElementById("busqueda").value;
    let pedido = await axios.get('https://my-json-server.typicode.com/fedegaray/telefonos/db');
    let dato = pedido.data;
        for(elemento of dato.dispositivos){
            if(elemento.id == idBusqueda){
                document.getElementById("nombre").value = elemento.marca;
                document.getElementById("modelo").value = elemento.modelo;
                document.getElementById("color").value = elemento.color;
                document.getElementById("almacenamiento").value = elemento.almacenamiento;
                document.getElementById("procesador").value = elemento.procesador;
            }
        }
    }

async function modificar(){
    let ingreso = document.getElementById("busqueda").value;
    let nuevoNombre = document.getElementById("nombre").value;
    let nuevoModelo = document.getElementById("modelo").value;
    let nuevoColor = document.getElementById("color").value;
    let nuevoAlmacenamiento = document.getElementById("almacenamiento").value;
    let nuevoProcesador = document.getElementById("procesador").value;
    
    let modificacion = {
      "id": 1,
        "marca": nuevoNombre,
        "modelo": nuevoModelo,
        "color": nuevoColor,
        "almacenamiento": nuevoAlmacenamiento,
        "procesador": nuevoProcesador
        }
    
    await axios.put(`https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${ingreso}`, modificacion)
    .then(respuesta =>{
        alert('El producto ha sido actualizado')
        })
    .catch(error=>{
        console.error(error)
    })
    }

async function eliminar(){
    let ingreso = document.getElementById("busqueda").value;
    fetch(`https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/${ingreso}`,{
        method: 'DELETE'
    })
    
    .then(res=>{
        alert("El producto fue correctamente eliminado");
        document.querySelectorAll('#contenedorCampos textarea').forEach(elemento => {
            elemento.value = '';
        });
    })
    .catch(error =>{
        console.error('Ocurrio un error: ' + error)
    })
}

async function agregar(){
    let postId = document.getElementById("ingresoID").value;
    let postNombre = document.getElementById("ingresoNombre").value;
    let postModelo = document.getElementById("ingresoModelo").value;
    let postColor = document.getElementById("ingresoColor").value;
    let postAlmacenamiento = document.getElementById("ingresoAlmacenamiento").value;
    let postProcesador = document.getElementById("ingresoProcesador").value;

    let posteo = {
        "id": postId,
        "marca": postNombre,
        "modelo": postModelo,
        "color": postColor,
        "almacenamiento": postAlmacenamiento,
        "procesador": postProcesador
      }
    
    let respuesta = await axios.get('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos')
    let postIdExistente = respuesta.data.some(elemento => elemento.id == postId);

        if (postIdExistente) {
            alert('El ID ingresado ya se encuentra en uso, por favor coloca otro');
        } else {
            await axios.post('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos', posteo)
            .then(res =>{
                alert("El post fue publicado correctamente " + JSON.stringify(posteo, null, 2));
                
            })
            .catch(error => {
                console.error('Error al publicar el post:', error);
                alert('Ocurrió un error al publicar el post. Por favor, inténtalo nuevamente.');
              });
}
}
    

