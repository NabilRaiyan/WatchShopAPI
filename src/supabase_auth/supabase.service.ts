import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabase;

  constructor(private configService: ConfigService) {
    this.supabase = createClient(
      this.configService.get<string>('SUPABASE_URL'),
      this.configService.get<string>('SUPABASE_ANON_KEY'),
    );
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const { error } = await this.supabase.storage
      .from('watch_images')
      .upload(`public/${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error('Supabase error:', error); // Log the error
      throw new Error(`Upload failed: ${error.message}`);
    }

    const twoYearsInSeconds = 2 * 365 * 24 * 60 * 60; // 2 years in seconds
    const { data: signedURLData, error: urlError } = await this.supabase.storage
      .from('watch_images')
      .createSignedUrl(`public/${file.originalname}`, twoYearsInSeconds);

    if (urlError) {
      console.error('Error generating signed URL:', urlError.message);
      throw new Error(`Signed URL generation failed: ${urlError.message}`);
    }

    const signedImageUrl = signedURLData.signedUrl;

    return signedImageUrl; // Return the signed URL
  }
}
