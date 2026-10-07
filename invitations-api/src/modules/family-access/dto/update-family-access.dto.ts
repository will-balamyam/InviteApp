import { PartialType } from '@nestjs/mapped-types';
import { CreateFamilyAccessDto } from './create-family-access.dto';

export class UpdateFamilyAccessDto extends PartialType(CreateFamilyAccessDto) {
    isConfirmAttendance?: boolean = false;
}
