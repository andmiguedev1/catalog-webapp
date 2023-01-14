import { useState, createContext, PropsWithChildren, useContext } from 'react'

interface CatalogContextValue {
	loadCatalog: boolean
	setLoadCatalog: (loadCatalog: boolean) => void
}

export const CatalogContext =
	createContext<CatalogContextValue | undefined>(undefined)

export function useCatalogContext() {
	const context = useContext(CatalogContext)

	if (context == undefined) {
		throw Error('Error! React cannot access CatalogProvider.')
	}

	return context
}

export function CatalogProvider({ children }: PropsWithChildren<any>) {
	const [loadCatalog, setLoadCatalog] = useState(true)

	return (
		<CatalogContext.Provider value={{ loadCatalog, setLoadCatalog }}>
			{children}
		</CatalogContext.Provider>
	)
}
