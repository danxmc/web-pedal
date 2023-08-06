import { useUserMediaContext } from '@/store/providers/UserMediaProvider';
import { useEffect } from 'react';

export const useUserMedia = (constraints: MediaStreamConstraints) => {
  const {
    state: { stream, streamError: error },
    setStream,
    setStreamError,
  } = useUserMediaContext();

  useEffect(() => {
    let didCancel = false;

    const getUserMedia = async () => {
      if (!didCancel) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints);
          setStream(stream);
        } catch (e: unknown) {
          setStreamError(e);
        }
      }
    };
    const cancel = () => {
      didCancel = true;
      if (!stream) return;
      if (stream.getVideoTracks) {
        stream.getVideoTracks().map((track) => track.stop());
      }
      if (stream.getAudioTracks) {
        stream.getAudioTracks().map((track) => track.stop());
      }
      // if (stream?.stop) {
      //   stream.stop();
      // }
      setStream(null);
    };

    if (!stream) {
      getUserMedia();
    }

    // Cleanup
    return cancel;
  }, [constraints, stream, error]);

  // return { stream, error };
};
