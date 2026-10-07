export interface InvitationModel {
  id?: number;
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
  images: {
    id?: number;
    imageData: ArrayBuffer;
    description?: string;
    imageType?: string;
  }[];
}

export interface  FamilyModel {
  id?: number;
  familyName: string;
  familyCode: string;
  contactEmail?: string;
  contactPhone?: string;
  createdAt?: Date;
  updatedAt?: Date;
  Invitation?: InvitationModel;
  familyAccesses?: FamilyAccessModel[];
  invitation?: InvitationModel;
}

export interface FamilyAccessModel {
  id?: number;
  memberName: string;
  confirmed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  family?: FamilyModel;
}
