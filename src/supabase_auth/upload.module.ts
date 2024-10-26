// upload.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from './supabase.service';
import { UploadController } from './superbase.controller';

@Module({
  imports: [ConfigModule], // Import ConfigModule here
  controllers: [UploadController],
  providers: [SupabaseService],
})
export class UploadModule {}
