import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is Jaagr?",
    answer:
      "Jaagr is a platform dedicated to promoting mental health awareness and providing tools for emotional wellbeing. Our name, जाग्र (Jaagr), means 'awake' or 'aware' in Hindi, reflecting our mission to help people become more aware of their mental health.",
  },
  {
    question: "How does the emotional wellbeing assessment work?",
    answer:
      "Our emotional wellbeing assessment is a series of questions designed to help you reflect on your current emotional state. It covers various aspects of mental health and provides insights based on your responses. The assessment is not a diagnostic tool, but rather a starting point for understanding your emotional wellbeing.",
  },
  {
    question: "Is my information kept confidential?",
    answer:
      "Yes, we take your privacy very seriously. All information you provide is encrypted and stored securely. We do not share your personal information with third parties. You can read more about our data practices in our Privacy Policy.",
  },
  {
    question: "How often should I take the assessment?",
    answer:
      "We recommend taking the assessment regularly, such as once a month, to track changes in your emotional wellbeing over time. However, you can take it as often as you feel necessary, especially if you're experiencing significant life changes or stress.",
  },
  {
    question: "Can I use Jaagr instead of seeing a mental health professional?",
    answer:
      "While Jaagr provides valuable tools for self-reflection and mental health awareness, it is not a substitute for professional mental health care. If you're experiencing severe or persistent mental health issues, we strongly encourage you to seek help from a qualified mental health professional.",
  },
  {
    question: "How can I contribute to the Jaagr community?",
    answer:
      "There are several ways to contribute to our community: you can write blog posts sharing your experiences or insights, engage with other users' content through comments and likes, and participate in our forums or discussion groups. We believe that sharing our stories and supporting each other is a powerful way to promote mental health awareness.",
  },
  {
    question: "Is there a mobile app for Jaagr?",
    answer:
      "Currently, Jaagr is a web-based platform optimized for both desktop and mobile browsers. We're exploring the possibility of developing dedicated mobile apps in the future to enhance the user experience further.",
  },
  {
    question: "What should I do if I'm in a mental health crisis?",
    answer:
      "If you're experiencing a mental health crisis or having thoughts of self-harm, please seek immediate help. Contact your local emergency services, call a mental health helpline, or go to the nearest emergency room. Remember, your wellbeing is important, and help is available.",
  },
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">Frequently Asked Questions</h1>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-purple-700 hover:text-purple-800">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700">
              Can't find the answer you're looking for?
              <a href="/contact" className="text-purple-600 hover:text-purple-700 ml-1 font-semibold">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

