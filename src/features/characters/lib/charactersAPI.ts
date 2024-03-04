import {ICharacter} from "@shared/types/characters/types.ts";
import {IInfo} from "@shared/types/common/types.ts";
import {BASE_URL} from "@shared/utils";


interface CharactersResponse {
  info: IInfo;
  results: ICharacter[];
}

export const fetchCharacters = async (page: number = 1): Promise<CharactersResponse> => {
  const response = await fetch(`${BASE_URL}/character/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  return response.json();
};

export const fetchCharactersByName = async (name: string, page: number = 1): Promise<CharactersResponse> => {
  const response = await fetch(`${BASE_URL}/character/?name=${encodeURIComponent(name)}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch characters by name');
  }
  return response.json();
};

export const fetchCharacterById = async (id: string | undefined) => {
  const response = await fetch(`${BASE_URL}/character/${id}`);
  if (!response.ok) {
    throw new Error('Character fetching failed');
  }
  return await response.json();
};