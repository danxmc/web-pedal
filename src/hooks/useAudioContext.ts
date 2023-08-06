import { useEffect } from 'react';
import { useUserMediaContext } from '@/store/providers/UserMediaProvider';
import { useAudioProcessGraphContext } from '@/store/providers/AudioProcessGraphProvider';

export const useAudioContext = () => {
  const {
    state: { stream },
  } = useUserMediaContext();
  const {
    state: { audioContext },
    setAudioContext,
    setAudioContextError,
  } = useAudioProcessGraphContext();

  useEffect(() => {
    const getAudioContext = () => {
      const audioCtx = new AudioContext();
      setAudioContext(audioCtx);
    };

    const resumeAudioContext = async () => {
      if (audioContext.value) {
        await audioContext.value.resume();
      }
    };

    const cleanup = () => {
      if (audioContext.value && audioContext.value.state !== 'closed') {
        try {
          audioContext.value.close();
          setAudioContext(null);
        } catch (error: unknown) {
          setAudioContextError(error);
        }
      }
    };

    if (!audioContext.value) {
      getAudioContext();
    } else {
      if (audioContext.value && audioContext.value.state === 'suspended') {
        resumeAudioContext();
      }
    }

    //Cleanup
    return cleanup;
  }, [stream, audioContext.value, audioContext.error]);

  // return { audioContext };
};
