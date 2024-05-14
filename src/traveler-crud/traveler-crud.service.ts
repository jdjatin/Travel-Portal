import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTravelerCrudDto } from './dto/create-traveler-crud.dto';
import { UpdateTravelerCrudDto } from './dto/update-traveler-crud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TravelerCrud } from './entities/traveler-crud.entity';
import { Repository } from 'typeorm/repository/Repository';

@Injectable()
export class TravelerCrudService {
  constructor(
    @InjectRepository(TravelerCrud)
    private readonly travelerCrud:Repository<TravelerCrud>
  ) {}

  
  async create(createTravelerCrudDto: CreateTravelerCrudDto, userId) {

    try {

      const traveler = this.travelerCrud.create({
        ...createTravelerCrudDto,
        userId,
      });
      const savedTraveler = await this.travelerCrud.save({...createTravelerCrudDto,'userId':userId.userId} );
      return savedTraveler;

    } catch (error) {

      throw error;
    
    }
   


  }



  async findOne(userId) {
    try {
      // console.log('service',userId)
      return await this.travelerCrud.find({where:{'userId':userId.userId}}) ;
    } catch (error) {
      return error;
    }
    
  }

  async update(id: number, updateTravelerCrudDto: UpdateTravelerCrudDto, user) {
    const updatableRecords = await this.travelerCrud.find({ where: { userId: user.userId } });

  const recordToUpdate = updatableRecords.find((record) => record.id === id);
  if (!recordToUpdate) {
    throw new NotFoundException(`Record with id ${id} not found`);
  }

  Object.assign(recordToUpdate, updateTravelerCrudDto);
  return await this.travelerCrud.save(recordToUpdate);

  }

  async remove(id: number, user) {
    // const userRecords= this.travelerCrud.find({where:{'userId':user.userId}})
    const userRecords = await this.travelerCrud.find({ where: { 'userId':user.userId } });
  const recordToDelete = userRecords.find((record) => record.id === id);

  if (!recordToDelete) {
    throw new NotFoundException(`Record with id ${id} and userId ${user.userId} not found`);
  }

  await this.travelerCrud.delete(id);

  return `Your record with id ${id} has been successfully removed!`;
  }
}
