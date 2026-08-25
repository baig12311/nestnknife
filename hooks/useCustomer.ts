// import { useCallback, useEffect, useState } from 'react';
// import { getFullCustomerData } from '../services/shopify/customer';

// export function useCustomer() {
//   const [customer, setCustomer] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const loadCustomer = useCallback(async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const data = await getFullCustomerData();
//       setCustomer(data);
//     } catch (err: any) {
//       console.error('useCustomer ERROR:', err);
//       setError(err.message ?? 'Failed to load customer data.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     loadCustomer();
//   }, [loadCustomer]);

//   return { customer, loading, error, refetch: loadCustomer };
// }

import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import {
  getFullCustomerData,
  updateCustomer,
} from '../services/shopify/customer';

export function useCustomer() {
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCustomer = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getFullCustomerData();
      setCustomer(data);
    } catch (err: any) {
      console.error('useCustomer ERROR:', err);
      setError(err.message ?? 'Failed to load customer data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomer();
  }, [loadCustomer]);

  const updateMutation = useMutation({
    mutationFn: updateCustomer,

    onSuccess: (updatedCustomer) => {
      setCustomer(updatedCustomer);
        console.log('UPDATED CUSTOMER:', updatedCustomer);
    },

    onError: (error) => {
      console.error('UPDATE CUSTOMER ERROR:', error);
    },
  });

  return {
    customer,
    loading,
    error,
    refetch: loadCustomer,

    updateCustomer: updateMutation.mutateAsync,
    updating: updateMutation.isPending,
    updateError: updateMutation.error,
  };
}