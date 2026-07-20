export const metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 prose-sm">
      <h1 className="font-heading text-2xl font-bold mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: [DATE]</p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <p className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-xs">
          Placeholder legal text — have this reviewed by a lawyer familiar with Nigerian
          law (including the Nigeria Data Protection Act) before launch. This is a
          reasonable starting structure, not legal advice.
        </p>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">1. Who we are</h2>
          <p>
            Silver Link ("we", "us", "the platform") connects students seeking SIWES
            (Students Industrial Work Experience Scheme) placements with companies that
            accept them, and provides related tools for universities and coordinators.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">2. Accounts</h2>
          <p>
            You must provide accurate information when registering. You're responsible
            for activity under your account and for keeping your password secure.
            Company accounts must be created by someone authorized to represent that
            company.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">3. What we don't guarantee</h2>
          <p>
            Silver Link is a directory and communication tool — we don't guarantee a
            placement, verify every claim a company or student makes, or act as a party
            to any agreement between a student and a company. Companies are responsible
            for their own hiring decisions and workplace conditions.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">4. Acceptable use</h2>
          <p>
            Don't post false information, harass other users, attempt to scrape or
            abuse the platform, or use it for purposes unrelated to SIWES/internship
            placement. We may suspend accounts that violate this.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">5. Content you submit</h2>
          <p>
            Reviews, messages, and profile content you submit should be honest and your
            own. We may moderate or remove content that violates these terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">6. Changes</h2>
          <p>
            We may update these terms as the platform evolves. Continued use after a
            change means you accept the updated terms.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">7. Contact</h2>
          <p>Questions about these terms: [YOUR CONTACT EMAIL]</p>
        </section>
      </div>
    </div>
  );
}
