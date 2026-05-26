// --- CRYPTOGRAPHIC UTILITY SHIELD ---
// Custom XOR cipher using a secret key to prevent casual Base64 decoding or inspect-cheating
const SECRET_KEY = "wordfusionkey";

/**
 * Decrypts a customized XOR-Base64 cipher string into human-readable text
 * @param {string} cipherText 
 * @returns {string}
 */
export function decrypt(cipherText) {
    try {
        const raw = atob(cipherText);
        let result = "";
        for (let i = 0; i < raw.length; i++) {
            const charCode = raw.charCodeAt(i) ^ SECRET_KEY.charCodeAt(i % SECRET_KEY.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    } catch (e) {
        console.error("Decryption failure.");
        return "";
    }
}
