const Productos = ["Remera", "Pantalon", "Buzo", "Campera"]
const PreciosProducto = [1000, 15000, 20000, 25000,]
const Carrito = []


// LISTA PRODUCTOS
// AGREGAR PRODUCTOS AL CARRITO
// ELIMINAR PRODUCTOS DEL CARRITO
// MOSTRAR PRODUCTOS DEL CARRITO + PRECIO FINAL

let Bienvenida = confirm("Bienvenido a nuestra tienda\nconfirme si desea entrar para ver nuestros menu")

//FUNCION PARA MOSTRAR LA LISTA DE PRODUCTOS
function mostrarListaProductos() {
    let lista = ""
    for (let i = 0; i < Productos.length; i++) {
        lista += `${i + 1}. ${Productos[i]} ${PreciosProducto[i]}$\n`
    }
    return lista
}
// FUNCION PARA MOSTRAR EL CARRITO

function mostrarCarrito() {
    let listaCarrito = "";
    let total = 0;
    if (Carrito.length === 0) {
        return "El carrito está vacío.";
    }
    for (let i = 0; i < Carrito.length; i++) {
        listaCarrito += `${i + 1}. ${Carrito[i].producto} ${Carrito[i].precio}$\n`;
        total += Carrito[i].precio;
    }
    listaCarrito += `Total: ${total}$`;
    return {listaCarrito, total};
}



// FUNCION PARA AGREGAR PRODUCTOS AL CARRITO

function agregarProductosAlCarrito() {
    let productoAAgregar = Number(prompt("¿Qué producto desea comprar?\n" + mostrarListaProductos()))

    const indexProducto = productoAAgregar - 1; // HAGO PRODUCTOAAGREGAR -1 YA QUE EL INDICE DE PRODUCTOS EMPIEZA EN 0 Y LAS OPCIONES DEL USUARIO EN 1
    if (indexProducto >= 0 && indexProducto < Productos.length) {
        Carrito.push({ producto: Productos[indexProducto], precio: PreciosProducto[indexProducto] }) // >= 0 para agregar el 0 como opcion ya que este compone el array

        alert(`${Productos[indexProducto]} agregado correctamente al carrito`)

        // le preguntamos al cliente si quiere seguir comprando
        let seguirComprando = confirm("¿desea seguir comprando?")

        if (seguirComprando) {
            agregarProductosAlCarrito();

        } else {
            opcionesDeTienda();
        }

    } else {
        alert("La opción ingresada no es correcta");
        agregarProductosAlCarrito(); // Seguimos insistiendo hasta que ponga una opcion valida
    }
}
// FUNCION PARA ELIMINAR PRODUCTOS AL CARRITO
const eliminarProductoDelCarrito = () => {
    // Comprobar si el carrito está vacío
    if (Carrito.length === 0) {
        alert("El carrito está vacío. No hay productos para eliminar.");
        return; //Si no hay productos salimos de la funcion
    }

    // Le muestro al usuario los productos en el carrio con la misma logica que mostrarListaProductos pero uso el indice[i] para ver lo productos que se ingresaron en el carrito
    let listaCarrito = mostrarCarrito()
    let productoAEliminar = Number(prompt(`¿Qué producto desea eliminar del carrito?\n${listaCarrito}`));

    // Verifico que lo seleccionado este en la lista del carrito
    const indexProducto = productoAEliminar - 1; // Con -1 corrijo el indice correspondiente al array

    // Compruebo si el indice es correcto
    if (indexProducto >= 0 && indexProducto < Carrito.length) {
        // Elimino el producto
        Carrito.splice(indexProducto, 1);
        alert("Producto eliminado del carrito.");
    } else {
        alert("Número de producto inválido. Intente de nuevo.");
    }
};

// Metodo de pago
function logicaDePago(formaDePago, descuento, total) {
    let montoFinal = total * descuento; // Calcular monto con descuento
    let confirmacion = confirm(`¿Usted está seguro de pagar con ${formaDePago}?\nEl total a pagar es ${total} $`);
    return confirmacion;
}

// Opciones de pago
function opcionesDePago(total) {
    let bandera = true

    while (bandera) {
        let opciones = Number(prompt("Seleccione una opción de pago:\n 1- Efectivo (10% de descuento)\n 2- Tarjeta\n 3- Cripto (50% extra)"));
        
        switch (opciones) {
            case 1:
                bandera = !logicaDePago("Efectivo", 0.90, total)
                break;
            case 2:
                bandera = !logicaDePago("Tarjeta", 1, total)
                break;
            case 3:
                bandera = !logicaDePago("Cripto", 1.50, total)
                break;
            default:
                alert("La opcion selecionada no es correcta")
                break;
        }
    }
}



function opcionesDeTienda() {
    let continuar = true
    while (continuar) {
        let opciones = prompt("Las opciones son las siguientes:\n 1- Ver lista de productos\n 2-Agregar producto al carrito \n 3- Eliminar producto dell carrito\n 4- Ver carrito y precio final\n 5- Pagar")

        if (opciones === null) {
            alert("Gracias por su visita. ¡Hasta luego!");
            continuar = false;
            break;
        } // Busco que opciones sea == null en caso que el cliente ponga cancelar


        opciones = Number(opciones); // transformo la opcion ingresada por el cliente en number para ejecutar el menu


        switch (opciones) {
            case 1:
                alert("Estos son nuestro productos:\n" + mostrarListaProductos())

                break;
            case 2:

                agregarProductosAlCarrito()

                break;
            case 3:
                eliminarProductoDelCarrito();

                break;
            case 4:
                let { listaCarrito, total } = mostrarCarrito();
                alert(listaCarrito)
                break;
            case 5:
                let carrito = mostrarCarrito();
                if (carrito.total > 0) {
                    opcionesDePago(carrito.total);
                    alert("Gracias por su compra!");
                } else {
                    alert("El carrito está vacío, no hay nada para pagar.");
                }
                continuar = false; // Salgo del bucle una vez realizado el pago
                break;

            default:
                break;


        }
        // Pregunto al usuario si queire realizar otra operacion
        let realizarOtraOperacion = confirm("Quiere realizar otra operacion?")
        if (!realizarOtraOperacion) {
            continuar = false;
            alert("Gracias por su visita. ¡Hasta luego!");
            window.close();
        }
    }
}





//BIENVENIDA + CONFIRMACION DE ENTRADA PARA EL USUARIO
if (Bienvenida) {
    opcionesDeTienda()
} else {
    alert("Esta bien, gracias por su visita.")
    window.close();
}




