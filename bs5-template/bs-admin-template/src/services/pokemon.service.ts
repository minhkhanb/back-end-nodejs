/**
 * @file pokedex.js
 * @author Sankarsan Kampa
 * @license GPL-3.0
 */
import api from '@src/utils/api';

interface PokeForm {
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
}

interface Sprites {
  other: {
    dream_world: PokeForm,
    home: PokeForm,
  };
}

export interface Pokemon {
  sprites: Sprites;
}

export interface PokeCat {
  name: string;
  url: string;
  image: string;
}

export interface Pagination<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

// const config = {
//   baseURL: 'https://pokeapi.glitch.me',
//   versions: ['v1'],
// };

/**
 * @class Pokedex
 */
class Pokedex {
  /**
   * @constructor
   * @param {Object} [options] The options for Pokedex API library
   * @param {String} [options.userAgent] The User-Agent header for the HTTP request
   * @param {String} [options.version] The version of the Pokedex API
   * @example
   * const Pokedex = require('pokedex-api');
   * const pokedex = new Pokedex({
   *   userAgent: 'BastionDiscordBot (https://bastionbot.org, v6.3.2)',
   *   version: 'v1'
   * });
   */
  // constructor(options) {
  //   if (options) {
  //     if (options.version && config.versions.includes(options.version)) {
  //       this.version = options.version;
  //     }
  //   }
  //
  //   if (this.version) {
  //     this.BASE_URL = `${config.baseURL}/${this.version}`;
  //   } else {
  //     this.BASE_URL = config.baseURL;
  //   }
  // }

  /**
   * Returns an array of Pokémon Categories discovered in the Pokémon World.
   * @method getCategories
   * @returns {Promise<Array>} Resolves discovered Pokémon categories
   * @example
   * pokedex.getCategories()
   *   .then(categories => console.log(categories))
   *   .catch(console.error);
   */
  async getCategories() {
    return api.get('/categories');
  }

  /**
   * Returns an array of Pokémon Egg Groups discovered in the Pokémon World.
   * @method getEggGroups
   * @returns {Promise<Array>} Resolves discovered Pokémon egg groups
   * @example
   * pokedex.getEggGroups()
   *   .then(eggGroups => console.log(eggGroups))
   *   .catch(console.error);
   */
  async getEggGroups() {
    return api.get('/egg-groups');
  }

  /**
   * Returns a Evolution Stone object containing the details about the evolution stone.
   * @method getEvolutionStone
   * @param {String} slug The string used to identify this evolution stone.
   * @returns {Promise<Object>} Resolves the specified Pokémon evolution stone
   * @example
   * pokedex.getEvolutionStone(slug)
   *   .then(evolutionStone => console.log(evolutionStone))
   *   .catch(console.error);
   */
  async getEvolutionStone(slug: string) {
    return api.get(`/evolution-stone/${slug}`);
  }

  /**
   * Returns an array of Pokémon Evolution Stone names discovered in the Pokémon world.
   * @method getEvolutionStones
   * @returns {Promise<Array>} Resolves discovered Pokémon evolution stones
   * @example
   * pokedex.getEvolutionStones()
   *   .then(evolutionStones => console.log(evolutionStones))
   *   .catch(console.error);
   */
  async getEvolutionStones() {
    return api.get('/evolution-stone');
  }

  /**
   * Returns a Pokémon League object containing the details about the league.
   * @method getLeague
   * @param {String} slug The string used to identify this Pokémon leauge.
   * @returns {Promise<Object>} Resolves the specified Pokémon league
   * @example
   * pokedex.getLeague(slug)
   *   .then(league => console.log(league))
   *   .catch(console.error);
   */
  async getLeague(slug: string) {
    return api.get(`/league/${slug}`);
  }

  /**
   * Returns an array of Pokémon League names known to us.
   * @method getEvolutionStones
   * @returns {Promise<Array>} Resolves discovered Pokémon leagues
   * @example
   * pokedex.getLeagues()
   *   .then(leagues => console.log(leagues))
   *   .catch(console.error);
   */
  async getLeagues() {
    return api.get('/league');
  }

  /**
   * Returns an array of Pokémon objects containing all the forms of the Pokémon specified the name.
   * @method getPokemonByNumber
   * @param {String} name The name of the Pokémon
   * @returns {Promise<Array>} Resolves information about the specified Pokémon
   * @example
   * // It's best practice to use encodeURIComponent() to encode the name
   * // string so the API server doesn't respond with 404.
   * pokedex.getPokemonByName(encodeURIComponent('Pikachu'))
   *   .then(pokemon => console.log(pokemon))
   *   .catch(console.error);
   */
  async getPokemonByName(name: string) {
    return api.get(`/pokemon/${name}`);
  }

  /**
   * Returns an array of Pokémon objects containing all the forms of the Pokémon specified the Pokédex number.
   * @method getPokemonByNumber
   * @param {Number} number The Pokédex number of the Pokémon
   * @returns {Promise<Array>} Resolves information about the specified Pokémon
   * @example
   * pokedex.getPokemonByNumber(658)
   *   .then(pokemon => console.log(pokemon))
   *   .catch(console.error);
   */
  async getPokemonByNumber(number: number) {
    return api.get<Pokemon>(`/pokemon/${number}`);
  }

  /**
   * Returns a Pokémon Counts object containing the number of Pokémon in each generation and the total number of Pokémon in the Pokémon World.
   * @method getPokemonCounts
   * @returns {Promise<Object>} Resolves the number of Pokémon in each generatrion and in total
   * @example
   * pokedex.getPokemonCounts()
   *   .then(counts => console.log(counts))
   *   .catch(console.error);
   */
  async getPokemonCounts() {
    return api.get('/pokemon/counts');
  }

  /**
   * Returns an array of Pokémon Types discovered in the Pokémon World.
   * @method getTypes
   * @returns {Promise<Array>} Resolves discovered Pokémon types
   * @example
   * pokedex.getTypes()
   *   .then(types => console.log(types))
   *   .catch(console.error);
   */
  async getTypes() {
    return api.get('/types');
  }

  /////////////////////////////////////
  async getPokemons(offset?: number) {
    return api.get<Pagination<PokeCat>>(`/pokemon/?offset=${offset}limit=25`);
  }
}

export default Pokedex;
