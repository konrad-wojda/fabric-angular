import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrawingsModule } from './drawings/drawings.module';
import { Drawings } from './drawings/drawings.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DrawingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
