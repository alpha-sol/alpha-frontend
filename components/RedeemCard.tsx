import { useState } from 'react';
import Image from 'next/image';
import { TargetMintItem } from '../airtable/mints';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import Loader from 'react-loader-spinner';
import { useNotifications } from '../notifications/NotificationProvider';
import { useAlpha } from '../alpha/AlphaProvider';

interface Props {
  redeemable: TargetMintItem;
}

const RedeemCard = ({ redeemable }: Props) => {
  const { redeemed, id, mint } = redeemable;

  const [visuallyRedeemed, setVisuallyRedeemed] = useState(redeemed);
  const [loading, setLoading] = useState(false);

  const wallet = useAnchorWallet();

  const { sendNotification } = useNotifications();
  const { fetchAlphaCount } = useAlpha();

  const redeem = () => {
    (async () => {
      setLoading(true);
      sendNotification(
        'Redeeming SMB',
        `SMB: ${mint} being redeemed for alpha.`
      );
      try {
        const res = await fetch(`api/redeem`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            airtableId: id,
            walletPublicKey: wallet!.publicKey.toBase58(),
          }),
        });
        const resJson = await res.json();
        console.log(resJson, null, 2);
        if (resJson.txSignature === null) {
          throw new Error('Transaction signature not found');
        }
        setVisuallyRedeemed(true);
        fetchAlphaCount();
        sendNotification(
          'Redeemed!',
          `TX Signature: ${resJson.txSignature}`,
          'success'
        );
      } catch (err) {
        console.error(err);
        sendNotification(
          'Redeem Error',
          `SMB: ${mint} encountered an error while redeeming.`,
          'danger'
        );
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <button
      disabled={visuallyRedeemed || loading}
      onClick={(e) => {
        e.preventDefault();
        redeem();
      }}
    >
      <div
        className={`${
          loading ? 'bg-blue' : visuallyRedeemed ? 'bg-red' : 'bg-green-100'
        } p-4 rounded-2xl`}
      >
        <div className="flex flex-col">
          <Image
            className="rounded overflow-hidden border-gray border-2"
            width={220}
            height={220}
            src={redeemable.imageUri || ''}
            alt={redeemable.name}
          />
          <div
            style={{
              height: 32,
            }}
            className="flex flex-row items-center justify-center"
          >
            {loading ? (
              <div className="mt-3">
                <Loader
                  type="ThreeDots"
                  color="#FFFFFF"
                  height={16}
                  width={32}
                />
              </div>
            ) : (
              <h1 className="text-white text-center text-sm font-mono pt-3">
                {visuallyRedeemed ? 'Redeemed' : 'Redeem'}
              </h1>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};

export { RedeemCard };
