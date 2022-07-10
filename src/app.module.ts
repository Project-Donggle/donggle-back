import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [BoardModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
