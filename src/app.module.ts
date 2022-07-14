import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './boards/board.module';
import { ReportModule } from './reports/report.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/donggle'),
    BoardModule,
    ReportModule,
    UserModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
