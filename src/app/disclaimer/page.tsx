import { siteConfig } from "@/config/site";

export const metadata = {
    title: `Disclaimer | ${siteConfig.siteName.replace("_", "")}`,
};

export default function DisclaimerPage() {
    const cleanName = siteConfig.siteName.replace("_", "");
    return (
        <main className="container max-w-3xl mx-auto py-24 px-4">
            <h1 className="text-4xl font-black tracking-tight text-foreground uppercase mb-8">Disclaimer</h1>

            <div className="prose prose-zinc dark:prose-invert max-w-none">
                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-foreground border-b pb-2">"As Is" Basis</h2>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                        The tools provided on {cleanName} are offered on an "as is" and "as available" basis. We make no representations or warranties of any kind, express or implied, regarding the operation of these tools or the information, content, or materials included.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-foreground border-b pb-2">Limitation of Liability</h2>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                        {cleanName}, its creators, and affiliates shall not be liable for any damages of any kind arising from the use of these tools, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-foreground border-b pb-2">User Responsibility</h2>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                        It is your responsibility to verify the outputs of the tools. Any misuse of the generated data or tools is the sole responsibility of the user. We do not encourage or take responsibility for any illegal or unethical use of our platform.
                    </p>
                </section>

                <section className="mt-8">
                    <h2 className="text-2xl font-semibold text-foreground border-b pb-2">Contact</h2>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                        If you have any questions about this Disclaimer, please contact us at{" "}
                        <a href={`mailto:${siteConfig.links.authorEmail}`} className="text-primary hover:underline transition-all">
                            {siteConfig.links.authorEmail}
                        </a>.
                    </p>
                </section>
            </div>
        </main>
    );
}
