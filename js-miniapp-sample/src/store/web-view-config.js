import { create } from 'zustand';

const useWebViewConfigStore = create((set) => ({
  allowBackForwardNavigationGestures: {
    result: false,
    isLoading: false,
    error: null,
  },
  forceInternalWebView: {
    result: false,
    isLoading: false,
    error: null,
  },
  initAllowBackForwardNavigationGestures: () =>
    set((state) => ({
      ...state,
      allowBackForwardNavigationGestures: {
        ...state.allowBackForwardNavigationGestures,
        isLoading: true,
        error: null,
      },
    })),
  successAllowBackForwardNavigationGestures: (result) =>
    set((state) => ({
      ...state,
      allowBackForwardNavigationGestures: {
        ...state.allowBackForwardNavigationGestures,
        isLoading: false,
        result,
      },
    })),
  failAllowBackForwardNavigationGestures: (error) =>
    set((state) => ({
      ...state,
      allowBackForwardNavigationGestures: {
        ...state.allowBackForwardNavigationGestures,
        isLoading: false,
        error,
      },
    })),
  initForceInternalWebView: () =>
    set((state) => ({
      ...state,
      forceInternalWebView: {
        ...state?.forceInternalWebView,
        isLoading: true,
        error: null,
      },
    })),
  successForceInternalWebView: (result) =>
    set((state) => ({
      ...state,
      forceInternalWebView: {
        ...state?.forceInternalWebView,
        isLoading: false,
        result: result,
      },
    })),
  failForceInternalWebView: (error) =>
    set((state) => ({
      ...state,
      forceInternalWebView: {
        ...state?.forceInternalWebView,
        isLoading: false,
        error: error,
      },
    })),
}));

export default useWebViewConfigStore;
