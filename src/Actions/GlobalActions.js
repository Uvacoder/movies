export const LOADING = 'global/LOADING'

export const startedLoading = () => {
  return {
    type: LOADING,
    isLoading: true
  }
}

export const finishedLoading = () => {
  return {
    type: LOADING,
    isLoading: false
  }
}