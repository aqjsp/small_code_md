# 网络安全与加密技术实践案例

## 目录
- [对称加密实践](#对称加密实践)
- [非对称加密实践](#非对称加密实践)
- [哈希函数与消息认证实践](#哈希函数与消息认证实践)
- [数字签名实践](#数字签名实践)
- [网络安全协议实践](#网络安全协议实践)
- [网络攻击与防御实践](#网络攻击与防御实践)
- [防火墙配置实践](#防火墙配置实践)
- [VPN配置实践](#vpn配置实践)
- [安全架构实践](#安全架构实践)

---

## 对称加密实践

### AES加密实现

#### Python实现

```python
from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
import base64

class AESCipher:
    def __init__(self, key=None):
        """
        初始化AES加密器
        :param key: 加密密钥，如果不提供则随机生成
        """
        if key is None:
            self.key = get_random_bytes(32)  # AES-256
        else:
            if len(key) not in [16, 24, 32]:
                raise ValueError("密钥长度必须是16、24或32字节")
            self.key = key
    
    def encrypt(self, plaintext):
        """
        加密明文
        :param plaintext: 要加密的明文
        :return: base64编码的密文
        """
        # 生成随机IV
        iv = get_random_bytes(AES.block_size)
        
        # 创建AES加密器
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        
        # 填充明文并加密
        padded_text = pad(plaintext.encode('utf-8'), AES.block_size)
        ciphertext = cipher.encrypt(padded_text)
        
        # 返回IV和密文的组合
        return base64.b64encode(iv + ciphertext).decode('utf-8')
    
    def decrypt(self, ciphertext):
        """
        解密密文
        :param ciphertext: base64编码的密文
        :return: 解密后的明文
        """
        # 解码base64
        data = base64.b64decode(ciphertext)
        
        # 提取IV和密文
        iv = data[:AES.block_size]
        ciphertext = data[AES.block_size:]
        
        # 创建AES解密器
        cipher = AES.new(self.key, AES.MODE_CBC, iv)
        
        # 解密并去除填充
        padded_plaintext = cipher.decrypt(ciphertext)
        plaintext = unpad(padded_plaintext, AES.block_size)
        
        return plaintext.decode('utf-8')
    
    def get_key(self):
        """获取密钥的base64编码"""
        return base64.b64encode(self.key).decode('utf-8')
    
    @staticmethod
    def generate_key():
        """生成新的AES密钥"""
        return base64.b64encode(get_random_bytes(32)).decode('utf-8')

# 使用示例
if __name__ == "__main__":
    # 创建加密器
    cipher = AESCipher()
    
    # 加密数据
    plaintext = "这是一段需要加密的敏感数据"
    ciphertext = cipher.encrypt(plaintext)
    print(f"密文: {ciphertext}")
    
    # 解密数据
    decrypted = cipher.decrypt(ciphertext)
    print(f"解密后: {decrypted}")
    
    # 验证
    print(f"验证: {plaintext == decrypted}")
    
    # 获取密钥
    key = cipher.get_key()
    print(f"密钥: {key}")
```

---

## 非对称加密实践

### RSA加密实现

#### Python实现

```python
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Signature import pkcs1_15
from Crypto.Hash import SHA256
import base64

class RSACipher:
    def __init__(self, key_size=2048):
        """
        初始化RSA加密器
        :param key_size: 密钥长度，默认2048位
        """
        self.key_size = key_size
        self.private_key = None
        self.public_key = None
        self.generate_key_pair()
    
    def generate_key_pair(self):
        """生成RSA密钥对"""
        self.private_key = RSA.generate(self.key_size)
        self.public_key = self.private_key.publickey()
    
    def encrypt(self, plaintext, public_key=None):
        """
        使用公钥加密
        :param plaintext: 要加密的明文
        :param public_key: 公钥，如果不提供则使用自己的公钥
        :return: base64编码的密文
        """
        if public_key is None:
            public_key = self.public_key
        
        # 创建加密器
        cipher = PKCS1_OAEP.new(public_key)
        
        # 加密数据
        ciphertext = cipher.encrypt(plaintext.encode('utf-8'))
        
        # 返回base64编码
        return base64.b64encode(ciphertext).decode('utf-8')
    
    def decrypt(self, ciphertext):
        """
        使用私钥解密
        :param ciphertext: base64编码的密文
        :return: 解密后的明文
        """
        # 解码base64
        data = base64.b64decode(ciphertext)
        
        # 创建解密器
        cipher = PKCS1_OAEP.new(self.private_key)
        
        # 解密数据
        plaintext = cipher.decrypt(data)
        
        return plaintext.decode('utf-8')
    
    def sign(self, message):
        """
        使用私钥签名
        :param message: 要签名的消息
        :return: base64编码的签名
        """
        # 计算消息哈希
        h = SHA256.new(message.encode('utf-8'))
        
        # 创建签名器
        signer = pkcs1_15.new(self.private_key)
        
        # 签名
        signature = signer.sign(h)
        
        # 返回base64编码
        return base64.b64encode(signature).decode('utf-8')
    
    def verify(self, message, signature, public_key=None):
        """
        使用公钥验证签名
        :param message: 原始消息
        :param signature: base64编码的签名
        :param public_key: 公钥，如果不提供则使用自己的公钥
        :return: 验证结果
        """
        if public_key is None:
            public_key = self.public_key
        
        try:
            # 解码base64
            sig = base64.b64decode(signature)
            
            # 计算消息哈希
            h = SHA256.new(message.encode('utf-8'))
            
            # 创建验证器
            verifier = pkcs1_15.new(public_key)
            
            # 验证签名
            verifier.verify(h, sig)
            
            return True
        except (ValueError, TypeError):
            return False
    
    def get_public_key(self):
        """获取PEM格式的公钥"""
        return self.public_key.export_key().decode('utf-8')
    
    def get_private_key(self):
        """获取PEM格式的私钥"""
        return self.private_key.export_key().decode('utf-8')
    
    @staticmethod
    def import_public_key(pem_data):
        """导入PEM格式的公钥"""
        return RSA.import_key(pem_data)
    
    @staticmethod
    def import_private_key(pem_data, passphrase=None):
        """导入PEM格式的私钥"""
        return RSA.import_key(pem_data, passphrase)

# 使用示例
if __name__ == "__main__":
    # 创建加密器
    cipher = RSACipher()
    
    # 获取公钥和私钥
    public_key_pem = cipher.get_public_key()
    private_key_pem = cipher.get_private_key()
    
    print("公钥:")
    print(public_key_pem)
    
    # 加密数据
    plaintext = "这是一段需要加密的敏感数据"
    ciphertext = cipher.encrypt(plaintext)
    print(f"\n密文: {ciphertext}")
    
    # 解密数据
    decrypted = cipher.decrypt(ciphertext)
    print(f"解密后: {decrypted}")
    
    # 验证
    print(f"验证: {plaintext == decrypted}")
    
    # 签名
    signature = cipher.sign(plaintext)
    print(f"\n签名: {signature}")
    
    # 验证签名
    is_valid = cipher.verify(plaintext, signature)
    print(f"签名验证: {is_valid}")
```

---

## 哈希函数与消息认证实践

### HMAC实现

#### Python实现

```python
import hmac
import hashlib
import base64
import time
import struct

class HMACAuth:
    def __init__(self, key=None):
        """
        初始化HMAC认证器
        :param key: 认证密钥，如果不提供则随机生成
        """
        if key is None:
            self.key = self.generate_key()
        else:
            self.key = key
    
    def generate_key(self, length=32):
        """生成随机密钥"""
        import os
        return os.urandom(length)
    
    def digest(self, message, algorithm='sha256'):
        """
        计算HMAC摘要
        :param message: 要认证的消息
        :param algorithm: 哈希算法
        :return: 二进制摘要
        """
        h = hmac.new(self.key, message.encode('utf-8'), getattr(hashlib, algorithm))
        return h.digest()
    
    def hexdigest(self, message, algorithm='sha256'):
        """
        计算HMAC十六进制摘要
        :param message: 要认证的消息
        :param algorithm: 哈希算法
        :return: 十六进制摘要
        """
        h = hmac.new(self.key, message.encode('utf-8'), getattr(hashlib, algorithm))
        return h.hexdigest()
    
    def base64digest(self, message, algorithm='sha256'):
        """
        计算HMAC base64摘要
        :param message: 要认证的消息
        :param algorithm: 哈希算法
        :return: base64编码摘要
        """
        digest = self.digest(message, algorithm)
        return base64.b64encode(digest).decode('utf-8')
    
    def verify(self, message, digest, algorithm='sha256'):
        """
        验证HMAC摘要
        :param message: 原始消息
        :param digest: 要验证的摘要
        :param algorithm: 哈希算法
        :return: 验证结果
        """
        expected = self.digest(message, algorithm)
        # 使用恒定时间比较防止时序攻击
        return hmac.compare_digest(expected, digest)
    
    def verify_hex(self, message, hexdigest, algorithm='sha256'):
        """
        验证HMAC十六进制摘要
        :param message: 原始消息
        :param hexdigest: 要验证的十六进制摘要
        :param algorithm: 哈希算法
        :return: 验证结果
        """
        expected = self.hexdigest(message, algorithm)
        return hmac.compare_digest(expected, hexdigest)
    
    def verify_base64(self, message, base64digest, algorithm='sha256'):
        """
        验证HMAC base64摘要
        :param message: 原始消息
        :param base64digest: 要验证的base64摘要
        :param algorithm: 哈希算法
        :return: 验证结果
        """
        expected = self.base64digest(message, algorithm)
        return hmac.compare_digest(expected, base64digest)
    
    def get_key(self):
        """获取密钥的base64编码"""
        return base64.b64encode(self.key).decode('utf-8')
    
    @staticmethod
    def import_key(base64key):
        """从base64编码导入密钥"""
        return base64.b64decode(base64key)
    
    def generate_timestamp_token(self, message, validity_seconds=300, algorithm='sha256'):
        """
        生成带时间戳的认证令牌
        :param message: 要认证的消息
        :param validity_seconds: 令牌有效期（秒）
        :param algorithm: 哈希算法
        :return: 包含时间戳和认证码的令牌
        """
        timestamp = int(time.time())
        data = f"{message}:{timestamp}"
        signature = self.hexdigest(data, algorithm)
        return f"{timestamp}:{signature}"
    
    def verify_timestamp_token(self, message, token, validity_seconds=300, algorithm='sha256'):
        """
        验证带时间戳的认证令牌
        :param message: 原始消息
        :param token: 包含时间戳和认证码的令牌
        :param validity_seconds: 令牌有效期（秒）
        :param algorithm: 哈希算法
        :return: 验证结果
        """
        try:
            parts = token.split(':')
            if len(parts) != 2:
                return False
            
            timestamp = int(parts[0])
            signature = parts[1]
            
            # 检查时间戳是否在有效期内
            current_time = int(time.time())
            if current_time - timestamp > validity_seconds:
                return False
            
            # 验证签名
            data = f"{message}:{timestamp}"
            expected_signature = self.hexdigest(data, algorithm)
            return hmac.compare_digest(expected_signature, signature)
        except (ValueError, IndexError):
            return False

# 使用示例
if __name__ == "__main__":
    # 创建认证器
    auth = HMACAuth()
    
    # 获取密钥
    key = auth.get_key()
    print(f"密钥: {key}")
    
    # 计算HMAC摘要
    message = "这是一条需要认证的消息"
    digest = auth.hexdigest(message)
    print(f"\n消息: {message}")
    print(f"HMAC摘要: {digest}")
    
    # 验证HMAC摘要
    is_valid = auth.verify_hex(message, digest)
    print(f"验证结果: {is_valid}")
    
    # 验证篡改的消息
    tampered_message = "这是一条被篡改的消息"
    is_valid_tampered = auth.verify_hex(tampered_message, digest)
    print(f"验证篡改消息: {is_valid_tampered}")
    
    # 生成和验证带时间戳的令牌
    token = auth.generate_timestamp_token(message, validity_seconds=60)
    print(f"\n时间戳令牌: {token}")
    
    is_valid_token = auth.verify_timestamp_token(message, token, validity_seconds=60)
    print(f"令牌验证: {is_valid_token}")
```

---

## 数字签名实践

### 数字签名实现

#### Python实现

```python
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15, pss
from Crypto.Hash import SHA256, SHA384, SHA512
import base64
import time
import json

class DigitalSignature:
    def __init__(self, key_size=2048):
        """
        初始化数字签名器
        :param key_size: 密钥长度，默认2048位
        """
        self.key_size = key_size
        self.private_key = None
        self.public_key = None
        self.generate_key_pair()
    
    def generate_key_pair(self):
        """生成RSA密钥对"""
        self.private_key = RSA.generate(self.key_size)
        self.public_key = self.private_key.publickey()
    
    def sign(self, message, algorithm='sha256', padding='pkcs1_15'):
        """
        使用私钥签名消息
        :param message: 要签名的消息
        :param algorithm: 哈希算法
        :param padding: 填充方式
        :return: base64编码的签名
        """
        # 选择哈希算法
        hash_algorithm = {
            'sha256': SHA256,
            'sha384': SHA384,
            'sha512': SHA512
        }.get(algorithm.lower(), SHA256)
        
        # 计算消息哈希
        h = hash_algorithm.new(message.encode('utf-8'))
        
        # 选择填充方式
        if padding.lower() == 'pss':
            signer = pss.new(self.private_key)
        else:
            signer = pkcs1_15.new(self.private_key)
        
        # 签名
        signature = signer.sign(h)
        
        # 返回base64编码
        return base64.b64encode(signature).decode('utf-8')
    
    def verify(self, message, signature, public_key=None, algorithm='sha256', padding='pkcs1_15'):
        """
        使用公钥验证签名
        :param message: 原始消息
        :param signature: base64编码的签名
        :param public_key: 公钥，如果不提供则使用自己的公钥
        :param algorithm: 哈希算法
        :param padding: 填充方式
        :return: 验证结果
        """
        if public_key is None:
            public_key = self.public_key
        
        try:
            # 解码base64
            sig = base64.b64decode(signature)
            
            # 选择哈希算法
            hash_algorithm = {
                'sha256': SHA256,
                'sha384': SHA384,
                'sha512': SHA512
            }.get(algorithm.lower(), SHA256)
            
            # 计算消息哈希
            h = hash_algorithm.new(message.encode('utf-8'))
            
            # 选择填充方式
            if padding.lower() == 'pss':
                verifier = pss.new(public_key)
            else:
                verifier = pkcs1_15.new(public_key)
            
            # 验证签名
            verifier.verify(h, sig)
            
            return True
        except (ValueError, TypeError):
            return False
    
    def sign_json(self, data, algorithm='sha256', padding='pkcs1_15'):
        """
        签名JSON数据
        :param data: 要签名的数据
        :param algorithm: 哈希算法
        :param padding: 填充方式
        :return: 包含数据和签名的JSON对象
        """
        # 序列化数据
        message = json.dumps(data, sort_keys=True, separators=(',', ':'))
        
        # 签名
        signature = self.sign(message, algorithm, padding)
        
        # 创建签名对象
        signed_data = {
            'data': data,
            'signature': signature,
            'algorithm': algorithm,
            'padding': padding,
            'timestamp': int(time.time())
        }
        
        return signed_data
    
    def verify_json(self, signed_data, public_key=None):
        """
        验证JSON数据的签名
        :param signed_data: 包含数据和签名的JSON对象
        :param public_key: 公钥，如果不提供则使用自己的公钥
        :return: 验证结果
        """
        try:
            # 提取数据
            data = signed_data['data']
            signature = signed_data['signature']
            algorithm = signed_data.get('algorithm', 'sha256')
            padding = signed_data.get('padding', 'pkcs1_15')
            
            # 序列化数据
            message = json.dumps(data, sort_keys=True, separators=(',', ':'))
            
            # 验证签名
            return self.verify(message, signature, public_key, algorithm, padding)
        except (KeyError, TypeError):
            return False
    
    def get_public_key(self):
        """获取PEM格式的公钥"""
        return self.public_key.export_key().decode('utf-8')
    
    def get_private_key(self):
        """获取PEM格式的私钥"""
        return self.private_key.export_key().decode('utf-8')
    
    @staticmethod
    def import_public_key(pem_data):
        """导入PEM格式的公钥"""
        return RSA.import_key(pem_data)
    
    @staticmethod
    def import_private_key(pem_data, passphrase=None):
        """导入PEM格式的私钥"""
        return RSA.import_key(pem_data, passphrase)

# 使用示例
if __name__ == "__main__":
    # 创建签名器
    signer = DigitalSignature()
    
    # 获取公钥和私钥
    public_key_pem = signer.get_public_key()
    private_key_pem = signer.get_private_key()
    
    print("公钥:")
    print(public_key_pem)
    
    # 签名消息
    message = "这是一条需要签名的消息"
    signature = signer.sign(message)
    print(f"\n消息: {message}")
    print(f"签名: {signature}")
    
    # 验证签名
    is_valid = signer.verify(message, signature)
    print(f"验证结果: {is_valid}")
    
    # 验证篡改的消息
    tampered_message = "这是一条被篡改的消息"
    is_valid_tampered = signer.verify(tampered_message, signature)
    print(f"验证篡改消息: {is_valid_tampered}")
    
    # 签名和验证JSON数据
    data = {
        "user_id": 12345,
        "action": "transfer",
        "amount": 100.00,
        "currency": "USD",
        "recipient": "user@example.com"
    }
    
    signed_data = signer.sign_json(data)
    print(f"\n签名数据:")
    print(json.dumps(signed_data, indent=2))
    
    is_valid_json = signer.verify_json(signed_data)
    print(f"JSON验证: {is_valid_json}")
```

---

## 网络安全协议实践

### TLS/SSL实现

#### Python实现

```python
import ssl
import socket
import OpenSSL
from datetime import datetime

class TLSAnalyzer:
    def __init__(self):
        """初始化TLS分析器"""
        self.default_context = ssl.create_default_context()
    
    def get_certificate_info(self, hostname, port=443, timeout=10):
        """
        获取TLS证书信息
        :param hostname: 主机名
        :param port: 端口号，默认443
        :param timeout: 超时时间（秒）
        :return: 证书信息字典
        """
        try:
            # 创建SSL上下文
            context = ssl.create_default_context()
            
            # 连接服务器
            with socket.create_connection((hostname, port), timeout=timeout) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    # 获取证书
                    cert_der = ssock.getpeercert(binary_form=True)
                    cert_pem = ssl.DER_cert_to_PEM_cert(cert_der)
                    
                    # 解析证书
                    x509 = OpenSSL.crypto.load_certificate(OpenSSL.crypto.FILETYPE_PEM, cert_pem)
                    
                    # 提取证书信息
                    cert_info = {
                        'subject': dict(x509.get_subject().get_components()),
                        'issuer': dict(x509.get_issuer().get_components()),
                        'version': x509.get_version(),
                        'serial_number': x509.get_serial_number(),
                        'not_before': self._parse_date(x509.get_notBefore()),
                        'not_after': self._parse_date(x509.get_notAfter()),
                        'signature_algorithm': x509.get_signature_algorithm().decode('utf-8'),
                        'pem': cert_pem
                    }
                    
                    # 获取扩展信息
                    extensions = []
                    for i in range(x509.get_extension_count()):
                        ext = x509.get_extension(i)
                        extensions.append({
                            'name': ext.get_short_name().decode('utf-8'),
                            'critical': ext.get_critical(),
                            'value': str(ext)
                        })
                    
                    cert_info['extensions'] = extensions
                    
                    # 检查证书有效性
                    now = datetime.now()
                    cert_info['is_valid'] = cert_info['not_before'] <= now <= cert_info['not_after']
                    
                    # 检查是否过期
                    cert_info['is_expired'] = now > cert_info['not_after']
                    
                    # 计算剩余天数
                    cert_info['days_until_expiry'] = (cert_info['not_after'] - now).days
                    
                    return cert_info
        except Exception as e:
            return {'error': str(e)}
    
    def check_tls_version(self, hostname, port=443, timeout=10):
        """
        检查支持的TLS版本
        :param hostname: 主机名
        :param port: 端口号，默认443
        :param timeout: 超时时间（秒）
        :return: 支持的TLS版本列表
        """
        supported_versions = []
        
        # 测试不同TLS版本
        tls_versions = [
            ('SSLv2', ssl.PROTOCOL_SSLv23),
            ('SSLv3', ssl.PROTOCOL_SSLv23),
            ('TLSv1.0', ssl.PROTOCOL_TLSv1),
            ('TLSv1.1', ssl.PROTOCOL_TLSv1_1),
            ('TLSv1.2', ssl.PROTOCOL_TLSv1_2),
            ('TLSv1.3', ssl.PROTOCOL_TLS)
        ]
        
        for version_name, protocol in tls_versions:
            try:
                # 创建SSL上下文
                if version_name == 'TLSv1.3':
                    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
                    context.minimum_version = ssl.TLSVersion.TLSv1_3
                else:
                    context = ssl.SSLContext(protocol)
                    context.verify_mode = ssl.CERT_NONE
                
                # 连接服务器
                with socket.create_connection((hostname, port), timeout=timeout) as sock:
                    with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                        # 获取实际协议版本
                        actual_version = ssock.version()
                        if actual_version:
                            supported_versions.append({
                                'requested': version_name,
                                'actual': actual_version,
                                'supported': True
                            })
            except Exception as e:
                supported_versions.append({
                    'requested': version_name,
                    'actual': None,
                    'supported': False,
                    'error': str(e)
                })
        
        return supported_versions
    
    def check_cipher_suites(self, hostname, port=443, timeout=10):
        """
        检查支持的密码套件
        :param hostname: 主机名
        :param port: 端口号，默认443
        :param timeout: 超时时间（秒）
        :return: 支持的密码套件列表
        """
        try:
            # 创建SSL上下文
            context = ssl.create_default_context()
            
            # 连接服务器
            with socket.create_connection((hostname, port), timeout=timeout) as sock:
                with context.wrap_socket(sock, server_hostname=hostname) as ssock:
                    # 获取密码套件
                    cipher = ssock.cipher()
                    
                    if cipher:
                        return {
                            'name': cipher[0],
                            'version': cipher[1],
                            'bits': cipher[2],
                            'description': f"{cipher[0]} ({cipher[1]}, {cipher[2]} bits)"
                        }
                    else:
                        return {'error': '无法获取密码套件信息'}
        except Exception as e:
            return {'error': str(e)}
    
    def _parse_date(self, date_str):
        """解析ASN1时间格式"""
        try:
            return datetime.strptime(date_str.decode('ascii'), '%Y%m%d%H%M%SZ')
        except:
            return None

# 使用示例
if __name__ == "__main__":
    analyzer = TLSAnalyzer()
    
    # 分析证书信息
    hostname = "www.google.com"
    cert_info = analyzer.get_certificate_info(hostname)
    
    print(f"{hostname} 证书信息:")
    if 'error' in cert_info:
        print(f"错误: {cert_info['error']}")
    else:
        print(f"主题: {cert_info['subject']}")
        print(f"颁发者: {cert_info['issuer']}")
        print(f"版本: {cert_info['version']}")
        print(f"序列号: {cert_info['serial_number']}")
        print(f"有效期: {cert_info['not_before']} 至 {cert_info['not_after']}")
        print(f"签名算法: {cert_info['signature_algorithm']}")
        print(f"证书有效: {cert_info['is_valid']}")
        print(f"证书过期: {cert_info['is_expired']}")
        print(f"剩余天数: {cert_info['days_until_expiry']}")
    
    # 检查TLS版本
    print(f"\n{hostname} TLS版本支持:")
    tls_versions = analyzer.check_tls_version(hostname)
    for version in tls_versions:
        status = "支持" if version['supported'] else "不支持"
        print(f"{version['requested']}: {status}")
        if version['actual']:
            print(f"  实际版本: {version['actual']}")
        if 'error' in version:
            print(f"  错误: {version['error']}")
    
    # 检查密码套件
    print(f"\n{hostname} 密码套件:")
    cipher_suite = analyzer.check_cipher_suites(hostname)
    if 'error' in cipher_suite:
        print(f"错误: {cipher_suite['error']}")
    else:
        print(f"密码套件: {cipher_suite['description']}")
```

---

## 网络攻击与防御实践

### SQL注入防御

#### Python实现

```python
import re
import html
import sqlite3
from typing import List, Dict, Any, Union

class SQLInjectionDefense:
    def __init__(self, db_type='sqlite'):
        """
        初始化SQL注入防御器
        :param db_type: 数据库类型，支持sqlite、mysql、postgresql
        """
        self.db_type = db_type.lower()
        self.connection = None
    
    def connect(self, **kwargs):
        """
        连接数据库
        :param kwargs: 数据库连接参数
        """
        if self.db_type == 'sqlite':
            self.connection = sqlite3.connect(kwargs.get('database', ':memory:'))
        else:
            raise ValueError(f"不支持的数据库类型: {self.db_type}")
    
    def close(self):
        """关闭数据库连接"""
        if self.connection:
            self.connection.close()
            self.connection = None
    
    def safe_query(self, query: str, params: tuple = None) -> List[Dict[str, Any]]:
        """
        安全执行SQL查询，使用参数化查询防止SQL注入
        :param query: SQL查询语句
        :param params: 查询参数
        :return: 查询结果
        """
        if not self.connection:
            raise RuntimeError("未连接到数据库")
        
        cursor = self.connection.cursor()
        
        try:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            
            # 获取列名
            columns = [description[0] for description in cursor.description]
            rows = cursor.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            
            return result
        finally:
            cursor.close()
    
    def safe_execute(self, query: str, params: tuple = None) -> int:
        """
        安全执行SQL语句，使用参数化查询防止SQL注入
        :param query: SQL语句
        :param params: 语句参数
        :return: 受影响的行数
        """
        if not self.connection:
            raise RuntimeError("未连接到数据库")
        
        cursor = self.connection.cursor()
        
        try:
            if params:
                cursor.execute(query, params)
            else:
                cursor.execute(query)
            
            self.connection.commit()
            return cursor.rowcount
        except Exception as e:
            self.connection.rollback()
            raise e
        finally:
            cursor.close()
    
    def validate_input(self, input_str: str, input_type: str = 'string') -> bool:
        """
        验证输入，防止SQL注入
        :param input_str: 输入字符串
        :param input_type: 输入类型（string, integer, email, alphanumeric）
        :return: 验证结果
        """
        if not input_str:
            return True
        
        # 检查危险字符
        dangerous_chars = ["'", '"', ';', '--', '/*', '*/', 'xp_', 'sp_']
        for char in dangerous_chars:
            if char in input_str:
                return False
        
        # 根据类型进行特定验证
        if input_type == 'integer':
            try:
                int(input_str)
                return True
            except ValueError:
                return False
        elif input_type == 'email':
            email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
            return re.match(email_pattern, input_str) is not None
        elif input_type == 'alphanumeric':
            return input_str.isalnum()
        else:  # string
            # 转义HTML字符
            escaped = html.escape(input_str)
            return True
    
    def sanitize_input(self, input_str: str) -> str:
        """
        清理输入，移除或转义危险字符
        :param input_str: 输入字符串
        :return: 清理后的字符串
        """
        if not input_str:
            return input_str
        
        # 转义HTML字符
        sanitized = html.escape(input_str)
        
        # 移除SQL注释
        sanitized = re.sub(r'--.*$', '', sanitized, flags=re.MULTILINE)
        sanitized = re.sub(r'/\*.*?\*/', '', sanitized, flags=re.DOTALL)
        
        # 移除危险字符
        dangerous_chars = ["'", '"', ';', '\\']
        for char in dangerous_chars:
            sanitized = sanitized.replace(char, '')
        
        return sanitized.strip()
    
    def create_user_table(self):
        """创建用户表"""
        if self.db_type == 'sqlite':
            query = """
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
            """
        
        self.safe_execute(query)
    
    def insert_user(self, username: str, email: str, password: str) -> int:
        """
        安全插入用户，使用参数化查询
        :param username: 用户名
        :param email: 邮箱
        :param password: 密码
        :return: 受影响的行数
        """
        if self.db_type == 'sqlite':
            query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)"
        
        return self.safe_execute(query, (username, email, password))
    
    def get_user_by_id(self, user_id: int) -> Dict[str, Any]:
        """
        安全获取用户，使用参数化查询
        :param user_id: 用户ID
        :return: 用户信息
        """
        if self.db_type == 'sqlite':
            query = "SELECT * FROM users WHERE id = ?"
        
        result = self.safe_query(query, (user_id,))
        return result[0] if result else {}
    
    def get_user_by_username(self, username: str) -> Dict[str, Any]:
        """
        安全获取用户，使用参数化查询
        :param username: 用户名
        :return: 用户信息
        """
        if self.db_type == 'sqlite':
            query = "SELECT * FROM users WHERE username = ?"
        
        result = self.safe_query(query, (username,))
        return result[0] if result else {}
    
    def authenticate_user(self, username: str, password: str) -> Dict[str, Any]:
        """
        安全验证用户，使用参数化查询
        :param username: 用户名
        :param password: 密码
        :return: 用户信息
        """
        if self.db_type == 'sqlite':
            query = "SELECT * FROM users WHERE username = ? AND password = ?"
        
        result = self.safe_query(query, (username, password))
        return result[0] if result else {}
    
    def vulnerable_query(self, username: str) -> List[Dict[str, Any]]:
        """
        漏洞查询示例，不使用参数化查询（仅用于演示）
        :param username: 用户名
        :return: 查询结果
        """
        if not self.connection:
            raise RuntimeError("未连接到数据库")
        
        cursor = self.connection.cursor()
        
        # 危险：直接拼接SQL语句，容易受到SQL注入攻击
        query = f"SELECT * FROM users WHERE username = '{username}'"
        
        try:
            cursor.execute(query)
            
            columns = [description[0] for description in cursor.description]
            rows = cursor.fetchall()
            result = [dict(zip(columns, row)) for row in rows]
            
            return result
        finally:
            cursor.close()

# 使用示例
if __name__ == "__main__":
    # 创建防御器
    defense = SQLInjectionDefense('sqlite')
    
    # 连接数据库
    defense.connect(database=':memory:')
    
    # 创建表
    defense.create_user_table()
    
    # 插入用户
    defense.insert_user('admin', 'admin@example.com', 'admin123')
    defense.insert_user('user1', 'user1@example.com', 'user123')
    defense.insert_user('user2', 'user2@example.com', 'user123')
    
    # 安全查询示例
    print("安全查询示例:")
    user = defense.get_user_by_username('admin')
    print(f"用户: {user}")
    
    # 输入验证示例
    print("\n输入验证示例:")
    inputs = [
        ('admin', 'string'),
        ('123', 'integer'),
        ('user@example.com', 'email'),
        ('user123', 'alphanumeric'),
        ("admin'; DROP TABLE users; --", 'string')
    ]
    
    for input_str, input_type in inputs:
        is_valid = defense.validate_input(input_str, input_type)
        print(f"输入: {input_str}, 类型: {input_type}, 有效: {is_valid}")
    
    # 输入清理示例
    print("\n输入清理示例:")
    dangerous_input = "admin'; DROP TABLE users; --"
    sanitized = defense.sanitize_input(dangerous_input)
    print(f"原始输入: {dangerous_input}")
    print(f"清理后: {sanitized}")
    
    # SQL注入攻击示例
    print("\nSQL注入攻击示例:")
    attack_input = "admin' OR '1'='1"
    
    # 使用安全查询
    print("使用安全查询:")
    safe_result = defense.get_user_by_username(attack_input)
    print(f"结果: {safe_result}")
    
    # 使用漏洞查询（仅用于演示）
    print("\n使用漏洞查询（不安全）:")
    vulnerable_result = defense.vulnerable_query(attack_input)
    print(f"结果: {vulnerable_result}")
    
    # 关闭连接
    defense.close()
```

---

## 防火墙配置实践

### iptables防火墙配置

#### Shell脚本实现

```bash
#!/bin/bash

# 防火墙配置脚本
# 使用iptables配置基本防火墙规则

# 变量定义
IPTABLES="/sbin/iptables"
MODPROBE="/sbin/modprobe"

# 网络接口
EXT_IF="eth0"  # 外部网络接口
INT_IF="eth1"  # 内部网络接口

# 网络地址
EXT_NET="192.168.1.0/24"  # 外部网络
INT_NET="10.0.0.0/24"     # 内部网络

# 允许的端口
ALLOWED_TCP_PORTS="22,80,443"
ALLOWED_UDP_PORTS="53,123"

# 日志级别
LOG_LEVEL="4"

# 函数定义

# 加载必要的内核模块
load_modules() {
    echo "加载内核模块..."
    $MODPROBE ip_tables
    $MODPROBE iptable_filter
    $MODPROBE iptable_nat
    $MODPROBE ip_conntrack
    $MODPROBE ip_conntrack_ftp
    $MODPROBE ip_nat_ftp
    $MODPROBE ipt_state
    $MODPROBE ipt_limit
    $MODPROBE ipt_multiport
    $MODPROBE ipt_LOG
}

# 清空所有规则
flush_rules() {
    echo "清空所有规则..."
    $IPTABLES -F
    $IPTABLES -X
    $IPTABLES -t nat -F
    $IPTABLES -t nat -X
    $IPTABLES -t mangle -F
    $IPTABLES -t mangle -X
}

# 设置默认策略
set_default_policy() {
    echo "设置默认策略..."
    $IPTABLES -P INPUT DROP
    $IPTABLES -P FORWARD DROP
    $IPTABLES -P OUTPUT ACCEPT
}

# 启用本地回环
enable_loopback() {
    echo "启用本地回环..."
    $IPTABLES -A INPUT -i lo -j ACCEPT
    $IPTABLES -A OUTPUT -o lo -j ACCEPT
}

# 启用连接跟踪
enable_connection_tracking() {
    echo "启用连接跟踪..."
    $IPTABLES -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
    $IPTABLES -A FORWARD -m state --state ESTABLISHED,RELATED -j ACCEPT
}

# 防止IP欺骗
prevent_ip_spoofing() {
    echo "防止IP欺骗..."
    # 拒绝来自外部网络但使用内部源地址的包
    $IPTABLES -A INPUT -i $EXT_IF -s $INT_NET -j DROP
    $IPTABLES -A FORWARD -i $EXT_IF -s $INT_NET -j DROP
    
    # 拒绝来自内部网络但使用外部源地址的包
    $IPTABLES -A INPUT -i $INT_IF -s ! $INT_NET -j DROP
    $IPTABLES -A FORWARD -i $INT_IF -s ! $INT_NET -j DROP
    
    # 拒绝来自回环地址但非来自lo接口的包
    $IPTABLES -A INPUT -s 127.0.0.0/8 ! -i lo -j DROP
}

# 防止SYN洪水攻击
prevent_syn_flood() {
    echo "防止SYN洪水攻击..."
    $IPTABLES -A INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT
    $IPTABLES -A FORWARD -p tcp --syn -m limit --limit 1/s --limit-burst 3 -j ACCEPT
}

# 防止端口扫描
prevent_port_scan() {
    echo "防止端口扫描..."
    # 记录扫描尝试
    $IPTABLES -A INPUT -m recent --name portscan --rcheck --seconds 86400 -j LOG --log-prefix "Portscan: " --log-level $LOG_LEVEL
    $IPTABLES -A INPUT -m recent --name portscan --set -j DROP
    
    # 检测扫描
    $IPTABLES -A INPUT -p tcp -m tcp --dport 139 -m recent --name portscan --set -j LOG --log-prefix "Portscan: " --log-level $LOG_LEVEL
    $IPTABLES -A INPUT -p tcp -m tcp --dport 139 -m recent --name portscan --set -j DROP
}

# 允许ICMP
allow_icmp() {
    echo "允许ICMP..."
    $IPTABLES -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/s -j ACCEPT
    $IPTABLES -A INPUT -p icmp --icmp-type echo-reply -j ACCEPT
    $IPTABLES -A INPUT -p icmp --icmp-type destination-unreachable -j ACCEPT
    $IPTABLES -A INPUT -p icmp --icmp-type time-exceeded -j ACCEPT
}

# 允许SSH（限制连接速率）
allow_ssh() {
    echo "允许SSH..."
    $IPTABLES -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --name ssh --set
    $IPTABLES -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --name ssh --update --seconds 60 --hitcount 4 -j DROP
    $IPTABLES -A INPUT -p tcp --dport 22 -m state --state NEW -j ACCEPT
}

# 允许HTTP和HTTPS
allow_web() {
    echo "允许HTTP和HTTPS..."
    $IPTABLES -A INPUT -p tcp --dport 80 -j ACCEPT
    $IPTABLES -A INPUT -p tcp --dport 443 -j ACCEPT
}

# 允许DNS
allow_dns() {
    echo "允许DNS..."
    $IPTABLES -A INPUT -p udp --dport 53 -j ACCEPT
    $IPTABLES -A INPUT -p tcp --dport 53 -j ACCEPT
}

# 允许NTP
allow_ntp() {
    echo "允许NTP..."
    $IPTABLES -A INPUT -p udp --dport 123 -j ACCEPT
}

# 允许FTP
allow_ftp() {
    echo "允许FTP..."
    # 主动FTP
    $IPTABLES -A INPUT -p tcp --dport 21 -j ACCEPT
    $IPTABLES -A INPUT -p tcp --dport 20 -j ACCEPT
    
    # 被动FTP
    $IPTABLES -A INPUT -p tcp --sport 1024: --dport 1024: -m state --state ESTABLISHED -j ACCEPT
}

# 设置端口转发
setup_port_forwarding() {
    echo "设置端口转发..."
    # 示例：将外部80端口转发到内部Web服务器
    # $IPTABLES -t nat -A PREROUTING -i $EXT_IF -p tcp --dport 80 -j DNAT --to 10.0.0.10:80
    # $IPTABLES -A FORWARD -p tcp -d 10.0.0.10 --dport 80 -j ACCEPT
}

# 设置网络地址转换
setup_nat() {
    echo "设置网络地址转换..."
    # 启用IP转发
    echo 1 > /proc/sys/net/ipv4/ip_forward
    
    # 设置MASQUERADE
    $IPTABLES -t nat -A POSTROUTING -o $EXT_IF -s $INT_NET -j MASQUERADE
}

# 记录被拒绝的连接
log_dropped() {
    echo "记录被拒绝的连接..."
    $IPTABLES -A INPUT -j LOG --log-prefix "Dropped INPUT: " --log-level $LOG_LEVEL
    $IPTABLES -A FORWARD -j LOG --log-prefix "Dropped FORWARD: " --log-level $LOG_LEVEL
}

# 保存规则
save_rules() {
    echo "保存规则..."
    # 根据发行版选择保存方法
    if [ -f /etc/debian_version ]; then
        # Debian/Ubuntu
        iptables-save > /etc/iptables/rules.v4
    elif [ -f /etc/redhat-release ]; then
        # RHEL/CentOS
        service iptables save
    else
        # 其他发行版
        iptables-save > /etc/iptables.rules
    fi
}

# 显示规则
show_rules() {
    echo "当前防火墙规则:"
    $IPTABLES -L -n -v
}

# 主函数
main() {
    echo "开始配置防火墙..."
    
    # 加载模块
    load_modules
    
    # 清空规则
    flush_rules
    
    # 设置默认策略
    set_default_policy
    
    # 启用本地回环
    enable_loopback
    
    # 启用连接跟踪
    enable_connection_tracking
    
    # 防止IP欺骗
    prevent_ip_spoofing
    
    # 防止SYN洪水攻击
    prevent_syn_flood
    
    # 防止端口扫描
    prevent_port_scan
    
    # 允许ICMP
    allow_icmp
    
    # 允许SSH
    allow_ssh
    
    # 允许HTTP和HTTPS
    allow_web
    
    # 允许DNS
    allow_dns
    
    # 允许NTP
    allow_ntp
    
    # 设置端口转发（如果需要）
    # setup_port_forwarding
    
    # 设置网络地址转换（如果需要）
    # setup_nat
    
    # 记录被拒绝的连接
    log_dropped
    
    # 显示规则
    show_rules
    
    # 保存规则
    save_rules
    
    echo "防火墙配置完成!"
}

# 执行主函数
main
```

---

## VPN配置实践

### OpenVPN配置

#### 服务端配置

```bash
# 服务器配置文件: server.conf

# 监听端口和协议
port 1194
proto udp

# VPN设备类型
dev tun

# 证书和密钥文件
ca ca.crt
cert server.crt
key server.key
dh dh.pem

# VPN网络配置
server 10.8.0.0 255.255.255.0

# 客户端到客户端通信
client-to-client

# 保持连接状态
keepalive 10 120

# TLS认证
tls-auth ta.key 0

# 加密算法
cipher AES-256-CBC
auth SHA256

# 压缩
comp-lzo

# 最大客户端数量
max-clients 100

# 用户和组
user nobody
group nogroup

# 持久化选项
persist-key
persist-tun

# 日志
status openvpn-status.log
log-append openvpn.log
verb 3

# 管理接口
management 127.0.0.1 7505

# 路由推送（客户端访问内网）
push "route 192.168.1.0 255.255.255.0"

# DNS推送
push "dhcp-option DNS 8.8.8.8"
push "dhcp-option DNS 8.8.4.4"

# 重定向所有流量通过VPN
push "redirect-gateway def1 bypass-dhcp"
```

#### 客户端配置

```bash
# 客户端配置文件: client.ovpn

client
dev tun
proto udp

# 服务器地址和端口
remote vpn.example.com 1194

resolv-retry infinite
nobind

# 用户和组
user nobody
group nogroup

# 持久化选项
persist-key
persist-tun

# 证书和密钥文件
ca ca.crt
cert client.crt
key client.key
tls-auth ta.key 1

# 加密算法
cipher AES-256-CBC
auth SHA256

# 压缩
comp-lzo

# 日志级别
verb 3
```

#### 证书生成脚本

```bash
#!/bin/bash

# OpenVPN证书生成脚本

# 设置变量
EASY_RSA="/etc/openvpn/easy-rsa"
KEY_SIZE=2048
KEY_COUNTRY="CN"
KEY_PROVINCE="Beijing"
KEY_CITY="Beijing"
KEY_ORG="Example Company"
KEY_EMAIL="admin@example.com"
KEY_OU="IT Department"

# 创建目录
mkdir -p /etc/openvpn/easy-rsa/keys
cp -r /usr/share/easy-rsa/2.0/* /etc/openvpn/easy-rsa/

# 设置环境变量
cd /etc/openvpn/easy-rsa
source ./vars

# 清理旧证书
./clean-all

# 生成CA证书
./build-ca

# 生成服务器证书和密钥
./build-key-server server

# 生成Diffie-Hellman参数
./build-dh

# 生成TLS认证密钥
openvpn --genkey --secret keys/ta.key

# 生成客户端证书
./build-key client1

# 复制证书到OpenVPN目录
cp keys/ca.crt /etc/openvpn/
cp keys/server.crt /etc/openvpn/
cp keys/server.key /etc/openvpn/
cp keys/dh.pem /etc/openvpn/
cp keys/ta.key /etc/openvpn/

# 设置权限
chmod 600 /etc/openvpn/server.key
chmod 600 /etc/openvpn/ta.key

echo "证书生成完成!"
```

---

## 安全架构实践

### 零信任网络架构

#### Python实现

```python
import jwt
import hashlib
import time
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Tuple

class ZeroTrustArchitecture:
    def __init__(self, secret_key: str):
        """
        初始化零信任架构
        :param secret_key: JWT签名密钥
        """
        self.secret_key = secret_key
        self.users = {}  # 用户数据库
        self.devices = {}  # 设备数据库
        self.policies = {}  # 策略数据库
        self.sessions = {}  # 会话数据库
        self.audit_logs = []  # 审计日志
    
    def register_user(self, user_id: str, username: str, password: str, 
                     roles: List[str], attributes: Dict = None) -> bool:
        """
        注册用户
        :param user_id: 用户ID
        :param username: 用户名
        :param password: 密码
        :param roles: 用户角色
        :param attributes: 用户属性
        :return: 注册结果
        """
        if user_id in self.users:
            return False
        
        # 密码哈希
        password_hash = self._hash_password(password)
        
        # 创建用户记录
        self.users[user_id] = {
            'username': username,
            'password_hash': password_hash,
            'roles': roles,
            'attributes': attributes or {},
            'created_at': datetime.now(),
            'last_login': None,
            'failed_attempts': 0,
            'locked': False
        }
        
        # 记录审计日志
        self._log_audit('USER_REGISTER', user_id, {'username': username, 'roles': roles})
        
        return True
    
    def register_device(self, device_id: str, user_id: str, device_type: str, 
                       attributes: Dict = None) -> bool:
        """
        注册设备
        :param device_id: 设备ID
        :param user_id: 用户ID
        :param device_type: 设备类型
        :param attributes: 设备属性
        :return: 注册结果
        """
        if device_id in self.devices:
            return False
        
        if user_id not in self.users:
            return False
        
        # 创建设备记录
        self.devices[device_id] = {
            'user_id': user_id,
            'device_type': device_type,
            'attributes': attributes or {},
            'created_at': datetime.now(),
            'last_seen': None,
            'trusted': False,
            'compliant': False
        }
        
        # 记录审计日志
        self._log_audit('DEVICE_REGISTER', user_id, {'device_id': device_id, 'device_type': device_type})
        
        return True
    
    def create_policy(self, policy_id: str, name: str, description: str, 
                     rules: List[Dict]) -> bool:
        """
        创建策略
        :param policy_id: 策略ID
        :param name: 策略名称
        :param description: 策略描述
        :param rules: 策略规则
        :return: 创建结果
        """
        if policy_id in self.policies:
            return False
        
        # 创建策略记录
        self.policies[policy_id] = {
            'name': name,
            'description': description,
            'rules': rules,
            'created_at': datetime.now(),
            'active': True
        }
        
        # 记录审计日志
        self._log_audit('POLICY_CREATE', 'system', {'policy_id': policy_id, 'name': name})
        
        return True
    
    def authenticate(self, username: str, password: str, device_id: str, 
                    context: Dict = None) -> Optional[str]:
        """
        用户认证
        :param username: 用户名
        :param password: 密码
        :param device_id: 设备ID
        :param context: 上下文信息
        :return: 认证令牌
        """
        # 查找用户
        user_id = None
        for uid, user in self.users.items():
            if user['username'] == username:
                user_id = uid
                break
        
        if not user_id:
            self._log_audit('AUTH_FAIL', 'unknown', {'username': username, 'reason': 'USER_NOT_FOUND'})
            return None
        
        user = self.users[user_id]
        
        # 检查用户是否被锁定
        if user['locked']:
            self._log_audit('AUTH_FAIL', user_id, {'reason': 'USER_LOCKED'})
            return None
        
        # 验证密码
        if not self._verify_password(password, user['password_hash']):
            # 增加失败次数
            user['failed_attempts'] += 1
            
            # 如果失败次数过多，锁定账户
            if user['failed_attempts'] >= 5:
                user['locked'] = True
                self._log_audit('USER_LOCK', user_id, {'reason': 'TOO_MANY_ATTEMPTS'})
            
            self._log_audit('AUTH_FAIL', user_id, {'reason': 'INVALID_PASSWORD'})
            return None
        
        # 重置失败次数
        user['failed_attempts'] = 0
        user['last_login'] = datetime.now()
        
        # 检查设备
        if device_id not in self.devices:
            self._log_audit('AUTH_FAIL', user_id, {'reason': 'DEVICE_NOT_FOUND'})
            return None
        
        device = self.devices[device_id]
        if device['user_id'] != user_id:
            self._log_audit('AUTH_FAIL', user_id, {'reason': 'DEVICE_NOT_OWNED'})
            return None
        
        # 更新设备最后访问时间
        device['last_seen'] = datetime.now()
        
        # 评估风险
        risk_score = self._assess_risk(user_id, device_id, context)
        
        # 如果风险过高，拒绝访问
        if risk_score > 80:
            self._log_audit('AUTH_FAIL', user_id, {'reason': 'HIGH_RISK', 'risk_score': risk_score})
            return None
        
        # 生成令牌
        token = self._generate_token(user_id, device_id, risk_score)
        
        # 记录审计日志
        self._log_audit('AUTH_SUCCESS', user_id, {'device_id': device_id, 'risk_score': risk_score})
        
        return token
    
    def authorize(self, token: str, resource: str, action: str, 
                context: Dict = None) -> bool:
        """
        授权访问
        :param token: 认证令牌
        :param resource: 资源
        :param action: 操作
        :param context: 上下文信息
        :return: 授权结果
        """
        try:
            # 验证令牌
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            user_id = payload['user_id']
            device_id = payload['device_id']
            
            # 检查会话
            session_id = payload.get('session_id')
            if session_id and session_id not in self.sessions:
                self._log_audit('AUTHZ_FAIL', user_id, {'reason': 'SESSION_NOT_FOUND'})
                return False
            
            # 获取用户和设备
            user = self.users[user_id]
            device = self.devices[device_id]
            
            # 重新评估风险
            current_risk = self._assess_risk(user_id, device_id, context)
            
            # 如果风险过高，拒绝访问
            if current_risk > 80:
                self._log_audit('AUTHZ_FAIL', user_id, {'reason': 'HIGH_RISK', 'risk_score': current_risk})
                return False
            
            # 应用策略
            for policy_id, policy in self.policies.items():
                if not policy['active']:
                    continue
                
                for rule in policy['rules']:
                    if self._evaluate_rule(rule, user, device, resource, action, context):
                        # 记录审计日志
                        self._log_audit('AUTHZ_SUCCESS', user_id, {
                            'resource': resource, 
                            'action': action, 
                            'policy': policy_id,
                            'risk_score': current_risk
                        })
                        return True
            
            # 没有匹配的策略
            self._log_audit('AUTHZ_FAIL', user_id, {'reason': 'NO_MATCHING_POLICY'})
            return False
            
        except jwt.ExpiredSignatureError:
            self._log_audit('AUTHZ_FAIL', 'unknown', {'reason': 'TOKEN_EXPIRED'})
            return False
        except jwt.InvalidTokenError:
            self._log_audit('AUTHZ_FAIL', 'unknown', {'reason': 'INVALID_TOKEN'})
            return False
    
    def _hash_password(self, password: str) -> str:
        """哈希密码"""
        return hashlib.sha256(password.encode()).hexdigest()
    
    def _verify_password(self, password: str, password_hash: str) -> bool:
        """验证密码"""
        return self._hash_password(password) == password_hash
    
    def _generate_token(self, user_id: str, device_id: str, risk_score: int) -> str:
        """生成JWT令牌"""
        # 创建会话
        session_id = hashlib.sha256(f"{user_id}{device_id}{time.time()}".encode()).hexdigest()
        self.sessions[session_id] = {
            'user_id': user_id,
            'device_id': device_id,
            'created_at': datetime.now(),
            'last_activity': datetime.now(),
            'risk_score': risk_score
        }
        
        # 生成令牌
        payload = {
            'user_id': user_id,
            'device_id': device_id,
            'session_id': session_id,
            'risk_score': risk_score,
            'exp': datetime.now() + timedelta(hours=1),  # 1小时过期
            'iat': datetime.now()
        }
        
        return jwt.encode(payload, self.secret_key, algorithm='HS256')
    
    def _assess_risk(self, user_id: str, device_id: str, context: Dict = None) -> int:
        """评估风险分数"""
        risk_score = 0
        
        # 获取用户和设备
        user = self.users[user_id]
        device = self.devices[device_id]
        
        # 基础风险分数
        risk_score += 10
        
        # 设备信任度
        if not device['trusted']:
            risk_score += 20
        
        # 设备合规性
        if not device['compliant']:
            risk_score += 15
        
        # 位置风险（如果有位置信息）
        if context and 'location' in context:
            location = context['location']
            if location not in user['attributes'].get('trusted_locations', []):
                risk_score += 25
        
        # 时间风险（非工作时间）
        current_hour = datetime.now().hour
        if current_hour < 9 or current_hour > 17:
            risk_score += 10
        
        # 设备类型风险
        if device['device_type'] == 'mobile':
            risk_score += 5
        elif device['device_type'] == 'public':
            risk_score += 30
        
        # 网络风险
        if context and 'network' in context:
            network = context['network']
            if network == 'public_wifi':
                risk_score += 20
            elif network == 'corporate':
                risk_score -= 10
        
        # 确保风险分数在0-100范围内
        return max(0, min(100, risk_score))
    
    def _evaluate_rule(self, rule: Dict, user: Dict, device: Dict, 
                      resource: str, action: str, context: Dict = None) -> bool:
        """评估策略规则"""
        # 检查资源匹配
        if 'resources' in rule and resource not in rule['resources']:
            return False
        
        # 检查操作匹配
        if 'actions' in rule and action not in rule['actions']:
            return False
        
        # 检查角色匹配
        if 'roles' in rule:
            if not any(role in user['roles'] for role in rule['roles']):
                return False
        
        # 检查设备类型匹配
        if 'device_types' in rule:
            if device['device_type'] not in rule['device_types']:
                return False
        
        # 检查时间条件
        if 'time_conditions' in rule:
            current_hour = datetime.now().hour
            current_day = datetime.now().weekday()  # 0=Monday, 6=Sunday
            
            for condition in rule['time_conditions']:
                if 'hours' in condition and current_hour not in condition['hours']:
                    return False
                
                if 'days' in condition and current_day not in condition['days']:
                    return False
        
        # 检查位置条件
        if 'location_conditions' in rule and context and 'location' in context:
            location = context['location']
            if location not in rule['location_conditions']:
                return False
        
        # 检查风险条件
        if 'max_risk_score' in rule:
            current_risk = self._assess_risk(
                next(uid for uid, u in self.users.items() if u == user),
                next(did for did, d in self.devices.items() if d == device),
                context
            )
            if current_risk > rule['max_risk_score']:
                return False
        
        # 所有条件都满足
        return True
    
    def _log_audit(self, event_type: str, user_id: str, details: Dict = None):
        """记录审计日志"""
        log_entry = {
            'timestamp': datetime.now(),
            'event_type': event_type,
            'user_id': user_id,
            'details': details or {}
        }
        
        self.audit_logs.append(log_entry)
        
        # 在实际应用中，这里应该将日志写入持久化存储
        # 例如数据库、日志文件或SIEM系统
    
    def get_audit_logs(self, user_id: str = None, event_type: str = None, 
                      start_time: datetime = None, end_time: datetime = None) -> List[Dict]:
        """
        获取审计日志
        :param user_id: 用户ID（可选）
        :param event_type: 事件类型（可选）
        :param start_time: 开始时间（可选）
        :param end_time: 结束时间（可选）
        :return: 审计日志列表
        """
        logs = self.audit_logs
        
        # 过滤用户ID
        if user_id:
            logs = [log for log in logs if log['user_id'] == user_id]
        
        # 过滤事件类型
        if event_type:
            logs = [log for log in logs if log['event_type'] == event_type]
        
        # 过滤时间范围
        if start_time:
            logs = [log for log in logs if log['timestamp'] >= start_time]
        
        if end_time:
            logs = [log for log in logs if log['timestamp'] <= end_time]
        
        return logs

# 使用示例
if __name__ == "__main__":
    # 创建零信任架构
    zta = ZeroTrustArchitecture("secret_key")
    
    # 注册用户
    zta.register_user("user1", "alice", "password123", ["user", "developer"], {
        "department": "engineering",
        "trusted_locations": ["office", "home"]
    })
    
    # 注册设备
    zta.register_device("device1", "user1", "laptop", {
        "os": "Windows 10",
        "antivirus": "installed",
        "disk_encryption": "enabled"
    })
    
    # 创建策略
    zta.create_policy("policy1", "开发者访问策略", "允许开发者在工作时间访问开发资源", [
        {
            "resources": ["dev_server", "code_repo"],
            "actions": ["read", "write"],
            "roles": ["developer"],
            "time_conditions": [
                {"hours": list(range(9, 18)), "days": [0, 1, 2, 3, 4]}  # 工作日9-17点
            ],
            "max_risk_score": 50
        }
    ])
    
    # 认证用户
    token = zta.authenticate("alice", "password123", "device1", {
        "location": "office",
        "network": "corporate"
    })
    
    print(f"认证令牌: {token}")
    
    # 授权访问
    if token:
        authorized = zta.authorize(token, "dev_server", "read", {
            "location": "office",
            "network": "corporate"
        })
        print(f"授权结果: {authorized}")
    
    # 获取审计日志
    logs = zta.get_audit_logs()
    print(f"\n审计日志:")
    for log in logs:
        print(f"{log['timestamp']}: {log['event_type']} - {log['details']}")
```

---

## 总结

本文档提供了网络安全与加密技术的实践案例，涵盖了从基础加密算法到复杂安全架构的各个方面。通过这些实践案例，您可以了解：

1. **对称加密技术**：使用AES算法实现数据加密和解密
2. **非对称加密技术**：使用RSA算法实现密钥交换和数字签名
3. **哈希函数与消息认证**：使用HMAC实现消息完整性验证
4. **数字签名**：实现数据来源验证和不可否认性
5. **网络安全协议**：TLS/SSL协议的分析和实现
6. **网络攻击与防御**：SQL注入等常见攻击的防御方法
7. **防火墙配置**：使用iptables配置网络安全策略
8. **VPN配置**：OpenVPN的配置和管理
9. **安全架构**：零信任网络架构的实现

这些实践案例可以帮助您更好地理解网络安全技术的原理和应用，为构建安全可靠的网络系统提供参考。在实际应用中，请根据具体需求和安全要求选择合适的技术和方案。