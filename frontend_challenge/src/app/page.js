import { fetchPokemon } from "./actions/getPokemon";
import LoadPokemon from "../../components/LoadPokemon";
import Search from "../../components/Search";

export default async function Home({searchParams}) {

  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;

  const pokemon = await fetchPokemon({ page: 1, search });

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto">
      <Search search={search}/>
      <ul key={Math.random()}>
        <LoadPokemon search={search} initialPokemon={pokemon}/>
      </ul>
    </div>
  );
}
