alert ("USUARIO: admin PASSWORD: admin ");

var catalogoAutos = [];
var autenticacion = false;


function cargarDatosDesdeLocalStorage() {
    var autosGuardados = localStorage.getItem('catalogoAutos');
    if (autosGuardados) {
        catalogoAutos = JSON.parse(autosGuardados);
        mostrarLista();
    }
}
//Con esta función alamcenamos los elementos del arreglo en el LocalStorage
function guardarDatosEnLocalStorage() {
    localStorage.setItem('catalogoAutos', JSON.stringify(catalogoAutos));
}
//auqnue no es seguro guardar datos de autentificación del lado del cliente, realizamos autentificación para mostrar panel de CURD.
function login() {
    var usuario = document.getElementById("usuario").value;
    var password = document.getElementById("password").value;

    if (usuario === "admin" && password === "admin") {
        autenticacion = true;

        document.getElementById("loginContenedor").style.display = "none";
        document.getElementById("bienvenidaUsuario").style.display = "block";
        document.getElementById("usuarioRegistrado").textContent = usuario;

//si autenticacion se cumple, agregamos valores al arreglo.
        catalogoAutos = [
            { marca: "Toyota", modelo: "Camry", anio: "2022" },
            { marca: "Honda", modelo: "Civic", anio: "2021" },
        ];
//si el if se cumple mostramos contenedor oculto y llamamos la funcion que imprime los datos de LocalStorage
        document.getElementById("contenedorCrud").style.display = "block";
        mostrarLista();
    } else {
        alert("Credenciales incorrectas");
    }

    cargarDatosDesdeLocalStorage();
}
//En este bloque aplicamos la C de la app CRUD
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
//llamamos la funcion si todos los campos están completados
    guardarDatosEnLocalStorage();
}
//En este bloque aplicamos la R de CRUD
function mostrarLista() {
    var contenedorAutos = document.getElementById("catalogoAutos");
    contenedorAutos.innerHTML = "";

    catalogoAutos.forEach(function (carro, index) {
        var carroLista = document.createElement("li");
        carroLista.innerText = `${carro.marca} ${carro.modelo} (${carro.anio})`;

        var botonEditar = document.createElement("button");
        botonEditar.innerText = "Editar";
        botonEditar.onclick = function () { editarAuto(index); };

        var botonEliminar = document.createElement("button");
        botonEliminar.innerText = "Eliminar";
        botonEliminar.onclick = function () { borrarAuto(index); };

        carroLista.appendChild(botonEditar);
        carroLista.appendChild(botonEliminar);

        contenedorAutos.appendChild(carroLista);
    });

    guardarDatosEnLocalStorage();
}
//En este bloque aplicamos U de CRUD para actualizar elementos
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

//En este bloque aplicamos D de CRUD para borrar elementos. 
function borrarAuto(index) {
    var confirmDelete = confirm("¿Estás seguro de que deseas eliminar este auto?");

    if (confirmDelete) {
        catalogoAutos.splice(index, 1);
        mostrarLista();
        
        guardarDatosEnLocalStorage();
    }
}

        cargarDatosDesdeLocalStorage()

