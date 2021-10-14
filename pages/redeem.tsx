import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMint } from '../mint/MintProvider';
import { RedeemCard } from '../components/RedeemCard';

const Redeem: NextPage<Record<string, unknown>> = () => {
  const { walletRedeemables } = useMint();
  const router = useRouter();

  useEffect(() => {
    if (!walletRedeemables) {
      router.replace('/');
    }
  }, [router, walletRedeemables]);

  return (
    <div className="flex flex-col items-center flex-grow w-full">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col justify-center items-center flex-grow">
          <h1 className="text-white font-mono text-3xl mt-4 mb-8 text-center">
            Redeem
          </h1>
          <div className="grid grid-cols-4 gap-4">
            {walletRedeemables?.map((redeemable) => (
              <RedeemCard
                key={`redeemable-item-${redeemable.id}`}
                redeemable={redeemable}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  return {
    props: {
      pageKey: 'redeem',
      title: 'Redeem - alpha',
    },
  };
};

export default Redeem;
