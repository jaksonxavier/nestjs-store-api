import { Body, Controller, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import ProductGrpcService from '../interface/product-grpc-service.interface';

@Controller('product-grpc-client')
export class ProductGrpcClientController implements OnModuleInit {
  private productGrpcService: ProductGrpcService;

  constructor(@Inject('PRODUCTS_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productGrpcService =
      this.client.getService<ProductGrpcService>('ProductService');
  }

  @Post()
  async create(@Body() data) {
    try {
      const product = await this.productGrpcService.create(data).toPromise();

      return product;
    } catch (e) {
      throw new RpcException({ code: e.code, message: e.message });
    }
  }
}
