const contenedorCarrito = document.querySelector('#lista-carrito');
const listaCursos = document.getElementById('lista-cursos');
const carrito = document.querySelector('#carrito');

const btnVaciarCarrito = document.getElementById('vaciar-carrito');

var articulosCarrito = [];



cargarEvenetListeners()

function cargarEvenetListeners() {
    
    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click', eliminarCurso)
    btnVaciarCarrito.addEventListener('click', vaciarCarrito)

    document.addEventListener('DOMContentLoaded', () => {


        articulosCarrito = JSON.parse(localStorage.getItem('cursos')) || []; 
        carritoHTML();

    })

}

function vaciarCarrito(e){

    articulosCarrito = [];
    limpiarHTML()

}


function agregarCurso(e){
    e.preventDefault();

    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement
        
        leerDatosCurso(cursoSeleccionado)
    }
}


function eliminarCurso(e){
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {

        const cursoId = e.target.parentElement.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        
        carritoHTML();
        ;
    }

}



function leerDatosCurso(curso) {
    
    const infoCurso = {

        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        instructor: curso.querySelector('.instructor').textContent,
        precio: curso.querySelector('.precio-neto').textContent,
        id: curso.querySelector('a').getAttribute('data-id')

    }

    articulosCarrito = [...articulosCarrito, infoCurso]

    carritoHTML();
}

function carritoHTML() {
    limpiarHTML();

    articulosCarrito.forEach( curso => {

        const {imagen, titulo, instructor, id, precio} = curso

        const div = document.createElement('div');
        const hr = document.createElement('hr');
        div.className = 'carrito-lista';
        hr.className = 'hr';

        div.innerHTML = `

            <div class="carrito-lista">
                <img class="img-carrito" src="${imagen}" alt="curso ${titulo}">

                <div>
                    <h4 class="quitar-margen min-size">${titulo}</h4>
                    <p class="quitar-margen min-size">${instructor}</p>
                    <div class="precios flex-row">
                        <span class="u-pull-right min-size mr-1 font-weight-600">${precio}</span>
                        <a href="#" class="borrar-curso" data-id="${id}" title="borrar curso"> <i class="borrar-curso fa-solid fa-trash"></i></a>
                    </div> 

                </div>
            </div>
        `;

        contenedorCarrito.appendChild(div);
        contenedorCarrito.appendChild(hr);
    })

    agregarLocalStorage()

}

function agregarLocalStorage() {
    localStorage.setItem('cursos', JSON.stringify(articulosCarrito));
}

function limpiarHTML() {
    
    while (contenedorCarrito.firstChild) {
        
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);  
    }

}


