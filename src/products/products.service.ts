import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private repository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = this.repository.create(createProductDto);

    await this.repository.save(product);

    return product;
  }

  async findAll() {
    const products = await this.repository.find();

    return products;
  }

  async findOne(id: number) {
    const product = this.repository.findOneOrFail(id);

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} nonexistent`);
    }

    Object.assign(product, updateProductDto);

    await this.repository.save(product);

    return product;
  }

  async remove(id: number) {
    const product = await this.repository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product #${id} nonexistent`);
    }

    await this.repository.delete(id);
  }
}
