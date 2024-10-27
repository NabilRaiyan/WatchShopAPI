// upload.controller.ts
import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from './supabase.service';

@Controller('upload')
export class UploadController {
  constructor(private supabaseService: SupabaseService) {}
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // Set a 5 MB size limit
      fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
          callback(null, true);
        } else {
          callback(new Error('Only image files are allowed!'), false);
        }
      },
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    // console.log('Received file:', file); // Check if file is correctly received
    if (!file) {
      throw new BadRequestException(
        'No file uploaded. Please upload an image.',
      );
    }

    const imageUrl = await this.supabaseService.uploadImage(file);
    return { image_url: imageUrl };
  }
}
