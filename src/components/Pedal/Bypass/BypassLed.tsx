import RecordingIcon from '../../Icons/RecordingIcon';

interface BypassLedProps {
  enabled?: boolean;
  height?: string | number;
  width?: string | number;
}

const BypassLed = ({ enabled, width = 32, height = 32 }: BypassLedProps) => {
  return <RecordingIcon height={height} width={width} enabled={enabled} />;
};

export default BypassLed;
