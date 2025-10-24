import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface RobloxProfile {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  friends: number;
  followers: number;
  following: number;
  joinDate: string;
}

const mockProfiles: RobloxProfile[] = [
  {
    id: '1',
    username: 'Avaner',
    displayName: 'Avaner Rajdhani',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Avaner',
    friends: 1250,
    followers: 3420,
    following: 890,
    joinDate: '2018-03-15'
  },
  {
    id: '2',
    username: 'GamerPro',
    displayName: 'Pro Gamer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GamerPro',
    friends: 890,
    followers: 2100,
    following: 450,
    joinDate: '2019-07-22'
  },
  {
    id: '3',
    username: 'BuildMaster',
    displayName: 'Master Builder',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BuildMaster',
    friends: 2340,
    followers: 5670,
    following: 1200,
    joinDate: '2017-11-08'
  }
];

const ProfileCard = ({ profile }: { profile: RobloxProfile }) => {
  return (
    <Card className="bg-card/50 backdrop-blur border-primary/20 p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 group-hover:animate-glow">
            <img 
              src={profile.avatar} 
              alt={profile.username}
              className="w-full h-full rounded-full bg-background"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full border-2 border-background flex items-center justify-center">
            <Icon name="Check" size={14} className="text-background" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-foreground truncate">{profile.displayName}</h3>
          <p className="text-muted-foreground text-sm">@{profile.username}</p>
          
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">{profile.friends}</div>
              <div className="text-xs text-muted-foreground">Друзья</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-accent">{profile.followers}</div>
              <div className="text-xs text-muted-foreground">Подписчики</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{profile.following}</div>
              <div className="text-xs text-muted-foreground">Подписки</div>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="Calendar" size={14} />
            <span>Присоединился {new Date(profile.joinDate).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
        </div>
        
        <Button 
          size="sm" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
        >
          Просмотр
        </Button>
      </div>
    </Card>
  );
};

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'home' | 'search'>('home');

  const filteredProfiles = mockProfiles.filter(profile =>
    profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <nav className="border-b border-border/40 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <Icon name="Gamepad2" size={24} className="text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  RoStats
                </h1>
              </div>
              
              <div className="flex items-center gap-2 bg-card/50 backdrop-blur rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('home')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === 'home'
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Home" size={18} />
                    <span>Главная</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('search')}
                  className={`px-4 py-2 rounded-md font-medium transition-all ${
                    activeTab === 'search'
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon name="Search" size={18} />
                    <span>Поиск профилей</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {activeTab === 'home' ? (
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-block">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 animate-float">
                  <Icon name="Trophy" size={48} className="text-white" />
                </div>
              </div>
              
              <h1 className="text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  RoStats
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Просматривайте статистику и информацию о любых Roblox профилях. Быстрый поиск, подробная статистика.
              </p>
              
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Введите имя пользователя..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 h-14 text-lg bg-card/50 backdrop-blur border-primary/20 focus:border-primary/50 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
                <Card className="bg-card/50 backdrop-blur border-primary/20 p-6 hover:border-accent/50 transition-all">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Zap" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Быстрый поиск</h3>
                  <p className="text-sm text-muted-foreground">Мгновенный доступ к информации о профилях</p>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur border-primary/20 p-6 hover:border-primary/50 transition-all">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon name="BarChart3" size={24} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Статистика</h3>
                  <p className="text-sm text-muted-foreground">Подробная информация о друзьях и подписчиках</p>
                </Card>
                
                <Card className="bg-card/50 backdrop-blur border-primary/20 p-6 hover:border-accent/50 transition-all">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Icon name="Shield" size={24} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Безопасно</h3>
                  <p className="text-sm text-muted-foreground">Только публичная информация профилей</p>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto space-y-6">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Поиск по имени пользователя..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-12 bg-card/50 backdrop-blur border-primary/20 focus:border-primary/50 rounded-xl"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    {searchQuery ? `Результаты (${filteredProfiles.length})` : 'Популярные профили'}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="Users" size={16} />
                    <span>{filteredProfiles.length} профилей</span>
                  </div>
                </div>
                
                {filteredProfiles.length > 0 ? (
                  filteredProfiles.map(profile => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))
                ) : (
                  <Card className="bg-card/50 backdrop-blur border-primary/20 p-12 text-center">
                    <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-bold mb-2">Профили не найдены</h3>
                    <p className="text-muted-foreground">Попробуйте изменить запрос</p>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
