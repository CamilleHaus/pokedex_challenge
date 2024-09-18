"use server";

export async function getPokemon({ query, page = 1 }) {
  const limit = 24; // Definindo o limite fixo para 24 Pokémon por página
  const offset = (page - 1) * limit;
  const apiURL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

  try {
    const response = await fetch(apiURL);
    const data = await response.json();

    if (query) {
      // Filtra os Pokémon que começam com a query e limita a 24 resultados
      return data.results.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(query.toLowerCase())
      );
    } else {
      return data.results;
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
