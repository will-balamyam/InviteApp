import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { CreateFamilyDto } from './dto/create-family.dto';
import { UpdateFamilyDto } from './dto/update-family.dto';

@Controller('families')
export class FamiliesController {
    constructor(private readonly familiesService: FamiliesService) {}

    @Post()
    create(@Body() createFamilyDto: CreateFamilyDto) {
        return this.familiesService.create(createFamilyDto);
    }

    @Get()
    findAll() {
        return this.familiesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.familiesService.findOne(+id);
    }

    @Get('byCode/:familyCode')
    findOneByCode(@Param('familyCode') familyCode: string) {
        return this.familiesService.finOneByCode(familyCode);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateFamilyDto: UpdateFamilyDto) {
        return this.familiesService.update(+id, updateFamilyDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.familiesService.remove(+id);
    }

    @Post(':id/send-invitation-whats')
    sendInvitationWhats(@Param('id') id: string) {
        return this.familiesService.sendInvitationWhats(+id);
    }

    @Post(':id/send-confirmation-whats')
    sendConfirmationWhats(@Param('id') id: string) {
        return this.familiesService.sendConfirmationParent(id);
    }
}
