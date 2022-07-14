import { Controller, Param, Post, Session } from '@nestjs/common';
import { SessionData } from 'express-session';
import { ObjectId } from 'mongoose';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post(':id')
  getReport(@Param('id') id: ObjectId, @Session() session: SessionData) {
    try {
      return this.reportService.handleReport(id, session.user);
    } catch (error) {
      return error;
    }
  }
}
