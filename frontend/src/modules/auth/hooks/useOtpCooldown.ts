import { useState, useEffect, useCallback } from "react";

interface UseOtpCooldownOptions {
  duration?: number;
  storageKey?: string;
}

export const useOtpCooldown = ({ 
  duration = 60, 
  storageKey = 'otp_cooldown_expiry'
}: UseOtpCooldownOptions = {} ) => {
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const expiryTime = localStorage.getItem(storageKey);
    if (expiryTime) {
      const remaining = Math.floor((+expiryTime - Date.now()) / 1000);
      if (remaining > 0) setCooldown(remaining);
      else localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  useEffect(() => {
    if(cooldown <= 0) return;
    const timer = setInterval(() => {
      setCooldown(prev => {
        if(prev <= 1) {
          localStorage.removeItem(storageKey);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldown, storageKey]);

  const startCooldown = useCallback(() => {
    const expiry = Date.now() + duration * 1000;
    localStorage.setItem(storageKey, expiry.toString());
    setCooldown(duration);
  }, [duration, storageKey]);

  const isCooldownActive = cooldown > 0;
  const remaining = cooldown;

  return { cooldown: remaining, isCooldownActive, startCooldown };
};