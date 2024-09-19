import LoadPokemon from "../../components/LoadPokemon";

export default async function Home() {

  return (
    <div className="max-w-[1200px] w-[85%] mx-auto mt-2">
      <ul key={Math.random()}>
        <LoadPokemon />
      </ul>
    </div>
  );
}
