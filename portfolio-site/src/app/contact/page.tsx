'use client';
import { useState } from 'react';

const MAX_MESSAGE_LENGTH = 1000;

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFormStatus({ type: null, message: '' });

    try {
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || null,
        subject: formData.get('subject'),
        contactMethod: formData.get('contactMethod'),
        contactTime: formData.get('contactTime'),
        socialLinks: formData.get('socialLinks') || null,
        source: formData.get('source'),
        message: formData.get('message'),
        copyToSender: formData.get('copyToSender') === 'true'
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to send message');

      const form = document.getElementById('contactForm') as HTMLFormElement;
      form.reset();
      setMessageLength(0);

      setFormStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Me</h1>
          <p className="text-gray-400 text-lg">Let's get in touch! Fill out the form below.</p>
        </div>

        <div className="bg-gray-800 rounded-2xl shadow-xl p-8">
          <form id="contactForm" action={handleSubmit} className="space-y-8">
            {/* Name and Email */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-white mb-2">
                  Name <span className="text-blue-400">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-white mb-2">
                  Email <span className="text-blue-400">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Phone and Subject */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-lg font-medium text-white mb-2">
                  Phone Number <span className="text-gray-400">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                  placeholder="(123) 456-7890"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-lg font-medium text-white mb-2">
                  Subject <span className="text-blue-400">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                >
                  <option value="">Select a topic</option>
                  <option value="job">Job Opportunity</option>
                  <option value="project">Project Collaboration</option>
                  <option value="general">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Contact Method and Time */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="contactMethod" className="block text-lg font-medium text-white mb-2">
                  Preferred Contact Method
                </label>
                <select
                  id="contactMethod"
                  name="contactMethod"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
              <div>
                <label htmlFor="contactTime" className="block text-lg font-medium text-white mb-2">
                  Best Time to Contact
                </label>
                <select
                  id="contactTime"
                  name="contactTime"
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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
              <label htmlFor="socialLinks" className="block text-lg font-medium text-white mb-2">
                LinkedIn/GitHub Profile <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="url"
                id="socialLinks"
                name="socialLinks"
                className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* Source */}
            <div>
              <label htmlFor="source" className="block text-lg font-medium text-white mb-2">
                How did you find me?
              </label>
              <select
                id="source"
                name="source"
                className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
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
              <label htmlFor="message" className="block text-lg font-medium text-white mb-2">
                Message <span className="text-blue-400">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                maxLength={MAX_MESSAGE_LENGTH}
                onChange={(e) => setMessageLength(e.target.value.length)}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                placeholder="Your message here..."
              ></textarea>
              <p className="mt-2 text-sm text-gray-400">
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
                className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-800"
              />
              <label htmlFor="copyToSender" className="ml-3 block text-base text-gray-300">
                Send me a copy of this message
              </label>
            </div>

            {formStatus.message && (
              <div
                className={`p-4 rounded-xl ${
                  formStatus.type === 'success'
                    ? 'bg-green-900/50 text-green-200 border border-green-700'
                    : 'bg-red-900/50 text-red-200 border border-red-700'
                }`}
              >
                {formStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 text-lg font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed transition duration-200"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}