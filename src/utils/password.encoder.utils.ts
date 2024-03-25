
const bcrypt = require('bcrypt-nodejs');
const saltRounds = 10;



exports.encodePass = (originalPassword: string) => {
    const salt = bcrypt.genSaltSync(saltRounds);

    if (originalPassword == null || originalPassword == undefined) {
        throw new Error("Password can not be null!")
    }
    return bcrypt.hashSync(originalPassword, salt);
};



exports.validateIfHashMatchesPassword = (unencodedPasswordAttempt: string, passwordHash: string) => {
    return bcrypt.compareSync(unencodedPasswordAttempt, passwordHash)
};
