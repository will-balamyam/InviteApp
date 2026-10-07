import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Families } from "./Families";
import { Images } from "./Images";

@Index("invitations_event_code_key", ["eventCode"], { unique: true })
@Index("invitations_pkey", ["id"], { unique: true })
@Entity("invitations", { schema: "public" })
export class Invitations {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "event_code", unique: true, length: 50 })
  eventCode: string;

  @Column("character varying", { name: "event_hashtag", length: 255 })
  eventHashtag: string;

  @Column("text", { name: "event_description" })
  eventDescription: string;

  @Column("text", { name: "event_data_parents" })
  eventDataParents: string;

  @Column("text", { name: "event_data_sponsors" })
  eventDataSponsors: string;

  @Column("character varying", { name: "event_name", length: 100 })
  eventName: string;

  @Column("timestamp without time zone", { name: "event_date" })
  eventDate: Date;

  @Column("time without time zone", { name: "event_party_time" })
  eventPartyTime: string;

  @Column("character varying", { name: "event_location_name", length: 255 })
  eventLocationName: string;

  @Column("character varying", {
    name: "event_location_description",
    length: 255,
  })
  eventLocationDescription: string;

  @Column("character varying", { name: "event_location_link", length: 255 })
  eventLocationLink: string;

  @Column("character varying", {
    name: "event_location_party_name",
    length: 255,
  })
  eventLocationPartyName: string;

  @Column("character varying", {
    name: "event_location_party_description",
    length: 255,
  })
  eventLocationPartyDescription: string;

  @Column("character varying", {
    name: "event_location_party_link",
    length: 255,
  })
  eventLocationPartyLink: string;

  @Column("character varying", { name: "gift_table_number", length: 255 })
  giftTableNumber: string;

  @Column("character varying", { name: "gift_table_link", length: 255 })
  giftTableLink: string;

  @Column("character varying", { name: "event_dress_code", length: 255 })
  eventDressCode: string;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @Column("timestamp without time zone", {
    name: "updated_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date | null;

  @OneToMany(() => Families, (families) => families.invitation)
  families: Families[];

  @OneToMany(() => Images, (images) => images.invitation)
  images: Images[];
}
