"use client";

import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PrivacyTermsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1020] via-[#0e1230] to-[#0b1020] text-white font-sans">
      {/* Background blur orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-3xl"></div>
      </div>

      <Header />

      {/* Main Content */}
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
              Privacy Policy & Terms of Service
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Your privacy and trust are important to us. Please review our
              policies below.
            </p>
          </div>

          <div className="space-y-12">
            {/* Privacy Policy Section */}
            <section className="bg-white/5 rounded-3xl border border-white/10 p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Privacy Policy
              </h2>

              <div className="space-y-6 text-white/80 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Information We Collect
                  </h3>
                  <p>
                    We collect information you provide directly to us, such as
                    when you create an account, use our services, or contact us
                    for support. This may include your name, email address, and
                    usage data to improve our services.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    How We Use Your Information
                  </h3>
                  <p>
                    We use the information we collect to provide, maintain, and
                    improve our services, process transactions, send you
                    technical notices and support messages, and communicate with
                    you about products, services, and promotional offers.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Information Sharing
                  </h3>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal
                    information to third parties without your consent, except as
                    described in this policy. We may share information with
                    trusted service providers who assist us in operating our
                    services.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Data Security
                  </h3>
                  <p>
                    We implement appropriate security measures to protect your
                    personal information against unauthorized access,
                    alteration, disclosure, or destruction. However, no method
                    of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Your Rights
                  </h3>
                  <p>
                    You have the right to access, update, or delete your
                    personal information. You may also opt out of certain
                    communications from us. Contact us if you wish to exercise
                    these rights.
                  </p>
                </div>
              </div>
            </section>

            {/* Terms of Service Section */}
            <section className="bg-white/5 rounded-3xl border border-white/10 p-8 lg:p-12">
              <h2 className="text-3xl font-bold mb-8 tracking-tight">
                Terms of Service
              </h2>

              <div className="space-y-6 text-white/80 leading-relaxed">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Acceptance of Terms
                  </h3>
                  <p>
                    By accessing and using Manora, you accept and agree to be
                    bound by the terms and provision of this agreement. If you
                    do not agree to abide by the above, please do not use this
                    service.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Use License
                  </h3>
                  <p>
                    Permission is granted to temporarily download one copy of
                    Manora for personal, non-commercial transitory viewing only.
                    This is the grant of a license, not a transfer of title.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    User Account
                  </h3>
                  <p>
                    When you create an account with us, you must provide
                    information that is accurate, complete, and current at all
                    times. You are responsible for safeguarding the password and
                    for all activities that occur under your account.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Prohibited Uses
                  </h3>
                  <p>
                    You may not use our service for any unlawful purpose or to
                    solicit others to perform unlawful acts, to violate any
                    international, federal, provincial, or state regulations,
                    rules, laws, or local ordinances.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Service Availability
                  </h3>
                  <p>
                    We reserve the right to withdraw or amend our service, and
                    any service or material we provide, in our sole discretion
                    without notice. We will not be liable if for any reason all
                    or any part of the service is unavailable at any time.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Limitation of Liability
                  </h3>
                  <p>
                    In no event shall Manora or its suppliers be liable for any
                    damages (including, without limitation, damages for loss of
                    data or profit, or due to business interruption) arising out
                    of the use or inability to use the materials on
                    Manora&apos;s website.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Governing Law
                  </h3>
                  <p>
                    These terms and conditions are governed by and construed in
                    accordance with the laws and you irrevocably submit to the
                    exclusive jurisdiction of the courts in that state or
                    location.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-white/5 rounded-3xl border border-white/10 p-8 lg:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6 tracking-tight">
                Questions?
              </h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                If you have any questions about this Privacy Policy or Terms of
                Service, please contact us.
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="bg-white text-gray-900 px-8 py-4 rounded-2xl font-medium hover:bg-white/90 transition-all hover:-translate-y-0.5 shadow-lg whitespace-nowrap cursor-pointer"
              >
                Contact Support
              </button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
