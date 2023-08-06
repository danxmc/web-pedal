'use client';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AudioNodeUtils } from '@/lib/utils';
import { useAudioProcessGraphContext } from '@/store/providers/AudioProcessGraphProvider';
import {
  removePedal,
  setActivePedal,
  setPotValue,
} from '@/store/slices/boardSlice';
import { PotType } from '@/types/Pedal';
import upperCase from 'lodash/upperCase';
import React, { useCallback, useEffect, useRef } from 'react';
import Paragraph from '../ui/Paragraph';
import BypassLed from './Bypass/BypassLed';
import BypassSwitch from './Bypass/BypassSwitch';
import Pot from './Controls/Pot';
import RemovePedalButton from './RemovePedalButton';

interface BoxPedalProps {
  position: number;
  name: string;
  isActive: boolean;
  pots: Array<PotType>;
  pedalNode?: AudioNode;
}

const BoxPedal = ({
  position,
  name,
  isActive,
  pots,
  pedalNode,
}: BoxPedalProps) => {
  const {
    state: { audioContext, input, audioNodes },
    setAudioNodes,
  } = useAudioProcessGraphContext();
  const dispatch = useAppDispatch();

  const activePedalNodeRef = useRef<AudioNode>();
  const inactivePedalNodeRef = useRef<AudioNode>();

  useEffect(() => {
    if (!activePedalNodeRef.current && audioContext.value && pedalNode) {
      if (pedalNode.constructor.name !== 'GainNode') {
        activePedalNodeRef.current = pedalNode;
        inactivePedalNodeRef.current = new GainNode(audioContext.value, {
          gain: 1,
        });
      }
    }
  }, [pedalNode]);

  // Setup AudioNode(s) connection
  useEffect(() => {
    if (audioContext.value && input.node) {
      let newAudioNodesChain: Array<AudioNode> = [];

      // if (isActive && activePedalNodeRef.current) {
      // newAudioNodesChain = AudioNodeUtils.buildNewChainReplacingNodeAtIndex(
      //   activePedalNodeRef.current,
      //   position,
      //   audioNodes.chain
      // );
      // AudioNodeUtils.connectAudioNodesChain(
      //   newAudioNodesChain,
      //   audioContext.value,
      //   input.node
      // );
      // } else if (!isActive && inactivePedalNodeRef.current) {
      // newAudioNodesChain = AudioNodeUtils.buildNewChainReplacingNodeAtIndex(
      //   inactivePedalNodeRef.current,
      //   position,
      //   audioNodes.chain
      // );
      // AudioNodeUtils.connectAudioNodesChain(
      //   newAudioNodesChain,
      //   audioContext.value,
      //   input.node
      // );
      // }
      if (newAudioNodesChain.length) {
        setAudioNodes(newAudioNodesChain);
      }
    }
  }, [activePedalNodeRef.current, inactivePedalNodeRef.current]);

  const handlePotValueChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      triggeredPotIndex: number
    ): void => {
      if (activePedalNodeRef.current) {
        const targetName = String(e.target.name);
        const targetValue = Number(e.target.value);

        // Update AudioNode value
        AudioNodeUtils.setValueToAudioNode(
          activePedalNodeRef.current,
          targetName,
          targetValue
        );

        // Update store
        dispatch(
          setPotValue({
            pedalIndex: position,
            potIndex: triggeredPotIndex,
            newValue: targetValue,
          })
        );
      }
    },
    [activePedalNodeRef.current, dispatch, setPotValue, position]
  );

  const handleIsActiveToggle = useCallback(
    (
      _e: React.MouseEvent<HTMLInputElement, MouseEvent>,
      isActive: boolean
    ): void => {
      if (audioContext.value && input.node) {
        let newAudioNodesChain: Array<AudioNode> = [];

        // Add "real" AudioNode to chain if active
        if (isActive && activePedalNodeRef.current) {
          newAudioNodesChain = AudioNodeUtils.buildNewChainReplacingNodeAtIndex(
            activePedalNodeRef.current,
            position,
            audioNodes.chain
          );
        } else if (!isActive && inactivePedalNodeRef.current) {
          newAudioNodesChain = AudioNodeUtils.buildNewChainReplacingNodeAtIndex(
            inactivePedalNodeRef.current,
            position,
            audioNodes.chain
          );
        }
        console.log(
          '🚀 ~ file: BoxPedal.tsx:153 ~ newAudioNodesChain:',
          newAudioNodesChain
        );
        AudioNodeUtils.disconnectAudioNodesChain(
          audioNodes.chain,
          audioContext.value,
          input.node
        );
        AudioNodeUtils.connectAudioNodesChain(
          newAudioNodesChain,
          audioContext.value,
          input.node
        );

        dispatch(setActivePedal({ pedalIndex: position, newValue: isActive }));
        setAudioNodes(newAudioNodesChain);
      }
    },
    [
      activePedalNodeRef.current,
      inactivePedalNodeRef.current,
      audioContext.value,
      input.node,
      audioNodes.chain,
      position,
      dispatch,
      setActivePedal,
      setAudioNodes,
    ]
  );

  const handleRemovePedal = useCallback(
    (
      _e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      position: number
    ): void => {
      if (audioContext.value && input.node) {
        const newAudioNodesChain =
          AudioNodeUtils.buildNewChainRemovingNodeAtIndex(
            position,
            audioNodes.chain
          );
        console.log(
          '🚀 ~ file: BoxPedal.tsx:177 ~ newAudioNodesChain:',
          newAudioNodesChain
        );

        AudioNodeUtils.disconnectAudioNodesChain(
          audioNodes.chain,
          audioContext.value,
          input.node
        );
        AudioNodeUtils.connectAudioNodesChain(
          newAudioNodesChain,
          audioContext.value,
          input.node
        );

        // Update store
        dispatch(removePedal(position));
        setAudioNodes(newAudioNodesChain);
      }
    },
    [audioContext.value, input.node, audioNodes.chain, dispatch, setAudioNodes]
  );

  return (
    <div className='card-compact card-bordered card glass w-60 shadow-xl'>
      <div className='card-body'>
        <div className='card-actions justify-start'>
          <RemovePedalButton
            handleRemovePedalFromChain={handleRemovePedal}
            position={position}
          />
        </div>

        <Paragraph className='flex-grow-0 text-end'>
          {upperCase(name)}
        </Paragraph>

        <div className=' flex flex-grow flex-col items-start justify-center'>
          {pots.map((pot, potIndex) => (
            <Pot
              key={`${pot.id}-${potIndex}`}
              position={potIndex}
              id={pot.name}
              name={pot.name}
              max={pot.max}
              min={pot.min}
              value={pot.value ?? pot.defaultValue}
              handlePotChange={handlePotValueChange}
            />
          ))}
        </div>

        <div className='card-actions items-center justify-between'>
          <BypassLed enabled={isActive} />
          <BypassSwitch
            isActive={isActive}
            handleToggle={handleIsActiveToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default BoxPedal;
