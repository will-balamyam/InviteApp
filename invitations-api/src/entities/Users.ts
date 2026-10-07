import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";

@Index("users_pkey", ["id"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
    @PrimaryGeneratedColumn({ type: "integer", name: "id" })
    id: number;

    @Column("character varying", { name: "name", length: 255 })
    name: string;

    @Column("character varying", { name: "user", length: 255 })
    user: string;

    @Column("character varying", { name: "password", length: 255 })
    password: string;

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
}
