interface RecordingIconProps {
  enabled?: boolean;
  width?: string | number;
  height?: string | number;
}

const RecordingIcon = (props: RecordingIconProps) => {
  return (
    <svg
      fill={props.enabled ? '#FF0000' : '#00000'}
      width={props.width || '800px'}
      height={props.height || '800px'}
      viewBox='0 0 256 256'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='127' cy='129' r='81' fillRule='evenodd' />
    </svg>
  );
};

export default RecordingIcon;
