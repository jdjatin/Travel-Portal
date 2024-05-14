import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/createUser.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class AdminUserCrudService {

  constructor(
    @InjectRepository(User)
    private readonly users:Repository<User>,
  ) {}



  async create(createUserDto: CreateUsersDto): Promise<User> {

    const { email, password, firstName, lastName,
       token,
        isVerified, isActive } = createUserDto;

    // const min = 1000;
    // const max = 9999;
    // const tokenGenerated= Math.floor(Math.random() * (max - min + 1)) + min;

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the encrypted password
    const user = this.users.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      token: String(token),
      isVerified: Boolean(isVerified),
      isActive: Boolean(isActive)
      
    });

    // Save the user in the database
    await this.users.save(user);

    // Return the newly created user object
    return user;
  }

  async findAll() {
    return await this.users.find();
  }

  async findOne(id): Promise<User> {
    try{return await this.users.findOne({where:{'id':id}});}
    catch(error){return error;}
  }

  async update(id, updateAdminUserCrudDto:UpdateUserDto) {
     await this.users.update(id,updateAdminUserCrudDto);
    return await this.users.findOne({where:{id}})
  }

  remove(id):Promise<void> {
    return this.users.delete(id).then(() => undefined);
  }
}
