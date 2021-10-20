// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import {
  Connection,
  Keypair,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  getTargetMintRecord,
  updateTargetMintRecord,
} from '../../airtable/mints';

const NETWORK = process.env.NETWORK!;

type Data = {
  txSignature: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ txSignature: null });
  // try {
  //   const record = await getTargetMintRecord(req.body.airtableId);
  //   if (record.redeemed) {
  //     res.status(200).json({ txSignature: null });
  //     return;
  //   }

  //   const userPublicKey = new PublicKey(req.body.walletPublicKey);
  //   // @ts-ignore
  //   const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!);

  //   const splMintKey = Keypair.fromSecretKey(
  //     Uint8Array.from(
  //       process.env.MINT_PRIVATE_KEY!.split(',').map((n) => parseInt(n))
  //     )
  //   );
  //   const splMint = new PublicKey(process.env.MINT_SPL_TOKEN_ADDRESS!);
  //   const splToken = new Token(
  //     connection,
  //     splMint,
  //     TOKEN_PROGRAM_ID,
  //     splMintKey
  //   );

  //   const mintTokenAccount = await splToken.getOrCreateAssociatedAccountInfo(
  //     splMintKey.publicKey
  //   );
  //   const userTokenAccount = await splToken.getOrCreateAssociatedAccountInfo(
  //     userPublicKey
  //   );

  //   await updateTargetMintRecord(req.body.airtableId, {
  //     redeemed: true,
  //   });

  //   const transaction = new Transaction().add(
  //     Token.createTransferInstruction(
  //       TOKEN_PROGRAM_ID,
  //       mintTokenAccount.address,
  //       userTokenAccount.address,
  //       splMintKey.publicKey,
  //       [],
  //       1
  //     )
  //   );

  //   const signature = await sendAndConfirmTransaction(connection, transaction, [
  //     splMintKey,
  //   ]);

  //   await updateTargetMintRecord(req.body.airtableId, {
  //     txSignature: signature,
  //   });

  //   res.status(200).json({ txSignature: signature });
  // } catch (e) {
  //   console.error(e);
  //   // TODO: Don't show errors for now
  //   res.status(200).json({ txSignature: null });
  //   // res.status(500);
  // }
}
