import {IInfo} from "@shared/types/common/types.ts";
import {ILocation} from "@shared/types/location/types.ts";
import {BASE_URL} from "@shared/utils";


interface ILocationResponse {
  info: IInfo;
  results: ILocation[];
}

export const fetchLocation = async (page: number = 1): Promise<ILocationResponse> => {
  const response = await fetch(`${BASE_URL}/location/?page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch location');
  }
  return response.json();
};

export const fetchLocationByName = async (name: string, page: number = 1): Promise<ILocationResponse> => {
  const response = await fetch(`${BASE_URL}/location/?name=${encodeURIComponent(name)}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to fetch location by name');
  }
  return response.json();
};


export const findLocationByName = (name: string, locations: ILocation[]): ILocation | undefined => {
  return locations.find(location => location.name === name);
};
