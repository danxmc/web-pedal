import React, {
	Dispatch,
	Reducer,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useReducer
} from 'react';

export const UserMediaActionType = {
  SET_STREAM: 'SET_STREAM',
  SET_STREAM_ERROR: 'SET_STREAM_ERROR',
} as const;

type UserMediaAction =
  | {
      type: typeof UserMediaActionType.SET_STREAM;
      payload: MediaStream | null;
    }
  | {
      type: typeof UserMediaActionType.SET_STREAM_ERROR;
      payload: unknown | null;
    };

type UserMediaState = {
  stream: MediaStream | null;
  streamError: unknown | null;
};

const initialState = {
  stream: null,
  streamError: null,
} as UserMediaState;

interface UserMediaContext {
  state: UserMediaState;
  dispatch: Dispatch<UserMediaAction>;
}

const UserMediaContext = createContext<UserMediaContext | undefined>(undefined);

const userMediaReducer: Reducer<UserMediaState, UserMediaAction> = (
  state: UserMediaState,
  action: UserMediaAction
): UserMediaState => {
  switch (action.type) {
    case UserMediaActionType.SET_STREAM:
      return {
        ...state,
        stream: action.payload,
      };
      break;
    case UserMediaActionType.SET_STREAM_ERROR:
      return {
        ...state,
        streamError: action.payload,
      };
      break;
    default:
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state;
      break;
  }
};

const UserMediaProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userMediaReducer, initialState);

  return (
    <UserMediaContext.Provider value={{ state, dispatch }}>
      {children}
    </UserMediaContext.Provider>
  );
};

export const useUserMediaContext = () => {
  const context = useContext(UserMediaContext);
  if (context === undefined) {
    throw new Error(
      'useUserMediaContext must be used within a UserMediaProvider'
    );
  }
  const { state, dispatch } = context;

  const setStream = useCallback(
    (payload: MediaStream | null) => {
      dispatch({
        type: UserMediaActionType.SET_STREAM,
        payload,
      });
    },
    [dispatch]
  );
  const setStreamError = useCallback(
    (payload: unknown | null) => {
      dispatch({
        type: UserMediaActionType.SET_STREAM_ERROR,
        payload,
      });
    },
    [dispatch]
  );

  return useMemo(() => {
    return {
      state,
      setStream,
      setStreamError,
    };
  }, [state, dispatch]);
};

export default UserMediaProvider;
