import { Module } from '@nestjs/common';
import { InvitationsService } from './invitations.service';
import { InvitationsController } from './invitations.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Invitations} from "../../entities/Invitations";
import {Images} from "../../entities/Images";

@Module({
  imports: [TypeOrmModule.forFeature([Invitations]), TypeOrmModule.forFeature([Images])],
  providers: [InvitationsService],
  controllers: [InvitationsController]
})
export class InvitationsModule {}
