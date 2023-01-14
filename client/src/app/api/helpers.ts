import { AxiosResponse } from "axios"

export const APIResponse = (response: AxiosResponse) => response.data

export const delayRequest = () => new Promise(resolve => setTimeout(resolve, 500))

export function getValidationError(data: any) {
   if (data.errors) {
      const stackTraceErrors: string[] = []

      for (const key in data.errors) {
         if (data.errors[key]) {
            stackTraceErrors.push(data.errors[key])
         }
      }

      throw stackTraceErrors.flat()
   }
}


