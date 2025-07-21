import { PrismaClient } from '../generated/prisma';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();


interface PlatformData {
  name: string;
}

interface GameData {
  title: string;
  description: string;
  genre: string;
  platformType: string;
  publisher: string;
  developer: string;
  releaseDate: string;
  rating: number;
  price: number;
  imageUrl: string;
}

function readJsonData<T>(fileName: string): T[] {
  try {
    const filePath = path.join(__dirname, 'data', fileName);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`❌ Error reading file ${fileName}:`, error);
    throw error;
  }
}

async function seedPlatforms(): Promise<void> {
  console.log('🎮 Creating platforms...');
  
  const platformsData = readJsonData<PlatformData>('platforms.json');
  
  const platforms = await Promise.all(
    platformsData.map(platformData =>
      prisma.platform.upsert({
        where: { name: platformData.name },
        update: {},
        create: { name: platformData.name },
      })
    )
  );

  console.log(`✅ ${platforms.length} platforms created/updated`);
}

async function seedGames(): Promise<void> {
  console.log('🎯 Creating games...');
  
  const gamesData = readJsonData<GameData>('games.json');
  
  let gamesCreated = 0;
  
  for (const gameData of gamesData) {
    try {
      await prisma.game.upsert({
        where: { title: gameData.title },
        update: {},
        create: {
          title: gameData.title,
          description: gameData.description,
          genre: gameData.genre,
          platformType: gameData.platformType,
          publisher: gameData.publisher,
          developer: gameData.developer,
          releaseDate: new Date(gameData.releaseDate),
          rating: gameData.rating,
          price: gameData.price,
          imageUrl: gameData.imageUrl,
        },
      });
      
      gamesCreated++;
      console.log(`  ✓ ${gameData.title}`);
    } catch (error) {
      console.error(`  ❌ Error creating game ${gameData.title}:`, error);
    }
  }

  console.log(`✅ ${gamesCreated} games created/updated`);
}

async function main() {
  console.log('🌱 Starting database seed...');
  console.log('📂 Reading data from JSON files...');

  try {
    // Create platforms first
    await seedPlatforms();
    
    // Then create games
    await seedGames();
    
    console.log('🎉 Seed completed successfully!');
  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
