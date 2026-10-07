import { PartialType } from '@nestjs/mapped-types';
import { CreateInvitationDto } from './create-invitation.dto';

export class UpdateInvitationDto extends PartialType(CreateInvitationDto) {
    images?: {
        id?: number; // Include `id` for existing images to update
        imageData: Buffer;
        description?: string;
        imageType?: string;
    }[];
}
