import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useNavigate } from 'react-router-dom';

// Zod schema for validation
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }).min(5, { message: "Email should me at least 5 characters long." }),
  password: z.string()
    .regex(/[A-Z]/, { message: "Pass does not contain any uppercase character" })
    .regex(/[a-z]/, { message: "Pass does not contaun any lowercase character" })
    .regex(/[0-9]/, { message: "Pass does not contain any numbers in it" })
    .regex(/[!#$%^&*(){}?]/, { message: "Special charachters?" })
    .min(8, { message: "At least 8 characters, dude c'mon" }),
  confirm_password: z.string().min(8)
})

type FormInputs = z.infer<typeof formSchema>;

const AuthPage: React.FC = () => {
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ifConfirmedPassCorrect , setIfConfirmedPassCorrect ] = useState<boolean>(true);
  const [isSignUp, setIsSignUp] = useState(true);
  const navigate = useNavigate()
  const methods = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Ensure these are initialized
      email: '',
      password: '',
      confirm_password: '',
        }
  });



  const { handleSubmit, formState: { errors } } = methods;

  const handleLogin = (email: string) => {
    navigate("/create/profile", { state: { email } })
  }

  // const { getValues } = methods;
  // const currentValues = getValues();
  const onSubmit = (data: FormInputs) => {
    setEmail(data.email);
    setPassword(data.password);
    // console.log("current values", currentValues.email, currentValues.password);
    
    if (isSignUp ) {
      if (data.password === data.confirm_password) {
        setIfConfirmedPassCorrect(true);      
        handleLogin(data.email)
      } else {
        setIfConfirmedPassCorrect(false);
      }
      
    } else {
      console.log('Login:', data);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="bg-white shadow-lg rounded-md flex overflow-hidden w-[50%]">
        {/* Left side with form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

          {/* Wrap form components inside FormProvider */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>  
              <FormField
                control={methods.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                  </FormItem>
                )}
              />

              <FormField
                control={methods.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <FormField
                control={methods.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        {...field}
                        // onChange={(e) => {
                        //   field.onChange(e); // Call RHF's onChange to maintain form state
                        //   console.log(e.target.value); // Add your custom onChange logic
                        // }}
                      />
                    </FormControl>
                    <FormMessage>{ifConfirmedPassCorrect ? "" : "Passwords do not match"}</FormMessage>
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center my-4">
                {isSignUp ?
                  (<label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    <span>Remember Me</span>
                  </label>)
                  : <><a href="#" className="text-sm text-gray-500">Forgot Password?</a></>}
              </div>

              <Button variant="default" type="submit" className="w-full bg-gradient-to-r from-purple-500 to-red-500 text-white">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </form>
          </FormProvider>
        </div>

        {/* Right side */}
        <div className="w-1/2 bg-gradient-to-r from-purple-500 to-red-500 flex flex-col justify-center items-center p-8">
          <h2 className="text-white text-3xl font-bold mb-4">
            {isSignUp ? 'Welcome to Registration' : 'Welcome to Login'}
          </h2>
          <p className="text-white mb-4">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
          </p>
          <Button
            variant="ghost"
            onClick={() => setIsSignUp(!isSignUp)}
            className="border-white text-white w-32"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
