import { PuppyImages } from '@/lib/constants';
import { getFarcasterUsersFromFID } from '@/lib/constants/actions/getFarcasterUsersFromFID';
import { getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<any> {
  console.log('called');
  const body = await req.json();
  const sp = req.url;

  console.log('body', body);

  const { isValid, message } = await getFrameMessage(body);

  const fid = message?.interactor.fid;
  const user = await getFarcasterUsersFromFID(fid);

  return new NextResponse(
    getFrameHtmlResponse({
      image: PuppyImages.second,
      buttons: [
        { label: 'first' },
        { label: 'second' },
        { label: 'third' },
        { label: 'fourth' }
      ],
      post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
export const runtime = 'edge';
