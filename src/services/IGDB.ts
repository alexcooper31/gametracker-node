import axios, { AxiosInstance, AxiosPromise } from 'axios';

import Environment from '../environment';

abstract class IGDB {
  private static client: AxiosInstance = axios.create({
    baseURL: 'https://api-v3.igdb.com',
    headers: {
      'user-key': Environment.variable('IGDB_KEY'),
    },
  });

  private static async axiosResponse(promise: AxiosPromise) {
    const response = await promise;
    return response.data;
  }

  public static latestGames(): Promise<any> {
    return this.axiosResponse(
      this.client.post(
        '/release_dates',
        `fields game;
        where date <= ${Math.round(new Date().getTime() / 1000)} & platform = (48,49,130);
        sort date desc;
        limit 10;
      `),
    );
  }

  public static upcoming(): Promise<any> {
    return this.axiosResponse(
      this.client.post(
        '/release_dates',
        `fields game;
        where date > ${Math.round(new Date().getTime() / 1000)} & platform = (48,49,130);
        sort date asc;
        limit 10;
      `),
    );
  }

  public static game(id: number): Promise<any> {
    return this.axiosResponse(
      this.client.post(
        '/games',
        `fields name, platforms, first_release_date;
        where id = ${id};
      `),
    );
  }

  public static cover(game: number): Promise<any> {
    return this.axiosResponse(
      this.client.post(
        '/covers',
        `fields url;
        where game = ${game};
      `),
    );
  }

  public static search(term: string): Promise<any> {
    return this.axiosResponse(
      this.client.post(
        `/games?search=${term}&fields=id,name,first_release_date,platforms&limit=5`),
    );
  }
}

export default IGDB;
