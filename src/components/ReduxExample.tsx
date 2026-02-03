import { type FC } from 'react'
import { useAppSelector } from '../store/hooks'
import { useGetCurrentUserQuery } from '../pages/dashboard/redux/slices/auth/authSlice'

export const ReduxExample: FC = () => {
  // Using the typed selector
  const authState = useAppSelector(state => state.authApi)
  
  // Using RTK Query hook
  const { data: user, isLoading, error } = useGetCurrentUserQuery()

  return (
    <div>
      <h2>Redux Global Store Example</h2>
      
      <div>
        <h3>Auth State from Redux:</h3>
        <pre>{JSON.stringify(authState, null, 2)}</pre>
      </div>

      <div>
        <h3>Current User:</h3>
        {isLoading && <p>Loading user...</p>}
        {error && <p>Error: {JSON.stringify(error)}</p>}
        {user && (
          <div>
            <p>Name: {user.firstName} {user.lastName}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
          </div>
        )}
      </div>
    </div>
  )
}
