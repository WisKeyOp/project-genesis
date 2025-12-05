import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(email, password)) {
      navigate('/board');
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password. Try admin@test.com / admin123',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm mx-4">
        <div className="bg-card rounded-lg shadow-card p-8 animate-fade-in">
          <h1 className="text-2xl font-bold text-center text-card-foreground mb-8">
            Log in
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@test.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
          
          <p className="text-center text-sm text-muted-foreground mt-6">
            or, <span className="text-primary cursor-pointer hover:underline">sign up</span>
          </p>
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          Demo: admin@test.com / admin123
        </p>
      </div>
    </div>
  );
}
