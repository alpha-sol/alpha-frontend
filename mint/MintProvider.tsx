// import * as anchor from '@project-serum/anchor';
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import {
  useState,
  createContext,
  ReactNode,
  useEffect,
  useContext,
} from 'react';
import { TargetMintItem } from '../airtable/mints';
import {
  // CandyMachine,
  // getCandyMachineState,
  shortenAddress,
} from '../lib/candyMachine';

// const treasury = new anchor.web3.PublicKey(
//   process.env.NEXT_PUBLIC_TREASURY_ADDRESS!
// );

// const config = new anchor.web3.PublicKey(
//   process.env.NEXT_PUBLIC_CANDY_MACHINE_CONFIG!
// );

// const candyMachineId = new anchor.web3.PublicKey(
//   process.env.NEXT_PUBLIC_CANDY_MACHINE_ID!
// );

// const rpcHost = process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!;

// const connection = new anchor.web3.Connection(rpcHost);

// const startDateSeed = new Date(
//   parseInt(process.env.NEXT_PUBLIC_CANDY_START_DATE!, 10)
// );

// const txTimeout = 30000; // milliseconds (confirm this works for your project)

interface MintProviderContextValue {
  mintProviderIsLoading: boolean;
  walletShortValue: string | null;
  walletIsConnected: boolean;
  walletRedeemables: TargetMintItem[] | null;
  // mintHasStarted: boolean;
  // mintHasSoldOut: boolean;
  // startDate: Date | null;
}

const defaultContext = {
  mintProviderIsLoading: false,
  walletShortValue: null,
  walletIsConnected: false,
  walletRedeemables: null,
  // mintHasStarted: false,
  // mintHasSoldOut: false,
  // startDate: null,
};

const MintProviderContext =
  createContext<MintProviderContextValue>(defaultContext);

const MintProvider = ({ children }: { children: ReactNode }) => {
  const [mintProviderIsLoading, setMintProviderIsLoading] = useState(false);
  const [walletShortValue, setWalletShortValue] = useState<string | null>(null);
  const [walletIsConnected, setWalletIsConnected] = useState(false);
  const [walletRedeemables, setWalletRedeemables] = useState<
    TargetMintItem[] | null
  >(null);
  // const [mintHasStarted, setMintHasStarted] = useState(false);
  // const [mintHasSoldOut, setMintHasSoldOut] = useState(false);
  // const [startDate, setStartDate] = useState(startDateSeed);

  const wallet = useAnchorWallet();
  // const [candyMachine, setCandyMachine] = useState<CandyMachine>();

  useEffect(() => {
    if (!wallet?.publicKey) {
      return;
    }
    setMintProviderIsLoading(true);
    (async () => {
      const res = await fetch(`api/getAvailableMints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          walletPublicKey: wallet.publicKey.toBase58(),
        }),
      });
      const { mints } = await res.json();
      setWalletRedeemables(mints);
      setMintProviderIsLoading(false);
    })();
  }, [wallet?.publicKey]);

  // useEffect(() => {
  //   if (!wallet) return;
  //   (async () => {
  //     const { candyMachine, goLiveDate, itemsRemaining } =
  //       await getCandyMachineState(
  //         wallet as anchor.Wallet,
  //         candyMachineId,
  //         connection
  //       );
  //     setMintHasSoldOut(itemsRemaining === 0);
  //     setStartDate(goLiveDate);
  //     setCandyMachine(candyMachine);
  //   })();
  // }, [wallet]);

  useEffect(() => {
    if (!wallet) return;
    setWalletIsConnected(true);
    setWalletShortValue(shortenAddress(wallet.publicKey.toBase58()));
  }, [wallet]);

  return (
    <MintProviderContext.Provider
      value={{
        mintProviderIsLoading,
        walletShortValue,
        walletIsConnected,
        walletRedeemables,
        // mintHasStarted,
        // mintHasSoldOut,
        // startDate,
      }}
    >
      {children}
    </MintProviderContext.Provider>
  );
};

const useMint = () => useContext(MintProviderContext);

export { MintProvider, useMint };
