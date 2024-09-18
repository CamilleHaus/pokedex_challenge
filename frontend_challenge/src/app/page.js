import { fetchPokemon, getPokemon } from "./actions/getPokemon";
import LoadPokemon from "../../components/LoadPokemon";
import Search from "../../components/Search";

export default async function Home({ searchParams }) {
  const search =
    typeof searchParams.search === "string" ? searchParams.search : "";

  const initialPokemon = await getPokemon({ page: 1, search });

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto">
       <Search search={search} />
      <LoadPokemon search={search} initialPokemon={initialPokemon} />
    </div>
  );
}
