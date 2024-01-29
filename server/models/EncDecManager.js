const crypto = require("crypto");

const encrypt = (userPass) => {
    // Generating a random IV
    const iv = crypto.randomBytes(16);

    // Creating a Cipher
    const key = Buffer.from('QWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOP').slice(0, 32); // Ensure the key length is appropriate
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    // Encrypting the userPass
    let encryptedPassword = cipher.update(userPass, 'utf8', 'base64');
    encryptedPassword += cipher.final('base64');

    return {
        iv: iv.toString('hex'),
        encryptedPassword: encryptedPassword
    };
};

const decrypt = (encrypted, ivString) => {
    // Creating a Decipher
    const key = Buffer.from('QWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOPQWERTYUIOP').slice(0, 32); // Ensure the key length is appropriate
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(ivString, 'hex'));

    // Decrypting the encrypted data
    let decryptedPassword = decipher.update(encrypted, 'base64', 'utf8');
    decryptedPassword += decipher.final('utf8');

    return decryptedPassword;
};

module.exports = { encrypt, decrypt };
