import { db } from '@/lib/db';
import { BoardType } from '@/types/Pedal';
import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    // TODO - Try to get user session from next-auth instead of query params userId
    // const session = await getServerSession();
    // const user = session?.user;

    // if (!user) {
    //   return NextResponse.json(
    //     { error: 'Unauthorized', pedals: null },
    //     { status: 401 }
    //   );
    // }
    let userId = '';
    const { searchParams } = new URL(request.url);

    if (searchParams.has('userId')) {
      userId = searchParams.get('userId') || '';
    }

    const boards = await db.board.findMany({
      where: {
        ...(searchParams.has('userId') ? { userId } : {}),
      },
      include: { pedals: { include: { pots: true } } },
    });

    return NextResponse.json({ error: null, boards }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, boards: null },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', boards: null },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BoardType;

    const createdPedal = await db.board.create({
      data: {
        name: body.name,
        userId: body.userId || '',
        pedals: {
          create: [
            ...(body.pedals?.length
              ? body.pedals.map((pedal) => {
                  return {
                    isActive: pedal.isActive,
                    isTemplate: false,
                    name: pedal.name,
                    pots: {
                      create: [
                        ...(pedal.pots?.length
                          ? pedal.pots.map((pot) => {
                              return {
                                name: pot.name,
                                max: pot.max,
                                min: pot.min,
                                defaultValue: pot.defaultValue,
                                value: pot.value,
                              };
                            })
                          : []),
                      ],
                    },
                  };
                })
              : []),
          ],
        },
      },
      include: {
        pedals: {
          include: {
            pots: true,
          },
        },
      },
    });

    return NextResponse.json({ error: null, success: true }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues, success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal Server Error', success: false },
      { status: 500 }
    );
  }
}
