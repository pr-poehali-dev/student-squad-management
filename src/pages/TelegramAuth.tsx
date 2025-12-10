import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const TelegramAuth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', JSON.stringify({
          id: payload.userId,
          email: payload.email,
          name: payload.email.split('@')[0]
        }));

        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } catch (error) {
        console.error('Invalid token:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md border-border/50 shadow-xl animate-fade-in">
        <CardHeader className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4 mx-auto">
            <Icon name="CheckCircle2" size={32} className="text-primary animate-pulse" />
          </div>
          <CardTitle className="text-2xl">Вход через Telegram</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Выполняется авторизация...</p>
          <p className="text-sm mt-2">Сейчас вы будете перенаправлены в личный кабинет</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelegramAuth;
