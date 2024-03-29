import { BadRequestError } from '../errors/bad-request.error';

const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;


exports.encodePass = (originalPassword: string) => {
    const salt = bcrypt.genSaltSync(saltRounds);

    if (!originalPassword || originalPassword.length < 8) {
        throw new BadRequestError('Password must be at least 8 characters');
    }
    return bcrypt.hashSync(originalPassword, salt);
};


exports.validateIfHashMatchesPassword = (unEncodedPasswordAttempt?: string, passwordHash?: string): boolean => {
    if (!passwordHash || !unEncodedPasswordAttempt) {
        return false;
    }
    return bcrypt.compareSync(unEncodedPasswordAttempt, passwordHash);
};
