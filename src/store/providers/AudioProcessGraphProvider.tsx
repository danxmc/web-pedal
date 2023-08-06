import React, {
  Dispatch,
  Reducer,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export const AudioProcessGraphActionType = {
  SET_AUDIO_CONTEXT: 'SET_AUDIO_CONTEXT',
  SET_AUDIO_CONTEXT_ERROR: 'SET_AUDIO_CONTEXT_ERROR',
  SET_INPUT_NODE: 'SET_INPUT_NODE',
  SET_INPUT_NODE_ERROR: 'SET_INPUT_NODE_ERROR',
  ADD_AUDIO_NODE: 'ADD_AUDIO_NODE',
  REMOVE_AUDIO_NODE: 'REMOVE_AUDIO_NODE',
  REMOVE_AUDIO_NODES: 'REMOVE_AUDIO_NODES',
  SET_AUDIO_NODES: 'SET_AUDIO_NODES',
  REMOVE_INACTIVE_AUDIO_NODES: 'REMOVE_INACTIVE_AUDIO_NODES',
  SET_INACTIVE_AUDIO_NODES: 'SET_INACTIVE_AUDIO_NODES',
} as const;

type AudioProcessGraphAction =
  | {
      type: typeof AudioProcessGraphActionType.SET_AUDIO_CONTEXT;
      payload: AudioContext | null;
    }
  | {
      type: typeof AudioProcessGraphActionType.SET_AUDIO_CONTEXT_ERROR;
      payload: unknown | null;
    }
  | {
      type: typeof AudioProcessGraphActionType.SET_INPUT_NODE;
      payload: AudioNode | null;
    }
  | {
      type: typeof AudioProcessGraphActionType.SET_INPUT_NODE_ERROR;
      payload: unknown | null;
    }
  | {
      type: typeof AudioProcessGraphActionType.ADD_AUDIO_NODE;
      payload: AudioNode;
    }
  | {
      type: typeof AudioProcessGraphActionType.REMOVE_AUDIO_NODE;
      payload: number;
    }
  | {
      type: typeof AudioProcessGraphActionType.REMOVE_AUDIO_NODES;
      payload: Array<number>;
    }
  | {
      type: typeof AudioProcessGraphActionType.SET_AUDIO_NODES;
      payload: Array<AudioNode>;
    };

type AudioProcessGraphState = {
  audioContext: {
    value: AudioContext | null;
    error: unknown | null;
  };
  input: {
    node: AudioNode | null;
    error: unknown | null;
  };
  audioNodes: {
    chain: Array<AudioNode>;
  };
};

const initialState = {
  audioContext: {
    value: null,
    error: null,
  },
  input: {
    node: null,
    error: null,
  },
  audioNodes: {
    chain: [],
  },
} as AudioProcessGraphState;

interface AudioProcessGraphContext {
  state: AudioProcessGraphState;
  dispatch: Dispatch<AudioProcessGraphAction>;
}
const AudioProcessGraphContext = createContext<
  AudioProcessGraphContext | undefined
>(undefined);

const audioProcessGraphReducer: Reducer<
  AudioProcessGraphState,
  AudioProcessGraphAction
> = (
  state: AudioProcessGraphState,
  action: AudioProcessGraphAction
): AudioProcessGraphState => {
  switch (action.type) {
    case AudioProcessGraphActionType.SET_AUDIO_CONTEXT:
      return {
        ...state,
        audioContext: { ...state.audioContext, value: action.payload },
      };
      break;
    case AudioProcessGraphActionType.SET_AUDIO_CONTEXT_ERROR:
      return {
        ...state,
        audioContext: {
          ...state.audioContext,
          error: action.payload,
        },
      };
      break;
    case AudioProcessGraphActionType.SET_INPUT_NODE:
      return { ...state, input: { ...state.input, node: action.payload } };
      break;
    case AudioProcessGraphActionType.SET_INPUT_NODE_ERROR:
      return { ...state, input: { ...state.input, error: action.payload } };
      break;
    case AudioProcessGraphActionType.ADD_AUDIO_NODE:
      const audioChainWithNodeConcat = state.audioNodes.chain.concat(
        action.payload
      );
      return {
        ...state,
        audioNodes: { ...state.audioNodes, chain: audioChainWithNodeConcat },
      };
      break;
    case AudioProcessGraphActionType.REMOVE_AUDIO_NODE:
      const audioChainWithFilteredNode = state.audioNodes.chain.filter(
        (_audioNode, i) => i !== action.payload
      );
      return {
        ...state,
        audioNodes: { ...state.audioNodes, chain: audioChainWithFilteredNode },
      };
      break;
    case AudioProcessGraphActionType.REMOVE_AUDIO_NODES:
      const audioChainWithFilteredNodes = state.audioNodes.chain.filter(
        (_audioNode, i) => !action.payload.includes(i)
      );
      return {
        ...state,
        audioNodes: { ...state.audioNodes, chain: audioChainWithFilteredNodes },
      };
      break;
    case AudioProcessGraphActionType.SET_AUDIO_NODES:
      return {
        ...state,
        audioNodes: {
          ...state.audioNodes,
          chain: action.payload,
        },
      };
      break;
    default:
      // throw new Error(`Unhandled action type: ${action.type}`)
      return state;
  }
};

const AudioProcessGraphProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(audioProcessGraphReducer, initialState);

  return (
    <AudioProcessGraphContext.Provider value={{ state, dispatch }}>
      {children}
    </AudioProcessGraphContext.Provider>
  );
};

export const useAudioProcessGraphContext = () => {
  const context = useContext(AudioProcessGraphContext);
  if (context === undefined) {
    throw new Error(
      'useAudioProcessGraphContext must be used within a AudioProcessGraphProvider'
    );
  }
  const { state, dispatch } = context;

  const setAudioContext = useCallback(
    (payload: AudioContext | null) => {
      dispatch({
        type: AudioProcessGraphActionType.SET_AUDIO_CONTEXT,
        payload,
      });
    },
    [dispatch]
  );
  const setAudioContextError = useCallback(
    (payload: unknown | null) => {
      dispatch({
        type: AudioProcessGraphActionType.SET_AUDIO_CONTEXT_ERROR,
        payload,
      });
    },
    [dispatch]
  );
  const setInputNode = useCallback(
    (payload: AudioNode | null) => {
      dispatch({ type: AudioProcessGraphActionType.SET_INPUT_NODE, payload });
    },
    [dispatch]
  );
  const setInputNodeError = useCallback(
    (payload: unknown | null) => {
      dispatch({
        type: AudioProcessGraphActionType.SET_INPUT_NODE_ERROR,
        payload,
      });
    },
    [dispatch]
  );
  const addAudioNode = useCallback(
    (payload: AudioNode) => {
      dispatch({
        type: AudioProcessGraphActionType.ADD_AUDIO_NODE,
        payload,
      });
    },
    [dispatch]
  );
  const removeAudioNode = useCallback(
    (payload: number) => {
      dispatch({
        type: AudioProcessGraphActionType.REMOVE_AUDIO_NODE,
        payload,
      });
    },
    [dispatch]
  );
  const removeAudioNodes = useCallback(
    (payload: Array<number>) => {
      dispatch({
        type: AudioProcessGraphActionType.REMOVE_AUDIO_NODES,
        payload,
      });
    },
    [dispatch]
  );
  const setAudioNodes = useCallback(
    (payload: Array<AudioNode>) => {
      dispatch({ type: AudioProcessGraphActionType.SET_AUDIO_NODES, payload });
    },
    [dispatch]
  );

  return useMemo(() => {
    return {
      state,
      setAudioContext,
      setAudioContextError,
      setInputNode,
      setInputNodeError,
      addAudioNode,
      removeAudioNode,
      removeAudioNodes,
      setAudioNodes,
    };
  }, [state, dispatch]);
};

export default AudioProcessGraphProvider;
