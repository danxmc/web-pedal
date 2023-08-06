import { db } from '@/lib/db';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    let isTemplate = false;
    const { searchParams } = new URL(request.url);

    if (searchParams.has('isTemplate')) {
      const isTemplateSearchParam = searchParams.get('isTemplate') || 'false';
      isTemplate = /true/.test(isTemplateSearchParam);
    }

    const templatePedals = await db.pedal.findMany({
      where: {
        ...(searchParams.has('isTemplate') ? { isTemplate } : {}),
      },
      include: { pots: true },
    });

    return NextResponse.json(
      { error: null, pedals: templatePedals },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, pedals: null },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', pedals: null },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    return NextResponse.json({ error: null, success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', success: false, error2: error },
      { status: 500 }
    );
  }
}
