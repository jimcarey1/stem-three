import React from 'react';
import { useActionState } from 'react';

const ContactForm = () => {
  // Define the form submission handler
  const handleSubmit = async (prevState, formData) => {
    try {
      const response = await fetch('http://localhost:8000/customers/', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        return { success: false, error: errorData.message || 'Submission failed.' };
      }

      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message || 'An unexpected error occurred.' };
    }
  };

  // Initialize useActionState with the submission handler
  const [state, formAction, isPending] = useActionState(handleSubmit, {
    success: false,
    error: null,
  });

  return (
    <div className='flex flex-col justify-center items-center mt-5'>
      <form
        action={formAction}
        className='flex flex-col gap-5 p-5 border rounded bg-green-100'
      >
        <div className='border'>
          <input
            type='text'
            name='name'
            placeholder='Your name...'
            required
          />
        </div>
        <div className='border'>
          <input
            type='email'
            name='email'
            placeholder='john@example.com'
            required
          />
        </div>
        <div className='border'>
          <input
            type='text'
            name='mobile'
            placeholder='9965454743'
            required
          />
        </div>
        <button type='submit' disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit'}
        </button>
        {state.error && (
          <p className='text-red-500'>Error: {state.error}</p>
        )}
        {state.success && (
          <p className='text-green-600'>Form submitted successfully!</p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
