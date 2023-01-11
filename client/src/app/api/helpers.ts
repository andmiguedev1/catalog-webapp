
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


