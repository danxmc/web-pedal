'use client';
import { CAPTURE_AUDIO_OPTIONS } from '@/constants/userMediaContants';
import { useAudioContext } from '@/hooks/useAudioContext';
import { useInputNode } from '@/hooks/useInputNode';
import { useUserMedia } from '@/hooks/useUserMedia';
import { AudioNodeUtils } from '@/lib/utils';
import { useAudioProcessGraphContext } from '@/store/providers/AudioProcessGraphProvider';
import { useUserMediaContext } from '@/store/providers/UserMediaProvider';
import { PedalType } from '@/types/Pedal';
import { useCallback, useEffect } from 'react';
import BoxPedal from './BoxPedal';
import AddPedalBox from './AddPedalBox';

interface BoardProps {
  pedals: Array<PedalType>;
}

const Board = ({ pedals }: BoardProps) => {
  useUserMedia(CAPTURE_AUDIO_OPTIONS);
  useAudioContext();
  useInputNode();

  const {
    state: { stream },
  } = useUserMediaContext();
  const {
    state: { audioContext, input, audioNodes },
    setAudioNodes,
  } = useAudioProcessGraphContext();
  // Line in: Input -> InputBuffer
  // Line out: Output -> Output Buffer
  // Pedal org
  // console.log(
  //   '🚀 ~ file: Board.tsx:27 ~ Board ~ audioNodes:',
  //   audioNodes.chain
  // );
  useEffect(() => {
    if (audioContext.value && input.node) {
      // Instantiate AudioNode(s) from data
      const newAudioNodesChain = pedals.reduce((prevNodes, pedal) => {
        if (pedal.pots && audioContext.value && input.node) {
          const node = AudioNodeUtils.getAudioNodeFromPedal(
            pedal,
            audioContext.value
          );
          return [...prevNodes, node];
        }
        return [...prevNodes];
      }, new Array<AudioNode>());

      // Connect nodes to AudioContext
      AudioNodeUtils.connectAudioNodesChain(
        newAudioNodesChain,
        audioContext.value,
        input.node
      );

      // Set store
      setAudioNodes(newAudioNodesChain);
    }

    // Cleanup
    return () => {
      // Disconnect nodes from AudioContext
      if (audioContext.value && input.node) {
        AudioNodeUtils.disconnectAudioNodesChain(
          audioNodes.chain,
          audioContext.value,
          input.node
        );
      }
      // Clear store
      setAudioNodes([]);
    };
  }, [input.node]);

  // useEffect(() => {
  // if (input.node && audioContext.value) {
  // AudioNodeUtils.disconnectAudioNodesChain(
  //   audioNodes.chain,
  //   audioContext.value,
  //   input.node
  // );
  // console.log(
  //   '🚀 ~ file: Board.tsx:87 ~ useEffect ~ audioNodes:',
  //   audioNodes
  // );
  // AudioNodeUtils.connectAudioNodesChain(
  //   audioNodes.chain,
  //   audioContext.value,
  //   input.node
  // );
  // }
  // const newNodeSplits = pedals.map((pedal) =>
  //   pedal.isActive ? pedal.pots?.length || 0 : 0
  // );

  // setNodeSplits(newNodeSplits);
  // }, [audioNodes.chain]);

  return (
    <>
      {stream &&
        audioContext.value &&
        input.node &&
        pedals &&
        pedals.map((pedal, pedalIndex) => {
          return (
            <BoxPedal
              key={`${pedal.id}-${pedalIndex}`}
              position={pedalIndex}
              name={pedal.name}
              isActive={pedal.isActive}
              pots={pedal.pots || []}
              pedalNode={audioNodes.chain.at(pedalIndex)}
            />
          );
        })}
      <AddPedalBox />
    </>
  );
};

export default Board;
