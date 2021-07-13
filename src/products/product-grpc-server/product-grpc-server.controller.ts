import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from 'grpc';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductsService } from '../products.service';

@Controller()
export class ProductGrpcServerController {
  constructor(private productsService: ProductsService) {}

  @GrpcMethod('ProductService', 'Create')
  async create(
    data: CreateProductDto,
    metadata: Metadata,
    call: ServerUnaryCall<CreateProductDto>,
  ) {
    const product = await this.productsService.create(data);

    return product;
  }

  @GrpcMethod('ProductService', 'FindAll')
  async findAll(
    data: any,
    metadata: Metadata,
    call: ServerUnaryCall<{ id: number }>,
  ) {
    const products = await this.productsService.findAll();

    return { products };
  }

  @GrpcMethod('ProductService', 'FindOne')
  async findOne(
    data: { id: number },
    metadata: Metadata,
    call: ServerUnaryCall<{ id: number }>,
  ) {
    const { id } = data;
    const product = await this.productsService.findOne(id);

    return product;
  }

  @GrpcMethod('ProductService', 'Update')
  async update(
    data: { id: number; name: string; price: number },
    metadata: Metadata,
    call: ServerUnaryCall<CreateProductDto>,
  ) {
    const { id, name, price } = data;
    const product = await this.productsService.update(id, { name, price });

    return product;
  }

  @GrpcMethod('ProductService', 'Remove')
  async remove(
    data: { id: number },
    metadata: Metadata,
    call: ServerUnaryCall<{ id: number }>,
  ) {
    const { id } = data;
    await this.productsService.remove(id);
  }
}
