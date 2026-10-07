import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamilyAccessService } from './family-access.service';
import { CreateFamilyAccessDto } from './dto/create-family-access.dto';
import { UpdateFamilyAccessDto } from './dto/update-family-access.dto';

@Controller('family-access')
export class FamilyAccessController {
    constructor(private readonly familyAccessService: FamilyAccessService) {}

    @Post()
    create(@Body() createFamilyAccessDto: CreateFamilyAccessDto) {
        return this.familyAccessService.create(createFamilyAccessDto);
    }

    @Get()
    findAll() {
        return this.familyAccessService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.familyAccessService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFamilyAccessDto: UpdateFamilyAccessDto) {
        return this.familyAccessService.update(+id, updateFamilyAccessDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.familyAccessService.remove(+id);
    }
}
