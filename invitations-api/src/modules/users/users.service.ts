import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Users} from "../../entities/Users";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly usersRepository: Repository<Users>,
    ) {}

    findAll() {
        return this.usersRepository.find();
    }

    findOne(id: number) {
        return this.usersRepository.findOne({ where: { id } });
    }

    create(createUserDto: CreateUserDto) {
        const user = this.usersRepository.create(createUserDto);
        return this.usersRepository.save(user);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return this.usersRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.usersRepository.delete(id);
    }

    async login(userData: LoginUserDto) {
        const user = await this.usersRepository.findOne({where: {user: userData.user, password: userData.password}});
        return {data: user, message: user ? 'Login successful' : 'Invalid credentials'};
    }
}
