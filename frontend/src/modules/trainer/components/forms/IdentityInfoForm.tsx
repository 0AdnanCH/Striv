'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { identityInfoSchema, type IdentityInfoType } from '../../schemas/identityInfo.schema';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../../../../components/ui/Select';
import { Input } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';
import { Label } from '@radix-ui/react-label';
import { useTrainer } from '../../hooks/useTrainer';

interface Props {
  loading: boolean;
  onNext?: (data: IdentityInfoType) => void;
  onPrev?: () => void;
}

const ACCEPTED_EXT = '.jpg, .jpeg, .png, .webp';

const defaultValues: IdentityInfoType = {
  documentType: 'aadhaar',
  frontImage: undefined as any,
  backImage: undefined as any
};

const IdentityInfoForm: React.FC<Props> = ({ loading, onNext, onPrev }) => {
  const { kyc } = useTrainer();

  // used to avoid running the "initial reset" more than once
  const initializedRef = useRef(false);

  const {
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors }
  } = useForm<IdentityInfoType>({
    resolver: zodResolver(identityInfoSchema),
    mode: 'onBlur',
    defaultValues
  });

  // Keep preview URLs separate from form values
  const [frontPreview, setFrontPreview] = useState<string | null>(kyc?.frontImage ?? null);
  const [backPreview, setBackPreview] = useState<string | null>(kyc?.backImage ?? null);

  // derive docType from form state (controlled)
  const docType = watch('documentType');

  // Utility: extract a File from a possible File | FileList | undefined
  const extractFile = (v: any): File | null => {
    if (!v) return null;
    if (v instanceof File) return v;
    if (typeof FileList !== 'undefined' && v instanceof FileList) return v.length > 0 ? v[0] : null;
    if (Array.isArray(v) && v.length > 0 && v[0] instanceof File) return v[0];
    return null;
  };

  // INITIALIZATION: only run reset when KYC arrives the first time (or changes from null to a value)
  useEffect(() => {
    if (!kyc) return;

    // If we've already initialized the form from KYC, don't reset again (prevents overwriting user changes)
    if (initializedRef.current) {
      // still sync previews if they changed on backend (but don't reset form fields)
      if (kyc.frontImage) setFrontPreview(kyc.frontImage);
      if (kyc.backImage) setBackPreview(kyc.backImage ?? null);
      return;
    }

    // Reset only once using KYC values as initial defaults
    reset({
      documentType: (kyc.documentType as IdentityInfoType['documentType']) ?? 'aadhaar',
      // file inputs must be undefined (we display preview separately)
      frontImage: (kyc.frontImage as string) || undefined,
      backImage: (kyc.backImage as string) || undefined
    });
    console.log(docType)

    setFrontPreview(kyc.frontImage ?? null);
    setBackPreview(kyc.backImage ?? null);

    initializedRef.current = true;
  }, [kyc, reset]);

  // When user selects a file for frontImage, show the object URL preview immediately
  useEffect(() => {
    const file = extractFile(watch('frontImage'));
    if (file) {
      const url = URL.createObjectURL(file);
      setFrontPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    // if no file selected and KYC has a stored URL, show that; otherwise clear
    if (kyc?.frontImage) {
      setFrontPreview(kyc.frontImage);
      return;
    }

    setFrontPreview(null);
  }, [watch('frontImage'), kyc]);

  // Same for backImage
  useEffect(() => {
    const file = extractFile(watch('backImage'));
    if (file) {
      const url = URL.createObjectURL(file);
      setBackPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    if (kyc?.backImage) {
      setBackPreview(kyc.backImage);
      return;
    }

    setBackPreview(null);
  }, [watch('backImage'), kyc]);

  // If user chooses PAN, automatically clear backImage input and preview (form-level)
  useEffect(() => {
    if (docType === 'pan_card') {
      setValue('backImage', undefined, { shouldValidate: true, shouldDirty: true });
      setBackPreview(null);
    }
  }, [docType, setValue]);

  const setFileField = (field: 'frontImage' | 'backImage', files: FileList | null) => {
    if (!files || files.length === 0) {
      setValue(field, undefined, { shouldValidate: true, shouldDirty: true });
      return;
    }
    // store FileList in form; validation helper will pick it up
    setValue(field, files, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (payload: IdentityInfoType) => {
    onNext?.(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto" noValidate>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <Label className="mb-2 block text-sm font-medium">Document Type</Label>

          <Controller
            control={control}
            name="documentType"
            render={({ field }) => (
              <Select key={field.value} value={field.value} onValueChange={(v) => field.onChange(v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
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
          <Button type="button" variant="outline" onClick={onPrev}>
            Previous
          </Button>

          <Button type="submit" disabled={loading}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default IdentityInfoForm;