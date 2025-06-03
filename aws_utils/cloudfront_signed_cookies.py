from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
import base64
import json


PRIVATE_KEY_PATH = 'private_key.pem'
KEY_PAIR_ID = 'K3NH200Y17IOIY'
BASE_URL = 'https://example.cloudfront.net/'


def rsa_sha1_sign(policy, private_key_path):
    with open(private_key_path, "rb") as key_file:
        private_key = serialization.load_pem_private_key(key_file.read(), password=None)

    signature = private_key.sign(
        policy.encode('utf-8'),
        padding.PKCS1v15(),
        hashes.SHA1()
    )
    return signature


def url_safe_base64_encode(data):
    encoded = base64.b64encode(data).decode('utf-8')
    return encoded.replace('+', '-').replace('=', '_').replace('/', '~')


def create_signed_cookies(resource, private_key_path, key_pair_id, expires):
    policy = {
        "Statement": [{
            "Resource": resource,
            "Condition": {
                "DateLessThan": {"AWS:EpochTime": expires}
            }
        }]
    }

    policy_json = json.dumps(policy)
    encoded_policy = url_safe_base64_encode(policy_json.encode('utf-8'))

    signature = rsa_sha1_sign(policy_json, private_key_path)
    encoded_signature = url_safe_base64_encode(signature)

    return {
        "CloudFront-Policy": encoded_policy,
        "CloudFront-Signature": encoded_signature,
        "CloudFront-Key-Pair-Id": key_pair_id
    }
