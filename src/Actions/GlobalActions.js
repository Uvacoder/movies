export const LOADING = 'global/LOADING'

export const changeLoadingStatus = () => {
  return {
    type: LOADING,
    isLoading: true
  }
}