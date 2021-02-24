import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/User";

@EntityRepository()
class UserRepository extends Repository<User> {

}

export { UserRepository }