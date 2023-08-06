import { useAudioProcessGraphContext } from '@/store/providers/AudioProcessGraphProvider';
import { useUserMediaContext } from '@/store/providers/UserMediaProvider';
import { useEffect } from 'react';

export const useInputNode = () => {
  const {
    state: { stream },
  } = useUserMediaContext();
  const {
    state: { audioContext, input },
    setInputNode,
    setInputNodeError,
  } = useAudioProcessGraphContext();

  useEffect(() => {
    const createAndConnectInputNode = async () => {
      if (stream && audioContext.value) {
        const createdInput = audioContext.value.createMediaStreamSource(stream);

        // create Oscillator node
        // const input = audioContext.createOscillator();
        // input.type = 'sine';
        // input.frequency.setValueAtTime(440, audioContext.currentTime); // value in hertz
        // input.start();

        // const input = audioContext.value.createBufferSource();
        // const arrayBuffer = await fetch(
        //   '/audio/guitar_sample.mp3'
        // ).then((res) => res.arrayBuffer());
        // const audioBuffer = await audioContext.value.decodeAudioData(arrayBuffer);
        // input.buffer = audioBuffer;
        // input.loop = true;
        // input.start();
        // setInputNode(input);

        setInputNode(createdInput);

        input.node?.connect(audioContext.value.destination);
        // input.connect(audioContext.value.destination);
      }
    };

    const cleanup = () => {
      if (input.node) {
        try {
          input.node.disconnect();
          setInputNode(null);
        } catch (error: unknown) {
          setInputNodeError(error);
        }
      }
    };

    if (!input.node && stream && audioContext.value) {
      createAndConnectInputNode();
    }

    //Cleanup
    return cleanup;
  }, [stream, audioContext.value, input.node, input.error]);

  // return { input };
};
