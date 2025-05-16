import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { AddressDto } from './dto/address.dto';
import { IRequest } from 'src/shared/interfaces/request';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/shared/enum/roles';
import { ApiOperation } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.User)
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  @ApiOperation({ summary: 'Create address' })
  create(@Request() req: IRequest, @Body() createAddressDto: AddressDto) {
    return this.addressesService.create(req.user, createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all addresses' })
  findAll(
    @Request() req: IRequest,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.addressesService.findAll(req.user, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get address by id' })
  findOne(@Request() req: IRequest, @Param('id') id: string) {
    return this.addressesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update address' })
  update(
    @Request() req: IRequest,
    @Param('id') id: string,
    @Body() updateAddressDto: AddressDto,
  ) {
    return this.addressesService.update(+id, req.user, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete address' })
  remove(@Request() req: IRequest, @Param('id') id: string) {
    return this.addressesService.remove(+id, req.user);
  }
}
