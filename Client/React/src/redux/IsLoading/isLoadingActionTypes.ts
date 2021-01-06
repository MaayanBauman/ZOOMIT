export const SET_IS_LOADING = 'SET_IS_LOADING';

interface SetIsLoading {
    type: typeof SET_IS_LOADING,
    payload: { isLoading: boolean }
}

export type IsLoadingAction = SetIsLoading;
