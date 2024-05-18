document.addEventListener("DOMContentLoaded", function() {
    // Eventos que ejecutan la función cambio() tanto al cargar la página (load) como en cambios en la página (hashchange)
    window.addEventListener('load', function() {
        cambio();
    });

    window.addEventListener('hashchange', function() {
        cambio();
    });

    // Función que permite el cambio dinámico
    function cambio() {
        var pageId = window.location.hash.replace('#', '') + 'Page';
        var pages = document.querySelectorAll('#content div');
        var found = false;

        if (pageId === 'Page') {
            for (var i = 0; i < pages.length; i++) {
                pages[i].classList.add('hidden');
            }
            pages[0].classList.remove('hidden');
            return;
        }

        for (var i = 0; i < pages.length; i++) {
            if (pages[i].id === pageId) {
                pages[i].classList.remove('hidden');
                found = true;
            } else {
                pages[i].classList.add('hidden');
            }
        }

        if (!found) {
            var notFoundPage = document.getElementById('notFoundPage');
            if (notFoundPage) {
                notFoundPage.classList.remove('hidden');
            }
        }
    }

    // Buscar el elemento del botón de búsqueda y la información del Pokémon
    const searchButton = document.getElementById('searchButton');
    const pokemonInfoPage = document.getElementById('pokemonInfoPage');

    searchButton.addEventListener('click', () => {
        const pokemonName = document.getElementById('pokemonName').value.trim();
        
        if (isEmpty(pokemonName)) {
            alert("Por favor ingrese el nombre de un Pokémon.");
            return;
        }

        fetchPokemonData(pokemonName);
    });

    function fetchPokemonData(pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de red no fue correcta');
                }
                return response.json();
            })
            .then(data => {
                displayPokemonInfo(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert('Hubo un problema al obtener la información del Pokémon. Por favor, inténtalo de nuevo más tarde.');
            });
    }

    function displayPokemonInfo(pokemonData) {
        pokemonInfoPage.innerHTML = `
            <h2>Pokémon</h2>
            <img src="${pokemonData.sprites.front_default}" alt="Imagen de ${pokemonData.name}">
            <p><strong>Nombre:</strong> ${pokemonData.name}</p> 
            <p><strong>Altura:</strong> ${pokemonData.height}</p>
            <p><strong>Peso:</strong> ${pokemonData.weight}</p>
           
           
        `;
        window.location.hash = 'pokemonInfo';
    }

    function isEmpty(str) {
        return !str.trim();
    }
});



