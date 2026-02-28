import type { Metadata } from "next";
import { Nav, Footer } from "../components";

export const metadata: Metadata = {
  title: "Privacy Policy - LlamaDNS",
  description: "Privacy policy for the LlamaDNS free dynamic DNS service.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020202] pt-14">
      <Nav />
      <main className="mx-auto max-w-2xl flex-1 px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Privacy Policy</h1>
        <p className="mt-2 text-sm text-neutral-600">Last updated February 19, 2026</p>
        <p className="mt-6 text-sm leading-relaxed text-neutral-400">
          Dear LlamaDNS user: we put this Privacy Policy in place so that you know how we handle
          your data. This policy applies to the privacy practices of LlamaDNS on its website,
          located at{" "}
          <a
            href="https://llamadns.org"
            className="text-neutral-300 underline underline-offset-2 transition-colors hover:text-white"
          >
            https://llamadns.org
          </a>
          , and to the dynamic DNS service (DDNS Service) offered through our website.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          This Privacy Policy is designed to comply with the GDPR (the EU General Data Protection
          Regulation) and other applicable privacy laws. We may update this policy to reflect
          changes to our practices. The latest version will always be posted on this website.
        </p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-neutral-400">
          {/* Section 1 */}
          <section>
            <h2 className="mb-4 text-base font-medium text-neutral-200">
              1. Information that we collect and why
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="mb-1 font-medium text-neutral-300">Signing In</h3>
                <p>
                  When you visit our website, you can choose to sign in through your GitHub or
                  Google account. When you sign in, you authorize us to collect certain information
                  from that account (name, email address, profile picture, and any other basic
                  information required by the OAuth process). We use this information to personalize
                  your experience and to provide the DDNS Service.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-neutral-300">Using the DDNS Service</h3>
                <p>
                  When you use the DDNS Service, we collect certain information regarding your use
                  of the website, including: the IP address used to sign in, your email address, an
                  access token issued to you for authorization (required by the DDNS Service API),
                  and your target IP address. We use this information to enable the DDNS Service.
                  This information may be considered personal information in that it may be possible
                  to identify you either on its own or in connection with other information.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-neutral-300">
                  Information we collect automatically
                </h3>
                <p>
                  We and our third-party service providers process, store and analyze information
                  obtained from your browser when you visit our website, including IP addresses,
                  device identifiers, browser characteristics, operating system details, language
                  preferences, referring URLs, length of visits, and pages viewed.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-neutral-300">Cookies</h3>
                <p>
                  This website uses cookies to track, measure and analyze the behaviors and usage
                  patterns of visitors, and to facilitate user login. When we use a cookie to
                  identify your session, you do not have to login with a password for each request.
                  You can choose to not accept cookies, but it may affect your ability to use the
                  website.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="mb-4 text-base font-medium text-neutral-200">
              2. Sharing of personal data
            </h2>
            <div className="space-y-4">
              <p>
                Except as set forth in this Privacy Policy and as required or permitted by law, we
                do not share your personal information with third parties without your consent.
              </p>
              <div>
                <h3 className="mb-1 font-medium text-neutral-300">Service Providers</h3>
                <p>
                  Any of the personal information that we collect may be transferred (or otherwise
                  made available) to our affiliates and other third parties who provide website and
                  operational support services on our behalf. Our service providers are given the
                  information they need to perform their designated functions, and except for the
                  reasons stated in this Privacy Policy, are not authorized to use or disclose
                  personal information for other purposes.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-neutral-300">Third Party Websites</h3>
                <p>
                  The LlamaDNS website may contain links to other websites that are not owned or
                  controlled by us. We have no control over, do not review and are not responsible
                  for the privacy policies of or content displayed on such other websites.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-neutral-300">Legal and Compliance</h3>
                <p>
                  LlamaDNS may share personal information if we have a good-faith belief that
                  access, use, preservation or disclosure of the information is reasonably necessary
                  to: meet any applicable law, regulation, legal process or enforceable governmental
                  request; enforce applicable Terms of Use, including investigation of potential
                  violations; detect, prevent or otherwise address malicious, deceptive, fraudulent
                  or illegal activity; or protect against harm to the rights, property or safety of
                  LlamaDNS, our users or the public as required or permitted by law.
                </p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-neutral-300">Other Business Purposes</h3>
                <p>
                  Personal information may be provided to third parties in connection with a merger
                  or sale involving all or part of LlamaDNS, or as part of a reorganization or other
                  change in control.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="mb-4 text-base font-medium text-neutral-200">
              3. Safeguarding personal information
            </h2>
            <p>
              We have implemented reasonable administrative, technical and physical measures to
              safeguard the personal information in our custody and control against theft, loss and
              unauthorized access, use, modification and disclosure. We restrict access to your
              personal information on a need-to-know basis to authorized service providers who
              require access to fulfill their service requirements.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="mb-4 text-base font-medium text-neutral-200">
              4. Our servers and infrastructure
            </h2>
            <div className="space-y-4">
              <p>
                Our servers are protected by firewalls and are not directly accessible via the
                internet. The LlamaDNS service is run over SSL. Our data is stored in a database
                that is separated and only accessible to servers that are granted a role to access
                it. Access to the database is secured through multi-factor authentication. Data in
                the database is encrypted at rest.
              </p>
              <p>
                We maintain logs of user activity including IP addresses, email, browser, and
                referrer paths. Logs are deleted after 90 days.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="mb-4 text-base font-medium text-neutral-200">5. Data breaches</h2>
            <p>
              If there is a breach of our database or the database of any third party that we use,
              and if you are or were affected, we will make reasonable efforts to notify you. In
              such case, we will also contact the relevant authorities that we are required to
              contact under law.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="mb-4 text-base font-medium text-neutral-200">
              6. Your rights and opting out
            </h2>
            <div className="space-y-4">
              <p>
                Under the GDPR and other data protection laws, you have the right to opt out of data
                collection and transfers. You can also request the correction, copy, or deletion of
                any of your personal information that we have in our system at any time.
              </p>
              <p>
                Under the CCPA, in addition to the above rights, you have the right to know what
                categories of information we have collected about you, the purpose of such
                collection and categories of third parties with whom we share such data. This
                information has been provided in this Privacy Policy.
              </p>
              <p>
                You may delete your account and the information that we have for you from the
                dashboard, which will remove your personal information from our database. Once you
                delete your account, the service may become unavailable to you.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="mb-4 text-base font-medium text-neutral-200">7. Data retention</h2>
            <p>
              We have data retention processes designed to retain personal information for no longer
              than necessary for the purposes stated above and to otherwise meet legal requirements.
              We store the data we collect for about a year after a user and their DNS entries are
              no longer active. The only exception to this is when we have a legal obligation to
              keep it longer.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="mb-4 text-base font-medium text-neutral-200">
              8. Privacy-related requests
            </h2>
            <p>
              You may contact us regarding any privacy-related requests, questions, or concerns by
              emailing{" "}
              <a
                href="mailto:privacy@llamadns.org"
                className="text-neutral-300 underline underline-offset-2 transition-colors hover:text-white"
              >
                privacy@llamadns.org
              </a>
              . In order to process your request, we may need to verify that you are an account
              holder.
            </p>
          </section>
        </div>
      </main>
      <div className="h-px w-full bg-white/6" />
      <Footer />
    </div>
  );
}
