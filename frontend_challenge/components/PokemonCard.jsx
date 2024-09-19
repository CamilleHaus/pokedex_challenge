import Type from "./Type";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, Col, Spin } from "antd";
import { formatPokemonNumber } from "../utils/formatPokemonNumber";
import { formatMeasurement } from "../utils/formatMeasurement";

const PokemonCard = ({ pokemon }) => {
  const [data, setData] = useState(null);

  const pokemonImageUrl =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

  const getPokemonNumberFromUrl = (url) => {
    const matches = url.match(/\/(\d+)\/$/);
    return matches ? matches[1] : null;
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemon.url);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon data");
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPokemonData();
  }, [pokemon.url]);

  if (!data) {
    return <Spin />;
  }

  const pokemonNumber = getPokemonNumberFromUrl(pokemon.url);

  return (
    <Col className="mb-4">
      <Card className="bg-zinc-100 h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full border border-b rounded-md flex flex-col items-center flex-1">
            <div className="w-full flex justify-center items-center bg-zinc-50">
              <Image
                src={`${pokemonImageUrl}${pokemonNumber}.png`}
                width={220}
                height={150}
                alt="Pokemon Image"
              />
            </div>
            <div className="flex flex-col items-center justify-center bg-white w-full">
              <p className="py-2 uppercase font-bold bg-gray-800 text-primary w-full text-center">
                {pokemon.name}
              </p>
              <div className="text-primary flex flex-col gap-2 w-full px-4">
                <div className="flex flex-col">
                  <div className="flex justify-between py-2 text-lg">
                    <h3 className="font-bold text-black">Abilities</h3>
                    <p className="text-zinc-800">
                      {formatPokemonNumber(pokemonNumber)}
                    </p>
                  </div>
                  <div className="flex gap-3 pb-2 flex-wrap">
                    {data.abilities &&
                      data.abilities.map((ability, index) => (
                        <span
                          className="text-black bg-zinc-50 rounded-md py-2 px-3 capitalize"
                          key={index}
                        >
                          {ability.ability.name}
                        </span>
                      ))}
                  </div>
                </div>
                <div className="flex text-black justify-between w-full gap-3 lg:items-center">
                  <p className="py-2 rounded-md border border-zinc-200 flex-1 text-center">
                    Height: {data.height && formatMeasurement(data.height / 10)}
                    m
                  </p>
                  <p className="py-2 rounded-md border border-zinc-200 flex-1 text-center">
                    Weight: {data.weight && formatMeasurement(data.weight / 10)}
                    kg
                  </p>
                </div>
              </div>

              <div className="flex gap-4 m-4 w-full px-4">
                {pokemon &&
                  pokemon.types &&
                  pokemon.types.map((type, index) => (
                    <Type key={index} typeName={type} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default PokemonCard;
