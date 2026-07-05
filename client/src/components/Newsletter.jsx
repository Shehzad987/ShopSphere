import { useState } from 'react';
import toast from 'react-hot-toast';
import { FiMail } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Thanks for subscribing! Check your inbox soon.');
    setEmail('');
  };

  return (
    <section className="container-app pb-20">
      <div className="glass-card relative overflow-hidden p-10 sm:p-14 text-center">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/20 blur-[100px]" />
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="w-12 h-12 mx-auto rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary mb-5">
            <FiMail size={22} />
          </span>
          <h2 className="section-heading mb-3">Never Miss a Drop</h2>
          <p className="text-textMuted mb-8">
            Subscribe for exclusive early access, member-only pricing, and product launches.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input-field"
            />
            <button type="submit" className="btn-primary shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
