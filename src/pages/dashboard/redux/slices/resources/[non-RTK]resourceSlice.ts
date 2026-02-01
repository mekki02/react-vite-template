import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Resource } from '../../../types'
// import { fetchResources } from '../../services/resources'

export interface ResourcesState {
  data: Resource[]
  status: 'idle' | 'loading' | 'failed'

  page: number
  pageSize: number
  totalCount: number
  search: string
}

const initialState: ResourcesState = {
  data: [],
  status: 'idle',

  page: 1,
  pageSize: 10,
  totalCount: 0,
  search: '',
}

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    addResource(state, action: PayloadAction<Resource>) {
      state.data.push(action.payload)
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload
      state.page = 1 // reset page on filter change
    },
  },
  // extraReducers: builder => {
  //   builder
  //     .addCase(fetchResources.pending, state => {
  //       state.status = 'loading'
  //     })
  //     .addCase(fetchResources.fulfilled, (state, action) => {
  //       state.status = 'idle'
  //       state.data = action.payload.data
  //       state.totalCount = action.payload.totalCount
  //     })
  //     .addCase(fetchResources.rejected, state => {
  //       state.status = 'failed'
  //     })
  // },
})

export const { addResource, setPage, setSearch } = resourcesSlice.actions
export const { reducer: resourcesReducer } = resourcesSlice