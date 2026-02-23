import { siteConfig } from "@/config/site";

export const metadata = {
    title: `Terms of Use | ${siteConfig.siteName}`,
};

export default function TermsPage() {
    return (
        <main className="container max-w-3xl mx-auto py-24 px-4">
            <h1 className="text-4xl font-black tracking-tight text-white uppercase mb-8">Terms of Use</h1>

            <div className="prose prose-zinc prose-invert max-w-none">
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white">Acceptance of Terms</h2>
                    <p className="text-zinc-400 mt-4 leading-relaxed">
                        By using {siteConfig.siteName}, you agree to these Terms of Use. These tools are provided free of charge for your personal and professional use.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white">Usage and Costs</h2>
                    <ul className="list-disc list-inside text-zinc-400 mt-4 space-y-2">
                        <li>All tools are 100% free to use.</li>
                        <li>Unlimited usage is allowed for all users.</li>
                        <li>No account registration is required.</li>
                        <li>No rate limits are imposed on standard manual usage.</li>
                    </ul>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white">Prohibited Activities</h2>
                    <p className="text-zinc-400 mt-4 leading-relaxed">
                        You may not use our services for any illegal purposes. Abusive automation, scraping, or attempts to disrupt the service are strictly prohibited.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white">Warranties and Accuracy</h2>
                    <p className="text-zinc-400 mt-4 leading-relaxed">
                        While we strive for excellence, we provide these tools "as is" without any warranties. We do not guarantee the 100% accuracy of tool outputs for all use cases.
                    </p>
                </section>
            </div>
        </main>
    );
}
