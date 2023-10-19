//Información para iniciar sesión como ADMINISTRADOR
alert("USUARIO: admin PASSWORD: admin ");
        
var catalogoAutos = [];
var autenticacion = false;

//esta función se encarga de cargar los datos de local storage previamente cargados es el arreglo "catalogoAutos" para mostrarlos en la tabla una vez que se llame la función mostrarLista.
function cargarDatosDesdeLocalStorage() {
    var autosGuardados = localStorage.getItem('catalogoAutos');
    if (autosGuardados) {
        catalogoAutos = JSON.parse(autosGuardados);
        mostrarLista();
    }
}
//convertir  datos de arreglo en una cadena JSON
function guardarDatosEnLocalStorage() {
    localStorage.setItem('catalogoAutos', JSON.stringify(catalogoAutos));
}
//bloque de autenticación
function login() {
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;

    if (usuario === "admin" && password === "admin") {
        autenticacion = true;
  
    // Mostrar la menu de administrador y tabla de autos solo después de la autenticación, oculta formulario de inicio de sesióm
        document.getElementById("loginContenedor").style.display = "none";
        document.getElementById("bienvenidaUsuario").style.display = "block";
        document.getElementById("usuarioRegistrado").textContent = usuario;
        document.getElementById("contenedorCrud").style.display = "block";
        document.getElementById("contenedorAutos").style.display = "block";
        mostrarLista();
    } else {
        alert("Credenciales incorrectas");
    }

    cargarDatosDesdeLocalStorage();
}

//Función que crea nuevos elementos en el arreglo. CRUD (CREATE)
function agregarAuto() {
    var marcaAuto = document.getElementById("marcaAuto").value;
    var modeloAuto = document.getElementById("modeloAuto").value;
    var anioAuto = document.getElementById("anioAuto").value;

    if (marcaAuto && modeloAuto && anioAuto) {
        var nuevoAuto = { marca: marcaAuto, modelo: modeloAuto, anio: anioAuto };
        catalogoAutos.push(nuevoAuto);
        mostrarLista();
    } else {
        alert("Completa todos los campos del formulario");
    }

    guardarDatosEnLocalStorage();
}

//Función que lee elementos en el arreglo. CRUD (READ) y agrega elementos a tabla en el DOM
function mostrarLista() {
    var tbody = document.querySelector("#tablaCatalogoAutos tbody");
    tbody.innerHTML = "";

    catalogoAutos.forEach(function (carro, index) {
        var fila = tbody.insertRow();
        var celdaMarca = fila.insertCell(0);
        var celdaModelo = fila.insertCell(1);
        var celdaAnio = fila.insertCell(2);
        var celdaEditar = fila.insertCell(3);
        var celdaEliminar = fila.insertCell(4);

        celdaMarca.innerText = carro.marca;
        celdaModelo.innerText = carro.modelo;
        celdaAnio.innerText = carro.anio;

        // Asignamos funcionalidad a los botones editar y eliminar llamando a su función correspondiente
        var botonEditar = document.createElement("button");
        botonEditar.innerText = "Editar";
        botonEditar.onclick = function () { editarAuto(index); };
        celdaEditar.appendChild(botonEditar);

        var botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.onclick = function () { borrarAuto(index); };
        celdaEliminar.appendChild(botonEliminar);
    });
}
//Función que edita nuevos elementos en el arreglo. CRUD (UPDATE)
function editarAuto(index) {
    var carro = catalogoAutos[index];
    var actualizarMarca = prompt("Editar Marca:", carro.marca);
    var actualizarModelo = prompt("Editar Modelo:", carro.modelo);
    var actualizarAnio = prompt("Editar Año:", carro.anio);

    var autoActualizado = {
        marca: actualizarMarca || carro.marca,
        modelo: actualizarModelo || carro.modelo,
        anio: actualizarAnio || carro.anio
    };

    catalogoAutos.splice(index, 1, autoActualizado);

    mostrarLista();
    guardarDatosEnLocalStorage();
}
//Función que crea elimina elementos en el arreglo. CRUD (DELETE)
function borrarAuto(index) {
    var confirmDelete = confirm("¿Estás seguro de que deseas eliminar este auto?");

    if (confirmDelete) {
        catalogoAutos.splice(index, 1);
        mostrarLista();
        guardarDatosEnLocalStorage();
    }
}

cargarDatosDesdeLocalStorage();
