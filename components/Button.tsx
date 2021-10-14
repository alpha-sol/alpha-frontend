import Link from 'next/link';
import Loader from 'react-loader-spinner';
import { useMint } from '../mint/MintProvider';

interface ButtonProps {
  onPress: () => void;
  callToAction: string;
  className?: string;
}

const MintButton = ({ onPress, callToAction, className }: ButtonProps) => {
  const { mintProviderIsLoading } = useMint();
  return (
    <button
      disabled={mintProviderIsLoading}
      style={{
        width: 125,
      }}
      className={`bg-black text-white border-white border font-mono py-2 px-4 rounded text-xs ${className}`}
      onClick={onPress}
    >
      {mintProviderIsLoading ? (
        <div className="flex flex-row items-center justify-center">
          <Loader type="ThreeDots" color="#FFFFFF" height={16} width={32} />
        </div>
      ) : (
        callToAction
      )}
    </button>
  );
};

interface LinkButtonProps {
  href: string;
  callToAction: string;
  className?: string;
}

const Button = ({ onPress, callToAction, className }: ButtonProps) => {
  return (
    <button
      className={`bg-black text-white border-white border font-mono py-2 px-4 rounded text-xs ${className}`}
      onClick={onPress}
    >
      {callToAction}
    </button>
  );
};

interface LinkButtonProps {
  href: string;
  callToAction: string;
  className?: string;
}

const LinkButton = ({ href, callToAction, className }: LinkButtonProps) => {
  return (
    <Link href={href}>
      <a
        className={`bg-black text-white border-white border font-mono py-2 px-4 rounded text-xs ${className}`}
      >
        {callToAction}
      </a>
    </Link>
  );
};

const MintLinkButton = ({ href, callToAction, className }: LinkButtonProps) => {
  return (
    <Link href={href} passHref>
      <div
        style={{
          width: 125,
        }}
        className={`bg-black border-white border py-2 px-4 rounded flex flex-row items-center justify-center cursor-pointer`}
      >
        <a
          style={{
            width: 125,
          }}
          className={`font-mono text-xs text-center ${className}`}
        >
          {callToAction}
        </a>
      </div>
    </Link>
  );
};

export { Button, LinkButton, MintButton, MintLinkButton };
