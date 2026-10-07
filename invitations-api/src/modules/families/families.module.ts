import { Module } from '@nestjs/common';
import { FamiliesService } from './families.service';
import { FamiliesController } from './families.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Families} from "../../entities/Families";
import {FamilyAccess} from "../../entities/FamilyAccess";

@Module({
  imports: [TypeOrmModule.forFeature([Families, FamilyAccess])],
  providers: [FamiliesService],
  controllers: [FamiliesController]
})
export class FamiliesModule {}
