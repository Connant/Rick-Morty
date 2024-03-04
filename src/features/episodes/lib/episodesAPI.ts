import {IInfo} from "@shared/types/common/types.ts";
import {BASE_URL} from "@shared/utils";
import {IEpisodes} from "@shared/types/episodes";


interface IEpisodesResponse {
  info: IInfo;
  results: IEpisodes[];
}

export const fetchEpisodes = async (page: number = 1): Promise<IEpisodesResponse> => {
  const response = await fetch(`${BASE_URL}/episode/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch episodes');
  }
  return response.json();
};

export const fetchEpisodesByName = async (name: string, page: number = 1): Promise<IEpisodesResponse> => {
  const response = await fetch(`${BASE_URL}/episode/?name=${encodeURIComponent(name)}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch episodes by name');
  }
  return response.json();
};


export const findEpisodesByName = (name: string, episodes: IEpisodes[]): IEpisodes | undefined => {
  return episodes.find(episode => episode.name === name);
};
