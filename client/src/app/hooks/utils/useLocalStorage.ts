import { useState, useEffect } from 'react'

import { getLocalStorage, localStorageData } from './../../utils/storage/localStorage';

export default function useLocalStorage<ValueType>(defaultKey: string, defaultValue: ValueType) {
   const availableStorage = localStorageData()
   const [storageValue, setStorageValue] = useState(getLocalStorage(defaultKey, defaultValue))

   useEffect(() => {
      const localListener = (event: StorageEvent) => {
         if (event.storageArea === localStorage && event.key === defaultKey) {
            setStorageValue(event.newValue ? JSON.parse(event.newValue) : event.newValue)
         }
         window.addEventListener('storage', localListener)

         return () => {
            window.removeEventListener('storage', localListener)
         }
      } 
   }, [defaultKey, defaultValue])

   const setLocalStorage = (newValue: ValueType) => {
      const result = typeof newValue === 'function'

      setStorageValue((currentValue: ValueType) => {
         const storageResult = result ? newValue(currentValue) : newValue
         
         if (availableStorage) {
            localStorage.setItem(defaultKey, JSON.stringify(storageResult))
         }

         return storageResult         
      })
   }

   return [storageValue, setLocalStorage]
}