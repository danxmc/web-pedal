'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  DistortionPedal,
  DynamicPedal,
  FrequencyPedal,
  ModulationPedal,
  TimePedal,
} from '@/data/Pedal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AudioNodeUtils } from '@/lib/utils';
import { useAudioProcessGraphContext } from '@/store/providers/AudioProcessGraphProvider';
import { addPedal } from '@/store/slices/boardSlice';
import { PedalType } from '@/types/Pedal';
import { Button } from '@/ui/button';
import upperCase from 'lodash/upperCase';
import { Plus } from 'lucide-react';
import { Fragment, useCallback } from 'react';

const AddPedalBox = () => {
  const {
    state: { audioContext, input, audioNodes },
    setAudioNodes,
  } = useAudioProcessGraphContext();
  const dispatch = useAppDispatch();

  const pedalCategories = {
    DistortionPedal,
    DynamicPedal,
    FrequencyPedal,
    ModulationPedal,
    TimePedal,
  };

  const handleAddPedal = useCallback(
    (
      _e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      newPedal: PedalType
    ): void => {
      if (audioContext.value && input.node) {
        const node = AudioNodeUtils.getAudioNodeFromPedal(
          newPedal,
          audioContext.value
        );

        const newAudioNodesChain = AudioNodeUtils.buildNewChainAddingNodeAtLast(
          node,
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
        dispatch(addPedal(newPedal));
        setAudioNodes(newAudioNodesChain);
      }
    },
    [audioContext.value, input.node, audioNodes.chain, dispatch, setAudioNodes]
  );

  return (
    <Card className='h-fit w-60 border border-dashed border-sky-500 shadow-xl'>
      <CardHeader className='flex flex-row justify-center'>
        <CardTitle>{upperCase('Add Pedal')}</CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col items-center justify-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='lg'>
              <Plus />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuPortal>
            <DropdownMenuContent align='start' forceMount>
              {Object.entries(pedalCategories).map(
                ([pedalCategory, pedalSubcategory]) => {
                  return (
                    <Fragment key={pedalCategory}>
                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>
                          {pedalCategory}
                        </DropdownMenuSubTrigger>

                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            {Object.values(pedalSubcategory).map(
                              (pedalEffects: Object) => {
                                return Object.values(pedalEffects).map(
                                  (pedalEffect: PedalType) => (
                                    <DropdownMenuItem
                                      key={pedalEffect.name}
                                      onClick={(e) =>
                                        handleAddPedal(e, pedalEffect)
                                      }
                                    >
                                      {pedalEffect.name}
                                    </DropdownMenuItem>
                                  )
                                );
                              }
                            )}
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>

                      <DropdownMenuSeparator />
                    </Fragment>
                  );
                }
              )}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </CardContent>
      <div className='card-body items-center justify-center text-center'>
        <div className='flex flex-col items-center justify-center'></div>
      </div>
    </Card>
  );
};

export default AddPedalBox;
