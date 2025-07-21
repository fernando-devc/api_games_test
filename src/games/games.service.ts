import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetGamesDto } from './dto/get-games.dto';

@Injectable()
export class GamesService {
    constructor(private prisma: PrismaService) { }

    async getAll(params: GetGamesDto) {
        const { search, page = 1, limit = 10 } = params;
        const skip = (page - 1) * limit;

        const where = search
            ? {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { genre: { contains: search, mode: 'insensitive' } },
                    { publisher: { contains: search, mode: 'insensitive' } },
                    { developer: { contains: search, mode: 'insensitive' } },
                ],
            }
            : {};

        const [games, total] = await Promise.all([
            this.prisma.game.findMany({
                where,
                include: { platforms: true },
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.game.count({ where }),
        ]);

        return {
            data: games,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
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
