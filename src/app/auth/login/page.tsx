import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company and mission',
};

const Login = () => {
  return (
    <>
    <div className='bg-white h-screen overflow-hidden dark:bg-black dark:text-white flex justify-center w-full'>
        <div className={"w-full max-w-2xl flex flex-col justify-center gap-2 mx-4"}>
            <Card>
                <a href="/" >
                    <div className="flex flex-col items-center">
                        <img src='/view.png' width="50px" alt="Website Logo" className="mr-2 " />
                        <h1 className='font-black text-xl'>Solvinger</h1>
                    </div>
                </a>
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="forget"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className='flex justify-end'>

                                <Button type="submit" variant="outline" className="w-20 dark:bg-[#383838] bg-[#e9e9e9] flex-end">
                                    Login
                                </Button>
                            </div>
                            <Button variant="secondary" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Don&apos;t have an account?{" "}
                            <a href="signup" className="underline underline-offset-4">
                                Sign up
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </div>
</>
  );
};

export default Login;