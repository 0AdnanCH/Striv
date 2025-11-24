'use client';

import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workInfoSchema, type WorkInfoType } from '../../schemas/workInfo.schema';
import { Input } from '../../../../components/ui/Input';
import { Button } from '../../../../components/ui/Button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectLabel } from '../../../../components/ui/Select';
import { Label } from '@radix-ui/react-label';
import { SelectGroup } from '@radix-ui/react-select';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

type FormValues = WorkInfoType;

const defaultValues: FormValues = {
  oneToOnePrice: undefined as any,
  groupSessionPrice: undefined as any,
  availability: []
};

const WorkInfoForm: React.FC<{ onNext?: (data: FormValues) => void }> = ({ onNext }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(workInfoSchema),
    mode: 'onBlur',
    defaultValues
  });

  const availabilityArray = useFieldArray({
    control,
    name: 'availability' as any
  });

  const addSlot = () =>
    availabilityArray.append({
      day: 'monday',
      startTime: '09:00',
      endTime: '10:00'
    } as any);

  const removeSlot = (index: number) => {
    availabilityArray.remove(index);
  };

  const onSubmit = (raw: FormValues) => {
    const payload: FormValues = {
      ...raw,
      availability: raw.availability
    };

    console.log('WorkInfo submit payload:', payload);
    if (onNext) onNext(payload);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-6">
        {/* Prices */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="one_to_one_price" className="mb-2 block">
              One-to-one session price
            </Label>

            <Controller
              control={control}
              name="oneToOnePrice"
              render={({ field }) => (
                <Input
                  id="one_to_one_price"
                  type="text"
                  placeholder="e.g., 500"
                  value={field.value ?? ''}
                  onChange={(e) => {
                    // allow only digits
                    const cleaned = e.target.value.replace(/\D/g, '');
                    if (cleaned === '') {
                      field.onChange(undefined);
                      return;
                    }
                    const num = Number(cleaned);
                    field.onChange(num);
                  }}
                />
              )}
            />
            {errors.oneToOnePrice && typeof errors.oneToOnePrice.message === 'string' && <p className="mt-1 text-sm text-red-600">{errors.oneToOnePrice.message}</p>}
            <p className="mt-2 text-sm text-gray-500">Enter price in your currency (integers only).</p>
          </div>

          <div>
            <Label htmlFor="group_session_price" className="mb-2 block">
              Group session price
            </Label>

            <Controller
              control={control}
              name="groupSessionPrice"
              render={({ field }) => (
                <Input
                  id="group_session_price"
                  type="text"
                  placeholder="e.g., 300"
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/\D/g, '');
                    if (cleaned === '') {
                      field.onChange(undefined);
                      return;
                    }
                    const num = Number(cleaned);
                    field.onChange(num);
                  }}
                />
              )}
            />
            {errors.groupSessionPrice && typeof errors.groupSessionPrice.message === 'string' && <p className="mt-1 text-sm text-red-600">{errors.groupSessionPrice.message}</p>}
            <p className="mt-2 text-sm text-gray-500">Price for group sessions (integers only).</p>
          </div>
        </div>

        {/* Availability dynamic list */}
        <div>
          <div className="flex items-center justify-between">
            <Label className="mb-2 block">Availability</Label>
            <div className="flex items-center gap-2">
              <Button type="button" variant="outline" size="sm" onClick={addSlot}>
                Add availability
              </Button>
            </div>
          </div>

          <div className="mt-3 space-y-3">
            {availabilityArray.fields.map((field, index) => {
              const fieldError = (errors.availability as any)?.[index];

              return (
                <div key={field.id} className="rounded-md border border-striv-muted/40 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
                    {/* Day select */}
                    <div>
                      <Label className="mb-2 block text-sm">Day</Label>
                      <Controller
                        control={control}
                        name={`availability.${index}.day` as const}
                        render={({ field: selField }) => (
                          <Select onValueChange={(v) => selField.onChange(v)} value={selField.value}>
                            <SelectTrigger size="default">
                              <SelectValue>{(selField.value as string) || 'Select day'}</SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Day</SelectLabel>
                                {DAYS.map((d) => (
                                  <SelectItem key={d} value={d}>
                                    {d[0].toUpperCase() + d.slice(1)}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {fieldError?.day && typeof fieldError.day?.message === 'string' && <p className="mt-1 text-sm text-red-600">{fieldError.day.message}</p>}
                    </div>

                    {/* Start time */}
                    <div>
                      <Label className="mb-2 block text-sm">Start time</Label>
                      <Controller
                        control={control}
                        name={`availability.${index}.startTime` as const}
                        render={({ field: timeField }) => (
                          // input type="time" returns HH:MM string — matches schema
                          <Input type="time" value={timeField.value ?? ''} onChange={(e) => timeField.onChange(e.target.value)} />
                        )}
                      />
                      {fieldError?.startTime && typeof fieldError.startTime?.message === 'string' && <p className="mt-1 text-sm text-red-600">{fieldError.startTime.message}</p>}
                    </div>

                    {/* End time */}
                    <div>
                      <Label className="mb-2 block text-sm">End time</Label>
                      <Controller
                        control={control}
                        name={`availability.${index}.endTime` as const}
                        render={({ field: timeField }) => <Input type="time" value={timeField.value ?? ''} onChange={(e) => timeField.onChange(e.target.value)} />}
                      />
                      {fieldError?.endTime && typeof fieldError.endTime?.message === 'string' && <p className="mt-1 text-sm text-red-600">{fieldError.endTime.message}</p>}
                    </div>

                    {/* Remove button */}
                    <div className="flex items-start md:items-end">
                      <Button type="button" variant="outline" size="sm" onClick={() => removeSlot(index)}>
                        Remove
                      </Button>
                    </div>
                  </div>

                  {/* slot-level refine message */}
                  {fieldError?.message && typeof fieldError.message === 'string' && <p className="mt-2 text-sm text-red-600">{fieldError.message}</p>}
                </div>
              );
            })}

            {availabilityArray.fields.length === 0 && <p className="text-sm text-gray-500">No availability added yet. Add at least one slot.</p>}
          </div>

          {/* top-level availability error (nonempty) */}
          {errors.availability && typeof (errors.availability as any).message === 'string' && <p className="mt-2 text-sm text-red-600">{(errors.availability as any).message}</p>}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={() => console.log('Previous')}>
            Previous
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            Next
          </Button>
        </div>
      </div>
    </form>
  );
};

export default WorkInfoForm;