// 代码解密系统
class CodeDecryptor {
    constructor() {
        this.decryptionMethods = {
            base64: this.decryptBase64.bind(this),
            caesar: this.decryptCaesar.bind(this),
            reverse: this.decryptReverse.bind(this),
            hex: this.decryptHex.bind(this)
        };
    }
    
    // Base64 解密
    decryptBase64(encrypted) {
        try {
            return atob(encrypted);
        } catch (e) {
            return null;
        }
    }
    
    // Caesar 密码解密（偏移量3）
    decryptCaesar(encrypted) {
        let decrypted = '';
        for (let i = 0; i < encrypted.length; i++) {
            const char = encrypted[i];
            if (char >= 'a' && char <= 'z') {
                decrypted += String.fromCharCode(((char.charCodeAt(0) - 97 - 3 + 26) % 26) + 97);
            } else if (char >= 'A' && char <= 'Z') {
                decrypted += String.fromCharCode(((char.charCodeAt(0) - 65 - 3 + 26) % 26) + 65);
            } else {
                decrypted += char;
            }
        }
        return decrypted;
    }
    
    // 反转字符串
    decryptReverse(encrypted) {
        return encrypted.split('').reverse().join('');
    }
    
    // Hex 解密
    decryptHex(encrypted) {
        try {
            const hex = encrypted.replace(/\s/g, '');
            let result = '';
            for (let i = 0; i < hex.length; i += 2) {
                const hexChar = hex.substr(i, 2);
                const charCode = parseInt(hexChar, 16);
                if (charCode > 0 && charCode < 128) {
                    result += String.fromCharCode(charCode);
                }
            }
            return result;
        } catch (e) {
            return null;
        }
    }
    
    // 自动检测并解密
    decrypt(encrypted) {
        if (!encrypted || encrypted.trim() === '') {
            return { success: false, message: '请输入需要解密的代码' };
        }
        
        const trimmed = encrypted.trim();
        const results = [];
        
        // 尝试所有解密方法
        for (const [method, decryptFunc] of Object.entries(this.decryptionMethods)) {
            try {
                const result = decryptFunc(trimmed);
                if (result && result.length > 0) {
                    results.push({
                        method: method,
                        result: result
                    });
                }
            } catch (e) {
                // 忽略错误，继续尝试其他方法
            }
        }
        
        if (results.length === 0) {
            return { 
                success: false, 
                message: '无法解密此代码。请检查输入是否正确，或尝试其他解密方法。' 
            };
        }
        
        // 返回第一个成功的结果
        return {
            success: true,
            method: results[0].method,
            result: results[0].result,
            allResults: results
        };
    }
    
    // 指定方法解密
    decryptWithMethod(encrypted, method) {
        const decryptFunc = this.decryptionMethods[method];
        if (!decryptFunc) {
            return { success: false, message: '未知的解密方法' };
        }
        
        try {
            const result = decryptFunc(encrypted);
            if (result) {
                return { success: true, method: method, result: result };
            }
            return { success: false, message: '解密失败' };
        } catch (e) {
            return { success: false, message: '解密过程出错: ' + e.message };
        }
    }
}

// 导出单例
const codeDecryptor = new CodeDecryptor();

