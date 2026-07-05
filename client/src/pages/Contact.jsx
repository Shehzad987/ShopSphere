import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: '', email: '', message: '' });
      setSending(false);
    }, 900);
  };

  return (
    <div className="container-app py-16">
      <div className="text-center mb-12">
        <h1 className="font-display font-bold text-4xl mb-3">Get in Touch</h1>
        <p className="text-textMuted max-w-md mx-auto">
          Questions, feedback, or partnership ideas — our team would love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 max-w-4xl mx-auto">
        <div className="space-y-4">
          {[
            [FiMail, 'Email', 'support@shopsphere.com'],
            [FiPhone, 'Phone', '+1 (555) 012-3456'],
            [FiMapPin, 'Office', '221B Innovation Ave, San Francisco, CA'],
          ].map(([Icon, label, value]) => (
            <div key={label} className="glass-card p-5 flex items-center gap-4">
              <span className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                <Icon size={18} />
              </span>
              <div>
                <p className="text-xs text-textMuted">{label}</p>
                <p className="text-sm font-medium">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
          <input
            required
            placeholder="Your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input-field"
          />
          <input
            type="email"
            required
            placeholder="Your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input-field"
          />
          <textarea
            required
            rows={5}
            placeholder="How can we help?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="input-field resize-none"
          />
          <button type="submit" disabled={sending} className="btn-primary w-full">
            {sending ? 'Sending...' : 'Send Message'} <FiSend />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
