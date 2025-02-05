import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const exercises = [
  {
    title: "Deep Breathing",
    description: "Practice deep breathing for 5 minutes. Inhale slowly through your nose for 4 counts, hold for 4 counts, then exhale through your mouth for 4 counts.",
    benefits: ["Reduces stress and anxiety", "Lowers heart rate and blood pressure", "Improves focus and concentration"]
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Tense and then relax each muscle group in your body, starting from your toes and moving up to your head.",
    benefits: ["Relieves physical tension", "Promotes overall relaxation", "Can improve sleep quality"]
  },
  {
    title: "Mindfulness Meditation",
    description: "Sit quietly and focus on your breath. When your mind wanders, gently bring your attention back to your breath.",
    benefits: ["Reduces stress and anxiety", "Improves emotional regulation", "Enhances self-awareness"]
  },
  {
    title: "Gratitude Journaling",
    description: "Write down three things you're grateful for each day. Reflect on why you're grateful for these things.",
    benefits: ["Increases positive emotions", "Improves overall well-being", "Enhances relationships"]
  },
  {
    title: "Physical Exercise",
    description: "Engage in 30 minutes of moderate exercise, such as brisk walking, cycling, or swimming.",
    benefits: ["Releases endorphins", "Reduces symptoms of depression and anxiety", "Improves sleep and overall health"]
  }
]

export default function MentalHealthExercisesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 bg-gradient-to-b from-purple-50 to-white">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold mb-8 text-center">Mental Health Exercises</h1>
          <p className="text-center mb-12 max-w-2xl mx-auto">
            Regular practice of mental health exercises can significantly improve your overall well-being. 
            Here are some exercises you can incorporate into your daily routine:
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {exercises.map((exercise, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{exercise.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{exercise.description}</p>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc pl-5">
                    {exercise.benefits.map((benefit, i) => (
                      <li key={i}>{benefit}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="mb-4">
              Remember, consistency is key when it comes to mental health exercises. 
              Try to incorporate these exercises into your daily routine for the best results.
            </p>
            <p>
              If you're struggling with your mental health, don't hesitate to reach out to a mental health professional for personalized guidance and support.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
