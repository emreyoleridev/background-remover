import { siteConfig } from "@/config/site";

export const metadata = {
    title: `Privacy Policy | ${siteConfig.siteName}`,
};

export default function PrivacyPage() {
    return (
        <main className="container max-w-3xl mx-auto py-24 px-4">
            <h1 className="text-4xl font-black tracking-tight text-white uppercase mb-8">Privacy Policy</h1>

            <div className="prose prose-zinc prose-invert max-w-none">
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white">100% Client-Side Privacy</h2>
                    <p className="text-zinc-400 mt-4 leading-relaxed">
                        At {siteConfig.siteName}, we take your privacy seriously. All of our tools are designed to run entirely within your web browser. This means that your data is processed locally on your machine and is never transmitted to our servers for processing.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white">Data Collection</h2>
                    <p className="text-zinc-400 mt-4 leading-relaxed">
                        We do not collect personal information, and we do not use tracking cookies beyond what is essential for the basic functionality of the platform.
                    </p>
                    <p className="text-zinc-400 mt-4 leading-relaxed">
                        <strong>Newsletter:</strong> If you choose to subscribe to our newsletter, your email address is stored securely using Google Sheets via our private integration. We will never sell or share your email with third parties.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white">Security</h2>
                    <p className="text-zinc-400 mt-4 leading-relaxed">
                        Since your data never leaves your device, it is protected from interception or server-side leaks. We recommend using these tools on private, secure devices for maximum safety.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-white">Contact</h2>
                    <p className="text-zinc-400 mt-4 leading-relaxed">
                        If you have any questions about this Privacy Policy, please contact us at emreyoleridev@gmail.com.
                    </p>
                </section>
            </div>
        </main>
    );
}
