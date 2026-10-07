import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Families} from "../../entities/Families";
import {FamilyAccess} from "../../entities/FamilyAccess";
import {Repository} from "typeorm";
import {CreateFamilyDto} from "./dto/create-family.dto";
import {UpdateFamilyDto} from "./dto/update-family.dto";
import Twilio from "twilio";

@Injectable()
export class FamiliesService {
    private client: Twilio.Twilio;
    constructor(
        @InjectRepository(Families)
        private readonly familiesRepository: Repository<Families>,
        @InjectRepository(FamilyAccess)
        private readonly familyAccessRepository: Repository<FamilyAccess>,
    ) {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        this.client = Twilio(accountSid, authToken);
    }

    async findAll() {
        const listAllFamilies =  await this.familiesRepository.find();
        return {data: listAllFamilies, message: 'Family retrieved successfully'};
    }

    async findOne(id: number) {
        const family = await this.familiesRepository.findOne({ where: { id },
            relations: ['invitation', 'familyAccesses']});
        return {data: family, message: 'Family retrieved successfully'};
    }

    async finOneByCode(familyCode: string) {
        const family = await this.familiesRepository.findOne({ where: { familyCode },
            relations: ['invitation', 'familyAccesses']});
        return {data: family, message: 'Family retrieved successfully'};
    }

    async create(createFamilyDto: CreateFamilyDto) {
        // Crear la familia
        const family = this.familiesRepository.create({
            familyName: createFamilyDto.familyName,
            familyCode: createFamilyDto.familyCode,
            contactEmail: createFamilyDto.contactEmail,
            contactPhone: createFamilyDto.contactPhone,
            invitation: { id: createFamilyDto.invitation }
        });
        const savedFamily = await this.familiesRepository.save(family);

        // Crear familyAccesses si existen
        if (createFamilyDto.familyAccesses && createFamilyDto.familyAccesses.length > 0) {
            const familyAccesses = createFamilyDto.familyAccesses.map(access =>
                this.familyAccessRepository.create({
                    memberName: access.memberName,
                    confirmed: access.confirmed,
                    family: savedFamily
                })
            );
            await this.familyAccessRepository.save(familyAccesses);
        }

        return {
            data: savedFamily,
            message: savedFamily ? 'Family created successfully' : 'Failed to create family'
        };
    }

    async update(id: number, updateFamilyDto: UpdateFamilyDto) {
        // Actualizar datos básicos de la familia
        const updateData = {
            familyName: updateFamilyDto.familyName,
            familyCode: updateFamilyDto.familyCode,
            contactEmail: updateFamilyDto.contactEmail,
            contactPhone: updateFamilyDto.contactPhone,
            invitation: updateFamilyDto.invitation ? { id: updateFamilyDto.invitation } : undefined
        };

        await this.familiesRepository.update(id, updateData);

        // Manejar eliminaciones de familyAccess
        if (updateFamilyDto.familyAccessesToDelete && updateFamilyDto.familyAccessesToDelete.length > 0) {
            await this.familyAccessRepository.delete(updateFamilyDto.familyAccessesToDelete);
        }

        // Manejar familyAccesses (crear nuevos o actualizar existentes)
        if (updateFamilyDto.familyAccesses && updateFamilyDto.familyAccesses.length > 0) {
            for (const access of updateFamilyDto.familyAccesses) {
                if (access.id) {
                    // Actualizar existente
                    await this.familyAccessRepository.update(access.id, {
                        memberName: access.memberName,
                        confirmed: access.confirmed
                    });
                } else {
                    // Crear nuevo
                    const newAccess = this.familyAccessRepository.create({
                        memberName: access.memberName,
                        confirmed: access.confirmed,
                        family: { id: id }
                    });
                    await this.familyAccessRepository.save(newAccess);
                }
            }
        }

        const updatedFamily = await this.familiesRepository.findOne({
            where: { id },
            relations: ['invitation', 'familyAccesses']
        });

        return {
            data: updatedFamily,
            message: updatedFamily ? 'Family updated successfully' : 'Failed to update family'
        };
    }

    async remove(id: number) {
        const result = await this.familiesRepository.delete(id);
        return {
            data: result.affected ? result : null,
            message: result.affected ? 'Family deleted successfully' : 'Failed to delete family'
        };
    }

    async sendInvitationWhats(familyId: number) {
        const family = await this.familiesRepository.findOne({
            where: { id: familyId },
            relations: ['invitation'], // Carga la relación con Invitations
        });
        const urlInvitation = process.env.URL_FRONTEND;
        const urlInvitationParams = `bautizo-v2/${family?.familyCode}`;

        // Formatear hora sin segundos usando split
        const eventTime = family?.invitation.eventPartyTime 
            ? family.invitation.eventPartyTime.split(':').slice(0, 2).join(':') // Toma solo horas y minutos
            : '';
        
        const response = await this.client.messages.create({
            from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Número de WhatsApp habilitado en Twilio
            to: `whatsapp:${family?.contactPhone}`, // Número del destinatario en formato internacional
            contentSid: process.env.TWILIO_TEMPLATE_SID,
            contentVariables: JSON.stringify({
                '1': family?.familyName,
                '2': family?.invitation.eventName,
                '3': family?.invitation.eventDate.toISOString().split('T')[0] + ' ' + eventTime + ' hrs',
                '4': urlInvitationParams
            })
        });
        return { data: response, message: response };
    }

    async  sendConfirmationParent(familyCode: string) {
        const family = await this.familiesRepository.findOne({
            where: { familyCode },
            relations: ['familyAccesses'], // Carga la relación con Invitations
        });
        console.log('Family accesess', family?.familyAccesses);
        console.log('filtered accessess', family?.familyAccesses.filter(access => access.confirmed));
        console.log('concatenated accessess', family?.familyAccesses.filter(access => access.confirmed)?.map(x => x.memberName)?.join(', '));
        const guestConfirmed = family?.familyAccesses.filter(access => access.confirmed)?.map(x => x.memberName)?.join(', ') || 'N/A';
        console.log('Guest Confirmed: ' + guestConfirmed);
        const numbers = ['+529841778588'];

        let response;

        numbers.forEach(async number => {
            response = await this.client.messages.create({
                from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Número de WhatsApp habilitado en Twilio
                to: `whatsapp:${number}`, // Número del destinatario en formato internacional
                contentSid: process.env.TWILIO_TEMPLATE_CONFIRM_SID,
                contentVariables: JSON.stringify({
                    '1': family?.familyName,
                    '2': guestConfirmed
                })
            });

            console.log('Guest Confirmed: ', response);
        });
        return { data: response, message: response };
    }
}
