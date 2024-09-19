"use client";

import Type from "./Type";
import Image from "next/image";
import PokemonCard from "./PokemonCard";
import { useEffect, useState } from "react";
import { pokemonTypes } from "../data/pokemonTypes";
import { Button, Modal, Select, Pagination, Table, Alert } from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a className="uppercase">{text}</a>,
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
      setLoading(true);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
        );
        const data = await response.json();

        const detailedPokemon = await Promise.all(
          data.results.map(async (poke) => {
            const details = await (await fetch(poke.url)).json();
            return {
              ...poke,
              types: details.types.map((typeInfo) => typeInfo.type.name),
            };
          })
        );

        setPokemon(detailedPokemon);
        setFilteredPokemon(detailedPokemon);
      } catch (error) {
        console.log("Erro ao buscar os dados:", error);
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
    setPage(1);
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
      <Alert
        message="Como usar a Pokedéx?"
        description={
          <span>
            Para buscar por um tipo específico dos Pokémons, use o botão{" "}
            <span className="font-bold">Filtrar</span>
          </span>
        }
        type="info"
        closable
        showIcon
      />
      <div className="flex justify-center w-full mb-5">
        <div className="py-3 w-full flex justify-between items-center max-sm:flex-col gap-4 max-sm:items-end">
          <div className="flex justify-center max-sm:gap-4 max-sm:w-full">
            <Button
              className="mr-4 max-sm:m-0 py-5 max-sm:flex-1"
              onClick={() => setViewMode("card")}
            >
              Exibir como Cards
            </Button>
            <Button
              onClick={() => setViewMode("table")}
              className="mr-4 py-5 max-sm:m-0 max-sm:flex-1"
            >
              Exibir como Tabela
            </Button>
          </div>
          <Button className="py-5 text-lg max-sm:pl-8" onClick={showModal}>
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
          pagination={false}
          loading={loading}
        />
      )}

      <div className="w-full flex items-center justify-center m-5 max-sm:mx-0">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={filteredPokemon.length}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </>
  );
};

export default LoadPokemon;
