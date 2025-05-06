import jwt
from datetime import datetime

def check_token_expiry(token:str)->bool:
    '''
    It checks if the token expired.
    It will return True, if expired
    '''
    decoded_token = jwt.decode(token, options={'verify_signature':False})
    return (decoded_token['exp'] < int(datetime.now().timestamp()))