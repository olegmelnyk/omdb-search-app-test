import axios from 'axios';
import { OmdbGetOptions, OmdbSearchOptions, OmdbGetResult, OmdbSearchResult } from './interfaces';



export class OmdbApiClient {
  private _baseUrl: string = 'http://www.omdbapi.com/';

  constructor(private _apiKey: string) {
  }

  getByTitle(title: string, options?: OmdbGetOptions): Promise<OmdbGetResult> {
    const query: any = {t: title};
    return this._get(query, options);
  }

  getByImdbId(imdbId: string, options?: OmdbGetOptions): Promise<OmdbGetResult> {
    const query: any = {i: imdbId};
    return this._get(query, options);
  }

  search(title: string, options?: OmdbSearchOptions): Promise<OmdbSearchResult> {
    options = options ? options : {};
    const query: any = {s: title};
    if (options.page) query.page = options.page;
    if (options.type) query.type = options.type;
    if (options.y) query.y = options.y;
    if (options.dataType) query.r = options.dataType;
    return <Promise<OmdbSearchResult>>this._request(query);
  }

  private _get(query: any, options?: OmdbGetOptions): Promise<OmdbGetResult> {
    options = options ? options : {};
    if (options.type) query.type = options.type;
    if (options.dataType) query.r = options.dataType;
    return <Promise<OmdbGetResult>>this._request(query);
  }

  private _request(query: any): Promise<OmdbGetResult | OmdbSearchResult> {
    return new Promise<any>((resolve, reject) => {
      axios.get(this._baseUrl, {
        params: Object.assign({apiKey: this._apiKey}, query)
      })
      .then(response => resolve(response.data))
      .catch(reject);
    });
  }
}

const omdb = new OmdbApiClient('7331006f');

export default omdb;