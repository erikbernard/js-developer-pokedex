function onReady(callback) {
    var intervalID = window.setInterval(checkReady, 3900);

    function checkReady() {
        if (document.getElementsByTagName('body')[0] !== undefined) {
            window.clearInterval(intervalID);
            callback.call(this);
        }
    }
}

function show(id, value) {
    document.getElementById(id).style.display = value ? 'block' : 'none';
}

onReady(function () {
    show('page', true);
    show('loading', false);
    show('text-loading', false);
});

const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
    <li class="pokemon ${pokemon.mainType}" 
    onclick="customAlert.alert(${pokemon.number})">
       <span class="number">#${pokemon.number}</span>
       <span class="name">${pokemon.name}</span>
  
       <div class="detail">
          <ol class="types">
             ${pokemon.types
            .map((type) => `<li class="type ${type}">${type}</li>`)
            .join('')}
          </ol>
  
          <img src="${pokemon.photo}" alt="${pokemon.name}">
       </div>
    </li>
    </a>
  `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNexPage = offset + limit;

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});
