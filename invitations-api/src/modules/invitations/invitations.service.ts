import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitations } from '../../entities/Invitations';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import {Images} from "../../entities/Images";

@Injectable()
export class InvitationsService {
    constructor(
        @InjectRepository(Invitations)
        private readonly invitationsRepository: Repository<Invitations>,
        @InjectRepository(Images)
        private readonly imagesRepository: Repository<Images>,
    ) {}

     async findAll() {
        const invitations = await this.invitationsRepository.find();
        return {data: invitations, message: 'Invitations retrieved successfully'};
    }

    async findOne(id: number) {
        const invitation = await this.invitationsRepository.findOne({ where: { id }, relations: ['families', 'images'] });
        return {data: invitation, message: 'Invitation retrieved successfully'};
    }

    async create(createInvitationDto: CreateInvitationDto) {
        // Crear la invitación
        const { images, ...invitationData } = createInvitationDto;
        const invitation = this.invitationsRepository.create(invitationData);
        const savedInvitation = await this.invitationsRepository.save(invitation);

        // Crear las imágenes asociadas
        if (images && images.length > 0) {
            const imageEntities = images.map((image) =>
                this.imagesRepository.create({
                    ...image,
                    invitation: savedInvitation,
                }),
            );
            await this.imagesRepository.save(imageEntities);
        }

        return {data: savedInvitation, message: savedInvitation ? 'Invitation created successfully' : 'Failed to create invitation'};
    }

    async update(id: number, updateInvitationDto: UpdateInvitationDto) {
        const { images, ...invitationData } = updateInvitationDto;

        // Update the invitation
        await this.invitationsRepository.update(id, invitationData);
        const updatedInvitation = await this.invitationsRepository.findOne({ where: { id } });

        if (!updatedInvitation) {
            throw new Error('Invitation not found');
        }

        // Handle images
        if (images && images.length > 0) {
            for (const image of images) {
                if (image.id) {
                    // Update existing image
                    await this.imagesRepository.update(image.id, image);
                } else {
                    // Add new image
                    const newImage = this.imagesRepository.create({
                        ...image,
                        invitation: updatedInvitation,
                    });
                    await this.imagesRepository.save(newImage);
                }
            }
        }

        return {data: updatedInvitation, message: updatedInvitation ? 'Invitation updated successfully' : 'Failed to update invitation'};
    }

    async remove(id: number) {
        const  result = await this.invitationsRepository.delete(id);
        return {data: result.affected ? result : null,  message: result.affected ? 'Invitation deleted successfully' : 'Failed to delete invitation' }; ;
    }
}
