import { sans, silkscreen } from "@/app/fonts";
import ContactForm from "@/app/ui/ContactForm/ContactForm";

export default async function ContactPage() {
  const contact = {
    email: "quentin@quentmadeit.com",
    phone: "555-555-5555",
  };
  return (
    <main>
      <div className="px-2">
        <section className="grid gap-3 mb-12">
          <h1 className={`${silkscreen.className} text-3xl`}>Contact</h1>
          <div className={`${sans.className} grid gap-3`}>
            <p>I am currently looking for new oppurtunties</p>
            <div className="grid gap-2">
              <p className={`${sans.className}`}>
                <span className="font-bold">Email:</span> {contact.email}
              </p>
              <p className={`${sans.className}`}>
                <span className="font-bold">Phone:</span> {contact.phone}
              </p>
            </div>
          </div>
        </section>
        <section>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}
