import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private readonly blog:Repository<Blog>
  ) {}
  create(createBlogDto: CreateBlogDto): Promise<Blog> {
    if (!createBlogDto.description) {
      throw new Error('Description is required.');
    }
    return this.blog.save(createBlogDto)
  }

  findAll(): Promise<Blog[]> {
    return this.blog.find();
  }

  findOne(id): Promise<Blog> {
    return this.blog.findOne({ where: { id: id } });
  }

  async update(id, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    await this.blog.update(id,updateBlogDto) ;
    return this.blog.findOne(id)
  }

  remove(id): Promise<void> {
    return this.blog.delete(id).then(() => undefined);
  }
}
