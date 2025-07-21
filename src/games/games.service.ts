import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetGamesDto } from './dto/get-games.dto';

@Injectable()
export class GamesService {
    constructor(private prisma: PrismaService) { }

    async getAll(params: GetGamesDto) {
        const { search, page = 1, limit = 10 } = params;
        const pageNum = parseInt(page.toString(), 10) || 1;
        const limitNum = parseInt(limit.toString(), 10) || 10;
        const skip = (pageNum - 1) * limitNum;

        const where = search
            ? {
                OR: [
                    { title: { contains: search } },
                    { genre: { contains: search } },
                    { publisher: { contains: search } },
                    { developer: { contains: search } },
                ],
            }
            : {};

        const [games, total] = await Promise.all([
            this.prisma.game.findMany({
                where,
                include: { platforms: true },
                skip,
                take: limitNum,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.game.count({ where }),
        ]);

        return {
            data: games,
            pagination: {
                page: pageNum,
                limit: limitNum,
                total,
                totalPages: Math.ceil(total / limitNum),
            },
        };
    }

    async getById(id: string) {
        return this.prisma.game.findUnique({
            where: { id },
            include: { platforms: true },
        });
    }
}
