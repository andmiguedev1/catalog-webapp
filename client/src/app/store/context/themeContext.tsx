import { createContext, useContext, useCallback, useMemo } from 'react'
import useLocalStorage from '../../hooks/utils/useLocalStorage'

type ThemeModes = 'light' | 'dark'
type ThemeModeSettings = {
	themeMode: ThemeModes
}

const defaultSettings: ThemeModeSettings = {
	themeMode: 'light',
}

const initialState = {
	...defaultSettings,
	onToggleMode: () => {},
}

export const ThemingContext = createContext(initialState)

export const useThemingContext = () => {
	const context = useContext(ThemingContext)

	if (!context)
		throw new Error('useThemingContext must be used inside ThemingProvider')

	return context
}

interface Props {
	children: React.ReactNode
}

export function ThemingProvider({ children }: Props) {
	const [settings, setSettings] = useLocalStorage('settings', defaultSettings)

	const onToggleMode = useCallback(() => {
		const themeMode = settings.themeMode === 'light' ? 'dark' : 'light'
		setSettings({ ...settings, themeMode })
	}, [settings, setSettings])

	const themeValues = useMemo(
		() => ({
			...settings,
			onToggleMode,
		}),
		[settings, onToggleMode],
	)

	return (
		<ThemingContext.Provider value={themeValues}>
			{children}
		</ThemingContext.Provider>
	)
}
