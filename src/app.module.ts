import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { ClientModule } from './modules/client/client.module';

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
    }),
    ProductModule,
    ClientModule
  ],
})
export class AppModule {}
