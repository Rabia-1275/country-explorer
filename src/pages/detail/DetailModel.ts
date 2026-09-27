import { getCountryByCode } from '../../services/countriesService';
import type { Country } from '../../types/country';

export class DetailModel {
  async getCountryByCode(code: string): Promise<Country> {
    if (!code || code.trim().length === 0) {
      throw new Error('Country code is required.');
    }

    return await getCountryByCode(code.trim());
  }
}
