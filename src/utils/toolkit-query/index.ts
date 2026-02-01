import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

export function getErrorMessage(
  error: FetchBaseQueryError | { message?: string }
) {
  if (error && 'status' in error && error.status === 404) {
    return 'Network error occurred'
  }
  if (error && 'status' in error) {
    if (typeof error.data === 'string') return error.data
    if ('message' in (error.data as any)) return (error.data as any).message
    return 'An error occurred'
  }

  return error?.message ?? 'An error occurred'
}
