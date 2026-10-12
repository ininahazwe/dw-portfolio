import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { buildModel } from './derive';
import { loadRaw } from './source';

const DataContext = createContext(null);

export function DataProvider({ children }) {
    const [state, setState] = useState({ status: 'loading', model: null, source: null });

    const reload = useCallback(async () => {
        const raw = await loadRaw();
        setState({ status: 'ready', model: buildModel(raw), source: raw.source });
    }, []);

    useEffect(() => { reload(); }, [reload]);

    return <DataContext.Provider value={{ ...state, reload }}>{children}</DataContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useData = () => useContext(DataContext);
// Modèle prêt (à n'utiliser que sous un composant qui attend status === 'ready')
// eslint-disable-next-line react-refresh/only-export-components
export const useModel = () => useContext(DataContext).model;
