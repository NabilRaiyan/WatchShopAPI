import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'watchApiDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
