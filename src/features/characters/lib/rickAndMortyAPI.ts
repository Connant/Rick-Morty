import {Character, Info} from "@shared/types/characters/types.ts";


interface CharactersResponse {
  info: Info;
  results: Character[];
}

export const fetchCharacters = async (page: number = 1): Promise<CharactersResponse> => {
  const response = await fetch(`http://192.168.1.61:4000/character/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchCharactersByName = async (name: string, page: number = 1): Promise<CharactersResponse> => {
  const response = await fetch(`http://192.168.1.61:4000/character/?name=${encodeURIComponent(name)}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters by name');
  }
  return response.json();
};

export const fetchAllCharacters = async () => {
  const pages = [];
  for (let i = 1; i <= 10; i++) {
    const response = await fetch(`http://192.168.1.61:4000/character/?page=${i}`);
    const data = await response.json();
    pages.push(...data.results);
  }
  return pages;
};




export const findCharacterByName = (name: string, characters: Character[]): Character | undefined => {
  return characters.find(character => character.name === name);
};
