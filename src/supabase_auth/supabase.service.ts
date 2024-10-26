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
    const { data, error } = await this.supabase.storage
      .from('watch_images')
      .upload(`public/${file.originalname}`, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error('Supabase error:', error); // Log the error
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Generate the public URL
    const { data: signedURLData, error: urlError } = await this.supabase.storage
      .from('watch_images')
      .createSignedUrl(`public/${file.originalname}`, 60 * 60 * 24); // Expires in 24 hours

    if (urlError) {
      console.error('Error generating signed URL:', urlError.message);
      throw new Error(`Signed URL generation failed: ${urlError.message}`);
    }

    // Log and return the signed URL
    console.log(signedURLData.signedUrl);
    return signedURLData.signedUrl;
  }
}
