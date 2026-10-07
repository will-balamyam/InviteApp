import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invitations } from "./Invitations";

@Index("images_pkey", ["id"], { unique: true })
@Entity("images", { schema: "public" })
export class Images {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("bytea", { name: "image_data" })
  imageData: Buffer;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("character varying", {
    name: "image_type",
    nullable: true,
    length: 50,
  })
  imageType: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date | null;

  @ManyToOne(() => Invitations, (invitations) => invitations.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "invitation_id", referencedColumnName: "id" }])
  invitation: Invitations;
}
