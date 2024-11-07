import React, { useState } from 'react';

interface Props {
  translations: {
    title: string;
    name: string;
    email: string;
    message: string;
    upload: string;
    submit: string;
  };
}

export default function QuoteForm({ translations }: Props) {
  const [files, setFiles] = useState<FileList | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      
      // Handle file uploads
      const filePromises = files ? Array.from(files).map(file => 
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              name: file.name,
              content: (reader.result as string).split(',')[1] // Get base64 content
            });
          };
          reader.readAsDataURL(file);
        })
      ) : [];

      const uploadedFiles = await Promise.all(filePromises);

      // Prepare form data
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
        files: uploadedFiles
      };

      // Submit to Netlify form
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'quote',
          ...Object.fromEntries(formData)
        }).toString()
      });

      // Send email via Netlify function
      await fetch('/.netlify/functions/handle-form', {
        method: 'POST',
        body: JSON.stringify(data)
      });

      // Redirect to success page
      window.location.href = form.getAttribute('action') || '/success';
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      name="quote"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      encType="multipart/form-data"
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg hover-glow transition-all"
      onSubmit={handleSubmit}
    >
      {/* Netlify form detection */}
      <input type="hidden" name="form-name" value="quote" />
      {/* Honeypot field */}
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>

      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary animate-gradient">
        {translations.title}
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">{translations.name}</label>
          <input
            type="text"
            name="name"
            required
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary transition-all ${
              focusedField === 'name' ? 'scale-[1.02]' : ''
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{translations.email}</label>
          <input
            type="email"
            name="email"
            required
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary transition-all ${
              focusedField === 'email' ? 'scale-[1.02]' : ''
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{translations.message}</label>
          <textarea
            name="message"
            rows={4}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary transition-all ${
              focusedField === 'message' ? 'scale-[1.02]' : ''
            }`}
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">{translations.upload}</label>
          <input
            type="file"
            name="files"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-secondary transition-all"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-gradient-to-r from-primary to-secondary hover:shadow-xl transform hover:-translate-y-0.5 transition-all button-pulse"
        >
          {translations.submit}
        </button>
      </div>
    </form>
  );
}