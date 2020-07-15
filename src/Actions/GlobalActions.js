export const LOADING = 'LOADING'

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