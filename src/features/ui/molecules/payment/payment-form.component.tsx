'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, Input } from '@/features/ui/atoms';
import { zodResolver } from '@hookform/resolvers/zod';
// Import payment method logos
import AmexLogo from 'public/images/payment/Amex.png';
import ApplePayLogo from 'public/images/payment/ApplePay.png';
import DiscoverLogo from 'public/images/payment/Discover.png';
import GooglePayLogo from 'public/images/payment/Gpay.png';
import MastercardLogo from 'public/images/payment/Mastercard.png';
import PayPalLogo from 'public/images/payment/Paypal.png';
import StripeLogo from 'public/images/payment/Stripe.png';
import VisaLogo from 'public/images/payment/Visa.png';
import { Controller, useForm, UseFormRegister } from 'react-hook-form';
import { z } from 'zod';

// Payment schema for validation
const paymentSchema = z.object({
  paymentMethod: z.enum(['card', 'paypal', 'googlepay', 'applepay', 'stripe']),
  cardNumber: z.string().regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expirationDate: z.string().regex(/^\d{2}\/\d{2}$/, 'Use MM/YY format'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
});

export type PaymentFormData = z.infer<typeof paymentSchema>;

export interface PaymentFormProps {
  amount: number;
  currency?: string;
  onSubmit?: (data: PaymentFormData) => void;
  className?: string;
  showSubmitButton?: boolean;
  parentFormRegister?: UseFormRegister<PaymentFormData>;
  onChange?: (data: PaymentFormData) => void;
  defaultValues?: Partial<PaymentFormData>;
}

// Add card type detection
type CardType = 'visa' | 'mastercard' | 'amex' | 'discover' | null;

const PaymentForm = ({
  amount,
  currency = 'USD',
  onSubmit,
  className = '',
  showSubmitButton = false,
  parentFormRegister,
  onChange,
  defaultValues,
}: PaymentFormProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('card');
  const [detectedCardType, setDetectedCardType] = useState<CardType>(null);

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      paymentMethod: 'card',
      cardNumber: '',
      expirationDate: '',
      cvc: '',
    },
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(value);
  };

  const handleSubmit = (data: PaymentFormData) => {
    onSubmit?.(data);
  };

  // Detect card type based on card number
  const detectCardType = (cardNumber: string): CardType => {
    const cleanNumber = cardNumber.replace(/\D/g, '');

    // Visa: Starts with 4
    if (/^4/.test(cleanNumber)) return 'visa';

    // Mastercard: Starts with 51-55 or 2221-2720
    if (
      /^5[1-5]/.test(cleanNumber) ||
      /^(222[1-9]|22[3-9]\d|2[3-6]\d\d|27[0-1]\d|2720)/.test(cleanNumber)
    )
      return 'mastercard';

    // Amex: Starts with 34 or 37
    if (/^3[47]/.test(cleanNumber)) return 'amex';

    // Discover: Starts with 6011, 622126-622925, 644-649, or 65
    if (
      /^(6011|65|64[4-9]|622(12[6-9]|1[3-9]\d|[2-8]\d\d|9[01]\d|92[0-5]))/.test(
        cleanNumber
      )
    )
      return 'discover';

    return null;
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '');
    const groups = [];
    for (let i = 0; i < digits.length; i += 4) {
      groups.push(digits.slice(i, i + 4));
    }
    return groups.join(' ');
  };

  const formatExpirationDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  };

  useEffect(() => {
    if (defaultValues) {
      if (defaultValues.paymentMethod) {
        setSelectedMethod(defaultValues.paymentMethod);
        form.setValue('paymentMethod', defaultValues.paymentMethod);
      }
      if (defaultValues.cardNumber) {
        form.setValue('cardNumber', defaultValues.cardNumber);
      }
      if (defaultValues.expirationDate) {
        form.setValue('expirationDate', defaultValues.expirationDate);
      }
      if (defaultValues.cvc) {
        form.setValue('cvc', defaultValues.cvc);
      }
    }
  }, [defaultValues, form]);

  useEffect(() => {
    const subscription = form.watch((value) => {
      onChange?.(value as PaymentFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onChange]);

  useEffect(() => {
    if (parentFormRegister) {
      parentFormRegister('paymentMethod', {
        value: selectedMethod as PaymentFormData['paymentMethod'],
      });

      if (selectedMethod === 'card') {
        parentFormRegister('cardNumber', {
          required: 'Card number is required',
          pattern: {
            value: /^\d{16}$/,
            message: 'Card number must be 16 digits',
          },
        });
        parentFormRegister('expirationDate', {
          required: 'Expiration date is required',
          pattern: {
            value: /^\d{2}\/\d{2}$/,
            message: 'Use MM/YY format',
          },
        });
        parentFormRegister('cvc', {
          required: 'CVC is required',
          pattern: {
            value: /^\d{3,4}$/,
            message: 'CVC must be 3 or 4 digits',
          },
        });
      }
    }
  }, [parentFormRegister, selectedMethod]);

  return (
    <div className={`w-full rounded-lg bg-primary-50 px-8 py-6 ${className}`}>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-semibold">Booking Fee</h3>
        <span className="text-xl font-bold">{formatCurrency(amount)}</span>
      </div>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-4">
          <h4 className="mb-5 text-sm font-medium text-gray-900">
            Choose your Payment Method
          </h4>
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-6 flex items-center">
              <input
                type="radio"
                id="cardPayment"
                name="paymentMethod"
                value="card"
                checked={selectedMethod === 'card'}
                onChange={() => {
                  setSelectedMethod('card');
                  form.setValue('paymentMethod', 'card');
                }}
                className="size-4 cursor-pointer accent-primary-500"
              />
              <label
                htmlFor="cardPayment"
                className="ml-2 cursor-pointer text-sm font-medium"
              >
                Credit/Debit Card
              </label>
            </div>

            {selectedMethod === 'card' && (
              <>
                <div>
                  <div className="relative">
                    <Controller
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <Input
                          label="Card Number"
                          id="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          className="pr-12"
                          maxLength={19}
                          onChange={(e) => {
                            const formatted = formatCardNumber(e.target.value);
                            e.target.value = formatted;
                            field.onChange(e.target.value.replace(/\s/g, ''));

                            // Detect card type when user types
                            setDetectedCardType(detectCardType(e.target.value));
                          }}
                          error={form.formState.errors.cardNumber?.message}
                        />
                      )}
                    />
                    <div className="absolute right-3 top-3/4 flex -translate-y-1/2 items-center">
                      <div className="relative flex h-6 w-28 items-center justify-end gap-1">
                        {/* Show only detected card type, or all icons if none detected */}
                        {(!detectedCardType || detectedCardType === 'visa') && (
                          <div
                            className={`absolute size-6 transition-all duration-300 ease-in-out ${
                              detectedCardType === 'visa'
                                ? 'right-0 z-10 scale-110 opacity-100'
                                : detectedCardType
                                  ? 'right-24 scale-75 opacity-0'
                                  : 'right-24 opacity-90'
                            }`}
                          >
                            <Image
                              src={VisaLogo}
                              alt="Visa"
                              width={24}
                              height={16}
                            />
                          </div>
                        )}
                        {(!detectedCardType ||
                          detectedCardType === 'mastercard') && (
                          <div
                            className={`absolute size-6 transition-all duration-300 ease-in-out ${
                              detectedCardType === 'mastercard'
                                ? 'right-0 z-10 scale-110 opacity-100'
                                : detectedCardType
                                  ? 'right-16 scale-75 opacity-0'
                                  : 'right-16 opacity-90'
                            }`}
                          >
                            <Image
                              src={MastercardLogo}
                              alt="Mastercard"
                              width={24}
                              height={16}
                            />
                          </div>
                        )}
                        {(!detectedCardType || detectedCardType === 'amex') && (
                          <div
                            className={`absolute size-6 transition-all duration-300 ease-in-out ${
                              detectedCardType === 'amex'
                                ? 'right-0 z-10 scale-110 opacity-100'
                                : detectedCardType
                                  ? 'right-8 scale-75 opacity-0'
                                  : 'right-8 opacity-90'
                            }`}
                          >
                            <Image
                              src={AmexLogo}
                              alt="American Express"
                              width={24}
                              height={16}
                            />
                          </div>
                        )}
                        {(!detectedCardType ||
                          detectedCardType === 'discover') && (
                          <div
                            className={`absolute size-6 transition-all duration-300 ease-in-out ${
                              detectedCardType === 'discover'
                                ? 'right-0 z-10 scale-110 opacity-100'
                                : detectedCardType
                                  ? 'right-0 scale-75 opacity-0'
                                  : 'right-0 opacity-90'
                            }`}
                          >
                            <Image
                              src={DiscoverLogo}
                              alt="Discover"
                              width={24}
                              height={16}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Controller
                      control={form.control}
                      name="expirationDate"
                      render={({ field }) => (
                        <Input
                          label="Expiration Date"
                          id="expirationDate"
                          placeholder="MM/YY"
                          maxLength={5}
                          onChange={(e) => {
                            const formatted = formatExpirationDate(
                              e.target.value
                            );
                            e.target.value = formatted;
                            field.onChange(e.target.value);
                          }}
                          error={form.formState.errors.expirationDate?.message}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <Input
                          label="CVC"
                          id="cvc"
                          placeholder="CVC"
                          maxLength={4}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            e.target.value = value;
                            field.onChange(e.target.value);
                          }}
                          error={form.formState.errors.cvc?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-6 grid grid-cols-4 gap-4">
            <div
              className={`cursor-pointer rounded-lg border hover:bg-primary-100 ${selectedMethod === 'paypal' ? 'border-primary-500' : 'border-gray-200'} bg-white p-4 text-center`}
              onClick={() => {
                setSelectedMethod('paypal');
                form.setValue('paymentMethod', 'paypal');
              }}
            >
              <div className="flex h-12 items-center justify-center">
                <Image src={PayPalLogo} alt="PayPal" width={60} height={20} />
              </div>
            </div>
            <div
              className={`cursor-pointer rounded-lg border hover:bg-primary-100 ${selectedMethod === 'googlepay' ? 'border-primary-500' : 'border-gray-200'} bg-white p-4 text-center`}
              onClick={() => {
                setSelectedMethod('googlepay');
                form.setValue('paymentMethod', 'googlepay');
              }}
            >
              <div className="flex h-12 items-center justify-center">
                <Image
                  src={GooglePayLogo}
                  alt="Google Pay"
                  width={60}
                  height={20}
                />
              </div>
            </div>
            <div
              className={`cursor-pointer rounded-lg border hover:bg-primary-100 ${selectedMethod === 'applepay' ? 'border-primary-500' : 'border-gray-200'} bg-white p-4 text-center`}
              onClick={() => {
                setSelectedMethod('applepay');
                form.setValue('paymentMethod', 'applepay');
              }}
            >
              <div className="flex h-12 items-center justify-center">
                <Image
                  src={ApplePayLogo}
                  alt="Apple Pay"
                  width={60}
                  height={20}
                />
              </div>
            </div>
            <div
              className={`cursor-pointer rounded-lg border hover:bg-primary-100 ${selectedMethod === 'stripe' ? 'border-primary-500' : 'border-gray-200'} bg-white p-4 text-center`}
              onClick={() => {
                setSelectedMethod('stripe');
                form.setValue('paymentMethod', 'stripe');
              }}
            >
              <div className="flex h-12 items-center justify-center">
                <Image src={StripeLogo} alt="Stripe" width={60} height={20} />
              </div>
            </div>
          </div>
        </div>

        {showSubmitButton && (
          <Button type="submit" variant="primary" className="w-full">
            Pay {formatCurrency(amount)}
          </Button>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
