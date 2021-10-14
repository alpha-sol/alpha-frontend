import { Metadata } from '../utils/metadata';
import { mintTable } from './tables';

export interface TargetMintRecord {
  id: string;
  mint: string;
  name: string;
  redeemed: boolean;
  txSignature: string;
}

export interface TargetMintItem extends TargetMintRecord {
  imageUri: string | null;
  metadata: Metadata;
}

const fetchRecords = (orStatement: string) =>
  new Promise<TargetMintRecord[]>((resolve) => {
    const allRecords: TargetMintRecord[] = [];
    mintTable
      .select({
        filterByFormula: `OR(${orStatement})`,
      })
      .eachPage(
        (records, fetchNextPage) => {
          for (let i = 0; i < records.length; i++) {
            allRecords.push({
              id: records[i].id,
              mint: records[i].get('mint') as unknown as string,
              name: records[i].get('name') as unknown as string,
              redeemed: (records[i].get('redeemed') ||
                false) as unknown as boolean,
              txSignature: records[i].get('txSignature') as unknown as string,
            });
          }
          fetchNextPage();
        },
        (err: Error) => {
          if (err) {
            console.error(err);
            resolve([]);
          }
          resolve(allRecords);
        }
      );
  });

const fetchImageURI = async (arweaveUri: string) => {
  const arweaveRes = await fetch(arweaveUri);
  const arweaveJSON = await arweaveRes.json();
  return arweaveJSON.image;
};

export const getTargetMintsMetadata = async (
  metadataRecords: Metadata[]
): Promise<TargetMintItem[]> => {
  const mintRecordsOrStatement = metadataRecords.reduce(
    (statement, meta, index) => {
      const queryStr = `{mint} = "${meta.mint}"`;
      if (index === 0) {
        return `${queryStr}`;
      }
      return `${statement}, ${queryStr}`;
    },
    ''
  );

  const ourRecords = await fetchRecords(mintRecordsOrStatement);

  const imageFetches = metadataRecords.map(async (metadata) => {
    const imageUri = await fetchImageURI(metadata.data.uri);
    return { [metadata.mint]: imageUri || null };
  });
  const images = await Promise.all(imageFetches);
  // console.log(ourRecords);
  const mergedRecords = ourRecords.map((record) => {
    const metadata = metadataRecords.find(
      (meta) => record.mint === meta.mint
    ) as unknown as Metadata;
    return {
      ...record,
      metadata,
      imageUri: (images.find((image) => image[metadata.mint] !== undefined) ||
        {})[metadata.mint],
    };
  });

  return mergedRecords;
};

const getMintRecord = (airtableId: string) =>
  new Promise<TargetMintRecord>((resolve, reject) => {
    mintTable.find(airtableId, (err, record) => {
      if (err) {
        reject('Could not find record');
      }
      resolve({
        id: record!.id,
        mint: record!.get('mint') as unknown as string,
        name: record!.get('name') as unknown as string,
        redeemed: (record!.get('redeemed') || false) as unknown as boolean,
        txSignature: record!.get('txSignature') as unknown as string,
      });
    });
  });

export const getTargetMintRecord = async (
  airtableId: string
): Promise<TargetMintRecord> => {
  const record = await getMintRecord(airtableId);
  return record;
};

export const updateTargetMintRecord = (
  id: string,
  fields: Record<string, string | boolean>
) =>
  new Promise((resolve, reject) => {
    mintTable.update(
      [
        {
          id,
          fields: {
            ...fields,
          },
        },
      ],
      (err, records) => {
        if (err) {
          reject('Could not update record.');
        }
        if (records && records[0]) {
          resolve('success');
        }
        reject('Could not update record.');
      }
    );
  });
