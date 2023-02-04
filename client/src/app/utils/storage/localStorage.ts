
export const localStorageData = () => {
   const testKey = 'sbh8e-jhsd9-kmdi0-sjks3'

   try {
      window.localStorage.setItem(testKey, testKey)
      window.localStorage.removeItem(testKey)

      return true
   } catch (error) {
      return false
   }
}

export const getLocalStorage = (key: string, defaultValue: any) => {
   const storedValue = localStorageData() ? localStorage.getItem(key) : null

   if (storedValue === null) {
      return defaultValue
   }

   JSON.parse(storedValue)
}