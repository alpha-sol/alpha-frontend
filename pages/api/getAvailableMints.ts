// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { AccountInfo, Connection, PublicKey } from '@solana/web3.js';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTargetMintsMetadata, TargetMintItem } from '../../airtable/mints';
// import { decodeMetadata } from '../../utils/decodeMetadata';
import {
  decodeMetadata,
  getMetadataAccount,
  Metadata,
} from '../../utils/metadata';

const HOLDER_TARGET_NFT_AUTHORITIES =
  process.env.HOLDER_TARGET_NFT_AUTHORITIES!.split('|');

type Data = {
  mints: TargetMintItem[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ mints: [] });
  // try {
  //   return;
  //   const publicKey = new PublicKey(req.body.walletPublicKey);
  //   // @ts-ignore
  //   const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_HOST!);

  //   const response = await connection.getParsedTokenAccountsByOwner(publicKey, {
  //     programId: TOKEN_PROGRAM_ID,
  //   });

  //   const mints = await Promise.all(
  //     response.value
  //       .filter(
  //         (accInfo) =>
  //           accInfo.account.data.parsed.info.tokenAmount.uiAmount !== 0
  //       )
  //       .map((accInfo) =>
  //         getMetadataAccount(accInfo.account.data.parsed.info.mint)
  //       )
  //   );

  //   const mintPubkeys = mints.map((m) => new PublicKey(m));

  //   let multipleAccounts: AccountInfo<Buffer>[] = [];
  //   const chunk = 100;
  //   for (let i = 0; i < mintPubkeys.length; i += chunk) {
  //     const pubKeysSlice = mintPubkeys.slice(i, i + chunk);
  //     const nextAccountInfo = await connection.getMultipleAccountsInfo(
  //       pubKeysSlice
  //     );
  //     if (!nextAccountInfo) continue;
  //     // @ts-ignore
  //     multipleAccounts = multipleAccounts.concat(nextAccountInfo);
  //   }

  //   const nftMetadata: Metadata[] = multipleAccounts
  //     .filter((account) => account !== null)
  //     .map((account) => decodeMetadata(account!.data))
  //     .filter((account) =>
  //       HOLDER_TARGET_NFT_AUTHORITIES.includes(account!.updateAuthority)
  //     ) as unknown as Metadata[];

  //   if (!nftMetadata || nftMetadata.length === 0) {
  //     res.status(200).json({ mints: [] });
  //     return;
  //   }
  //   const mergedNFTRecords = await getTargetMintsMetadata(nftMetadata);

  //   res.status(200).json({ mints: mergedNFTRecords });
  //   return;
  // } catch (e) {
  //   console.error(e);
  //   // TODO: Don't show errors for now
  //   res.status(200).json({ mints: [] });
  //   // res.status(500);
  // }
}
