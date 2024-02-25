import { PuppyImages } from '@/lib/constants';
import { getFarcasterUsersFromFID } from '@/lib/constants/actions/getFarcasterUsersFromFID';
import { createCastAction } from '@/lib/constants/actions/neynar';
import { getFrameHtmlResponse, getFrameMessage } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<any> {
  const body = await req.json();
  const { isValid, message } = await getFrameMessage(body);

  const fid = message?.interactor.fid;
  const user = await getFarcasterUsersFromFID(fid);

  const cast = await createCastAction();
  // console.log(cast.hash);

  return new NextResponse(
    getFrameHtmlResponse({
      image: PuppyImages.second,
      buttons: [
        { label: 'Visit your cast && recast', action: 'post_redirect' }
      ],
      post_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/frame`,
      input: { text: cast.hash }
    })
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
export const runtime = 'edge';
