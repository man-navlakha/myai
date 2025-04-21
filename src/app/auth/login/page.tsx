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
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Login ',
  description: '',
};

const Login = () => {
  return (
    <>
    <div className='bg-white h-screen overflow-hidden dark:bg-black dark:text-white flex justify-center w-full'>
        <div className={"w-full max-w-2xl flex flex-col justify-center gap-2 mx-4"}>
            <Card>
                <Link href="/" >
                    <div className="flex flex-col items-center">
                        {/* <img src='/view.png' width="50px" alt="Website Logo" className="mr-2 " /> */}
                        <h1 className='font-black text-xl'>Solvinger</h1>
                    </div>
                </Link>
                <CardHeader>
                    <CardTitle className="text-2xl">Welcome Back!</CardTitle>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
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