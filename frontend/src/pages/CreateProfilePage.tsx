import React, { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { Upload } from 'lucide-react';

interface CreateProfilePageProps {
  email?: string; // Passed from AuthPage
}

function getNameInitials(mail: string, firstName?: string, lastName?: string): string {
  let initials = '';

  if (firstName && lastName) {
    initials = `${firstName[0]}${lastName[0]}`;
  } else if (firstName) {
    initials = `${firstName[0]}`;
  } else if (lastName) {
    initials = `${lastName[0]}`;
  }

  return initials ? initials.toUpperCase() : mail[0].toUpperCase();
}

const CreateProfilePage: React.FC<CreateProfilePageProps> = () => {
  const { register, handleSubmit, setValue } = useForm();
  const location = useLocation();
  const email = location.state?.email;
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Preview the image
        setAvatarPreview(reader.result as string); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const initials = getNameInitials(email, firstName, lastName);

  useEffect(() => {
    if (email) {
      setValue('email', email);
      console.log(avatarPreview);
    }
  }, [email, setValue]);

  const onSubmit = (data: any) => {
    const profileData = {
      ...data,
      firstName,
      lastName,
      avatar: avatarPreview
    };

    console.log('Profile Data with Avatar:', profileData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="bg-white border border-gray-300 p-6 rounded-md w-96 shadow-md">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex justify-center items-center space-x-4">
              {/* Avatar Preview */}
              <Avatar className="w-24 h-24">
                {avatarPreview ? (
                  <AvatarImage src={avatarPreview} alt="Uploaded Avatar" />
                ) : (
                  <AvatarFallback>{initials}</AvatarFallback>
                )}
              </Avatar>

              {/* Trigger file input */}
              <Button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 text-white"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Avatar
              </Button>

              {/* Hidden file input */}
              <Input
               // Connect file input with ref
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </div>

            {/* Email Input */}
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register('email')}
                className="bg-gray-100 text-gray-800"
              />
            </div>

            {/* First Name Input */}
            <div>
              <Label htmlFor="firstName" className="text-gray-700">First Name</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="First Name"
                {...register('firstName')}
                className="bg-gray-100 text-gray-800"
                onChange={handleFirstNameChange}
              />
            </div>

            {/* Last Name Input */}
            <div>
              <Label htmlFor="lastName" className="text-gray-700">Last Name</Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Last Name"
                {...register('lastName')}
                className="bg-gray-100 text-gray-800"
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
