"use client";

import { useEffect, useState } from "react";
import PokemonCard, { formatPokemonNumber } from "./PokemonCard";
import Type from "./Type";
import { Button, Modal, Select, Pagination, Table } from "antd";
import Image from "next/image";
formatPokemonNumber;

const pokemonTypes = [
  { value: "", label: "Todos os tipos" },
  { value: "fire", label: "Fire" },
  { value: "grass", label: "Grass" },
  { value: "water", label: "Water" },
  { value: "electric", label: "Electric" },
  { value: "poison", label: "Poison" },
  { value: "flying", label: "Flying" },
  { value: "ice", label: "Ice" },
  { value: "fighting", label: "Fighting" },
  { value: "ground", label: "Ground" },
  { value: "psychic", label: "Psychic" },
  { value: "bug", label: "Bug" },
  { value: "rock", label: "Rock" },
  { value: "ghost", label: "Ghost" },
  { value: "dragon", label: "Dragon" },
  { value: "dark", label: "Dark" },
  { value: "steel", label: "Steel" },
  { value: "fairy", label: "Fairy" },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a className="uppercase">{text}</a>,
  },
  {
    title: "Number",
    dataIndex: "number",
    key: "number",
    render: (number) => formatPokemonNumber(number), // Formata o número dos Pokémons
  },
  {
    title: "Types",
    dataIndex: "types",
    key: "types",
    width: 450,
    render: (types) => (
      <div className="flex gap-3">
        {types.map((type) => (
          <Type key={type} typeName={type} />
        ))}
      </div>
    ),
  },
];

const LoadPokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("table");
  const pageSize = 24;

  useEffect(() => {
    const getPokemonData = async () => {
      const limit = 1000;
      try {
        setLoading(true);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados");
        }

        const data = await response.json();
        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const pokeDetails = await fetch(poke.url);
            const details = await pokeDetails.json();
            return {
              ...poke,
              types: details.types.map((typeInfo) => typeInfo.type.name),
              key: poke.name, // Adiciona uma chave única
              number: details.id,
              tags: [], // Adicione tags conforme necessário
            };
          })
        );
        setPokemon(detailedPokemon);
        setFilteredPokemon(detailedPokemon); // Inicializar a lista filtrada com todos os Pokémon
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPokemonData();
  }, []);

  const applyFilters = () => {
    const newFilteredPokemon = pokemon.filter((poke) => {
      const matchesType = selectedType
        ? poke.types.includes(selectedType)
        : true;
      return matchesType;
    });
    setFilteredPokemon(newFilteredPokemon);
    setPage(1); // Resetar para a primeira página após aplicar os filtros
  };

  const startIndex = (page - 1) * pageSize;
  const currentPokemon = filteredPokemon.slice(
    startIndex,
    startIndex + pageSize
  );

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    applyFilters();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onTypeChange = (value) => {
    setSelectedType(value);
  };

  return (
    <>
      <div className="flex justify-center w-full mb-5">
        <div className="py-3 w-full flex justify-between items-center">
          <div className="flex justify-center">
            <Button className="mr-4 py-5" onClick={() => setViewMode("card")}>
              Exibir como Cards
            </Button>
            <Button onClick={() => setViewMode("table")} className="mr-4 py-5">
              Exibir como Tabela
            </Button>
          </div>
          <Button className="py-5 text-lg" onClick={showModal}>
            Filtrar
            <Image
              src="/pokeball.svg"
              width={50}
              height={50}
              alt="pokeball image"
            />
          </Button>
        </div>
        <Modal
          title="Selecione o tipo de Pokémon"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          className="custom-modal"
          footer={[
            <Button key="Cancelar" onClick={handleCancel}>
              Cancelar
            </Button>,
            <Button
              key="Filtrar"
              type="primary"
              loading={loading}
              onClick={handleOk}
            >
              Filtrar
            </Button>,
          ]}
        >
          <Select
            showSearch
            placeholder="Selecione um tipo"
            optionFilterProp="label"
            onChange={onTypeChange}
            options={pokemonTypes}
            value={selectedType}
          />
        </Modal>
      </div>

      {viewMode === "card" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {currentPokemon.map((poke) => (
            <PokemonCard key={poke.name} pokemon={poke} />
          ))}
        </div>
      ) : (
        <Table
          columns={columns}
          dataSource={currentPokemon}
          pagination={false} // Desativa a paginação interna da tabela
        />
      )}

      <div className="w-full flex items-center justify-center m-5">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filteredPokemon.length} // Define o total para a lista filtrada
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default LoadPokemon;

