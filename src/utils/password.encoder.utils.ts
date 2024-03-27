const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;


exports.encodePass = (originalPassword: string) => {
    const salt = bcrypt.genSaltSync(saltRounds);

    if (originalPassword == null) {
        throw new Error('Password can not be null!');
    }
    return bcrypt.hashSync(originalPassword, salt);
};


exports.validateIfHashMatchesPassword = (unEncodedPasswordAttempt?: string, passwordHash?: string): boolean => {
    if (!passwordHash || !unEncodedPasswordAttempt) {
        return false;
    }
    return bcrypt.compareSync(unEncodedPasswordAttempt, passwordHash);
};
