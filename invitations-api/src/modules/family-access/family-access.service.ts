import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FamilyAccess } from '../../entities/FamilyAccess';
import { CreateFamilyAccessDto } from './dto/create-family-access.dto';
import { UpdateFamilyAccessDto } from './dto/update-family-access.dto';

@Injectable()
export class FamilyAccessService {
    constructor(
        @InjectRepository(FamilyAccess)
        private readonly familyAccessRepository: Repository<FamilyAccess>,
    ) {}

    async findAll() {
        const familyAccess = await this.familyAccessRepository.find({ relations: ['family'] });
        return {data: familyAccess, message: 'Family access retrieved successfully'};
    }

    async findOne(id: number) {
        const familyAccess = await this.familyAccessRepository.findOne({ where: { id }, relations: ['family'] });
        return {data: familyAccess, message: 'Family access retrieved successfully'};
    }

   async create(createFamilyAccessDto: CreateFamilyAccessDto) {
       const familyAccessy = this.familyAccessRepository.create(createFamilyAccessDto);
       const faSaved = await this.familyAccessRepository.save(familyAccessy);
       return {data: faSaved, message: faSaved ? 'Family access  created successfully' : 'Failed to create family access'};
   }
    async update(id: number, updateFamilyAccessDto: UpdateFamilyAccessDto) {
        await this.familyAccessRepository.update(id, updateFamilyAccessDto);
        const updatedInvitation = await this.familyAccessRepository.findOne({ where: { id } });
        if (updateFamilyAccessDto.isConfirmAttendance) {

        }
        return {data: updatedInvitation, message: updatedInvitation ? 'Family access updated successfully' : 'Failed to update family access'};
    }

    async remove(id: number) {
        const result  = await this.familyAccessRepository.delete(id);
        return {data: result.affected ? result : null,  message: result.affected ? 'Family access deleted successfully' : 'Failed to delete family access' }; ;
    }
}
