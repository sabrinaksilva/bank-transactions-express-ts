import User from "../entities/models/user.model";

import { mysqlDataSource } from "../configuration/datasource.config"
import { Repository } from "typeorm";

const userRepository: Repository<User> = mysqlDataSource.getRepository(User);

 