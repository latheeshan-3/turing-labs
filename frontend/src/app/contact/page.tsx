"use client";

import { Button } from "@/components/ui/Button";

export default function ContactPage() {

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const data = {
      first_name: form.get("first_name"),
      last_name: form.get("last_name"),
      email: form.get("email"),
      project_details: form.get("project_details"),
    };

    const res = await fetch("http://127.0.0.1:8000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    alert(result.message);
  }

  return (
    <div className="min-h-screen pt-20 pb-20 bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-6 text-center">Start Your AI Journey</h1>
          <p className="text-muted-foreground text-center mb-10">
            Tell us about your project. Our experts will analyze your needs and propose a tailored AI strategy.
          </p>

          {/* Attach handleSubmit to form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">First Name</label>
                <input name="first_name" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Jane" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Name</label>
                <input name="last_name" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Work Email</label>
              <input name="email" type="email" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="jane@company.com" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Project Details</label>
              <textarea name="project_details" className="w-full px-3 py-2 border border-slate-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Tell us what you want to build..."></textarea>
            </div>

            <Button type="submit" className="w-full h-12 text-lg variant-gradient" variant="gradient">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}
