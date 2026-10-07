export class CreateInvitationDto {
    eventCode: string;
    eventHashtag: string;
    eventDescription: string;
    eventDataParents: string;
    eventDataSponsors: string;
    eventName: string;
    eventDate: Date;
    eventPartyTime: string;
    eventLocationName: string;
    eventLocationDescription: string;
    eventLocationLink: string;
    eventLocationPartyName: string;
    eventLocationPartyDescription: string;
    eventLocationPartyLink: string;
    giftTableNumber: string;
    giftTableLink: string;
    eventDressCode: string;

    // Array para las imágenes
    images: {
        imageData: Buffer;
        description?: string;
        imageType?: string;
    }[];
}
