import { Module } from '@nestjs/common';
import { FamilyAccessService } from './family-access.service';
import { FamilyAccessController } from './family-access.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {FamilyAccess} from "../../entities/FamilyAccess";

@Module({
  imports: [TypeOrmModule.forFeature([FamilyAccess])],
  providers: [FamilyAccessService],
  controllers: [FamilyAccessController]
})
export class FamilyAccessModule {}
