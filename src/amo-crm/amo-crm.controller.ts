import { Controller, Get, Query } from '@nestjs/common';
import { AmoCrmService } from './amo-crm.service';
@Controller('api')
export class AmoCrmController {
  constructor(private readonly amocrmService: AmoCrmService) {}

  @Get('leads')
  async getLeads(@Query('id') id?: number): Promise<any> {
    try {
      return this.amocrmService.getLeads(id);
    } catch (err) {
      return {
        status: 500,
        message: err,
      };
    }
  }
  @Get('contact')
  async getContact(@Query('id') id: number): Promise<any> {
    try {
      return this.amocrmService.getContact(id);
    } catch (err) {
      return {
        status: 500,
        message: err,
      };
    }
  }
}
