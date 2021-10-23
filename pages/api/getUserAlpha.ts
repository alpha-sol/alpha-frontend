import { AccountInfo, Connection, PublicKey } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import BN from 'bn.js';

interface TokenAccount {
  publicKey: string;
  balance: number;
}

type Data = {
  alphaCount: number | null;
  tokenAccounts: TokenAccount[] | null;
};

const divideBnToNumber = (numerator: BN, denominator: BN): number => {
  const quotient = numerator.div(denominator).toNumber();
  const rem = numerator.umod(denominator);
  const gcd = rem.gcd(denominator);
  return quotient + rem.div(gcd).toNumber() / denominator.div(gcd).toNumber();
};

const getSplTokenBalanceFromAccountInfo = (
  accountInfo: AccountInfo<Buffer>,
  decimals: number
): number => {
  return divideBnToNumber(
    new BN(accountInfo.data.slice(64, 72), 10, 'le'),
    new BN(10).pow(new BN(decimals))
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const userPublicKey = new PublicKey(req.body.walletPublicKey);
    // @ts-ignore
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!);

    const tokenAccounts: TokenAccount[] = [];
    const response = await connection.getTokenAccountsByOwner(userPublicKey, {
      mint: new PublicKey(process.env.MINT_SPL_TOKEN_ADDRESS!),
    });

    // @ts-ignore
    const alphaCount = response.value.reduce((value, account) => {
      const balance = getSplTokenBalanceFromAccountInfo(account.account, 0);
      tokenAccounts.push({
        publicKey: account.pubkey.toBase58(),
        balance,
      });
      return value + balance;
    }, 0);

    res.status(200).json({
      alphaCount: Math.floor(alphaCount),
      tokenAccounts,
    });
  } catch (e) {
    console.error(e);
    // TODO: Don't show errors for now
    res.status(200).json({
      alphaCount: null,
      tokenAccounts: null,
    });
    // res.status(500);
  }
}
