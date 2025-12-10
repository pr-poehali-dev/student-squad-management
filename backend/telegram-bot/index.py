import json
import os
import psycopg2
import jwt
from datetime import datetime, timedelta
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Telegram бот для авторизации пользователей
    Обрабатывает webhook от Telegram и генерирует JWT токены
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
    
    if method == 'GET':
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'status': 'Telegram bot is running'}),
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
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True}),
                'isBase64Encoded': False
            }
        
        update = json.loads(body_str)
        
        if 'message' not in update:
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json'},
                'body': json.dumps({'ok': True}),
                'isBase64Encoded': False
            }
        
        message = update['message']
        chat_id = message['chat']['id']
        text = message.get('text', '')
        telegram_user = message['from']
        telegram_id = telegram_user['id']
        first_name = telegram_user.get('first_name', 'Пользователь')
        
        bot_token = os.environ.get('TELEGRAM_BOT_TOKEN')
        
        if text == '/start':
            conn = psycopg2.connect(os.environ['DATABASE_URL'])
            cur = conn.cursor()
            
            cur.execute("SELECT id, email, name FROM users WHERE telegram_id = %s", (telegram_id,))
            user_row = cur.fetchone()
            
            if user_row:
                user_id, email, name = user_row
                
                jwt_secret = os.environ.get('JWT_SECRET', 'fallback_secret_key')
                expiration = datetime.utcnow() + timedelta(days=5)
                
                token = jwt.encode(
                    {
                        'userId': user_id,
                        'email': email,
                        'exp': expiration
                    },
                    jwt_secret,
                    algorithm='HS256'
                )
                
                auth_url = f"{os.environ.get('FRONTEND_URL', 'http://localhost:5173')}/telegram-auth?token={token}"
                
                send_message(bot_token, chat_id, 
                    f"✅ Привет, {name}!\n\n"
                    f"Нажми на кнопку ниже для входа в систему:\n\n"
                    f"👉 {auth_url}")
            else:
                send_message(bot_token, chat_id,
                    f"👋 Привет, {first_name}!\n\n"
                    f"Для начала зарегистрируйтесь на сайте.\n"
                    f"После регистрации привяжите Telegram аккаунт в настройках.\n\n"
                    f"Ваш Telegram ID: {telegram_id}")
            
            cur.close()
            conn.close()
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'ok': True}),
            'isBase64Encoded': False
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Ошибка: {str(e)}'}),
            'isBase64Encoded': False
        }

def send_message(bot_token: str, chat_id: int, text: str):
    """Отправка сообщения через Telegram Bot API"""
    import urllib.request
    import urllib.parse
    
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'HTML'
    }).encode()
    
    req = urllib.request.Request(url, data=data)
    urllib.request.urlopen(req)
