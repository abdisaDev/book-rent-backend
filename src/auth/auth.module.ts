import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalStrategy } from './strategies/local.strategy';
// import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: '.development.env',
    // }),
    JwtModule.register({
      secret: '2fcapital',
      signOptions: {
        expiresIn: '1d',
      },
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
