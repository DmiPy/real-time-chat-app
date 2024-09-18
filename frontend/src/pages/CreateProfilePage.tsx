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

function getNameInitials(mail: string, firstName?: string, lastName?: string): string {
  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`
  }
  else if (firstName) {
    return `${firstName[0]}`
  }
  else if (lastName){
    return `${lastName[0]}`
  }
  return mail[0].toUpperCase()
}

const CreateProfilePage: React.FC<CreateProfilePageProps> = () => {
  const [selectedColor, setSelectedColor] = useState('red'); // Default color

  const { register, handleSubmit, setValue } = useForm();
  const location = useLocation();
  const email = location.state?.email; // Retrieve email from location.state
  // Состояние для хранения имени и фамилии
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  // Инициализация и получение инициалов
  const initials = getNameInitials(email, firstName, lastName);

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
              <div className={`rounded-full h-24 w-24 flex items-center justify-center 
                  ${selectedColor === 'purple' && 'bg-purple-600'}
                  ${selectedColor === 'teal' && 'bg-teal-600'}
                  ${selectedColor === 'yellow' && 'bg-yellow-600'}
                  ${selectedColor === 'red' && 'bg-red-600'}
              `}>
                <span className="text-3xl text-white">{`${initials}`}</span>
              </div>
              {/* Color Select */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  className={`rounded-full h-8 w-8 bg-red-500 ${selectedColor === 'red' ? 'ring-4 ring-red-700' : ''}`}
                  onClick={() => setSelectedColor('red')}
                />
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
                onChange={handleFirstNameChange}
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
                onChange={handleLastNameChange}
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
