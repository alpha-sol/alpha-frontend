import type { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MintButton } from '../components/MintButton';
import { useMint } from '../mint/MintProvider';

const FAQ: NextPage<Record<string, unknown>> = () => {
  const router = useRouter();
  const [lastMint, setLastMint] = useState(0);

  const { walletShortValue, itemsRedeemed, itemsAvailable, onMint } = useMint();

  useEffect(() => {
    if (!walletShortValue) {
      router.replace('/');
    }
  }, [router, walletShortValue]);

  useEffect(() => {
    if (itemsRedeemed === lastMint) return;
    setLastMint(itemsRedeemed - 1);
  }, [itemsRedeemed, lastMint]);

  return (
    <div className="flex flex-col items-center flex-grow mt-8">
      <h1 className="text-white font-mono text-3xl mt-4 mb-8 text-center">
        Mint
      </h1>
      <div>
        <Image
          // @ts-ignore
          src={`/assets/alpha-spl-mint/${lastMint}.png`}
          width={450}
          height={450}
          alt="alpha logo"
        />
      </div>
      <h2 className="text-white-100 font-mono text-xl mt-4 text-center">
        {`Last Mint #${lastMint}`}
      </h2>
      <h1 className="text-white font-mono text-2xl mt-4 text-center">
        {`${itemsRedeemed} / ${itemsAvailable} alpha Minted`}
      </h1>
      <MintButton className="mt-12" onPress={onMint} />
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageKey: 'mint',
      title: 'Mint - alpha',
    },
  };
};

export default FAQ;
