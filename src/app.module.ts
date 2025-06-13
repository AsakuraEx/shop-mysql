import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'shop-nest',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      retryAttempts: 20,
      retryDelay: 10000
    })
  ],
})
export class AppModule {}
