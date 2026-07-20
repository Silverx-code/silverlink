export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12 prose-sm">
      <h1 className="font-heading text-2xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: [DATE]</p>

      <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
        <p className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 text-xs">
          Placeholder legal text — have this reviewed by a lawyer before launch,
          specifically for compliance with Nigeria's Data Protection Act (NDPA) since
          this platform collects student PII including CVs and university data. This is
          a reasonable starting structure, not legal advice.
        </p>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">1. What we collect</h2>
          <p>
            Account details (name, email, password — stored hashed, never in plain
            text), university/department/level for students, company details for
            company accounts, CVs and logos you upload, messages sent through the
            platform's chat, and reviews you write.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">2. How we use it</h2>
          <p>
            To match students with relevant companies, let companies review applicants,
            enable communication between the two, send notifications about your
            applications, and improve the directory's search and recommendations.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">3. Who can see what</h2>
          <p>
            Your profile basics (name, department, level) and CV become visible to a
            company once you apply to them. Company profiles and their accepted
            departments are public. Chat messages are visible only to you and the
            other party in that conversation. University coordinators can see
            students registered under their university.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">4. Third parties we use</h2>
          <p>
            Cloudinary (file storage for CVs and logos), an email provider (for
            verification and notification emails), and Expo (for mobile push
            notifications, if you use the mobile app). We don't sell your data to
            advertisers.
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">5. Your rights</h2>
          <p>
            You can update your profile at any time. To request deletion of your
            account and associated data, contact us at [YOUR CONTACT EMAIL].
          </p>
        </section>

        <section>
          <h2 className="font-heading font-semibold text-gray-800 mb-1">6. Contact</h2>
          <p>Questions about this policy: [YOUR CONTACT EMAIL]</p>
        </section>
      </div>
    </div>
  );
}
