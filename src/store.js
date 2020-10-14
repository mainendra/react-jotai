import { atom } from 'jotai';

const COUNTRIES_URL = 'https://gist.githubusercontent.com/mainendra/0b8ae73421f3e2efa8b1096eec53ae2d/raw/f73d55009a631192e1658d932fe6849a513eaa69/countries.json';

export const filterAtom = atom('');
const countries = atom([]);
export const countriesAtom = atom(
    get => get(countries),
    async (_get, set) => {
        const resp = await fetch(COUNTRIES_URL);
        const json = await resp.json();
        const result = json.countries.reduce((result, country, index) => {
            result.push({
                id: index,
                ...country
            });
            return result;
        }, []);
        set(countries, result);
    }
);
export const filteredCountriesAtom = atom((get) => {
    const filter = get(filterAtom);
    const countries = get(countriesAtom);
    return filter ? countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase())) : countries;
});

