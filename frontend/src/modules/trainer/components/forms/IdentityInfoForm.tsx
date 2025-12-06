'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { identityInfoSchema, type IdentityInfoType } from '../../schemas/identityInfo.schema';
import { 
  Select, 
  SelectTrigger, 
  SelectValue, 
  SelectContent, 
  SelectItem 
} from '../../../../components/ui/select';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Label } from '@radix-ui/react-label';
import { DocumentType } from '../../constants/trainerDocType.constant';
import type { IdentityInfoPayload, ITrainerIdentityInfo } from '../../types/trainerApplication.types';

interface Props {
  loading: boolean;
  onNext: (data: IdentityInfoPayload) => void;
  defaultValues?: ITrainerIdentityInfo | null
}

const ACCEPTED_EXT = '.jpg, .jpeg, .png, .webp';

const defaultValues = {
  documentType: DocumentType.AADHAAR,
  frontImage: undefined as any,
  backImage: undefined as any
};

const IdentityInfoForm: React.FC<Props> = ({ loading, onNext }) => {
  const {
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors }
  } = useForm<IdentityInfoType>({
    resolver: zodResolver(identityInfoSchema),
    mode: 'onBlur',
    defaultValues: defaultValues
  });

  // Keep preview URLs separate from form values
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  // derive docType from form state (controlled)
  const docType = watch('documentType');
  const frontFile = watch('frontImage');
  const backFile = watch('backImage');

  // When user selects a file for frontImage, show the object URL preview immediately
  useEffect(() => {
    if (!frontFile) {
      setFrontPreview(null);
      return;
    }
    const url = URL.createObjectURL(frontFile);
    setFrontPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [frontFile]);

  // Same for backImage
  useEffect(() => {
    if (!backFile) {
      setBackPreview(null);
      return;
    }

    const url = URL.createObjectURL(backFile);
    setBackPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [backFile]);

  // If user chooses PAN, automatically clear backImage input and preview (form-level)
  useEffect(() => {
    if (docType === DocumentType.PAN_CARD) {
      setValue('backImage', null, { shouldValidate: true, shouldDirty: true });
      setBackPreview(null);
    }
  }, [docType, setValue]);

  const setFileField = (field: 'frontImage' | 'backImage', files: FileList | null) => {
    const file = files && files.length > 0 ? files[0] : null;
    if (!file) {
      setValue(field, null, { shouldValidate: true, shouldDirty: true });
      return;
    }
    // store FileList in form; validation helper will pick it up
    setValue(field, file, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="w-full max-w-3xl mx-auto" noValidate>
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
                  <SelectItem value={DocumentType.AADHAAR}>Aadhaar Card</SelectItem>
                  <SelectItem value={DocumentType.DRIVING_LICENSE}>Driving License</SelectItem>
                  <SelectItem value={DocumentType.PAN_CARD}>PAN Card</SelectItem>
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

        {docType !== DocumentType.PAN_CARD && (
          <div>
            <Label className="mb-2 block text-sm font-medium">Back Image</Label>

            <Input type="file" accept={ACCEPTED_EXT} onChange={(e) => setFileField('backImage', e.target.files)} />

            {backPreview && <img src={backPreview} className="h-28 w-28 object-cover border rounded-md mt-2" alt="Back" />}

            {typeof errors.backImage?.message === 'string' && <p className="mt-1 text-sm text-red-600">{errors.backImage.message}</p>}

            <p className="text-xs text-gray-500 mt-1">Allowed: jpg, jpeg, png, webp — Max: 3MB</p>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default IdentityInfoForm;