export const formatPokemonNumber = (number) => {
    return `#${String(number).padStart(4, "0")}`;
  };