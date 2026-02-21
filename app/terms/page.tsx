import type { Metadata } from "next";
import { Nav, Footer } from "../components";

export const metadata: Metadata = {
  title: "Terms of Use - LlamaDNS",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#020202] pt-14">
      <Nav />
      <main className="mx-auto max-w-2xl flex-1 px-6 py-16">
        <h1 className="text-2xl font-semibold tracking-tight text-white">Terms of Use</h1>
        <p className="mt-2 text-sm text-neutral-600">Last updated February 19, 2026</p>

        <div className="mt-10 space-y-6 text-sm leading-relaxed text-neutral-400">
          <section>
            <p>
              <strong className="text-neutral-300">1.</strong> As a user of the LlamaDNS website and
              service, you agree to these terms and conditions (the &ldquo;Terms&rdquo;). LlamaDNS
              may change these Terms from time to time, so you should check back periodically to
              ensure you are aware of any changes, as they will continue to apply to you as a user
              of LlamaDNS. If you violate these Terms, we may remove, delete, lock and/or take over
              your LlamaDNS account or domain. We may terminate this agreement or suspend your
              account at any time with or without notice.
            </p>
          </section>

          <section>
            <p>
              <strong className="text-neutral-300">2.</strong> By using this website, or by creating
              an account with LlamaDNS, you may provide us with personal information. You
              acknowledge that you have read and understood how we handle your data, and that you
              consent to our collection, use, storage and disclosure of your personal information as
              necessary to operate the service.
            </p>
          </section>

          <section>
            <p>
              <strong className="text-neutral-300">3.</strong> When registering for a LlamaDNS
              account, you agree to provide accurate and complete information. You are responsible
              for the activity that occurs on your account, and you must keep your credentials
              secure.
            </p>
          </section>

          <section>
            <p>
              <strong className="text-neutral-300">4.</strong> When registering a LlamaDNS
              subdomain, users should not register domains matching their own or any other
              person&rsquo;s name, trademarks, or other protected identifiers.
            </p>
          </section>

          <section>
            <p>
              <strong className="text-neutral-300">5.</strong> Users of the website and LlamaDNS
              service are responsible for any content hosted on subdomains registered by such users,
              and agree to not use LlamaDNS services or a subdomain of a LlamaDNS shared domain for
              any illegal or unlawful purpose. You agree to indemnify LlamaDNS for your use of the
              website and services.
            </p>
          </section>

          <section>
            <p className="text-neutral-500 uppercase">
              <strong className="text-neutral-400">6.</strong> Your use of this website and the
              LlamaDNS services is entirely at your own risk. To the maximum extent permitted by
              applicable laws, LlamaDNS does not warrant that the website or the services will be
              uninterrupted or error-free, that defects will be corrected, or that this website or
              the server that makes it available are free of viruses or other harmful components. To
              the maximum extent permitted by applicable laws, LlamaDNS disclaims all express,
              implied, collateral or statutory warranties, representations and conditions, including
              any implied warranties or conditions of merchantability, merchantable quality,
              compatibility, title, non-infringement, security, reliability, completeness, quiet
              enjoyment, accuracy, quality, integration or fitness for a particular purpose or use,
              or any warranties or conditions arising out of course of dealing or usage of trade.
            </p>
          </section>

          <section>
            <p className="text-neutral-500 uppercase">
              <strong className="text-neutral-400">7.</strong> To the maximum extent permitted by
              applicable laws, LlamaDNS, its affiliates, representatives, licensors, employees,
              agents, officers and directors will not be liable for any direct, indirect,
              incidental, punitive, consequential, special, exemplary, or other damages resulting
              from any use of the website or LlamaDNS services. The laws of certain jurisdictions do
              not allow the exclusion or limitation of legal warranties, conditions or
              representations. If these laws apply to you, some of those exclusions or limitations
              may not apply and you may have additional rights.
            </p>
          </section>

          <section>
            <p>
              <strong className="text-neutral-300">8.</strong> By using this website, you are
              confirming that you are either at least 18 years of age, or that you have parental or
              guardian consent to agree to these Terms and to access and use the website.
            </p>
          </section>

          <section>
            <p>
              <strong className="text-neutral-300">9.</strong> These Terms will be governed by and
              construed in accordance with the laws of the Republic of Lithuania and the applicable
              laws of the European Union. Parts of these Terms which are intended to survive
              termination or expiration will continue to apply if this agreement is terminated or
              expires. Any waiver or amendment of these Terms must be provided in writing by a duly
              authorized representative of LlamaDNS.
            </p>
          </section>

          <section>
            <p>
              <strong className="text-neutral-300">10.</strong> In addition to the above, you also
              agree to comply with all local laws that apply to your use of the website. Any
              questions related to these Terms of Use can be directed to{" "}
              <a
                href="mailto:support@llamadns.org"
                className="text-neutral-300 underline underline-offset-2 transition-colors hover:text-white"
              >
                support@llamadns.org
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <div className="h-px w-full bg-white/6" />
      <Footer />
    </div>
  );
}
