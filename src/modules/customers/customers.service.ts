import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../../database/prisma.service';
import { Status } from '../../enum/customerStatus';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateCustomerDto) {
    return this.prismaService.customer.create({ data });
  }

  async findAll(page: number, perPage: number) {
    const skip = page * perPage - perPage;

    return this.prismaService.customer.findMany({
      skip,
      take: perPage,
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    return this.prismaService.customer.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, data: UpdateCustomerDto) {
    return this.prismaService.customer.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prismaService.customer.update({
      where: { id },
      data: {
        status: Status.DISABLE,
      },
    });
  }
}
