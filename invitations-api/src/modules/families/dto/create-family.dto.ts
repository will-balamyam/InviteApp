export class CreateFamilyDto {
    familyName: string;
    familyCode: string;
    contactEmail: string;
    contactPhone: string;
    invitation: number; // ID de la invitación
    familyAccesses?: CreateFamilyAccessDto[];
    familyAccessesToDelete?: number[]; // IDs de accesos a eliminar
}

export class CreateFamilyAccessDto {
    id?: number;
    memberName: string;
    confirmed?: boolean;
}
