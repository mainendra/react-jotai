import React from 'react';
import { Provider, useAtom } from 'jotai';

import { filteredCountriesAtom, filterAtom } from '../store';

import './App.css';

function FilterInput() {
    const [filter, setFilter] = useAtom(filterAtom);
    return (
        <input value={filter} onChange={evt => setFilter(evt.target.value)} />
    );
}

function CountriesTable() {
    const [filtered] = useAtom(filteredCountriesAtom);
    console.log('filterInput');
    return (
        <table width="100%">
            <tbody>
                {
                    filtered.map(({ id, name, code }) => (
                        <tr key={id}>
                            <td>{name}</td>
                            <td>{code}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}

function App() {
    return (
        <div className="App">
            <FilterInput />
            <br />
            <h1>Countries</h1>
            <CountriesTable />
        </div>
    );
}

export default () => (
    <Provider>
        <React.Suspense fallback={<h1 style={{margin: 'auto', width: 800, marginTop: 50}}>Loading...</h1>}>
            <App />
        </React.Suspense>
    </Provider>
);
