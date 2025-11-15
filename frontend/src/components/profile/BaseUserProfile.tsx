import React, { useState } from 'react';
import { cn } from '../../utils/cn.util';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Label } from '@radix-ui/react-label';
import { z, type ZodType } from 'zod';
import { 
  firstNameSchema,
  lastNameSchema,
  ageSchema,
  genderSchema,
  heightSchema,
  weightSchema,
} from '../../schemas/profileField.schema';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/Select';

interface EditableFieldProps<T = any> {
  label: string;
  value: T | null;
  editable?: boolean;
  onChange?: (val: T) => void;
  schema?: ZodType<any>;
  variant?: 'input' | 'select';
  options?: Array<{ label: string; value: string }>;
  theme: ProfileTheme;
}

interface BaseUserProfileProps {
  data: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    gender?: string;
    age?: number;
    height?: number;
    weight?: number;
  };
  showGender?: boolean;
  showAge?: boolean;
  showHeight?: boolean;
  showWeight?: boolean;
  onFieldUpdate?: (field: string, value: string | number) => void;
  theme?: Partial<ProfileTheme>;
}

interface ProfileTheme {
  primary: string;
  accent: string;
  bg: string;
  border: string;
  text: string;
  buttonBg?: string;
}

const defaultTheme: ProfileTheme = {
  primary: 'text-striv-primary',
  accent: 'from-striv-primary to-striv-accent',
  bg: 'bg-white/80',
  border: 'border-striv-muted',
  text: 'text-gray-700'
};

const EditableField: React.FC<EditableFieldProps> = ({
  label,
  value,
  editable = true,
  onChange,
  schema,
  variant = 'input',
  options = [],
  theme,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string | number>(value);
  const [error, setError] = useState<string | null>(null);

  const inputType = schema && schema instanceof z.ZodNumber ? 'number' : 'text';

  const processedValue = inputType === 'number' ? Number(tempValue) : tempValue;
  const handleSave = () => {
    if(schema) {
      const result = schema.safeParse(processedValue);

      if(!result.success) {
        setError(result.error.issues[0].message);
        return;
      }

      setError(null);
      setTempValue(processedValue);
    }
    setIsEditing(false);
    if (onChange) onChange(processedValue);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue(value ?? '');
    setError(null);
  }

  
  return (
    <div className={cn('flex flex-col gap-2 p-4 rounded-xl border shadow-sm bg-white/60 backdrop-blur-sm', theme.border)}>
      <Label className={cn('text-sm font-semibold', theme.primary)}>{label}</Label>

      {isEditing ? (
        <>
          <div className='flex items-start gap-3'>
            {variant === 'input' && <Input type={inputType} value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={cn('w-full', theme.text, theme.border)} />}

            {variant === 'select' && (
              <Select value={String(tempValue)} onValueChange={(val) => setTempValue(val)}>
                <SelectTrigger className='w-full h-11 text-base border-striv-muted/60 focus:border-striv-accent focus:ring-2 focus:ring-striv-accent/40 bg-white/60 backdrop-blur-sm rounded-md px-3'>
                  <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
                </SelectTrigger>

                <SelectContent className='z-[100] bg-white/95 border border-striv-muted/60 shadow-lg rounded-md' position='popper' sideOffset={6}>
                  {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <div className='flex gap-3'>
              <Button onClick={handleSave} disabled={value === processedValue} className={cn('px-4 py-2 rounded-md text-white font-medium', theme.buttonBg ?? 'bg-striv-primary')}>
                Save
              </Button>

              <Button variant="link" onClick={handleCancel} className="text-gray-600">
                Cancel
              </Button>
            </div>
          </div>
          {error && <p className="text-red-600 text-sm font-medium mt-1">{error}</p>}
        </>
      ) : (
        <div className="flex items-center justify-between">
          <p className={cn('text-base font-medium', theme.text)}>{value && value !== '' ? value : `No ${label.toLowerCase()} added`}</p>

          {editable && (
            <Button variant="link" onClick={() => setIsEditing(true)} className={cn('text-striv-primary')}>
              {value && value !== '' ? 'Edit' : 'Add'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

const BaseUserProfile: React.FC<BaseUserProfileProps> = ({ data, showGender = true, showAge = true, showHeight = true, showWeight = true, onFieldUpdate, theme = {} }) => {
  const mergedTheme = { ...defaultTheme, ...theme };

  return (
    <div className={cn('flex flex-col gap-8 w-full', mergedTheme.bg)}>
      <div>
        <h2 className={cn('text-3xl font-bold', mergedTheme.primary)}>Profile Information</h2>
        <p className={cn('text-sm opacity-80 mt-1', mergedTheme.text)}>Manage and edit your personal details</p>
      </div>

      {/* GRID — 1 column mobile, 2 columns desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <EditableField label="First Name" value={data.first_name} onChange={(v) => onFieldUpdate?.('first_name', v)} schema={firstNameSchema} theme={mergedTheme} />
        <EditableField label="Last Name" value={data.last_name} onChange={(v) => onFieldUpdate?.('last_name', v)} schema={lastNameSchema} theme={mergedTheme} />
        <EditableField label="Email" value={data.email} editable={false} theme={mergedTheme} />
        <EditableField label="Role" value={data.role} editable={false} theme={mergedTheme} />

        {showGender && (
          <EditableField
            label="Gender"
            value={data.gender ?? ''}
            onChange={(v) => onFieldUpdate?.('gender', v as 'male' | 'female')}
            schema={genderSchema}
            variant="select"
            options={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' }
            ]}
            theme={mergedTheme}
          />
        )}

        {showAge && <EditableField label="Age" value={data.age ?? ''} onChange={(v) => onFieldUpdate?.('age', Number(v))} schema={ageSchema} theme={mergedTheme} />}

        {showHeight && <EditableField label="Height (cm)" value={data.height ?? ''} onChange={(v) => onFieldUpdate?.('height', Number(v))} schema={heightSchema} theme={mergedTheme} />}

        {showWeight && <EditableField label="Weight (kg)" value={data.weight ?? ''} onChange={(v) => onFieldUpdate?.('weight', Number(v))} schema={weightSchema} theme={mergedTheme} />}
      </div>
    </div>
  );
};

export default BaseUserProfile;