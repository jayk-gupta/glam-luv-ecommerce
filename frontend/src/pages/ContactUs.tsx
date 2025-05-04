
import { Mail, Phone, HelpCircle, Send } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-64">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
        Contact Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* By Phone */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <Phone className="text-gray-700" />
            <h3 className="text-lg font-semibold">By Phone</h3>
          </div>
          <p className="text-sm text-gray-700">
            Available Mon–Fri, 8AM to 5PM PST
          </p>
          <ul className="text-gray-800 text-sm mt-2 space-y-1">
            <li>1-909-945-2220</li>
            <li>1-800-776-2221</li>
            <li>
              1-909-945-2262 <span className="text-gray-500 text-xs">Fax</span>
            </li>
          </ul>
        </div>

        {/* By Mail */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <Send className="text-gray-700" />
            <h3 className="text-lg font-semibold">By Mail</h3>
          </div>
          <p className="italic text-sm text-gray-800">Glam Luv Cosmetics</p>
          <p className="text-sm text-gray-700">2025 S Archibald Ave</p>
          <p className="text-sm text-gray-700">Ontario, CA 91761 USA</p>
        </div>

        {/* FAQ */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <HelpCircle className="text-gray-700" />
            <h3 className="text-lg font-semibold">FAQ</h3>
          </div>
          <p className="text-sm text-gray-700">
            Find the answer to your questions.
          </p>
          <a
            href="#"
            className="text-blue-600 text-sm underline mt-1 inline-block"
          >
            Visit FAQ page
          </a>
        </div>

        {/* By Email */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <Mail className="text-gray-700" />
            <h3 className="text-lg font-semibold">By Email</h3>
          </div>
          <p className="text-sm text-gray-700">Have a question?</p>
          <a
            href="mailto:support@example.com"
            className="text-blue-600 text-sm underline mt-1 inline-block"
          >
            Email us
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
