import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const mockData = {
  stats: {
    totalMembers: 156,
    activeProjects: 8,
    upcomingEvents: 4,
    completedTasks: 87
  },
  squads: [
    { id: 1, name: 'Строительный отряд "Молот"', type: 'Строительный', members: 45, rating: 4.8 },
    { id: 2, name: 'Педагогический отряд "Солнце"', type: 'Педагогический', members: 32, rating: 4.9 },
    { id: 3, name: 'Сервисный отряд "Волна"', type: 'Сервисный', members: 28, rating: 4.7 },
    { id: 4, name: 'Проводники "Путь"', type: 'Проводники', members: 24, rating: 4.6 }
  ],
  members: [
    { id: 1, name: 'Алексей Иванов', role: 'Командир', squad: 'Молот', rating: 98, points: 1250 },
    { id: 2, name: 'Мария Петрова', role: 'Комиссар', squad: 'Солнце', rating: 95, points: 1180 },
    { id: 3, name: 'Дмитрий Смирнов', role: 'Боец', squad: 'Волна', rating: 92, points: 1050 },
    { id: 4, name: 'Анна Козлова', role: 'Наставник', squad: 'Молот', rating: 90, points: 980 }
  ],
  activities: [
    { id: 1, user: 'Алексей Иванов', action: 'создал новый проект', squad: 'Молот', time: '5 мин назад', type: 'project' },
    { id: 2, user: 'Мария Петрова', action: 'опубликовала объявление', squad: 'Солнце', time: '15 мин назад', type: 'announcement' },
    { id: 3, user: 'Дмитрий Смирнов', action: 'завершил задачу', squad: 'Волна', time: '1 час назад', type: 'task' },
    { id: 4, user: 'Анна Козлова', action: 'добавила новое мероприятие', squad: 'Молот', time: '2 часа назад', type: 'event' }
  ],
  events: [
    { id: 1, title: 'Школа комсостава', date: '15 декабря 2025', participants: 45, location: 'МГУ' },
    { id: 2, title: 'Зимний слёт РСО', date: '22 декабря 2025', participants: 120, location: 'Подмосковье' },
    { id: 3, title: 'Планирование сезона', date: '10 января 2026', participants: 35, location: 'Онлайн' }
  ],
  tasks: [
    { id: 1, title: 'Подготовка документов на сезон', status: 'in-progress', assignee: 'Алексей Иванов', progress: 65 },
    { id: 2, title: 'Разработка учебной программы', status: 'in-progress', assignee: 'Мария Петрова', progress: 40 },
    { id: 3, title: 'Организация транспорта', status: 'pending', assignee: 'Дмитрий Смирнов', progress: 15 },
    { id: 4, title: 'Согласование с заказчиками', status: 'completed', assignee: 'Анна Козлова', progress: 100 }
  ]
};

const Index = () => {

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return 'Briefcase';
      case 'announcement': return 'Megaphone';
      case 'task': return 'CheckCircle2';
      case 'event': return 'Calendar';
      default: return 'Activity';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-heading font-bold text-foreground">РСО Управление</h1>
              <p className="text-xs text-muted-foreground">Студенческие отряды</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="Settings" size={20} />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary text-white font-medium">АИ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="container px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8 animate-fade-in">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Всего бойцов</CardTitle>
              <Icon name="Users" size={20} className="text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold text-foreground">{mockData.stats.totalMembers}</div>
              <p className="text-xs text-muted-foreground mt-1">+12% за месяц</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Активные проекты</CardTitle>
              <Icon name="Briefcase" size={20} className="text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold text-foreground">{mockData.stats.activeProjects}</div>
              <p className="text-xs text-muted-foreground mt-1">3 в работе</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Мероприятия</CardTitle>
              <Icon name="Calendar" size={20} className="text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold text-foreground">{mockData.stats.upcomingEvents}</div>
              <p className="text-xs text-muted-foreground mt-1">В ближайший месяц</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Выполнено задач</CardTitle>
              <Icon name="CheckCircle2" size={20} className="text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading font-bold text-foreground">{mockData.stats.completedTasks}%</div>
              <p className="text-xs text-muted-foreground mt-1">За этот месяц</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6 animate-slide-up">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="overview" className="gap-2">
              <Icon name="LayoutDashboard" size={16} />
              <span className="hidden sm:inline">Обзор</span>
            </TabsTrigger>
            <TabsTrigger value="squads" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Отряды</span>
            </TabsTrigger>
            <TabsTrigger value="rating" className="gap-2">
              <Icon name="Trophy" size={16} />
              <span className="hidden sm:inline">Рейтинг</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="gap-2">
              <Icon name="Calendar" size={16} />
              <span className="hidden sm:inline">События</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="gap-2">
              <Icon name="ListTodo" size={16} />
              <span className="hidden sm:inline">Задачи</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="font-heading">Лента активности</CardTitle>
                  <CardDescription>Последние действия в отрядах</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name={getActivityIcon(activity.type)} size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          <span className="font-semibold">{activity.user}</span>
                          {' '}{activity.action}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{activity.squad}</Badge>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-heading">Ближайшие события</CardTitle>
                  <CardDescription>Предстоящие мероприятия</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockData.events.slice(0, 3).map((event) => (
                    <div key={event.id} className="p-4 rounded-lg border hover:border-primary/50 transition-colors cursor-pointer">
                      <h4 className="font-semibold text-sm mb-2">{event.title}</h4>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Icon name="Calendar" size={14} />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="MapPin" size={14} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Icon name="Users" size={14} />
                          <span>{event.participants} участников</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="squads" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mockData.squads.map((squad) => (
                <Card key={squad.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-heading text-lg">{squad.name}</CardTitle>
                        <CardDescription className="mt-1">
                          <Badge variant="secondary">{squad.type}</Badge>
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{squad.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon name="Users" size={16} />
                          <span>{squad.members} бойцов</span>
                        </div>
                        <Button size="sm" variant="outline">
                          Подробнее
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rating" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Топ бойцов</CardTitle>
                <CardDescription>Рейтинг по активности и достижениям</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockData.members.map((member, index) => (
                    <div key={member.id} className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="text-2xl font-heading font-bold text-muted-foreground w-8">
                        #{index + 1}
                      </div>
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-medium">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{member.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{member.role}</Badge>
                          <span className="text-xs text-muted-foreground">{member.squad}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-heading font-bold text-primary">{member.points}</div>
                        <div className="text-xs text-muted-foreground">баллов</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.events.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="font-heading text-lg">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Calendar" size={16} />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="MapPin" size={16} />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Users" size={16} />
                        <span>{event.participants} участников</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      Зарегистрироваться
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Текущие задачи</CardTitle>
                <CardDescription>Управление проектами и задачами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockData.tasks.map((task) => (
                  <div key={task.id} className="p-4 rounded-lg border hover:border-primary/50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{task.title}</h4>
                        <div className="flex items-center gap-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground">{task.assignee}</span>
                        </div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(task.status)}`} />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Прогресс</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;