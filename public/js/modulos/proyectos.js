import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if (btnEliminar) {
  btnEliminar.addEventListener("click", e => {

    const urlProyecto = e.target.dataset.proyectoUrl;

    // console.log(urlProyecto);
    
    Swal.fire({
      title: "Deseas eliminar este proyecto?",
      text: "No se puede revertir esta acción",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, borrar",
      cancelButtonText: "No, Cancelar"
    }).then(result => {
      if (result.value) {
        // Enviar peticion con axios
        const url = `${location.origin}/proyectos/${urlProyecto}`;

        axios.delete(url,{params: {urlProyecto} })
            .then(respuesta => {
                console.log(respuesta);

                return;

                Swal.fire(
                    "Proyecto Eliminado!",
                    respuesta.data,
                    "success"
                  );
          
                  setTimeout(() => {
                    window.location.href = "/";
                  }, 3000);
            })
            .catch(() => {
                Swal.fire({
                    type: 'error',
                    title: 'Hubo un error',
                    text: 'No se pudo eliminar el Proyecto'
                })
            })
      }
    });
  });
}

export default btnEliminar;
