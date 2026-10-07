import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invitations } from "./Invitations";
import { FamilyAccess } from "./FamilyAccess";

@Index("families_family_code_key", ["familyCode"], { unique: true })
@Index("families_pkey", ["id"], { unique: true })
@Entity("families", { schema: "public" })
export class Families {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "family_name", length: 255 })
  familyName: string;

  @Column("character varying", {
    name: "family_code",
    unique: true,
    length: 50,
  })
  familyCode: string;

  @Column("character varying", {
    name: "contact_email",
    nullable: true,
    length: 255,
  })
  contactEmail: string | null;

  @Column("character varying", {
    name: "contact_phone",
    nullable: true,
    length: 50,
  })
  contactPhone: string | null;

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

  @ManyToOne(() => Invitations, (invitations) => invitations.families, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "invitation_id", referencedColumnName: "id" }])
  invitation: Invitations;

  @OneToMany(() => FamilyAccess, (familyAccess) => familyAccess.family)
  familyAccesses: FamilyAccess[];
}
