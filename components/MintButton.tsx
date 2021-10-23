import Loader from 'react-loader-spinner';
import { useAlpha } from '../alpha/AlphaProvider';
import { useMint } from '../mint/MintProvider';

interface ButtonProps {
  onPress: () => void;
  className?: string;
}

const MintButton = ({ onPress, className }: ButtonProps) => {
  const { isMinting } = useMint();
  const { alphaCount } = useAlpha();
  const hasAlpha = alphaCount && alphaCount > 0;

  return (
    <button
      disabled={isMinting || !hasAlpha}
      style={{
        width: 325,
        height: 80,
      }}
      className={`bg-purple text-white font-mono py-6 px-4 rounded-xl text-2xl ${className}`}
      onClick={onPress}
    >
      {isMinting ? (
        <div className="flex flex-row items-center justify-center">
          <Loader type="ThreeDots" color="#FFFFFF" height={24} width={48} />
        </div>
      ) : hasAlpha ? (
        'Mint alpha'
      ) : (
        'Unable to mint'
      )}
    </button>
  );
};

export { MintButton };
