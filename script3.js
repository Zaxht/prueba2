let datosUsuarios = [];
    let editIndex = -1;

    function validar() {
        const telefono = document.getElementById("telefono").value.trim();
        const password = document.getElementById("password").value.trim();
        const errorTelefono = document.getElementById("errorTelefono");
        const errorPassword = document.getElementById("errorPassword");

        errorTelefono.textContent = "";
        errorPassword.textContent = "";

        let valido = true;

        if (!/^\d{8}$/.test(telefono)) {
            errorTelefono.textContent = "Ingrese un teléfono válido de 8 dígitos.";
            valido = false;
        }

        if (password.length < 5) {
            errorPassword.textContent = "La contraseña debe tener al menos 5 caracteres.";
            valido = false;
        }

        if (valido) {
            if (editIndex >= 0) {
                datosUsuarios[editIndex] = { telefono, password };
                editIndex = -1;
            } else {
                datosUsuarios.push({ telefono, password });
            }

            document.getElementById("miFormulario").reset();
            mostrarTabla();
        }
    }

    function mostrarTabla() {
        const cuerpoTabla = document.getElementById("cuerpoTabla");
        cuerpoTabla.innerHTML = "";

        datosUsuarios.forEach((item, index) => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${item.telefono}</td>
                <td>${item.password}</td>
                <td>
                    <button onclick="editar(${index})">Editar</button>
                    <button onclick="eliminar(${index})">Eliminar</button>
                </td>
            `;

            cuerpoTabla.appendChild(fila);
        });
    }

    function eliminar(index) {
        const confirmar = confirm("¿Estás seguro de que deseas eliminar este registro?");
        if (confirmar) {
            datosUsuarios.splice(index, 1);
            mostrarTabla();
        }
    }

    function editar(index) {
        const datos = datosUsuarios[index];
        document.getElementById("telefono").value = datos.telefono;
        document.getElementById("password").value = datos.password;
        editIndex = index;
    }