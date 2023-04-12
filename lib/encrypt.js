import bcrypt from 'bcrypt';

export default async function hashPass(unhashPass) {
    return bcrypt.hash(unhashPass, 10).then(function(hash) {
        return hash;
    })
}
