import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'shop-nest',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
      retryAttempts: 20,
      retryDelay: 10000
    }),
    ProductModule
  ],
})
export class AppModule {}
