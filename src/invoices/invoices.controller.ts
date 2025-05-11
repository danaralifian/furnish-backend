import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/shared/enum/roles';
import { IRequest } from 'src/shared/interfaces/request';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  findAll(
    @Request() req: IRequest,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.invoicesService.findAll(req.user, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoicesService.findOne(+id);
  }
}
