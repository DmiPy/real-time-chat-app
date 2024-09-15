import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

interface CreateProfilePageProps {
  email?: string; // Passed from AuthPage
}

const CreateProfilePage: React.FC<CreateProfilePageProps> = () => {
  const [selectedColor, setSelectedColor] = useState('purple'); // Default color

  const { register, handleSubmit, setValue } = useForm();
  const location = useLocation();
  const email = location.state?.email; // Retrieve email from location.state

  // Autofill the email field if email prop exists
  useEffect(() => {
    if (email) {
    console.log('Email from location:', email);
      setValue('email', email); 
    }
  }, [email, setValue]);

  const onSubmit = (data: any) => {
    console.log('Profile Data:', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <Card className="bg-slate-800 p-6 rounded-md w-96">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Profile Picture and Color Selection */}
            <div className="flex justify-center items-center space-x-4">
              <div className="rounded-full h-24 w-24 bg-red-600 flex items-center justify-center">
                <span className="text-3xl text-white">J</span>
              </div>
              {/* Color Select */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`rounded-full h-8 w-8 bg-purple-500 ${selectedColor === 'purple' ? 'ring-4 ring-purple-700' : ''}`}
                  onClick={() => setSelectedColor('purple')}
                />
                <button
                  type="button"
                  className={`rounded-full h-8 w-8 bg-yellow-500 ${selectedColor === 'yellow' ? 'ring-4 ring-yellow-700' : ''}`}
                  onClick={() => setSelectedColor('yellow')}
                />
                <button
                  type="button"
                  className={`rounded-full h-8 w-8 bg-teal-500 ${selectedColor === 'teal' ? 'ring-4 ring-teal-700' : ''}`}
                  onClick={() => setSelectedColor('teal')}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email')}
                className="bg-slate-700 text-white"
              />
            </div>

            {/* First Name Input */}
            <div>
              <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="First Name"
                {...register('firstName')}
                className="bg-slate-700 text-white"
              />
            </div>

            {/* Last Name Input */}
            <div>
              <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Last Name"
                {...register('lastName')}
                className="bg-slate-700 text-white"
              />
            </div>

            {/* Save Button */}
            <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProfilePage;
