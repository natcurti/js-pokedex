const pokemonsList = document.getElementById('pokemonsList');
const btnLoad = document.getElementById('btnLoad');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon){
    return `
        <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="details">
            <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
            </ol>
        
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
        </li>`
}

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonsList.innerHTML += newHtml;
    
        //Usando o metódo map:
        // const newList = pokemons.map((pokemon) => {
        //     return convertPokemonToLi(pokemon);
        // })
    
        // const newHtml = newList.join('');
        // pokemonsList.innerHTML = pokemonsList.innerHTML + newHtml;
    
    
    
        //Primeiro usamos com o loop for:
        // const listItens = [];
        // for (let i = 0; i < pokemons.length; i++) {
        //     const pokemon = pokemons[i];
        //     listItens.push(convertPokemonToLi(pokemon));
        //     }
    })
    
}

loadPokemonItens(offset, limit)

btnLoad.addEventListener('click', () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        btnLoad.parentElement.removeChild(btnLoad);
    } else {
        loadPokemonItens(offset, limit);
    }
})
   