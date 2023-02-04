import { createContext, useCallback, useMemo } from 'react'
import useLocalStorage from '../../hooks/utils/useLocalStorage'

const defaultSettings = {
	themeMode: 'light',
}

const initialState = {
	...defaultSettings,
	onToggleMode: () => {},
}

const ThemingContent = createContext(initialState)

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
		<ThemingContent.Provider value={themeValues}>
			{children}
		</ThemingContent.Provider>
	)
}
