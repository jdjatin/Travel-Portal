/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from '../../../auth/entities/refresh-token.entity';


import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
    UnprocessableEntityException,
} from '@nestjs/common';
import { MailService } from '../../../mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly mailService: MailService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(RefreshToken)
        private readonly refreshTokenRepository: Repository<RefreshToken>,

    ) { }
    async createUser(userData: any) {
        const email = userData.email;
        const findUser = await this.userRepository.findOne({
            where: {
                email: email.toLowerCase(),
            },
        });
        if (!findUser) {
            const res = await this.userRepository.save(
                {
                    ...userData,
                    email: userData.email.toLowerCase(),
                    firstName: userData.firstName.trim(),
                    lastName: userData.lastName.trim(),
                    password: await bcrypt.hash(userData.password, 10),
                    token: userData.token,
                },
                { transaction: true },
            );

            if (res) {
                return res;
            }
            throw new UnprocessableEntityException('Unable to create account!');
        }
        throw new UnprocessableEntityException('Email already exist');
    }

    async updateRefreshToken(refreshToken, expirydate, payload) {
        await this.refreshTokenRepository.upsert(
            {
                userId: payload.id,
                refreshToken: refreshToken,
                refreshTokenExpires: expirydate,
            },
            ['userId'],
        );
    }

    async generateRefreshToken(payload) {
        try {
            const expirydate = new Date();

            expirydate.setDate(
                expirydate.getDate() + parseInt(process.env.REFRESH_TOKEN_EXPIRY),
            );

            const salt = await bcrypt.genSalt();
            const refreshToken = await bcrypt.hash(JSON.stringify(payload), salt);

            this.updateRefreshToken(refreshToken, expirydate, payload);

            return refreshToken;
        }
        catch (error) {
            return error;
        }
    }



    async getProfile(userId) {
        const profile = await this.userRepository.findOne({
            where: { id: userId }, select: ['id', 'firstName', 'lastName', 'isActive']
        });
        return profile;
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userRepository.findOne({
            where: { email: email },
        });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                return user;
            } else {
                throw new UnauthorizedException({
                    code: 1,
                    error: 'Please check your login credentials',
                });
            }
        }
        throw new NotFoundException('No user found with this email!');
    }

    async forgotPassword(data) {
        const randomToken = String(Math.floor(1000 + Math.random() * 9000));
        let user = await this.userRepository.findOne({
            where: { email: data.email },
        });
        if (user) {

            await this.userRepository.update({ id: user.id }, { token: randomToken });
            const mailData = {
                ...user,
                token: randomToken,
                email: user.email,
                subject: 'Reset Password',
            };
            await this.mailService.sendMail(mailData);
            return { message: 'OTP sent to your mail' };
        }
        throw new NotFoundException('No User found with this email');
    }

    async login(user) {
        try {
            let payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };

            return {
                userId: user.id,
                accessToken: this.jwtService.sign(payload),
                refreshToken: await this.generateRefreshToken(payload),
            };
        }
        catch (error) {
            return error;
        }
    }

    async verify(id: string) {
        const isVerified = await this.userRepository.update(
            { token: id },
            { isVerified: true },
        );
        if (!!isVerified) {
            return true;
        }
        return false;
    }
}
