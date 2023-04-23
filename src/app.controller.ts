import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('/healthz')
  @ApiOperation({ summary: 'checks if app is up and running' })
  @ApiResponse({ status: 200, description: 'ok' })
  healthz(): string {
    return 'ok';
  }
}
