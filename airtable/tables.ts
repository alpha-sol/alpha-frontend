import Airtable from 'airtable';

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY! }).base(
  process.env.AIRTABLE_BASE!
);

export const mintTable = base(process.env.AIRTABLE_TARGET_TABLE!);
