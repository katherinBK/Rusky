import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { HuskyMascot } from "@/components/husky-mascot"
import { MessageCircle, BookOpen, GraduationCap, Flame, Trophy, Sparkles } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <HuskyMascot size="sm" mood="happy" animate={false} />
            <span className="text-xl font-bold text-foreground">Rusky</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  <Sparkles className="w-4 h-4" />
                  AI-Powered Learning
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
                  Master Russian with Your AI Companion
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed text-pretty max-w-lg">
                  Meet Rusky, your friendly Husky guide to learning Russian. Practice conversations, 
                  master grammar, and read engaging stories at your own pace.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Start Learning Free
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                    Continue Learning
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-accent" />
                  <span>Daily streaks</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-accent" />
                  <span>Achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-accent" />
                  <span>All levels</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl" />
                <HuskyMascot size="xl" mood="excited" className="relative" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Three Ways to Learn</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you prefer structured lessons or free-flowing conversation, 
              Rusky adapts to your learning style.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">AI Conversations</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Practice speaking with an AI that adapts to your level. Choose teaching mode 
                  for guided lessons or conversation mode for natural chat practice.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Grammar Review</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Master Russian grammar with interactive exercises covering cases, verb aspects, 
                  and more. Track your progress and revisit challenging topics.
                </p>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow border-2 hover:border-primary/20">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Story Reading</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Immerse yourself in Russian culture through graded stories. 
                  Click any word for translations and test your comprehension with quizzes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-3xl p-8 md:p-12 border">
            <HuskyMascot size="lg" mood="teaching" className="mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Russian Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of learners mastering Russian with Rusky. 
              Your first lesson is just a click away.
            </p>
            <Link href="/auth/sign-up">
              <Button size="lg" className="h-12 px-8 text-base">
                Begin Learning Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HuskyMascot size="sm" mood="happy" animate={false} />
            <span className="font-semibold">Rusky</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Made with care for Russian language learners everywhere.
          </p>
        </div>
      </footer>
    </div>
  )
}
