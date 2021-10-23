import { useAnchorWallet } from '@solana/wallet-adapter-react';
import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

interface AlphaContextValue {
  alphaCount: number | null;
  fetchAlphaCount: () => void;
  setOptimisticCount: (count: number) => void;
}

const AlphaContext = createContext<AlphaContextValue>({
  alphaCount: null,
  fetchAlphaCount: () => null,
  setOptimisticCount: () => null,
});

const AlphaProvider = ({ children }: { children: ReactNode }) => {
  const [alphaCount, setAlphaCount] = useState<number | null>(null);

  const wallet = useAnchorWallet();

  const fetchAlphaCount = useCallback(async () => {
    if (!wallet) return;
    const res = await fetch(`api/getUserAlpha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        walletPublicKey: wallet.publicKey.toBase58(),
      }),
    });
    const resJson = await res.json();
    if (resJson.alphaCount !== null) {
      setAlphaCount(resJson.alphaCount);
    }
  }, [wallet]);

  const setOptimisticCount = useCallback(
    (count: number) => {
      setAlphaCount(count);
      setTimeout(() => {
        console.log('fetching alpha count');
        fetchAlphaCount();
      }, 20000);
    },
    [fetchAlphaCount]
  );

  useEffect(() => {
    if (!wallet) {
      setAlphaCount(null);
      return;
    }
    fetchAlphaCount();
  }, [wallet, fetchAlphaCount]);

  return (
    <AlphaContext.Provider
      value={{
        alphaCount,
        fetchAlphaCount,
        setOptimisticCount,
      }}
    >
      {children}
    </AlphaContext.Provider>
  );
};

const useAlpha = () => useContext(AlphaContext);

export { useAlpha, AlphaProvider };
