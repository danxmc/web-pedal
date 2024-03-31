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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
      val: number[],
      triggeredPotName: string,
      triggeredPotIndex: number
    ): void => {
      if (activePedalNodeRef.current) {
        const targetValue = Number(val);
        const targetName = String(triggeredPotName);

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
    (pressed: boolean): void => {
      if (audioContext.value && input.node) {
        let newAudioNodesChain: Array<AudioNode> = [];

        // Add "real" AudioNode to chain if active
        if (pressed && activePedalNodeRef.current) {
          newAudioNodesChain = AudioNodeUtils.buildNewChainReplacingNodeAtIndex(
            activePedalNodeRef.current,
            position,
            audioNodes.chain
          );
        } else if (!pressed && inactivePedalNodeRef.current) {
          newAudioNodesChain = AudioNodeUtils.buildNewChainReplacingNodeAtIndex(
            inactivePedalNodeRef.current,
            position,
            audioNodes.chain
          );
        }

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

        dispatch(setActivePedal({ pedalIndex: position, newValue: pressed }));
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
    <Card className='h-fit w-60'>
      <CardHeader className='flex flex-col justify-center'>
        <div className='justify-start'>
          <RemovePedalButton
            handleRemovePedalFromChain={handleRemovePedal}
            position={position}
          />
        </div>
        <CardTitle>{upperCase(name)}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-grow flex-col items-stretch justify-center gap-4'>
        {pots.map((pot, potIndex) => (
          <Pot
            key={`${pot.id}-${potIndex}`}
            position={potIndex}
            name={pot.name}
            max={pot.max}
            min={pot.min}
            value={pot.value ?? pot.defaultValue}
            handlePotChange={handlePotValueChange}
          />
        ))}
      </CardContent>
      <CardFooter className='flex flex-row items-center justify-between'>
        <BypassLed enabled={isActive} />
        <BypassSwitch isActive={isActive} handleToggle={handleIsActiveToggle} />
      </CardFooter>
    </Card>
  );
};

export default BoxPedal;
