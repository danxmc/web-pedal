import { db } from '@/lib/db';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

type getParams = {
  params: { pedal: string };
};
export async function GET(request: NextRequest, { params }: getParams) {
  try {
    const pedalId = params.pedal;
    const pedal = db.pedal.findUnique({ where: { id: pedalId } });

    return NextResponse.json({ error: null, pedal });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, pedal: null },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', pedal: null },
      { status: 500 }
    );
  }
}
