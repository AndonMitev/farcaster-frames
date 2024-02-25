'use server';

import { NeynarAPIClient } from '@neynar/nodejs-sdk';
import axios from 'axios';

const http = axios.create();

const neynarClient = new NeynarAPIClient('NEYNAR_API_DOCS', {
  axiosInstance: http
});

export async function createCastAction() {
  const cast = await neynarClient.publishCast(
    '2a214adb-246f-4e00-95c2-7bacd5d8cb0e',
    'Trends market {CAST_NAME}',
    {
      embeds: [
        {
          url: `https://fc-polls.vercel.app/polls/59c0737a-286f-4b35-9b0a-ca3599a45cc0/555`
        }
      ]
    }
  );
  console.log('cast', cast);
  return cast;
}
