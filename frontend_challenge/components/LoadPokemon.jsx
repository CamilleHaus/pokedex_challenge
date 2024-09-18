"use client";

import { getPokemon } from "@/app/actions/getPokemon";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import PokemonCard from "./PokemonCard";

const LoadPokemon = ({ search, initialPokemon }) => {
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const loadPokemon = async (page) => {
    setLoading(true);
    const newPokemon = await getPokemon({ query: search, page });
    setPokemon(newPokemon);
    setLoading(false);
    setTotal(500); // Defina o total real de Pokémon se necessário
  };

  useEffect(() => {
    loadPokemon(page);
  }, [page, search]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {pokemon.map((poke) => (
          <PokemonCard key={poke.url} pokemon={poke} />
        ))}
      </div>
      <div className="flex justify-center items-center p-4">
        <Pagination
          current={page}
          total={total}
          pageSize={24}
          onChange={handlePageChange}
          showSizeChanger={false} // Remove a opção de alterar o tamanho da página
        />
      </div>
    </>
  );
};

export default LoadPokemon;