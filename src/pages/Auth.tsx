import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { login, register } from '@/lib/auth';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      await login({ email, password });
      toast({
        title: 'Успешный вход!',
        description: 'Добро пожаловать обратно',
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: error instanceof Error ? error.message : 'Неверный email или пароль',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      toast({
        title: 'Ошибка',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    try {
      await register({ name, email, password });
      toast({
        title: 'Регистрация успешна!',
        description: 'Теперь войдите в систему',
      });
      
      await login({ email, password });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Ошибка регистрации',
        description: error instanceof Error ? error.message : 'Не удалось создать аккаунт',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
            <Icon name="Rocket" size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Добро пожаловать</h1>
          <p className="text-muted-foreground">
            Войдите или создайте новый аккаунт
          </p>
        </div>

        <Card className="border-border/50 shadow-xl">
          <Tabs defaultValue="login">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Вход</TabsTrigger>
                <TabsTrigger value="register">Регистрация</TabsTrigger>
              </TabsList>
            </CardHeader>

            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <CardContent className="space-y-4">
                  <CardTitle className="text-xl">Вход в аккаунт</CardTitle>
                  <CardDescription>
                    Введите ваши данные для входа
                  </CardDescription>

                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="example@mail.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password">Пароль</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <Button
                    variant="link"
                    className="px-0 h-auto font-normal text-sm"
                    type="button"
                  >
                    Забыли пароль?
                  </Button>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                        Вход...
                      </>
                    ) : (
                      <>
                        <Icon name="LogIn" size={16} className="mr-2" />
                        Войти
                      </>
                    )}
                  </Button>

                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        или продолжить с
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button">
                      <Icon name="Mail" size={16} className="mr-2" />
                      Google
                    </Button>
                    <Button variant="outline" type="button">
                      <Icon name="Github" size={16} className="mr-2" />
                      GitHub
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister}>
                <CardContent className="space-y-4">
                  <CardTitle className="text-xl">Создать аккаунт</CardTitle>
                  <CardDescription>
                    Заполните данные для регистрации
                  </CardDescription>

                  <div className="space-y-2">
                    <Label htmlFor="register-name">Имя</Label>
                    <Input
                      id="register-name"
                      name="name"
                      type="text"
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="example@mail.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password">Пароль</Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password-confirm">Подтвердите пароль</Label>
                    <Input
                      id="register-password-confirm"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      required
                      minLength={6}
                    />
                  </div>

                  <p className="text-xs text-muted-foreground">
                    Регистрируясь, вы соглашаетесь с{' '}
                    <Button variant="link" className="h-auto p-0 text-xs" type="button">
                      условиями использования
                    </Button>
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                        Создание...
                      </>
                    ) : (
                      <>
                        <Icon name="UserPlus" size={16} className="mr-2" />
                        Зарегистрироваться
                      </>
                    )}
                  </Button>

                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        или продолжить с
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button">
                      <Icon name="Mail" size={16} className="mr-2" />
                      Google
                    </Button>
                    <Button variant="outline" type="button">
                      <Icon name="Github" size={16} className="mr-2" />
                      GitHub
                    </Button>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © 2024 Все права защищены
        </p>
      </div>
    </div>
  );
};

export default Auth;