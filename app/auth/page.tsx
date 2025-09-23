"use client";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'signup';

export default function AuthPage() {
  const router = useRouter();
	const [mode, setMode] = useState<AuthMode>('login');
	const [form, setForm] = useState({
		name: '',
		email: '',
		country: '',
		interestedIn: '',
		password: '',
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		setError('');
		// TODO: Implement API call for login/signup
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_BASE}/auth/${mode === 'login' ? 'login' : 'signup'}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (response.ok) {
      console.log(data)
      router.push('/resumes')

    } else {
      setError(data.error || 'Something went wrong');
    }

    setLoading(false);
	}

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<Card className="w-full max-w-md bg-white shadow-lg p-6 rounded-lg">
				<CardHeader className="mb-4 text-center">
					<h2 className="text-2xl font-bold mb-2">{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
					<div className="flex justify-center gap-2">
						<Button variant={mode === 'login' ? 'default' : 'outline'} onClick={() => setMode('login')}>Login</Button>
						<Button variant={mode === 'signup' ? 'default' : 'outline'} onClick={() => setMode('signup')}>Sign Up</Button>
					</div>
				</CardHeader>
				<CardContent>
					<form className="space-y-4" onSubmit={handleSubmit}>
						{mode === 'signup' && (
							<>
								<div>
									<Label htmlFor="name">Name</Label>
									<Input id="name" name="name" value={form.name} onChange={handleChange} required autoComplete="name" />
								</div>
								<div>
									<Label htmlFor="country">Country</Label>
									<Input id="country" name="country" value={form.country} onChange={handleChange} autoComplete="country" />
								</div>
								<div>
									<Label htmlFor="interestedIn">Interested In</Label>
									<Input id="interestedIn" name="interestedIn" value={form.interestedIn} onChange={handleChange} autoComplete="off" />
								</div>
							</>
						)}
						<div>
							<Label htmlFor="email">Email</Label>
							<Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" />
						</div>
						<div>
							<Label htmlFor="password">Password</Label>
							<Input id="password" name="password" type="password" value={form.password} onChange={handleChange} required autoComplete={mode === 'login' ? 'current-password' : 'new-password'} />
						</div>
						{error && <div className="text-red-500 text-sm">{error}</div>}
						<Button type="submit" className="w-full" disabled={loading}>
							{loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Sign Up'}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}