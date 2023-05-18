import { useEffect, useState } from 'react';
import { FetchCountriesResult } from '../types/FetchCountriesResult';
import axios from 'axios';

const useFetchCountries = (): FetchCountriesResult => {
  const [result, setResult] = useState<FetchCountriesResult>({
    countries: [],
    loading: true,
  });

  useEffect(() => {
    axios
      .get(
        'https://raw.githubusercontent.com/iamspruce/search-filter-painate-reactjs/main/data/countries.json'
      )
      .then((response) =>
        setResult({
          countries: Object.values(response.data).map((country: any) => country.name),
          loading: false,
        })
      );
  }, []);

  return result;
};

export default useFetchCountries;
