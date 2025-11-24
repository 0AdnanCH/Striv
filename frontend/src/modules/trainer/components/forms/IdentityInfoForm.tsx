'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { identityInfoSchema, type IdentityInfoType } from '../../schemas/identityInfo.schema';

import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../../components/ui/Select';

import { Input } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';
import { Label } from '@radix-ui/react-label';
import { trainerRegistrationService } from '../../api/registration.service';
import { handleApiError } from '../../../../utils/handleApiError.util';
import { toast } from 'sonner';

const ACCEPTED_EXT = '.jpg, .jpeg, .png, .webp';

const defaultValues: IdentityInfoType = {
  documentType: 'aadhar',
  frontImage: undefined as any,
  backImage: undefined as any
};

const IdentityInfoForm: React.FC<{ onNext?: (data: IdentityInfoType) => void }> = ({ onNext }) => {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting }
  } = useForm<IdentityInfoType>({
    resolver: zodResolver(identityInfoSchema),
    mode: 'onBlur',
    defaultValues
  });

  const docType = watch('documentType');

  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const extractFile = (v: any): File | null => {
    if (!v) return null;
    if (v instanceof File) return v;
    if (v instanceof FileList && v.length > 0) return v[0];
    if (Array.isArray(v) && v.length > 0 && v[0] instanceof File) return v[0];
    return null;
  };

  useEffect(() => {
    const file = extractFile(watch('frontImage'));
    if (file) {
      const url = URL.createObjectURL(file);
      setFrontPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setFrontPreview(null);
  }, [watch('frontImage')]);

  useEffect(() => {
    const file = extractFile(watch('backImage'));
    if (file) {
      const url = URL.createObjectURL(file);
      setBackPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setBackPreview(null);
  }, [watch('backImage')]);

  useEffect(() => {
    if (docType === 'pan_card') {
      setValue('backImage', undefined, { shouldValidate: true });
      setBackPreview(null);
    }
  }, [docType, setValue]);

  const setFileField = (field: 'frontImage' | 'backImage', files: FileList | null) => {
    if (!files || files.length === 0) {
      setValue(field, undefined, { shouldValidate: true });
      return;
    }
    setValue(field, files, { shouldValidate: true });
  };

  const onSubmit = async (payload: IdentityInfoType) => {
    // onNext?.(data);
    if (onNext) {
      try {
        const res = await trainerRegistrationService.submitIdentityInfo(payload);
        toast.success(res.message);
      } catch (err: any) {
        handleApiError('Trainer Identity Info POST', err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label className="mb-2 block text-sm font-medium">Document Type</Label>

          <Controller
            control={control}
            name="documentType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={(v) => field.onChange(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="aadhar">Aadhar Card</SelectItem>
                  <SelectItem value="driving_license">Driving License</SelectItem>
                  <SelectItem value="pan_card">PAN Card</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.documentType?.message && <p className="mt-1 text-sm text-red-600">{errors.documentType.message}</p>}
        </div>

        <div>
          <Label className="mb-2 block text-sm font-medium">Front Image</Label>

          <Input type="file" accept={ACCEPTED_EXT} onChange={(e) => setFileField('frontImage', e.target.files)} />

          {frontPreview && <img src={frontPreview} className="h-28 w-28 object-cover border rounded-md mt-2" alt="Front" />}

          {typeof errors.frontImage?.message === 'string' && <p className="mt-1 text-sm text-red-600">{errors.frontImage.message}</p>}

          <p className="text-xs text-gray-500 mt-1">Allowed: jpg, jpeg, png, webp — Max: 3MB</p>
        </div>

        {docType !== 'pan_card' && (
          <div>
            <Label className="mb-2 block text-sm font-medium">Back Image</Label>

            <Input type="file" accept={ACCEPTED_EXT} onChange={(e) => setFileField('backImage', e.target.files)} />

            {backPreview && <img src={backPreview} className="h-28 w-28 object-cover border rounded-md mt-2" alt="Back" />}

            {typeof errors.backImage?.message === 'string' && <p className="mt-1 text-sm text-red-600">{errors.backImage.message}</p>}

            <p className="text-xs text-gray-500 mt-1">Allowed: jpg, jpeg, png, webp — Max: 3MB</p>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={() => console.log('Previous')}>
            Previous
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default IdentityInfoForm;