import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useCallback,
} from 'react';
import { useAlpha } from '../alpha/AlphaProvider';

import {
  CandyMachine,
  awaitTransactionSignatureConfirmation,
  getCandyMachineState,
  mintOneToken,
  shortenAddress,
} from '../lib/candyMachine';
import { useNotifications } from '../notifications/NotificationProvider';

const treasury = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_TREASURY_ADDRESS!
);

const config = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_CONFIG!
);

const candyMachineId = new anchor.web3.PublicKey(
  process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!
);

const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;

const connection = new anchor.web3.Connection(rpcHost);

const txTimeout = 30000; // milliseconds (confirm this works for your project)

const mintAvailableItems = 500;
interface MintProviderContextValue {
  mintProviderIsLoading: boolean;
  isMinting: boolean;
  walletShortValue: string | null;
  walletIsConnected: boolean;
  itemsAvailable: number;
  itemsRemaining: number;
  itemsRedeemed: number;
  hasSoldOut: boolean;
  onMint: () => void;
}

const defaultContext = {
  mintProviderIsLoading: false,
  isMinting: false,
  walletShortValue: null,
  walletIsConnected: false,
  itemsAvailable: 0,
  itemsRemaining: mintAvailableItems,
  itemsRedeemed: 0,
  hasSoldOut: false,
  onMint: () => null,
};

const MintProviderContext =
  createContext<MintProviderContextValue>(defaultContext);

const MintProvider = ({ children }: { children: ReactNode }) => {
  const [mintProviderIsLoading, setMintProviderIsLoading] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [walletShortValue, setWalletShortValue] = useState<string | null>(null);
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [itemsAvailable, setItemsAvailable] = useState(mintAvailableItems);
  const [itemsRemaining, setItemsRemaining] = useState(0);
  const [itemsRedeemed, setItemsRedeemed] = useState(0);
  const [hasSoldOut, setHasSoldOut] = useState(false);

  const wallet = useAnchorWallet();
  const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  const { sendNotification } = useNotifications();
  const { fetchAlphaCount } = useAlpha();

  const refreshCandyMachineState = useCallback(() => {
    (async () => {
      if (!wallet) return;
      setMintProviderIsLoading(true);
      const { candyMachine, itemsAvailable, itemsRemaining, itemsRedeemed } =
        await getCandyMachineState(
          wallet as anchor.Wallet,
          candyMachineId,
          connection
        );

      setItemsAvailable(itemsAvailable);
      setItemsRemaining(itemsRemaining);
      setItemsRedeemed(itemsRedeemed);

      setHasSoldOut(itemsRemaining === 0);
      setCandyMachine(candyMachine);
      setMintProviderIsLoading(false);
    })();
  }, [wallet]);

  useEffect(() => {
    refreshCandyMachineState();
  }, [refreshCandyMachineState]);

  useEffect(() => {
    if (!wallet) return;
    setWalletIsConnected(true);
    setWalletShortValue(shortenAddress(wallet.publicKey.toBase58()));
  }, [wallet]);

  const onMint = async () => {
    try {
      setIsMinting(true);
      if (wallet && candyMachine?.program) {
        const mintTxId = await mintOneToken(
          candyMachine,
          config,
          wallet.publicKey,
          treasury
        );

        const status = await awaitTransactionSignatureConfirmation(
          mintTxId,
          txTimeout,
          connection,
          'singleGossip',
          false
        );

        if (!status?.err) {
          sendNotification('Congratulations!', `Mint succeeded!`, 'success');
        } else {
          sendNotification('Mint failed! ', `Please try again!`, 'danger');
        }
      }
    } catch (error: any) {
      // TODO: blech:
      let message = error.msg || 'Minting failed! Please try again!';
      if (!error.msg) {
        if (error.message.indexOf('0x138')) {
        } else if (error.message.indexOf('0x137')) {
          message = `SOLD OUT!`;
          setHasSoldOut(true);
        } else if (error.message.indexOf('0x135')) {
          message = `Insufficient funds to mint. Please fund your wallet.`;
        }
      } else {
        if (error.code === 311) {
          message = `SOLD OUT!`;
        } else if (error.code === 312) {
          message = `Minting period hasn't started yet.`;
        }
      }

      sendNotification('Mint failed! ', message, 'danger');
    } finally {
      if (wallet) {
        fetchAlphaCount();
      }
      setIsMinting(false);
      refreshCandyMachineState();
    }
  };

  return (
    <MintProviderContext.Provider
      value={{
        mintProviderIsLoading,
        isMinting,
        walletShortValue,
        walletIsConnected,
        itemsAvailable,
        itemsRedeemed,
        itemsRemaining,
        hasSoldOut,
        onMint,
      }}
    >
      {children}
    </MintProviderContext.Provider>
  );
};

const useMint = () => useContext(MintProviderContext);

export { MintProvider, useMint };
