import axios from "axios";
import {
  charactersContinentType,
  charactersType,
  continentsItem,
  continentsType,
  filtersType,
  paginationType
} from "../shared/types"

import {CONTINENT_SELECTION_RULES} from "../shared/constants";

import paginate from "../utils/paginate";

export default class CharactersContinents {

  private continents: continentsType = [];
  private characters: charactersType = [];
  private characterContinents: charactersContinentType = [];


  /**
   * list all characters with continent name, filtered and paginated if params are provided.
   * @param filters
   * @param pagination
   */
  public async getCharactersWithContinents(filters: filtersType, pagination: paginationType) : Promise<charactersContinentType> {
    this.continents = await this.fetchContinents();
    this.characters = await this.fetchCharacters();

    this.characterContinents = this.mapContinentToCharacters();

    this.characterContinents = this.filterByParams(this.characterContinents, filters);//added this after map because it might be useful to allow filter by continentName
    this.characterContinents = paginate(this.characterContinents, pagination?.page, pagination?.size);

    return this.characterContinents;
  }

  /**
   * Map character with continent
   * @private
   */
  private mapContinentToCharacters() : charactersContinentType {
    return this.characters?.map((item: any) => {
      item.continentName = this.getContinentNameByUserId(item.id);
      return item;
    });
  }

  /**
   * determine continent name by user id
   * @param id
   * @private
   */
  private getContinentNameByUserId(id: number) : string | boolean {

    let selectedContinent;

    if (id % 3 == 0 && id % 5 == 0) {
      selectedContinent = this.continents.find((item: continentsItem) => {
        return item.id === CONTINENT_SELECTION_RULES.CONTINENT_ID_IF_DIVISIBLE_BY_3_AND_5;
      });

      return selectedContinent?.name!;
    }

    if (id % 3 == 0 || id % 5 == 0) {
      selectedContinent = this.continents.find((item: continentsItem) => {
        return item.id === CONTINENT_SELECTION_RULES.CONTINENT_ID_IF_DIVISIBLE_BY_3_OR_5;
      });

      return selectedContinent?.name!;
    }

    if (id % 2 == 0) {
      selectedContinent = this.continents.find((item: continentsItem) => {
        return item.id === CONTINENT_SELECTION_RULES.CONTINENT_ID_IF_EVEN;
      });

      return selectedContinent?.name!;
    }

    if (id % 2 > 0) {
      selectedContinent = this.continents.find((item: continentsItem) => {
        return item.id === CONTINENT_SELECTION_RULES.CONTINENT_ID_IF_ODD;
      });

      return selectedContinent?.name!;
    }

    return false;
  }

  /**
   * filter by given filters. made this dynamic, so it is possible to add more filters with only changing allowedFilters constant
   * @param filters
   * @private
   */
  private filterByParams(dataSet: charactersContinentType, filters : filtersType) : charactersContinentType {

    const data = dataSet.filter((item: any) => {
      let filterMatched = true;// added this variable to make the code less magic.
      for (let key in filters) {
        if ((item[key] !== filters[key])) {
          filterMatched = false;
          return filterMatched;
        }
      }
      return filterMatched;
    })
    return data;
  }

  /**
   * fetch Characters
   * @private
   */
  private async fetchCharacters() : Promise<charactersType>{
    try {
      const { data } = await axios.get(
        `${process.env.THRONES_API_URL}/Characters`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )

      return data;
    } catch (e : any) {
      throw new Error(e.message)
    }
  }

  /**
   * fetch Continents
   * @private
   */
  private async fetchContinents() : Promise<continentsType>{

    console.log(`${process.env.THRONES_API_URL}/Continents`);

    try {
      const { data } = await axios.get(
        `${process.env.THRONES_API_URL}/Continents`,
        {
          headers: {
            Accept: 'application/json'
          }
        }
      )

      return data;
    } catch (e:any) {
      throw new Error(e.message);
    }

  }
}