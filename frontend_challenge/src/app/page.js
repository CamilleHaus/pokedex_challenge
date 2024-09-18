import LoadPokemon from "../../components/LoadPokemon";

export default async function Home() {

  return (
    <div className="max-w-[1200px] w-[95%] mx-auto">
      <ul key={Math.random()}>
        <LoadPokemon />
      </ul>
    </div>
  );
}
