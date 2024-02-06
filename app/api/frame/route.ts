import { PuppyImages } from '@/lib/constants';
import { getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress;

  const body = await req.json();

  console.log(body);

  const { isValid, message } = await getFrameMessage(body, {
    neynarApiKey: 'NEYNAR_ONCHAIN_KIT'
  });

  if (isValid) {
    accountAddress = message.interactor.verified_accounts[0];
  }

  console.log(body);

  return new NextResponse(
    getFrameHtmlResponse({
      image: PuppyImages.second,
      buttons: [{ label: `Hello: ${accountAddress}` }],
      post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
