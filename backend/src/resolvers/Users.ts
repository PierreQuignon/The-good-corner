import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { User, UserCreateInput } from "../entities/User";
import { validate } from "class-validator";
import argon2d from "argon2";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { ContextType, getUserFromReq } from "../auth";

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  async allUsers(): Promise<User[]> {
    const users = await User.find({});
    return users;
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id", () => ID) id: number): Promise<User | null> {
    const user = await User.findOne({
      where: { id: id },
    });
    return user;
  }

  // @Authorized() removed to avoid error
  @Query(() => User, { nullable: true })
  async me(@Ctx() context: ContextType): Promise<User | null> {
    return getUserFromReq(context.req, context.res);
  }

  @Mutation(() => User)
  async signup(
    @Arg("data", () => UserCreateInput) data: UserCreateInput
  ): Promise<User> {
    const errors = await validate(data);
    if (errors.length !== 0) {
      throw new Error(`An error occured: ${JSON.stringify(errors)}`);
    }
    const existingUser = await User.findOneBy({ email: data.email });
    if (existingUser) {
      throw new Error("User already exist");
    }

    const newUser = new User();
    Object.assign(newUser, {
      email: data.email,
      hashedPassword: await argon2d.hash(data.password),
    });
    await newUser.save();
    return newUser;
  }

  @Mutation(() => User, { nullable: true })
  async signin(
    @Ctx() context: { req: any; res: any },
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const existingUser = await User.findOneBy({ email });
    if (existingUser) {
      if (await argon2d.verify(existingUser.hashedPassword, password)) {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
            userId: existingUser.id,
          },
          process.env.JWT_SECRET || "supersecret"
        );
        const cookies = new Cookies(context.req, context.res);
        cookies.set("token", token, {
          httpOnly: false,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24,
        });
        return existingUser;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  @Mutation(() => Boolean)
  async signout(@Ctx() context: ContextType): Promise<boolean> {
    const cookies = new Cookies(context.req, context.res);
    cookies.set("token", "", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
    });
    return true;
  }
}
