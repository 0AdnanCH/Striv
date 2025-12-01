import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { personalInfoSchema, type PersonalInfoType } from '../../schemas/personalInfo.schema'; 
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from '../../../../components/ui/select';
import { Label } from '@radix-ui/react-label';
import { SelectGroup } from '@radix-ui/react-select';
import { useTrainer } from '../../hooks/useTrainer';
import { Gender } from '../../../../constants/gender.constant';

interface Props {
  loading: boolean;
  onNext?: (data: PersonalInfoType) => void;
}

const defaultValues: PersonalInfoType = {
  first_name: '',
  last_name: '',
  gender: Gender.MALE,
  age: undefined as any,
  phone: '',
  profile_photo: undefined as any,
  existingProfilePhotoUrl: null,
};

const PersonalInfoForm: React.FC<Props> = ({ onNext, loading }) => {
  const { trainer } = useTrainer();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<PersonalInfoType>({
    resolver: zodResolver(personalInfoSchema),
    mode: 'onTouched',
    defaultValues
  });

  useEffect(() => {
    if (!trainer) return;

    reset({
      first_name: trainer.first_name || '',
      last_name: trainer.last_name || '',
      gender: trainer.gender || Gender.MALE,
      age: trainer.age || undefined,
      phone: trainer.phone || '',
      profile_photo: undefined,
      existingProfilePhotoUrl: trainer.profile_photo || null,
    });

    setPreviewUrl(trainer.profile_photo || null);
  }, [trainer, reset]);


  const watchedPhoto = watch('profile_photo');
  const [previewUrl, setPreviewUrl] = useState<string | null>(trainer?.profile_photo || null);


  useEffect(() => {
    if (!watchedPhoto) return;
    let file: File | null = null;
    if (watchedPhoto instanceof File) file = watchedPhoto;
    else if ((watchedPhoto as FileList)?.length) file = (watchedPhoto as FileList)[0];


    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    setPreviewUrl(null);
  }, [watchedPhoto]);


  const onSubmit = async (data: PersonalInfoType) => {
    const payload: PersonalInfoType = { ...data };
    if ((payload.profile_photo as FileList)?.length) 
      payload.profile_photo = (data.profile_photo as FileList)[0];
   
    onNext?.(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-4">
        {/* First + Last */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="first_name" className="mb-2 block">
              First name
            </Label>
            <Input id="first_name" type="text" placeholder="First name" {...register('first_name')} />
            {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>}
          </div>

          <div>
            <Label htmlFor="last_name" className="mb-2 block">
              Last name
            </Label>
            <Input id="last_name" type="text" placeholder="Last name" {...register('last_name')} />
            {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="gender" className="mb-2 block">
              Gender
            </Label>
            <Controller
              control={control}
              name="gender"
              render={({ field }) => (
                <Select key={field.value} onValueChange={(val) => field.onChange(val)} value={field.value}>
                  <SelectTrigger id="gender">
                    <SelectValue>{field.value}</SelectValue>
                  </SelectTrigger>
                  <SelectContent position="popper" sideOffset={6}>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value={Gender.MALE}>Male</SelectItem>
                      <SelectItem value={Gender.FEMALE}>Female</SelectItem>
                      {/* <SelectItem value="other">Other</SelectItem> */}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
          </div>
          <div>
            <Label htmlFor="age" className="mb-2 block">
              Age
            </Label>
            <Input
              id="age"
              placeholder="Age"
              type="number"
              {...register('age', {
                valueAsNumber: true
              })}
            />
            {errors.age && <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>}
          </div>
        </div>

        {/* Phone */}
        <div>
          <Label htmlFor="phone_no" className="mb-2 block">
            Phone
          </Label>
          <Input
            id="phone_no"
            placeholder="Phone number"
            maxLength={10}
            {...register('phone')}
            onInput={(e: React.FormEvent<HTMLInputElement>) => {
              const input = e.currentTarget;
              input.value = input.value.replace(/\D/g, '');
              if (input.value.length > 10) {
                input.value = input.value.slice(0, 10);
              }
              input.dispatchEvent(new Event('change', { bubbles: true }));
            }}
          />
          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
        </div>

        {/* Profile photo */}
        <div>
          <Label htmlFor="profile_photo" className="mb-2 block">
            Profile photo
          </Label>
          <input
            id="profile_photo"
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            onChange={(e) => {
              const files = e.target.files;
              setValue('profile_photo' as any, files && files.length ? files : undefined, { shouldValidate: true });
            }}
            className="block w-full text-sm text-gray-600"
          />

          {previewUrl && (
            <div className="mt-2">
              <img src={previewUrl} alt="preview" className="h-24 w-24 rounded-full object-cover border" />
            </div>
          )}
          {errors.profile_photo && typeof errors.profile_photo.message === 'string' && <p className="mt-1 text-sm text-red-600">{errors.profile_photo.message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={() => console.log('Previous (none)')}>
            Previous
          </Button>
          <Button type="submit" disabled={loading}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );

}

export default PersonalInfoForm;