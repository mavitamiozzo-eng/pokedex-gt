// API onde buscamos os dados
const API_URL = 'https://pokeapi.co/api/v2'

// a requisição será feita aqui
// parâmetro url - a principal url da requisição
// ASYNC - uma requisição assíncrona (chamada sem um limite de tempo, e serão feitas)
async function request(url) {
  // capturar a resposta
  // AWAIT - aguardar a resposta (independente do tempo)
  // FETCH - faz a requisição
  /*
    GET - Busca
    POST - Envio
    PATCH/ UPDATE - Alteração
    PUT - Inserção / Alteração 
    DELETE - Exclusão
  */
  const response = await fetch(url);
  // Toda requisição tem uma resposta e um status

  // Se der problema na requisição
  if (!response.ok) {
    // Retorna um novo erro
    throw new Error(`Erro HTTP: ${response.status}`);
  }

  // em caso de sucesso, retorna os dados (em json)
  // function: tem um objetivo e todo objetivo precisa de um return
  return response.json();
}

export function getPokemons(limit = 20, offset = 0) {
  // listar todos os pokemon, mas paginados
  // limit - quantos pokemons
  // offset - quantos pokemons limite por página
  return request(
    `${API_URL}/pokemon?limit=${limit}&offset=${offset}`
  );
}

export function getPokemon(nameOrId) {
  return []
}

export function getTypes() {
  return request(`${API_URL}/type`);
}

export function getPokemonByType(type) {
  return request(`${API_URL}/type/${type}`);
}

// função que recebe uma lista de pokemons
// e deve retornar os dados de cada um
// usando a mesma função 
// recursividade
export async function getPokemonDetails(pokemons) {
  // map - percorre o arry / lista
  const requests = pokemons.map(pokemon => 
    // request - faz a requisição para cada pokemon
    // por url
    request(pokemon.url)
  );

  // retorna os dados de cada pokemon
  // aguardando que TODAS AS PROMISES (requisições)
  // sejam resolvidas / cumpridas
  return Promise.all(requests);
}

export async function searchByNameAndType(name, type) {
  if(type) {
    // reaproveitar a busca por tipo
    const data = await getPokemonByType(type)
    let pokemons = data.pokemon.map(item => item.pokemon)

    if(name) {
      // filtrando resultados pelo nome (parcial ou total)
      pokemons = pokemons.filter(pokemon => 
        // comparamos se o nome na lista inclui o nome procurado
        pokemon.name.toLowerCase()
        .includes(name.toLowerCase())
      )
    }
    // reaproveitamos a função que busca os detalhes
    return getPokemonDetails(pokemons)
  }

  const data = await request(`${API_URL}/pokemon?limit=2000`)
  // valores retornados pela riquisição
  let pokemons = data.results

  if(name) {
    pokemons = pokemons.filter(pokemon => 
      pokemon.name.toLowerCase()
      .includes(name.toLowerCase())
    )
  }

  return getPokemonDetails(pokemons)
}
