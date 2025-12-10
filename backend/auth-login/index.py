import json
import os
import psycopg2
import bcrypt
import jwt
from datetime import datetime, timedelta
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Вход пользователя в систему
    Принимает: email, password
    Возвращает: JWT токен и данные пользователя
    """
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    try:
        body_str = event.get('body', '')
        if not body_str:
            body_data = {}
        else:
            body_data = json.loads(body_str)
        email = body_data.get('email', '').strip().lower()
        password = body_data.get('password', '')
        
        if not email or not password:
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Email и пароль обязательны'}),
                'isBase64Encoded': False
            }
        
        conn = psycopg2.connect(os.environ['DATABASE_URL'])
        cur = conn.cursor()
        
        cur.execute(
            "SELECT id, email, password_hash, name FROM users WHERE email = %s",
            (email,)
        )
        user_row = cur.fetchone()
        
        cur.close()
        conn.close()
        
        if not user_row:
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Неверный email или пароль'}),
                'isBase64Encoded': False
            }
        
        user_id, user_email, password_hash, user_name = user_row
        
        if not bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8')):
            return {
                'statusCode': 401,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'Неверный email или пароль'}),
                'isBase64Encoded': False
            }
        
        jwt_secret = os.environ.get('JWT_SECRET', 'fallback_secret_key')
        expiration = datetime.utcnow() + timedelta(days=7)
        
        token = jwt.encode(
            {
                'userId': user_id,
                'email': user_email,
                'exp': expiration
            },
            jwt_secret,
            algorithm='HS256'
        )
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'token': token,
                'user': {
                    'id': user_id,
                    'email': user_email,
                    'name': user_name
                }
            }),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'}),
            'isBase64Encoded': False
        }