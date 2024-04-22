document.addEventListener("DOMContentLoaded", function () {
    fetchPersonas();
    const inputBusqueda = document.getElementById('busqueda');

    inputBusqueda.addEventListener('keypress', function (event) {
        // if (event.key === 'Enter') {
        buscarPersona();
        // }
    });
});

function fetchPersonas() {
    fetch('/personas')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('personas');
            container.innerHTML = '';
            data.forEach(persona => {
                const div = document.createElement('div');
                div.className = 'persona';
                div.innerHTML = `Nombre: ${persona.nombre} <br> Email: ${persona.email} <br> Teléfono: ${persona.telefono}
                <br>
                <button onclick="eliminarPersona(${persona.id})">Eliminar</button>
                <button onclick="mostrarFormularioActualizar(${persona.id}, '${persona.nombre}', '${persona.email}', '${persona.telefono}')">Actualizar</button>    
                <button onclick="formaciones(${persona.id},'${persona.nombre}')">Formaciones</button>
                <button onclick="experiencias(${persona.id})">Experiencias</button>
                <button onclick="habilidades(${persona.id})">Habiliidades</button>`

                container.appendChild(div);
            });
        });
}

function agregarPersona() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    fetch('/personas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, telefono }),
    })
        .then(response => {
            if (response.ok) {
                fetchPersonas(); // Recargar la lista de personas
                // Limpiar el formulario
                document.getElementById('nombre').value = '';
                document.getElementById('email').value = '';
                document.getElementById('telefono').value = '';
            }
        })
        .catch(error => console.error('Error:', error));
}

function eliminarPersona(id) {
    fetch(`/persona/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                fetchPersonas(); // Recargar la lista de personas
            }
        })
        .catch(error => console.error('Error:', error));
}

function mostrarFormularioActualizar(id, nombre, email, telefono) {
    // Rellenar el formulario de actualización con los datos de la persona seleccionada
    document.getElementById('nombre').value = nombre;
    document.getElementById('email').value = email;
    document.getElementById('telefono').value = telefono;

    // Cambiar el texto del botón a "Actualizar"
    document.getElementById('submitBtn').innerText = 'Actualizar';

    // Cambiar la acción del botón para que llame a la función actualizarPersona() con el ID de la persona
    document.getElementById('submitBtn').setAttribute('onclick', `actualizarPersona(${id})`);
}

function actualizarPersona(id) {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    fetch(`/persona/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, telefono }),
    })
        .then(response => {
            if (response.ok) {
                fetchPersonas(); // Recargar la lista de personas
                // Limpiar el formulario
                document.getElementById('nombre').value = '';
                document.getElementById('email').value = '';
                document.getElementById('telefono').value = '';
                // Restaurar el texto del botón a "Agregar Persona"
                document.getElementById('submitBtn').innerText = 'Agregar Persona';
                // Restaurar la acción del botón para que llame a la función agregarPersona()
                document.getElementById('submitBtn').setAttribute('onclick', 'agregarPersona()');
            }
        })
        .catch(error => console.error('Error:', error));
}


function buscarPersona() {
    const buscar = document.getElementById('busqueda').value;
    if (buscar == '') { fetchPersonas(); }
    else {
        fetch(`/personapornombre/${buscar}`)
            .then(response => response.json())
            .then(data => {
                const container = document.getElementById('personas');
                container.innerHTML = '';
                data.forEach(persona => {
                    const div = document.createElement('div');
                    div.className = 'persona';
                    div.innerHTML = `Nombre: ${data.nombre} <br> Email: ${persona.email} <br> Teléfono: ${persona.telefono}
                <br>
                <button onclick="eliminarPersona(${persona.id})">Eliminar</button>
                <button onclick="mostrarFormularioActualizar(${persona.id}, '${persona.nombre}', '${persona.email}', '${persona.telefono}')">Actualizar</button>`;
                    container.appendChild(div);
                });
            });
    }
}

function formaciones(id, nombre) {
    fetch(`/formaciones/${id}`)
        .then(response => response.json())
        .then(data => {
            const containerPersona = document.getElementById('personas');
            const containerFormacion = document.getElementById('formaciones');
            containerPersona.innerHTML = '';
            containerPersona.innerHTML = nombre;


            // const table = document.createElement('table');
            // table.className = 'formacion';
            // const th = document.createElement('th');
            // const tdh1 = document.createElement('td');
            // tdh1.innerHTML = 'Titulo';
            // const tdh2 = document.createElement('td');
            // tdh2.innerHTML = 'Institución';
            // const tdh3 = document.createElement('td');
            // tdh3.innerHTML = 'Inicio';
            // const tdh4 = document.createElement('td');
            // tdh4.innerHTML = 'Fin';
            // th.appendChild(tdh1);
            // th.appendChild(tdh2);
            // th.appendChild(tdh3);
            // th.appendChild(tdh4);
            // table.appendChild(th);


            data.forEach(formacion => {

                //     const tr = document.createElement('tr');
                //     const td1 = document.createElement('td');
                //     tdh1.innerHTML = formacion.titulo;
                //     const td2 = document.createElement('td');
                //     tdh2.innerHTML = formacion.Institución;
                //     const td3 = document.createElement('td');
                //     tdh3.innerHTML = formacion.desde;
                //     const td4 = document.createElement('td');
                //     tdh4.innerHTML = formacion.hasta;
                //     tr.appendChild(td1);
                //     tr.appendChild(td2);
                //     tr.appendChild(td3);
                //     tr.appendChild(td4);
                //     table.appendChild(tr);
                const divContainer = document.createElement('div');
                divContainer.className = 'tabla';
                const divHead = document.createElement('div');

                divHead.innerHTML = `<p>Titulo</p>
                    <p>Institución</p>
                    <p>Inicio</p>
                    <p>Fin</p>`
                divHead.className = 'flexible';


                divContainer.appendChild(divHead);
                const divInfo = document.createElement('div');
                divInfo.className = 'flexible';


                divInfo.innerHTML = `<p>${formacion.titulo}</p>
            <p>${formacion.institucion}</p>
            <p>${formacion.desde}</p>
            <p>${formacion.hasta}</p>`
                divContainer.appendChild(divInfo);
            containerFormacion.appendChild(divContainer);

            });

        });
}