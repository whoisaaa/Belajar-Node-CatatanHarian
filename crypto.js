const crypto = require('crypto');
const { buffer } = require('stream/consumers');

const ENCRYPTO_KEY = 'rahasiasuperkuat32karakterwajib!';
const IV_LENGTH = 16;

function encrypt(text) {
    let iv = crypto.randomBytes(IV_LENGTH);
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTO_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
    let textParts = text.split(':');
    let iv = Buffer.from(textParts.shift(), 'hex');
    let encryptedText = Buffer.from(textParts.join(':'), 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTO_KEY), iv);
    let decrypted  = decipher.update(encryptedText);
    decipher = Buffer.concat([decrypted, decipher.final()]);
    return decipher.toString();
}

module.exports = { encrypt, decrypt};