'use client';
import { useState } from 'react';

const MAX_MESSAGE_LENGTH = 1000; // Define the constant at the top

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0); // Add state for message length

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const form = document.getElementById('contactForm') as HTMLFormElement;
      form.reset();

      setFormStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
      });
    } catch {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-24">
      <h1 className="mb-8 text-4xl font-bold">Contact Me</h1>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <form id="contactForm" action={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          {/* Additional Contact Info */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                Phone Number <span className="text-gray-500">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="(123) 456-7890"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-900">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                id="subject"
                name="subject"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select a topic</option>
                <option value="job">Job Opportunity</option>
                <option value="project">Project Collaboration</option>
                <option value="general">General Inquiry</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* Contact Preferences */}
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-900">
                Preferred Contact Method
              </label>
              <select
                id="contactMethod"
                name="contactMethod"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <div>
              <label htmlFor="contactTime" className="block text-sm font-medium text-gray-900">
                Best Time to Contact
              </label>
              <select
                id="contactTime"
                name="contactTime"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="morning">Morning (9AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <label htmlFor="socialLinks" className="block text-sm font-medium text-gray-900">
              LinkedIn/GitHub Profile <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="url"
              id="socialLinks"
              name="socialLinks"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>

          {/* Source */}
          <div>
            <label htmlFor="source" className="block text-sm font-medium text-gray-900">
              How did you find me?
            </label>
            <select
              id="source"
              name="source"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              <option value="linkedin">LinkedIn</option>
              <option value="github">GitHub</option>
              <option value="search">Search Engine</option>
              <option value="referral">Referral</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-900">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              maxLength={MAX_MESSAGE_LENGTH}
              onChange={(e) => setMessageLength(e.target.value.length)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Your message here..."
            ></textarea>
            <p className="mt-1 text-sm text-gray-500">
              {messageLength}/{MAX_MESSAGE_LENGTH} characters
            </p>
          </div>

          {/* Copy to Sender */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="copyToSender"
              name="copyToSender"
              value="true"
              className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="copyToSender" className="ml-2 block text-sm text-gray-900">
              Send me a copy of this message
            </label>
          </div>

          {formStatus.message && (
            <div
              className={`rounded-md p-4 ${
                formStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}
            >
              {formStatus.message}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}